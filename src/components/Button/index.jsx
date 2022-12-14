import { useState, useId } from 'react';
import { useLayoutEffect, useRef } from 'react';
import dynamics from 'dynamics.js';
import { cx } from '@linaria/core';
import { flexCenter } from '@styles/utils.style';
import { ButtonStyle, PillShape } from './Button.style';

function Button({ onClick, text, disabled, className, aniType, aniDelay, aniCallback }) {
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

		const join = (delay = 800, complete) => {
			const prop = { scale: 1 };
			const options = {
				type: dynamics.spring,
				friction: 240,
				duration: 800,
				delay,
				complete: () => {
					complete && complete();
				}
			}

			dynamics.animate(el, prop, options);
		};

		const leave = (complete) => {
			const props = { scale: 0 };
			const options = {
				type: dynamics.easeIn,
				friction: 400,
				duration: 400,
				complete: () => {
					complete && complete();
				}
			}

			dynamics.animate(el, props, options);
		};

		switch (aniType) {
			case 'join':
				join(aniDelay, aniCallback);
				break;
			case 'leave':
				leave(aniCallback);
				break;
			default:
		}
	}, [id, aniType, aniDelay, aniCallback]);


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
	}, [id]);

	return (
		<ButtonStyle
			id={id}
			className={cx(flexCenter, className)}
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

export default Button;
