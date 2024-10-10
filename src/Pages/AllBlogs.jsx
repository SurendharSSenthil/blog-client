import { useEffect, useState } from 'react';
import { url } from '../url';
import Blogcard from '../Components/Blogcard';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Spinner } from 'flowbite-react';

function AllBlogs() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true); // State for loading

	const getPosts = async () => {
		try {
			setLoading(true); // Start loading
			let data = await fetch(`${url}/post`);
			data = await data.json();
			setPosts(data);
		} catch (e) {
			console.error('Error fetching posts:', e);
		} finally {
			setLoading(false); // Stop loading
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className='flex flex-col min-h-screen bg-slate-900'>
			<Header />
			<div className='container mx-auto p-6 pt-16 flex-grow'>
				<h1 className='md:text-4xl text-2xl font-bold text-center mb-8 text-white relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-violet-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-violet-700 py-4'>
					<span className='md:text-4xl text-2xl font-bold text-violet-400'>
						Blog
					</span>{' '}
					Posts
				</h1>

				{loading ? (
					<div className='flex justify-center items-center h-96'>
						<Spinner color='purple' size='xl' />
					</div>
				) : posts.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{posts.map((post, index) => (
							<Blogcard key={index} post={post} />
						))}
					</div>
				) : (
					<p className='text-center text-gray-400 mt-8'>
						No blog posts available.
					</p>
				)}
			</div>

			<Footer />
		</div>
	);
}

export default AllBlogs;
