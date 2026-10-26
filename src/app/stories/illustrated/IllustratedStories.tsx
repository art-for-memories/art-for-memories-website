'use client'

import StoriesList from '@/components/lists/StoriesList'
import { Stories } from '@/types/stories';
import React, { useEffect, useState } from 'react'

function IllustratedStories() {

    const [illustratedStories, setIllustratedStories] = useState([]);

    const getAllStories = async () => {
        try {
            const response = await fetch('/api/stories');

            if (response.ok) {
                const allStories = await response.json();
                setIllustratedStories(allStories.filter((story: Stories) => story.type === 'Illustrated'));
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
        <StoriesList title="Illustrated Stories" data={illustratedStories} />
    )
}

export default IllustratedStories