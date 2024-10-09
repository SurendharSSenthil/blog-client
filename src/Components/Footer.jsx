import { Footer } from 'flowbite-react';
import { BsLinkedin, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function Component() {
	return (
		<Footer bgDark className='mt-16'>
			<div className='w-full z-[70]'>
				<div className='w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between '>
					<Footer.Copyright
						href='#'
						by='Surendhar Senthil'
						year={new Date().getFullYear()}
						className='text-white'
					/>
					<div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
						<Footer.Icon
							href='https://www.linkedin.com/in/surendhar-senthil-574710286/'
							target='_blank'
							icon={BsLinkedin}
						/>
						<Footer.Icon
							href='https://www.instagram.com/surendhar3525'
							target='_blank'
							icon={BsInstagram}
						/>
						<Footer.Icon
							href='https://x.com/SurendharS05'
							target='_blank'
							icon={BsTwitter}
						/>
						<Footer.Icon
							href='https://github.com/SurendharSSenthil/'
							target='_blank'
							icon={BsGithub}
						/>
					</div>
				</div>
			</div>
		</Footer>
	);
}
