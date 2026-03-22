# 画像拡張ツール 使い方ガイド

イベントヘッダー画像を920x450pxのキャンバスに拡張するPythonスクリプトの使い方を説明します。

---

## 📋 概要

このツールは、任意のサイズの画像を920x450px（イベントヘッダー用サイズ）のキャンバスに拡張します。

### できること

- ✅ 画像を920x450pxキャンバスに拡張
- ✅ 元の画像を右側に配置
- ✅ 左側の余白を自動的に埋める（左端のピクセルを伸ばして使用）
- ✅ アスペクト比を保持

### 用途

- イベントヘッダー画像の作成（Peatix, connpass等）
- SNS投稿用画像の調整

---

## 🚀 基本的な使い方

### 前提条件

**Python** と **Pillow（PIL）** がインストールされている必要があります。

#### Pillowのインストール

```bash
pip install Pillow
```

---

### ステップ1: 元画像を用意

任意のサイズの画像（PNG, JPG等）を用意します。

---

### ステップ2: スクリプトを実行

```bash
python .agent/scripts/image_utils.py [入力画像パス]
```

**例:**

```bash
python .agent/scripts/image_utils.py event_logo.png
```

---

### ステップ3: 出力画像を確認

元画像と同じフォルダに、`_extended_920x450.png` というサフィックスが付いたファイルが生成されます。

**例:**
- 入力: `event_logo.png`
- 出力: `event_logo_extended_920x450.png`

---

## 💡 よくある使い方

### ワークフローと組み合わせる

イベントヘッダー画像生成ワークフローと組み合わせて使います。

#### ステップ1: デザイン指示を生成

```
/generate_event_header "イベント名"
```

このワークフローで、画像生成AI用のプロンプトが作成されます。

#### ステップ2: 画像生成AIで画像を作成

Midjourney, DALL-E, Stable Diffusion等でプロンプトを使って画像を生成します。

#### ステップ3: 画像を拡張

生成された画像を920x450pxに拡張します。

```bash
python .agent/scripts/image_utils.py generated_image.png
```

→ `generated_image_extended_920x450.png` が完成！

---

## 🔧 仕様

### 入力

- **対応フォーマット**: PNG, JPG, JPEG, BMP, GIF 等（PIL対応フォーマット）
- **サイズ制限**: なし（ただし大きすぎると処理に時間がかかる可能性あり）

### 出力

- **フォーマット**: PNG
- **サイズ**: 920x450px（固定）
- **配置**: 元画像は右側に配置
- **余白処理**: 左側の余白は、元画像の左端のピクセル列を引き延ばして埋める

### 処理ロジック

1. 入力画像を高さ450pxにリサイズ（アスペクト比を保持）
2. 920x450pxの空白キャンバスを作成
3. リサイズした画像を右側に配置
4. 左側の余白を、リサイズした画像の左端1ピクセル列を伸ばして埋める

**効果**: 自然なグラデーションで余白が埋まります。

---

## 📖 実践例

### 例1: 正方形の画像を拡張

**入力**: `logo.png` (500x500px)

```bash
python .agent/scripts/image_utils.py logo.png
```

**出力**: `logo_extended_920x450.png` (920x450px)
- 元画像は高さ450pxにリサイズされ（450x450pxになる）、右側に配置
- 左側470px分の余白が自動的に埋められる

---

### 例2: 横長の画像を拡張

**入力**: `banner.png` (1200x300px)

```bash
python .agent/scripts/image_utils.py banner.png
```

**出力**: `banner_extended_920x450.png` (920x450px)
- 元画像は高さ450pxにリサイズされ（1800x450pxになる）、右側に配置
- ※ 元画像が920pxより広い場合は、右側がキャンバスからはみ出す形になります（現在の仕様）

---

## ⚠️ トラブルシューティング

### エラー: 「ModuleNotFoundError: No module named 'PIL'」

**原因**: Pillowがインストールされていない

**解決方法**:
```bash
pip install Pillow
```

---

### エラー: 「FileNotFoundError: [Errno 2] No such file or directory」

**原因**: 入力画像のパスが間違っている

**解決方法**:
1. ファイルパスを確認
2. 絶対パスを使用するか、カレントディレクトリからの相対パスを正確に指定

**例（絶対パス）:**
```bash
python .agent/scripts/image_utils.py C:\Users\name\Pictures\logo.png
```

**例（相対パス）:**
```bash
python .agent/scripts/image_utils.py ./images/logo.png
```

---

### 出力画像の左側の余白が不自然

**原因**: 元画像の左端のピクセルが単色でないため、伸ばすと不自然になる

**解決方法**:
1. 画像編集ソフトで元画像の左端を単色にする
2. または、画像生成時に左側に余白を持たせるようプロンプトを調整

---

## 🔗 関連ドキュメント

### ワークフロー

イベントヘッダー画像のデザイン指示を生成するワークフロー:

```
/generate_event_header "イベント名"
```

詳細: [.agent/workflows/generate_event_header.md](../../.agent/workflows/generate_event_header.md)

### Playbook

イベント管理の全体的な流れについては:

[00_Playbook/02_Event_Management.md](../00_Playbook/02_Event_Management.md)

---

## 📝 技術的な詳細

開発者向けの情報や、スクリプトのカスタマイズについては、ソースコードを直接参照してください:

[.agent/scripts/image_utils.py](../../.agent/scripts/image_utils.py)

---

**Last Updated**: 2026-03-22
**For End Users**: このドキュメントはツールを使う人向けです。
