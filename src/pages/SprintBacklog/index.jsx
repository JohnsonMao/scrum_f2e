import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import List from '@/components/List';
import { Drop, DropChild, Drag } from '@/components/DnD';
import { ReactComponent as JiraSvg } from '@images/jira.svg';
import './index.scss';

export default function ProductOwner() {
	const ggChatBoxRef = useRef(null);
	const ggRoleRef = useRef(null);
	const eeChatBoxRef = useRef(null);
	const eeRoleRef = useRef(null);
	const [mask, setMask] = useState(false);
	const [stage, setStage] = useState(0);
	const [eeGoOut, setEeGoOut] = useState(false);
	const navigate = useNavigate();
	const ggText = {
		0: '沒錯，如 EE 說的，我這邊已經把剛剛討論好的點數標上去囉～ 你來練習把任務排到短衝待辦清單吧 ！',
		1: '換你來試試看吧 ！ \n把 _HEIGHTLIGHT_「 產品待辦清單 」_HEIGHTLIGHT_ 的項目拖進 _HEIGHTLIGHT_「 開發Ａ組的短衝待辦清單 」_HEIGHTLIGHT_ 裡吧 ！\n提示 ： 置入兩項以上的 Story ， 點數總和不能超過團隊負擔上限 20 點唷 ！',
		2: '噢嗚嗚 ， 太厲害ㄌ ！ 又完成了一關 ！ 還有下一關等著你 ！'
	};
	const eeText =
		'By the way , 我們平常管理任務是使用_children_這套軟體 ， 你有時間記得先去註冊和熟悉唷 !';
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
		if (stage === 0) {
			ggChatBoxRef.current.join.current();
			eeChatBoxRef.current.join.current();
			ggRoleRef.current.join.current();
			eeRoleRef.current.join.current();
		}
	}, [stage]);

	const closeMask = () => {
		setMask(false);
		setTimeout(() => {
			navigate('/SprintPlanning');
		}, 1000);
	};

	const handleStage = (s) => {
		setStage(s);
		switch (s) {
			case 1:
				ggChatBoxRef.current.toggle.current();
				eeChatBoxRef.current.leave.current();
				eeRoleRef.current.leave.current({
					complete: () => setEeGoOut(true)
				});
				break;
			case 2:
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

	return (
		<>
			<div className="roleChat fixedRT">
				<div className="roleChat__chat">
					<ChatBox
						ref={ggChatBoxRef}
						text={ggText?.[stage] || ''}
						name="GG"
						className="gg"
					/>
					<Role
						ref={eeRoleRef}
						role="ee"
						className={eeGoOut ? 'eeGoOut' : ''}
					/>
					<Role ref={ggRoleRef} role="gg" />
				</div>
			</div>
			<ChatBox
				ref={eeChatBoxRef}
				text={eeText}
				name="EE"
				className="ee fixedCenter"
				slot={[JiraSvg]}
			/>
			<Button
				as="button"
				className={`stage_${stage} sb_2_button fixedRB`}
				text="練習去了"
				onClick={() => handleStage(1)}
			/>
			<div className={`sb_lists fixedLB stage_${stage}`}>
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
				className={`stage_${stage} po_3_button fixedRB ${
					sprint.length === 4 ? '' : 'disabled'
				}`}
				text="開始 sprint"
				onClick={() => handleStage(2)}
			/>
			<div
				className={['po-mask', mask ? 'show' : '', stage].join(' ')}
				onClick={closeMask}
			>
				<span className="b">點擊畫面任意處繼續</span>
			</div>
		</>
	);
}
