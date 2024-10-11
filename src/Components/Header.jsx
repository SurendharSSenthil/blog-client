import React, { useEffect, useState } from 'react';
import { Button, Navbar } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [islog, setIslog] = useState(false);
	const [role, setRole] = useState(null);

	const isActive = (path) => location.pathname === path;

	useEffect(() => {
		const token = localStorage.getItem('token');
		const user = JSON.parse(localStorage.getItem('user'));
		const userRole = user?.role;
		setIslog(!!token);
		setRole(userRole);
	}, []);

	const signOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setIslog(false);
		setRole(null);
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

				{islog && role === 'A' && (
					<Navbar.Link
						href='/create'
						className={`text-white ${
							isActive('/create') ? 'text-violet-500' : ''
						}`}
					>
						Create
					</Navbar.Link>
				)}

				{!islog && (
					<Navbar.Link
						href='/auth'
						className={`text-white my-auto ${
							isActive('/auth') ? 'text-violet-500' : ''
						}`}
					>
						Login
					</Navbar.Link>
				)}

				{islog && (
					<Button
						onClick={signOut}
						className='h-7 md:mt-0 mt-4 bg-violet-500 hover:bg-violet-400 duration-150 flex flex-col items-center'
					>
						LogOut
					</Button>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
