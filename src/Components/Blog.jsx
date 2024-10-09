import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';
import { url } from '../url';

function PostDetails() {
	const { postId } = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [hasLiked, setHasLiked] = useState(false);
	const [hasDisliked, setHasDisliked] = useState(false);
	const [newComment, setNewComment] = useState('');

	// Fetch post data and comments
	useEffect(() => {
		async function fetchPost() {
			try {
				const response = await fetch(`${url}/post/post/${postId}`);
				const data = await response.json();

				if (data.length > 0) {
					const postData = data[0];
					setPost(postData);
					setComments(postData.comments || []);
					setLikes(postData.likes?.length || 0);
					setDislikes(postData.dislikes?.length || 0);
					// Check if the current user has liked/disliked the post
					const currentUserId = '667e51f194b680166eaaae20'; // Example user ID
					setHasLiked(postData.likes.includes(currentUserId));
					setHasDisliked(postData.dislikes.includes(currentUserId));
				}
			} catch (err) {
				console.error('Error fetching post:', err);
			}
		}
		fetchPost();
	}, [postId]);

	// Handle like action for post
	const handleLike = async () => {
		try {
			const action = hasLiked ? 'unlike' : 'like';
			const response = await fetch(`${url}/post/${action}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ postId, userId: '667e51f194b680166eaaae20' }),
			});

			if (response.ok) {
				if (hasLiked) {
					setLikes(likes - 1);
					setHasLiked(false);
				} else {
					setLikes(likes + 1);
					setHasLiked(true);
					if (hasDisliked) {
						setDislikes(dislikes - 1);
						setHasDisliked(false);
					}
				}
			}
		} catch (err) {
			console.error('Error liking post:', err);
		}
	};

	// Handle dislike action for post
	const handleDislike = async () => {
		try {
			const action = hasDisliked ? 'like' : 'unlike';
			const response = await fetch(`${url}/post/${action}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ postId, userId: '667e51f194b680166eaaae20' }),
			});

			if (response.ok) {
				if (hasDisliked) {
					setDislikes(dislikes - 1);
					setHasDisliked(false);
				} else {
					setDislikes(dislikes + 1);
					setHasDisliked(true);
					if (hasLiked) {
						setLikes(likes - 1);
						setHasLiked(false);
					}
				}
			}
		} catch (err) {
			console.error('Error disliking post:', err);
		}
	};

	// Handle adding a new comment
	const handleAddComment = async () => {
		if (!newComment.trim()) {
			return; // Prevent adding empty comments
		}
		try {
			const response = await fetch(`${url}/comments/comment`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					postId,
					content: newComment,
					userId: '667e51f194b680166eaaae20',
				}),
			});
			if (response.ok) {
				const data = await response.json();
				setComments([...comments, data]);
				setNewComment('');
			} else {
				console.error('Failed to add comment:', response.statusText);
			}
		} catch (err) {
			console.error('Error adding comment:', err);
		}
	};

	// Handle like action for comment
	const handleLikeComment = async (commentId) => {
		try {
			await fetch(`${url}/comments/like`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ commentId, userId: '667e51f194b680166eaaae20' }),
			});
			// You can update the specific comment's likes count here if needed
		} catch (err) {
			console.error('Error liking comment:', err);
		}
	};

	return (
		<div className='container mx-auto bg-slate-900 overflow-hidden min-h-screen'>
			<div className='shadow-lg md:px-16 md:py-6 p-6'>
				<img
					src='https://picsum.photos/800/400'
					alt='Blog Image'
					className='w-full h-60 object-fit rounded-lg'
				/>
				<div>
					<h1 className='md:text-4xl text-2xl poppins font-semibold text-violet-500 text-center my-4'>
						{post.title}
					</h1>
					<p className='text-white mb-4 text-justify'>{post.content}</p>

					{/* Display likes and dislikes */}
					<div className='flex items-center mb-4 space-x-4'>
						<button
							className={`flex items-center space-x-1 ${
								hasLiked ? 'text-red-500' : 'text-gray-400'
							}`}
							onClick={handleLike}
						>
							<FaHeart />
							<span>{likes} likes</span>
						</button>
						<button
							className={`flex items-center space-x-1 ${
								hasDisliked ? 'text-blue-500' : 'text-gray-400'
							}`}
							onClick={handleDislike}
						>
							<FaThumbsDown />
							<span>{dislikes} dislikes</span>
						</button>
					</div>

					{/* Add comment */}
					<div className='my-4'>
						<textarea
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							className='w-full p-2 rounded-lg bg-slate-800 text-white'
							placeholder='Add a comment...'
						/>
						<button
							className='bg-violet-500 text-white px-4 py-2 rounded-lg mt-2'
							onClick={handleAddComment}
						>
							Post Comment
						</button>
					</div>

					{/* Display comments */}
					<div className='bg-slate-800 p-4 rounded-lg'>
						<h2 className='text-2xl font-bold text-white mb-2'>Comments</h2>
						{comments.length > 0 ? (
							<ul>
								{comments.map((comment) => (
									<li key={comment._id} className='text-white mb-2'>
										<p>{comment.content}</p>
										<small>by {comment.author?.username || 'Unknown'}</small>
										<button
											className='text-red-500 ml-4'
											onClick={() => handleLikeComment(comment._id)}
										>
											<FaHeart /> Like
										</button>
									</li>
								))}
							</ul>
						) : (
							<p className='text-gray-400'>No comments yet.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostDetails;
