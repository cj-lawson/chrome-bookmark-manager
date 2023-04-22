import { useState, useEffect } from "react";
import logo from "@assets/img/logo.svg";
import { Bookmark } from "@src/types/Bookmark";
import { fetchBookmarks, parseBookmarks } from "../background/index";

const Newtab = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const getFavicon = () => {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
  };

  useEffect(() => {
    fetchBookmarks().then((bookmarks) => {
      setBookmarks(bookmarks[0].children[0].children);
    });
  }, []);

  console.log("here are your bookmarks...");
  console.log(bookmarks);

  return (
    <div className="bg-[#F3F5FA]">
      <div className="px-8 py-8">
        {bookmarks.map((folder) => (
          <div className="flex flex-col justify-center mb-8 p-12">
            <h1 className="text-[#989AA7] mb-4 text-lg">{folder.title}</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {folder?.children.map((bookmark) => (
                <a
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                  href={bookmark.url}
                  target="_blank"
                >
                  <h1>{bookmark.title}</h1>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newtab;
