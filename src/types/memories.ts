export interface MemoryImage {
    memoryId: string;
    image: string;
}
export interface Memory {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  victimFullName: string;
  memory: string;
  status: string;
  art: string;
  images: string[];
  MemoriesImage: MemoryImage[];
}

export interface TableProps {
  headers: string[];
  data: Memory[];
  onDelete: (id: string) => void;
  onPreview?: (memory: Memory) => void;
  onApproved?: (id: string) => void;
  onRejected?: (id: string) => void;
}
