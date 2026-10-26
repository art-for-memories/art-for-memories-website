"use client";

import Image from 'next/image';
import SubNav from './SubNav';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className='relative w-full my-5 z-20'>
            <div className="bg-[#F9F3EE] relative z-20 rounded-[10px] container max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href={'/'} className="text-2xl font-bold flex items-center">
                        <span className="bg-transparent text-white rounded">
                            <Image src={'/images/ART.png'} alt={"logo"} width={90} height={50} />
                        </span>
                    </Link>
                </div>
                <div className="z-20">
                    <SubNav />
                </div>
            </div>

            <div className="bg-[#FFFFFF33] z-10 rounded-[10px] absolute mx-auto max-w-[1110px] right-0 left-0 p-10 top-2 inset-0"></div>
        </div>
    );
}
