# ツール使い方ガイド

nonpro-core で利用可能なツールのエンドユーザー向け使い方ガイドです。

---

## 📋 利用可能なツール一覧

| ツール名 | 説明 | ガイド | 主な用途 |
|:---|:---|:---|:---|
| **スライド生成ツール** | Markdown → Google Slides 変換 | [01_Slide_Generator_Guide.md](01_Slide_Generator_Guide.md) | スライド制作 |
| **画像拡張ツール** | 画像を920x450pxキャンバスに拡張 | [02_Image_Utils_Guide.md](02_Image_Utils_Guide.md) | イベントヘッダー画像 |

---

## 🎯 ツールの選び方

### スライド制作をしたい
→ **スライド生成ツール** を使用

ワークフロー `/create_slide_draft` でMarkdown案を生成し、Google Apps Script ツールでスライド化します。

詳細: [00_Playbook/03_Slide_Production.md](../00_Playbook/03_Slide_Production.md)

---

### イベントヘッダー画像を作りたい
→ **画像拡張ツール** を使用

1. ワークフロー `/generate_event_header` でデザイン指示を生成
2. 画像生成AI（Midjourney等）で画像を作成
3. `image_utils.py` で920x450pxに拡張

```bash
python .agent/tools/image_utils.py input.png output.png
```

詳細: [00_Playbook/02_Event_Management.md](../00_Playbook/02_Event_Management.md)

---

## 🔗 関連ドキュメント

### 開発者向け技術仕様
ツールの技術的な詳細や開発方法については、[.agent/tools/README.md](../../.agent/tools/README.md) を参照してください。

### ワークフローとの連携
各ツールを呼び出すワークフローについては、[00_Playbook/](../00_Playbook/) を参照してください。

---

## 💡 よくある質問

### Q: ツールはどこにありますか？
A: `.agent/tools/` ディレクトリに配置されています。ただし、エンドユーザーは直接触る必要はなく、ワークフロー（`/create_slide_draft` など）から自動的に呼び出されます。

### Q: ツールを単体で実行できますか？
A: はい。Python スクリプトなどは直接実行可能です。詳細は各ツールのガイドを参照してください。

### Q: 新しいツールをリクエストしたい
A: GitHub Issues にリクエストを投稿するか、Slack で管理者に相談してください。

---

**Last Updated**: 2026-03-22
**Maintained by**: Antigravity & Team
