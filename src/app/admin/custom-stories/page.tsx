'use client';

import Navbar from '@/components/dashboard/navbar'
import Sidebar from '@/components/dashboard/sidebar'
import React, { useEffect, useState } from 'react'
import FetchSpinner from '@/components/spinners/fetch-spinner';
import Image from "next/image";
import type { CustomStory } from '@/types/customStory';

function Page() {
  const [stories, setStories] = useState<CustomStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStory, setCurrentStory] = useState<CustomStory | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const headers = ['title', 'author', 'date', 'type', 'firstName', 'lastName', 'email', 'status'];

  const getAllStories = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/custom-stories');

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

      const response = await fetch(`/api/custom-stories/${id}`, { method: 'DELETE' });

      if (response.ok) {
        setStories(stories.filter((story) => story.id !== id));
      } else {
        console.error('Failed to delete story');
      }
    } catch (error) {
      console.error('Error deleting story:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (id: string) => {
    try {
      const response = await fetch(`/api/custom-stories/${id}`);

      if (response.ok) {
        const story = await response.json();
        setCurrentStory(story);
      } else {
        console.error('Failed to fetch story details');
      }
    } catch (error) {
      console.error('Error fetching story details:', error);
    }
  }

  const handleReject = async (id: string) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/custom-stories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!response.ok) {
        console.error('Failed to reject story');
      }

      await getAllStories();
    } catch (error) {
      console.error('Error rejecting story:', error);
      setLoading(false);
    }
  }

  // Approving copies the submission into the public stories list
  const handlePublish = async (id: string) => {
    const confirmPublish = window.confirm('Approve this story and publish it on the website?');
    if (!confirmPublish) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/custom-stories/${id}/publish`, { method: 'POST' });

      if (!response.ok) {
        const { error } = await response.json();
        alert(error || 'Failed to publish story');
      }

      await getAllStories();
    } catch (error) {
      console.error('Error publishing story:', error);
      setLoading(false);
    }
  }

  const visibleStories = stories.filter((story) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return [story.title, story.author, story.firstName, story.lastName, story.email]
      .some((value) => (value || '').toLowerCase().includes(term));
  });

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
              <h1 className="text-xl font-semibold text-black">Submitted Stories</h1>
            </div>
          </header>

          <div className="flex border border-gray-200 bg-white rounded px-2 items-center mt-5">
            <span className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input type="text" placeholder="Search by title, author or submitter..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 focus:outline-none text-slate-700 w-full" />
          </div>

          {/* Table */}
          <div className="mt-4 overflow-auto w-full bg-white px-2">
            {loading && <div className="my-10"><FetchSpinner /></div>}

            <div className='bg-white rounded-xl flex flex-col items-center justify-center p-4 w-full overflow-auto'>
              <table className="w-full text-left whitespace-nowrap">
                <thead className=''>
                  <tr className="bg-gray-100 text-black text-sm">
                    {headers.map((header) => (
                      <th key={header} className="p-4">
                        {header.toUpperCase()}
                      </th>
                    ))}
                    <th className="p-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleStories.length === 0 && (
                    <tr>
                      <td colSpan={headers.length + 2} className="text-center">
                        <div className='bg-white rounded-xl flex flex-col items-center justify-center p-4'>
                          <Image src={'/svgs/empty.svg'} alt='' width={400} height={400} />
                          <span className='text-slate-700 font-semibold text-base'>No Stories found</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {visibleStories.map((story) => (
                    <tr key={story.id} className="focus:outline-none h-16 border border-gray-100 rounded-lg bg-white text-black text-sm">
                      <td className={`p-4`}>
                        {story.title}
                      </td>
                      <td className={`p-4`}>
                        {story.author}
                      </td>
                      <td className="p-4">{new Date(story.date).toLocaleDateString()}</td>
                      <td className="p-4">{story.storyType}</td>
                      <td className="p-4">{story.firstName}</td>
                      <td className="p-4">{story.lastName}</td>
                      <td className="p-4">{story.email}</td>
                      <td className="p-4 text-sm">
                        {story.status === 'approved' ? (
                          <span className="text-white bg-green-500 rounded-lg px-4 py-2">{story.publishedStoryId ? 'Published' : 'Approved'}</span>
                        ) : story.status === 'rejected' ? (
                          <span className="bg-red-700 rounded-lg px-4 py-2 text-white">Rejected</span>
                        ) : (
                          <span className="bg-yellow-700 rounded-lg px-4 py-2 text-white">Pending</span>
                        )}
                      </td>
                      <td className="p-4">
                        {!story.publishedStoryId && (
                          <button onClick={() => story.id && handlePublish(story.id)} title="Approve & publish" className="text-gray-700 hover:text-green-700 bg-green-200 rounded-xl px-3 py-2 text-xs font-semibold">
                            Publish
                          </button>
                        )}
                        {!story.publishedStoryId && story.status !== 'rejected' && (
                          <button onClick={() => story.id && handleReject(story.id)} title="Reject" className="text-gray-700 ml-2 hover:text-red-700 bg-yellow-200 rounded-xl px-3 py-2 text-xs font-semibold">
                            Reject
                          </button>
                        )}
                        <button onClick={() => story.id && handlePreview(story.id)} className="text-gray-500 ml-2 hover:text-red-500 bg-gray-200 rounded-xl p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                        </button>
                        <button onClick={() => story.id && handleDelete(story.id)} className="text-gray-500 ml-2 hover:text-red-500 bg-red-200 rounded-xl p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Preview Modal */}
          {currentStory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-slate-900 bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                  onClick={() => setCurrentStory(null)}
                  aria-label="Close preview"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Story Preview</h2>
                <div className="space-y-2 text-sm">
                  <div><span className="font-semibold">First Name:</span> {currentStory.firstName}</div>
                  <div><span className="font-semibold">Last Name:</span> {currentStory.lastName}</div>
                  <div><span className="font-semibold">Email:</span> {currentStory.email}</div>
                  <div><span className="font-semibold">Phone:</span> {currentStory.phone}</div>
                  <div><span className="font-semibold">Story Type:</span> {currentStory.storyType}</div>
                  <div><span className="font-semibold">Title:</span> {currentStory.title}</div>
                  <div><span className="font-semibold">Author:</span> {currentStory.author}</div>
                  <div><span className="font-semibold">Date:</span> {new Date(currentStory.date).toLocaleDateString()}</div>
                  <div><span className="font-semibold">File:</span> {currentStory.file ? (<a href={currentStory.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View File</a>) : '—'}</div>
                  <div><span className="font-semibold">Image:</span> {currentStory.image ? (<a href={currentStory.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Image</a>) : '—'}</div>
                  <div>
                    <span className="font-semibold">Kinyarwanda Content:</span>
                    <div
                      className="bg-gray-50 p-2 rounded"
                      dangerouslySetInnerHTML={{ __html: currentStory.kinyarwandaContent || '' }}
                    />
                  </div>
                  <div>
                    <span className="font-semibold">English Content:</span>
                    <div
                      className="bg-gray-50 p-2 rounded"
                      dangerouslySetInnerHTML={{ __html: currentStory.englishContent || '' }}
                    />
                  </div>
                  <div>
                    <span className="font-semibold">French Content:</span>
                    <div
                      className="bg-gray-50 p-2 rounded"
                      dangerouslySetInnerHTML={{ __html: currentStory.frenchContent || '' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page;