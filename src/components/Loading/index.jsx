import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '@linaria/core';
import LoadingGif from '@images/loading.gif';
import { preloadImages } from '@/utils';
import {
	LoadingStyle,
	LoadingImgStyle,
	LoadingBarStyle
} from './Loading.style';
import { flexCenter } from '@styles/utils.style';

const images = import.meta.glob('/src/assets/images/*.png', {
	eager: true,
	import: 'default'
});
const imgList = Object.values(images);

function Loading() {
	const navigate = useNavigate();
	const [loadedNum, setLoadedNum] = useState(0);
	const isFirst = useRef(true);

	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false;
			document.body.classList.add('no-bg');
			preloadImages(
				imgList,
				() => setLoadedNum((pre) => pre + 1),
				() => {
					setTimeout(() => {
						// navigate('Extrance');
						// document.body.classList.remove('no-bg')
					}, 600);
				}
			);
		}
	}, [navigate]);

	return (
		<LoadingStyle className={cx(flexCenter)}>
			<LoadingImgStyle>
				<img src={LoadingGif} alt="Loading" />
			</LoadingImgStyle>
			<LoadingBarStyle
				percent={(loadedNum / imgList.length).toFixed(2)}
			></LoadingBarStyle>
		</LoadingStyle>
	);
}

export default Loading;
