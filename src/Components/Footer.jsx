import { Footer } from 'flowbite-react';
import {
	BsDribbble,
	BsFacebook,
	BsGithub,
	BsInstagram,
	BsTwitter,
} from 'react-icons/bs';

export default function Component() {
	return (
		<Footer bgDark>
			<div className='w-full z-[70]'>
				<div className='grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4'>
					<div>
						<Footer.Title title='help center' />
						<Footer.LinkGroup col>
							<Footer.Link href='#'>Discord Server</Footer.Link>
							<Footer.Link href='#'>Twitter</Footer.Link>
							<Footer.Link href='#'>Facebook</Footer.Link>
							<Footer.Link href='#'>Contact Us</Footer.Link>
						</Footer.LinkGroup>
					</div>
				</div>
				<div className='w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between '>
					<Footer.Copyright
						href='#'
						by='Surendhar Senthil'
						year={new Date().getFullYear()}
						className='text-white'
					/>
					<div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
						<Footer.Icon href='#' icon={BsFacebook} />
						<Footer.Icon href='#' icon={BsInstagram} />
						<Footer.Icon href='#' icon={BsTwitter} />
						<Footer.Icon href='#' icon={BsGithub} />
						<Footer.Icon href='#' icon={BsDribbble} />
					</div>
				</div>
			</div>
		</Footer>
	);
}
