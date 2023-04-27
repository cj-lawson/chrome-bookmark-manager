import { Bookmark } from "@src/types/Bookmark";
import { ChromeBookmark } from "../../types/ChromeBookmark";
import { Folder } from "@src/types/Folder";

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
});

export const parseChromeBookmarks = (chromeBookmarks: ChromeBookmark[]) => {
  const foldersById: ChromeBookmarksById = {};
  const bookmarksById: ChromeBookmarksById = {};

  const parseBookmarkNodes = (nodes: ChromeBookmark[]) => {
    nodes.forEach((node) => {
      if (node.children) {
        foldersById[node.id] = withoutChildren(node);
        parseBookmarkNodes(node.children);
      } else {
        bookmarksById[node.id] = node;
      }
    });
  };

  parseBookmarkNodes(chromeBookmarks);

  return { foldersById, bookmarksById };
};
