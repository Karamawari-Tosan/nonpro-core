# nonpro-core

株式会社プランノーツの「ナレッジベース」兼「AIエージェントリポジトリ」です。
このリポジトリは、プロジェクト参加メンバーおよびAIエージェント（Antigravity / Claude Code）と協働するための環境構造、およびそれを運用するためのエージェント定義を統合し、「Single Source of Truth（単一情報源）」として機能します。

## 🏛️ Core Concept & Team Architecture

このリポジトリは、人間とAIが自律的に協働する環境を定義しています。作業は「ドキュメントアプリによる管理」から「IDEとAIエージェントによる共同作業」というエンジニアリング・スタイルに移行しました。

### チーム編成（The Team）
| メンバー / エージェント | 役割 (Role) | 担当領域 |
| :--- | :--- | :--- |
| **Human (あなた)** | Publisher / PM | 企画決定、最終承認、要件定義、Goサイン。 |
| **Antigravity** | Director & CXO | メインの作業・開発パートナー。戦略立案、執筆、コーディング、システム構築。 |
| **Claude Code** or **Gemini CLI** | Ops / Librarian | 自動整理、リファクタリング支援、Git運用などの裏方業務。 |

### リポジトリの2本柱
1. **Company Knowledge (知識・資産)**
   戦略、歴史、ブランド資産など、不変的かつ根源的な情報を管理します。AIエージェントはこれらを常に文脈（Context）として参照し、深い整合性を保ちます。
2. **AI Agents (頭脳・スキル)**
   ナレッジを活用し、専門領域を遂行するAIエージェントの定義（Persona / Skill）およびワークフロー群です。

## 📍 Directory Structure

主な運用構造は以下の通りです。

### `.agent/`
AIエージェントのアクティブなスキルとワークフロー定義。
- **Skills**: 各CXO（最高責任者）クラスのペルソナ定義（CBO, CCO, CEDOなど）や、壁打ち支援（sounding_board）などの特定スキル。
- **Workflows**: 定型業務の自動化手順書（`/create_event_plan` など）。

### `00_Context_Library/`
エージェントが参照すべき知識の源泉。
- **10_Knowledge**:
    - **00_Core**: 企業理念、AIエージェントの組織図。
    - **01_Business**: 事業計画、マーケティング文脈。
    - **02_Assets**: ロゴや各種ブランド資産。

### `80_Resources/`
実務で使用するテンプレートや素材ファイルを管理します。
- **Vivliostyle_Template**: 書籍制作テンプレート。

## 🚀 Navigations

AIエージェントおよびコラボレーターは、実務にあたりまず以下のドキュメントを参照してください。

### Agent Role Architecture
**👉 [`00_Context_Library/10_Knowledge/00_Core/Agent_Role_Architecture.md`](00_Context_Library/10_Knowledge/00_Core/Agent_Role_Architecture.md)**
- 「拡張された経営チーム（Augmented C-Suite）」のコンセプト。
- 各エージェント（CSO, CEDO, CCOなど）や支援スキル（sounding_board）の役割と責任範囲。

### Playbook (Operation Manuals)
**👉 [`99_Guide/00_Playbook/00_Start_Here.md`](99_Guide/00_Playbook/00_Start_Here.md)**
- イベント企画、スライド制作などの標準業務マニュアル（SOP）。
- 各業務に対応するAIワークフローコマンドの案内。

---
*Created by Antigravity & User*
