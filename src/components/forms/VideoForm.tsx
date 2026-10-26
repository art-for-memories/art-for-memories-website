/* eslint-disable react-hooks/exhaustive-deps */
import { Video } from '@/types/video';
import React, { useEffect, useState } from 'react'

function VideoForm({ onCallback, setFormOpen, currentVideo }: { onCallback: () => void, setFormOpen: React.Dispatch<React.SetStateAction<boolean>>, currentVideo?: Video }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const formData: { files: string[]; title: string; caption: string; current_video_id?: string } = {
                files: [videoUrl],
                title,
                caption,
            };

            if (currentVideo) {
                formData['current_video_id'] = currentVideo.id;
            }

            setIsSubmitting(true);

            const response = await fetch('/api/videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormOpen(false);
                onCallback();
            } else {
                console.error('Failed to submit video');
            }
        } catch (error) {
            console.error('Error submitting video:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (currentVideo) {
            setTitle(currentVideo.title || '');
            setCaption(currentVideo.caption || '');
            setVideoPreview(currentVideo.url || null);
            setVideoUrl(currentVideo.url || '');
        }
    }, []);

    return (<>
        <h3 className="text-slate-700 font-semibold">Upload New Video</h3>

        <form onSubmit={handleSubmit} className='mt-5'>
            <div className="mb-5">
                <label className="block font-semibold text-slate-800">Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded text-slate-800"
                    required
                />
            </div>

            <div className="mb-5">
                <label className="block font-semibold text-slate-800">Caption</label>
                <input
                    type="text"
                    name="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full p-2 border rounded text-slate-800"
                    required
                />
            </div>

            <div className="my-5">
                <label className="text-sm text-black font-medium">Video Url</label>
                <input
                    type="text"
                    name="video_url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full p-2 border rounded text-slate-800"
                    required
                />
            </div>

            {/* Video URL Preview */}
            {videoUrl && (
                <div className="mt-4">
                    <p className="text-sm text-black">Video Preview</p>
                    <iframe
                        src={videoUrl}
                        width="100%"
                        height="315"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="border rounded"
                    ></iframe>
                </div>
            )}

            {/* current video preview */}
            {videoPreview && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="relative">
                        <p className="text-sm text-black">Current Video</p>
                        <iframe
                            src={videoPreview}
                            width="100%"
                            height="315"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="border rounded"
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className='flex items-center justify-between mt-5'>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className="w-auto bg-black text-white flex items-center justify-between py-3 px-4 rounded-[8px] hover:opacity-80"
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            Submitting...
                        </span>
                    ) : (
                        <>
                            <span>{currentVideo ? "Save Changes" : "Submit"}</span>
                            <span className='ml-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M14.43 5.93L20.5 12l-6.07 6.07"></path>
                                    <path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M3.5 12h16.83" opacity=".4"></path>
                                </svg>
                            </span>
                        </>
                    )}
                </button>
            </div>
        </form>
    </>)
}

export default VideoForm