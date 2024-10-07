// src/components/ParticlesBackground.js

import React, { useEffect } from 'react';

const ParticlesBackground = () => {
	useEffect(() => {
		window.particlesJS.load('particles-js', 'particles.json', function () {
			console.log('callback - particles.js config loaded');
		});
	}, []);

	return <div id='particles-js' className='fixed inset-0 z-0' />;
};

export default ParticlesBackground;
