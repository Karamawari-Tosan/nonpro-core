// src/ui.js
// Google Slides にカスタムメニューを追加

/**
 * スライドを開いたときに自動実行される関数
 * カスタムメニューを追加する
 */
function onOpen() {
  const ui = SlidesApp.getUi();

  ui.createMenu('AntiGravity')
    .addItem('Import from Drive', 'showImportDialog')
    .addItem('Export to Drive', 'showExportDialog')
    .addSeparator()
    .addItem('Settings', 'showSettings')
    .addSeparator()
    .addItem('レイアウト一覧', 'showLayoutInfo')
    .addItem('About', 'showAbout')
    .addToUi();

  console.log('✓ AntiGravity menu added');
}

/**
 * インポート用のダイアログを表示
 */
function showImportDialog() {
  const ui = SlidesApp.getUi();

  const result = ui.prompt(
    'Antigravity Slides - Import',
    'Markdownファイル名を入力してください:\n(例: Slide_Outline.md)',
    ui.ButtonSet.OK_CANCEL
  );

  const button = result.getSelectedButton();
  const fileName = result.getResponseText();

  if (button === ui.Button.OK) {
    if (fileName && fileName.trim() !== '') {
      console.log('Import requested: ' + fileName);
      generateSlides(fileName.trim());
    } else {
      ui.alert('エラー', 'ファイル名を入力してください。', ui.ButtonSet.OK);
    }
  } else {
    console.log('Import cancelled');
  }
}

/**
 * エクスポート用のダイアログを表示
 */
function showExportDialog() {
  const ui = SlidesApp.getUi();

  const result = ui.prompt(
    'Antigravity Slides - Export',
    'プレゼンテーションファイル名を入力してください:\n(例: Sample_Presentation)\n\n' +
    '※ 同名の .md ファイルが作成/更新されます。',
    ui.ButtonSet.OK_CANCEL
  );

  const button = result.getSelectedButton();
  const fileName = result.getResponseText();

  if (button === ui.Button.OK) {
    if (fileName && fileName.trim() !== '') {
      try {
        console.log('Export requested: ' + fileName);
        const message = exportSlidesToMarkdown(fileName.trim());

        ui.alert(
          'エクスポート完了',
          message,
          ui.ButtonSet.OK
        );

        console.log('✓ Export completed successfully');
      } catch (e) {
        ui.alert(
          'エラー',
          'エクスポートに失敗しました。\n\n' +
          'エラー: ' + e.message,
          ui.ButtonSet.OK
        );
        console.error('Export failed: ' + e.message);
      }
    } else {
      ui.alert('エラー', 'ファイル名を入力してください。', ui.ButtonSet.OK);
    }
  } else {
    console.log('Export cancelled');
  }
}

/**
 * 設定ダイアログを表示
 */
function showSettings() {
  const ui = SlidesApp.getUi();

  // 現在の設定値を取得
  const currentFolderId = CONFIG.getDriveFolderId();
  const currentValue = currentFolderId || '(未設定)';

  const result = ui.prompt(
    'Antigravity Slides - Settings',
    '📁 Drive フォルダ ID を入力してください:\n\n' +
    '現在の設定: ' + currentValue + '\n\n' +
    'ヒント: フォルダURLの最後の部分がフォルダIDです\n' +
    '例: https://drive.google.com/drive/folders/FOLDER_ID',
    ui.ButtonSet.OK_CANCEL
  );

  const button = result.getSelectedButton();
  const folderId = result.getResponseText();

  if (button === ui.Button.OK) {
    if (folderId && folderId.trim() !== '') {
      try {
        // フォルダIDの検証
        const folder = DriveApp.getFolderById(folderId.trim());

        // 保存
        CONFIG.setDriveFolderId(folderId.trim());

        ui.alert(
          '設定完了',
          '✓ Drive フォルダを設定しました:\n\n' +
          'フォルダ名: ' + folder.getName() + '\n' +
          'フォルダID: ' + folderId.trim(),
          ui.ButtonSet.OK
        );

        console.log('✓ Folder ID configured: ' + folderId.trim());
      } catch (e) {
        ui.alert(
          'エラー',
          '無効なフォルダIDです。\n\n' +
          'フォルダIDを確認してください。\n' +
          'エラー: ' + e.message,
          ui.ButtonSet.OK
        );
        console.error('Invalid folder ID: ' + e.message);
      }
    } else {
      ui.alert('キャンセル', '設定は変更されませんでした。', ui.ButtonSet.OK);
    }
  }
}

/**
 * 現在のプレゼンテーションのレイアウト・プレースホルダ一覧を表示する
 * マスターに定義されている全レイアウトと、各レイアウトで利用可能なプレースホルダタイプを走査する
 */
function showLayoutInfo() {
  const presentation = SlidesApp.getActivePresentation();
  const masters = presentation.getMasters();
  const PLACEHOLDER_TYPES = ['TITLE', 'CENTER_TITLE', 'SUBTITLE', 'BODY', 'OBJECT'];

  var lines = [];

  masters.forEach(function(master, mIdx) {
    lines.push('--- Master ' + mIdx + ' ---');
    const layouts = master.getLayouts();

    layouts.forEach(function(layout) {
      const layoutName = layout.getLayoutName();
      var placeholders = [];

      PLACEHOLDER_TYPES.forEach(function(type) {
        for (var idx = 0; idx < 2; idx++) {
          try {
            var ph = layout.getPlaceholder(SlidesApp.PlaceholderType[type], idx);
            if (ph) {
              placeholders.push(type + '[' + idx + ']');
            }
          } catch (e) {
            // プレースホルダが存在しない場合はスキップ
          }
        }
      });

      lines.push(layoutName + ' : ' + (placeholders.length ? placeholders.join(', ') : '(なし)'));
    });
  });

  const output = lines.join('\n');
  console.log('=== Layout Info ===\n' + output);

  SlidesApp.getUi().alert('レイアウト一覧', output, SlidesApp.getUi().ButtonSet.OK);
}

/**
 * About ダイアログを表示
 */
function showAbout() {
  const ui = SlidesApp.getUi();

  const message = 'Antigravity Slides Generator\n\n' +
    'Markdownファイルを正本として、Googleスライドを自動生成します。\n\n' +
    'バージョン: 1.0.0\n' +
    'GitHub: anthropics/claude-code';

  ui.alert('About Antigravity Slides', message, ui.ButtonSet.OK);
}
