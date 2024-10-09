import { useEffect, useState } from 'react';
import { url } from '../url';
import Blogcard from './Blogcard';

function Blogs() {
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		try {
			let data = await fetch(`${url}/post`);
			data = await data.json();
			setPosts(data);
		} catch (e) {
			console.error('Error fetching posts:', e);
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-4xl font-bold text-center mb-8 text-white relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-violet-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-violet-700 py-4'>
				Latest <span className='text-4xl font-bold text-violet-400'>Blog</span>{' '}
				Posts
			</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{posts.map((post, index) => (
					<Blogcard key={index} post={post} />
				))}
			</div>
		</div>
	);
}

export default Blogs;
