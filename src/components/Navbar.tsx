// React
import { ChangeEvent, forwardRef } from "react";
// Assets
import logo from "@assets/img/my-bookmark-logo.svg";
import darkLogo from "@assets/img/logo-dark.svg";
import { FaGithub } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { RiMoonClearFill } from "react-icons/ri";
import { RiSunFill } from "react-icons/ri";
// Hooks
import useDarkMode from "../hooks/useDarkMode";

interface Props {
  query: string;
  onChange: (query: string) => void;
}

const Navbar = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [colorTheme, setColorTheme]: any = useDarkMode();
  console.log(colorTheme);
  const { query, onChange } = props;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
      <div className="order-1 flex flex-row items-center">
        <>
          {colorTheme === "dark" ? (
            <img src={darkLogo} alt="" className="w-[120px]" />
          ) : (
            <img src={logo} alt="" className="w-[120px]" />
          )}
        </>
      </div>
      <div className="flex flex-1 justify-center order-3 md:order-2 w-full md:col-span-2 col-span-2 mt-8 lg:mt-0 md:mt-0">
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative text-[#333237] dark:text-gray-400 focus-within:text-[#333237]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <BiSearch className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              ref={ref}
              onChange={handleInputChange}
              value={query}
              id="search"
              className="bg-white block w-full rounded-md dark:border-0 dark:bg-[#333237] py-1.5 pl-10 pr-3 dark:text-white without-ring sm:text-sm sm:leading-6 border border-1 border-[#212025] border-opacity-10 focus:border-[#212025] focus:ring-0 focus:border-opacity-20 shadow-sm"
              placeholder="Search Bookmarks..."
              type="search"
              name="search"
            />
          </div>
        </div>
      </div>
      <div className="justify-self-end order-2 md:order-3 flex flex-row items-center space-x-6">
        <div>
          <>
            <button
              className="flex flex-row space-x-3 items-center"
              onClick={() => setColorTheme(colorTheme)}
            >
              {colorTheme === "light" ? (
                <>
                  <RiSunFill className="w-[22px] h-[22px] text-slate-100" />
                </>
              ) : (
                <>
                  <RiMoonClearFill className="w-[22px] h-[22px] text-gray-tertiary" />
                </>
              )}
            </button>
          </>
        </div>
        <div>
          <a
            href="https://github.com/spicyBeefPho/chrome-bookmark-manager"
            target="_blank"
          >
            <FaGithub className="w-[22px] h-[22px]" />
          </a>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
