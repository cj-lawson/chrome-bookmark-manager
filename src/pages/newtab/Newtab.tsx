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
    <div className="bg-[#191919]">
      <div className="px-8 py-12 max-w-6xl mx-auto">
        <div className="pl-12">
          <h1 className="text-3xl text-white font-spaceMono">
            🤠 Howdy, here are your Chrome bookmarks
          </h1>
        </div>
        {bookmarks.map((folder) => (
          <div className="flex flex-col justify-center mb-8 p-12">
            <h1 className="text-[#989AA7] mb-4 text-lg font-spaceMono">
              {folder.title}
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {folder?.children.map((bookmark) => (
                <a
                  className="relative flex items-center space-x-3 rounded-sm bg-[#2F2F2F] shadow-sm text-white font-spaceMono"
                  href={bookmark.url}
                  target="_blank"
                >
                  <div className="bg-white w-full h-full bg-opacity-0 transition ease-in-out  hover:bg-opacity-10">
                    <div className="flex flex-col space-y-3 px-6 py-7 ">
                      <div className="flex flex-row space-x-4">
                        <img
                          src={bookmark.faviconUrl}
                          alt=""
                          className="w-[16px] h-[16px] rounded-sm"
                        />
                        <h1 className="font-spaceMono">{bookmark.title}</h1>
                      </div>
                      <div>
                        <p className="underline underline-offset-4 decoration-slate-100/30 font-spaceMono">
                          {bookmark.url?.split("/")[2]}
                        </p>
                      </div>
                    </div>
                  </div>
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
