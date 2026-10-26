"use client";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Image from 'next/image';
import SubNav from "./SubNav";

const Header = () => {
    return (
        <header className="flex justify-between items-center relative z-30">
            <div className="container max-w-6xl mx-auto bg-[#FCECE1] rounded-b-[30px]">
                {/* Top Bar */}
                <div className="bg-black rounded-b-[30px] text-white text-sm py-2 flex justify-between items-center px-6">
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:block">📧 artformemories@gmail.com</span>
                    </div>
                    <div className="flex space-x-3">
                        <FaFacebookF className="cursor-pointer" />
                        <FaTwitter className="cursor-pointer" />
                        <FaLinkedinIn className="cursor-pointer" />
                        <FaYoutube className="cursor-pointer" />
                    </div>
                </div>

                {/* Header */}
                <nav className="bg-[#FCECE1] rounded-[10px] py-3 px-6 flex justify-between items-center relative">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <div className="text-2xl font-bold flex items-center">
                            <span className="bg-transparent text-white rounded">
                                <Image src={'/images/ART.png'} alt={"logo"} width={90} height={50} />
                            </span>
                            {/* <span className="text-black ml-2 text-[12px] font-bold font-boldonse">Art for Memories.</span> */}
                        </div>
                    </div>

                    {/* SubNav Section */}
                    <SubNav />
                </nav>
            </div>
        </header>
    );
};

export default Header;
