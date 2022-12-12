import { useCallback } from 'react';
import { RouterProvider } from 'react-router-dom';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

import particlesJson from '@/assets/configs/particlesjs-config.json?url';
import router from './router';
import Background from './components/Background';
import ProgressBar from './components/ProgressBar';
import Footer from './components/Footer';
import { ProgressProvider } from './contexts/Progress';
import { ReactComponent as NoiseSvg } from '@images/filter_noise.svg';
import { ReactComponent as GradientSvg } from '@images/filter_gradient.svg';

function App() {
	const particlesInit = useCallback(async (engine) => {
		await loadFull(engine);
	}, []);

	return (
		<ProgressProvider>
			<Background />
			<ProgressBar />
			<Particles url={particlesJson} init={particlesInit} />
			<RouterProvider router={router} />
			<Footer />
			<NoiseSvg />
			<GradientSvg />
		</ProgressProvider>
	);
}

export default App;
