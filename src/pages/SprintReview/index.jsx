import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import List from '@/components/List';
import { Drop, DropChild, Drag } from '@/components/DnD';
import { ReactComponent as ConfluenceSvg } from '@images/confluence.svg';
import { ReactComponent as SprintProcessSvg } from '@images/sprint_process.svg';
import sprintDailyPng from '@images/sprint_daily.png';
import sprintReviewPng from '@images/sprint_review.png';
import sprintRetroPng from '@images/sprint_retro.png';
import './index.scss';
import Vivus from 'vivus';

export default function ProductOwner() {
	const eeChatBoxRef = useRef(null);
	const eeRoleRef = useRef(null);
	const [mask, setMask] = useState(false);
	const [stage, setStage] = useState(0);
	const navigate = useNavigate();
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
	const [score, setScore] = useState(0);
	const [danger, setDanger] = useState(false);
	const MAX = 20;

	const handleStage = useCallback((s) => {
		eeChatBoxRef.current.toggle.current();
		setStage(s);

		switch (s) {
			case 1:
				setTimeout(() => {
					handleStage(2);
				}, 6000);
				break;
			case 2:
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
	}, [sprintProcess]);

	useEffect(() => {
		if (stage === 0) {
			eeChatBoxRef.current.join.current();
			eeRoleRef.current.join.current({
				complete: () => {
					handleStage(1);
				}
			});
		}
	}, [stage, handleStage]);

	const closeMask = () => {
		setMask(false);
		setTimeout(() => {
			navigate('/SprintPlanning');
		}, 1000);
	};

	const handleDragEnd = ({ source, destination }) => {
		if (!destination) return;
		const isSelf = source.droppableId === destination.droppableId;
		const isBacklog = source.droppableId === 'backlog';
		const selfItem = isBacklog
			? backlog[source.index]
			: sprint[source.index];
		const changeSelf = (pre) => {
			const result = pre.filter((_, i) => i !== source.index);
			result.splice(destination.index, 0, selfItem);
			return result;
		};
		const addItemSelf = (pre) => {
			const result = [...pre];
			result.splice(destination.index, 0, selfItem);
			return result;
		};
		const filterSelf = (items) => () =>
			items.filter((_, i) => i !== source.index);

		if (isSelf) {
			isBacklog ? setBacklog(changeSelf) : setSprint(changeSelf);
		} else if (isBacklog) {
			const newScore = score + selfItem.number;

			if (newScore > MAX) setDanger(true);
			setScore(newScore);
			setSprint(addItemSelf);
			setBacklog(filterSelf(backlog));
		} else {
			const newScore = score - selfItem.number;

			if (newScore <= MAX) setDanger(false);
			setScore(newScore);
			setBacklog(addItemSelf);
			setSprint(filterSelf(sprint));
		}
	};

	const checkSprint = () => {
		console.log(score, MAX, sprint.length);
		if (score <= MAX && sprint.length < 2) {
			handleStage('check');
			return;
		}
		if (score > MAX) {
			handleStage('error');
			return;
		}
		handleStage(2);
	};

	return (
		<>
			<div
				className={['mask', mask ? 'show' : '', `review_${stage}`].join(
					' '
				)}
				onClick={closeMask}
			>
				<span className="b">點擊畫面任意處繼續</span>
			</div>
			<div className="roleChat fixedRT">
				<div className="roleChat__chat">
					<ChatBox
						ref={eeChatBoxRef}
						text={eeText?.[stage] || ''}
						name="EE"
						className="ee"
						slot={[<ConfluenceSvg className="confluence" />]}
					/>
					<Role ref={eeRoleRef} role="ee" />
				</div>
			</div>
			<ul className={`review_intro stage_${stage}`}>
				{intro.map((item, index) => {
					return (
						<li className='review_intro__item' key={index}>
							<div><img src={item.img} alt={item.subtitle} /></div>
							<div className='header'>
								<h2>{item.title}</h2>
								<h3 className='fz-s'>{item.subtitle}</h3>
							</div>
							<div>
								{item.content.map((text, textIndex) => {
									return typeof text === 'string' ? (
										<div className='review_intro__content' key={textIndex}>{text}</div>
									) : (
										<ul className='review_intro__content_list' key={textIndex}>
											{text.map((t, i) => (
												<li key={i}>{t}</li>
											))}
										</ul>
									);
								})}
							</div>
						</li>
					);
				})}
			</ul>
			<Button
				as="button"
				className={`stage_${stage} review_1_button fixedRB`}
				text="練習去了"
				onClick={() => handleStage(3)}
			/>
			<div className={`review_lists stage_${stage}`}>
				<DragDropContext onDragEnd={handleDragEnd}>
					<SprintProcessSvg id={sprintProcess} className='sprintProcess' />
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
						className={`secondary review_list stage_${stage} ${
							danger ? 'danger' : ''
						}`}
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
						<div
							className="process"
							data-score={`${score}/${MAX} (5人)`}
							style={{
								'--score': Math.min(score / MAX, 1).toFixed(2)
							}}
						></div>
					</List>
				</DragDropContext>
			</div>
			<Button
				as="button"
				className={`stage_${stage} review_3_button fixedRB`}
				text="我完成了"
				onClick={checkSprint}
			/>
		</>
	);
}
