# Tools - 実行スクリプト・ツール群（開発ガイド）

ワークフローから呼び出される実行スクリプトや、単独で使用できるツール群。

---

## 📋 既存ツール一覧

| ディレクトリ / ファイル | 説明 | 言語 / 技術 | 状態 |
|:---|:---|:---|:---:|
| `slide-generator/` | Markdown → Google Slides 変換 | Google Apps Script | ✅ Active |
| `image_utils.py` | 画像キャンバス拡張（920x450px） | Python | ✅ Active |
| `Slide_Comment_Extractor/` | スライドコメント抽出 | (未実装) | 🚧 Draft |

---

## 🏗️ ツールディレクトリの構造

### 単一スクリプトツール

```
tools/
└── script_name.py          # 単一ファイルツール
```

### 複雑なツール（推奨構造）

```
tools/
└── tool_name/
    ├── README.md           # 技術仕様・開発ガイド
    ├── src/                # ソースコード
    ├── tests/              # テストコード（任意）
    ├── requirements.txt    # Python依存関係（Python の場合）
    ├── package.json        # Node.js依存関係（Node.js の場合）
    └── .env.example        # 環境変数テンプレート（必要に応じて）
```

---

## 📄 ツールの README.md フォーマット

各ツールディレクトリには技術仕様を記述した `README.md` を配置します。

### テンプレート

```markdown
# [Tool Name] - Technical Documentation

## Overview
[ツールの概要と目的]

## Architecture
[アーキテクチャ図やコンポーネント説明]

## Requirements
- [依存ライブラリ1]
- [依存ライブラリ2]

## Installation
\```bash
# セットアップ手順
\```

## API / Usage (for Developers)
### Function: functionName(params)
[関数仕様]

**Parameters:**
- `param1` (type): [説明]

**Returns:**
- (type): [説明]

**Example:**
\```language
// コード例
\```

## Configuration
環境変数や設定ファイルの説明

## Testing
\```bash
# テスト実行方法
\```

## Troubleshooting
よくある問題と解決方法

## Related Documents
- [User Guide](../../../99_Guide/01_Tools/...)
- [Workflow that uses this tool](../workflows/...)
```

---

## 🆕 新規ツールの作成手順

### 1. ツールディレクトリを作成

```bash
mkdir .agent/tools/new_tool
```

### 2. 技術仕様ドキュメントを作成

```bash
touch .agent/tools/new_tool/README.md
```

### 3. ソースコードを実装

```bash
# Python の場合
touch .agent/tools/new_tool/main.py
touch .agent/tools/new_tool/requirements.txt

# Node.js / Google Apps Script の場合
mkdir .agent/tools/new_tool/src
touch .agent/tools/new_tool/src/index.js
touch .agent/tools/new_tool/package.json
```

### 4. 環境変数テンプレートを作成（必要に応じて）

```bash
touch .agent/tools/new_tool/.env.example
```

### 5. エンドユーザー向けガイドを作成

```bash
touch ../../99_Guide/01_Tools/New_Tool_Guide.md
```

### 6. テスト

ツールを単体で実行し、期待通りに動作することを確認します。

---

## 🎯 ツール開発のベストプラクティス

### 1. 責任の単一性
1つのツールは1つの明確な責任を持つようにします。

### 2. 環境変数による設定
APIキーやパスなどはハードコードせず、環境変数や設定ファイルで管理します。

**悪い例:**
```python
api_key = "sk-12345abcdef..."
```

**良い例:**
```python
import os
api_key = os.getenv("API_KEY")
```

### 3. エラーハンドリング
適切なエラーメッセージを返し、デバッグしやすくします。

### 4. ドキュメント化
技術仕様（開発者向け）とユーザーガイド（エンドユーザー向け）を両方作成します。

### 5. テストコードの作成
可能な限り、自動テストを用意します。

---

## 📦 依存関係の管理

### Python ツール

`requirements.txt` を作成し、依存ライブラリを明記します。

```txt
# requirements.txt
Pillow>=10.0.0
requests>=2.31.0
```

インストール:
```bash
pip install -r requirements.txt
```

### Node.js / Google Apps Script ツール

`package.json` を作成し、依存関係を管理します。

```json
{
  "name": "tool-name",
  "version": "1.0.0",
  "dependencies": {
    "library-name": "^1.0.0"
  }
}
```

インストール:
```bash
npm install
```

---

## 🔗 ワークフローとの連携

ツールをワークフローから呼び出す場合、ワークフロー定義ファイルに記載します。

**ワークフロー側（workflows/example.md）:**
```markdown
## Tools
このワークフローは以下のツールを使用します：
- `tools/image_utils.py` - 画像キャンバス拡張

## Process
3. 画像を生成後、`image_utils.py` で920x450pxに拡張
   \```bash
   python .agent/tools/image_utils.py input.png output.png
   \```
```

---

## 🧪 ツール検証チェックリスト

新規ツールまたは修正後、以下を確認します：

- [ ] README.md に技術仕様が記載されている
- [ ] 依存関係が `requirements.txt` または `package.json` に明記されている
- [ ] 環境変数が必要な場合、`.env.example` が提供されている
- [ ] エンドユーザー向けガイドが `99_Guide/01_Tools/` に作成されている
- [ ] ツールが単体で実行可能である
- [ ] エラーハンドリングが適切に実装されている
- [ ] 実行例・サンプルコードが提供されている

---

## 🔗 関連ドキュメント

- **エンドユーザー向けツール使い方**: [../../99_Guide/01_Tools/](../../99_Guide/01_Tools/)
- **ワークフロー開発ガイド**: [../workflows/README.md](../workflows/README.md)
- **スキル開発ガイド**: [../skills/README.md](../skills/README.md)

---

**Last Updated**: 2026-03-22
**For Developers**: このドキュメントは開発者・保守担当者向けです。
