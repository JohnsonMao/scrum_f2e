import { useCallback, useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

import particlesJson from '@/assets/configs/particlesjs-config.json?url';
import router from '@/router';
import Loading from '@/components/Loading';
import Background from '@/components/Background';
import ProgressBar from '@/components/ProgressBar';
import Footer from '@/components/Footer';
import NoiseSvg from '@images/filter_noise.svg?react';
import GradientSvg from '@images/filter_gradient.svg?react';
import { ProgressContext } from '@/contexts/Progress';

function App() {
	const particlesInit = useCallback(async (engine) => {
		await loadFull(engine);
	}, []);
	const { state } = useContext(ProgressContext);

    console.log(state);

	return (
		<>
            {state.loading && <Loading />}
			<Background />
			<ProgressBar />
			<Particles url={particlesJson} init={particlesInit} />
			{!state.loading && <RouterProvider router={router} />}
			<Footer />
			<NoiseSvg />
			<GradientSvg />
		</>
	);
}

export default App;
