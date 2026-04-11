# Contributing to nonpro-core

nonpro-core プロジェクトへのコントリビューションガイドラインです。

---

## 📋 目次

- [コミットメッセージ規約](#コミットメッセージ規約)
- [ブランチ戦略](#ブランチ戦略)
- [プルリクエストプロセス](#プルリクエストプロセス)
- [ファイル命名規則](#ファイル命名規則)
- [ドキュメント標準](#ドキュメント標準)
- [開発環境](#開発環境)

---

## コミットメッセージ規約

コミットメッセージは**日本語**で記述し、以下の形式に従います。

### 基本形式

```
<種別>: <要約>

<詳細説明（任意）>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 種別

| 種別 | 説明 | 例 |
|:---|:---|:---|
| `追加` | 新機能・ワークフロー・ドキュメント | 新規ファイル作成、機能追加 |
| `更新` | 既存機能の改善・変更 | 機能強化、パフォーマンス改善 |
| `修正` | バグ修正 | 動作不具合の解消 |
| `削除` | ファイル・機能の削除 | 不要なコードの削除 |
| `リファクタ` | コード整理（機能変更なし） | 構造改善、命名変更 |
| `ドキュメント` | ドキュメントのみの変更 | README更新、コメント追加 |

### 例

**良い例:**

```
追加: イベントフォローアップワークフローの実装

send_event_followup.mdを追加し、イベント後のお礼メール・
アンケート配信・次回案内の自動化に対応

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**悪い例:**

```
add file  # 英語、詳細不足
```

### Heredoc を使った記述（推奨）

```bash
git commit -m "$(cat <<'EOF'
追加: イベントフォローアップワークフローの実装

send_event_followup.mdを追加し、イベント後のお礼メール・
アンケート配信・次回案内の自動化に対応

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

---

## ブランチ戦略

### ブランチ構成

| ブランチ | 説明 | 保護 |
|:---|:---|:---:|
| `main` | 本番環境（安定版） | ✅ |
| `feature/*` | 新機能開発 | - |
| `fix/*` | バグ修正 | - |
| `docs/*` | ドキュメント整理 | - |
| `refactor/*` | リファクタリング | - |

### ブランチ命名規則

```
<種別>/<説明>
```

**例:**
- `feature/add-analytics-dashboard`
- `fix/slide-generator-layout-bug`
- `docs/organize-documentation`
- `refactor/clean-up-workflows`

### ブランチ作成から統合まで

1. **最新の main を取得**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **作業ブランチを作成**
   ```bash
   git checkout -b feature/new-feature
   ```

3. **変更を加えてコミット**
   ```bash
   git add .
   git commit -m "追加: 新機能の実装"
   ```

4. **リモートにプッシュ**
   ```bash
   git push -u origin feature/new-feature
   ```

5. **プルリクエストを作成**（次のセクション参照）

---

## プルリクエストプロセス

### 1. プルリクエストの作成

#### GitHub CLI を使う場合（推奨）

```bash
gh pr create --title "タイトル" --body "$(cat <<'EOF'
## 概要
変更内容の概要

## 変更内容
- 変更1
- 変更2

## 関連Issue
Closes #123

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

#### GitHub Web UI を使う場合

1. GitHub リポジトリページを開く
2. `Pull requests` > `New pull request`
3. ベースブランチ: `main`、比較ブランチ: 作業ブランチ
4. タイトルと説明を記入して `Create pull request`

### 2. PR テンプレート

```markdown
## 概要
このPRが何を解決するか、何を追加するかを簡潔に説明

## 変更内容
- 変更1
- 変更2
- 変更3

## テスト方法
動作確認の手順（該当する場合）

## チェックリスト
- [ ] コードは動作確認済み
- [ ] ドキュメントを更新（必要な場合）
- [ ] コミットメッセージが規約に従っている
- [ ] 関連Issueにリンク（Closes #番号）

## 関連Issue
Closes #123

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### 3. レビュープロセス

1. **PR作成者**: Slack等でレビュー依頼
2. **レビュアー**: コードレビュー、コメント
3. **PR作成者**: 修正が必要な場合は元のブランチで修正してプッシュ（自動的にPRに反映）
4. **レビュアー**: 承認（Approve）
5. **管理者**: マージ

### 4. マージ方法

**管理者によるマージ:**

```bash
gh pr review <PR番号> --approve
gh pr merge <PR番号> --merge --delete-branch
```

---

## ファイル命名規則

### ガイド・マニュアル（99_Guide/）

**形式:** `[番号]_[英語名].md`

**例:**
- `00_Setup_Guide.md`
- `01_Security_Guidelines.md`
- `02_Contribution_Guide.md`

**理由:**
- 番号によるソート順の明確化
- 英語名による一貫性
- アンダースコアによる可読性

---

### ナレッジ・コンテンツ（00_Context_Library/）

**形式:** 日本語可、意味重視

**例:**
- `Identity.md`
- `Business_Model.md`
- `コミュニティ3.0.md`

**理由:** コンテンツの本質を表現するため、日本語の使用を許可

---

### ワークフロー（.agent/workflows/）

**形式:** `[動詞]_[名詞].md`

**例:**
- `create_event_plan.md`
- `generate_event_header.md`
- `send_event_followup.md`

**理由:** ワークフローは「アクション」を表すため動詞を使用

---

### スキル（.agent/skills/）

**形式:** `[役職]_[専門領域]/SKILL.md`

**例:**
- `CSO_Strategy/SKILL.md`
- `CCO_Community_Architect/SKILL.md`

---

### ツール（.agent/tools/）

**形式:** ケバブケース（小文字 + ハイフン）

**例:**
- `slide-generator/`
- `image_utils.py`（Pythonの慣例に従いスネークケース）

---

## ドキュメント標準

### メタデータ（推奨）

ドキュメントの冒頭にYAMLフロントマター形式でメタデータを記載することを推奨します。

```markdown
---
title: "ドキュメントタイトル"
last_updated: 2026-03-22
status: Active  # Draft | Active | Archived
category: Guide  # Guide | Knowledge | Resource | Playbook
tags: [setup, security]
---

# ドキュメントタイトル

本文...
```

**フィールド:**
- `title`: ドキュメントタイトル
- `last_updated`: 最終更新日（YYYY-MM-DD形式）
- `status`: ステータス（Draft | Active | Archived）
- `category`: カテゴリ（Guide | Knowledge | Resource | Playbook）
- `tags`: タグ（配列形式）

### 相互リンク

関連ドキュメントへのリンクは**相対パス**で記述します。

**例:**
```markdown
詳細は [開発者ドキュメント](../../.agent/tools/slide-generator/README.md) を参照してください。
```

### 見出しレベル

- `#` (H1): ドキュメントタイトル（1つのみ）
- `##` (H2): 主要セクション
- `###` (H3): サブセクション
- `####` (H4): 詳細項目

### コードブロック

言語を明示してシンタックスハイライトを有効化します。

\```javascript
function example() {
  return "Hello";
}
\```

---

## 開発環境

### 必要なツール

- **Git**: バージョン管理
- **GitHub CLI (gh)**: PR作成・管理
- **Node.js**: ワークフロー実行環境（一部）
- **Python**: スクリプト実行（一部）
- **Antigravity / Claude Code**: AI開発アシスタント

### セットアップ

詳細は [99_Guide/00_Setup_Guide.md](99_Guide/00_Setup_Guide.md) を参照してください。

---

## 禁止事項

### ❌ やってはいけないこと

1. **main ブランチへの直接プッシュ**
   - 必ずPRを経由すること
   - 誤操作防止のため、[セーフティギア](99_Guide/00_Setup_Guide.md#4-安全装備セーフティギアの設定)を導入し、技術的にもブロックされる状態にしてください。

2. **強制プッシュ（force push）**
   - `git push --force` は禁止（特に main/master ブランチ）

3. **Git フックのスキップ**
   - `--no-verify` などのフラグを使用しない

4. **他人のコミットを amend**
   - 自分の最新コミットのみ `--amend` 可能

5. **機密情報のコミット**
   - APIキー、パスワード、個人情報を含めない
   - `.env` ファイルは `.gitignore` に追加

6. **巨大ファイルのコミット**
   - 画像・動画などは外部ストレージを使用
   - 10MB以上のファイルは要検討

---

## Issue管理

### Issueの作成

**タイトル:** 簡潔で明確に

**本文テンプレート:**

```markdown
## 概要
問題や提案の概要

## 詳細
詳しい説明

## 期待する結果
何が達成されればこのIssueをCloseできるか

## 関連情報
- 関連するPR
- 参考リンク
```

### ラベル（提案）

- `bug`: バグ報告
- `feature`: 新機能リクエスト
- `documentation`: ドキュメント関連
- `question`: 質問
- `enhancement`: 既存機能の改善

---

## セキュリティ

機密情報の取り扱いについては、[99_Guide/01_Security_Guidelines.md](99_Guide/01_Security_Guidelines.md) を参照してください。

---

## 質問・サポート

- **Slack**: プロジェクトチャンネルで質問
- **GitHub Issues**: バグ報告、機能リクエスト
- **PR コメント**: コードレビュー時の質問

---

**Last Updated**: 2026-03-22
**Maintained by**: Antigravity & Team
