import MemoryForm from "@/components/forms/MemoryForm";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Submit Your Memories",
    description: "Submit your memories to Art for Memories Rwanda and contribute to preserving the legacy of Genocide Survivors through art.",
    keywords: ["Memory Submission", "Art for Memories Rwanda", "Genocide Survivors", "Preserve Memories", "Submit Memories", "rwanda", "art", "genocide", "survivors"],
};

export default function Page() {
    return (
        <Layout>

            <div className="overflow-x-hidden bg-white">
                <Navbar />

                <div className="my-10 border border-gray-200 py-20">
                    <MemoryForm />
                </div>
            </div>
        </Layout>
    );
}