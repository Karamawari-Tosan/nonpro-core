# Slide Generator - Technical Documentation

**バージョン**: 1.0.0
**技術スタック**: Google Apps Script (JavaScript)
**用途**: Markdown → Google Slides 自動生成

---

## 概要

Markdown形式のテキストファイルを解析し、Google Slidesプレゼンテーションを自動生成するGoogle Apps Scriptツールです。双方向同期機能により、スライド→Markdownのエクスポートも可能です。

### 主な機能

1. **Markdown → Google Slides 生成** (`Import from Drive`)
2. **Google Slides → Markdown エクスポート** (`Export to Drive`)
3. **カスタムショートコード対応** (`[T]`, `[S]`, `[B]`, `[L]`, `[M]`)
4. **レイアウト自動判定** (表紙、セクション、本文、箇条書き、メッセージ)

---

## アーキテクチャ

### ファイル構成

```
slide-generator/
├── .clasp.json          # Google Apps Script プロジェクト設定
└── src/
    ├── config.js        # レイアウト定義・設定管理
    ├── parser.js        # Markdown解析エンジン
    ├── generator.js     # スライド生成ロジック
    ├── ui.js            # UIメニュー・ダイアログ
    └── reverse_sync.js  # スライド→Markdown逆変換
```

### データフロー

#### Import (Markdown → Slides)

```
Markdownファイル (Drive)
    ↓
[parser.js] parseMarkdown()
    ↓
スライドオブジェクト配列
    ↓
[generator.js] createSlide()
    ↓
Google Slidesプレゼンテーション
```

#### Export (Slides → Markdown)

```
Google Slidesプレゼンテーション
    ↓
[reverse_sync.js] extractContentSlideData()
    ↓
Markdownテキスト
    ↓
Markdownファイル (Drive)
```

---

## コンポーネント詳細

### 1. config.js - 設定とレイアウト定義

#### CONFIG オブジェクト

| プロパティ | 型 | 説明 |
|:---|:---|:---|
| `getDriveFolderId()` | function | プロパティストアからDriveフォルダIDを取得 |
| `setDriveFolderId(id)` | function | DriveフォルダIDをプロパティストアに保存 |
| `LAYOUTS` | object | レイアウト定義マップ |
| `SHORTCODES` | object | ショートコードマップ |

#### レイアウト定義

```javascript
LAYOUTS: {
  TITLE: {
    NAME: 'CUSTOM_7_1_1',           // Google Slidesレイアウト名
    PLACEHOLDERS: {
      TITLE: { type: 'TITLE', index: 0 },
      SUBTITLE: { type: 'TITLE', index: 1 }
    }
  },
  SECTION: { ... },
  BODY: { ... },
  BULLETS: { ... },
  MESSAGE: { ... }
}
```

#### ショートコード

| ショートコード | レイアウト | 用途 |
|:---:|:---|:---|
| `[T]` | TITLE | 表紙スライド |
| `[S]` | SECTION | セクション区切り |
| `[B]` | BODY | 通常スライド |
| `[L]` | BULLETS | 箇条書きスライド |
| `[M]` | MESSAGE | メッセージスライド |

---

### 2. parser.js - Markdown解析エンジン

#### API

```javascript
function parseMarkdown(markdownText) → Array<SlideObject>
```

**パラメータ:**
- `markdownText` (string): 解析対象のMarkdownテキスト

**戻り値:**
```javascript
[
  {
    layout: 'TITLE',
    title: 'メインタイトル',
    subtitle: 'サブタイトル'
  },
  {
    layout: 'SECTION',
    title: 'セクション名'
  },
  {
    layout: 'BODY',
    title: 'スライドタイトル',
    bodyItems: [
      { text: '箇条書き1', level: 0 },
      { text: '箇条書き2', level: 1 }
    ]
  }
]
```

#### 解析ルール

1. **表紙スライド**: 最初の `# H1` と `## H2` を検出
   ```markdown
   # メインタイトル
   ## サブタイトル
   ```

2. **セクションスライド**: インデントなしの数字リスト
   ```markdown
   1. セクション名
   ```

3. **コンテンツスライド**: インデントありの数字リスト
   ```markdown
     1. スライドタイトル
   ```

4. **箇条書き**: さらにインデントした箇条書き
   ```markdown
     1. [L] スライドタイトル
       - 箇条書き1
       - 箇条書き2
   ```

5. **ショートコード検出**:
   - 同じ行内: `1. [M] メッセージ`
   - 前の行のHTMLコメント: `<!-- layout: Message -->`

#### インデントレベル判定

```javascript
indentLevel === 0 && marker.match(/^\d+\.$/) → Level 1 (SECTION)
indentLevel >= 2 && indentLevel <= 4 && marker.match(/^\d+\.$/) → Level 2 (BODY)
indentLevel >= 4 && marker === '-' → Level 3 (箇条書き本文)
```

---

### 3. generator.js - スライド生成ロジック

#### メイン関数

```javascript
function generateSlides(fileName)
```

**処理フロー:**
1. Driveフォルダから指定ファイルを取得
2. ファイル内容を読み込み
3. `parseMarkdown()` で解析
4. テンプレートプレゼンテーションをコピー
5. 既存スライドをクリア
6. パース結果を元にスライドを生成

#### スライド作成

```javascript
function createSlide(presentation, slideData, slideNumber)
```

**処理:**
1. レイアウト設定を取得
2. マスターからレイアウトを検索
3. スライドを追加
4. プレースホルダに内容を流し込む

#### プレースホルダ設定

```javascript
function fillPlaceholder(slide, slideData, layoutConfig, slideNumber)
```

**設定内容:**
- **TITLE**: タイトルプレースホルダ
- **SUBTITLE**: サブタイトルプレースホルダ
- **BODY**: 本文プレースホルダ
  - BULLETS レイアウトの場合は箇条書きスタイルを適用
  - ネストレベルに応じてタブ文字 (`\t`) を挿入

---

### 4. ui.js - UIメニュー

#### カスタムメニュー

```javascript
function onOpen()
```

**メニュー構成:**
```
AntiGravity
├── Import from Drive     → showImportDialog()
├── Export to Drive       → showExportDialog()
├── ────────
├── Settings              → showSettings()
├── ────────
├── レイアウト一覧       → showLayoutInfo()
└── About                 → showAbout()
```

#### ダイアログ関数

| 関数 | 説明 |
|:---|:---|
| `showImportDialog()` | Markdownファイル名を入力してスライド生成 |
| `showExportDialog()` | プレゼンテーション名を入力してMarkdownエクスポート |
| `showSettings()` | DriveフォルダIDを設定 |
| `showLayoutInfo()` | 現在のプレゼンテーションのレイアウト一覧を表示 |
| `showAbout()` | ツールの情報を表示 |

---

### 5. reverse_sync.js - 逆変換機能

#### API

```javascript
function exportSlidesToMarkdown(presentationFileName) → string
```

**処理フロー:**
1. DriveフォルダからプレゼンテーションファイルをGoogle Slidesとして検索
2. プレゼンテーションを開く
3. 各スライドをレイアウトタイプ別に解析
4. Markdown形式に変換
5. 同名の `.md` ファイルを作成または上書き

#### スライド→Markdown変換ルール

| レイアウト | Markdown形式 |
|:---|:---|
| TITLE | `# Title`<br>`## Subtitle` |
| SECTION | `1. Section Title` |
| BODY | `  1. Slide Title`<br>`    - Body item` |
| BULLETS | `  1. [L] Slide Title`<br>`    - Bullet item` |
| MESSAGE | `  1. [M] Message` |

---

## 開発環境のセットアップ

### 前提条件

- Google アカウント
- Google Drive アクセス
- Google Slides テンプレートファイル

### インストール手順

#### 1. clasp のインストール

```bash
npm install -g @google/clasp
```

#### 2. Google Apps Script にログイン

```bash
clasp login
```

#### 3. プロジェクトをプッシュ

```bash
cd .agent/tools/slide-generator
clasp push
```

#### 4. スクリプトを開く

```bash
clasp open
```

---

## 設定

### DriveフォルダIDの設定

1. Google Slidesでテンプレートプレゼンテーションを開く
2. メニューから `AntiGravity` > `Settings` を選択
3. DriveフォルダのURLから最後の部分（フォルダID）をコピー
   ```
   https://drive.google.com/drive/folders/FOLDER_ID_HERE
   ```
4. ダイアログに貼り付けて保存

**保存場所**: `PropertiesService.getScriptProperties()`

---

## 使用方法（開発者向け）

### Markdown ファイルの作成

```markdown
# イベントタイトル
## サブタイトル

1. セクション1

  1. スライド1のタイトル
    - 箇条書き1
    - 箇条書き2

  2. [L] スライド2のタイトル
    - 箇条書き1
      - ネスト箇条書き

  3. [M] メッセージ
```

### スライド生成の実行

**方法1: UIメニューから**
1. テンプレートプレゼンテーションを開く
2. `AntiGravity` > `Import from Drive`
3. ファイル名を入力（例: `Slide_Outline.md`）

**方法2: スクリプトエディタから**
```javascript
function test() {
  generateSlides('Slide_Outline.md');
}
```

### エクスポートの実行

1. 対象プレゼンテーションを開く
2. `AntiGravity` > `Export to Drive`
3. ファイル名を入力

---

## デバッグ

### ログの確認

スクリプトエディタの `Executions` タブまたは以下のコマンド:

```bash
clasp logs
```

### よくあるエラー

| エラー | 原因 | 解決方法 |
|:---|:---|:---|
| `File not found` | MarkdownファイルがDriveフォルダにない | ファイルの配置場所を確認 |
| `Layout not found` | レイアウト名がCONFIGと一致しない | `showLayoutInfo()` で現在のレイアウト名を確認 |
| `Drive Folder ID not set` | フォルダIDが未設定 | Settings から設定 |

---

## テスト

### 手動テスト手順

1. サンプルMarkdownファイルを作成
2. Driveフォルダにアップロード
3. `Import from Drive` で生成
4. スライドが正しく生成されることを確認
5. `Export to Drive` で逆変換
6. 元のMarkdownと比較

---

## 拡張方法

### 新しいレイアウトの追加

1. **config.js** にレイアウト定義を追加:
```javascript
LAYOUTS: {
  NEW_LAYOUT: {
    NAME: 'CUSTOM_X',
    PLACEHOLDERS: {
      TITLE: { type: 'TITLE', index: 0 }
    }
  }
}
```

2. **ショートコード追加**:
```javascript
SHORTCODES: {
  '[N]': 'NEW_LAYOUT'
}
```

3. **reverse_sync.js** に逆変換ロジック追加

---

## API リファレンス

### parseMarkdown(markdownText)

Markdownテキストを解析してスライドオブジェクト配列を返す。

**パラメータ:**
- `markdownText` (string): Markdownテキスト

**戻り値:** `Array<{layout, title, subtitle?, bodyItems?}>`

---

### generateSlides(fileName)

指定されたMarkdownファイルからスライドを生成する。

**パラメータ:**
- `fileName` (string): Driveフォルダ内のMarkdownファイル名

**例外:**
- ファイルが見つからない場合
- フォルダIDが未設定の場合

---

### exportSlidesToMarkdown(presentationFileName)

プレゼンテーションをMarkdownにエクスポートする。

**パラメータ:**
- `presentationFileName` (string): プレゼンテーション名

**戻り値:** `string` - エクスポート結果メッセージ

---

## トラブルシューティング

### レイアウトが正しく認識されない

**原因**: テンプレートのレイアウト名とCONFIG.LAYOUTSの定義が一致していない

**解決方法**:
1. `showLayoutInfo()` を実行して現在のレイアウト名を確認
2. config.js の LAYOUTS.*.NAME を更新

### プレースホルダが見つからない

**原因**: レイアウトに該当するプレースホルダが存在しない

**解決方法**:
1. Google Slidesでマスタースライドを編集
2. 必要なプレースホルダを追加

---

## 制限事項

- Google Apps Scriptの実行時間制限（6分）
- 一度に生成できるスライド数の上限（実行時間による）
- Markdown構文の一部のみサポート（画像、表、リンクなど未対応）

---

## 関連ドキュメント

- **エンドユーザー向け使い方ガイド**: [../../../99_Guide/01_Tools/01_Slide_Generator_Guide.md](../../../99_Guide/01_Tools/01_Slide_Generator_Guide.md)
- **スライド制作Playbook**: [../../../99_Guide/00_Playbook/03_Slide_Production.md](../../../99_Guide/00_Playbook/03_Slide_Production.md)
- **ワークフロー**: [../../workflows/create_slide_draft.md](../../workflows/create_slide_draft.md)

---

**Last Updated**: 2026-03-22
**Maintained by**: Antigravity & Team
**For Developers**: このドキュメントは開発者・保守担当者向けです。
