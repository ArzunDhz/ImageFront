import { useRef } from "react";
import Logo from "../assets/Logo.png";
import Homeicon from "../assets/Home.png";
import History from "../assets/History.png";
import Exit from "../assets/exit.png";
import Menu from "../assets/Menu.png";
import Cross from "../assets/Close btn.png";
import useUserStore from "../store/store";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  let userData = { username: "Guest" };
  userData = useUserStore((state) => state.user);
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const Singout = async () => {
    await axios
      .get(" https://dhz-image.onrender.com/users/logout", { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <header className="z-50 ">
      <img className=" w-[100px]" src={Logo} alt="" />
      <nav className="mt-10 ml-auto " ref={navRef}>
        <div id="Nav" className="flex items-center mt-4 space-x-10 ">
          <div id="Homeicon1" className="flex items-center justify-center ">
            <img className="w-8 h-[30px] " src={Homeicon} alt="" />
            <Link to={"/home"} className="ml-2 text-xl text-white ">
              Home
            </Link>
          </div>
          <div id="Homeicon2" className="flex items-center justify-center ">
            <img className="w-5 h-[24px] " src={History} alt="" />
            <Link className="ml-2 text-xl text-white " to={"/history"}>
              History
            </Link>
          </div>
          <div id="Homeicon3" className="flex items-center justify-center ">
            <img className="w-7 h-[24px] " src={Exit} alt="" />
            <Link
              onClick={Singout}
              to={"/login"}
              className="ml-2 text-xl text-white"
            >
              Logout
            </Link>
          </div>
          <Link to={"/aboutme"}>
     
            <div
              id="Homeicon4"
              className="flex items-center justify-center w-10 h-10 text-white rounded-full opacity-70 bg-pop-color"
            >
              <h1>
                {userData ? userData.username.slice(0, 1).toUpperCase() : "G"}
              </h1>
            </div>
          </Link>
        </div>

        <button
          className=" text-pop-color nav-btn nav-close-btn"
          onClick={showNavbar}
        >
          <img className=" opacity-60" src={Cross} alt="" />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <img className="w-6 h-6 " src={Menu} alt="" />
      </button>
    </header>
  );
};

export default Navbar;
