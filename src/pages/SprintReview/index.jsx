import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import List from '@/components/List';
import Mask from '@/components/Mask';
import LogoLink from '@/components/LogoLink';
import Transition from '@/components/Transition';
import { Drop, DropChild, Drag } from '@/components/DnD';
import sprintDailyPng from '@images/sprint_daily.png';
import sprintReviewPng from '@images/sprint_review.png';
import sprintRetroPng from '@images/sprint_retro.png';
import { useWindowClick } from '@/hooks';
import { roleChat, fixedRB } from '@styles/utils.style';
import {
	MainStyle,
	IntroList,
	IntroItem,
	TitleBox,
	ContentBox,
	SprintProcessBg
} from './Main.style';

export default function ProductOwner() {
	const navigate = useNavigate();
	const [stage, setStage] = useState(0);
	const [mask, setMask] = useState(false);
	const [isClick] = useWindowClick(2400);
	const [eeRole, setEeRole] = useState({
		aniType: '',
		name: 'ee'
	});
	const [eeChatBox, setEeChatBox] = useState({
		aniType: 'join',
		name: 'ee'
	});
	const [buttonState, setButtonState] = useState([
		{
			aniType: '',
			text: '練習去了'
		},
		{
			aniType: '',
			text: '我完成了'
		}
	]);
	const eeText = {
		0: '等等等等等 ， 你都還不知道什麼是 Sprint 吧 ！ 讓我先為你介紹一下～\n仔細聽好唷 ， 等等會考考你 ！',
		1: 'Sprint 是一個短衝 ， 開發團隊會在這期間執行開發 。 在這段期間內 ， 開發團隊舉辦_HEIGHTLIGHT_每日站立會議 (Daily Scrum)_HEIGHTLIGHT_ ， 追蹤成員間的工作狀況 ， 在 Sprint 的結束也會包含_HEIGHTLIGHT_短衝檢視會議 (Sprint Review)_HEIGHTLIGHT_ 以及_HEIGHTLIGHT_短衝自省會議 (Sprint Retrospective)_HEIGHTLIGHT_ 。',
		2: '優化工作流程、讓團隊有變得更好的機會。\n推薦工具 ： _SLOT_',
		3: '換你來試試看吧 ！\n在這經典的 Surum 流程圖中 ， 這些流程分別代表哪一個會議呢 ？\n提示 ： 把右側的三個流程拖移至正確的位置上吧 ！',
		4: '哼哼沒想到你這麼快就學會惹 ， 快結束了加油加油 ！',
		check: '在檢查看看流程喔～'
	};
	const intro = [
		{
			img: sprintDailyPng,
			title: '每日站立會議',
			subtitle: 'Daily Scrum',
			content: [
				'每天都要進行的會議 ， 以15分鐘為限制',
				[
					'昨天為團隊的短衝目標 (Sprint Goal)做了那些進度',
					'今天我會如何準備來幫助團隊達到短衝目標',
					'過程中有遇到什麼問題、難題'
				],
				'透過團隊分享 ， 追蹤大家的工作狀況。'
			]
		},
		{
			img: sprintReviewPng,
			title: '短衝檢視會議',
			subtitle: 'Sprint Review',
			content: [
				'用來檢視該次短衝增量的成果 ， 以蒐集相關的回饋數據或意見 。'
			]
		},
		{
			img: sprintRetroPng,
			title: '短衝自省會議',
			subtitle: 'Sprint Retrospective',
			content: [
				'團隊在自省會議裡 , 會共同回顧該短衝歷程發生的事情',
				['好的地方', '可以改進的地方', '如何維持我們已有的成功經驗']
			]
		}
	];
	const scrumData = [
		{
			id: 0,
			title: '產品代辦清單',
			subtitle: 'Product Backlog'
		},
		{
			id: 1,
			title: '短衝規劃會議',
			subtitle: 'Sprint Planning'
		},
		{
			id: 2,
			title: '短衝待辦清單',
			subtitle: 'Sprint Backlog'
		},
		{
			id: 3,
			title: '短衝',
			subtitle: 'Sprint'
		}
	];
	const [scrumFlow, setScrumFlow] = useState([
		{
			id: 4,
			title: '每日站立會議',
			subtitle: 'Daily Scrum'
		},
		{
			id: 5,
			title: '短衝檢視會議',
			subtitle: 'Sprint Review'
		},
		{
			id: 6,
			title: '短衝自省會議',
			subtitle: 'Sprint Retrospective'
		}
	]);
	const [sprint, setSprint] = useState([]);

	useEffect(() => {
		switch (stage) {
			case 0:
				setEeRole((pre) => ({
					...pre,
					aniType: 'join'
				}));
				break;
			case 1:
				setEeChatBox((pre) => ({
					...pre,
					aniType: 'toggle'
				}));
				break;
			case 2:
				setButtonState((pre) => {
					const newButtons = [...pre];
					newButtons[0].aniType = 'join';
					return newButtons;
				});
				break;
			case 3:
				setButtonState((pre) => {
					const newButtons = [...pre];
					newButtons[0].aniType = 'leave';
					newButtons[1].aniType = 'join';
					return newButtons;
				});
				break;
			default:
		}
	}, [stage]);

	const handleDragEnd = ({ source, destination }) => {
		if (!destination) return;
	};

	useEffect(() => {
		if (buttonState.some((btn) => btn.aniType === 'join')) return;

		isClick && setStage((pre) => pre + 1);
	}, [isClick, buttonState]);

	const closeMask = () => {
		setMask(false);
		setStage((pre) => pre + 1);
	};

	return (
		<MainStyle>
			<Mask show={mask} text="點擊畫面任意處繼續" onClick={closeMask} />
			<div className={roleChat}>
				<ChatBox
					text={eeText?.[stage] || ''}
					slot={[<LogoLink logoName="Confluence" />]}
					{...eeChatBox}
				/>
				<Role {...eeRole} />
			</div>
			<Transition show={stage < 3} delay={600}>
				<IntroList stage={stage}>
					{intro.map((item, index) => {
						return (
							<IntroItem key={index}>
								<img src={item.img} alt={item.subtitle} />
								<TitleBox>
									<h2>{item.title}</h2>
									<h3 className="fz-s">{item.subtitle}</h3>
								</TitleBox>
								<ContentBox>
									{item.content.map((text, textIndex) => {
										return typeof text === 'string' ? (
											<div key={textIndex}>{text}</div>
										) : (
											<ul key={textIndex}>
												{text.map((t, i) => (
													<li key={i}>{t}</li>
												))}
											</ul>
										);
									})}
								</ContentBox>
							</IntroItem>
						);
					})}
				</IntroList>
			</Transition>
			<Button
				className={fixedRB}
				onClick={() => setStage(3)}
				{...buttonState[0]}
			/>
			<Transition
				show={stage > 2 || Number.isNaN(+stage)}
				className="relative"
			>
				<SprintProcessBg />

				{scrumData.map((item) => (
					<TitleBox
						as="div"
						key={item.id}
						color="primary"
						width="max-content"
						className={`scurm_${item.id}`}
					>
						<h2>{item.title}</h2>
						<h3 className="fz-s">{item.subtitle}</h3>
					</TitleBox>
				))}
				<DragDropContext onDragEnd={handleDragEnd}>
					<Drop droppableId="backlog">
						<DropChild
							as="ul"
							className={`review_items stage_${stage}`}
						>
							{scrumFlow.map((item, index) => (
								<Drag
									key={item.id}
									draggableId={`scrumFlow_${item.id}`}
									index={index}
								>
									<TitleBox as="li" width="max-content">
										<h2>{item.title}</h2>
										<h3 className="fz-s">
											{item.subtitle}
										</h3>
									</TitleBox>
								</Drag>
							))}
						</DropChild>
					</Drop>
					<div>
						<Drop droppableId="sprint">
							<DropChild
								as="ul"
								className={`review_items stage_${stage}`}
							>
								{sprint.map((item, index) => (
									<Drag
										key={item.id}
										draggableId={`sprint_${item.id}`}
										index={index}
									>
										<li className="sprint__item">
											<span className="sprint__number">
												{item.number}
											</span>
											<span>{item.content}</span>
										</li>
									</Drag>
								))}
							</DropChild>
						</Drop>
					</div>
				</DragDropContext>
			</Transition>
			<Button
				className={fixedRB}
				onClick={() => setStage(4)}
				disabled={sprint.length !== 4}
				{...buttonState[1]}
			/>
		</MainStyle>
	);
}
