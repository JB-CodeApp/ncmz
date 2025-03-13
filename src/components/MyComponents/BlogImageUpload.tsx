import { useState } from "react";
import Image from "next/image";
import TextCopyButton from "./TextCopy";

export default function BlogImageUpload() {
    const [blogImages, setBlogImages] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setBlogImages(files);
        }
    };

    // Handle image upload
    const handleImageUpload = async () => {
        if (!blogImages || blogImages.length === 0) {
            setErrorMessage("Please select at least one image to upload.");
            return;
        }

        setUploading(true);
        const formData = new FormData();

        // Append selected images to formData
        Array.from(blogImages).forEach((file) => {
            formData.append("images", file);
        });

        try {
            // Simulate uploading the images by sending the request
            const response = await fetch("/api/upload-images", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage("Images uploaded successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
                setErrorMessage("");
                // setBlogImages(null); // Clear the selected images
            } else {
                setErrorMessage("Error uploading images. Please try again.");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("An error occurred while uploading. Please try again.");
            setSuccessMessage("");
        }

        setUploading(false);
    };

    return (
        <div className="flex space-x-6 md:col-span-2">
            <label className="block flex-1">
                <span>Blog Images:</span>
                <div className="mt-1 flex justify-center px-6 pt-2 pb-2 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                    <div className="space-y-1 text-center text-sm">
                        <span>Upload a file</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleImageChange}
                        />
                        <p className="ps-1">or drag and drop</p>
                    </div>
                </div>
            </label>

            <label className="block flex-1">
                {/* Image Preview Section */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {blogImages && blogImages.length > 0 &&
                        Array.from(blogImages).map((file, index) => {
                            const imageUrl = URL.createObjectURL(file);
                            const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
                            const year = new Date().getFullYear().toString();
                            return (
                                <div key={index} className="relative">
                                    <TextCopyButton path={`/blog/${year}/${month}/data/${file.name}`} />
                                    <Image
                                        src={imageUrl}
                                        alt={`Preview ${file.name}`}
                                        width={0}
                                        height={300}
                                        layout="intrinsic"
                                        className="w-auto h-[100px] object-cover rounded-md "
                                    />
                                </div>
                            );
                        })}
                </div>
            </label>

            {/* Upload Button */}
            <div className="pt-3">
                <button
                    type="button"
                    onClick={handleImageUpload}
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    {uploading ? "Uploading..." : "Upload Images"}
                </button>
            </div>

            {/* Success and Error messages */}
            {successMessage && (
                <div className="mt-4 text-green-600">{successMessage}</div>
            )}
            {errorMessage && (
                <div className="mt-4 text-red-600">{errorMessage}</div>
            )}
        </div>
    );
}
