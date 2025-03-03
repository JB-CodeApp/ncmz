// import { fetchSingleMdxFile } from '@/data/blogs';
import React from 'react'
import Page404 from '../not-found';
import { MDXRemote } from "next-mdx-remote/rsc";
import { fetchSingleMdxFile } from '@/data/fetchmdxdata';

const SingleContentDemo = async ({ filepath }: any) => {
	const mdxData = await fetchSingleMdxFile(filepath);

	if(!mdxData) return <Page404 />;

	return (
		<>
			<MDXRemote source={mdxData.content} />
		</>
	)
}

export default SingleContentDemo
