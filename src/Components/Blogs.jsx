import { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { url } from '../url';
import Rocket from '../assets/rocket.png';

function Blogs() {
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		try {
			let data = await fetch(`${url}/post`);
			data = await data.json();
			console.log(data);
			setPosts(data);
		} catch (e) {
			console.error('Error fetching posts:', e);
		}
	};

	const fetchImage = (title) => {
		// Fetch an image using a placeholder service or unsplash API
		return `https://source.unsplash.com/400x300/?${encodeURIComponent(title)}`;
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-4xl font-bold text-center mb-8 text-violet-500'>
				Latest Blog Posts
			</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{posts &&
					posts?.map((post) => (
						<Card
							key={post._id}
							className='hover:shadow-lg transition-shadow bg-slate-800 z-[10]'
						>
							<img src={Rocket} alt='rocket' className='w-full h-auto' />
							<h2 className='text-xl font-semibold text-gray-900'>
								{post.title}
							</h2>
							<p className='text-gray-700 mb-2'>
								{post.content.substring(0, 150)}...
							</p>
							<p className='text-sm text-gray-500 mb-2'>
								<strong>Author ID:</strong> {post.author}
							</p>
							{post.categories.length > 0 && (
								<p className='text-sm text-gray-500 mb-2'>
									<strong>Categories:</strong> {post.categories.join(', ')}
								</p>
							)}
							<p className='text-sm text-gray-500 mb-2'>
								<strong>Reactions:</strong>{' '}
								<span className='mr-2'>❤️ {post.likes.length}</span>{' '}
								<span>👎 {post.dislikes.length}</span>
							</p>
							<p className='text-sm text-gray-500'>
								<strong>Published:</strong> {post.published ? 'Yes' : 'No'}
							</p>
							<a
								href={`/post/${post._id}`}
								className='text-purple-600 hover:underline mt-4 block'
							>
								Read more →
							</a>
						</Card>
					))}
			</div>
		</div>
	);
}

export default Blogs;
