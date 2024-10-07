import React from 'react';
// import Rocket from '../assets/rocket.png';
import ParticlesBackground from './ParticlesBackground';

function Hero() {
	return (
		<div className='relative bg-transparent min-h-[100vh] flex items-center justify-center bg-slate-900'>
			<ParticlesBackground />
			<div className='relative text-center z-10'>
				<h1 className='text-white text-5xl font-bold poppins mb-4'>
					Welcome to <span className='text-violet-500'>MyVerse</span> 🌍
				</h1>
				<h3 className='text-violet-500 text-2xl mb-2'>
					Sharing my thoughts, experiences, and passions.
				</h3>
				<p className='text-white max-w-md mx-auto text-xl'>
					Join me on my personal journey as I explore the moments that shape who
					I am. ✨
				</p>
				<a
					className='bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 mt-4 rounded-md poppins duration-200 font-semibold inline-block'
					href='https://surendhar.netlify.app'
					target='_blank'
					rel='noopener noreferrer'
				>
					🚀 My Portfolio
				</a>
			</div>
		</div>
	);
}

export default Hero;
