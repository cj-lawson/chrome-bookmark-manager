import { useState, useEffect } from "react";
import { Bookmark } from "@src/types/Bookmark";
import useBookmarksStore from "../../store/bookmarkStore";
import Navbar from "@src/components/Navbar";

const Newtab = () => {
  const { foldersById, bookmarksById, retrieveBookmarks } = useBookmarksStore();

  useEffect(() => {
    retrieveBookmarks();
  }, [retrieveBookmarks]);

  console.log(foldersById);
  console.log(bookmarksById);

  return (
    <>
      <div className="h-full w-full flex flex-col items-center">
        <div className="max-w-6xl px-12 w-full mt-4 mb-8">
          <Navbar />
        </div>
        <div className="max-w-6xl py-8 px-12 ">
          <ul>
            <>
              {Object.keys(foldersById).map((folderId) => {
                if (folderId === "0" || folderId === "1") {
                  return null;
                }
                const folder = foldersById[folderId];
                const folderBookmarks = Object.values(bookmarksById).filter(
                  (bookmark) => bookmark.parentId === folderId
                );

                return (
                  <>
                    <li
                      key={folder.id}
                      className="flex flex-col justify-center mb-12"
                    >
                      <h1 className="text-white mb-4 text-lg font-spaceMono font-semibold">
                        {folder.title}
                      </h1>
                      <ul className="text-white grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {folderBookmarks.map((bookmark) => (
                          <li
                            key={bookmark.id}
                            className="rounded-sm bg-[#333237] shadow-sm"
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
                                    <h3 className="mb-3 font-semibold font-spaceMono line-clamp-2">
                                      {bookmark.title}
                                    </h3>
                                    <p className="underline underline-offset-4 decoration-slate-100/30 font-spaceMono">
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
