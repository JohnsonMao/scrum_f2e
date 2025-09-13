import React, { useEffect, useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '@linaria/core';
import Vivus from 'vivus';
import SprintSmSvg from '@images/sprint_sm.svg?react';
import StoreSvg from '@images/store.svg?react';
import StoreSpineSvg from '@images/store_spine.svg?react';
import StoreCoverSvg from '@images/store_cover.svg?react';
import Clock1Svg from '@images/clock_1.svg?react';
import Clock2Svg from '@images/clock_2.svg?react';
import Clock3Svg from '@images/clock_3.svg?react';
import Clock4Svg from '@images/clock_4.svg?react';
import Clock5Svg from '@images/clock_5.svg?react';
import BombSvg from '@images/bomb.svg?react';
import {
	roleChat,
	fixedRT,
	flexCenter,
	fixedCenterX
} from '@styles/utils.style';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Transition from '@/components/Transition';
import { useWindowClick } from '@/hooks';
import { Circle, MainStyle, StoriesStyle, StoryStyle } from './Main.style';

export default function Entrance() {
	const navigate = useNavigate();
	const [isClick] = useWindowClick(2400);
	const [stage, setStage] = useState(0);
	const [poRole, setPoRole] = useState({
		aniType: 'keep',
		name: 'po'
	});
	const [poChatBox, setPoChatBox] = useState({
		aniType: 'join',
		aniDelay: 200,
		name: 'po',
		text: '產品待辦清單好了之後 ， 我們來召集 ScrumMaster 和開發團隊共同召開_HEIGHTLIGHT_短衝規劃會議（Sprint Planning）_HEIGHTLIGHT_ 。 短衝即是一個迭代 ， 具有固定時間限制 ， 我們會在這個會議中 ， 決定要完成哪些工作事項來達到商業需求 ， 列出短衝待辦清單 （Sprint Backlog） ， 並由開發團隊在接下來的產品開發週期裡執行 。'
	});
	const [smRole, setSmRole] = useState({
		aniType: '',
		name: 'sm'
	});
	const [smChatBox, setSmChatBox] = useState({
		aniType: '',
		name: 'sm'
	});
	const [eeRole, setEeRole] = useState({
		aniType: '',
		name: 'ee'
	});
	const [eeChatBox, setEeChatBox] = useState({
		aniType: '',
		name: 'ee'
	});
	const [ggRole, setGgRole] = useState({
		aniType: '',
		name: 'gg'
	});
	const [roles, setRoles] = useState({
		po: '',
		sm: '',
		ee: '',
		gg: ''
	});
	const sprintSmId = useId();
	const storeId = useId();
	const storeCoverId = useId();
	const clockId = useId();
	const [storiesClassName, setStoriesClassName] = useState('');
	const fibonacci = [1, 2, 3, 5, 8, 13, 21];
	const clocks = [
		<Clock1Svg />,
		<Clock2Svg />,
		<Clock3Svg />,
		<Clock4Svg />,
		<Clock5Svg />,
		<Clock1Svg />,
		<BombSvg />
	];

	const smText = {
		1: '哦哦 ， 你是新來的前端吧 ！ 我是這次的 _HEIGHTLIGHT_ScrumMaster MM_HEIGHTLIGHT_ ， 我的工作主要是促成開發團隊成員協作 、 引導團隊進行自省會議 ， 提升團隊成員對 Scrum 瞭解 。',
		2: '這兩位是 EE 和 GG ， 是我們開發團隊的成員唷～ 我們團隊_HEIGHTLIGHT_一次 Sprint 週期是兩週_HEIGHTLIGHT_的時間 ， 依照我的觀察 ， 目前團隊可以負擔的點數 (Story Point) 大約是 _HEIGHTLIGHT_20 點_HEIGHTLIGHT_左右。'
	};
	const eeText = {
		3: '欸新來的 ， 你應該不知道點數是什麼意思吧ㄏㄏ ， 我來跟你介紹一下吧～ _HEIGHTLIGHT_Story Point_HEIGHTLIGHT_ 目的是為了_HEIGHTLIGHT_衡量速度_HEIGHTLIGHT_ ， 是用大概花費的時間預估出的相對點數哦 。',
		4: '以 _HEIGHTLIGHT_「 費氏數列 」 的 1 、2 、3 、5 、8 、13 、21_HEIGHTLIGHT_ 來估算各項 Story 的分數 。 Story Point 越小 ， 表示這個 Story 花費時間越少 ； 越大 ， 花費時間則越多 。 如果出現了一個 21 分 ， 可能表示這個 Story 太龐大 ， 需要再拆分細項執行唷 ！'
	};

	useEffect(() => {
		switch (stage) {
			case 0:
				{
					setSmRole((pre) => ({
						...pre,
						aniType: 'join'
					}));
					const svg = new Vivus(sprintSmId, {
						type: 'oneByOne',
						duration: 50
					});
					svg.play();
				}
				break;
			case 1:
				setPoChatBox((pre) => ({
					...pre,
					aniType: 'leave'
				}));
				setSmChatBox((pre) => ({
					...pre,
					aniType: 'join'
				}));
				setRoles((pre) =>
					Object.keys(pre).reduce((obj, name) => {
						obj[name] = 'join';
						return obj;
					}, {})
				);
				break;
			case 2:
				{
					const svg = new Vivus(storeId, {
						type: 'oneByOne',
						duration: 50
					});
					svg.play();
					setPoRole((pre) => ({
						...pre,
						aniType: 'leave'
					}));
					setSmChatBox((pre) => ({
						...pre,
						aniType: 'toggle'
					}));
					setEeRole((pre) => ({
						...pre,
						aniType: 'join'
					}));
					setGgRole((pre) => ({
						...pre,
						aniType: 'join',
						aniDelay: 800
					}));
					setRoles((pre) =>
						Object.keys(pre).reduce((obj, name) => {
							obj[name] = 'leave';
							return obj;
						}, {})
					);
				}
				break;
			case 3:
				setSmChatBox((pre) => ({
					...pre,
					aniType: 'leave'
				}));
				setSmRole((pre) => ({
					...pre,
					aniType: 'leave'
				}));
				setStoriesClassName('ready');
				setEeChatBox((pre) => ({
					...pre,
					aniType: 'join',
					aniCallback: () => {}
				}));
				setTimeout(() => {
					const storeSvgVivus = new Vivus(storeCoverId, {
						type: 'oneByOne',
						duration: 50
					});
					const clockSvgVivus = new Vivus(clockId, {
						duration: 50
					});
					clockSvgVivus.play(1, () => {
						storeSvgVivus.play(1, () => {
							setStoriesClassName('ready expand');
						});
					});
				}, 300);
				break;
			case 4:
				setEeChatBox((pre) => ({
					...pre,
					aniType: 'toggle'
				}));
				setStoriesClassName('expand check');
				break;
			case 5:
				setEeChatBox((pre) => ({
					...pre,
					aniType: 'leave'
				}));
				setEeRole((pre) => ({
					...pre,
					aniType: 'keep'
				}));
				setGgRole((pre) => ({
					...pre,
					aniType: 'keep'
				}));
				setTimeout(() => {
					navigate('/SprintBacklog');
				}, 500);
				break;
			default:
		}
	}, [stage, sprintSmId, storeId, storeCoverId, clockId, navigate]);

	useEffect(() => {
		isClick && setStage((pre) => pre + 1);
	}, [isClick]);

	return (
		<MainStyle>
			<div className={roleChat}>
				<Role {...poRole} />
				<ChatBox {...poChatBox} />
			</div>
			<div className={cx(roleChat, 'order-1')}>
				<ChatBox text={smText[stage]} {...smChatBox} />
				<Role {...smRole} />
			</div>
			<div className={cx(roleChat, fixedRT)}>
				<ChatBox text={eeText[stage]} {...eeChatBox} />
				<Role {...eeRole} />
				<Role {...ggRole} />
			</div>
			<Transition show={stage < 3}>
				<Circle className={cx(flexCenter)} stage={stage}>
					<Transition show={stage === 0}>
						<span className="fz-s text sprint">Sprint</span>
						<span className="fz-s text sprintBacklog">
							Sprint Backlog
						</span>
						<SprintSmSvg id={sprintSmId} />
					</Transition>
					<Transition show={stage === 1}>
						{Object.keys(roles).map((name) => (
							<Role
								key={name}
								name={name}
								aniType={roles[name]}
								isBottom={name !== 'sm'}
								className={name}
							/>
						))}
					</Transition>
					<Transition show={stage === 2}>
						<StoreSvg id={storeId} />
						<span className={cx(flexCenter, 'point')}>20</span>
						<span className="fz-s text tramLimit">team limit</span>
						<span className="fz-s text storyPoint">
							Story Point
						</span>
					</Transition>
				</Circle>
			</Transition>

			<Transition show={1 < stage && stage < 5}>
				<StoriesStyle className={cx(fixedCenterX, storiesClassName)}>
					<div className="clock">
						<Clock2Svg id={clockId} />
					</div>
					{fibonacci.map((n, i) => {
						return (
							<StoryStyle key={n} data-number={n}>
								<StoreCoverSvg
									id={n === 1 ? storeCoverId : ''}
								/>
								{React.cloneElement(clocks[i], {
									className: 'storyClock'
								})}
							</StoryStyle>
						);
					})}
					<StoreSpineSvg className="storeSpine" />
				</StoriesStyle>
			</Transition>
		</MainStyle>
	);
}
