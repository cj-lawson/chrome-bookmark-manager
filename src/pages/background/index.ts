console.log("background script loaded");

interface Bookmark {
  id: string;
  title: string;
  url?: string;
  children?: Bookmark[];
}

export const fetchBookmarks = (): Promise<Bookmark[]> => {
  return new Promise((resolve, reject) => {
    if (!chrome.bookmarks) {
      reject(new Error("Bookmarks API not available"));
    }

    chrome.bookmarks.getTree(
      (bookmarkTreeNodes: chrome.bookmarks.BookmarkTreeNode[]) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          const bookmarks = parseBookmarks(bookmarkTreeNodes[0]);
          resolve([bookmarks]);
        }
      }
    );
  });
};

export const parseBookmarks = (
  bookmarkNode: chrome.bookmarks.BookmarkTreeNode
): Bookmark => {
  const bookmark: Bookmark = {
    id: bookmarkNode.id,
    title: bookmarkNode.title,
  };
  if (bookmarkNode.children) {
    bookmark.children = bookmarkNode.children.map(parseBookmarks);
  } else if (bookmarkNode.url) {
    bookmark.url = bookmarkNode.url;
  }
  return bookmark;
};
