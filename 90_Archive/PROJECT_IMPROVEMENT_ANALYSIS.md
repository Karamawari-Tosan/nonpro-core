# nonpro-core プロジェクト改善分析レポート

**分析日**: 2026-03-16
**アナリスト**: Claude (Antigravity)
**対象**: nonpro-core リポジトリ全体

---

## エグゼクティブサマリー

**nonpro-core**は、株式会社プランノーツのAI協働型運用システムとして非常によく設計されています。CXOレベルのAIエージェント、実行可能なワークフロー、包括的な知識ベースを統合した成熟したシステムです。

**現状の成熟度**: ⭐⭐⭐⭐☆ (4/5)
基本構造は優秀。標準化と文書の穴埋めで5/5に到達可能。

---

## プロジェクト概要

### 目的
- 企業知識・戦略・ブランドアセットの統合管理
- AIエージェントペルソナ（CXO役割）の定義
- イベント管理、コンテンツ制作、戦略立案のワークフロー
- 開発リソースとテンプレートの提供

### ディレクトリ構造
```
nonpro-core/
├── .agent/                    # AIエージェント定義と自動化
│   ├── skills/               # CXOレベルのAIペルソナ（7種）
│   ├── workflows/            # スラッシュコマンドワークフロー（7種）
│   └── tools/                # Google Apps Script統合等
├── 00_Context_Library/        # ナレッジベース（企業コンテキスト）
│   ├── 10_Knowledge/         # コア知識（16ファイル）
│   └── 20_Glossary/          # 哲学的概念（10ファイル）
├── 80_Resources/              # 再利用可能テンプレート・ツール
│   └── Vivliostyle_Template/ # 縦書き書籍生成システム
└── 99_Guide/                  # ユーザーマニュアル・プレイブック
```

### 技術スタック
- **言語**: JavaScript (Node.js), Python, Markdown
- **主要依存**: Vivliostyle CLI, Google Apps Script, Pillow
- **開発環境**: Antigravity, Claude Code, Git/GitHub
- **プラットフォーム**: Peatix, Google Slides

---

## 🔴 高優先度の改善点

### 1. 未追跡ファイルのコミット
**問題**:
```
?? .agent/workflows/send_event_followup.md
```
イベントフォローアップワークフローが未コミット状態。

**対応策**:
```bash
git add .agent/workflows/send_event_followup.md
git commit -m "Add event followup workflow"
```

---

### 2. アセット管理の不明瞭さ
**問題**:
- `00_Context_Library/10_Knowledge/02_Assets/Asset_Inventory.md` で多数のアセット（書籍、ポッドキャスト、メディア等）を列挙
- 実際のファイルやリンクがリポジトリに存在しない
- `image_utils.py` が参照する `assets/` フォルダが不在

**対応策**:
1. `assets/` ディレクトリを作成:
   ```
   assets/
   ├── images/
   ├── documents/
   ├── media/
   └── README.md  # 管理方針を明記
   ```

2. `assets/README.md` のテンプレート:
   ```markdown
   # Assets Directory

   ## Structure
   - `images/` - イベントヘッダー、SNS画像等
   - `documents/` - 電子書籍、PDF等
   - `media/` - 音声、動画ファイル

   ## Guidelines
   - ファイル命名規則: `YYYY-MM-DD_category_description.ext`
   - 機密情報は含めない（外部ストレージへのリンクを使用）
   - 大容量ファイル（>10MB）はGit LFSを検討
   ```

3. `image_utils.py` のパス修正:
   ```python
   # Before
   image_path = "assets/image.png"  # ハードコード

   # After
   import os
   from pathlib import Path

   ASSETS_DIR = Path(__file__).parent.parent / "assets" / "images"
   image_path = ASSETS_DIR / "image.png"
   ```

---

### 3. 環境設定テンプレートの欠如
**問題**:
- セットアップガイドでAPIキー・認証情報に言及
- `.env.example` が存在しない
- シークレット管理のドキュメントなし

**対応策**:
`.env.example` を作成:
```bash
# Google Apps Script
CLASP_SCRIPT_ID=your_script_id_here

# Peatix API (イベント管理)
PEATIX_API_KEY=your_api_key_here

# Image Generation APIs (optional)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Google Slides API
GOOGLE_SLIDES_CREDENTIALS_PATH=path/to/credentials.json
```

`.gitignore` に追記:
```
# Environment variables
.env
.env.local
```

---

### 4. 依存関係の分散
**問題**:
- Pythonスクリプトに `requirements.txt` なし
- `package.json` がVivliostyleテンプレートにのみ存在
- 依存関係が散在

**対応策**:
1. ルートレベルに `requirements.txt` を作成:
   ```txt
   # Image processing
   Pillow>=10.0.0

   # Optional: QR code generation
   qrcode>=7.4.0
   ```

2. ルートレベルに `package.json` を作成:
   ```json
   {
     "name": "nonpro-core",
     "version": "1.0.0",
     "description": "Plannauts AI-augmented operations system",
     "private": true,
     "workspaces": [
       "80_Resources/Vivliostyle_Template"
     ],
     "scripts": {
       "install:all": "npm install && pip install -r requirements.txt"
     },
     "keywords": ["ai-agents", "knowledge-base", "workflows"],
     "license": "UNLICENSED"
   }
   ```

---

### 5. 変更履歴の不在
**問題**:
- `CHANGELOG.md` がないため重要な更新が追跡しづらい
- コミット履歴のみが頼り

**対応策**:
`CHANGELOG.md` を作成（Keep a Changelog形式）:
```markdown
# Changelog

All notable changes to nonpro-core will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Event followup workflow (`send_event_followup.md`)
- Slide generation workflow with storytelling enhancements

## [1.0.0] - 2026-03-15
### Added
- Initial CXO agent skill definitions (CSO, CCO, CEDO, CLO, CPO, CBO)
- Core knowledge base (Identity, Business Model, Asset Inventory)
- Event management workflows (planning, Peatix page, SNS posts)
- Vivliostyle template for vertical Japanese book publishing
- Setup guide and playbooks for team onboarding

### Changed
- Migrated from sandbox to core repository structure

### Fixed
- Setup guide clarity for members folder creation

---

## Version History
- **1.0.0** (2026-03-15): Initial stable release
```

---

## 🟡 中優先度の改善点

### 6. ドキュメント間のナビゲーション
**問題**:
- 用語集は `[[Obsidianリンク]]` を使用
- 他のKnowledgeドキュメントは標準Markdownリンク
- 中央インデックスなし

**対応策**:
`00_Context_Library/INDEX.md` を作成:
```markdown
# Knowledge Base Index

## Core Knowledge
- [Corporate Identity](10_Knowledge/00_Core/Identity.md)
- [AI Agent Architecture](10_Knowledge/00_Core/Agent_Role_Architecture.md)

## Business Context
- [Business Model](10_Knowledge/01_Business/Business_Model.md)
- [Company History](10_Knowledge/01_Business/History.md)
- [Noble Heat Strategy](10_Knowledge/01_Business/Noble_Heat_Strategy.md)

## Assets
- [Asset Inventory](10_Knowledge/02_Assets/Asset_Inventory.md)

## Philosophical Glossary
- [コミュニティ3.0](20_Glossary/コミュニティ3.0.md)
- [Just Build It](20_Glossary/Just_Build_It.md)
- [デジタル主権](20_Glossary/デジタル主権.md)
- [All glossary terms →](20_Glossary/)

## Related Documents
- [Agent Workflows](../.agent/workflows/)
- [User Guides](../99_Guide/)
- [Resources & Templates](../80_Resources/)
```

---

### 7. メタデータの標準化
**問題**:
- 一部の文書に `Last Updated` フィールド
- Status インジケーターが不統一（✅ 絵文字 vs テキスト）

**対応策**:
全 `.md` ファイルにメタデータヘッダーを義務化:
```markdown
---
title: "Document Title"
last_updated: 2026-03-16
status: Active  # Draft | Active | Archived
owner: CSO  # 責任エージェント/役割
tags: [strategy, planning]
---

# Document Title
...
```

テンプレート用スニペット作成:
```markdown
<!-- Template: docs/templates/knowledge_document.md -->
---
title: ""
last_updated: YYYY-MM-DD
status: Draft
owner:
tags: []
---

## Purpose
Why this document exists

## Content
Main content here

## Related Documents
- [Link](path/to/doc.md)
```

---

### 8. コントリビューションガイドライン
**問題**:
- `CONTRIBUTING.md` が存在しない
- コミットメッセージが英語・日本語混在
- ブランチ戦略・レビュープロセスが不明

**対応策**:
`CONTRIBUTING.md` を作成:
```markdown
# Contributing to nonpro-core

## Commit Message Convention
コミットメッセージは日本語で記述し、以下の形式に従う:

```
<種別>: <要約>

<詳細説明（任意）>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**種別**:
- `追加` - 新機能・ワークフロー・ドキュメント
- `更新` - 既存機能の改善
- `修正` - バグ修正
- `削除` - ファイル・機能の削除
- `リファクタ` - コード整理（機能変更なし）
- `ドキュメント` - ドキュメントのみの変更

**例**:
```
追加: イベントフォローアップワークフローの実装

send_event_followup.mdを追加し、イベント後のお礼メール・
アンケート配信・次回案内の自動化に対応

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Branch Strategy
- `main` - 本番環境（保護ブランチ）
- `develop` - 開発統合ブランチ
- `feature/*` - 機能追加ブランチ
- `fix/*` - バグ修正ブランチ

## Pull Request Process
1. `develop` ブランチから feature ブランチを作成
2. 変更を commit（上記規約に従う）
3. PR を作成し、テンプレートに従って記述
4. レビュー承認後に `develop` へマージ
5. 定期的に `develop` → `main` へリリース

## File Naming Convention
- **構造ファイル**: 英語アンダースコア形式（例: `00_Setup_Guide.md`）
- **コンテンツファイル**: 日本語可（例: `コミュニティ3.0.md`）
- **コードファイル**: 英語スネークケース（例: `image_utils.py`）

## Documentation Standards
- すべての `.md` ファイルにメタデータヘッダーを含める
- 相互参照は相対パスで記述
- スクリーンショットは `assets/images/docs/` に配置
```

---

### 9. ツールのドキュメント不足
**問題**:
- `.agent/tools/slide-generator/` に README なし
- Python スクリプトのインラインドキュメント不足

**対応策**:
`.agent/tools/slide-generator/README.md` を作成:
```markdown
# Slide Generator Tool

Google SlidesとMarkdownを連携するGoogle Apps Scriptツール。

## 機能
- Markdownからスライドを自動生成
- カスタムショートコード対応: `[B]`, `[L]`, `[M]`, `[T]`, `[S]`
- 箇条書き・画像・引用の自動フォーマット

## セットアップ
1. Google Apps Script プロジェクトを作成
2. `Parser.js` と `Code.js` をアップロード
3. スクリプトIDを `.env` に設定:
   ```
   CLASP_SCRIPT_ID=your_script_id_here
   ```

## 使用方法
### ワークフローから実行
```bash
/create_slide_draft "イベントタイトル"
```

### 直接実行
Google Apps Script エディタで `generateSlides()` を実行

## Markdown記法
### レイアウト指定
- `[B]` - Big（大見出し）
- `[L]` - Left（左揃え）
- `[M]` - Middle（中央）
- `[T]` - Title（タイトルスライド）
- `[S]` - Section（セクション区切り）

### サンプル
```markdown
[T]
# イベントタイトル
サブタイトル

[B]
## 大きな見出し

[L]
- 箇条書き項目1
- 箇条書き項目2

[M]
中央揃えのテキスト
```

## API Reference
### `parseMarkdown(text)`
Markdownをスライド構造に変換

**Parameters**:
- `text` (string): Markdownテキスト

**Returns**: Array of slide objects

### `applyLayout(slide, layoutType)`
レイアウトタイプに応じてスライドを整形

**Parameters**:
- `slide` (Slide): Google Slides オブジェクト
- `layoutType` (string): レイアウトID（B, L, M, T, S）

## トラブルシューティング
- **エラー: "Script not found"** → CLA SP_SCRIPT_ID を確認
- **レイアウトが崩れる** → ショートコードの構文をチェック
```

`image_utils.py` にdocstring追加:
```python
"""
Image Canvas Extension Utility

Extends images to 920x450px canvas for event headers.
Preserves aspect ratio and centers the original image.

Usage:
    python image_utils.py input.png output.png

Dependencies:
    - Pillow (PIL)

Example:
    >>> from pathlib import Path
    >>> extend_canvas(Path("logo.png"), Path("header.png"))
"""

from PIL import Image
from pathlib import Path
from typing import Tuple

def extend_canvas(
    input_path: Path,
    output_path: Path,
    target_size: Tuple[int, int] = (920, 450)
) -> None:
    """
    Extend image to target canvas size with centered placement.

    Args:
        input_path: Path to input image file
        output_path: Path to save extended image
        target_size: Target canvas size as (width, height) tuple

    Raises:
        FileNotFoundError: If input image doesn't exist
        PIL.UnidentifiedImageError: If input is not a valid image
    """
    # Implementation...
```

---

### 10. ワークフローの検証手順
**問題**:
- ワークフローが正しく動作するか確認方法が不明
- テストスクリプトなし

**対応策**:
`99_Guide/00_Playbook/99_Workflow_Validation.md` を作成:
```markdown
# Workflow Validation Checklist

各ワークフローの動作確認手順。

## `/cxo_summit` - CXO Summit
- [ ] 会議議題を入力して実行
- [ ] 各CXOエージェントからの発言が生成される
- [ ] 議事録が構造化されている
- [ ] アクションアイテムが明確

**成功条件**: 3名以上のCXOからの意見 + 具体的なネクストアクション

---

## `/create_event_plan` - Event Planning
- [ ] イベントコンセプトを入力して実行
- [ ] 企画書が生成される（目的・対象者・内容・運営）
- [ ] Peatix説明文案が含まれる
- [ ] タイムテーブルが具体的

**成功条件**: 即座にPeatixに転記可能なレベルの完成度

---

## `/create_peatix_page` - Peatix Page Creation
- [ ] イベント情報を入力して実行
- [ ] Peatix管理画面用のフォーマット
- [ ] SEO最適化された説明文
- [ ] ハッシュタグ・カテゴリ提案

**成功条件**: コピペで Peatix ページが完成

---

## `/create_slide_draft` - Slide Generation
- [ ] スライドテーマを入力して実行
- [ ] Markdown形式のスライド案が生成
- [ ] ショートコード（[B], [L]等）が正しく使用
- [ ] 論理的な流れ（導入→本論→まとめ）

**成功条件**: Google Apps Scriptツールで変換可能

**手動テスト**:
1. 生成されたMarkdownをコピー
2. Google Apps Script エディタで実行
3. スライドが自動生成されることを確認

---

## `/create_event_sns_post` - SNS Posts
- [ ] イベント情報を入力して実行
- [ ] X（Twitter）・Note・Podcast用の投稿案
- [ ] 各プラットフォームの文字数制限遵守
- [ ] ハッシュタグ・絵文字が適切

**成功条件**: 修正なしで即投稿可能

---

## `/generate_event_header` - Header Image
- [ ] イベント情報を入力して実行
- [ ] デザイン指示が生成される
- [ ] 920x450pxの仕様
- [ ] ブランドガイドライン準拠

**成功条件**: デザイナーまたは画像生成AIに渡せる

**手動テスト**:
1. 生成された指示をMidjourneyに投稿
2. 出力画像を `image_utils.py` で拡張
   ```bash
   python .agent/scripts/image_utils.py input.png output.png
   ```
3. 920x450pxになることを確認

---

## `/send_event_followup` - Event Followup
- [ ] イベント情報を入力して実行
- [ ] お礼メール案が生成される
- [ ] アンケートリンク埋め込み箇所
- [ ] 次回イベント案内（任意）

**成功条件**: 参加者に即送信可能な品質

---

## Automated Testing (将来)
現在は手動チェックリストのみ。将来的には以下を検討:

```bash
# テストスクリプト例
npm run test:workflows
```

**テスト項目**:
- Markdown構文の妥当性
- 必須フィールドの存在確認
- 文字数制限チェック
- リンク切れ検出
```

---

## 🟢 低優先度の改善点

### 11. ファイル命名規則の統一
**問題**: アンダースコアとスペースが混在

**対応策**: `CONTRIBUTING.md` で規約を明記（上記参照）

---

### 12. ハードコードされたパス
**問題**: `image_utils.py` 等にハードコード

**対応策**: 設定ファイル化（上記 #4 で対応済み）

---

### 13. 視覚的な構成図
**問題**: CXOエージェントの関係性やワークフローフローの図がない

**対応策**: `README.md` または `00_Context_Library/10_Knowledge/00_Core/` に Mermaid 図を追加:

```mermaid
graph TD
    A[Antigravity/Claude] --> B{CXO Skills}
    B --> C[CSO - Strategy]
    B --> D[CCO - Community]
    B --> E[CEDO - Editorial]
    B --> F[CLO - Learning]
    B --> G[CPO - Partnership]
    B --> H[CBO - Brand]

    C --> I[/cxo_summit]
    D --> J[/create_event_plan]
    E --> K[/create_slide_draft]
    F --> L[Event Workflows]
    G --> M[Partnership Workflows]
    H --> N[/create_event_sns_post]

    I --> O[Knowledge Base]
    J --> O
    K --> O

    O --> P[Context Library]
    O --> Q[Glossary]
```

---

### 14. サンプル出力の提供
**問題**: 各ワークフローの実行結果例がない

**対応策**: `examples/` ディレクトリを作成:
```
examples/
├── event_plan_sample.md
├── slide_draft_sample.md
├── sns_posts_sample.md
└── peatix_page_sample.md
```

---

## ユニークな強み（維持すべき点）

1. **人間-AI協働モデル**: 真の「Augmented C-Suite」を実現
2. **哲学駆動開発**: 明示的な価値観（慎独、Give First）がコードに組み込み
3. **バイリンガル知識管理**: 日本語のニュアンスを保持しながらアクセス可能
4. **ワークフロー＝ドキュメント**: 実行可能なプレイブック
5. **コンテキスト認識AI**: 共有知識ベースを参照し一貫性を確保
6. **コミュニティ中心**: イベント・コンテンツ制作の協働ツール

---

## 実装優先順位

### Phase 1（即時対応）
1. ✅ 未追跡ファイルのコミット
2. ✅ `.env.example` 作成
3. ✅ `CHANGELOG.md` 開始
4. ✅ ルートレベル `requirements.txt` 作成

### Phase 2（1週間以内）
5. ✅ `assets/` ディレクトリ構築
6. ✅ `CONTRIBUTING.md` 作成
7. ✅ メタデータ標準化テンプレート作成
8. ✅ `00_Context_Library/INDEX.md` 作成

### Phase 3（2週間以内）
9. ✅ 各ツールのREADME追加
10. ✅ ワークフロー検証チェックリスト作成
11. ✅ 既存ドキュメントへのメタデータ付与
12. ✅ Mermaid図の追加

### Phase 4（1ヶ月以内）
13. ✅ サンプル出力の収集・整理
14. ✅ ハードコードパスの環境変数化
15. ✅ コミット履歴の英日統一（新規コミットから）
16. ✅ 自動テストスクリプトの検討

---

## 参考リソース

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)（日本語版も検討）
- [Mermaid Documentation](https://mermaid.js.org/)
- [Markdown Guide](https://www.markdownguide.org/)

---

## 結論

**nonpro-core** は既に高い成熟度を持つプロジェクトです。上記の改善を段階的に実施することで、以下が達成されます:

- **透明性**: 変更履歴・貢献ガイドラインによる明確化
- **保守性**: 標準化されたメタデータ・命名規則
- **発見性**: 中央インデックス・視覚的構成図
- **再現性**: サンプル出力・検証チェックリスト
- **セキュリティ**: 環境変数管理・シークレット分離

現在の 4/5 → 5/5 への進化が期待できます。

---

**Generated by**: Claude (Antigravity)
**Model**: claude-sonnet-4-5-20250929
**Date**: 2026-03-16
