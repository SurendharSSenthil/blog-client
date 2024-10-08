import React from 'react';
import { Navbar } from 'flowbite-react';

function Header() {
	return (
		<Navbar
			fluid={true}
			rounded={true}
			className='fixed w-full top-0 z-50 bg-slate-900 shadow-md poppins'
		>
			<Navbar.Brand href='/'>
				<h1 className='text-2xl text-white font-bold poppins'>
					My<span className='text-violet-500'>Verse 🌍</span>
				</h1>
			</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Navbar.Link href='/' active={true} className='text-white'>
					Home
				</Navbar.Link>
				<Navbar.Link href='/blog' className='text-white'>
					Blog
				</Navbar.Link>
				<Navbar.Link href='/about' className='text-white'>
					About
				</Navbar.Link>
				<Navbar.Link href='/contact' className='text-white'>
					Contact
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
