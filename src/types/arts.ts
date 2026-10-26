export interface Art {
    id: string;
    name: string;
    age: string | number;
    oldPhoto: string;
    preservedPhoto: string;
    preview?: boolean;
}

export interface ArtTableProps {
    data: Art[];
    headers: string[];
    onDelete: (id: string) => void;
    onPreview: (data: Art) => void;
}