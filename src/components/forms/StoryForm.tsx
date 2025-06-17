'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Tiptap from './Tiptap';
import { uploadFile } from '@/utils/uploadFile';

function StoryForm({ onSuccess }: { onSuccess: () => void }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [storyType, setStoryType] = useState('Written Story');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [kinyarwandaContent, setKinyarwandaContent] = useState('');
    const [englishContent, setEnglishContent] = useState('');
    const [frenchContent, setFrenchContent] = useState('');
    const [language, setLanguage] = useState('English');

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Only allow one file for illustrated stories
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) return;

        const file = files[0];

        // Allow file up to 15MB
        const maxSize = 15 * 1024 * 1024; // 15MB in bytes
        if (file.size > maxSize) {
            setErrorMessage('File size must be 15MB or less.');
            setSelectedFile(null);
            return;
        }

        if (
            file.type === 'application/pdf' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            setSelectedFile(file);
            setErrorMessage(null);
        } else {
            setErrorMessage('Only PDF or DOCX files are allowed.');
            setSelectedFile(null);
        }
    };

    // Only allow one image
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) return;

        const file = files[0];

        if (!file.type.startsWith('image/')) {
            setErrorMessage('Only image files are allowed.');
            setSelectedImage(null);
            return;
        }

        // Allow image up to 6MB
        const maxSize = 6 * 1024 * 1024; // 6MB in bytes
        if (file.size > maxSize) {
            setErrorMessage('Image size must be 6MB or less.');
            setSelectedImage(null);
            return;
        }

        setSelectedImage(file);
        setErrorMessage(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!firstName || !lastName || !email || !phone || !selectedFile) {
            setErrorMessage('All fields are required, and at least one file must be uploaded.');
            return;
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            setSuccessMessage(null);

            let fileUrl = '';
            let imageUrl = '';

            if (selectedFile) {
                fileUrl = await uploadFile(selectedFile);
            }
            if (selectedImage) {
                imageUrl = await uploadFile(selectedImage);
            }

            const payload = new FormData();

            payload.append('firstName', firstName);
            payload.append('lastName', lastName);
            payload.append('email', email);
            payload.append('phone', phone);
            payload.append('storyType', storyType);
            payload.append('title', title);
            payload.append('author', author);
            payload.append('date', date);

            if (fileUrl) payload.append('file', fileUrl);
            if (imageUrl) payload.append('image', imageUrl);

            payload.append('kinyarwandaContent', kinyarwandaContent);
            payload.append('englishContent', englishContent);
            payload.append('frenchContent', frenchContent);

            const response = await fetch('/api/custom-stories', {
                method: 'POST',
                body: payload,
            });

            if (response.ok) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setSelectedFile(null);
                setSelectedImage(null);
                setSuccessMessage('Story submitted successfully!');
                setErrorMessage(null);
                onSuccess();
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to submit story. Please try again later.');
                setSuccessMessage(null);
            }
        } catch {
            setErrorMessage('Failed to submit story. Please try again later.');
            setSuccessMessage(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md md:max-w-lg mx-auto bg-white rounded-md">
            <div className="flex items-center space-x-2 justify-between mb-4">
                <div className="text-2xl font-bold flex items-center">
                    <span className="bg-white text-white px-1 py-1 rounded">
                        <div><Image src={'/images/ART.PNG'} alt={"logo"} width={100} height={40} /></div>
                    </span>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-black">
                {"Submit Your Story"}
            </h2>

            <p className="text-gray-500 mb-5 mt-3">
                Fill your Story details to continue for your Stories Submission
            </p>

            <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-black font-bold">First Name</label>
                        <input
                            type="text"
                            placeholder="Enter Firstname"
                            className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-black font-bold">Last Name</label>
                        <input
                            type="text"
                            placeholder="Enter Lastname"
                            className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm text-black font-bold">Email Address</label>
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="text-sm text-black font-bold">Phone Number</label>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                        <span className="px-3 py-2 bg-gray-100 border-r border-gray-300 text-black">+250</span>
                        <input
                            type="text"
                            placeholder="785119320"
                            className="w-full p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                {/* Story Type */}
                <div>
                    <label className="text-sm text-black font-bold">Story Type</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        value={storyType}
                        onChange={(e) => setStoryType(e.target.value)}
                    >
                        <option value="">Select Type</option>
                        <option value="Written Story">Write Story</option>
                        <option value="Illustrated">Upload Story File</option>
                    </select>
                </div>

                {storyType === 'Illustrated' && (
                    <div>
                        <label className="text-sm text-black font-bold">Story Document (PDF or DOCX)</label>
                        <div
                            className="border border-gray-300 rounded-md p-2 flex items-center space-x-2 cursor-pointer"
                            onClick={() => document.getElementById('upload-files')?.click()}
                        >
                            <span className="text-gray-400">📎</span>
                            <span className="text-gray-400">Attach PDF or DOCX</span>
                            <input
                                type="file"
                                className="hidden"
                                id="upload-files"
                                onChange={handleFileChange}
                                accept=".pdf,.docx"
                            />
                        </div>
                    </div>
                )}

                {/* Title */}
                <div>
                    <label className="text-sm text-black font-bold">Story Title</label>
                    <input
                        type="text"
                        placeholder="Catchy Title"
                        className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="text-sm text-black font-bold">Author / Writter</label>
                    <input
                        type="text"
                        placeholder="Author Name"
                        className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="text-sm text-black font-bold">Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="text-sm text-black font-bold">Images</label>
                    <div
                        className="border border-gray-300 rounded-md p-2 flex items-center space-x-2 cursor-pointer"
                        onClick={() => document.getElementById('upload-images')?.click()}
                    >
                        <span className="text-gray-400">📎</span>
                        <span className="text-gray-400">Attach images</span>
                        <input
                            type="file"
                            className="hidden"
                            id="upload-images"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                {/* Image Previews */}
                {selectedImage && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="relative">
                            <Image
                                width={100}
                                height={100}
                                src={URL.createObjectURL(selectedImage)}
                                alt={"Selected Image"}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <p className="text-sm text-black mt-2">{"Selected Image"}</p>
                        </div>
                    </div>
                )}

                {/* Conditional Fields */}
                {storyType === 'Written Story' && (
                    <div className="text-slate-900">
                        {/* Language Selector */}
                        <div>
                            <label className="text-sm text-black font-bold">Language</label>
                            <select
                                className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="English">English</option>
                                <option value="Kinyarwanda">Kinyarwanda</option>
                                <option value="French">French</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            {/* Show only the textarea for the selected language */}
                            {language === 'English' && (
                                <div>
                                    <label className="block font-semibold mb-1">English Content</label>
                                    <Tiptap value={englishContent} onContentChange={setEnglishContent} />
                                </div>
                            )}
                            {language === 'Kinyarwanda' && (
                                <div>
                                    <label className="block font-semibold mb-1">Kinyarwanda Content</label>
                                    <Tiptap value={kinyarwandaContent} onContentChange={setKinyarwandaContent} />
                                </div>
                            )}
                            {language === 'French' && (
                                <div>
                                    <label className="block font-semibold mb-1">French Content</label>
                                    <Tiptap value={frenchContent} onContentChange={setFrenchContent} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-between mt-5">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-auto bg-black text-white flex items-center justify-between py-3 px-4 rounded-md hover:opacity-80 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span>{loading ? "Submitting..." : "Submit"}</span>
                    </button>
                </div>
            </form>

            {/* Success/Error Messages */}
            <div className="mt-5 font-semibold">
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default StoryForm;