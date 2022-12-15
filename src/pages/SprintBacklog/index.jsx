import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '@linaria/core';
import { DragDropContext } from 'react-beautiful-dnd';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import Mask from '@/components/Mask';
import Transition from '@/components/Transition';
import { Drop, DropChild, Drag } from '@/components/DnD';
import { ReactComponent as JiraSvg } from '@images/jira.svg';
import {
	roleChat,
	fixedFullScreen,
	flexCenter,
	fixedRB
} from '@styles/utils.style';
import {
	MainStyle,
	ListGroup,
	ListStyle,
	ItemStyle,
	Process
} from './Main.style';

export default function ProductOwner() {
	const navigate = useNavigate();
	const [stage, setStage] = useState(0);
	const [mask, setMask] = useState(false);
	const [ggRole, setGgRole] = useState({
		aniType: 'keep',
		name: 'gg'
	});
	const [ggChatBox, setGgChatBox] = useState({
		aniType: 'join',
		aniDelay: 1000,
		name: 'gg'
	});
	const [eeRole, setEeRole] = useState({
		aniType: 'keep',
		name: 'ee'
	});
	const [eeChatBox, setEeChatBox] = useState({
		aniType: 'join',
		aniDelay: 200,
		name: 'ee',
		text: 'By the way , 我們平常管理任務是使用 _SLOT_ 這套軟體 ， 你有時間記得先去註冊和熟悉唷 !',
		className: 'eeChatBox'
	});
	const [buttonState, setButtonState] = useState([
		{
			aniType: '',
			aniDelay: 1800,
			text: '練習去了'
		},
		{
			aniType: '',
			aniDelay: 2400,
			text: '開始 sprint'
		}
	]);
	const ggText = {
		0: '沒錯，如 EE 說的，我這邊已經把剛剛討論好的點數標上去囉～ 你來練習把任務排到短衝待辦清單吧 ！',
		1: '換你來試試看吧 ！ \n把 _HEIGHTLIGHT_「 產品待辦清單 」_HEIGHTLIGHT_ 的項目拖進 _HEIGHTLIGHT_「 開發Ａ組的短衝待辦清單 」_HEIGHTLIGHT_ 裡吧 ！\n提示 ： 置入兩項以上的 Story ， 點數總和不能超過團隊負擔上限 20 點唷 ！',
		2: '噢嗚嗚 ， 太厲害ㄌ ！ 又完成了一關 ！ 還有下一關等著你 ！',
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
	const [sprint, setSprint] = useState([]);
	const [score, setScore] = useState(0);
	const [danger, setDanger] = useState(false);
	const MAX = 20;

	useEffect(() => {
		switch (stage) {
			case 0:
				setButtonState((pre) => {
					const newButtons = [...pre];
					newButtons[0].aniType = 'join';
					return newButtons;
				});
				break;
			case 1:
				setEeChatBox((pre) => ({
					...pre,
					aniType: 'leave'
				}));
				setEeRole((pre) => ({
					...pre,
					aniType: 'leave',
					aniCallback: () => {
						setTimeout(() => {
							setEeRole((pre) => ({
								...pre,
								className: 'd-none'
							}));
						}, 300);
					}
				}));
				setGgChatBox((pre) => ({
					...pre,
					aniType: 'leave',
					aniCallback: () => {
						setGgChatBox((pre) => ({
							...pre,
							aniType: 'join'
						}));
					}
				}));
				setButtonState((pre) => {
					const newButtons = [...pre];
					newButtons[0].aniType = 'leave';
					newButtons[1].aniType = 'join';
					return newButtons;
				});
				break;
			case 2:
				setButtonState((pre) => {
					const newButtons = [...pre];
					newButtons[1].aniType = 'leave';
					return newButtons;
				});
				setTimeout(() => {
					setMask(true);
				}, 600);
				break;
			default:
		}
	}, [stage]);

	const closeMask = () => {
		setMask(false);
		setGgChatBox((pre) => ({
			...pre,
			aniType: 'leave'
		}));
		setGgRole((pre) => ({
			...pre,
			aniType: 'leave',
			aniCallback: () => {
				setTimeout(() => {
					navigate('/SprintReview');
				}, 1000);
			}
		}));
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
		setGgChatBox((pre) => ({
			...pre,
			aniType: 'toggle'
		}));
		if (score <= MAX && sprint.length < 2) {
			setStage('check');
			return;
		}
		if (score > MAX) {
			setStage('error');
			return;
		}
		setStage(2);
	};

	return (
		<MainStyle>
			<Mask show={mask} text="點擊畫面任意處繼續" onClick={closeMask} />
			<div className={roleChat}>
				<ChatBox text={ggText[stage]} {...ggChatBox} />
				<Role {...eeRole} />
				<Role {...ggRole} />
			</div>
			<div className={cx(fixedFullScreen, flexCenter)}>
				<ChatBox slot={[<JiraSvg className="jira" />]} {...eeChatBox} />
			</div>
			<Button
				className={fixedRB}
				onClick={() => setStage(1)}
				{...buttonState[0]}
			/>
			<Transition show={stage === 1 || Number.isNaN(+stage)} delay={800}>
				<ListGroup>
					<DragDropContext onDragEnd={handleDragEnd}>
						<ListStyle
							type="primary"
							title="產品代辦清單"
							subtitle="Product Backlog"
						>
							<Drop droppableId="backlog">
								<DropChild as="ul">
									{backlog.map((item, index) => (
										<Drag
											key={item.id}
											draggableId={`backlog_${item.id}`}
											index={index}
										>
											<ItemStyle>
												<span>{item.number}</span>
												<span>{item.content}</span>
											</ItemStyle>
										</Drag>
									))}
								</DropChild>
							</Drop>
						</ListStyle>
						<ListStyle
							type="secondary"
							title="開發Ａ組的短衝待辦清單"
							subtitle="Sprint Backlog"
						>
							<Drop droppableId="sprint">
								<DropChild as="ul">
									{sprint.map((item, index) => (
										<Drag
											key={item.id}
											draggableId={`sprint_${item.id}`}
											index={index}
										>
											<ItemStyle>
												<span>{item.number}</span>
												<span>{item.content}</span>
											</ItemStyle>
										</Drag>
									))}
								</DropChild>
							</Drop>
							<Process
								data-content={`${score}/${MAX} (5人)`}
								percent={
									Math.min(score / MAX, 1).toFixed(2) * 100
								}
								danger={danger}
							></Process>
						</ListStyle>
					</DragDropContext>
				</ListGroup>
			</Transition>
			<Button
				className={fixedRB}
				text="開始 sprint"
				{...buttonState[1]}
				onClick={checkSprint}
			/>
		</MainStyle>
	);
}
