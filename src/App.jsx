import { useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

import Background from './components/Background';
import ProgressBar from './components/ProgressBar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Entrance from './pages/Entrance';
import ProductOwner from './pages/ProductOwner';
import particlesJson from '@/assets/configs/particlesjs-config.json?url';

function App() {
	const particlesInit = useCallback(async (engine) => {
		await loadFull(engine);
	}, []);

	return (
		<>
			<Background />
			<ProgressBar />
			<Particles
				className="particles"
				url={particlesJson}
				init={particlesInit}
			/>
			<Routes>
				<Route path="/Extrance" element={<Entrance />} />
				<Route path="/ProductOwner" element={<ProductOwner />} />
				<Route path="/" element={<Loading />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
