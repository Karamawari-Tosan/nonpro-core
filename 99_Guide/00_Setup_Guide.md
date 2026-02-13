# チーム開発環境構築・オンボーディングガイド

ノンプロ研の開発プロジェクト（`nonpro-core` および各個別プロジェクト）に参加するための環境構築手順です。
本プロジェクトでは、「AIファースト」な開発を推進するため、専用クライアントとCLIツールの利用を推奨しています。

## 1. 開発ツールのインストール (Windows/Mac共通)

以下の4つのツールを順にインストール・セットアップしてください。

### [1] Google Antigravity のインストール
AIとのペアプログラミングを実現する統合開発環境（IDE）です。
- **入手方法**: [https://antigravity.google/](https://antigravity.google/) からダウンロードしてインストールしてください。
- **備考**: VS Codeベースのエディタとして動作します。既存のVS Code設定を引き継ぐことも可能です。

### [2] Node.js のインストール
AI CLIツール（Gemini CLI, Claude Code）の実行に必要です。
- **入手方法**: [公式サイト](https://nodejs.org/) から「LTS（推奨版）」をダウンロードしてインストールしてください。

### [3] AI CLIツールの導入
ターミナルからAIを活用するためのCLIツールです。`Node.js` インストール後、ターミナル（コマンドプロンプトまたはPowerShell）で以下のコマンドを実行してインストールしてください。

- **Gemini CLI**
  - Google製のAI CLIツールです。
  - インストールコマンド (Node.jsが必要):
    ```bash
    npm install -g @google/gemini-cli
    ```
- **Claude Code**
  - Anthropic製のAIコーディングアシスタントです。
  - インストールコマンド:
    ```bash
    npm install -g @anthropic-ai/claude-code
    ```

### [4] Git / GitHub のセットアップ (AI CLIを活用)
AI CLIを使って、対話的にセットアップを進めます。以下の通りに依頼してみてください。

#### 1. Gitのインストール
ターミナルで `gemini` (または `claude`) を起動し、以下のように入力します。

> **依頼プロンプト**:
> 「WindowsでGitをインストールして」
> (Macの場合は homebrew経由を依頼)

AIは、以下のようなコマンドを提案・実行します。
- **Windows**: `winget install --id Git.Git -e --source winget` など
- **Mac**: `brew install git`

#### 2. GitHubの初期設定
インストール完了後、続けて以下のように依頼します。

> **依頼プロンプト**:
> 「Gitのユーザー名とメールアドレスを設定して。ユーザー名は [あなたの名前]、メールは [あなたのメールアドレス] で」

AIが実行するコマンド:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3. GitHub認証（SSH設定など）
最後に、GitHubとの連携設定を依頼します。

> **依頼プロンプト**:
> 「GitHubに接続するためのSSH鍵を作成して、GitHubに登録する手順を教えて（もしくはghコマンドでログインして）」

AIが案内する手順の例:
1. `ssh-keygen` コマンドで鍵を作成
2. 公開鍵 (`.pub`ファイル) の内容を表示
3. GitHubの設定ページに貼り付けるよう案内

※ うまくいかない場合は、以下のリンクから手動で設定してください。
- [Git for Windows](https://gitforwindows.org/)
- [GitHub公式サイト](https://github.co.jp/) (アカウント名: `miyakoda-system` などを管理者に連絡)

---

## 2. プロジェクトへの参加手順

環境構築が完了したら、以下の手順でプロジェクトに参加してください。

### ステップ1: ワークスペースの作成
任意の場所に作業用フォルダ（例: `nonpro-projects`）を作成し、その中で作業を行います。

### ステップ2: リポジトリのクローン (AI CLI)
本プロジェクトでは、共通基盤である `nonpro-core` と、各プロジェクト（例: `nonpro-camp-2026`）を並行して扱います。
ターミナルで作業フォルダに移動し、`gemini` (または `claude`) を起動して依頼します。

> **依頼プロンプト**:
> 「GitHubから `plannauts/nonpro-core` と `plannauts/nonpro-camp-2026` のリポジトリをここにクローンして」

AIが実行するコマンド:
```bash
git clone https://github.com/plannauts/nonpro-core.git
git clone https://github.com/plannauts/nonpro-camp-2026.git
```
※ SSH接続を設定済みの場合は、AIが自動的に `git@github.com:...` 形式を選択してくれます。

### ステップ3: Antigravity でワークスペースを開く
Antigravityを起動し、以下の手順で「マルチルートワークスペース」を作成します。

1. `nonpro-camp-2026` フォルダを開く。
2. `File` > `Add Folder to Workspace...` を選択し、`nonpro-core` フォルダを追加する。
3. `File` > `Save Workspace As...` を選択し、`nonpro-camp-2026.code-workspace` として保存する。

以降は、この `.code-workspace` ファイルを開くことで、両方のリポジトリが読み込まれた状態で作業を開始できます。

### ステップ4: Antigravity のセキュリティ設定
安全に開発を行うため、以下のガイドラインに従ってセキュリティ設定を確認してください。
- [Antigravity セキュリティ・プライバシー 利用ガイドライン](../99_Guide/Antigravity%20セキュリティ・プライバシー%20利用ガイドライン.md)

特に **Settings** 画面で以下の点を確認しましょう:
- `Account > Enable Telemetry`: **OFF** (推奨)
- `Agent > Terminal Command Auto Execution`: **Request Review** (推奨)

---

## 3. 動作確認 (Skill Verification)
環境構築ができたら、`nonpro-core` のAIスキルが正しく読み込まれているか確認しましょう。
Antigravityのチャット欄で **`@`** (アットマーク) を入力すると、利用可能なスキルの一覧が表示されます。

> **依頼プロンプト**:
> 「`@CCO` と入力して候補から `nonpro-core/CCO_Community_Architect` を選択し、『簡単な自己紹介をして』と依頼」

CCO（最高コミュニティ責任者）として振る舞うAIから応答があれば、設定は成功です！

#### 利用可能なAIスキル一覧
本プロジェクトでは、以下の専門家AI（ペルソナ）を呼び出して相談できます。
チャット欄で `@` の後に名前の一部（例: `CBO`）を入力すると素早く呼び出せます。

- **`@.../CCO_Community_Architect`**: コミュニティ設計、文化醸成、イベントの空気を読む。
- **`@.../CBO_Brand_Architect`**: ブランディング、コミュニティの「魂」や象徴的価値の定義。
- **`@.../CEDO_Editor`**: 編集・表現、記事や原稿のレビュー。
- **`@.../CLO_Learning_Architect`**: 学習体験のデザイン、カリキュラム設計。
- **`@.../CPO_Cross_Border_Architect`**: パートナーシップ、外部連携、越境学習。
- **`@.../CSO_Strategy`**: 戦略立案、全体方針の壁打ち。

---

## 4. 開発フロー (Development Workflow)
日々の作業は、以下のサイクルで行います。ここでもAI CLIを活用しましょう。

### [1] 作業用ブランチの作成
`main` ブランチで直接作業せず、タスクごとにブランチを作成します。
本プロジェクトでは、チーム名をプレフィックスにすることを推奨します（例: `planning/`, `marketing/`）。

> **依頼プロンプト**:
> 「最新のmainから `planning/update-concept` というブランチを作って切り替えて」

AI実行コマンド例:
```bash
git checkout main
git pull
git checkout -b planning/update-concept
```

### [2] 実装・コミット・プッシュ
コードを編集した後、変更を保存（コミット）してGitHubへ送信（プッシュ）します。

> **依頼プロンプト**:
> 「変更内容をコミットして。メッセージは "Update concept draft for 2026" で。その後プッシュして」

AI実行コマンド例:
```bash
git add .
git commit -m "Update concept draft for 2026"
git push origin planning/update-concept
```

### [3] プルリクエスト (PR) の作成
GitHub上で、あなたのブランチから `main` ブランチへ「プルリクエスト」を作成します。
AIに依頼して、PR作成用のURLを発行してもらうことも可能です。

> **依頼プロンプト**:
> 「プルリクエストを作成するためのURLを教えて（ghコマンドがあれば作成して）」

PRを作成したら、Slackで管理者にレビュー依頼を投げてください。
承認されれば、あなたの成果物（ドキュメントや企画）が `main` にマージされます！
## 5. 困ったときは？
- 環境構築で詰まった場合は、エラーメッセージのスクリーンショットなどを添えてSlackでご相談ください。
- チームメンバーも手探りで進めています。「実験と失敗を楽しむ」スタンスでいきましょう！

---

## 6. 管理者向け手順 (Invitation & Security)

管理者（タカハシ）がメンバーを招待し、リポジトリを保護するための手順です。

### [1] メンバーの招待 (Collaborators)
各リポジトリの `Settings` > `Collaborators` > `Add people` から、メンバーのGitHubアカウント名（例: `miyakoda-system`）を入力して招待メールを送信します。

- **`nonpro-core`**: 閲覧のみのため、権限は `Read` に設定。
- **個別プロジェクト**: 開発に参加するため、権限は `Write` に設定。

### [2] メインブランチの保護 (Rulesets)
メンバーにWrite権限を与えつつ、勝手なマージや履歴改変を防ぐため、`main` ブランチを保護します。
`Settings` > `Rules` > `Rulesets` > `New branch ruleset` から以下の設定を行います。

1. **Ruleset Name**: `Main Protection` (または `Default Branch Rules`)
2. **Enforcement status**: `Active`
3. **Target branches**: `Default branch` (main)
4. **Rules to enforce**:
   - [x] **Restrict deletions** (削除禁止)
   - [x] **Block force pushes** (強制プッシュ禁止)
   - [x] **Require a pull request before merging** (マージ前PR必須)
     - [x] **Require approvals**: `1` (承認数1以上)

この設定により、「メンバーは自由に開発・Pushできるが、マージには管理者の承認が必要」という安全な運用が可能になります。
