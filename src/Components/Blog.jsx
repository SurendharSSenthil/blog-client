import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetails({ posts }) {
	const { postId } = useParams();
	const post = posts.find((p) => p.id === parseInt(postId));

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div className='container mx-auto p-6'>
			<div className='bg-slate-900 shadow-lg rounded-lg overflow-hidden'>
				<img
					src='https://picsum.photos/800/400'
					alt='Blog Image'
					className='w-full h-64 object-cover'
				/>
				<div className='p-4'>
					<h1 className='text-4xl font-bold text-white mb-4'>{post.title}</h1>
					<p className='text-white'>{post.content}</p>
				</div>
			</div>
		</div>
	);
}

export default PostDetails;
