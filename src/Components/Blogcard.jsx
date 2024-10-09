import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';
import { url } from '../url'; // Assuming you have a config for API base URL

export default function Blogcard({ post, userToken }) {
	const navigate = useNavigate();

	// State to manage likes and dislikes from backend data
	const [likes, setLikes] = useState(post.likes.length);
	const [dislikes, setDislikes] = useState(post.dislikes.length);
	const [hasLiked, setHasLiked] = useState(false);
	const [hasDisliked, setHasDisliked] = useState(false);

	// Check if the user has already liked/disliked the post
	useEffect(() => {
		if (userToken) {
			const userId = userToken.userId; // Assuming userToken contains userId
			setHasLiked(post.likes.includes(userId));
			setHasDisliked(post.dislikes.includes(userId));
		}
	}, [post, userToken]);

	// Function to like a post
	const handleLike = async () => {
		try {
			if (!hasLiked) {
				const res = await fetch(`${url}/like`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userToken.token}`, // Assuming you pass token for protected routes
					},
					body: JSON.stringify({ postId: post._id }),
				});
				if (res.ok) {
					setLikes(likes + 1);
					setHasLiked(true);
					if (hasDisliked) {
						setDislikes(dislikes - 1);
						setHasDisliked(false);
					}
				}
			} else {
				const res = await fetch(`${url}/unlike`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userToken.token}`,
					},
					body: JSON.stringify({ postId: post._id }),
				});
				if (res.ok) {
					setLikes(likes - 1);
					setHasLiked(false);
				}
			}
		} catch (err) {
			console.error('Error liking the post:', err);
		}
	};

	// Function to dislike a post
	const handleDislike = async () => {
		try {
			if (!hasDisliked) {
				const res = await fetch(`${url}/dislike`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userToken.token}`,
					},
					body: JSON.stringify({ postId: post._id }),
				});
				if (res.ok) {
					setDislikes(dislikes + 1);
					setHasDisliked(true);
					if (hasLiked) {
						setLikes(likes - 1);
						setHasLiked(false);
					}
				}
			} else {
				const res = await fetch(`${url}/undislike`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userToken.token}`,
					},
					body: JSON.stringify({ postId: post._id }),
				});
				if (res.ok) {
					setDislikes(dislikes - 1);
					setHasDisliked(false);
				}
			}
		} catch (err) {
			console.error('Error disliking the post:', err);
		}
	};

	// Navigate to post details when "Read More" is clicked
	const handleReadMore = () => {
		navigate(`/post/${post._id}`);
	};

	return (
		<div className='bg-slate-900 shadow-lg rounded-lg overflow-hidden flex flex-col z-[49]'>
			<img
				src={post.imageUrl || 'https://picsum.photos/400/300'}
				alt='Blog Image'
				className='w-full h-48 object-cover'
			/>
			<div className='p-4 flex-1 flex flex-col justify-between'>
				<h2 className='text-lg font-semibold text-teal-500 mb-2'>
					{post.title}
				</h2>
				<p
					className='text-white mb-4'
					dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) }}
				/>
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
