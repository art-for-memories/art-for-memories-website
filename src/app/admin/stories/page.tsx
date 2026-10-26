'use client';

import Navbar from '@/components/dashboard/navbar'
import Sidebar from '@/components/dashboard/sidebar'
import FormModal from '@/components/models/form-model';
import React, { useEffect, useState } from 'react'
import StoriesTable from '@/components/dashboard/StoriesTable';
import FetchSpinner from '@/components/spinners/fetch-spinner';
import { Stories as Story } from '@/types/stories';
import WriteStoryForm from '@/components/forms/WriteStoryForm';

function Stories() {
    const [isWriteFormOpen, setWriteForm] = useState(false);
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentStory, setCurrentStory] = useState<Story | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const headers = ['title', 'author', 'date', 'type'];

    const visibleStories = stories.filter((story) => {
        const term = searchTerm.trim().toLowerCase();
        return !term || [story.title, story.author].some((value) => (value || '').toLowerCase().includes(term));
    });

    // Opening the form from the header button always starts a new story
    const openNewStoryForm = () => {
        setCurrentStory(null);
        setWriteForm(true);
    };

    const getAllStories = async () => {
        try {
            setLoading(true);

            const response = await fetch('/api/stories');

            if (response.ok) {
                const stories = await response.json();
                setStories(stories);
            } else {
                console.error('Failed to fetch stories');
            }

        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this story?');
        if (!confirmDelete) return;

        try {
            setLoading(true);

            const response = await fetch(`/api/stories/${id}`, { method: 'DELETE' });

            if (response.ok) {
                setStories(stories.filter((story) => story.id !== id));
                setLoading(false);
            } else {
                console.error('Failed to delete story');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error deleting story:', error);
            setLoading(false);
        }
    };

    const handlePreview = async (id: string) => {
        try {
            const response = await fetch(`/api/stories/${id}`);

            if (response.ok) {
                const story = await response.json();
                setCurrentStory(story);
                setWriteForm(true);
            } else {
                console.error('Failed to fetch story details');
            }
        } catch (error) {
            console.error('Error fetching story details:', error);
        }
    }

    useEffect(() => {
        getAllStories();
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
                            <h1 className="text-xl font-semibold text-black">Their Stories</h1>

                            <div className='flex items-center'>
                                <button onClick={openNewStoryForm} className="bg-black ml-2 text-white px-4 py-2 flex items-center rounded cursor-pointer">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </span>
                                    <span>Write Story</span>
                                </button>
                            </div>
                        </div>

                        <FormModal isOpen={isWriteFormOpen} onClose={() => setWriteForm(false)}>
                            <WriteStoryForm key={currentStory?.id ?? 'new'} currentStory={currentStory} />
                        </FormModal>
                    </header>

                    <div className="flex border border-gray-200 bg-white rounded px-2 items-center mt-5">
                        <span className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Search by title or author..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 focus:outline-none text-slate-700 w-full" />
                    </div>

                    {/* Table */}
                    <div className="mt-4 overflow-auto w-full bg-white px-2">
                        {loading && <div className="my-10"><FetchSpinner /></div>}
                        <StoriesTable
                            headers={headers}
                            data={visibleStories}
                            onDelete={handleDelete}
                            onPreview={handlePreview}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stories