'use client';

import Header from "@/components/dashboard/header";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import Table from "@/components/dashboard/table";
import TableControls from "@/components/dashboard/table-controls";
import MemoryForm from "@/components/forms/MemoryForm";
import FormModal from "@/components/models/form-model";
import FetchSpinner from "@/components/spinners/fetch-spinner";
import { Memory } from "@/types/memories";
import { useEffect, useState } from "react";

export default function Memories() {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone Number', 'Victim', 'Memory', 'Status'];
    const [memories, setMemories] = useState<Memory[]>([]);
    const [isFormOpen, setFormOpen] = useState(false);
    const [currentMemory, setCurrentMemory] = useState<Memory | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const getMemories = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/memories');
            if (res.ok) {
                setMemories(await res.json());
            } else {
                console.error('Failed to fetch memories');
            }
        } catch (error) {
            console.error('Error fetching memories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm('Are you sure you want to delete this memory?');

        if (confirmDelete) {
            setLoading(true);

            const response = await fetch(`/api/memories`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            setLoading(false);

            if (response.ok) {
                setMemories(memories.filter((memory) => memory.id !== id));
            } else {
                console.error('Failed to delete memory');
            }
        }
    };

    const previewMemory = (memory: Memory) => {
        setCurrentMemory(memory);
        setFormOpen(true);
    }

    const searchMemory = async (searchTerm: string) => {
        if (searchTerm.length > 3) {
            setLoading(true);

            const data = memories.filter((memory) => {
                return memory.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || memory.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || memory.email.toLowerCase().includes(searchTerm.toLowerCase()) || memory.phone.toLowerCase().includes(searchTerm.toLowerCase()) || (memory.memory || '').toLowerCase().includes(searchTerm.toLowerCase()) || (memory.victimFullName || '').toLowerCase().includes(searchTerm.toLowerCase());
            });

            setLoading(false);
            setMemories(data);
        } else {
            getMemories();
        }
    }

    const updateMemoryStatus = async (id: string, status: 'approved' | 'rejected') => {
        setLoading(true);

        const response = await fetch(`/api/memories`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status }),
        });

        if (!response.ok) {
            console.error(`Failed to mark memory as ${status}`);
        }

        setLoading(false);
        getMemories();
    }

    useEffect(() => {
        getMemories();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="min-h-screen flex bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <Header />

                    {/* Controls */}
                    <TableControls onSearch={searchMemory} />

                    {/* Table */}
                    <div className="mt-4">
                        {loading && <div className="my-10"><FetchSpinner /></div>}
                        <Table headers={headers} data={memories} onDelete={handleDelete} onPreview={previewMemory} onApproved={(id) => updateMemoryStatus(id, 'approved')} onRejected={(id) => updateMemoryStatus(id, 'rejected')} />
                    </div>
                </div>

                <FormModal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
                    <MemoryForm key={currentMemory?.id ?? 'new'} currentMemory={currentMemory} />
                </FormModal>
            </div>
        </div>
    );
}
