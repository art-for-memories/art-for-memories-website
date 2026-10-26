import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";

function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-16 bg-white border-r border-gray-100 p-4 flex flex-col space-y-6 items-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/admin') ? 'bg-gray-900' : 'bg-gray-300'}`}>
                <Link href="/admin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 21H7c-4 0-5-1-5-5V8c0-4 1-5 5-5h10c4 0 5 1 5 5v8c0 4-1 5-5 5Z" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 8h5M15 12h4M17 16h2M8.501 11.292a1.81 1.81 0 1 0 0-3.62 1.81 1.81 0 0 0 0 3.62ZM12 16.332a3.02 3.02 0 0 0-2.74-2.72 7.72 7.72 0 0 0-1.52 0A3.03 3.03 0 0 0 5 16.332"></path></g></svg>
                </Link>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/admin/custom-stories') ? 'bg-gray-900' : 'bg-gray-300'}`}>
                <Link href="/admin/custom-stories">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 9v5c0 5-2 7-7 7H8c-5 0-7-2-7-7V8c0-5 2-7 7-7h5" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 9h-4c-3 0-4-1-4-4V1l8 8Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" clipRule="evenodd" d="M7.32 11h2.65c.27 0 .61.18.75.4l1.13 1.7c.23.34.18.85-.11 1.14L9.28 16.7c-.35.35-.93.35-1.28 0l-2.46-2.46a.935.935 0 0 1-.11-1.14l1.13-1.7c.16-.22.5-.4.76-.4Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </Link>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/admin/videos') ? 'bg-gray-900' : 'bg-gray-300'}`}>
                <Link href="/admin/videos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M9.102 12v-1.48c0-1.91 1.35-2.68 3-1.73l1.28.74 1.28.74c1.65.95 1.65 2.51 0 3.46l-1.28.74-1.28.74c-1.65.95-3 .17-3-1.73V12Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </Link>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/admin/stories') ? 'bg-gray-900' : 'bg-gray-300'}`}>
                <Link href="/admin/stories">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 9v6c0 .22 0 .44-.02.65A4.46 4.46 0 0 0 18.5 14c-1.06 0-2.04.37-2.81.99A4.448 4.448 0 0 0 14 18.5a4.5 4.5 0 0 0 1.66 3.48c-.21.02-.43.02-.66.02H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h6c5 0 7 2 7 7Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.52 7.11h18.96M8.52 2.11v4.86M15.48 2.11v4.41"></path></g><path d="M23 18.5a4.5 4.5 0 0 1-1.54 3.38c-.79.7-1.82 1.12-2.96 1.12-1.07 0-2.06-.38-2.83-1.02h-.01A4.5 4.5 0 0 1 14 18.5c0-1.42.65-2.69 1.69-3.51A4.47 4.47 0 0 1 18.5 14c1.41 0 2.66.64 3.48 1.65.64.77 1.02 1.77 1.02 2.85Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="m16.75 18.5 1.11 1.11 2.4-2.22" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </Link>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/admin/preserved-memories') ? 'bg-gray-900' : 'bg-gray-300'}`}>
                <Link href="/admin/preserved-memories">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m21.68 16.96-3.13-7.31c-1.06-2.48-3.01-2.58-4.32-.22l-1.89 3.41c-.96 1.73-2.75 1.88-3.99.33l-.22-.28c-1.29-1.62-3.11-1.42-4.04.43l-1.72 3.45C1.16 19.17 2.91 22 5.59 22h12.76c2.6 0 4.35-2.65 3.33-5.04Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M6.969 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </Link>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/admin/gallery') ? 'bg-gray-900' : 'bg-gray-300'}`}>
                <Link href="/admin/gallery">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 9.5h10M12 14.5h10"></path></g></svg>
                </Link>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/admin/messages') ? 'bg-gray-900' : 'bg-gray-300'}`}>
                <Link href="/admin/messages" title="Contact messages">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="m17 9-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar