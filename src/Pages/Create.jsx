import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../url';
import { Avatar } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

function CreatePost() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const navigate = useNavigate();

	// Handle post submission
	const handleSubmit = async () => {
		if (!title || !content) {
			alert('Please provide both title and content.');
			return;
		}
		try {
			const response = await fetch(`${url}/post/posts`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					content,
					imageUrl,
					userId: '667e51f194b680166eaaae20',
				}),
			});

			if (response.ok) {
				navigate('/'); // Navigate to the home page or posts list
			} else {
				console.error('Failed to create post:', response.statusText);
			}
		} catch (err) {
			console.error('Error creating post:', err);
		}
	};

	return (
		<div className='container mx-auto bg-slate-900 overflow-hidden min-h-screen'>
			<div className='shadow-lg md:px-16 md:py-6 p-6'>
				<h1 className='md:text-3xl text-2xl poppins font-semibold text-violet-500 text-center my-4'>
					New Blog Post
				</h1>

				{/* Post Title Input */}
				<div className='my-4'>
					<label className='block text-gray-400 mb-2'>Post Title</label>
					<input
						type='text'
						className='w-full p-2 rounded-lg bg-slate-800 text-gray-400'
						placeholder='Enter the title of your post'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				{/* Image URL Input */}
				<div className='my-4'>
					<label className='block text-gray-400 mb-2'>Image URL</label>
					<input
						type='text'
						className='w-full p-2 rounded-lg bg-slate-800 text-white'
						placeholder='Enter the image URL for your post'
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</div>

				{/* Rich Text Editor for Post Content */}
				<div className='my-4'>
					<label className='block text-gray-400 mb-2'>Post Content</label>
					<ReactQuill
						theme='snow'
						value={content}
						onChange={setContent}
						className='bg-white text-black'
						placeholder='Write your post content here...'
					/>
				</div>

				{/* Submit Button */}
				<div className='my-4'>
					<button
						className='bg-violet-500 text-white font-semibold hover:bg-violet-600 duration-150 px-4 py-2 rounded-lg mt-2 w-full'
						onClick={handleSubmit}
					>
						Publish Post
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreatePost;
