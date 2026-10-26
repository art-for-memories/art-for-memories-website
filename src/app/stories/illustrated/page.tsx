import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/Layout";
import type { Stories } from "@/types/stories";
import type { Metadata } from "next";
import IllustratedStories from "./IllustratedStories";

export const metadata: Metadata = {
    title: "Illustrated Stories",
    description: "Explore illustrated stories that bring memories to life, preserving the legacy of Genocide Survivors through art.",
    keywords: ["Illustrated Stories", "Art for Memories Rwanda", "Genocide Survivors", "Preserve Memories", "Rwanda", "Art", "Genocide", "Survivors"],
};

export default function Stories() {
    return (<>
        <Layout>
            <PageHeader
                title='Illustrated Stories'
                description='Memories They Carry, Stories They Share'
                sup_title='Their Stories'
            />

            <div className="bg-white">
                <IllustratedStories />
            </div>
        </Layout>
    </>);
}