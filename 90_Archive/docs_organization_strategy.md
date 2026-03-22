# ドキュメント配置戦略（提案）

**作成日**: 2026-03-22
**目的**: インデックスとマニュアルの最適な配置方法を定義

---

## 1. 基本原則

### 1.1 関心の分離（Separation of Concerns）

ドキュメントは**対象読者**と**目的**によって配置場所を分けます：

| 分類 | 対象読者 | 目的 | 配置場所 |
|:---|:---|:---|:---|
| **インデックス** | 全員 | 何があるかを知る | README.md（階層的） |
| **エンドユーザーマニュアル** | ワークフロー利用者 | どう使うかを知る | `99_Guide/` |
| **開発者向けドキュメント** | 開発・保守担当 | 技術仕様・開発方法 | `.agent/` 配下 |
| **ナレッジベース** | AIエージェント | コンテキスト参照 | `00_Context_Library/` |

---

## 2. インデックス（What's here）の配置

### 推奨: **階層的アプローチ**

#### 理由

**メリット:**
1. **エントリーポイントの明確化**: ルート README.md が全体の地図となる
2. **詳細の分散**: 各ディレクトリで深掘り可能
3. **メンテナンス性**: 変更範囲が局所化される
4. **独立性**: 各ディレクトリを別プロジェクトで再利用可能
5. **検索性**: ディレクトリに直接来た人も迷わない

**デメリット:**
- 複数ファイルの管理が必要（ただし、これは適切な責任分担）

#### 具体的配置

```
nonpro-core/
├── README.md                    # レベル0: 全体の鳥瞰図
│   ├── プロジェクト概要
│   ├── ディレクトリ構造（簡潔）
│   ├── クイックスタート
│   └── 各ディレクトリへのリンク
│
├── .agent/
│   └── README.md                # レベル1: エージェント詳細
│       ├── スキル一覧
│       ├── ワークフロー一覧
│       └── ツール一覧
│
├── 99_Guide/
│   └── README.md                # レベル1: ガイド詳細
│       ├── 全ガイドの目次
│       ├── プレイブック一覧
│       └── 推奨読書順序
│
└── 00_Context_Library/
    └── INDEX.md                 # レベル1: ナレッジ詳細
        ├── Core Knowledge
        ├── Business Context
        └── Glossary
```

### ルート README.md の役割

- **30秒で理解**: このリポジトリが何か
- **3分で探索**: どこに何があるか
- **5分で開始**: 次に何を読むべきか

### 各ディレクトリ README.md の役割

- **完全なカタログ**: そのディレクトリ内の全項目
- **使い方ガイド**: ディレクトリ固有のルール
- **開発ガイド**: 新規追加・変更方法（開発者向けディレクトリの場合）

---

## 3. マニュアル（How to use / How to develop）の配置

### 3.1 二層構造アプローチ

#### エンドユーザー向けマニュアル → `99_Guide/`

**対象**: ワークフロー・ツールを**使う**人

**配置:**
```
99_Guide/
├── README.md                          # 全ガイドの目次
├── 00_Setup_Guide.md                  # リポジトリ全体のセットアップ
├── 01_Security_Guidelines.md          # セキュリティガイド
│
├── 00_Playbook/                       # タスク別マニュアル
│   ├── 00_Start_Here.md
│   ├── 01_Strategic_Meeting.md
│   ├── 02_Event_Management.md
│   ├── 03_Slide_Production.md         # ← ワークフロー&ツールの使い方
│   └── 04_Workflows_Reference.md      # (新設) 全ワークフローカタログ
│
└── 01_Tools/                          # (新設) ツール別マニュアル
    ├── README.md                      # ツール一覧
    └── 01_Slide_Generator_Guide.md    # エンドユーザー向け使い方
```

**内容:**
- コマンドの実行方法（`/create_slide_draft` の使い方）
- 入力パラメータの説明
- 実行結果の例
- トラブルシューティング（ユーザー視点）

**例（99_Guide/01_Tools/01_Slide_Generator_Guide.md）:**
```markdown
# スライド生成ツール 使い方ガイド

## 概要
Markdownからスライドを自動生成するツールです。

## 使い方

### 1. ワークフローを実行
Antigravity のチャットで以下を入力:
/create_slide_draft "イベントタイトル"

### 2. 出力されたMarkdownを確認
...

### 3. Google Slidesに変換
(手順)

## よくある質問
Q: レイアウトを変更するには？
A: [B], [L]などのショートコードを使います...
```

---

#### 開発者向けドキュメント → `.agent/` 配下

**対象**: ワークフロー・ツールを**開発・修正**する人

**配置:**
```
.agent/
├── README.md                          # エージェント全体の説明
│
├── skills/
│   ├── README.md                      # スキル開発ガイド
│   │   ├── 既存スキル一覧
│   │   ├── 新規スキル作成方法
│   │   └── スキルファイルの構造
│   └── CSO_Strategy/
│       └── SKILL.md                   # スキル定義（技術仕様）
│
├── workflows/
│   ├── README.md                      # ワークフロー開発ガイド
│   │   ├── 既存ワークフロー一覧
│   │   ├── 新規ワークフロー作成方法
│   │   └── ワークフローファイルの構造
│   └── create_slide_draft.md         # ワークフロー定義
│
└── tools/
    ├── README.md                      # ツール一覧と開発ガイド
    └── slide-generator/
        └── README.md                  # 技術仕様
            ├── アーキテクチャ
            ├── API仕様
            ├── セットアップ（開発環境）
            ├── 依存関係
            └── デバッグ方法
```

**内容:**
- ファイル構造・アーキテクチャ
- API仕様・インターフェース
- 開発環境のセットアップ
- テスト方法
- デバッグ情報
- コントリビューションガイド

**例（.agent/tools/slide-generator/README.md）:**
```markdown
# Slide Generator - Technical Documentation

## Architecture
- Google Apps Script ベース
- Parser.js: Markdown解析エンジン
- Code.js: Google Slides API連携

## API Specification

### parseMarkdown(text: string): Slide[]
...

## Development Setup
1. clasp をインストール
2. .clasprc.json を設定
3. `clasp push` でデプロイ

## Testing
...
```

---

### 3.2 クロスリファレンス（相互参照）

エンドユーザーマニュアルと開発者ドキュメントは相互にリンク：

**99_Guide/01_Tools/01_Slide_Generator_Guide.md（エンドユーザー向け）**
```markdown
## 開発者向け情報
技術仕様や開発方法については、[開発者ドキュメント](../../.agent/tools/slide-generator/README.md)を参照してください。
```

**.agent/tools/slide-generator/README.md（開発者向け）**
```markdown
## User Guide
エンドユーザー向けの使い方は、[ユーザーガイド](../../../99_Guide/01_Tools/01_Slide_Generator_Guide.md)を参照してください。
```

---

## 4. 提案する最終構造

```
nonpro-core/
│
├── README.md                          # [インデックス L0] 全体の概要
│
├── .agent/                            # [開発者向け] エージェント定義
│   ├── README.md                      # [インデックス L1] エージェント詳細
│   ├── skills/
│   │   ├── README.md                  # [開発] スキル開発ガイド
│   │   └── */SKILL.md                 # [定義] スキル定義ファイル
│   ├── workflows/
│   │   ├── README.md                  # [開発] ワークフロー開発ガイド
│   │   └── *.md                       # [定義] ワークフロー定義ファイル
│   └── tools/
│       ├── README.md                  # [開発] ツール開発ガイド
│       └── */README.md                # [技術仕様] 各ツールの技術ドキュメント
│
├── 99_Guide/                          # [エンドユーザー向け] マニュアル
│   ├── README.md                      # [インデックス L1] ガイド目次
│   ├── 00_Setup_Guide.md              # [ガイド] 環境構築
│   ├── 01_Security_Guidelines.md      # [ガイド] セキュリティ
│   ├── 00_Playbook/
│   │   ├── 00_Start_Here.md           # [入口] プレイブック開始地点
│   │   ├── 01-03_*.md                 # [マニュアル] タスク別手順書
│   │   └── 04_Workflows_Reference.md  # [カタログ] 全ワークフロー使い方
│   └── 01_Tools/                      # (新設)
│       ├── README.md                  # [インデックス L2] ツール一覧
│       └── *.md                       # [マニュアル] 各ツールの使い方
│
├── 00_Context_Library/                # [ナレッジ] AI参照用
│   ├── INDEX.md                       # [インデックス L1] ナレッジ索引
│   ├── 10_Knowledge/
│   └── 20_Glossary/
│
├── 80_Resources/                      # [リソース] テンプレート・素材
│
└── 90_Archive/                        # (新設) 古いドキュメント
    └── PROJECT_IMPROVEMENT_ANALYSIS.md
```

---

## 5. 実装ステップ

### Phase 1: ディレクトリ構造の整備
- [ ] `99_Guide/01_Tools/` ディレクトリ作成
- [ ] `90_Archive/` ディレクトリ作成

### Phase 2: インデックスファイル作成
- [ ] `.agent/README.md` 作成
- [ ] `99_Guide/README.md` 作成
- [ ] `00_Context_Library/INDEX.md` 作成
- [ ] `.agent/skills/README.md` 作成
- [ ] `.agent/workflows/README.md` 作成
- [ ] `.agent/tools/README.md` 作成
- [ ] `99_Guide/01_Tools/README.md` 作成

### Phase 3: マニュアル作成
- [ ] `.agent/tools/slide-generator/README.md` 作成（技術仕様）
- [ ] `99_Guide/01_Tools/01_Slide_Generator_Guide.md` 作成（使い方）
- [ ] `99_Guide/00_Playbook/04_Workflows_Reference.md` 作成（ワークフロー一覧）

### Phase 4: 既存ファイル整理
- [ ] `PROJECT_IMPROVEMENT_ANALYSIS.md` を `90_Archive/` へ移動
- [ ] `Antigravity セキュリティ・プライバシー 利用ガイドライン.md` をリネーム

### Phase 5: クロスリファレンス
- [ ] 各マニュアルに相互リンクを追加
- [ ] ルート README.md のナビゲーション強化

---

## 6. 命名規則（再掲）

### ガイド・マニュアル（99_Guide/）
- 形式: `[番号]_[英語名].md`
- 例: `00_Setup_Guide.md`, `01_Security_Guidelines.md`

### ナレッジ（00_Context_Library/）
- 形式: 日本語可、意味重視
- 例: `コミュニティ3.0.md`, `Identity.md`

### インデックス
- ディレクトリ直下の `README.md` または `INDEX.md`
- README.md を優先（GitHub標準）

---

## 7. まとめ

### インデックスの答え
**「このディレクトリに何があるか」を知るには？**
→ **階層的に見る**
1. まず**ルート README.md**で全体を把握
2. 次に**各ディレクトリの README.md**で詳細を確認

### マニュアルの答え
**「ワークフロー・ツールのマニュアルはどこに？」**
→ **対象読者で分ける**
1. **使い方を知りたい** → `99_Guide/`（エンドユーザー向け）
2. **開発・修正したい** → `.agent/`（開発者向け）

---

**作成者**: Claude Code
**ブランチ**: docs/organize-documentation
