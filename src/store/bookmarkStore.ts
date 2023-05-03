import { parseChromeBookmarks, getBookmarks } from "@src/pages/background";
import { create } from "zustand";

interface BookmarksState {
  query: string;
  setQuery: (query: string) => void;
  foldersById: Record<string, any>;
  bookmarksById: Record<string, any>;
  filteredBookmarks: Record<string, any>;
  filteredFolders: Record<string, any>;
  retrieveBookmarks: () => Promise<void>;
  theme: string;
}

const useBookmarksStore = create<BookmarksState>((set) => ({
  query: "",
  foldersById: {},
  bookmarksById: {},
  filteredBookmarks: {},
  filteredFolders: {},
  theme: localStorage.theme,

  retrieveBookmarks: async () => {
    const chromeBookmarks = await getBookmarks();
    const parsedBookmarks = parseChromeBookmarks(chromeBookmarks);
    set(() => ({
      foldersById: parsedBookmarks.foldersById,
      bookmarksById: parsedBookmarks.bookmarksById,
      filteredFolders: parsedBookmarks.foldersById,
      filteredBookmarks: parsedBookmarks.bookmarksById,
    }));
  },

  setQuery: (query) =>
    set((state) => {
      // Create new var for folders and bookmarks to hold filtered objects
      const filteredFoldersById: Record<string, any> = {};
      const filteredBookmarksById: Record<string, any> = {};

      //   Variable to store Id's of matching folders
      const matchingFolderIds = new Set<string>();

      //   Filter Bookmarks
      Object.entries(state.bookmarksById).forEach(([bookmarkId, bookmark]) => {
        if (bookmark.title.toLowerCase().includes(query.toLowerCase())) {
          filteredBookmarksById[bookmarkId] = bookmark;
          matchingFolderIds.add(bookmark.parentId);
        }
      });
      //   Filter Folders based on matchingFolderIds
      Object.entries(state.foldersById).forEach(([folderId, folder]) => {
        if (matchingFolderIds.has(folderId)) {
          filteredFoldersById[folderId] = folder;
        }
      });
      return {
        ...state,
        query,
        filteredBookmarks: filteredBookmarksById,
        filteredFolders: filteredFoldersById,
      };
    }),
}));

export default useBookmarksStore;
