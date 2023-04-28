import logo from "@assets/img/my-bookmark-logo.svg";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full flex flex-row justify-between">
      <img src={logo} alt="" className="w-[120px]" />
      <a
        href="https://github.com/spicyBeefPho/chrome-bookmark-manager"
        target="_blank"
      >
        <FaGithub className="w-[24px] h-[24px]" />
      </a>
    </div>
  );
};

export default Navbar;
