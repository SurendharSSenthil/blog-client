import React from 'react';

function Header() {
	return (
		<div className='bg-slate-700 w-full flex flex-row items-center p-4 fixed top-0 left-0 z-50'>
			<h1 className='text-2xl text-white font-bold hover:cursor-pointer poppins'>
				My<span className='text-violet-500'>Verse 🌍</span>
			</h1>
		</div>
	);
}

export default Header;
