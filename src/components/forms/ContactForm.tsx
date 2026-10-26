'use client';

import React, { useState } from 'react';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                setName('');
                setEmail('');
                setMessage('');
                setAccepted(false);
                setStatus('sent');
            } else {
                const { error } = await response.json();
                setErrorMessage(error || 'Failed to send your message. Please try again later.');
                setStatus('error');
            }
        } catch {
            setErrorMessage('Failed to send your message. Please try again later.');
            setStatus('error');
        }
    };

    return (
        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4 border-t border-neutral-100">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-4/12">
                        <div className="pt-4 md:pb-4 pr-20 border-r border-neutral-100">
                            <p className="text-xl font-medium tracking-tight text-slate-900">Full name</p>
                        </div>
                    </div>
                    <div className="w-full md:flex-1">
                        <div className="py-4 md:pl-8">
                            <input className="block w-full text-xl text-neutral-400 font-medium placeholder-neutral-600 outline-none" type="text" name="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={200} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-4 border-t border-neutral-100">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-4/12">
                        <div className="pt-4 md:pb-4 pr-20 border-r border-neutral-100">
                            <p className="text-xl font-medium tracking-tight text-slate-900">Email</p>
                        </div>
                    </div>
                    <div className="w-full md:flex-1">
                        <div className="py-4 md:pl-8">
                            <input className="block w-full text-xl text-neutral-400 font-medium placeholder-neutral-600 outline-none" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={200} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-12 border-t border-neutral-100">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-4/12">
                        <div className="pt-4 md:pb-16 pr-20 border-r border-neutral-100">
                            <p className="text-xl font-medium tracking-tight text-slate-900">Message</p>
                        </div>
                    </div>
                    <div className="w-full md:flex-1">
                        <div className="pt-4 md:pl-8">
                            <textarea className="block w-full text-xl text-neutral-400 font-medium placeholder-neutral-600 outline-none" name="message" rows={4} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required maxLength={5000}></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <label className="relative flex flex-wrap items-center gap-4 mb-12">
                <input className="input-checkbox-contact-1-02 opacity-0 absolute h-8 w-8 rounded-full" type="checkbox" name="terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} required />
                <div className="border border-neutral-600 w-8 h-8 flex justify-center items-center rounded-full">
                    <svg className={`fill-current text-neutral-900 ${accepted ? '' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
                        <line x1="0.353553" y1="5.64645" x2="4.35355" y2="9.64645" stroke="currentColor"></line>
                        <line x1="14.3536" y1="0.353553" x2="4.35355" y2="10.3536" stroke="currentColor"></line>
                    </svg>
                </div><span className="text-neutral-500 text-lg font-medium tracking-tight">I accept the terms and privacy policy.</span>
            </label>
            <button className="inline-flex justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-lg text-white bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200 disabled:opacity-60" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send a message'}</button>
            {status === 'sent' && <p className="mt-4 text-green-600 font-medium">Thank you, your message has been sent.</p>}
            {status === 'error' && <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>}
        </form>
    );
}

export default ContactForm;
