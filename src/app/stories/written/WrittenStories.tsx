'use client'

import StoriesList from '@/components/lists/StoriesList';
import { Stories } from '@/types/stories';
import React, { useEffect, useState } from 'react'

function WrittenStories() {
    const [writtenStories, setWrittenStories] = useState([]);

    const getAllStories = async () => {
        try {
            const response = await fetch('/api/stories');

            if (response.ok) {
                const allStories = await response.json();
                setWrittenStories(allStories.filter((story: Stories) => story.type === 'Written Story'));
            } else {
                console.error('Failed to fetch stories');
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    }

    useEffect(() => {
        getAllStories();
    }, [])

    return (
        <StoriesList title="Written Stories" data={writtenStories} />
    )
}

export default WrittenStories