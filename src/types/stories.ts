export interface Stories {
    id: string;
    title: string;
    caption: string;
    author: string;
    type: string;
    date: string;
    image: string | null;
    kinyarwandaContent: string;
    englishContent: string;
    frenchContent: string;
    file?: string | null;
}

export interface PublicStory {
    id: string;
    title: string;
    author: string;
    date: string;
    image: string;
    type: string;
    role: string;
}

export interface TableProps {
    headers: string[];
    data: Stories[];
    onDelete: (id: string) => void;
    onPreview?: (id: string) => void;
}