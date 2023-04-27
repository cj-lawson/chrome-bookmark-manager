import { parseChromeBookmarks, getBookmarks } from "@src/pages/background";
import { create } from "zustand";

interface BookmarksState {
  foldersById: Record<string, any>;
  bookmarksById: Record<string, any>;
  retrieveBookmarks: () => Promise<void>;
}

const useBookmarksStore = create<BookmarksState>((set) => ({
  foldersById: {},
  bookmarksById: {},
  retrieveBookmarks: async () => {
    const chromeBookmarks = await getBookmarks();
    const parsedBookmarks = parseChromeBookmarks(chromeBookmarks);
    set(() => ({
      foldersById: parsedBookmarks.foldersById,
      bookmarksById: parsedBookmarks.bookmarksById,
    }));
  },
}));

export default useBookmarksStore;
