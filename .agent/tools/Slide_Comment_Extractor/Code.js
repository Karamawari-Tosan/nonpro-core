/**
 * Googleスライドの全コメントを抽出してスプレッドシートに出力する
 */
function extractCommentsByUrl() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 「設定」シートからURLを取得
    let configSheet = ss.getSheetByName('設定');
    if (!configSheet) {
      // 設定シートがなければ作成
      configSheet = ss.insertSheet('設定');
      configSheet.getRange('A1').setValue('スライドURL:');
    }

    const slideUrl = configSheet.getRange('B1').getValue();
    if (!slideUrl) {
      throw new Error('「設定」シートのB1セルにGoogleスライドのURLを入力してください');
    }

    // URLからプレゼンテーションIDを抽出
    const presentationId = extractPresentationId(slideUrl);
    if (!presentationId) {
      throw new Error('有効なGoogleスライドのURLではありません');
    }

    // 各スライドページのタイトルマップを取得
    const pageIdToTitleMap = getPageTitles(presentationId);

    // コメント一覧を取得（ページネーション対応）
    const comments = getAllComments(presentationId);

    // コメントデータを整形（親コメント + 返信をフラット化）
    const outputData = formatCommentsForOutput(comments, pageIdToTitleMap);

    // 「コメント一覧」シートを取得または作成
    let outputSheet = ss.getSheetByName('コメント一覧');
    if (!outputSheet) {
      outputSheet = ss.insertSheet('コメント一覧');
    }

    // シート全体をクリア
    outputSheet.clear();

    // ヘッダー行を追加
    const headers = [['ページタイトル', 'ユーザー名', 'コメント']];
    outputSheet.getRange(1, 1, 1, 3).setValues(headers);
    outputSheet.getRange(1, 1, 1, 3).setFontWeight('bold');

    // データを2行目から一括出力
    if (outputData.length > 0) {
      outputSheet.getRange(2, 1, outputData.length, 3).setValues(outputData);
      Logger.log(`${outputData.length}件のコメント（返信含む）を出力しました`);
    } else {
      Logger.log('コメントが見つかりませんでした');
    }

    // コメント一覧シートをアクティブにする
    ss.setActiveSheet(outputSheet);

    SpreadsheetApp.getUi().alert(`コメントの抽出が完了しました\n\n出力件数: ${outputData.length}件\n出力先: 「コメント一覧」シート`);

  } catch (error) {
    Logger.log('エラー: ' + error.message);
    SpreadsheetApp.getUi().alert('エラー: ' + error.message);
  }
}

/**
 * URLからプレゼンテーションIDを抽出
 * @param {string} url - GoogleスライドのURL
 * @return {string|null} プレゼンテーションID
 */
function extractPresentationId(url) {
  // パターン例: https://docs.google.com/presentation/d/PRESENTATION_ID/edit
  const match = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

/**
 * スライドのタイトルを取得
 * @param {string} presentationId - プレゼンテーションID
 * @return {string} スライドタイトル
 */
function getSlideTitle(presentationId) {
  try {
    const file = DriveApp.getFileById(presentationId);
    return file.getName();
  } catch (error) {
    Logger.log('スライドタイトル取得エラー: ' + error.message);
    return 'タイトル取得失敗';
  }
}

/**
 * Slides APIを使用して各ページのタイトルを取得
 * @param {string} presentationId - プレゼンテーションID
 * @return {Object} ページIDをキー、ページタイトルを値とするマップ
 */
function getPageTitles(presentationId) {
  try {
    const presentation = Slides.Presentations.get(presentationId);
    const pageIdToTitleMap = {};

    if (presentation.slides) {
      presentation.slides.forEach((slide, index) => {
        const pageId = slide.objectId;
        let pageTitle = `スライド${index + 1}`;

        // ページ要素からタイトルを探す
        if (slide.pageElements) {
          for (const element of slide.pageElements) {
            if (element.shape && element.shape.placeholder &&
                (element.shape.placeholder.type === 'TITLE' ||
                 element.shape.placeholder.type === 'CENTERED_TITLE')) {
              // タイトルプレースホルダーのテキストを取得
              if (element.shape.text && element.shape.text.textElements) {
                const textParts = element.shape.text.textElements
                  .filter(te => te.textRun && te.textRun.content)
                  .map(te => te.textRun.content.trim())
                  .filter(content => content.length > 0);

                if (textParts.length > 0) {
                  pageTitle = textParts.join(' ');
                  break;
                }
              }
            }
          }
        }

        pageIdToTitleMap[pageId] = pageTitle;
      });
    }

    Logger.log(`${Object.keys(pageIdToTitleMap).length}ページのタイトルを取得しました`);
    return pageIdToTitleMap;

  } catch (error) {
    Logger.log('ページタイトル取得エラー: ' + error.message);
    return {};
  }
}

/**
 * Drive APIを使用して全コメントを取得（ページネーション対応）
 * @param {string} fileId - ファイルID（プレゼンテーションID）
 * @return {Array} コメント配列
 */
function getAllComments(fileId) {
  const allComments = [];
  let pageToken = null;

  do {
    try {
      // Drive API v3を使用してコメント一覧を取得（anchorフィールドも含む）
      const params = {
        fields: 'comments(id,author,content,anchor,quotedFileContent,replies(id,author,content),resolved,createdTime),nextPageToken',
        pageSize: 100,  // 1回のリクエストで取得する最大数
        includeDeleted: false
      };

      if (pageToken) {
        params.pageToken = pageToken;
      }

      const response = Drive.Comments.list(fileId, params);

      if (response.comments && response.comments.length > 0) {
        allComments.push(...response.comments);
      }

      // 次のページトークンを取得
      pageToken = response.nextPageToken;

    } catch (error) {
      Logger.log('コメント取得エラー: ' + error.message);
      throw new Error('Drive APIでのコメント取得に失敗しました: ' + error.message);
    }

  } while (pageToken);  // 次のページがある限り繰り返す

  Logger.log(`合計 ${allComments.length} 件の親コメントを取得しました`);
  return allComments;
}

/**
 * コメントデータを出力用にフラット化
 * @param {Array} comments - コメント配列
 * @param {Object} pageIdToTitleMap - ページIDとタイトルのマップ
 * @return {Array} 出力用の2次元配列 [[ページタイトル, ユーザー名, コメント], ...]
 */
function formatCommentsForOutput(comments, pageIdToTitleMap) {
  const outputData = [];

  comments.forEach((comment, index) => {
    // コメントが付いているページIDを取得
    let pageTitle = '（ページ不明）';

    if (comment.anchor) {
      const anchorStr = JSON.stringify(comment.anchor);

      // ページIDを探す
      for (const pageId in pageIdToTitleMap) {
        if (anchorStr.includes(pageId)) {
          pageTitle = pageIdToTitleMap[pageId];
          break;
        }
      }
    } else if (comment.quotedFileContent && comment.quotedFileContent.value) {
      // quotedFileContentから推測できる場合もある
      const quotedStr = comment.quotedFileContent.value;
      for (const pageId in pageIdToTitleMap) {
        if (quotedStr.includes(pageId)) {
          pageTitle = pageIdToTitleMap[pageId];
          break;
        }
      }
    }

    // 親コメントを追加
    const authorName = comment.author && comment.author.displayName
      ? comment.author.displayName
      : '不明なユーザー';
    const content = comment.content || '（内容なし）';

    outputData.push([pageTitle, authorName, content]);

    // 返信がある場合は、それぞれを別行として追加
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach(reply => {
        const replyAuthorName = reply.author && reply.author.displayName
          ? reply.author.displayName
          : '不明なユーザー';
        const replyContent = reply.content || '（内容なし）';

        outputData.push([pageTitle, replyAuthorName, replyContent]);
      });
    }
  });

  return outputData;
}
