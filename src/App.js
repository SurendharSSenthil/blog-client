import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetails from './Components/Blog';
import Home from './Pages/Home';
import CreatePost from './Pages/Create';
import About from './Pages/About';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/create' element={<CreatePost />} />
			<Route path='/about' element={<About />} />
			<Route path='/post/:postId' element={<PostDetails />} />
		</Routes>
	);
}

export default App;
