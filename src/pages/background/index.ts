console.log("background script loaded");

interface Bookmark {
  id: string;
  title: string;
  url?: string;
  children?: Bookmark[];
  faviconUrl?: string;
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
    // const url = new URL(chrome.runtime.getURL("/_favicon/"));
    // const u = `www.${bookmarkNode.url}`;
    // const extensionID = chrome.runtime.id;
    // url.searchParams.set("pageUrl", u);
    // url.searchParams.set("size", "32");

    const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${bookmarkNode.url}&sz=32`;
    bookmark.url = bookmarkNode.url;
    bookmark.faviconUrl = faviconUrl;
  }
  return bookmark;
};
