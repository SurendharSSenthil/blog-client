import React from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import Blogs from '../Components/Blogs';

function Home() {
	return (
		<div className='bg-slate-900 w-full h-full'>
			<Header />
			<Hero />
			<Blogs />
		</div>
	);
}

export default Home;
