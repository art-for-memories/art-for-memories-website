import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/Layout";
import type { Stories } from "@/types/stories";
import type { Metadata } from "next";
import WrittenStories from "./WrittenStories";

export const metadata: Metadata = {
    title: "Written Stories",
    description: "Discover written stories that preserve the memories and legacy of Genocide Survivors through Art for Memories Rwanda.",
    keywords: ["Written Stories", "Art for Memories Rwanda", "Genocide Survivors", "Preserve Memories", "Rwanda", "Art", "Genocide", "Survivors"],
};

export default function Stories() {
    return (<>
        <Layout>
            <PageHeader
                title='Written Stories'
                description='Memories They Carry, Stories They Share'
                sup_title='Their Stories'
            />

            <div className="bg-white">
                <WrittenStories />
            </div>
        </Layout>
    </>);
}