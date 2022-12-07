import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '@linaria/core';
import ChatBox from '@/components/ChatBox';
import Button from '@/components/Button';
import LogoPng from '@images/logo.png';
import { fixedFullScreen, flexCenter, flexColumn, positionCenter } from '@styles/utils.style';
import { MainStyle, LeafStyle, LogoStyle } from './Main.style';
// import './index.scss';

export default function Entrance() {
	const leafImages = import.meta.glob('/src/assets/images/bg_leaf*.png', {
		eager: true,
		import: 'default'
	});

	const navigate = useNavigate();
	const [stage, setStage] = useState('hello');
	const chatBoxRef = useRef(null);
	const handleClick = (action) => {
		const chatBoxAni = chatBoxRef.current.animation.current;

		setStage(action);
		if (action === 'go') {
			chatBoxAni.leave();
			setTimeout(() => {
				navigate('/ProductOwner');
			}, 600);
		} else {
			chatBoxAni.join();
		}
	};
	const fileName = (path) => /\/([^/]+).png$/.exec(path)?.[1] || '';

	const text =
		'呦呼 ， 歡迎進入 _HEIGHTLIGHT_「SCRUM 新手村」_HEIGHTLIGHT_ ， 在正式加入專案開發之前 ，需要請你先了解 Scrum 的流程與精神 ！\n\n請接受挑戰任務 ， 成功通過 Scrum 新手村的挑戰任務吧～';

	return (
		// <MainStyle className={['entrance', stage].join(' ')}>
		<MainStyle className={cx(fixedFullScreen)}>
			{Object.keys(leafImages).map((imgKey) => (
				<LeafStyle
					key={imgKey}
					className={['entrance__leaf', fileName(imgKey)].join(' ')}
				>
					<img src={leafImages[imgKey]} alt="Leaf" />
				</LeafStyle>
			))}
			<LogoStyle className={cx(fixedFullScreen)}>
				<i className="lightPoint l_sm"></i>
				<i className="lightPoint l_ee"></i>
				<i className="lightPoint l_gg"></i>
				<i className="lightPoint r_sm"></i>
				<i className="lightPoint r_ee"></i>
				<i className="lightPoint r_gg"></i>
				<img className={cx(positionCenter)} src={LogoPng} alt="Scrum 新手村" />
				<h2 className={cx(positionCenter)}>深入敏捷の村一探究竟</h2>
				<Button
					className={cx(positionCenter)}
					onClick={() => handleClick('join')}
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
					as="button"
					onClick={() => handleClick('go')}
					text="接受挑戰"
				/>
			</div>
		</MainStyle>
	);
}
