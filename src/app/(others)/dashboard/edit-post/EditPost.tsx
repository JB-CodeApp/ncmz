'use client';
import React, { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "@/components/Select/Select";
import Textarea from "@/components/Textarea/Textarea";
import Label from "@/components/Label/Label";
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import BlogImageUpload from "@/components/MyComponents/BlogImageUpload";
import { useSearchParams, useRouter } from 'next/navigation';
import getMdxContentBySlug from "./Fetchmdx";
import { allblogs, AUTHORS, CATEGORIES, TAGS } from "@/data/blogs";
import { PostData } from "@/data/datatypes";

const EditPost = () => {
    const category = CATEGORIES;
    const tags = TAGS;
    const searchParams = useSearchParams() || {};
    const slug = searchParams.get('slug');
    const router = useRouter();
    const blogdata = allblogs.find((post) => post.slug === slug);

    const [post, setPost] = useState<PostData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedslug, setUpdatedSlug] = useState("");
    const [title, setTitle] = useState(blogdata?.title || "");
    const [SeoTitle, setSeoTitle] = useState(blogdata?.seo.seoTitle || "");
    const [seoKeyword, setseoKeyword] = useState(blogdata?.seo.seoKeyword || "");
    const [excerpt, setExcerpt] = useState(blogdata?.desc || "");
    const [categoryslug, setCategorySlug] = useState(blogdata?.categoriesId || "");
    const [tagSlugs, setTagSlugs] = useState<string[]>(blogdata?.tagsId || []);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [JsonLD, setJsonLD] = useState("");
    const [posttype, setPostType] = useState<string>("");
    const [author, setAuthor] = useState(blogdata?.authorId || "");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [videoUrl, setvideoUrl] = useState("");
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [contentType, setContentType] = useState(blogdata?.postType || "");
    const [blogImages, setBlogImages] = useState<File[]>([]);
    const [Highlight, setHighlight] = useState("-2");
    const [value, setValue] = React.useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>((0));
    const [loginuser, setLoginUser] = useState("");
    const [message, setMessage] = useState("");
    const [PostImages, setPostImages] = useState<File[]>([]);
    const [Date, setDate] = useState([]);
    const [PublishDate, setPublishDate] = useState([]);
    const [Content, setContent] = useState('');

    const [myimage, setmyimage] = useState<File | null>(null);

    const [inputFields, setInputFields] = useState(blogdata?.faqs || [{ question: '', answer: '' }]);

    useEffect(() => {
        if (!slug) {
            setError('Invalid slug');
            setIsLoading(false);
            return;
        }

        const blogdata = allblogs.find((post) => post.slug === slug);
        if (!blogdata) {
            setError('Post not found');
            setIsLoading(false);
            return;
        }

        setPost(blogdata as any);
        setCategorySlug(blogdata.categoriesId as any || "");

        const mdxFilePath = blogdata.mdxPath?.replace(/^\/?public\//, '') || '';
        // console.log("mdxFilePath =>", mdxFilePath)
        if (!Content && mdxFilePath) {
            setIsLoading(true);
            getMdxContentBySlug(mdxFilePath).then((mdxContent) => {
                if (mdxContent) {
                    setContent(mdxContent);
                } else {
                    console.log('❌ MDX content not found');
                }
                setIsLoading(false);
            }).catch((err) => {
                console.error("❌ Error fetching MDX:", err);
                setError('Error fetching MDX content');
                setIsLoading(false);
            });
        }
    }, [slug]);

    const togglePanel = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            setAudioFile(file as any);
        }
    };

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const updatedFields = [...inputFields];
        const { name, value } = event.target;

        updatedFields[index] = { ...updatedFields[index], [name]: value };

        setPost({ ...post!, faqs: inputFields })
        setInputFields(updatedFields);
    };

    const handleAddField = () => {
        setInputFields([...inputFields, { question: '', answer: '' }]);
    };

    const handleDeleteField = (index: number) => {
        const updatedFields = inputFields.filter((_, idx) => idx !== index);
        setInputFields(updatedFields);
    };

    const handleTagSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        const newTag = e.target.value;

        if (newTag && !tagSlugs.includes(newTag)) {
            const updatedTags = [...tagSlugs, newTag];
            setTagSlugs(updatedTags);
            setPost((prevPost) => prevPost ? { ...prevPost, tags: updatedTags } : null);
        }
    };

    const handleRemoveTag = (slug: string) => {
        setTagSlugs((prevSlugs) => prevSlugs.filter((s) => s !== slug));
        setPost((prevPost) => prevPost ? { ...prevPost, tags: prevPost.tagsId.filter((s: string) => s !== slug) } : null);
    };

    const availableTags = tags.filter((tag) => !tagSlugs.includes(tag.slug));
    const allauthor = AUTHORS.map(author => author.slug)
    const fileToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!post) return;
            if (myimage) {
                post.image = myimage;
            }
            let audioBase64 = null;
            if (audioFile) {
                audioBase64 = await fileToBase64(audioFile);
            }
            if (blogdata?.mdxPath) {
                blogdata.mdxPath = blogdata?.mdxPath;
            }
            const updatedPost = {
                ...post,
                image: myimage || post.image,
                audioUrl: audioBase64,
                mdxPath: blogdata?.mdxPath,
            };
            // console.log("updatedPost => ", updatedPost)
            const response = await fetch('/api/edit-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPost),
            });
            if (response.ok) {
                setMessage("Post updated successfully");
                router.push('/dashboard/posts');
            } else {
                setMessage("Error updating the post");
            }
        } catch (error) {
            setMessage("Error updating the post");
        }
    };
    const [blogsImages, setBlogsImages] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);
    const [successsMessage, setSuccesssMessage] = useState("");
    const [errorsMessage, setErrorsMessage] = useState("");
    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setBlogsImages(files);
            setmyimage(files[0]?.name as any)
        }
    };
    // Handle image upload
    const handleImageUpload = async () => {
        if (!blogsImages || blogsImages.length === 0) {
            setErrorsMessage("Please select at least one image to upload.");
            return;
        }
        setUploading(true);
        const formData = new FormData();
        Array.from(blogsImages).forEach((file) => {
            formData.append("images", file);
        });
        try {
            const response = await fetch("/api/upload-images", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                setSuccesssMessage("Images uploaded successfully!");
                setTimeout(() => {
                    setSuccesssMessage("");
                }, 3000);
                setErrorsMessage("");
            } else {
                setErrorsMessage("Error uploading images. Please try again.");
                setSuccesssMessage("");
            }
        } catch (error) {
            setErrorsMessage("An error occurred while uploading. Please try again.");
            setSuccesssMessage("");
        }
        setUploading(false);
    };


    // if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <>
            <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
                <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

                    {/* Accordion for Title & Slug */}
                    <label className="block md:col-span-2">
                        <button
                            type="button"
                            className={`accordion w-full text-left p-4 bg-gray-200 text-gray-700 rounded-md transition-all duration-300 ${activeIndex === 0 ? "bg-gray-300" : ""
                                }`}
                            onClick={() => togglePanel(0)}
                        >
                            SEO Info
                        </button>
                        {activeIndex === 0 && (
                            <div className="panel mt-4 p-4 bg-white rounded-md shadow-md grid md:grid-cols-2 gap-6">
                                {/* Post Title */}
                                <label className="block ">
                                    <Label>Post Title * {title.length > 0 && (
                                        <span className="text-sm text-gray-600">
                                            ({title.length} Character{title.length > 1 ? 's' : ''})
                                        </span>
                                    )}</Label>
                                    <Input
                                        type="text"
                                        className="mt-1"
                                        value={post?.title || ''}
                                        onChange={(e) => setPost({ ...post!, title: e.target.value })}
                                    />
                                </label>
                                <label className="block ">
                                    <Label>Post Slug *</Label>
                                    <Input
                                        type="text"
                                        className="mt-1"
                                        defaultValue={slug || ''}
                                        value={updatedslug || slug || ''}
                                        onChange={(e) => {
                                            const newSlug = e.target.value;
                                            setUpdatedSlug(newSlug);
                                            setPost({ ...post!, slug: newSlug });
                                        }}
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                </label>
                                {/* 2nd SEO Row */}
                                <div className="flex space-x-6 md:col-span-2">
                                    {/* SEO Title */}
                                    <label className="block flex-1">
                                        <span className="block font-medium">SEO Title * {SeoTitle.length > 0 && (
                                            <span className="text-sm text-gray-600">
                                                ({SeoTitle.length} Character{SeoTitle.length > 1 ? 's' : ''})
                                            </span>
                                        )}</span>
                                        <Input
                                            type="text"
                                            className="mt-1"
                                            value={post?.seo.seoTitle || ''}
                                            onChange={(e) => setPost(
                                                {
                                                    ...post!,
                                                    seo: {
                                                        ...post!.seo,
                                                        seoTitle: e.target.value
                                                    }
                                                    // seotitle: e.target.value 
                                                })}
                                            maxLength={60}
                                        />
                                    </label>
                                    {/* SEO Keywords */}
                                    <label className="block flex-1">
                                        <span className="block font-medium">SEO Keywords *
                                            {seoKeyword && (
                                                <span className="text-sm text-gray-600">
                                                    ({seoKeyword.split(',').filter(Boolean).length} Word{seoKeyword.split(',').filter(Boolean).length > 1 ? 's' : ''})
                                                </span>
                                            )}
                                        </span>
                                        <Input
                                            type="text"
                                            className="mt-1"
                                            value={post?.seo.seoKeyword || ''}
                                            onChange={(e) => setPost({
                                                ...post!,
                                                // seokeyword: e.target.value 
                                                seo: {
                                                    ...post!.seo,
                                                    seoKeyword: e.target.value
                                                }
                                            })}
                                            maxLength={60}
                                        />
                                    </label>
                                    {/* SEO Description */}
                                    <label className="block flex-1 ">
                                        <span className="block font-medium">SEO Description {excerpt.length > 0 && (
                                            <span className="text-sm text-gray-600">
                                                ({excerpt.length} Character{excerpt.length > 1 ? 's' : ''})
                                            </span>
                                        )}</span>
                                        <Textarea
                                            className="mt-1"
                                            rows={4}
                                            value={post?.desc || ''}
                                            onChange={(e) => setPost({
                                                ...post!,
                                                // desc: e.target.value 
                                                seo: {
                                                    ...post!.seo,
                                                    seoDesc: e.target.value
                                                }
                                            })}
                                        />
                                    </label>
                                </div>
                                <div className="flex space-x-6 md:col-span-2">
                                    {/* Category */}
                                    <label className="block flex-1">
                                        <span className="block font-medium">Category</span>
                                        <Select
                                            className="mt-1"
                                            value={post?.categoriesId[0] || ''}
                                            onChange={(e) => setPost({ ...post!, categoriesId: [e.target.value] })}
                                        >
                                            <option value="-1">– Select Category –</option>
                                            {category.map((item) => (
                                                <option key={item.slug} value={item.slug}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </label>
                                    {/* Content Type */}
                                    <label className="block flex-1">
                                        <span className="block font-medium">Content Type *</span>
                                        <Select
                                            className="mt-1"
                                            value={post?.contentType || ""}
                                            onChange={(e) => setPost({ ...post!, contentType: e.target.value })}
                                        >
                                            <option value="">Select Content Type</option>
                                            <option value="free">Free</option>
                                            <option value="subscribe">Subscribe</option>
                                            <option value="paid">Paid</option>
                                        </Select>
                                    </label>
                                    {/* Author */}
                                    <label className="block flex-1">
                                        <span className="block font-medium">Author</span>
                                        <Select
                                            className="mt-1"
                                            value={post?.authorId || ''}
                                            onChange={(e) => setPost({ ...post!, authorId: e.target.value })}
                                        >
                                            <option value="">– Select Author –</option>
                                            {loginuser ? (
                                                <option value={loginuser}>{loginuser.replace(/-/g, ' ')}</option>
                                            ) : (
                                                allauthor?.map((slug) => (
                                                    <option key={slug} value={slug || ''}>
                                                        {slug ? slug.replace(/-/g, ' ') : ""}
                                                    </option>
                                                ))
                                            )}
                                        </Select>
                                    </label>
                                    {/* Post Type Selection */}
                                    <label className="block flex-1">
                                        <span className="block font-medium">Post Type</span>
                                        <Select
                                            className="mt-1"
                                            value={post?.postType || ""}
                                            onChange={(e) => setPost({ ...post!, postType: e.target.value })}
                                        >
                                            <option value="">– Select Post Type –</option>
                                            <option value="standard">Standard</option>
                                            <option value="video">Video</option>
                                            <option value="audio">Audio</option>
                                        </Select>
                                    </label>
                                </div>
                                {/* Audio File Upload */}
                                {post?.postType === "audio" && (
                                    <label className="block md:col-span-2">
                                        <Label>Audio File Upload</Label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                                            <label
                                                htmlFor="audio-upload"
                                                className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800"
                                            >
                                                {audioFile?.name ? (
                                                    <span>{audioFile.name}</span>
                                                ) : (
                                                    <span>{post?.postTypeUrl ? post.postTypeUrl.split('/').pop() : "Upload Audio"}</span>
                                                )}
                                                <input
                                                    id="audio-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="audio/*"
                                                    onChange={handleAudioFileChange}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-neutral-500 mt-1">MP3 File (up to 10MB)</p>
                                    </label>
                                )}
                                {/* Video URL */}
                                {post?.postType === "video" && (
                                    <label className="block md:col-span-2">
                                        <Label>YouTube Video URL</Label>
                                        <Input
                                            className="mt-1"
                                            type="url"
                                            value={videoUrl || ""}
                                            onChange={(e) => setPost({ ...post!, videoUrl: e.target.value })}
                                            placeholder="Enter YouTube Video URL"
                                        />
                                    </label>
                                )}
                                {/* Featured Images */}
                                <div className="flex flex-col md:flex-row md:space-x-6 md:col-span-2">
                                    <div className="w-full md:w-1/1">
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
                                                <div className="mt-4 grid grid-cols-3 gap-4">
                                                    <Image
                                                        src={blogsImages && blogsImages.length > 0
                                                            ? URL.createObjectURL(blogsImages[0])
                                                            : (post?.featuredImage as any)
                                                        }
                                                        alt="Image Preview"
                                                        width={0}
                                                        height={100}
                                                        layout="intrinsic"
                                                        className="w-full h-[100px] object-cover rounded-md"
                                                    />
                                                </div>
                                            </label>

                                            {/* Upload Button */}
                                            <div className="pt-3 flex flex-col items-start">
                                                <button
                                                    type="button"
                                                    onClick={handleImageUpload}
                                                    disabled={uploading}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                                >
                                                    {uploading ? "Uploading..." : "Upload Images"}
                                                </button>

                                                {successsMessage && (
                                                    <div className="mt-2 text-green-600">{successsMessage}</div>
                                                )}
                                                {errorsMessage && (
                                                    <div className="mt-2 text-red-600">{errorsMessage}</div>
                                                )}
                                            </div>

                                        </div>
                                    </div>

                                    {/* Tags Section */}
                                    <div className="w-full md:w-1/3 mt-4 md:mt-0">
                                        <div className="space-y-4">
                                            <label className="block">
                                                <Label>Tags</Label>
                                                <select
                                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                    value={post?.tagsId}
                                                    onChange={handleTagSelection}
                                                >
                                                    <option value="" >Select a tag</option>
                                                    {availableTags.map((tag) => (
                                                        <option key={tag.slug} value={tag.slug}>
                                                            {tag.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>

                                            {/* Display selected tags */}
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {tagSlugs.map((slug) => {
                                                    const selectedTag = tags.find((tag) => tag.slug === slug);
                                                    return (
                                                        selectedTag && (
                                                            <span
                                                                key={slug}
                                                                className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg"
                                                            >
                                                                {selectedTag.name}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveTag(slug)}
                                                                    className="ml-2 text-white font-semibold"
                                                                >
                                                                    &times;
                                                                </button>
                                                            </span>
                                                        )
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Highlight */}
                                <label className="block">
                                    <Label>Highlight</Label>
                                    <Select
                                        className="mt-1"
                                        value={post?.ishighlight}
                                        onChange={(e) => setPost({ ...post!, ishighlight: e.target.value })} // Ensure categoryslug is updated as an array
                                    >
                                        <option value="-2">– Select Highlight –</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Select>
                                    {/* Post Status */}
                                    <span className="block font-medium mt-3">Post Status</span>
                                    <Select
                                        className="mt-1"
                                        value={post?.status}
                                        onChange={(e) => setPost({ ...post!, status: e.target.value })}
                                    >
                                        <option value="">– Select Post Status –</option>
                                        <option value="draft">draft</option>
                                        <option value="published">publish</option>
                                        <option value="underreview">underreview</option>
                                    </Select>
                                </label>

                                {/* JSONLD */}
                                <label className="block ">
                                    <Label>JsonLD</Label>
                                    <Textarea
                                        className="mt-1"
                                        rows={5}
                                        value={post?.seo.jsonLD}
                                        onChange={(e) => setPost({
                                            ...post!,
                                            // jsonld: e.target.value 
                                            seo: {
                                                ...post!.seo,
                                                jsonLD: e.target.value
                                            }
                                        })}
                                    />
                                </label>

                                {/* Blog FAQs */}
                                <label className="block md:col-span-2">
                                    <Label className="mb-3">Blog FAQs</Label>

                                    {inputFields.map((inputField, index) => (
                                        <div key={index} className="flex flex-col mb-4">
                                            <div className="flex flex-row gap-4 mb-2">
                                                <label className="flex flex-col w-full">
                                                    <Label className="block mb-1 text-sm font-medium">Questions</Label>
                                                    <Input
                                                        type="text"
                                                        name="question"
                                                        value={inputField.question}
                                                        onChange={(e) => handleChange(index, e)}
                                                        placeholder={`Enter question ${index + 1}`}
                                                        className="border p-2 rounded"
                                                    />
                                                </label>

                                                <label className="flex flex-col w-full">
                                                    <Label className="block mb-1 text-sm font-medium">Answer</Label>
                                                    <Input
                                                        type="text"
                                                        name="answer"
                                                        value={inputField.answer}
                                                        onChange={(e) => handleChange(index, e)}
                                                        placeholder={`Enter answer ${index + 1}`}
                                                        className="border p-2 rounded"
                                                    />
                                                </label>

                                                <button
                                                    type="button"
                                                    className="mt-4 flex justify-center items-center rounded-full border border-red-500 p-2"
                                                    onClick={() => handleDeleteField(index)}
                                                >
                                                    <i className="fa fa-trash text-red-600"></i>
                                                </button>

                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md top-4 right-4"
                                        onClick={handleAddField}>
                                        Add More
                                    </button>

                                </label>
                            </div>
                        )}
                    </label>

                    {/* Accordion for MDXEditor */}
                    <label className="mt-4 block md:col-span-2">
                        <button
                            type="button"
                            className={`accordion w-full text-left p-4 bg-gray-200 text-gray-700 rounded-md transition-all duration-300 ${activeIndex === 1 ? "bg-gray-300" : ""
                                }`}
                            onClick={() => togglePanel(1)}
                        >
                            Write Blog
                        </button>
                        {activeIndex === 1 && (
                            <div className="panel mt-4 p-4 bg-white rounded-md shadow-md">

                                <label className="block md:col-span-2">
                                    <BlogImageUpload />
                                </label>

                                <MDEditor
                                    value={Content || ""}
                                    minHeight={500}
                                    className="block md:col-span-2 mt-4 min-h-[530px]"
                                    onChange={(value) => {
                                        setContent(value || "");
                                    }}
                                    onBlur={() => {
                                        setPost((prevPost) => post ? { ...post, MDXContent: Content } : null);
                                    }}
                                />

                            </div>
                        )}
                    </label>

                    {/* Submit Button */}
                    <ButtonPrimary className="md:col-span-2" type="submit">
                        Submit Post
                    </ButtonPrimary>
                </form>

                {message && (
                    <div className="mt-4 p-4 bg-neutral-100 text-black border border-black rounded-md">
                        {message}
                    </div>
                )}

                {/* Success or Error Messages */}
                {successMessage && (
                    <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
                        {errorMessage}
                    </div>
                )}
            </div>
        </>
    );
};

export default EditPost;
