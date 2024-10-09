import React from 'react';
import Profile from '../assets/profile.jpg';

function About() {
	return (
		<div className='container mx-auto min-h-screen bg-slate-900 text-white p-6'>
			<div className='md:px-16 md:py-10 shadow-lg rounded-lg bg-slate-800'>
				<h1 className='md:text-4xl text-2xl poppins font-semibold text-white text-center mb-4 poppins'>
					About My<span className='text-violet-500'>Verse 🌍</span>
				</h1>
				<p className='text-gray-300 text-lg leading-relaxed mb-6'>
					Welcome to <span className='text-violet-500'>MyVerse</span>! This is a
					place where I share my journey as a budding full-stack developer, my
					learnings, challenges, and insights into the world of full stack
					development.
				</p>
				<p className='text-gray-300 text-lg leading-relaxed mb-6'>
					As a prefinal-year Computer Science student with a passion for
					learning and building, I created this blog to document my experiences
					and to connect with like-minded individuals. I'm constantly exploring
					new frontiers in full-stack development from building web apps.
				</p>
				<p className='text-gray-300 text-lg leading-relaxed'>
					Feel free to explore, engage with the content, and share your thoughts
					in the comments section. I appreciate all the support and look forward
					to growing together as we navigate the ever-evolving tech landscape.
					Thanks for stopping by!
				</p>

				<h2 className='text-2xl font-bold text-violet-400 text-center mt-10 mb-4'>
					About Me
				</h2>
				<div className='flex flex-col items-center text-center'>
					<img
						src={Profile}
						alt='Profile'
						className='w-32 h-32 rounded-full mx-auto mb-4'
					/>
					<h3 className='text-xl text-violet-400 font-semibold'>
						Surendhar{' '}
						<span className='text-xl text-white font-semibold'>Senthil</span>
					</h3>
					<p className='text-gray-400'>
						Full-Stack Developer (Learner) | 3rd Year CSE Student | GCT-CBE
					</p>
					<p className='text-gray-400 mt-2'>
						Learning. Building. Growing. Sharing.
					</p>
				</div>

				{/* Footer */}
				<div className='mt-10 text-center text-gray-400'>
					<p className='text-sm'>
						{`© ${new Date().getFullYear()} Surendhar's Blog.`}
					</p>
					<p className='text-sm'>
						Built with ❤️ by Surendhar. Fueled by curiosity and coffee.
					</p>
				</div>
			</div>
		</div>
	);
}

export default About;
