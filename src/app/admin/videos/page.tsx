'use client';

import Navbar from '@/components/dashboard/navbar';
import Sidebar from '@/components/dashboard/sidebar';
import VideoForm from '@/components/forms/VideoForm';
import FormModal from '@/components/models/form-model';
import FetchSpinner from '@/components/spinners/fetch-spinner';
import { Video } from '@/types/video';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Videos() {
    const [isFormOpen, setFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState<Video | undefined>(undefined);

    const handleDelete = (id: string) => async () => {
        if (!confirm('Are you sure you want to delete this video?')) {
            return;
        }

        const response = await fetch(`/api/videos/${id}`, { method: 'DELETE' });

        if (response.ok) {
            setVideos((prevVideos) => prevVideos.filter((video: Video) => video.id !== id));
        } else {
            console.error('Failed to delete video');
        }
    }

    const handlePreview = (id: string) => async () => {
        const response = await fetch(`/api/videos/${id}`);

        if (response.ok) {
            const data = await response.json();
            setCurrentVideo(data);
            setFormOpen(true);
        } else {
            console.error('Failed to fetch video');
        }
    }

    const getVideos = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/videos');

            if (response.ok) {
                setVideos(await response.json());
            } else {
                console.error('Failed to fetch videos');
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="min-h-screen flex bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <header>
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold text-black">Upload Videos</h1>

                            <button onClick={() => { setCurrentVideo(undefined); setFormOpen(true); }} className="bg-black text-white px-4 py-2 flex items-center rounded cursor-pointer">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </span>
                                <span>Add New</span>
                            </button>
                        </div>

                        <FormModal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
                            <VideoForm key={currentVideo?.id ?? 'new'} onCallback={() => {
                                window.location.reload();
                            }} setFormOpen={(value) => setFormOpen(value)} currentVideo={currentVideo} />
                        </FormModal>
                    </header>

                    {/* Table */}
                    <div className="mt-4">
                        {loading && <div className="my-10"><FetchSpinner /></div>}
                        {videos.length === 0 && (
                            <div className='bg-white rounded-xl flex flex-col items-center justify-center p-4 w-full'>
                                <Image src={'/svgs/empty.svg'} alt='' width={400} height={400} />
                                <span className='text-slate-700 font-semibold text-base'>No Stories found</span>
                            </div>
                        )}

                        <div className='bg-white rounded-xl items-center justify-center p-4 grid grid-cols-3 gap-4 w-full gap-x-4'>
                            {videos && videos.map((video: Video, index: number) => (
                                <div key={index} className="bg-black rounded-lg relative mx-1 w-[300px]">
                                    <iframe
                                        src={video.url}
                                        width="100%"
                                        height="200"
                                        className="w-[300px] h-[200px] rounded-lg"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="rounded-lg bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
                                        <h3 className="text-sm font-semibold">{video.title}</h3>
                                        <p className="text-xs">{video.caption}</p>

                                        <div className='mt-2'>
                                            <button onClick={video.id ? handlePreview(video.id) : undefined} className="text-gray-500 hover:text-red-500 bg-gray-200 rounded-xl p-2" disabled={!video.id}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                </svg>
                                            </button>

                                            <button onClick={video.id ? handleDelete(video.id) : undefined} className="text-gray-500 ml-2 hover:text-red-500 bg-red-200 rounded-xl p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videos;