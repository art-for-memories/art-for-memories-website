'use client';

import { Art } from '@/types/arts';
import Image from 'next/image';

export default function MemoryCard({ props }: { props: Art }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 z-10">
            {/* Old Photo Section */}
            <div className="">
                <h3 className="text-md font-semibold mb-2 text-slate-700">Old Photo</h3>

                <div className='relative mt-4'>
                    <Image
                        src={props.oldPhoto}
                        alt="Old Memory"
                        className="w-[400px] h-[450px] object-cover border border-gray-400 rounded-3xl"
                        width={200}
                        height={600}
                    />
                    {!props.preview && <div className="bg-black/40 text-white text-xs p-2 mt-2 absolute bottom-0 left-0 right-0 rounded-b-3xl">
                        <p>{props.name}</p>
                        {/* <p>AGED : {props.age}</p> */}
                    </div>}
                </div>
            </div>

            <div className="flex items-center justify-center w-[100px] h-32">
                <div className="h-1 bg-black flex-grow"></div>

                {/* Logo Circle */}
                <div className="border-2 border-white rounded-full w-10 h-10 flex items-center justify-center mx-1">
                    <span className="bg-white text-white px-1 py-1 rounded-full">
                        <div><Image src={'/images/mini-logo.png'} alt={"logo"} className='' width={500} height={500} /></div>
                    </span>
                </div>

                <div className="h-1 bg-black flex-grow"></div>
            </div>

            {/* Preserved Photo Section */}
            <div className="">
                <h3 className="text-md font-semibold mb-2 text-slate-700">Preserved Photo</h3>

                <div className='relative mt-4'>
                    <Image
                        src={props.preservedPhoto}
                        alt="Preserved Memory"
                        className="w-[400px] h-[450px] rounded-3xl object-cover border border-gray-400"
                        width={200}
                        height={400}
                    />
                    {/* direct download */}
                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = props.preservedPhoto;
                            link.download = 'preserved-photo.jpg';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        className="bg-black/40 text-white text-xs p-2 mt-2 absolute bottom-0 left-0 right-0 rounded-b-3xl flex flex-col items-center justify-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g opacity=".4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11v6l2-2M9 17l-2-2"></path></g><path d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <span>Download</span>
                    </button>
                </div>
            </div>

            {/* Preview pannel */}
            {props.preview && (
                <div className="bg-black rounded-sm text-white p-10 text-xl text-center">
                    <div>{props.name}</div>
                </div>
            )}
        </div>
    );
}