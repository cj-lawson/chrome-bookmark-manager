import logo from "@assets/img/my-bookmark-logo.svg";
import React, { ChangeEvent, forwardRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { FaGithub } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

interface Props {
  query: string;
  onChange: (query: string) => void;
}

const Navbar = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { query, onChange } = props;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
      <div className="order-1 flex flex-row items-center">
        <img src={logo} alt="" className="w-[120px]" />
      </div>
      <div className="flex flex-1 justify-center order-3 md:order-2 w-full md:col-span-2 col-span-2 mt-8 lg:mt-0 md:mt-0">
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <BiSearch className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              ref={ref}
              onChange={handleInputChange}
              value={query}
              id="search"
              className="block w-full rounded-md border-0 bg-[#333237] py-1.5 pl-10 pr-3 text-white focus:ring-1 focus:ring-[#212025] focus:ring-offset-1 focus:ring-offset-[#212025] sm:text-sm sm:leading-6"
              placeholder="Search"
              type="search"
              name="search"
            />
          </div>
        </div>
      </div>
      <div className="justify-self-end order-2 md:order-3 flex flex-row items-center space-x-6">
        <div>
          <ThemeToggle />
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
