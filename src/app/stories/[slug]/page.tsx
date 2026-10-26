import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import PageHeader from '@/components/headers/page-header';
import prisma from '../../../../lib/prisma';
import { sanitizeStoryHtml } from '@/utils/sanitize';
import StoryContent from './StoryContent';
import "@/styles/story-contents.css";

type Props = { params: Promise<{ slug: string }> };

// Shared by generateMetadata and the page so the story is only queried once per request
const getStory = cache(async (id: string) => {
  try {
    return await prisma.story.findUnique({ where: { id } });
  } catch {
    // Malformed ids are rejected by MongoDB; treat them as not found
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) return { title: 'Story not found' };

  return {
    title: story.title,
    description: story.caption || `A story by ${story.author} on Art for Memories`,
  };
}

export default async function Story({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    notFound();
  }

  return (
    <Layout>
      <PageHeader
        title={story.title}
        description={story.caption ?? ''}
        sup_title={story.author ? `By ${story.author}` : 'Their Story'}
      />

      <StoryContent
        contents={{
          english: sanitizeStoryHtml(story.englishContent),
          kinyarwanda: sanitizeStoryHtml(story.kinyarwandaContent),
          french: sanitizeStoryHtml(story.frenchContent),
        }}
      />
    </Layout>
  );
}
