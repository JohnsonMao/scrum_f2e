import { useId } from 'react';
import { useLayoutEffect, useRef } from 'react';
import dynamics from 'dynamics.js';
import { cx } from '@linaria/core';
import { flexCenter } from '@styles/utils.style';
import { ButtonStyle, PillShape } from './Button.style';

function Button({ onClick, text, disabled }) {
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
console.log('ddd')
		mouseEnterAni.current = () => {
			const options = { type: dynamics.spring };

			dynamics.animate(paths, { d: pathHover }, options);
			dynamics.animate(textRef.current, { scale: 1.25 }, options);
		};

		mouseOutAni.current = () => {
			const options = { type: dynamics.easeIn, duration: 350 };

			dynamics.animate(paths, { d: pathOut }, options);
			dynamics.animate(textRef.current, { scale: 1 }, options);
		};
	}, [id]);

	return (
		<ButtonStyle
			id={id}
			className={cx(flexCenter)}
			disabled={disabled}
			onMouseEnter={handleMouse}
			onMouseOut={handleMouse}
			onClick={onClick}
		>
			<PillShape cover="cover" />
			<PillShape />
			<span ref={textRef}>{text}</span>
		</ButtonStyle>
	);
}

export default Button;
