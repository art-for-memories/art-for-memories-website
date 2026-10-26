'use client';

import Navbar from '@/components/dashboard/navbar'
import Sidebar from '@/components/dashboard/sidebar'
import FetchSpinner from '@/components/spinners/fetch-spinner';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const getMessages = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/contact');

      if (response.ok) {
        setMessages(await response.json());
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    const response = await fetch(`/api/contact/${id}`, { method: 'DELETE' });

    if (response.ok) {
      setMessages(messages.filter((message) => message.id !== id));
    } else {
      console.error('Failed to delete message');
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />

        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-xl font-semibold text-black">Contact Messages</h1>

          <div className="mt-4 bg-white rounded-xl p-4">
            {loading && <div className="my-10"><FetchSpinner /></div>}

            {!loading && messages.length === 0 && (
              <div className='flex flex-col items-center justify-center p-4'>
                <Image src={'/svgs/empty.svg'} alt='' width={400} height={400} />
                <span className='text-slate-700 font-semibold text-base'>No messages yet</span>
              </div>
            )}

            <ul className="divide-y divide-gray-100">
              {messages.map((message) => (
                <li key={message.id} className="py-4 flex justify-between gap-4 text-black">
                  <div>
                    <p className="font-semibold">
                      {message.name} · <a href={`mailto:${message.email}`} className="text-blue-600 underline">{message.email}</a>
                    </p>
                    <p className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{message.message}</p>
                  </div>
                  <button onClick={() => handleDelete(message.id)} className="self-start text-gray-700 hover:text-red-700 bg-red-200 rounded-xl px-3 py-2 text-xs font-semibold">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
