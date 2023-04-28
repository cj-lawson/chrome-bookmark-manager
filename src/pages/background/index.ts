import { Bookmark } from "@src/types/Bookmark";
import { ChromeBookmark } from "../../types/ChromeBookmark";

export const getBookmarks = async () => {
  return new Promise<ChromeBookmark[]>((res) => chrome.bookmarks.getTree(res));
};

type ChromeBookmarksById = { [id: string]: ChromeBookmark };

const withoutChildren = (bookmark: ChromeBookmark) => ({
  index: bookmark.index,
  title: bookmark.title,
  url: bookmark.url,
  dateGroupModified: bookmark.dateGroupModified,
  id: bookmark.id,
  parentId: bookmark.parentId,
  unmodifiable: bookmark.unmodifiable,
  faviconUrl: bookmark.faviconUrl,
});

export const parseChromeBookmarks = (chromeBookmarks: ChromeBookmark[]) => {
  const foldersById: ChromeBookmarksById = {};
  const bookmarksById: ChromeBookmarksById = {};

  const parseBookmarkNodes = (nodes: ChromeBookmark[]) => {
    nodes.forEach((node) => {
      if (node.children) {
        foldersById[node.id] = withoutChildren(node);
        parseBookmarkNodes(node.children);
        // if(node.title = 'Other Bookmarks' || 'Mobile Bookmarks'){

        // }
      } else {
        bookmarksById[node.id] = node;
        const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${node.url}&sz=32`;
        bookmarksById[node.id].faviconUrl = faviconUrl;
      }
    });
  };

  parseBookmarkNodes(chromeBookmarks);

  console.log(Object.keys(foldersById));

  return { foldersById, bookmarksById };
};
