# Knowledge Base Index

AIエージェントが参照する企業知識・コンテキストのインデックスです。

---

## 📚 ディレクトリ構造

```
00_Context_Library/
├── 10_Knowledge/     # 企業の核となる知識
│   ├── 00_Core/      # 企業理念、AI組織図
│   ├── 01_Business/  # 事業計画、戦略
│   └── 02_Assets/    # ブランド資産管理
└── 20_Glossary/      # 哲学的概念・用語集
```

---

## 🏛️ Core Knowledge - 企業の核

### 00_Core/ - 企業理念とシステム設計

| ドキュメント | 概要 | 主な内容 |
|:---|:---|:---|
| [Identity.md](10_Knowledge/00_Core/Identity.md) | 企業アイデンティティ | ミッション、ビジョン、バリュー、理念 |
| [Agent_Role_Architecture.md](10_Knowledge/00_Core/Agent_Role_Architecture.md) | AI組織図 | CXOエージェントの役割定義、責任範囲 |

**用途**: すべてのAIエージェントがこれらを常に参照し、企業理念との整合性を保ちます。

---

## 💼 Business Context - 事業戦略

### 01_Business/ - ビジネスモデルと戦略

| ドキュメント | 概要 | 主な内容 |
|:---|:---|:---|
| [Business_Model.md](10_Knowledge/01_Business/Business_Model.md) | ビジネスモデル | 収益構造、顧客セグメント、提供価値 |
| [History.md](10_Knowledge/01_Business/History.md) | 企業の歩み | 設立経緯、主要マイルストーン、変遷 |
| [Noble_Heat_Strategy.md](10_Knowledge/01_Business/Noble_Heat_Strategy.md) | Noble Heat 戦略 | 2026年の戦略フレームワーク |

**用途**: 事業判断、戦略立案、イベント企画時に参照します。

---

## 🎨 Assets - ブランド資産

### 02_Assets/ - ブランド管理

| ドキュメント | 概要 | 主な内容 |
|:---|:---|:---|
| [Asset_Inventory.md](10_Knowledge/02_Assets/Asset_Inventory.md) | 資産一覧 | 書籍、ポッドキャスト、メディア掲載、イベント履歴 |

**用途**: コンテンツ制作時の既存資産活用、ブランド一貫性の確保。

---

## 📖 Glossary - 哲学的概念・用語集

### 20_Glossary/ - 企業文化を支える概念

| 概念 | ファイル | 説明 |
|:---|:---|:---|
| コミュニティ3.0 | [コミュニティ3.0.md](20_Glossary/コミュニティ3.0.md) | 次世代コミュニティのあり方 |
| デジタル主権 | [デジタル主権.md](20_Glossary/デジタル主権.md) | 個人・組織のデジタル自律性 |
| Just Build It | [Just_Build_It.md](20_Glossary/Just_Build_It.md) | 行動主義の哲学 |
| The Messenger | [The_Messenger.md](20_Glossary/The_Messenger.md) | メッセンジャーの役割 |
| The Architect | [The_Architect.md](20_Glossary/The_Architect.md) | アーキテクトの役割 |
| 教えることは二度学ぶこと | [教えることは二度学ぶこと.md](20_Glossary/教えることは二度学ぶこと.md) | 学習コミュニティの原理 |
| 無限デバッグループ | [無限デバッグループ.md](20_Glossary/無限デバッグループ.md) | 継続的改善の比喩 |
| 知的OS | [知的OS.md](20_Glossary/知的OS.md) | 思考の基盤システム |
| 資産ゼロ | [資産ゼロ.md](20_Glossary/資産ゼロ.md) | ゼロベースからの価値創造 |
| 隠れキリシタン | [隠れキリシタン.md](20_Glossary/隠れキリシタン.md) | 潜在的な学習者・実践者 |

**用途**:
- コンテンツ制作時の表現・言語選択
- ブランドメッセージの一貫性確保
- コミュニティ文化の理解

---

## 🔗 このナレッジベースの使い方

### AIエージェント向け
各スキル（`CSO`, `CCO`, `CEDO` など）は、自分の専門領域に関連するナレッジを自動参照します。

例：
- `CCO_Community_Architect` → `コミュニティ3.0.md`, `教えることは二度学ぶこと.md`
- `CSO_Strategy` → `Business_Model.md`, `Noble_Heat_Strategy.md`

### 人間のチームメンバー向け
- 企画・提案時の背景理解
- 新規コンテンツ作成時の既存資産確認
- 企業文化・価値観の理解

---

## 📝 ナレッジの更新・追加

### 既存ドキュメントの更新
1. 該当ファイルを直接編集
2. 変更内容をコミット
3. プルリクエストを作成（レビュー後マージ）

### 新規ドキュメントの追加
1. 適切なディレクトリ（`00_Core/`, `01_Business/`, `02_Assets/`, `20_Glossary/`）を選択
2. 新規 `.md` ファイルを作成
3. このINDEX.mdに項目を追加
4. プルリクエストを作成

---

## 🔗 関連ドキュメント

- **AIエージェント定義**: [.agent/README.md](../.agent/README.md)
- **ユーザーガイド**: [99_Guide/README.md](../99_Guide/README.md)
- **リソース・テンプレート**: [80_Resources/](../80_Resources/)

---

**Last Updated**: 2026-03-22
**Maintained by**: Antigravity & Team
