import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ProgressContext } from '@/contexts/Progress';
import { Root, BgVillage } from './Background.style';
import { fixedFullScreen } from '@styles/utils.style';

function Background() {
	const bgImages = import.meta.glob('/src/assets/images/bg_village*.png', {
		eager: true,
		import: 'default'
	});

	const { state } = useContext(ProgressContext);
	const [parallax, setParallax] = useState(0);

	useEffect(() => {
		let timer = null;

		const handleMouse = (e) => {
			if (!timer) {
				timer = setTimeout(() => {
					setParallax(
						((e.pageX / window.innerWidth) * 10 - 5).toFixed(1)
					);
					timer = null;
				}, 20);
			}
		};

		window.addEventListener('mousemove', handleMouse);

		return () => {
			window.removeEventListener('mousemove', handleMouse);
			timer && clearTimeout(timer);
		};
	}, []);

	return (
		<Root parallax={parallax} className={fixedFullScreen}>
			{Object.keys(bgImages).map((imgKey) => (
				<BgVillage key={imgKey}>
					<img src={bgImages[imgKey]} alt="background" />
				</BgVillage>
			))}
		</Root>
	);
}

export default Background;
