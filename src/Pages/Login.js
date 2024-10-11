import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../url';

function Auth() {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);

	// Handle input change
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle form submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		const urls = isLogin ? `${url}/users/login` : `${url}/users/add-user`; // API endpoint based on login or signup
		try {
			const response = await fetch(urls, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			const data = await response.json();

			if (response.ok) {
				// If login, store the JWT token and navigate to home
				if (isLogin) {
					localStorage.setItem('token', data.token);
					localStorage.setItem('user', JSON.stringify(data.user));
					navigate('/');
				} else {
					// If signup successful, switch to login
					setIsLogin(true);
				}
			} else {
				// Handle error
				setError(data.message);
			}
		} catch (error) {
			setError('Server error. Please try again later.');
		}
	};

	// Toggle between login and signup
	const toggleAuthMode = () => {
		setIsLogin(!isLogin);
		setError(null); // Reset error when toggling
		setFormData({
			username: '',
			email: '',
			password: '',
		});
	};

	return (
		<div className='min-h-screen flex justify-center items-center bg-slate-900'>
			<div className='bg-slate-800 p-8 rounded shadow-md w-full max-w-md'>
				<h1 className='text-3xl font-bold text-violet-500 text-center mb-6'>
					{isLogin ? 'Login' : 'Signup'}
				</h1>
				<form onSubmit={handleSubmit}>
					{!isLogin && (
						<div className='mb-4'>
							<label className='block text-gray-400 mb-2'>Username</label>
							<input
								type='text'
								name='username'
								value={formData.username}
								onChange={handleChange}
								className='w-full p-2 bg-slate-700 text-white rounded focus:outline-none focus:ring focus:border-violet-500'
								required={!isLogin}
							/>
						</div>
					)}
					<div className='mb-4'>
						<label className='block text-gray-400 mb-2'>Email</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='w-full p-2 bg-slate-700 text-white rounded focus:outline-none focus:ring focus:border-violet-500'
							required
						/>
					</div>
					<div className='mb-6'>
						<label className='block text-gray-400 mb-2'>Password</label>
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							className='w-full p-2 bg-slate-700 text-white rounded focus:outline-none focus:ring focus:border-violet-500'
							required
						/>
					</div>
					{error && <p className='text-red-500 text-center mb-4'>{error}</p>}
					<button
						type='submit'
						className='w-full bg-violet-500 text-white p-2 rounded hover:bg-violet-600'
					>
						{isLogin ? 'Login' : 'Signup'}
					</button>
				</form>
				<p className='text-center text-gray-400 mt-4'>
					{isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
					<span
						onClick={toggleAuthMode}
						className='text-violet-400 hover:underline cursor-pointer'
					>
						{isLogin ? 'Signup' : 'Login'}
					</span>
				</p>
			</div>
		</div>
	);
}

export default Auth;
