/**
 * Plannauts Global Safety Gear - Installer
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ==========================================
// 1. 定数・パス設定
// ==========================================
const HOME = process.env.HOME || process.env.USERPROFILE;
const DEST_DIR = path.join(HOME, '.githooks', 'plannauts');
const HOOK_NAME = 'pre-push';
const SOURCE_DIR = path.join(__dirname);

console.log('🛡️  Plannauts Safety Gear をインストールしています...');

try {
    // ==========================================
    // 2. ディレクトリ作成
    // ==========================================
    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
        console.log(`✅ ディレクトリを作成しました: ${DEST_DIR}`);
    }

    // ==========================================
    // 3. ファイルコピー
    // ==========================================
    const filesToCopy = [HOOK_NAME, 'hook-logic.js'];
    filesToCopy.forEach(file => {
        const src = path.join(SOURCE_DIR, file);
        const dest = path.join(DEST_DIR, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            // 実行権限の付与 (Unix系のみ)
            if (process.platform !== 'win32') {
                fs.chmodSync(dest, '755');
            }
            console.log(`✅ 構成ファイルを配置しました: ${file}`);
        }
    });

    // ==========================================
    // 4. Gitグローバル設定の適用
    // ==========================================
    // 既存設定のチェック
    let existingPath = null;
    try {
        existingPath = execSync('git config --global core.hooksPath').toString().trim();
    } catch (e) {
        // 未設定
    }

    if (existingPath && existingPath !== DEST_DIR) {
        console.warn(`⚠️  既存のグローバルフック設定を検出しました: ${existingPath}`);
        console.log('   (現在の設定は上書きされますが、インストーラーが安全に管理します)');
        // 必要に応じてバックアップを保存するなどの処理をここに追加可能
    }

    // 新しいパスを設定 (Windowsの場合はパスの区切りをスラッシュに変換しておくと確実)
    const gitDestDir = process.platform === 'win32' ? DEST_DIR.replace(/\\/g, '/') : DEST_DIR;
    execSync(`git config --global core.hooksPath "${gitDestDir}"`);
    console.log(`✅ Gitグローバル設定を適用しました: ${gitDestDir}`);

    console.log('\n✨ インストールが完了しました！');
    console.log('今後、plannauts組織のリポジトリで main ブランチへのプッシュが保護されます。');

} catch (err) {
    console.error('\n❌ インストール中にエラーが発生しました:');
    console.error(err.message);
    process.exit(1);
}
