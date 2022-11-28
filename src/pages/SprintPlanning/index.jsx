import { useEffect, useRef, useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Vivus from 'vivus';
import { ReactComponent as SprintSmSvg } from '@images/sprint_sm.svg';
import { ReactComponent as StoreSvg } from '@images/store.svg';
import { ReactComponent as StoreSpineSvg } from '@images/store_spine.svg';
import { ReactComponent as StoreCoverSvg } from '@images/store_cover.svg';
import { ReactComponent as Clock1Svg } from '@images/clock_1.svg';
import { ReactComponent as Clock2Svg } from '@images/clock_2.svg';
import { ReactComponent as Clock3Svg } from '@images/clock_3.svg';
import { ReactComponent as Clock4Svg } from '@images/clock_4.svg';
import { ReactComponent as Clock5Svg } from '@images/clock_5.svg';
import { ReactComponent as BombSvg } from '@images/bomb.svg';
import ChatBox from '@/components/ChatBox';
import Role from '@/components/Role';
import './index.scss';

export default function Entrance() {
	const navigate = useNavigate();
	const [isClickTime, setIsClickTime] = useState(false);
	const [stage, setStage] = useState(0);
	const sprintSmId = useId();
	const storeId = useId();
	const storeCoverId = useId();
	const clockId = useId();
	const poChatBoxRef = useRef(null);
	const poRoleRef = useRef(null);
	const smChatBoxRef = useRef(null);
	const smRoleRef = useRef(null);
	const eeChatBoxRef = useRef(null);
	const eeRoleRef = useRef(null);
	const ggRoleRef = useRef(null);
	const rolesRef = useRef({});
	const [storesReady, setStoreReady] = useState(false);
	const fibonacci = [1, 2, 3, 5, 8, 13, 21];

	const poText =
		'產品待辦清單好了之後 ， 我們來召集 ScrumMaster 和開發團隊共同召開_HEIGHTLIGHT_短衝規劃會議（Sprint Planning）_HEIGHTLIGHT_ 。 短衝即是一個迭代 ， 具有固定時間限制 ， 我們會在這個會議中 ， 決定要完成哪些工作事項來達到商業需求 ， 列出短衝待辦清單 （Sprint Backlog） ， 並由開發團隊在接下來的產品開發週期裡執行 。';

	const smText = {
		1: '哦哦 ， 你是新來的前端吧 ！ 我是這次的 _HEIGHTLIGHT_ScrumMaster MM_HEIGHTLIGHT_ ， 我的工作主要是促成開發團隊成員協作 、 引導團隊進行自省會議 ， 提升團隊成員對 Scrum 瞭解 。',
		2: '這兩位是 EE 和 GG ， 是我們開發團隊的成員唷～ 我們團隊_HEIGHTLIGHT_一次 Sprint 週期是兩週_HEIGHTLIGHT_的時間 ， 依照我的觀察 ， 目前團隊可以負擔的點數 (Story Point) 大約是 _HEIGHTLIGHT_20 點_HEIGHTLIGHT_左右。'
	};
	const eeText = {
		3: '欸新來的 ， 你應該不知道點數是什麼意思吧ㄏㄏ ， 我來跟你介紹一下吧～ _HEIGHTLIGHT_Story Point_HEIGHTLIGHT_ 目的是為了_HEIGHTLIGHT_衡量速度_HEIGHTLIGHT_ ， 是用大概花費的時間預估出的相對點數哦 。',
		4: '以 _HEIGHTLIGHT_「 費氏數列 」 的 1 、2 、3 、5 、8 、13 、21_HEIGHTLIGHT_ 來估算各項 Story 的分數 。 Story Point 越小 ， 表示這個 Story 花費時間越少 ； 越大 ， 花費時間則越多 。 如果出現了一個 21 分 ， 可能表示這個 Story 太龐大 ， 需要再拆分細項執行唷 ！'
	};

	useEffect(() => {
		if (stage === 0) {
			poChatBoxRef.current.join.current();
			poRoleRef.current.join.current();
			smRoleRef.current.join.current();
			const svg = new Vivus(sprintSmId, {
				type: 'oneByOne',
				duration: 50
			});
			svg.play();
		}
	}, [stage, sprintSmId]);

	useEffect(() => {
		switch (stage) {
			case 1:
				smChatBoxRef.current.join.current();
				poChatBoxRef.current.leave.current();
				Object.values(rolesRef.current).forEach((role) => {
					role.join.current();
				});
				break;
			case 2:
				{
					const svg = new Vivus(storeId, {
						type: 'oneByOne',
						duration: 50
					});
					svg.play();
					poRoleRef.current.leave.current();
					eeRoleRef.current.join.current();
					smChatBoxRef.current.toggle.current();
					setTimeout(ggRoleRef.current.join.current, 400);
					Object.values(rolesRef.current).forEach((role) => {
						role.leave.current();
					});
				}
				break;
			case 3:
				{
					const storeSvgVivus = new Vivus(storeCoverId, {
						type: 'oneByOne',
						duration: 50
					});
					const clockSvgVivus = new Vivus(clockId, {
						duration: 50
					});
					smChatBoxRef.current.leave.current();
					smRoleRef.current.leave.current();
					eeChatBoxRef.current.join.current({
						complete: () => {
							clockSvgVivus.play();
							storeSvgVivus.play(1, () => {
								setStoreReady(true);
							});
						}
					});
				}
				break;
			case 4:
				eeChatBoxRef.current.toggle.current();
				break;
            case 5:
				eeChatBoxRef.current.leave.current();
				eeRoleRef.current.leave.current();
				ggRoleRef.current.leave.current();
                setTimeout(() => {
                    navigate('/SprintBacklog');
                }, 500)
                break
			default:
		}
	}, [stage, storeId, storeCoverId, clockId, navigate]);

	useEffect(() => {
		const handleClick = () => {
			isClickTime && setStage((pre) => pre + 1);
			setIsClickTime(false);
		};
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, [isClickTime]);

	useEffect(() => {
		let timer = null;
		if (!timer && !isClickTime) {
			timer = setTimeout(() => {
				setIsClickTime(true);
				timer = null;
			}, 2400);
		}
		return () => timer && clearTimeout(timer);
	}, [isClickTime]);

	return (
		<>
			<div className="roleChat">
				<div className="roleChat__chat">
					<Role ref={poRoleRef} role="po" />
					<ChatBox
						ref={poChatBoxRef}
						text={poText}
						name="PO"
						className="po"
					/>
				</div>
			</div>
			<div className="roleChat roleChatSm fixedRB">
				<div className="roleChat__chat">
					<ChatBox
						ref={smChatBoxRef}
						text={smText?.[stage] || ''}
						name="MM"
						className="sm"
					/>
					<Role ref={smRoleRef} role="sm" className="bottomHole" />
				</div>
			</div>
			<div className="roleChat fixedRT">
				<div className="roleChat__chat">
					<ChatBox
						ref={eeChatBoxRef}
						text={eeText?.[stage] || ''}
						name="EE"
						className="ee"
					/>
					<Role ref={eeRoleRef} role="ee" />
					<Role ref={ggRoleRef} role="gg" />
				</div>
			</div>
			<div className={`circle stage_${stage}`}>
				<div className="circle_0">
					<span className="fz-s text sprint">Sprint</span>
					<span className="fz-s text sprintBacklog">
						Sprint Backlog
					</span>
					<SprintSmSvg id={sprintSmId} />
				</div>
				<div className="circle_1">
					<Role
						ref={(r) => (rolesRef.current.po = r)}
						role="po"
						className="ScrumMaster rotate180"
					/>
					<Role
						ref={(r) => (rolesRef.current.sm = r)}
						role="sm"
						className="ScrumMaster bottomHole"
					/>
					<Role
						ref={(r) => (rolesRef.current.ee = r)}
						role="ee"
						className="ScrumMaster rotate180"
					/>
					<Role
						ref={(r) => (rolesRef.current.gg = r)}
						role="gg"
						className="ScrumMaster rotate180"
					/>
				</div>
				<div className="circle_2">
					<StoreSvg id={storeId} />
					<span className="point">20</span>
					<span className="fz-s text tramLimit">team limit</span>
					<span className="fz-s text storyPoint">Story Point</span>
				</div>
			</div>
			<div className={`store stage_${stage}`}>
				<Clock2Svg id={clockId} className="clock" />
				<StoreSpineSvg className="storeSpine" />
				{[1, 2, 3, 4, 5, 6, 7].map((n, i) => {
					return (
						<div
							key={n}
							className={`storeCover storeCover_${n}`}
							data-number={fibonacci[i]}
						>
							<StoreCoverSvg
								id={n === 1 ? storeCoverId : ''}
								className={`storeCover storeCover_${n} ${
									storesReady ? 'show' : ''
								}`}
							/>
						</div>
					);
				})}
				<Clock1Svg className="clock_item clock_item_1" />
				<Clock2Svg className="clock_item clock_item_2" />
				<Clock3Svg className="clock_item clock_item_3" />
				<Clock4Svg className="clock_item clock_item_4" />
				<Clock5Svg className="clock_item clock_item_5" />
				<Clock1Svg className="clock_item clock_item_6" />
				<BombSvg className="clock_item clock_item_7" />
			</div>
		</>
	);
}
