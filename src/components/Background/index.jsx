import { useEffect, useState } from 'react';
import './index.scss';

function Background() {
	const bgImages = import.meta.glob('/src/assets/images/bg_village*.png', {
		eager: true,
		import: 'default'
	});

	const [parallax, setParallax] = useState('0%');
	
	useEffect(() => {
		let timer = null;

		const handleMouse = (e) => {
			if (!timer) {
				timer = setTimeout(() => {
					setParallax(
						((e.pageX / window.innerWidth) * 10 - 5).toFixed(2) + '%'
					);
					timer = null
				}, 10)
			}
		};

		window.addEventListener('mousemove', handleMouse);

		return () => {
			window.removeEventListener('mousemove', handleMouse);
			timer && clearTimeout(timer);
		}
	}, []);

	return (
		<div className="bgRoot" style={{ '--bg-parallax': parallax }}>
			{Object.keys(bgImages).map((imgKey, index) => (
				<div
					key={imgKey}
					className={['bgVillage', `bgVillage-${index}`].join(' ')}
				>
					<img src={bgImages[imgKey]} alt="background" />
				</div>
			))}
		</div>
	);
}

export default Background;
