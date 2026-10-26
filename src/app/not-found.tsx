import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Explore other sections of Art for Memories Rwanda to learn more about our mission and stories.",
  keywords: ["404", "Page Not Found", "Art for Memories Rwanda", "Error Page"],
};

export default function NotFound() {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn&apos;t find this page.</p>
          <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
          <Link rel="noopener noreferrer" href={"/"} className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Back to Home</Link>
        </div>
      </div>
    </section>
  )
}