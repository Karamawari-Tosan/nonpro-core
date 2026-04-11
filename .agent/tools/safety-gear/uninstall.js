/**
 * Plannauts Global Safety Gear - Uninstaller
 */

const { execSync } = require('child_process');

console.log('🛡️  Plannauts Safety Gear を解除しています...');

try {
    // Gitグローバル設定の解除
    execSync('git config --global --unset core.hooksPath');
    console.log('✅ Gitグローバル設定 (core.hooksPath) を解除しました。');
    
    console.log('\n✨ 解除が完了しました。');
    console.log('構成ファイルはホームディレクトリの ~/.githooks/plannauts に残っていますが、Gitからは参照されません。');

} catch (err) {
    console.error('\n❌ 解除中にエラーが発生しました（既に解除されている可能性があります）:');
    console.error(err.message);
}
