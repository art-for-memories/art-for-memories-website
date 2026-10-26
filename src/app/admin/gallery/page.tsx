'use client';

import Navbar from '@/components/dashboard/navbar'
import Sidebar from '@/components/dashboard/sidebar'
import FormModal from '@/components/models/form-model';
import React, { useEffect, useState } from 'react'
import FetchSpinner from '@/components/spinners/fetch-spinner';
import GalleryForm from '@/components/forms/GalleryForm';
import GalleryTable from '@/components/tables/galleryTable';

function Stories() {
    const [isFormOpen, setFormOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState<{id: string; name: string; image: string} | null>(null);

    const headers = ['name', 'url'];

    const getAllImages = async () => {
        try {
            setLoading(true);

            const response = await fetch('/api/gallery');

            if (response.ok) {
                const images = await response.json();
                setImages(images);
            } else {
                console.error('Failed to fetch images');
            }

        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this image?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });

            if (response.ok) {
                setImages(images.filter((image: { id: string }) => image.id !== id));
            } else {
                console.error('Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handlePreview = async (id: string) => {
        const image = images.find((image: { id: string }) => image.id === id);
        
        if (image) {
            setCurrentImage(image);
            setFormOpen(true);
        } 
    }

    useEffect(() => {
        getAllImages();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="min-h-screen flex bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto">
                    <header>
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold text-black">Gallery</h1>

                            <div className='flex items-center'>
                                <button onClick={() => { setCurrentImage(null); setFormOpen(true); }} className="bg-black text-white px-4 py-2 flex items-center rounded cursor-pointer">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </span>
                                    <span>Upload Photo</span>
                                </button>
                            </div>
                        </div>

                        <FormModal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
                            <GalleryForm key={currentImage?.id ?? 'new'} onSuccess={() => {
                                setFormOpen(false)
                                getAllImages();
                            }} currentImage={currentImage} />
                        </FormModal>
                    </header>

                    <div className="flex border border-gray-200 bg-white rounded px-2 items-center mt-5">
                        <span className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Enter Story name..." className="p-2 focus:outline-none text-slate-700" />
                    </div>

                    {/* Table */}
                    <div className="mt-4 overflow-auto w-full bg-white px-2">
                        {loading && <div className="my-10"><FetchSpinner /></div>}
                        <GalleryTable
                            headers={headers}
                            data={images}
                            onPreview={handlePreview}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stories