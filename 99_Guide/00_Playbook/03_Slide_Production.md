# スライド制作マニュアル (Slide Production Playbook)

Markdown原稿からスライドを生成する `slide-generator` 用の構成案作成ガイドおよびGAS連携手順です。

---

## 概要

Peatixのイベントページ案や企画書などの元原稿から、専用のフォーマットに従ったMarkdownファイルを生成し、Google Apps Script (GAS) を用いてGoogleスライドに変換します。

> **Action:**
> 1. Chat欄で `/create_slide_draft` を実行して、ドラフト作成を開始。
> 2. 完成したMarkdownをGASでGoogleスライドに変換。

---

## Part 1: Markdown作成 (Drafting)

### ファイルフォーマット仕様

`parser.js` が解釈可能な以下のルールに従って記述する必要があります。

#### 1. 階層構造
*   **H1 (`#`)**: プレゼンテーション全体のタイトル（表紙）
    *   **H2 (`##`)**: サブタイトル
*   **List Level 1 (`1. `)**: セクション区切り
*   **List Level 2 (`  1. `)**: スライドタイトル
*   **List Level 3 (`    - `)**: スライド本文（箇条書き）

#### 2. レイアウト指定コード
スライドタイトルの末尾に、以下のコードを付与することでレイアウトを指定します。
**※注意: 必ず「スライドタイトル行」に記述してください。本文行（箇条書き）に書いても無視されます。**

| コード | レイアウト名 | 説明 |
| :--- | :--- | :--- |
| `[S]` | **Section** | セクション扉（青背景など）。Level 1リストで使用。 |
| `[B]` | **Body** | タイトル＋本文の標準レイアウト（デフォルト）。 |
| `[L]` | **Bullets** | 箇条書き重視のレイアウト。 |
| `[M]` | **Message** | 中央揃え。メッセージやサブタイトルのみの強調スライド。 |
| `[T]` | **Title Only** | タイトルのみ。 |

#### 記述例

```markdown
# ノンプロ研へようこそ
## 楽しく学ぶコミュニティ

1. イントロダクション [S]

  1. 自己紹介 [B]
    - 名前: 高橋
    - 所属: プランノーツ
    - 好きな言語: GAS, Python

  1. 今日のゴール [M]
    - 「プログラミングの楽しさ」を持ち帰る

1. メインパート [S]
   ...
```

---

## Part 2: Google Slides連携 (GAS Creation)

作成したMarkdownファイルをGoogleスライドに変換する手順です。

### 必要なツール・環境
*   **Google Drive:** パソコン版ドライブでローカルと同期されていること。
    *   **同期フォルダ:** [Google Drive Link](https://drive.google.com/drive/folders/1aeZr7fcm5_8PksEqXHXQUx5NfPLhM6jE)
*   **GASスクリプト:** `md_to_slides` が実装されたGoogleスライド作成用プロジェクト。
    *   **スライド:** [Google Slides Link](https://docs.google.com/presentation/d/1NNw8dunU2kzqVcCQK9onHr_CGToxRCgdJYAOh8id_dQ/edit?usp=sharing)

### 手順

1.  **Markdownの保存:**
    作成した `Slide_Deck.md` を、Google Drive上の同期フォルダ（GASが読み取るフォルダ）に保存します。

2.  **GASの実行:**
    Googleスライドを開き、ツールバーに追加されたメニュー **`Antigravity` > `Update from Drive`** を実行します。
    （※メニュー名はスクリプトの実装により異なる場合があります。`Update form Drive` 等と表示される場合もあります）

3.  **生成確認:**
    指定したマスタレイアウト（企業用テンプレートなど）が適用され、Markdownの内容がスライドとして生成されます。

4.  **微調整 (Polish):**
    生成されたスライドに対して、画像の配置やフォントの微調整を手動で行います。

### 逆同期 (Reverse Sync / Optional)
スライド側で行った変更をMarkdownに書き戻す `slides_to_md` 機能がある場合は、Googleスライド上で編集した内容をMarkdown正本に反映させることも可能です。
これにより、「Markdown = 正本 (Source of Truth)」の状態を維持できます。
