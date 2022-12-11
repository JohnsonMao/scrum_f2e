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
import Transition from '@/components/Transition';
import { MainStyle, LeafStyle, LogoStyle, LightPoint } from './Main.style';

export default function Entrance() {
	const leafImages = import.meta.glob('/src/assets/images/bg_leaf*.png', {
		eager: true,
		import: 'default'
	});

	const navigate = useNavigate();
	const [stage, setStage] = useState(0);
	const [chatBoxState, setChatBoxState] = useState({
		aniType: '',
		name: '（謎之音）',
		text: '呦呼 ， 歡迎進入 _HEIGHTLIGHT_「SCRUM 新手村」_HEIGHTLIGHT_ ， 在正式加入專案開發之前 ，需要請你先了解 Scrum 的流程與精神 ！\n\n請接受挑戰任務 ， 成功通過 Scrum 新手村的挑戰任務吧～',
		nextArrow: false
	});
	const [buttonState, setButtonState] = useState([
		{
			aniType: 'join',
			aniDelay: 600,
			text: '進入村莊'
		},
		{
			aniType: '',
			aniDelay: 1700,
			text: '接受挑戰'
		}
	]);

	const fileName = (path) => /\/([^/]+).png$/.exec(path)?.[1] || '';

	useEffect(() => {
		switch (stage) {
			case 1:
				setButtonState((pre) => {
					const buttons = [...pre];
					buttons[0].aniType = 'leave';
					buttons[1].aniType = 'join';
					return buttons;
				});
				setChatBoxState((pre) => ({
					...pre,
					aniType: 'join'
				}));
				break;
			case 2:
				setChatBoxState((pre) => ({
					...pre,
					aniType: 'leave',
					aniCallback: () => {
						setTimeout(() => {
							navigate('/ProductOwner');
						}, 150);
					}
				}));
				setButtonState((pre) => {
					const buttons = [...pre];
					buttons[1].aniType = 'leave';
					return buttons;
				});
				break;
			default:
		}
	}, [stage, navigate])

	return (
		<>
			{Object.keys(leafImages).map((imgKey) => (
				<LeafStyle
					key={imgKey}
					stage={stage}
					className={cx(fileName(imgKey))}
				>
					<img src={leafImages[imgKey]} alt="Leaf" />
				</LeafStyle>
			))}
			<MainStyle className={cx(fixedFullScreen)}>
				<Transition show={stage === 0}>
					<LogoStyle className={cx(positionCenter)}>
						<LightPoint className="sm l_sm"></LightPoint>
						<LightPoint className="ee l_ee"></LightPoint>
						<LightPoint className="gg l_gg"></LightPoint>
						<LightPoint className="sm r_sm"></LightPoint>
						<LightPoint className="ee r_ee"></LightPoint>
						<LightPoint className="gg r_gg"></LightPoint>
						<img src={LogoPng} alt="Scrum 新手村" />
						<div className={cx(positionCenterX, 'content')}>
							<h2>深入敏捷の村一探究竟</h2>
							<Button
								onClick={() => setStage(1)}
								{...buttonState[0]}
							/>
						</div>
					</LogoStyle>
				</Transition>
				<div className={cx(fixedFullScreen, flexCenter, flexColumn, 'welcome')}>
					<ChatBox className="welcome__text" {...chatBoxState} />
					<Button
						onClick={() => setStage(2)}
						{...buttonState[1]}
					/>
				</div>
			</MainStyle>
		</>
	);
}
