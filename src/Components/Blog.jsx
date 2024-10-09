import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';
import { Avatar } from 'flowbite-react';
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
	const [loading, setLoading] = useState(true); // New loading state
	const [error, setError] = useState(null); // New error state
	const [commentLoading, setCommentLoading] = useState(false); // Loading for comments

	// Fetch post data and comments
	useEffect(() => {
		async function fetchPost() {
			setLoading(true); // Show loading state
			try {
				const response = await fetch(`${url}/post/post/${postId}`);
				const data = await response.json();
				if (data) {
					const postData = data;
					setPost(postData.posts[0]);
					setComments(postData.comments || []);
					setLikes(postData.posts[0].likes?.length || 0);
					setDislikes(postData.posts[0].dislikes?.length || 0);
					const currentUserId = '667e51f194b680166eaaae20'; // Example user ID
					setHasLiked(postData.posts[0].likes.includes(currentUserId));
					setHasDisliked(postData.posts[0].dislikes.includes(currentUserId));
				}
			} catch (err) {
				setError('Error loading the post data.');
			} finally {
				setLoading(false); // Stop loading state
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
			setError('Error processing your request.');
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
			setError('Error processing your request.');
		}
	};

	// Handle adding a new comment
	const handleAddComment = async () => {
		if (!newComment.trim()) return;
		setCommentLoading(true); // Set loading while adding comment
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
				setComments([...comments, [data]]);
				setNewComment('');
			} else {
				setError('Failed to add comment.');
			}
		} catch (err) {
			setError('Error adding comment.');
		} finally {
			setCommentLoading(false);
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen bg-gray-900 text-white'>
				<p>Loading post...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex justify-center items-center min-h-screen bg-gray-900 text-red-500'>
				<p>{error}</p>
			</div>
		);
	}

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
					<p
						className='text-white mb-4 text-justify'
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>

					{/* Display likes and dislikes */}
					<div className='flex items-center mb-4 space-x-4'>
						<button
							className={`flex items-center space-x-1 ${
								hasLiked ? 'text-red-500' : 'text-gray-400'
							}`}
							onClick={handleLike}
							disabled={loading}
						>
							<FaHeart />
							<span>{likes} likes</span>
						</button>
						<button
							className={`flex items-center space-x-1 ${
								hasDisliked ? 'text-blue-500' : 'text-gray-400'
							}`}
							onClick={handleDislike}
							disabled={loading}
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
							disabled={commentLoading}
						>
							{commentLoading ? 'Posting...' : 'Post Comment'}
						</button>
					</div>

					{/* Display comments */}
					<div className='bg-slate-800 p-4 rounded-lg'>
						<h2 className='text-xl font-semibold text-violet-400 text-center mb-2'>
							Comments
						</h2>
						{comments.length > 0 ? (
							<ul>
								{comments.map((comment) => (
									<li key={comment[0]?._id} className='text-white mb-2'>
										<div className='flex flex-row gap-2 items-center'>
											<Avatar rounded />
											<p className='text-gray-100 md:text-lg text-sm'>
												{comment[0]?.content}
											</p>
										</div>
										<small className='text-xs text-gray-400'>
											by {comment[0]?.author || 'Unknown'}
										</small>
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
