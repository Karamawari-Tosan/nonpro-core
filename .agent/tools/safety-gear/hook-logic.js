/**
 * Plannauts Global Safety Gear - Hook Logic
 * Version: 1.0.0
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ==========================================
// 1. 設定
// ==========================================
const TARGET_ORG = 'plannauts';
const PROTECTED_BRANCH = 'refs/heads/main';

const args = process.argv.slice(2);
const remoteName = args[0];
const remoteUrl = args[1];

async function run() {
    // ==========================================
    // 2. プッシュ情報の読み取り (stdin)
    // ==========================================
    const pushInfos = [];
    const rl = readline.createInterface({
        input: process.stdin,
        terminal: false
    });

    for await (const line of rl) {
        const parts = line.split(' ');
        if (parts.length === 4) {
            pushInfos.push({
                localRef: parts[0],
                localSha: parts[1],
                remoteRef: parts[2],
                remoteSha: parts[3]
            });
        }
    }

    // ==========================================
    // 3. Plannauts リポジトリ判定
    // ==========================================
    // リモートURLの取得（引数にない場合はコマンドで補完）
    let effectiveUrl = remoteUrl;
    if (!effectiveUrl) {
        try {
            effectiveUrl = execSync(`git remote get-url ${remoteName || 'origin'}`).toString().trim();
        } catch (e) {
            effectiveUrl = '';
        }
    }

    const isPlannauts = effectiveUrl.toLowerCase().includes(TARGET_ORG.toLowerCase());

    if (isPlannauts) {
        // ==========================================
        // 4. mainブランチ保護判定
        // ==========================================
        const isPushingToMain = pushInfos.some(info => info.remoteRef === PROTECTED_BRANCH);

        if (isPushingToMain) {
            console.error('\n' + '='.repeat(60));
            console.error('❌ エラー: mainブランチへの直接プッシュは禁止されています');
            console.error('='.repeat(60));
            console.error('\nAIエージェント実験室では、以下の手順で作業してください：');
            console.error('  1. 作業用ブランチを作成: git checkout -b feature/your-feature');
            console.error('  2. 変更をコミット・プッシュ');
            console.error('  3. GitHubでプルリクエストを作成');
            console.error('\n詳細ガイド: https://github.com/plannauts/nonpro-core/blob/main/99_Guide/00_Setup_Guide.md');
            console.error('='.repeat(60) + '\n');
            process.exit(1);
        }
    }

    // ==========================================
    // 5. ローカルフックへのブリッジ (共存)
    // ==========================================
    try {
        const projectRoot = execSync('git rev-parse --show-toplevel 2>/dev/null').toString().trim();
        if (projectRoot) {
            const localHookPath = path.join(projectRoot, '.git', 'hooks', 'pre-push');
            if (fs.existsSync(localHookPath)) {
                // ローカルフックにstdinを渡して実行
                const result = spawnSync(localHookPath, args, {
                    input: pushInfos.map(info => `${info.localRef} ${info.localSha} ${info.remoteRef} ${info.remoteSha}`).join('\n') + '\n',
                    stdio: ['pipe', 'inherit', 'inherit'],
                    shell: true
                });
                process.exit(result.status || 0);
            }
        }
    } catch (e) {
        // エラー（リポジトリ外など）は無視して正常終了へ
    }

    process.exit(0);
}

run().catch(err => {
    console.error('Hook script error:', err);
    process.exit(0); // フック自体のエラーでプッシュを邪魔しない
});
