"use client"
import React, { useState } from "react";
import NcImage from "@/components/NcImage/NcImage";
import Pagination from "@/components/Pagination/Pagination";
import { allblogwithlatest, paginatePosts } from "@/data/blogs";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Link from "next/link";

// const people = [
//   {
//     id: 1,
//     title: "Tokyo Fashion Week Is Making Itself Great Again",
//     image:
//       "https://images.unsplash.com/photo-1617059063772-34532796cdb5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
//   {
//     id: 2,
//     title: "Traveling Tends to Magnify All Human Emotions",
//     image:
//       "https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
//   {
//     id: 3,
//     title: "Interior Design: Hexagon is the New Circle in 2018",
//     image:
//       "https://images.unsplash.com/photo-1617201277988-f0efcc14e626?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
//   {
//     id: 4,
//     title: "Heritage Museums & Gardens to Open with New Landscape",
//     image:
//       "https://images.unsplash.com/photo-1622960748096-1983e5f17824?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
//   {
//     id: 5,
//     title:
//       "Man agrees to complete $5,000 Hereford Inlet Lighthouse painting job",
//     image:
//       "https://images.unsplash.com/photo-1617202227468-7597afc7046d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: false,
//     payment: "Not Applicable",
//   },
//   {
//     id: 6,
//     title:
//       "Denton Corker Marshall the mysterious black box is biennale pavilion",
//     image:
//       "https://images.unsplash.com/photo-1622978147823-33d5e241e976?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
// ];

const DashboardPosts = () => {
  // Deleted Blogs Not Show Listing
  const blogdata = allblogwithlatest.filter(
    (post) => post.deletedAt === '',
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [deletePost, setDeletePost] = useState<{ slug: string; title: string } | null>(null); // State to track the post being deleted
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState(allblogwithlatest);

  const currentPosts = paginatePosts(blogdata, currentPage);

  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDelete = async () => {
    if (!deletePost) return;
    try {
      const response = await fetch("/api/delete-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: deletePost.slug }),
      });

      if (!response.ok) throw new Error("Failed to delete blog");

      setMessage(`Deleted: ${deletePost.title}`);
      setPosts(posts.filter(post => post.slug !== deletePost.slug));
    } catch {
      setMessage("Error deleting blog");
    } finally {
      setTimeout(() => setMessage(""), 5000);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8">

      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
          {message}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold dark:text-neutral-300">Are you sure you want to delete this blog?</h3>
            <p className="mt-2 dark:text-neutral-300">Delete {deletePost?.title}</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Article
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {currentPosts.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <Link href={item.href as any} >
                        <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                          <NcImage
                            containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                            src={item.featuredImage}
                            fill
                            sizes="80px"
                            alt="post"
                          />
                          <div className="ms-4 flex-grow">
                            <h2 className="inline-flex line-clamp-2 text-sm font-semibold dark:text-neutral-300">
                              {item.title.length > 85 ? item.title.slice(0, 85) + '...' : item.title}
                            </h2>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm font-medium rounded-full 
                          ${item.status === 'published' ? 'bg-teal-100 text-teal-900' : ''}
                          ${item.status === 'draft' ? 'text-neutral-500 dark:text-neutral-400' : ''}
                          ${item.status === 'underreview' ? 'bg-yellow-100 text-yellow-500' : ''}
                        `}
                      >
                        {item.status === 'published' ? 'Published' : item.status === 'draft' ? 'Draft' : 'Under Review'}
                      </span>
                      {/* {item.liveStatus ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                          Offline
                        </span>
                      )} */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <span> {item.contentType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      <a
                        href={`/dashboard/edit-post?slug=${item.slug.replace(/\/$/, '')}` as any}
                        className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                      >
                        Edit
                      </a>
                      {` | `}
                      <a
                        onClick={() => { setDeletePost(item); setShowConfirmModal(true); }}
                        className="text-rose-600 hover:text-rose-900"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {currentPosts.length < blogdata.length && (
        <ButtonPrimary onClick={handleShowMore}>
          Show me more
        </ButtonPrimary>
      )}
    </div>
  );
};

export default DashboardPosts;
