import React from "react";
import playstore from "../../assets/playStore.png";
import appstore from "../../assets/appstore.png";
import logo from "../../assets/download.svg";
import ytLogo from "../../assets/ytt.png";
import instaLogo from "../../assets/insta.png";
import fbLogo from "../../assets/fb.png";
import { AiFillInstagram } from "react-icons/ai";

function Footer() {
  return (
    <footer className="bg-yellow w-screen flex justify-around items-center bg-slate-800 py-5">
      <div className="flex flex-col items-center justify-between w-[30%]">
        <p className="text-white font-semibold xxxsm:text-sm md:text-base text-center">Download Our App</p>
        <p className="text-white text-center xxxsm:hidden xsm:block text-[10px] md:text-base">
          Download App for Android and IOS mobile phone
        </p>
        <img src={playstore} className="object-cover" width={"150px"} alt="" />
        <img src={appstore} className="object-cover" width={"150px"} alt="" />
      </div>
      <div className="flex flex-col items-center justify-between gap-3 w-[30%]">
        <img className="xxxsm:w-28 md:w-48" src={logo} alt="" />
        <p className="text-white xxxsm:text-[10px] md:text-base">Quality With Quantity</p>
        <p className="text-white text-center xxxsm:text-[10px] md:text-base">copyrights&copy; 2024 ibtisam-Afzal</p>
      </div>
      <div className="flex flex-col gap-y-3 items-center justify-between w-[30%]">
        <h3 className="md:text-2xl font-semibold text-white xxxsm:text-xl">Follow Us</h3>
        <a href="https://www.instagram.com/?hl=en">
          <img src={instaLogo} className="h-7" alt="" />
        </a>
        <a href="#">
          <img src={ytLogo} className="h-7" alt="" />
        </a>
        <a
          href="https://web.facebook.com/ibtisam.ibtisam.773981"
          target="_blank"
        >
          <img src={fbLogo} className="h-7" alt="" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
