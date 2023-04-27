import { useState, useEffect } from "react";
import { Bookmark } from "@src/types/Bookmark";
import useBookmarksStore from "../../store/bookmarkStore";

const Newtab = () => {
  const { foldersById, bookmarksById, retrieveBookmarks } = useBookmarksStore();

  useEffect(() => {
    retrieveBookmarks();
  }, [retrieveBookmarks]);

  console.log(foldersById);
  console.log(bookmarksById);

  return (
    <>
      <div className="h-full w-full flex justify-center">
        <div className="max-w-6xl">
          <ul>
            <>
              {Object.keys(foldersById).map((folderId) => {
                const folder = foldersById[folderId];
                const folderBookmarks = Object.values(bookmarksById).filter(
                  (bookmark) => bookmark.parentId === folderId
                );

                return (
                  <>
                    <li
                      key={folder.id}
                      className="flex flex-col justify-center mb-8 p-12"
                    >
                      <h1 className="text-red-500 mb-4">{folder.title}</h1>
                      <ul className="text-white grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {folderBookmarks.map((bookmark) => (
                          <li
                            key={bookmark.id}
                            className="relative flex items-center space-x-3 rounded-sm bg-[#2F2F2F] shadow-sm text-white font-spaceMono"
                          >
                            <a href={bookmark.url} className="h-full w-full">
                              {bookmark.title}
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
