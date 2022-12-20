import { useCallback, useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Vivus from 'vivus';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import List from '@/components/List';
import Mask from '@/components/Mask';
import LogoLink from '@/components/LogoLink';
import { Drop, DropChild, Drag } from '@/components/DnD';
import { ReactComponent as SprintProcessSvg } from '@images/sprint_process.svg';
import sprintDailyPng from '@images/sprint_daily.png';
import sprintReviewPng from '@images/sprint_review.png';
import sprintRetroPng from '@images/sprint_retro.png';
import { useWindowClick } from '@/hooks';
import { roleChat } from '@styles/utils.style';
import {
	MainStyle,
	IntroList,
	IntroItem,
	IntroHeader,
	IntroContent
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
	const sprintProcess = useId();
	const eeText = {
		0: '等等等等等 ， 你都還不知道什麼是 Sprint 吧 ！ 讓我先為你介紹一下～\n仔細聽好唷 ， 等等會考考你 ！',
		1: 'Sprint 是一個短衝 ， 開發團隊會在這期間執行開發 。 在這段期間內 ， 開發團隊舉辦_HEIGHTLIGHT_每日站立會議 (Daily Scrum)_HEIGHTLIGHT_ ， 追蹤成員間的工作狀況 ， 在 Sprint 的結束也會包含_HEIGHTLIGHT_短衝檢視會議 (Sprint Review)_HEIGHTLIGHT_ 以及_HEIGHTLIGHT_短衝自省會議 (Sprint Retrospective)_HEIGHTLIGHT_ 。',
		2: '優化工作流程、讓團隊有變得更好的機會。\n推薦工具 ： _SLOT_',
		3: '換你來試試看吧 ！\n在這經典的 Surum 流程圖中 ， 這些流程分別代表哪一個會議呢 ？\n提示 ： 把右側的三個流程拖移至正確的位置上吧 ！',
		4: '哼哼沒想到你這麼快就學會惹 ， 快結束了加油加油 ！',
		check: '至少置入兩項以上的 Story，你在嘗試看看',
		error: '點數總和不能超過團隊負擔上限 20 點唷 ！'
	};
	const [backlog, setBacklog] = useState([
		{
			id: 1,
			number: 8,
			content: '後台職缺管理功能（資訊上架、下架、顯示應徵者資料）'
		},
		{ id: 2, number: 13, content: '會員系統（登入、註冊、權限管理）' },
		{ id: 3, number: 5, content: '應徵者的線上履歷編輯器' },
		{ id: 4, number: 8, content: '前台職缺列表、應徵' }
	]);
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
			case 3:
				{
					const svg = new Vivus(sprintProcess, {
						type: 'oneByOne',
						duration: 50
					});
				}
				break;
			default:
		}
	}, [stage]);

	const handleDragEnd = ({ source, destination }) => {
		if (!destination) return;
	};

	useEffect(() => {
		isClick && setStage((pre) => pre + 1);
	}, [isClick]);

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
			<IntroList>
				{intro.map((item, index) => {
					return (
						<IntroItem key={index}>
							<img src={item.img} alt={item.subtitle} />
							<IntroHeader>
								<h2>{item.title}</h2>
								<h3 className="fz-s">{item.subtitle}</h3>
							</IntroHeader>
							<IntroContent>
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
							</IntroContent>
						</IntroItem>
					);
				})}
			</IntroList>
			<Button
				as="button"
				className={`stage_${stage} review_1_button fixedRB`}
				text="練習去了"
				onClick={() => setStage(3)}
			/>
			<div className={`review_lists stage_${stage}`}>
				<DragDropContext onDragEnd={handleDragEnd}>
					<SprintProcessSvg
						id={sprintProcess}
						className="sprintProcess"
					/>
					<Drop droppableId="backlog">
						<DropChild
							as="ul"
							className={`review_items stage_${stage}`}
						>
							{backlog.map((item, index) => (
								<Drag
									key={item.id}
									draggableId={`backlog_${item.id}`}
									index={index}
								>
									<li className="backlog__item">
										<span className="backlog__number">
											{item.number}
										</span>
										<span>{item.content}</span>
									</li>
								</Drag>
							))}
						</DropChild>
					</Drop>
					<List
						title="開發Ａ組的短衝待辦清單"
						subtitle="Sprint Backlog"
					>
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
					</List>
				</DragDropContext>
			</div>
		</MainStyle>
	);
}
