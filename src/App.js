import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PostDetails from './Components/Blog';
import Home from './Pages/Home';
import CreatePost from './Pages/Create';
import About from './Pages/About';
import AllBlogs from './Pages/AllBlogs';

function App() {
	const title = 'MyVerse | Surendhar';
	const [flickeringTitle, setFlickeringTitle] = useState(title);
	function isAlpha(str) {
		return /^[A-Za-z]+$/.test(str);
	}
	useEffect(() => {
		let flickerIndex = 0;

		const interval = setInterval(() => {
			const flickeredTitle = title
				.split('')
				.map((char, index) => {
					if (index == flickerIndex && !isAlpha(char)) {
						return char;
					}
					return index === flickerIndex ? '_' : char;
				})
				.join('');

			setFlickeringTitle(flickeredTitle);
			flickerIndex = (flickerIndex + 1) % title.length; // Cycle through each character
		}, 400); // Change every 300ms

		// Reset title after the last character to make it normal
		const resetTimeout = setTimeout(() => {
			// clearInterval(interval);
			setFlickeringTitle(title); // Reset to original title
		}, 400 * title.length); // Reset after flickering through all characters

		return () => {
			clearTimeout(resetTimeout); // Clean up timeout on unmount
		};
	}, [title]);

	useEffect(() => {
		document.title = flickeringTitle;
	}, [flickeringTitle]);
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/blogs' element={<AllBlogs />} />
			<Route path='/create' element={<CreatePost />} />
			<Route path='/about' element={<About />} />
			<Route path='/post/:postId' element={<PostDetails />} />
		</Routes>
	);
}

export default App;
