/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Memory, MemoryImage } from '@/types/memories';

const formSchema = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    victimFullName: z.string().nonempty("Victim full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    images: z.any().refine((files) => files instanceof FileList && files.length > 0, {
        message: "Please upload at least one image",
    }),
    consent: z.boolean().refine((value) => value === true, {
        message: "You must agree to share this information",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function MemoryForm({ currentMemory }: { currentMemory?: Memory | undefined }) {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentImages, setCurrentImages] = useState<MemoryImage[] | null>([]);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            const formData = new FormData();
            formData.append("firstname", data.firstName);
            formData.append("lastname", data.lastName);
            formData.append("victim_full_name", data.victimFullName);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("memories", "Memories");

            for (const file of selectedImages) {
                formData.append("images", file);
            }

            setLoading(true);

            if (currentMemory) {
                formData.append("current_memory_id", currentMemory.id);
            }

            const response = await fetch(`/api/memories`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                reset();
                setSelectedImages([]);
                setSuccessMessage("Memory submitted successfully!");
                setErrorMessage(null);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to submit memory. Please try again later.");
                setSuccessMessage(null);
            }
        } catch (error) {
            setErrorMessage("Failed to submit memory. Please try again later.");
            setSuccessMessage(null);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files) return;

        const newFiles: File[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.type.startsWith('image/') && file.size <= 6 * 1024 * 1024) {
                newFiles.push(file);
            } else {
                setErrorMessage("Only image files under 6MB are allowed.");
            }
        }

        setSelectedImages(newFiles);
        setValue("images", files);
    };

    useEffect(() => {
        if (currentMemory) {
            const { firstName, lastName, email, phone, MemoriesImage } = currentMemory;
            setValue("firstName", firstName);
            setValue("lastName", lastName);
            setValue("email", email);
            setValue("phone", phone);
            setCurrentImages(MemoriesImage);
        }
    }, [currentMemory, setValue]);

    return (
        <div className="max-w-md md:max-w-lg mx-auto bg-white z-[999]">
            <div className="flex items-center space-x-2 justify-between mb-4">
                <div className="text-2xl font-bold flex items-center">
                    <span className="bg-white text-white px-1 py-1 rounded">
                        <div><Image src={'/images/ART.PNG'} alt={"logo"} width={100} height={40} /></div>
                    </span>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-black">
                {currentMemory ? `Viewing ${currentMemory.lastName}` : "Submit Your Memory"}
            </h2>

            <p className="text-gray-500 mb-5 mt-3">
                Fill your personal details to continue for your Memory Submission
            </p>

            {/* Form Fields */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-black font-bold">First Name</label>
                        <input
                            type="text"
                            placeholder="name here"
                            className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            {...register("firstName")}
                            aria-label="First Name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label className="text-sm text-black font-bold">Last Name</label>
                        <input
                            type="text"
                            placeholder="name here"
                            className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            {...register("lastName")}
                            aria-label="Last Name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm text-black font-bold">Email</label>
                    <input
                        type="email"
                        placeholder="Enter email here"
                        className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        {...register("email")}
                        aria-label="Email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="text-sm text-black font-bold">Phone Number</label>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                        <span className="px-3 py-2 bg-gray-100 border-r border-gray-300 text-black">+250</span>
                        <input
                            type="text"
                            placeholder="785119320"
                            className="w-full p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                            {...register("phone")}
                            aria-label="Phone Number"
                        />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                {/* File Upload */}
                <div>
                    <label className="text-sm text-black font-bold">Attach Images</label>
                    <div
                        className="border border-gray-300 rounded-md p-2 flex items-center space-x-2 cursor-pointer"
                        onClick={() => document.getElementById('upload-images')?.click()}
                    >
                        <span className="text-gray-400">📎</span>
                        <span className="text-gray-400">image files</span>
                        <input
                            type="file"
                            className="hidden"
                            multiple
                            id="upload-images"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    {errors.images && <p className="text-red-500 text-sm">{String(errors.images.message)}</p>}
                </div>

                {/* Image Previews */}
                {selectedImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt={`Selected ${index}`}
                                    className="w-full h-32 object-cover rounded-md"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {currentImages && currentImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {currentImages.map((image, index) => (
                            <div key={index} className="relative">
                                <Image
                                    src={image.image}
                                    alt={`Selected ${index}`}
                                    className="w-full h-32 object-cover rounded-md border border-gray-200"
                                    width={500}
                                    height={500}
                                />
                                <a href={image.image} download className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-md hover:opacity-80">
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* Victim Full Name */}
                <div>
                    <label className="text-sm text-black font-bold">Victim Full Name</label>
                    <input
                        type="text"
                        placeholder="Victim's full name"
                        className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        {...register("victimFullName")}
                        aria-label="Victim Full Name"
                    />
                    {errors.victimFullName && <p className="text-red-500 text-sm">{errors.victimFullName.message}</p>}
                </div>

                {/* Consent Checkbox */}
                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                            {...register("consent", { required: "You must agree to share this information" })}
                        />
                        <span className="text-sm text-black ml-3">
                            I allow sharing this information for memory purposes, and I understand that my data will be shared Publicly.
                        </span>
                    </label>
                    {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between mt-5">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-auto flex items-center justify-between py-3 px-4 rounded-md hover:opacity-80 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
                            }`}
                    >
                        <span>{loading ? "Submitting..." : currentMemory ? "Save Changes" : "Submit"}</span>
                    </button>
                </div>
            </form>

            <div className='mt-5 font-semibold'>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </div>
    );
}