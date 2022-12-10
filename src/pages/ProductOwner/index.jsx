import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import Mask from '@/components/Mask';
import Fade from '@/components/Fade';
import { Drop, DropChild, Drag } from '@/components/DnD';
import { ReactComponent as JiraSvg } from '@images/jira.svg';
import { ReactComponent as HandSvg } from '@images/hand.svg';
import { roleChat, fixedRB } from '@styles/utils.style';
import { ListStyle, ListSideStyle, ItemStyle, ItemsStyle } from './List.style';

export default function ProductOwner() {
	const navigate = useNavigate();
	const [stage, setStage] = useState(3);
	const [mask, setMask] = useState(false);
	const top = useRef(0);
	const [roleState, setRoleState] = useState({
		aniType: '',
		name: 'po'
	});
	const [chatBoxState, setChatBoxState] = useState({
		aniType: 'join',
		name: 'po'
	});
	const [buttonState, setButtonState] = useState([
		{
			aniType: '',
			aniDelay: 1200,
			text: '我準備好了'
		},
		{
			aniType: '',
			aniDelay: 1700,
			text: '我完成了'
		}
	]);
	const text = [
		'_HEIGHTLIGHT_\\ 碰 /_HEIGHTLIGHT_ 我是短衝小精靈 ， 開發 A 組的 PO 。\n_HEIGHTLIGHT_PO 也就是產品負責人（Product Owner）_HEIGHTLIGHT_ ， 產品負責人會負責評估產品待辦清單的價值與重要性， 依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單（Product Backlog） 唷 ！',
		'剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了 _HEIGHTLIGHT_「 產品需求清單 」_HEIGHTLIGHT_ 。 \n既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！',
		'在這階段我們要把需求放進產品待辦清單 ， 並調整其優先順序 。\n對了 ！ 我們公司也推薦使用 _SLOT_ 來做任務的管理呢 ！',
		'換你來試試看吧 ！\n提示 ： 請把需求拖移至產品待辦清單 ， 並調整其優先順序 。',
		'哇喔完成惹 ， 尼太棒ㄌ！ 我們繼續吧 ！'
	];
	const [items, setItems] = useState([
		{
			id: 1,
			content: '後台職缺管理功能（資訊上架、下架、顯示應徵者資料）'
		},
		{ id: 2, content: '會員系統（登入、註冊、權限管理）' },
		{ id: 3, content: '應徵者的線上履歷編輯器' },
		{ id: 4, content: '前台職缺列表、應徵' }
	]);
	const [backlog, setBacklog] = useState([]);

	useEffect(() => {
		switch (stage) {
			case 0:
				setRoleState((pre) => ({
					...pre,
					aniType: 'join'
				}));
				setChatBoxState((pre) => ({
					...pre,
					aniCallback: () => setMask(true)
				}));
				break;
			case 1:
				setChatBoxState((pre) => ({
					...pre,
					aniType: 'toggle',
					aniCallback: undefined
				}));
				setButtonState((pre) => {
					const newButtons = [...pre];
					newButtons[0].aniType = 'join';
					return newButtons;
				});
				break;
			case 2:
				setButtonState((pre) => {
					const newButtons = [...pre];
					newButtons[0].aniType = 'leave';
					return newButtons;
				});
				setTimeout(() => setMask(true), 1500);
				break;
			case 3:
				setButtonState((pre) => {
					const newButtons = [...pre];
					newButtons[1].aniType = 'join';
					return newButtons;
				});
				break;
			default:
		}
	}, [stage]);

	useEffect(() => {
		const roleChatRect = document.querySelector(`.${roleChat}`);

		top.current = roleChatRect.getBoundingClientRect().height + 130;
	}, []);

	const closeMask = () => {
		setMask(false);
		setStage((pre) => pre + 1);
		if (stage > 10) {
			setTimeout(() => {
				navigate('/SprintPlanning');
			}, 1000);
		}
	};

	const handleDragEnd = ({ source, destination }) => {
		if (!destination) return;
		const isItems = source.droppableId === 'items';
		const item = isItems ? items[source.index] : backlog[source.index];

		if (isItems) {
			setBacklog((pre) => {
				const result = [...pre];
				result.splice(destination.index, 0, item);
				return result;
			});
			setItems(items.filter((_, i) => i !== source.index));
		} else {
			setBacklog((pre) => {
				const result = pre.filter((_, i) => i !== source.index);
				result.splice(destination.index, 0, item);
				return result;
			});
		}
	};

	return (
		<>
			<Mask show={mask} text="點擊畫面任意處繼續" onClick={closeMask} />
			<div className={roleChat}>
				<Role {...roleState} />
				<ChatBox
					slot={[<JiraSvg className="logo_svg jira" />]}
					text={text[stage]}
					{...chatBoxState}
				/>
			</div>
			<Button
				className={fixedRB}
				onClick={() => setStage(2)}
				{...buttonState[0]}
			/>
			<Fade show={1 < stage && stage < 4}>
				<DragDropContext onDragEnd={handleDragEnd}>
					<ItemsStyle top={top.current} animation={stage === 2}>
						<Drop droppableId="items">
							<DropChild as="ul">
								{items.map((item, index) => (
									<Drag
										key={item.id}
										draggableId={`item_${item.id}`}
										index={index}
									>
										<ItemStyle>
											{item.content}
											{index === 3 && stage === 2 ? (
												<HandSvg />
											) : null}
										</ItemStyle>
									</Drag>
								))}
							</DropChild>
						</Drop>
					</ItemsStyle>
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
										<ItemStyle>{item.content}</ItemStyle>
									</Drag>
								))}
							</DropChild>
						</Drop>
						<ListSideStyle>
							<span>高</span>
							<span>低</span>
						</ListSideStyle>
					</ListStyle>
				</DragDropContext>
			</Fade>
			<Button
				className={fixedRB}
				disabled={backlog.length !== 4}
				onClick={() => setStage(5)}
				{...buttonState[1]}
			/>
		</>
	);
}
