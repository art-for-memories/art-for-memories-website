import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, Session, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";

// Extend the Session and User types to include the role property
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

interface CustomUser extends NextAuthUser {
  role?: string | null;
}

// Configuration options for authentication
export const authOptions = {
  // Callback to modify the session object
  callbacks: {
    // With the database session strategy the adapter already loads the user row, so no extra query is needed
    session: async ({ session, user }: { session: Session; user: CustomUser }) => {
      if (session.user) {
        session.user.role = user.role ?? null;
      }

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    redirect: async ({ baseUrl }: { baseUrl: string }) => {
      // Redirect all users to /admin after login
      return "/admin";
    },
  },

  // Prisma adapter to connect NextAuth.js with the database.
  // The adapter only uses model delegates, which the Accelerate-extended client keeps intact.
  adapter: PrismaAdapter(prisma as unknown as PrismaClient),

  // Authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};

// Utility function to retrieve the server session with authentication options
export const getServerAuthSession = () => getServerSession(authOptions);

const ADMIN_ROLES = ["ADMIN", "SUPERADMIN"];

/**
 * Guard for API route handlers. Returns a 401/403 response when the caller is not an admin,
 * or null when the request may proceed.
 */
export const requireAdmin = async (): Promise<NextResponse | null> => {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!ADMIN_ROLES.includes(session.user.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
};

/** True when the current request comes from a signed-in admin. */
export const isAdmin = async (): Promise<boolean> => (await requireAdmin()) === null;
