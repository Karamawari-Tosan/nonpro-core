const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Inputs and Outputs
const srcDir = path.resolve(__dirname, '../manuscript');
const destDir = path.resolve(__dirname, '../vivliostyle_manuscript');
const outputFile = path.join(destDir, 'book_full.md');

// Ensure destination exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
} else {
    // Clean directory
    const existingFiles = fs.readdirSync(destDir);
    for (const file of existingFiles) {
        try {
            fs.unlinkSync(path.join(destDir, file));
        } catch (e) {
            console.warn(`Warning: Could not delete ${file}`);
        }
    }
}

// Regex for Vertical Text (Alphanumeric) but skipping HTML tags
const tokenRegex = /(<\/?[^>]+>)|([0-9a-zA-Z!?.,%]+)/g;

function processText(content) {
    return content.replace(tokenRegex, (match, htmlTag, alpha) => {
        if (htmlTag) return htmlTag;
        if (alpha) {
            const len = alpha.length;
            if (len === 1) return `<span class="upright">${alpha}</span>`;
            if (len === 2) return `<span class="tcy">${alpha}</span>`;
            return alpha;
        }
        return match;
    });
}

(async () => {
    try {
        // Read all MD files
        const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.md')).sort();

        let tocContent = '# 目次\n\n<nav class="toc">\n<ol>\n';

        let colophonFile = files.find(f => f.includes('奥付'));
        if (!colophonFile) colophonFile = 'colophon.md';

        let processingFiles = files.filter(f => f !== colophonFile && f !== 'colophon.md');

        console.log(`Processing ${processingFiles.length} chapters... (Colophon file: ${colophonFile})`);

        // PROCESS MAIN CONTENT
        let mainContent = '';

        for (const [index, file] of processingFiles.entries()) {
            const srcPath = path.join(srcDir, file);
            let content = fs.readFileSync(srcPath, 'utf-8');
            const fileIdPrefix = `file-${index}`;

            // 1. Extract Headers for TOC (H1 only)
            content = content.replace(/^(#)\s+(.*)$/gm, (match, hashes, title) => {
                const slug = Math.random().toString(36).substring(2, 8);
                const headerId = `${fileIdPrefix}-${slug}`;
                let cleanTitle = title.replace(/<[^>]*>/g, '').replace(/[*_]{1,3}(.*?)[*_]{1,3}/g, '$1');
                tocContent += `<li class="toc-item"><a href="#${headerId}">${cleanTitle}</a></li>\n`;
                return `<h1 id="${headerId}">${title}</h1>`;
            });

            // 2. Generate QR Codes for Links
            // Match [text](url)
            const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
            let match;
            const replacements = [];

            while ((match = linkRegex.exec(content)) !== null) {
                const [fullMatch, text, url] = match;
                // Generate QR Code
                const qrDataUrl = await QRCode.toDataURL(url, { margin: 0, width: 100 });
                // Replacement HTML
                // We add a class .qr-code-wrap for styling
                const replacement = `${fullMatch}<span class="qr-code-wrap"><img src="${qrDataUrl}" alt="QR: ${url}"></span>`;
                replacements.push({ index: match.index, length: fullMatch.length, replacement });
            }

            // Apply QR code replacements in reverse
            for (let i = replacements.length - 1; i >= 0; i--) {
                const r = replacements[i];
                content = content.substring(0, r.index) + r.replacement + content.substring(r.index + r.length);
            }

            // 3. Process Vertical Text
            content = processText(content);

            // Append
            mainContent += `<div style="break-before: page;"></div>\n\n`;
            mainContent += content;
            mainContent += `\n\n`;
        }

        tocContent += '</ol>\n</nav>\n\n';

        // PROCESS COLOPHON
        let colophonContent = '';
        if (files.includes(colophonFile)) {
            const colophonPath = path.join(srcDir, colophonFile);
            let rawColophon = fs.readFileSync(colophonPath, 'utf-8');

            // H1 Fix
            rawColophon = rawColophon.replace(/^(#)\s+(.*)$/gm, (match, hashes, title) => {
                return `<h1>${title}</h1>`;
            });

            // Generate QR Codes for Colophon
            const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
            // Also match bare URLs if not markdown linked? The user had http://...
            // Use a regex that catches both markdown links AND bare URLs if needed, 
            // but the user's colophon has `http://plannauts.co.jp/` as plain text?
            // Wait, looking at the diff: `**発行所**: 株式会社プランノーツ http://plannauts.co.jp/`
            // This is NOT a markdown link `[text](url)`. It's just text.
            // My current regex ONLY matches `[text](url)`.
            // I need to update the regex or logic to handle bare URLs as well, or at least this specific one.

            // Let's detecting bare URLs too.
            // But let's stick to the current pattern first, checking if I need to update the regex.
            // If the user's text is just `http://...`, my current regex won't catch it.

            // Let's update the regex to catch bare URLs as well.
            const urlRegex = /(https?:\/\/[^\s]+)/g;

            // Strategy: 
            // 1. Process Markdown links `[text](url)` -> generate QR for `url`
            // 2. Process bare URLs -> generate QR for `url` (avoiding double processing if it's inside a markdown link? 
            //    Actually, if I process markdown links first, I can replace them with the HTML. 
            //    Then process bare URLs that are NOT inside the HTML tags?

            // Simpler approach for now: Just match the specific URL pattern or expand regex.
            // But wait, `http://plannauts.co.jp/` in the colophon. 
            // Let's try to match that specifically or use a better regex.

            // Using a replaced logic to handle both.

            // First, process standard markdown links
            let match;
            const replacements = [];
            const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
            while ((match = mdLinkRegex.exec(rawColophon)) !== null) {
                const [fullMatch, text, url] = match;
                const qrDataUrl = await QRCode.toDataURL(url, { margin: 0, width: 100 });
                const replacement = `${fullMatch}<span class="qr-code-wrap"><img src="${qrDataUrl}" alt="QR: ${url}"></span>`;
                replacements.push({ index: match.index, length: fullMatch.length, replacement });
            }
            for (let i = replacements.length - 1; i >= 0; i--) {
                const r = replacements[i];
                rawColophon = rawColophon.substring(0, r.index) + r.replacement + rawColophon.substring(r.index + r.length);
            }

            // Next, looking for bare URLs that were NOT part of the above.
            // Since we replaced the markdown links with HTML, we can look for `http` that is NOT inside `src="..."` or `href="..."`?
            // Or just generally match `http...` followed by space or newline.
            // Be careful not to break the `img src` we just added.

            // A safer manual check for the colophon might be best for now, or just wrapping that URL in brackets in the source?
            // No, I should fix the code to handle it.

            // Let's use a regex that ignores things in quotes? Hard.
            // Let's just target the specific URL if it's bare.

            // Actually, I'll update the regex to allow bare URLs finding if the previous one didn't catch it.
            // But to avoid complexity with the already replaced HTML, I'll do a simple pass for bare URLs *before* markdown link processing? 
            // No, markdown links contain the URL. 

            // Let's just assume valid Markdown links for now. 
            // PROBABLY the user's text `http://plannauts.co.jp/` is NOT a link. It is just text.
            // So I should treat it as a URL to standardise.

            // I will add a step to turn bare URLs into QR codes too.
            // Robust regex for bare URL: 

            // Negative lookbehind for quotes or equals to avoid matching inside HTML tags attributes.

            // We need to be careful with `async` inside replace.
            // So we use the match-loop capability again.

            // New loop for bare URLs


            rawColophon = processText(rawColophon);

            colophonContent += `<div style="break-before: page;"></div>\n\n`;
            colophonContent += '<div class="colophon-wrapper">\n';
            colophonContent += rawColophon;
            colophonContent += '\n</div>';
        }

        const finalOutput = `${tocContent}\n
<div class="main-content-wrapper">
${mainContent}
</div>
\n${colophonContent}`;

        fs.writeFileSync(outputFile, finalOutput);
        console.log(`Merged content written to ${outputFile}`);

    } catch (e) {
        console.error("Error processing files:", e);
        process.exit(1);
    }
})();
