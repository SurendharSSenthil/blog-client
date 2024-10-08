import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';

export default function Blogcard({ post }) {
	const navigate = useNavigate();

	// State to manage likes and dislikes
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [hasLiked, setHasLiked] = useState(false);
	const [hasDisliked, setHasDisliked] = useState(false);

	// Handle like button click
	const handleLike = () => {
		if (!hasLiked) {
			setLikes(likes + 1);
			setHasLiked(true);
			if (hasDisliked) {
				setDislikes(dislikes - 1);
				setHasDisliked(false);
			}
		} else {
			setLikes(likes - 1);
			setHasLiked(false);
		}
	};

	// Handle dislike button click
	const handleDislike = () => {
		if (!hasDisliked) {
			setDislikes(dislikes + 1);
			setHasDisliked(true);
			if (hasLiked) {
				setLikes(likes - 1);
				setHasLiked(false);
			}
		} else {
			setDislikes(dislikes - 1);
			setHasDisliked(false);
		}
	};

	// Navigate to post details when "Read More" is clicked
	const handleReadMore = () => {
		navigate(`/post/${post.id}`);
	};

	return (
		<div className='bg-slate-900 shadow-lg rounded-lg overflow-hidden flex flex-col z-[49]'>
			<img
				src='https://picsum.photos/400/300'
				alt='Blog Image'
				className='w-full h-48 object-cover'
			/>
			<div className='p-4 flex-1 flex flex-col justify-between'>
				<h2 className='text-lg font-semibold text-white mb-2'>{post.title}</h2>
				<p className='text-white mb-4'>{post.content.substring(0, 100)}...</p>
				<div className='flex items-center space-x-4 mb-4'>
					<button
						onClick={handleLike}
						className={`flex items-center space-x-1 ${
							hasLiked ? 'text-red-500' : 'text-gray-400'
						} hover:text-red-500 transition`}
					>
						<FaHeart />
						<span>{likes}</span>
					</button>
					<button
						onClick={handleDislike}
						className={`flex items-center space-x-1 ${
							hasDisliked ? 'text-blue-500' : 'text-gray-400'
						} hover:text-blue-500 transition`}
					>
						<FaThumbsDown />
						<span>{dislikes}</span>
					</button>
				</div>
				<button
					className='bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition'
					onClick={handleReadMore}
				>
					Read More
				</button>
			</div>
		</div>
	);
}
