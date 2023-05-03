import { useEffect, useRef } from "react";
import useBookmarksStore from "../../store/bookmarkStore";
import Navbar from "@src/components/Navbar";

const Newtab = () => {
  const retrieveBookmarks = useBookmarksStore(
    (state) => state.retrieveBookmarks
  );

  const query = useBookmarksStore((state) => state.query);
  const setQuery = useBookmarksStore((state) => state.setQuery);
  const searchBarRef = useRef<HTMLInputElement>(null);

  const filteredFolders = useBookmarksStore((state) => state.filteredFolders);
  const filteredBookmarks = useBookmarksStore(
    (state) => state.filteredBookmarks
  );

  useEffect(() => {
    retrieveBookmarks();
  }, [retrieveBookmarks]);
  console.log(filteredBookmarks);
  console.log(filteredFolders);
  return (
    <>
      <div className="h-full w-full flex flex-col items-center">
        <div className="max-w-6xl px-12 w-full mt-4 pt-4 pb-4 mb-8 bg-[#F9FBFC] dark:bg-[#212025]">
          <Navbar query={query} onChange={setQuery} ref={searchBarRef} />
        </div>
        <div className="min-w-6xl max-w-6xl py-8 px-12 w-full">
          <ul>
            <>
              {Object.keys(filteredFolders).map((folderId) => {
                if (folderId === "0" || folderId === "1") {
                  return null;
                }
                const folder = filteredFolders[folderId];
                const folderBookmarks = Object.values(filteredBookmarks).filter(
                  (bookmark) => bookmark.parentId === folderId
                );

                return (
                  <>
                    <li
                      key={folder.id}
                      className="flex flex-col justify-center mb-12"
                    >
                      <h1 className="text-[#212025] dark:text-white mb-4 text-lg font-spaceMono font-semibold">
                        {folder.title}
                      </h1>
                      <ul className="text-white grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {folderBookmarks.map((bookmark) => (
                          <li
                            key={bookmark.id}
                            className="rounded-sm bg-white dark:bg-[#333237] shadow-sm dark:shadow-sm dark:hover:bg-[#37363b] hover:bg-[#e6e6e6] transition eas-in-out border border-1 border-[#212025] border-opacity-10"
                          >
                            <a
                              href={bookmark.url}
                              className="h-full w-full flex items-center text-white font-spaceMono px-6 py-5"
                              target="_blank"
                            >
                              <div className="flex flex-col space-y-3">
                                <div className="flex flex-row space-x-4 items-start">
                                  <img
                                    src={bookmark.faviconUrl}
                                    alt=""
                                    className="w-[18px] h-[18px] rounded-sm"
                                  />
                                  <div className="flex flex-col">
                                    <h3 className="text-[#212025] dark:text-white mb-3 font-semibold font-spaceMono line-clamp-2">
                                      {bookmark.title}
                                    </h3>
                                    <p className="text-[#212025] text-opacity-80 decoration-slate-900/70 dark:text-white dark:text-opacity-70 underline underline-offset-4 dark:decoration-slate-100/30 font-spaceMono">
                                      {bookmark.url?.split("/")[2]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </>
                );
              })}
            </>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Newtab;

// border border-1 border-[#212025] border-opacity-50
