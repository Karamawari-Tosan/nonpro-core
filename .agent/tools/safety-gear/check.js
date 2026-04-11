/**
 * Plannauts Global Safety Gear - Status Checker
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🧐 Plannauts Safety Gear の適用状態を確認しています...\n');

try {
    const hooksPath = execSync('git config --global core.hooksPath').toString().trim();
    const HOME = process.env.HOME || process.env.USERPROFILE;
    const destDir = path.join(HOME, '.githooks', 'plannauts').replace(/\\/g, '/');

    if (hooksPath === destDir) {
        console.log('✅ 状態: 有効 (Active)');
        console.log(`📍 パス: ${hooksPath}`);
        console.log('\nこのPCでは、plannauts組織のリポジトリの main 保護が有効です。');
    } else {
        console.log('⚠️  状態: 設定が異なります');
        console.log(`📍 現在の設定: ${hooksPath || '(未設定)'}`);
        console.log(`💡 推奨パス: ${destDir}`);
        console.log('\n`npm run protect-main` を実行して設定を有効にしてください。');
    }
} catch (err) {
    console.log('❌ 状態: 無効 (Inactive)');
    console.log('\n`npm run protect-main` を実行して設定を有効にしてください。');
}
