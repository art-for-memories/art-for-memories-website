/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Tiptap from "./Tiptap";
import { Stories } from "@/types/stories";
import { uploadFile } from "@/utils/uploadFile";

function WriteStoryForm({ currentStory }: { currentStory: Stories | null }) {
    const [formData, setFormData] = useState({
        title: "",
        caption: "",
        author: "",
        type: "",
        date: "",
        image: null as string | null | File,
        kinyarwandaContent: "",
        englishContent: "",
        frenchContent: "",
        file: null as string | null | File,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file.");
                return;
            }

            if (file.size > 6 * 1024 * 1024) {
                alert("Image size must be under 6MB.");
                return;
            }

            setFormData((prev) => ({ ...prev, image: file }));

            try {
                setIsSubmitting(true);
                const url = await uploadFile(file);
                setIsSubmitting(false);
                setFormData((prev) => ({ ...prev, image: url }));
            } catch {
                alert("Failed to upload image. Please try again.");
            }
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (file.type !== "application/pdf") {
                alert("Only PDF files are allowed.");
                e.target.value = "";
                return;
            }

            if (file.size > 15 * 1024 * 1024) {
                alert("PDF file size must not exceed 15MB.");
                e.target.value = "";
                return;
            }

            setFormData((prev) => ({ ...prev, file }));

            try {
                setIsSubmitting(true);
                const url = await uploadFile(file);
                setIsSubmitting(false);
                setFormData((prev) => ({ ...prev, file: url }));
            } catch {
                alert("Failed to upload PDF. Please try again.");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (field: string, content: string): void => {
        setFormData({ ...formData, [field]: content });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (formData.type === "Written Story" && !formData.image) {
            alert("Please upload an image for a Written Story.");
            setIsSubmitting(false);
            return;
        }

        if (formData.type === "Illustrated" && !formData.file) {
            alert("Please upload a PDF for an Illustrated Story.");
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = new FormData();

            payload.append("title", formData.title);
            payload.append("caption", formData.caption);
            payload.append("author", formData.author);
            payload.append("type", formData.type);
            payload.append("date", formData.date);
            payload.append("kinyarwandaContent", formData.kinyarwandaContent);
            payload.append("englishContent", formData.englishContent);
            payload.append("frenchContent", formData.frenchContent);

            if (formData.type === "Written Story" && typeof formData.image === "string") {
                payload.append("image", formData.image);
            }

            if (formData.type === "Illustrated" && typeof formData.file === "string") {
                payload.append("file", formData.file);
            }

            if (currentStory) {
                payload.append("current_story_id", String(currentStory.id));
            }

            const response = await fetch('/api/stories', {
                method: 'POST',
                body: payload,
            });

            if (response.ok) {
                alert('Story submitted successfully!');
                setFormData({
                    title: "",
                    caption: "",
                    author: "",
                    type: "",
                    date: "",
                    image: null,
                    kinyarwandaContent: "",
                    englishContent: "",
                    frenchContent: "",
                    file: null,
                });
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to submit story. Please try again later.');
            }
        } catch (error) {
            alert('Failed to submit story. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (currentStory) {
            setFormData({
                title: currentStory.title,
                caption: currentStory.caption,
                author: currentStory.author,
                type: currentStory.type,
                date: currentStory.date,
                image: null,
                kinyarwandaContent: currentStory.kinyarwandaContent,
                englishContent: currentStory.englishContent,
                frenchContent: currentStory.frenchContent,
                file: null,
            });
        }
    }, [currentStory]);

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl text-slate-900" encType="multipart/form-data">
            <h2 className="text-slate-700 font-semibold">Write Your Story</h2>

            <div className="mb-5 mt-5">
                <label className="block font-semibold">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div className="mb-5">
                <label className="block font-semibold">Caption</label>
                <input type="text" name="caption" value={formData.caption} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div className="mb-5">
                <label className="block font-semibold">Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div className="mb-5">
                <label className="block font-semibold">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Select Type</option>
                    <option value="Written Story">Written Story</option>
                    <option value="Illustrated">Illustrated</option>
                </select>
            </div>

            <div className="mb-5">
                <label className="block font-semibold">Published Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div className="mb-5">
                <label className="block font-semibold ml-2">Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                    required={formData.type === "Written Story"}
                />
                {typeof formData.image === "string" && formData.image && (
                    <div className="mt-2 text-green-600 text-sm">Image uploaded: <a href={formData.image} target="_blank" rel="noopener noreferrer" className="underline">View Image</a></div>
                )}
            </div>

            {formData.type === "Illustrated" && (
                <div className="mb-5">
                    <label className="block font-semibold ml-2">Upload PDF File</label>
                    <input
                        type="file"
                        name="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        required={formData.type === "Illustrated"}
                    />
                    {typeof formData.file === "string" && formData.file && (
                        <div className="mt-2 text-green-600 text-sm">PDF uploaded: <a href={formData.file} target="_blank" rel="noopener noreferrer" className="underline">View PDF</a></div>
                    )}
                </div>
            )}

            {formData.type === "Written Story" && (
                <>
                    <div className="mb-5">
                        <label className="block font-semibold ml-2">Kinyarwanda Content</label>
                        <Tiptap value={formData.kinyarwandaContent} onContentChange={(content: string) => handleContentChange('kinyarwandaContent', content)} />
                    </div>

                    <div className="mb-5">
                        <label className="block font-semibold ml-2">English Content</label>
                        <Tiptap value={formData.englishContent} onContentChange={(content: string) => handleContentChange('englishContent', content)} />
                    </div>

                    <div className="mb-5">
                        <label className="block font-semibold ml-2">French Content</label>
                        <Tiptap value={formData.frenchContent} onContentChange={(content: string) => handleContentChange('frenchContent', content)} />
                    </div>
                </>
            )}

            <div className='flex items-center justify-between mt-5'>
                <button type='submit' disabled={isSubmitting} className="w-auto bg-black text-white flex items-center justify-between py-3 px-4 rounded-[8px] hover:opacity-80">
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            Uploading...
                        </span>
                    ) : (
                        <>
                            <span>{currentStory ? 'Save Changes' : 'Submit'}</span>
                            <span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M14.43 5.93L20.5 12l-6.07 6.07"></path><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M3.5 12h16.83" opacity=".4"></path></svg></span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default WriteStoryForm;
