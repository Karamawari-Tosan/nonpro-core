# ガイド・マニュアル

nonpro-core を使い始めるためのガイドとマニュアルのインデックスです。

---

## 🚀 はじめに

### [00_Setup_Guide.md](00_Setup_Guide.md)
**環境構築・オンボーディングガイド**

nonpro-core プロジェクトに参加するための環境構築手順です。以下の内容を含みます：
- 開発ツールのインストール（Antigravity, Node.js, AI CLI）
- Git / GitHub のセットアップ
- リポジトリのクローン手順
- Sandbox を使った Git/GitHub 練習

**対象**: 新規参加メンバー全員

---

## 🔒 セキュリティ・ガイドライン

### [01_Security_Guidelines.md](01_Security_Guidelines.md)
**Antigravity セキュリティ・プライバシー利用ガイドライン**

AIコーディングアシスタントを安全に利用するためのベストプラクティス。以下の内容を含みます：
- 推奨される設定（Telemetry, File Access, Clipboard など）
- 入力を避けるべき情報リスト（認証情報、PII、インフラ構成など）
- 安全に利用するためのテクニック（環境変数、ダミー化、抽象化）

**対象**: Antigravity / Claude Code 利用者全員

---

## 📖 Playbook - 業務マニュアル

定型業務の標準手順書（SOP: Standard Operating Procedure）です。

### [00_Playbook/00_Start_Here.md](00_Playbook/00_Start_Here.md)
**プレイブック全体の入口**

各業務マニュアルの概要と使い方の案内。

---

### 戦略・企画系

#### [00_Playbook/01_Strategic_Meeting.md](00_Playbook/01_Strategic_Meeting.md)
**戦略会議の進め方**

CXO Summit など、戦略的な意思決定会議の運営方法。

**関連ワークフロー**: `/cxo_summit`

---

### イベント運営系

#### [00_Playbook/02_Event_Management.md](00_Playbook/02_Event_Management.md)
**イベント企画・運営マニュアル**

イベントの企画から事後対応までの一連の流れ。

**関連ワークフロー**:
- `/create_event_plan` - イベント企画書生成
- `/create_peatix_page` - Peatixページ作成
- `/create_event_sns_post` - SNS投稿文作成
- `/generate_event_header` - ヘッダー画像デザイン指示
- `/send_event_followup` - イベント事後フォローアップ

---

### コンテンツ制作系

#### [00_Playbook/03_Slide_Production.md](00_Playbook/03_Slide_Production.md)
**スライド制作マニュアル**

登壇スライドやプレゼン資料の制作手順。

**関連ワークフロー**: `/create_slide_draft`
**関連ツール**: [01_Tools/01_Slide_Generator_Guide.md](01_Tools/01_Slide_Generator_Guide.md)

---

## 🛠️ ツール使い方ガイド

各ツールのエンドユーザー向け使い方ガイドです。

### [01_Tools/README.md](01_Tools/README.md)
**ツール一覧とクイックリファレンス**

利用可能なツールの一覧と概要。

---

### 現在利用可能なツール

#### [01_Tools/01_Slide_Generator_Guide.md](01_Tools/) *(作成予定)*
**スライド生成ツールの使い方**

Markdown から Google Slides を自動生成するツールの使い方。

- コマンドの実行方法
- Markdown記法とショートコード
- よくある質問

---

## 🔗 その他の関連ドキュメント

### AIエージェント（スキル・ワークフロー）の詳細
技術的な詳細や開発ガイドについては、[.agent/README.md](../.agent/README.md) を参照してください。

### ナレッジベース
企業情報、ビジネスコンテキスト、用語集については、[00_Context_Library/INDEX.md](../00_Context_Library/INDEX.md) を参照してください。

### リソース・テンプレート
再利用可能なテンプレートやツールについては、[80_Resources/](../80_Resources/) を参照してください。

---

## 📝 推奨読書順序

### 新規参加メンバー
1. **[00_Setup_Guide.md](00_Setup_Guide.md)** - 環境構築
2. **[01_Security_Guidelines.md](01_Security_Guidelines.md)** - セキュリティ理解
3. **[00_Playbook/00_Start_Here.md](00_Playbook/00_Start_Here.md)** - 業務フローの理解
4. 自分の担当する業務の Playbook を参照

### 既存メンバー
- 必要な業務の Playbook を都度参照
- ツールの使い方は `01_Tools/` を参照

---

**Last Updated**: 2026-03-22
**Maintained by**: Antigravity & Team
