# 縦書き書籍制作マニュアル (Vertical Book Production)

Vivliostyleを使用した、Markdown原稿から縦書きPDFを生成するための制作フローおよび環境構築マニュアルです。

---

## 1. プロジェクトの開始

Antigravityのワークフロー機能を使用して、新規プロジェクトを最速で構築できます。

> **Action:**
> Chat欄で以下のように入力してください。
> `@antigravity /create_vertical_book [プロジェクト名]`
> 例: `/create_vertical_book 10_Projects/MyBook`

これにより、`nonpro-core` にあるテンプレートから必要なファイル一式がコピーされ、執筆環境が整います。

## 2. ディレクトリ構成

```text
Project_Root/
├── manuscript/          # [必須] 原稿用Markdownファイルを格納
│   ├── 01_Chapter.md    # 章ごとのファイル（ファイル名順に結合されます）
│   ├── 02_Chapter.md
│   └── colophon.md      # 奥付ファイル
├── scripts/             # ビルド用スクリプト
├── theme.css            # 書籍のデザイン設定
├── vivliostyle.config.js # Vivliostyle設定ファイル
└── package.json         # 依存パッケージ管理
```

## 3. 原稿の執筆ルール

`manuscript` フォルダ内にMarkdown形式(`.md`)で原稿を配置します。

*   **ファイル順序**: ファイル名順（昇順）に結合されます。`01_...`, `02_...` のように番号を振ることを推奨します。
*   **見出し (TOC)**: `# 見出し1` (H1) で記述された箇所が、自動的に「目次」として抽出されます。
*   **縦書き自動処理**: 半角英数字は自動的に縦中横（2桁まで）または正立（1桁）のクラスが付与されます。
*   **改ページ**: ファイルの結合部には自動的に改ページが入ります。

### 特殊機能: QRコード生成
URLをQRコードとして紙面に掲載できます。
*   `[リンクテキスト](https://example.com)` → QRコード生成＋行内配置
*   `https://example.com` → テキストのみ表示

## 4. PDFの生成 (Build)

ターミナルでプロジェクトフォルダを開き、以下のコマンドを実行します。

```bash
npm run build
```

処理が完了すると、プロジェクトルートに `book.pdf` が生成されます。

## 5. デザイン調整

`theme.css` を編集することで、フォントや余白などの見た目を調整できます。
デザインテンプレート本体は `nonpro-core/80_Resources/Vivliostyle_Template` に保管されています。
