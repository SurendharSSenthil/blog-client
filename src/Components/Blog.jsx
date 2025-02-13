import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';
import { Avatar, Spinner } from 'flowbite-react';
import { url } from '../url';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function PostDetails() {
	const { postId } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [hasLiked, setHasLiked] = useState(false);
	const [hasDisliked, setHasDisliked] = useState(false);
	const [newComment, setNewComment] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [commentLoading, setCommentLoading] = useState(false);
	const [notification, setNotification] = useState(null);
	const user = JSON.parse(localStorage.getItem('user'));
	async function fetchPost() {
		const token = localStorage.getItem('token');
		const user = JSON.parse(localStorage.getItem('user'));

		setLoading(true);
		try {
			const response = await fetch(`${url}/post/post/${postId}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Failed to fetch post');
			}

			if (data) {
				const postData = data;
				setPost(postData.posts[0]);
				setComments(postData.comments || []);
				setLikes(postData.posts[0].likes?.length || 0);
				setDislikes(postData.posts[0].dislikes?.length || 0);

				const currentUserId = user?._id;
				setHasLiked(postData.posts[0].likes.includes(currentUserId));
				setHasDisliked(postData.posts[0].dislikes.includes(currentUserId));
			}
		} catch (err) {
			console.error(err);
			setError('Error loading the post data.');
		} finally {
			setLoading(false); // Hide loading state
		}
	}

	// Fetch post data and comments
	useEffect(() => {
		fetchPost();
	}, [postId]);

	// Handle like action for post
	const handleLike = async () => {
		const token = localStorage.getItem('token');

		if (!token) {
			navigate('/auth');
		}
		const user = JSON.parse(localStorage.getItem('user'));
		try {
			const action = hasLiked ? 'unlike' : 'like';
			const response = await fetch(`${url}/post/${action}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postId, userId: user._id }),
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
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/auth');
		}
		const user = JSON.parse(localStorage.getItem('user'));
		try {
			const action = hasDisliked ? 'like' : 'unlike';
			const response = await fetch(`${url}/post/${action}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postId, userId: user._id }),
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
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/auth');
			return; // Exit early if there's no token
		}

		const userData = JSON.parse(localStorage.getItem('user'));
		console.log(userData);
		const userId = userData ? userData._id : null;
		console.log(userId);
		setCommentLoading(true); // Set loading while adding comment

		try {
			const response = await fetch(`${url}/comments/comment`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					postId,
					content: newComment,
					userId,
				}),
			});

			// Log the response status and text
			console.log('Response Status:', response.status);
			const responseText = await response.text(); // Get the raw response text
			console.log('Response Text:', responseText); // Log the raw text response

			if (response.ok) {
				const data = JSON.parse(responseText); // Parse the JSON only if response is OK
				fetchPost();
				setNewComment('');
			} else {
				setError('Failed to add comment.');
			}
		} catch (err) {
			console.error('Error adding comment:', err);
			setError('Error adding comment.');
		} finally {
			setCommentLoading(false);
		}
	};

	// Handle deleting the post
	const handleDelete = async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/auth');
		}
		try {
			const response = await fetch(`${url}/post/${postId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				setNotification('Post deleted successfully.');
				setTimeout(() => {
					setNotification(null);
					navigate('/');
				}, 3000);
			} else {
				setNotification('Failed to delete the post.');
				setTimeout(() => setNotification(null), 3000);
			}
		} catch (err) {
			console.error('Error @handleDelete:', err);
			setNotification('An error occurred while deleting the post.');
			setTimeout(() => setNotification(null), 3000);
		}
	};

	if (error) {
		return (
			<div className='flex justify-center items-center min-h-screen bg-gray-900 text-red-500'>
				<p>{error}</p>
			</div>
		);
	}

	return (
		<div className='w-full  bg-slate-900 min-h-screen overflow-x-hidden flex flex-col justify-between'>
			<Header />
			{loading ? (
				<div className='flex justify-center items-center h-96'>
					<Spinner color='purple' size='xl' />
				</div>
			) : (
				<div className="shadow-lg w-full mx-auto md:px-16 md:py-16 py-10 px-6">
				<img
					src={post.imageUrl || 'https://picsum.photos/800/400'}
					alt="Blog Image"
					className="w-full h-60 object-cover rounded-lg"
				/>
				<div>
					<h1 className="md:text-4xl text-2xl poppins font-semibold text-violet-500 text-center my-4">
						{post.title}
					</h1>
					<div className="text-white mb-4 text-justify">
						<p
							dangerouslySetInnerHTML={{
								__html: post.content
									.replace(
										/<pre(.*?)>([\s\S]*?)<\/pre>/g,
										`<pre class="overflow-x-auto bg-gray-700 p-3 rounded-md text-sm my-2">$2</pre>`
									)
									
							}}
						/>
					</div>
					{user && user?.role === 'A' && (
						<button
							className="bg-violet-500 text-white px-4 py-2 rounded-lg my-2 hover:bg-violet-600 transition"
							onClick={handleDelete}
						>
							Delete Post
						</button>
					)}

					{/* Display likes and dislikes */}
					<div className="flex items-center mb-4 space-x-4">
						<button
							className={`flex items-center space-x-1 ${
								hasLiked ? 'text-red-500' : 'text-gray-400'
							} hover:text-red-400 transition`}
							onClick={handleLike}
							disabled={loading}
						>
							<FaHeart />
							<span>{likes} likes</span>
						</button>
						<button
							className={`flex items-center space-x-1 ${
								hasDisliked ? 'text-blue-500' : 'text-gray-400'
							} hover:text-blue-400 transition`}
							onClick={handleDislike}
							disabled={loading}
						>
							<FaThumbsDown />
							<span>{dislikes} dislikes</span>
						</button>
					</div>

					{/* Add comment */}
					<div className="my-4">
						<textarea
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							className="w-full p-2 rounded-lg bg-slate-800 text-white resize-none"
							placeholder="Add a comment..."
						/>
						<button
							className="bg-violet-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-violet-600 transition"
							onClick={handleAddComment}
							disabled={commentLoading}
						>
							{commentLoading ? 'Posting...' : 'Post Comment'}
						</button>
					</div>

					{/* Display comments */}
					<div className="bg-slate-800 p-4 rounded-lg">
						<h2 className="text-xl font-semibold text-violet-400 text-center mb-2">
							Comments
						</h2>
						{comments.length > 0 ? (
							<ul className="space-y-4">
								{comments.map((comment) => (
									<li key={comment[0]?._id} className="text-white">
										<div className="flex flex-row gap-2 items-center">
											<Avatar rounded />
											<div>
												<p className="text-gray-100 md:text-lg text-sm break-words">
													{comment?.res[0]?.content}
												</p>
												<small className="text-xs text-gray-400">
													by {comment?.user[0]?.username || 'Unknown'}
												</small>
											</div>
										</div>
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-400">No comments yet.</p>
						)}
					</div>
				</div>
			</div>

			)}
			<Footer />
		</div>
	);
}

export default PostDetails;
