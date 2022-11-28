import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingGif from '@images/loading.gif';
import './index.scss';

const preloadImages = (imgList, underway, accomplish) => {
	const loadImage = (src) =>
		new Promise((res, rej) => {
			const img = new Image();

			img.onload = () => res(img);
			img.onerror = () => rej(`Image src not defined: ${src}`);
			img.src = src;
		});

	function* fn() {
		for (let i = 0; i < imgList.length; i++) {
			yield loadImage(imgList[i]);
		}
	}
	const resume = (result, load) => {
		result.then((img) => {
			const { value } = load.next();
			underway && underway(img);
			if (value) {
				resume(value, load);
			} else {
				accomplish && accomplish();
			}
		});
	};

	const load = fn();
	const { value } = load.next();
	resume(value, load);
};

const images = import.meta.glob(
	['/src/assets/images/*', '!/src/assets/images/filter_*'],
	{
		eager: true,
		import: 'default'
	}
);
const imgList = Object.values(images);

function Loading() {
	const navigate = useNavigate();
	const [loadedNum, setLoadedNum] = useState(0);
	const isFirst = useRef(true);
	
	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false;
			document.body.classList.add('no-bg')
			preloadImages(
				imgList,
				() => {
					setLoadedNum(pre => pre + 1)
				},
				() => {
					setTimeout(() => {
						navigate('Extrance');
						document.body.classList.remove('no-bg')
					}, 600);
				}
			);
		}
	}, [navigate]);

	return (
		<div
			className="loading"
			style={{
				'--loading-percent': (loadedNum / imgList.length).toFixed(2)
			}}
		>
			<div className="loading__frame">
				<img src={LoadingGif} alt="Loading" />
			</div>
			<div className="loading__bar"></div>
		</div>
	);
}

export default Loading;
