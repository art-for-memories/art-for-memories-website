import Image from 'next/image';
import React from 'react';

function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="text-2xl font-bold flex flex-col items-center sm:flex-row">
                <span className="text-black px-2 py-2 rounded-full">
                    <Image src={'/images/ART.png'} alt={"logo"} width={200} height={80} />
                </span>
            </div>
        </div>
    );
}

export default Loading;