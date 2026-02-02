module.exports = {
    title: '脱・独学論', // Title based on the content
    author: 'Takahashi', // Placeholder author
    language: 'ja',
    theme: 'theme.css',
    entry: [
        'vivliostyle_manuscript/book_full.md',
    ],
    output: [
        {
            path: './book.pdf',
            format: 'pdf',
        },
    ],
};
