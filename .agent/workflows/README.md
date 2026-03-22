# Workflows - 自動化ワークフロー（開発ガイド）

定型業務を自動化するスラッシュコマンド形式のワークフロー定義ファイル群。

---

## 📋 既存ワークフロー一覧

| ファイル名 | コマンド | 説明 | 主な出力 |
|:---|:---|:---|:---|
| `cxo_summit.md` | `/cxo_summit` | CXO会議の開催 | 各CXOの意見、議事録 |
| `create_event_plan.md` | `/create_event_plan` | イベント企画書生成 | 企画書、Peatix説明文 |
| `create_peatix_page.md` | `/create_peatix_page` | Peatixページ作成 | イベントページ用テキスト |
| `create_slide_draft.md` | `/create_slide_draft` | スライド草案生成 | Markdown形式スライド |
| `create_event_sns_post.md` | `/create_event_sns_post` | SNS投稿文作成 | X、Note、Podcast投稿文 |
| `generate_event_header.md` | `/generate_event_header` | ヘッダー画像指示 | 画像生成プロンプト |
| `send_event_followup.md` | `/send_event_followup` | イベント事後対応 | お礼メール、アンケート |

---

## 🏗️ ワークフローファイルの構造

各ワークフローは `.agent/workflows/` 直下に `[workflow_name].md` として定義されます。

### 基本フォーマット

```markdown
# [ワークフロー名]

## Purpose（目的）
このワークフローは[具体的な目的]を実現します。

## Input（入力）
- パラメータ1: [説明]
- パラメータ2: [説明]

## Process（処理手順）
1. ステップ1
2. ステップ2
3. ...

## Output（出力）
- 出力物1: [説明]
- 出力物2: [説明]

## Knowledge Base（参照ナレッジ）
このワークフローは以下を参照します：
- `00_Context_Library/...`

## Tools（使用ツール）
- ツール名1（任意）
- ツール名2（任意）

## Example（実行例）
\```
/workflow_name "パラメータ例"
\```
```

---

## 🆕 新規ワークフローの作成手順

### 1. ワークフロー定義ファイルを作成

```bash
touch .agent/workflows/new_workflow.md
```

### 2. ワークフロー内容を記述

テンプレートを使用してワークフローを定義します。

```markdown
# New Workflow

## Purpose
[このワークフローが解決する課題]

## Input
- 必須パラメータ: [説明]
- オプションパラメータ: [説明]

## Process
1. [処理ステップ1]
2. [処理ステップ2]
3. [出力生成]

## Output
- [出力形式と内容]

## Knowledge Base
- [参照すべきナレッジファイル]

## Example
\```
/new_workflow "example input"
\```
```

### 3. スキルとの連携（任意）

特定のスキルペルソナを呼び出す場合は明記します。

```markdown
## Skills Used
このワークフローは以下のスキルを活用します：
- `@CCO_Community_Architect` - イベント企画部分
- `@CEDO_Editor` - 文章磨き込み部分
```

### 4. 動作確認

Antigravity で `/` を入力し、新規ワークフローが候補に表示されることを確認します。

```
/new_workflow "test parameter"
```

---

## ✏️ 既存ワークフローの修正

1. 対象ワークフローの `.md` ファイルを編集
2. Antigravity を再起動（ワークフロー定義の再読み込み）
3. 動作確認

---

## 🎯 ワークフロー設計のベストプラクティス

### 1. 明確な目的設定
ワークフローが解決する具体的な課題を明記します。

### 2. 再現可能な手順
誰が実行しても同じ品質の出力が得られるよう、手順を詳細に記述します。

### 3. ナレッジベースとの統合
企業固有の情報はワークフロー内にハードコードせず、`00_Context_Library/` を参照します。

### 4. 実行例の提供
エンドユーザーが迷わないよう、具体的な実行例を必ず含めます。

### 5. エラーハンドリング
入力が不足している場合や想定外のケースの処理方法を定義します。

---

## 🔗 外部ツールとの連携

ワークフローから外部スクリプトやツールを呼び出す場合の記述例：

```markdown
## Tools
このワークフローは以下のツールを使用します：
- `tools/slide-generator/` - Markdown → Google Slides 変換
- `tools/image_utils.py` - 画像キャンバス拡張

## Process
3. 生成されたMarkdownを `slide-generator` ツールに渡してスライド化
4. ヘッダー画像を `image_utils.py` で920x450pxに拡張
```

---

## 📊 ワークフロー検証チェックリスト

新規ワークフローまたは修正後、以下を確認します：

- [ ] 目的が明確に定義されている
- [ ] 必要な入力パラメータが文書化されている
- [ ] 処理手順が再現可能である
- [ ] 出力形式が具体的に記述されている
- [ ] 実行例が提供されている
- [ ] 参照するナレッジベースがリンクされている
- [ ] 使用するツール・スキルが明記されている（該当する場合）
- [ ] 実際に実行して期待通りの出力が得られる

---

## 🔗 関連ドキュメント

- **エンドユーザー向けワークフロー使い方**: [../../99_Guide/00_Playbook/](../../99_Guide/00_Playbook/)
- **スキル開発ガイド**: [../skills/README.md](../skills/README.md)
- **ツール開発ガイド**: [../tools/README.md](../tools/README.md)
- **ナレッジベース索引**: [../../00_Context_Library/INDEX.md](../../00_Context_Library/INDEX.md)

---

**Last Updated**: 2026-03-22
**For Developers**: このドキュメントは開発者・保守担当者向けです。
