import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import List from '@/components/List';
import Mask from '@/components/Mask';
import { Drop, DropChild, Drag } from '@/components/DnD';
import { ReactComponent as JiraSvg } from '@images/jira.svg';
import { ReactComponent as HandSvg } from '@images/hand.svg';
import './index.scss';

export default function ProductOwner() {
	const chatBoxRef = useRef(null);
	const roleRef = useRef(null);
	const [mask, setMask] = useState(false);
	const [stage, setStage] = useState('po_1');
	const [demo, setDemo] = useState(false);
	const navigate = useNavigate();
	const text = {
		po_1: '_HEIGHTLIGHT_\\ 碰 /_HEIGHTLIGHT_ 我是短衝小精靈 ， 開發 A 組的 PO 。\n_HEIGHTLIGHT_PO 也就是產品負責人（Product Owner）_HEIGHTLIGHT_ ， 產品負責人會負責評估產品待辦清單的價值與重要性， 依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單（Product Backlog） 唷 ！',
		po_2: '剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了 _HEIGHTLIGHT_「 產品需求清單 」_HEIGHTLIGHT_ 。 \n既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！',
		po_3: '在這階段我們要把需求放進產品待辦清單 ， 並調整其優先順序 。\n對了 ！ 我們公司也推薦使用 _SLOT_ 來做任務的管理呢 ！',
		po_4: '換你來試試看吧 ！\n提示 ： 請把需求拖移至產品待辦清單 ， 並調整其優先順序 。',
		po_5: '哇喔完成惹 ， 尼太棒ㄌ！ 我們繼續吧 ！'
	};
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
		chatBoxRef.current.join.current({ complete: () => setMask(true) });
		roleRef.current.join.current();
	}, []);

	const handleStage = (s) => {
		chatBoxRef.current.toggle.current();
		setStage(s);
		switch (s) {
			case 'po_3':
				setDemo(true);
				setTimeout(() => {
					setMask(true);
				}, 2000);
				break;
			case 'po_5':
				setTimeout(() => {
					setMask(true);
				}, 1000);
				break;
			default:
		}
	};

	const closeMask = () => {
		setMask(false);
		setDemo(false);
		switch (stage) {
			case 'po_3':
				handleStage('po_4');
				chatBoxRef.current.toggle.current();
				break;
			case 'po_5':
				chatBoxRef.current.leave.current();
				roleRef.current.leave.current();
				setTimeout(() => {
					navigate('/SprintPlanning');
				}, 1000);
				break;
			default:
				handleStage('po_2');
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
			<div
				className={['mask', mask ? 'show' : '', stage].join(' ')}
				onClick={closeMask}
			>
				<span className="b">點擊畫面任意處繼續</span>
			</div>
			<Mask show={true} text="點擊畫面任意處繼續" />
			<div className="roleChat">
				<div className="roleChat__chat">
					<Role ref={roleRef} role="po" />
					<ChatBox
						ref={chatBoxRef}
						text={text[stage]}
						name="PO"
						className="po"
						slot={[<JiraSvg className="jira" />]}
					/>
				</div>
			</div>
			<Button
				as="button"
				className={`${stage} po_2_button fixedRB`}
				text="我準備好了"
				onClick={() => handleStage('po_3')}
			/>
			<DragDropContext onDragEnd={handleDragEnd}>
				<div
					className={`po_3_items ${stage} ${demo ? 'demo' : ''}`}
					style={{ height: 0 }}
				>
					<Drop droppableId="items">
						<DropChild as="ul">
							{items.map((item, index) => (
								<Drag
									key={item.id}
									draggableId={`item_${item.id}`}
									index={index}
								>
									<li
										className={`po_3_item po_3_item_${item.id}`}
									>
										{item.content}
										{index === 3 ? <HandSvg /> : null}
									</li>
								</Drag>
							))}
						</DropChild>
					</Drop>
				</div>
				<List className={`primary po_3_list ${stage}`}>
					<Drop droppableId="backlog">
						<DropChild as="ul" className={`po_3_items ${stage}`}>
							{backlog.map((item, index) => (
								<Drag
									key={item.id}
									draggableId={`backlog_${item.id}`}
									index={index}
								>
									<li className="backlog__item">
										<span>{item.content}</span>
									</li>
								</Drag>
							))}
						</DropChild>
					</Drop>
				</List>
			</DragDropContext>
			<Button
				as="button"
				className={`${stage} po_3_button fixedRB ${
					backlog.length === 4 ? '' : 'disabled'
				}`}
				text="我完成了"
				onClick={() => handleStage('po_5')}
			/>
		</>
	);
}
