import React from 'react';
import { Navbar } from 'flowbite-react';
import { useLocation } from 'react-router-dom';

function Header() {
	const location = useLocation();

	// Function to check if the current path matches the link
	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<Navbar
			fluid={true}
			rounded={true}
			className='fixed w-full top-0 z-[999] bg-slate-900 shadow-lg poppins'
		>
			<Navbar.Brand href='/'>
				<h1 className='text-2xl text-white font-bold poppins'>
					My<span className='text-violet-500'>Verse 🌍</span>
				</h1>
			</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Navbar.Link
					href='/'
					className={`text-white ${isActive('/') ? 'text-violet-500' : ''}`}
				>
					Home
				</Navbar.Link>
				<Navbar.Link
					href='/blogs'
					className={`text-white ${
						isActive('/blogs') ? 'text-violet-500' : ''
					}`}
				>
					Blogs
				</Navbar.Link>
				<Navbar.Link
					href='/about'
					className={`text-white ${
						isActive('/about') ? 'text-violet-500' : ''
					}`}
				>
					About
				</Navbar.Link>
				<Navbar.Link
					href='/create'
					className={`text-white ${
						isActive('/create') ? 'text-violet-500' : ''
					}`}
				>
					Create
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
