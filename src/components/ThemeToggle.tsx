import useDarkMode from "../hooks/useDarkMode";
import { RiMoonClearFill } from "react-icons/ri";
import { RiSunFill } from "react-icons/ri";

const ThemeToggle = () => {
  const [colorTheme, setColorTheme]: any = useDarkMode();

  return (
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
  );
};

export default ThemeToggle;
