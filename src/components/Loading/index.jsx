import { useEffect, useRef, useState, useContext } from 'react';
import { cx } from '@linaria/core';
import { preloadImages } from '@/utils';
import LoadingGif from '@images/loading.gif';
import { fixedFullScreen, flexCenter } from '@styles/utils.style';
import { ProgressContext } from '@/contexts/Progress';
import {
	LoadingStyle,
	LoadingImgStyle,
	LoadingBarStyle
} from './Loading.style';

const images = import.meta.glob('/src/assets/images/*.png', {
	eager: true,
	import: 'default'
});
const imgList = Object.values(images);

function Loading() {
	const [loadedNum, setLoadedNum] = useState(0);
	const { loaded } = useContext(ProgressContext);
	const isFirst = useRef(true);

	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false;

			preloadImages(
				imgList,
				() => setLoadedNum((pre) => pre + 1),
				() => setTimeout(loaded, 600)
			);
		}
	}, [loaded]);

	return (
		<LoadingStyle className={cx(fixedFullScreen, flexCenter)}>
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
