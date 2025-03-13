import { Sidebar } from "@/app/(singles)/Sidebar";
import SingleContent from "@/app/(singles)/SingleContent";
import SingleRelatedPosts from "@/app/(singles)/SingleRelatedPosts";
import Page404 from "@/app/not-found";
import BlogHeader from "@/components/MyComponents/Blog/BlogHeader";
import { allblogs, blogslugmatched } from "@/data/blogs";
import { fetchSingleMdxFile } from "@/data/fetchmdxdata";
import React from "react";

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const blog = blogslugmatched(slug);

  const mdxData = await fetchSingleMdxFile(blog?.mdxPath as any);

  if (!blog || mdxData?.content === undefined) {
    return <Page404 />;
  }

  return (
    <>
      <div>
        <div className={`relative`}>

          <BlogHeader data={blog} />

          <div className="container flex flex-col my-10 lg:flex-row ">
            <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
              <SingleContent blogcontent={mdxData?.content} slug={blog as any} />
            </div>
            <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
              <Sidebar />
            </div>
          </div>

          {/* RELATED POSTS */}
          <SingleRelatedPosts slug={slug as any} />
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return allblogs.map((blog) => ({
      slug: blog.slug.toString(),
  }));
}