import { useId } from 'react';
import { useLayoutEffect, useRef } from 'react';
import dynamics from 'dynamics.js';
import { ReactComponent as PillSvg } from '@images/pill.svg';
import './index.scss';

function Button({ as, onClick, text, className }) {
	const Tag = as || 'div';
	const id = useId();
	const textRef = useRef(null);

	const mouseEnterAni = useRef(null);
	const mouseOutAni = useRef(null);

	const handleMouse = (e) => {
		if (e.type === 'mouseenter') {
			mouseEnterAni.current && mouseEnterAni.current();
		}
		if (e.type === 'mouseout') {
			mouseOutAni.current && mouseOutAni.current();
		}
	};

	useLayoutEffect(() => {
		const el = document.getElementById(id);
		const svgs = el.children;
		const [cover, side] = svgs;
		const pathHover = cover.firstElementChild.getAttribute('data-hover-d');
		const pathOut = cover.firstElementChild.getAttribute('d');
		const paths = [cover.firstElementChild, side.firstElementChild];

		mouseEnterAni.current = () => {
			dynamics.animate(
				paths,
				{ d: pathHover },
				{ type: dynamics.spring }
			);

			dynamics.animate(
				textRef.current,
				{ scale: 1.25 },
				{ type: dynamics.spring }
			);
		};

		mouseOutAni.current = () => {
			dynamics.animate(
				paths,
				{ d: pathOut },
				{ type: dynamics.easeIn, duration: 350 }
			);

			dynamics.animate(
				textRef.current,
				{ scale: 1 },
				{ type: dynamics.easeIn, duration: 350 }
			);
		};
	}, []);

	return (
		<Tag
			id={id}
			className={['button', className].join(' ')}
			onMouseEnter={handleMouse}
			onMouseOut={handleMouse}
			onClick={onClick}
		>
			<PillSvg className="button__cover" />
			<PillSvg className="button__side" />
			<span ref={textRef}>{text}</span>
		</Tag>
	);
}

export default Button;
