import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '@/components/ChatBox';
import Button from '@/components/Button';
import LogoPng from '@images/logo.png';
import './index.scss';

export default function Entrance() {
	const leafImages = import.meta.glob('/src/assets/images/bg_leaf*.png', {
		eager: true,
		import: 'default'
	});

	const navigate = useNavigate();
	const [stage, setStage] = useState('hello');
	const chatBoxRef = useRef(null);
	const handleClick = (action) => {
		setStage(action);
		if (action === 'go') {
			chatBoxRef.current.leave.current();
			setTimeout(() => {
				navigate('/ProductOwner');
			}, 600);
		} else {
			chatBoxRef.current.join.current();
		}
	};
	const fileName = (path) => /\/([^/]+).png$/.exec(path)?.[1] || '';

	const text =
		'呦呼 ， 歡迎進入 _HEIGHTLIGHT_「SCRUM 新手村」_HEIGHTLIGHT_ ， 在正式加入專案開發之前 ，需要請你先了解 Scrum 的流程與精神 ！\n\n請接受挑戰任務 ， 成功通過 Scrum 新手村的挑戰任務吧～';

	return (
		<div className={['entrance', stage].join(' ')}>
			{Object.keys(leafImages).map((imgKey) => (
				<div
					key={imgKey}
					className={['entrance__leaf', fileName(imgKey)].join(' ')}
				>
					<img src={leafImages[imgKey]} alt="Leaf" />
				</div>
			))}
			<div className="entrance__logo">
				<i className="lightPoint l_sm"></i>
				<i className="lightPoint l_ee"></i>
				<i className="lightPoint l_gg"></i>
				<i className="lightPoint r_sm"></i>
				<i className="lightPoint r_ee"></i>
				<i className="lightPoint r_gg"></i>
				<img src={LogoPng} alt="Scrum 新手村" />
				<h2>深入敏捷の村一探究竟</h2>
				<Button
					as="button"
					onClick={() => handleClick('join')}
					text="進入村莊"
				/>
			</div>
			<div className="entrance__chat">
				<ChatBox
					ref={chatBoxRef}
					text={text}
					name="（謎之音）"
					className="po large no-next"
				/>
				<Button
					as="button"
					onClick={() => handleClick('go')}
					text="接受挑戰"
				/>
			</div>
		</div>
	);
}
