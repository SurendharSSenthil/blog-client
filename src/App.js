import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetails from './Components/Blog';
import Home from './Pages/Home';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/post/:postId' element={<PostDetails />} />
		</Routes>
	);
}

export default App;
