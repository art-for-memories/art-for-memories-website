import { getServerAuthSession } from '@/config/auth'
import { redirect } from 'next/navigation';
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

// The root layout already provides <html>, <body>, the top loader and the Suspense boundary
export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const session = await getServerAuthSession()

    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN") {
        return <p className="p-10 text-white">Access Denied</p>;
    }

    return (
        <SessionProviderWrapper session={session}>
            {children}
        </SessionProviderWrapper>
    );
}
