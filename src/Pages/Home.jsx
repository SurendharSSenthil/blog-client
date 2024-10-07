import React from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import Blogs from '../Components/Blogs';
import Footer from '../Components/Footer';

function Home() {
	return (
		<div className='bg-slate-900 w-full h-full'>
			<Header />
			<Hero />
			<Blogs />
			<Footer />
		</div>
	);
}

export default Home;
