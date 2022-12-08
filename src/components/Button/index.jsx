import React, { useState, useId, useImperativeHandle } from 'react';
import { useLayoutEffect, useRef } from 'react';
import dynamics from 'dynamics.js';
import { cx } from '@linaria/core';
import { flexCenter } from '@styles/utils.style';
import { ButtonStyle, PillShape } from './Button.style';

function Button({ onClick, text, disabled, className }, ref) {
	const id = useId();
	const textRef = useRef(null);

	const mouseEnterAni = useRef(null);
	const mouseOutAni = useRef(null);
	const animation = useRef({});
	const [show, setShow] = useState('');

	useImperativeHandle(ref, () => ({ animation }));

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
			const options = { type: dynamics.spring };

			dynamics.animate(paths, { d: pathHover }, options);
			dynamics.animate(textRef.current, { scale: 1.25 }, options);
		};

		mouseOutAni.current = () => {
			const options = { type: dynamics.easeIn, duration: 350 };

			dynamics.animate(paths, { d: pathOut }, options);
			dynamics.animate(textRef.current, { scale: 1 }, options);
		};

		animation.current.join = (param) => {
			const complete = param?.complete;
			const delay = param?.delay || 800;
			const prop = { opacity: 1, pointerEvents: 'auto' };

			dynamics.animate(el, prop, {
				type: dynamics.linear,
				friction: 400,
				duration: 400,
				delay,
				complete: () => {
					setShow('show');
					complete && complete();
				}
			});
		};

		animation.current.leave = (param) => {
			const complete = param?.complete;
			const props = { opacity: 0, pointerEvents: 'none' };

			dynamics.animate(el, props, {
				type: dynamics.linear,
				friction: 400,
				duration: 400,
				complete: () => {
					setShow('');
					complete && complete();
				}
			});
		};
	}, [id]);

	return (
		<ButtonStyle
			id={id}
			className={cx(flexCenter, className, show)}
			disabled={disabled}
			onMouseEnter={handleMouse}
			onMouseOut={handleMouse}
			onClick={onClick}
		>
			<PillShape cover="cover" />
			<PillShape />
			<div ref={textRef}>
				<div className="buttonText">{text}</div>
			</div>
		</ButtonStyle>
	);
}

export default React.forwardRef(Button);
