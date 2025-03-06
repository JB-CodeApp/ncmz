"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "@/components/Select/Select";
import Textarea from "@/components/Textarea/Textarea";
import Label from "@/components/Label/Label";
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { AUTHORS, CATEGORIES, TAGS } from "@/data/blogs";
import BlogImageUpload from "@/components/MyComponents/BlogImageUpload";
import { BlogDataType, PostData } from "@/data/datatypes";
import { generateSlug } from "@/app/api/fetchmdxdata";

const AddBlogPost = () => {
  const category = CATEGORIES;
  const tags = TAGS;
  const [title, setTitle] = useState("");
  const [SeoTitle, setSeoTitle] = useState("");
  const [seoKeyword, setseoKeyword] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categorySlug, setCategorySlug] = useState("-1");
  const [tagSlugs, setTagSlugs] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | string>("");
  const [JsonLD, setJsonLD] = useState("");
  const [slug, setSlug] = useState("");
  const [posttype, setPostType] = useState<string>("");
  const [author, setAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoUrl, setvideoUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File | string>("");
  const [contentType, setContentType] = useState("");
  const [blogImages, setBlogImages] = useState<File[]>([]);
  const [Highlight, setHighlight] = useState("-2");
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputFields, setInputFields] = useState([{ question: '', answer: '' }]);
  const [error, setError] = useState('');
  const [Status, setStatus] = useState('');

  const [loginuser, setLoginUser] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginuser = localStorage.getItem("user") || "";
      setLoginUser(loginuser)
      if (title) {
        setSlug(generateSlug(title));
      } else {
        setSlug("");
      }
    }
  }, [title]);

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return setErrorMessage("Post title is required.");
    if (categorySlug === "-1") return setErrorMessage("Please select a category.");
    if (tagSlugs.length === 0) return setErrorMessage("Please select at least one tag.");
    if (!featuredImage) return setErrorMessage("Please upload a featured image.");

    // const formattedDate = new Date().toLocaleDateString("en-US", {
    //   month: "long",
    //   day: "numeric",
    //   year: "numeric",
    // });

    const postData: PostData = {
      index: 1,
      id: "9e3e3994-a3ed-47ca-a014-d4483884cfe2",
      title: title.trim(),
      slug: slug.trim(),
      href: `/blog/${slug}/`,
      MDXContent: value,
      featuredImage: featuredImage || "",
      authorId: author.trim(),
      authorslug: author.trim(),
      desc: excerpt.trim(),
      viewdCount: Math.floor(Math.random() * 500) + 1, // 50-500
      readingTime: Math.floor(Math.random() * 6) + 1, // word counter before
      bookmarkUsersId: [""],
      likeUsersId: [""],
      categoriesId: categorySlug !== "-1" ? [categorySlug] : [],
      tagsId: tagSlugs,
      status: Status, // status [draft, publish, underreview] - only publish blog show
      ishighlight: Highlight, //Highlight on Homepage Hero section
      contentType: contentType, // free, subscribe, paid 
      postType: posttype,
      postTypeUrl: videoUrl,
      seo: {
        seoTitle: SeoTitle.trim(),
        seoKeyword: seoKeyword.trim(),
        seoDesc: excerpt.trim(),
        jsonLD: JsonLD || "{}",
      },
      blogImgs: ["", ""],
      faqs: inputFields,
      comments: [{
        userId: "1",
        comments: "comments1",
        commentDate: "",
        commentLikes: ""
      }],
      createdAt: new Date(),
      publishedAt: new Date(),
      updatedAt: new Date(),
      deletedAt: "",
      mdxPath: "",
      tags: [],
      categoryslug: [],
      commentCount: 0,
      bookmark: {
        count: 0,
        isBookmarked: false
      },
      like: {
        count: 0,
        isLiked: false
      },
      date: "",
      publishdate: "",
      author: "",
      jsonld: "",
      contenttype: ""
    };

    // audioUrl: audioFile,
    // image: featuredImage,
    // blogresources: blogImages,

    if (posttype === "audio" && audioFile) {
      postData.audioFile = audioFile;
    }

    try {
      const formData = new FormData();
      formData.append("postData", JSON.stringify(postData));

      if (value) {
        formData.append("MDXContent", value);
      }

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }

      if (audioFile) {
        formData.append("audioUrl", audioFile);
      }
      blogImages.forEach((image) => formData.append('blogImages', image));

      const response = await fetch('/api/submitPost', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setErrorMessage(null);
        clearMessages();
        setseoKeyword("")
        setSeoTitle("")
        setTitle("");
        setExcerpt("");
        setCategorySlug("-1");
        setTagSlugs([]);
        setFeaturedImage("");
        setJsonLD("");
        setSlug("");
        setPostType("");
        setAuthor("");
        setvideoUrl("");
        setAudioFile("");
        setContentType("");
        setBlogImages([]);
        setHighlight("-2");
        setValue("");
        setImagePreview(null);
        setInputFields([{ question: '', answer: '' }]);

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        setSuccessMessage(null);
        clearMessages();
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage(null);
      clearMessages();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const togglePanel = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const values = [...inputFields];
    const { name, value } = event.target;
    values[index] = { ...values[index], [name]: value };
    setInputFields(values);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { question: '', answer: '' }]);
  };

  const handleDeleteField = (index: any) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
  };

  const handleTagSelection = (event: any) => {
    const selectedSlug = event.target.value;
    setTagSlugs((prevSlugs) => {
      if (!prevSlugs.includes(selectedSlug)) {
        return [...prevSlugs, selectedSlug];
      }
      return prevSlugs;
    });
  };

  const handleRemoveTag = (slug: string) => {
    setTagSlugs((prevSlugs) => prevSlugs.filter((s) => s !== slug));
  };

  const availableTags = tags.filter((tag) => !tagSlugs.includes(tag.slug));

  const allauthor = AUTHORS.map(author => author.slug)

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label className="block ">
                  <Label>Post Slug *</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    value={slug}
                    onChange={(e) => {
                      const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.target.value);
                      setSlug(e.target.value);
                      setError(isValid || e.target.value === '' ? '' : 'Invalid slug: only lowercase, numbers, and hyphens allowed.');
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
                      value={SeoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
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
                      value={seoKeyword}
                      onChange={(e) => setseoKeyword(e.target.value)}
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
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                    />
                  </label>
                </div>

                <div className="flex space-x-6 md:col-span-2">
                  {/* Category */}
                  <label className="block flex-1">
                    <span className="block font-medium">Category</span>
                    <Select
                      className="mt-1"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
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
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
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
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    >
                      <option value="">– Select Author –</option>
                      {loginuser ? (
                        <option value={loginuser}>{loginuser.replace(/-/g, ' ')}</option>
                      ) : (
                        allauthor.map(slug => (
                          <option key={slug} value={slug}>
                            {slug.replace("-", " ").toUpperCase()}
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
                      value={posttype}
                      onChange={(e) => setPostType(e.target.value)}
                    >
                      <option value="">– Select Post Type –</option>
                      <option value="standard">Standard</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                    </Select>
                  </label>
                </div>

                {/* Audio File Upload */}
                {posttype === "audio" && (
                  <label className="block md:col-span-2">
                    <Label>Audio File Upload</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                      <label
                        htmlFor="audio-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800"
                      >
                        {audioFile ? (
                          <span>
                            {audioFile.name} &nbsp;
                          </span>
                        ) : (
                          <span>Upload Audio &nbsp;</span>
                        )}

                        <input
                          id="audio-upload"
                          name="audio-upload"
                          type="file"
                          className="sr-only"
                          accept="audio/*"
                          onChange={handleAudioFileChange}
                        />
                      </label>
                      <p className="text-xs text-neutral-500">MP3 File (up to 10MB)</p>

                    </div>
                  </label>
                )}

                {/* Video URL */}
                {posttype === "video" && (
                  <label className="block md:col-span-2">
                    <Label>YouTube Video URL</Label>
                    <Input
                      className="mt-1"
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setvideoUrl(e.target.value)}
                      placeholder="Enter YouTube Video URL"
                    />
                  </label>
                )}

                <div className="flex space-x-6 md:col-span-2">

                  {/* Featured Image */}
                  <div className="block flex-1">
                    <Label>Featured Image</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800"
                        >
                          {featuredImage ?
                            <>
                              <span className="ml-2">{featuredImage.name}</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                              />
                            </>
                            :
                            <>
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                              />
                              <p className="ps-1">or drag and drop</p>
                              <p className="text-xs text-neutral-500">PNG, JPG, GIF File Upload</p>
                            </>
                          }
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="block flex-1">
                    {
                      imagePreview ? (
                        <div className="mt-4 flex justify-center border-2 border-black rounded-md">
                          <Image
                            width={0}
                            height={50}
                            src={imagePreview}
                            alt="Featured Preview"
                            layout="intrinsic"
                            className="w-auto h-[50px] object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="mt-4 flex justify-center items-center border-2 border-black rounded-md h-[125px] w-auto">
                          <span className="text-center text-gray-500">No image preview available</span>
                        </div>
                      )
                    }
                  </div>

                  {/* Tags */}
                  <label className="block flex-1">
                    {/* <Select
                    className="mt-1 h-40 overflow-auto"
                    value={tagSlugs}
                    onChange={(e) => setTagSlugs(Array.from(e.target.selectedOptions, option => option.value))}
                    multiple
                  >
                    {tags.map((tag) => (
                      <option key={tag.slug} value={tag.slug}>
                        {tag.name}
                      </option>
                    ))}
                  </Select> */}

                    {/* -------------------- */}
                    <div className="space-y-4">
                      <label className="block">
                        <Label>Tags</Label>
                        <select
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          value=""
                          onChange={handleTagSelection}
                        >
                          <option value="" disabled>Select a tag</option>
                          {availableTags.map((tag) => (
                            <option key={tag.slug} value={tag.slug}>
                              {tag.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      {/* Display selected tags in a box */}
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
                  </label>
                </div>


                {/* Highlight */}
                <label className="block">
                  <Label>Highlight</Label>
                  <Select
                    className="mt-1"
                    value={Highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                  >
                    <option value="-2">– Select Highlight –</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Select>

                  {/* Post Status */}
                  <span className="block font-medium mt-3">Post Status</span>
                  <Select
                    className="mt-1"
                    value={Status}
                    onChange={(e) => setStatus(e.target.value)}
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
                    value={JsonLD}
                    onChange={(e) => setJsonLD(e.target.value)}
                  />
                </label>

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
                  value={value}
                  minHeight={500}
                  className="block md:col-span-2 mt-4 min-h-[530px]"
                  onChange={(value: any) => setValue(value || "")}
                />
              </div>
            )}
          </label>

          {/* Submit Button */}
          <ButtonPrimary className="md:col-span-2" type="submit">
            Submit Post
          </ButtonPrimary>
        </form>

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

export default AddBlogPost;
