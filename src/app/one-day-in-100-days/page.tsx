import Layout from "@/components/Layout";
import PageHeader from "@/components/headers/page-header";

import type { Metadata } from "next";
import VideoList from "./VideoList";

export const metadata: Metadata = {
    title: "One Day in 100 Days",
    description: "Explore the stories and memories captured during the 100 days of remembrance through Art for Memories Rwanda.",
    keywords: ["100 Days of Remembrance", "Art for Memories Rwanda", "Genocide Stories", "Preserve Memories", "Rwanda", "Art", "Genocide", "Survivors"],
};

export default function Days() {
    return (<>
        <Layout>
            <PageHeader
                title='One Day In 100 Days'
                description='Which Day Stands Out in Your Memory?'
                sup_title=''
            />

            <section className="px-6 py-16 md:px-20 lg:px-32 bg-white">
                <VideoList />
            </section>
        </Layout>
    </>);
}