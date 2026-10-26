'use client';

import ArtsTable from '@/components/dashboard/arts-table';
import Navbar from '@/components/dashboard/navbar'
import Sidebar from '@/components/dashboard/sidebar'
import PreservedMemoryForm from '@/components/forms/PreservedMemoryForm';
import FormModal from '@/components/models/form-model'
import FetchSpinner from '@/components/spinners/fetch-spinner';
import { Art } from '@/types/arts';
import React, { useEffect, useState } from 'react'

function FinalArt() {
    const [isFormOpen, setFormOpen] = useState(false);
    const [arts, setArts] = useState<Art[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentMemory, setCurrentMemory] = useState<Art | null>(null);

    const headers = ['Name', 'Age', 'Old Photo', 'Preserved Photo'];

    const getAllArts = async () => {
        try {
            setLoading(true);

            const response = await fetch('/api/preserved-memories');
            const data = await response.json();

            if (response.ok) {
                setArts(data);
            } else {
                throw new Error('Failed to fetch arts');
            }

        } catch (error) {
            console.error('Error fetching arts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this Memory?')) {
            setLoading(true);

            const response = await fetch(`/api/preserved-memories/${id}`, { method: 'DELETE' });

            setLoading(false);

            if (response.ok) {
                setArts(arts.filter((art) => art.id !== id));
            } else {
                console.error('Failed to delete memory');
            }
        }
    };

    const handlePreview = async (art: Art) => {
        try {
            const response = await fetch(`/api/preserved-memories/${art.id}`);

            if (response.ok) {
                const story = await response.json();
                setCurrentMemory(story);
                setFormOpen(true);
            } else {
                console.error('Failed to fetch story details');
            }
        } catch (error) {
            console.error('Error fetching story details:', error);
        }
    };

    const handleSubmitted = async () => {
        setFormOpen(false);
        getAllArts();
    }

    useEffect(() => {
        getAllArts();
    }, []);

    return (<>
        <div>
            <Navbar />

            <div className="min-h-screen flex bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <header>
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold text-black">Preserved Memories</h1>

                            <button onClick={() => { setCurrentMemory(null); setFormOpen(true); }} className="bg-black text-white px-4 py-2 flex items-center rounded cursor-pointer">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </span>
                                <span>Add New</span>
                            </button>
                        </div>

                        <FormModal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
                            <PreservedMemoryForm key={currentMemory?.id ?? 'new'} currentMemory={currentMemory} onCallback={handleSubmitted} />
                        </FormModal>
                    </header>

                    <div className="flex border border-gray-200 bg-white rounded px-2 items-center mt-5">
                        <span className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Enter Memory name..." className="p-2 focus:outline-none text-slate-700" />
                    </div>

                    {/* Table */}
                    <div className="mt-4">
                        {loading && <div className="my-10"><FetchSpinner /></div>}
                        <ArtsTable headers={headers} data={arts} onDelete={handleDelete} onPreview={handlePreview} />
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default FinalArt;