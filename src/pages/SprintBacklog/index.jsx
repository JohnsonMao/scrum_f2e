import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '@linaria/core';
import { DragDropContext } from 'react-beautiful-dnd';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import List from '@/components/List';
import { Drop, DropChild, Drag } from '@/components/DnD';
import Mask from '@/components/Mask';
import { ReactComponent as JiraSvg } from '@images/jira.svg';
import { roleChat, fixedFullScreen, flexCenter } from '@styles/utils.style';
import { MainStyle } from './Main.style';
import './index.scss';

export default function ProductOwner() {
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
	const [mask, setMask] = useState(false);
	const [stage, setStage] = useState(0);
	const [eeGoOut, setEeGoOut] = useState(false);
	const navigate = useNavigate();
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
				break;
			default:
		}
	}, [stage]);

	const closeMask = () => {
		setMask(false);
		// ggChatBoxRef.current.leave.current();
		// ggRoleRef.current.leave.current();
		setTimeout(() => {
			// navigate('/SprintReview');
		}, 1000);
	};

	const handleStage = (s) => {
		setStage(s);
		// ggChatBoxRef.current.toggle.current();

		switch (s) {
			case 1:
				// eeChatBoxRef.current.leave.current();
				// eeRoleRef.current.leave.current({
				// 	complete: () => setEeGoOut(true)
				// });
				break;
			case 2:
				setTimeout(() => {
					setMask(true);
				}, 600);
				break;
			default:
		}
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
				as="button"
				className={`stage_${stage} sb_0_button fixedRB`}
				text="練習去了"
				onClick={() => handleStage(1)}
			/>
			<div className={`sb_lists stage_${stage}`}>
				<DragDropContext onDragEnd={handleDragEnd}>
					<List className={`primary sb_list stage_${stage}`}>
						<Drop droppableId="backlog">
							<DropChild
								as="ul"
								className={`sb_items stage_${stage}`}
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
					</List>
					<List
						className={`secondary sb_list stage_${stage} ${
							danger ? 'danger' : ''
						}`}
						title="開發Ａ組的短衝待辦清單"
						subtitle="Sprint Backlog"
					>
						<Drop droppableId="sprint">
							<DropChild
								as="ul"
								className={`sb_items stage_${stage}`}
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
				className={`stage_${stage} sb_1_button fixedRB`}
				text="開始 sprint"
				onClick={checkSprint}
			/>
		</MainStyle>
	);
}
