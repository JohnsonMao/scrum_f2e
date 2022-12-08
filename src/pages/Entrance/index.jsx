import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '@linaria/core';
import ChatBox from '@/components/ChatBox';
import Button from '@/components/Button';
import LogoPng from '@images/logo.png';
import {
	fixedFullScreen,
	flexCenter,
	flexColumn,
	positionCenter,
	positionCenterX
} from '@styles/utils.style';
import { MainStyle, LeafStyle, LogoStyle, LightPoint } from './Main.style';

export default function Entrance() {
	const leafImages = import.meta.glob('/src/assets/images/bg_leaf*.png', {
		eager: true,
		import: 'default'
	});

	const navigate = useNavigate();
	const [stage, setStage] = useState(0);
	const chatBoxRef = useRef(null);
	const buttonRef = useRef([]);
	const text =
		'呦呼 ， 歡迎進入 _HEIGHTLIGHT_「SCRUM 新手村」_HEIGHTLIGHT_ ， 在正式加入專案開發之前 ，需要請你先了解 Scrum 的流程與精神 ！\n\n請接受挑戰任務 ， 成功通過 Scrum 新手村的挑戰任務吧～';

	const fileName = (path) => /\/([^/]+).png$/.exec(path)?.[1] || '';

	const handleClick = (action) => {
		const chatBoxAni = chatBoxRef.current.animation.current;

		setStage(action);
		switch (action) {
			case 1:
				chatBoxAni.join();
				break;
			case 2:
				chatBoxAni.leave();
				setTimeout(() => {
					navigate('/ProductOwner');
				}, 600);
				break;
			default:
		}
	};

	useEffect(() => {
		if (stage === 0) {
			const buttonAni0 = buttonRef.current[0].animation.current;
			buttonAni0.join();
		}
	}, [stage])

	return (
		<MainStyle className={cx(fixedFullScreen)}>
			{Object.keys(leafImages).map((imgKey) => (
				<LeafStyle key={imgKey} className={cx(fileName(imgKey))}>
					<img src={leafImages[imgKey]} alt="Leaf" />
				</LeafStyle>
			))}
			<LogoStyle className={cx(positionCenter)}>
				<LightPoint className="l_sm"></LightPoint>
				<LightPoint className="l_ee"></LightPoint>
				<LightPoint className="l_gg"></LightPoint>
				<LightPoint className="r_sm"></LightPoint>
				<LightPoint className="r_ee"></LightPoint>
				<LightPoint className="r_gg"></LightPoint>
				<img src={LogoPng} alt="Scrum 新手村" />
				<h2 className={cx(positionCenterX)}>深入敏捷の村一探究竟</h2>
				<Button
					ref={(el) => buttonRef.current[0] = el}
					className={cx(positionCenterX)}
					onClick={() => handleClick(1)}
					text="進入村莊"
				/>
			</LogoStyle>
			<div className={cx(fixedFullScreen, flexCenter, flexColumn)}>
				<ChatBox
					ref={chatBoxRef}
					text={text}
					name="（謎之音）"
					nextArrow={false}
				/>
				<Button
					ref={(el) => buttonRef.current[1] = el}
					onClick={() => handleClick(2)}
					text="接受挑戰"
				/>
			</div>
		</MainStyle>
	);
}
