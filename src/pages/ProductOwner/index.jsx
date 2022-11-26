import { useEffect, useRef, useState } from 'react';
import Vivus from 'vivus';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import Button from '@/components/Button';
import List from '@/components/List';
import { ReactComponent as JiraSvg } from '@images/jira.svg';
import './index.scss';

export default function ProductOwner() {
	const chatBoxRef = useRef(null);
	const roleRef = useRef(null);
	const [mask, setMask] = useState(false);
	const [stage, setStage] = useState('po_1');
	const text = {
		po_1: '_HEIGHTLIGHT_\\ 碰 /_HEIGHTLIGHT_ 我是短衝小精靈 ， 開發 A 組的 PO 。\n_HEIGHTLIGHT_PO 也就是產品負責人（Product Owner）_HEIGHTLIGHT_ ， 產品負責人會負責評估產品待辦清單的價值與重要性， 依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單（Product Backlog） 唷 ！',
		po_2: '剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了 _HEIGHTLIGHT_「 產品需求清單 」_HEIGHTLIGHT_ 。 \n既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！',
		po_3: '在這階段我們要把需求放進產品待辦清單 ， 並調整其優先順序 。\n對了 ！ 我們公司也推薦使用 _children_ 來做任務的管理呢 ！'
	};

	useEffect(() => {
		chatBoxRef.current.join.current({ complete: () => setMask(true) });
		roleRef.current.join.current();
	}, []);

	const closeMask = () => {
		setMask(false);
		setStage('po_2');
	};

	return (
		<>
			<div
				className={['po-mask', mask ? 'show' : '', stage].join(' ')}
				onClick={closeMask}
			>
				<span className="b">點擊畫面任意處繼續</span>
			</div>
			<div className="productOwner">
				<div className="productOwner__chat">
					<Role ref={roleRef} role="po" />
					<ChatBox
						ref={chatBoxRef}
						text={text[stage]}
						name="PO"
						className="po"
					>
						<JiraSvg
							id="jira"
							className="jira"
							width="90px"
							height="auto"
						/>
					</ChatBox>
				</div>
			</div>
			<Button
				as="button"
				className={`${stage} po_2_button`}
				text="我準備好了"
				onClick={() => setStage('po_3')}
			/>
            <List className='primary'>
                
            </List>
		</>
	);
}
