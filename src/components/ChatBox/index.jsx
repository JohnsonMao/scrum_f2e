import React, {
	useImperativeHandle,
	useId,
	useLayoutEffect,
	useRef
} from 'react';
import dynamics from 'dynamics.js';
import { color } from '@styles/setting.style.jsx';
import { ChatBoxStyle, NextArrow } from './ChatBox.style';
import './index.scss';

function CheckBox({ text, name, className, slot, transformOrigin }, ref) {
	const SLOT_KEY = '_SLOT_';
	const HEIGHTLIGHT_KEY = '_HEIGHTLIGHT_';
	const hasSlot = typeof text === 'string' && text.includes(SLOT_KEY);
	const textArray = hasSlot
		? text.split(SLOT_KEY)
		: text?.split(HEIGHTLIGHT_KEY) || [];

	const id = useId();
	const animation = useRef({});
	const join = useRef(null);
	const leave = useRef(null);
	const toggle = useRef(null);

	useImperativeHandle(ref, () => ({ join, leave, toggle, animation }));

	useLayoutEffect(() => {
		const el = document.getElementById(id);
		const colorMap = {
			PO: color.primary,
			MM: color.roleSm,
			GG: color.roleTeam1,
			EE: color.roleTeam2
		};
		const initProps = {
			scaleX: 0,
			scaleY: 0.01
		};
		const processProps = {
			backgroundColor: colorMap[name] || colorMap.PO,
			scaleX: 1,
			scaleY: 0.01
		};
		const finishProps = {
			backgroundColor: 'rgba(10, 13, 19, 0.6)',
			scaleX: 1,
			scaleY: 1
		};

		animation.current.join = (param) => {
			const complete = param?.complete;
			const delay = param?.delay || 800;

			dynamics.animate(el, processProps, {
				type: dynamics.linear,
				friction: 400,
				duration: 400,
				delay,
				complete: () => {
					dynamics.animate(el, finishProps, {
						type: dynamics.spring,
						friction: 400,
						duration: 1200,
						complete: complete && complete()
					});
				}
			});
		};

		animation.current.toggle = () => {
			dynamics.animate(el, processProps, {
				type: dynamics.easeOut,
				friction: 100,
				duration: 100,
				complete: () => {
					dynamics.animate(el, initProps, {
						type: dynamics.easeOut,
						friction: 100,
						duration: 100,
						complete: () => animation.current.join({ delay: 0 })
					});
				}
			});
		};

		animation.current.leave = () => {
			dynamics.animate(el, processProps, {
				type: dynamics.linear,
				friction: 200,
				duration: 400,
				complete: () => {
					dynamics.animate(el, initProps, {
						type: dynamics.easeOut,
						friction: 200,
						duration: 200
					});
				}
			});
		};

		join.current = (joinParam) => {
			const complete = joinParam?.complete;
			const delay = joinParam?.delay || 800;

			dynamics.animate(
				el,
				{
					backgroundColor: colorMap[name] || colorMap.PO,
					scaleX: 1,
					scaleY: 0.01
				},
				{
					type: dynamics.linear,
					friction: 400,
					duration: 400,
					delay,
					complete: () => {
						dynamics.animate(
							el,
							{
								backgroundColor: 'rgba(10, 13, 19, 0.6)',
								scaleX: 1,
								scaleY: 1
							},
							{
								type: dynamics.spring,
								friction: 400,
								duration: 1200,
								complete: complete && complete()
							}
						);
					}
				}
			);
		};

		toggle.current = () => {
			dynamics.animate(
				el,
				{
					backgroundColor: '#00FFE0',
					scaleX: 1,
					scaleY: 0.01
				},
				{
					type: dynamics.easeOut,
					friction: 100,
					duration: 100,
					complete: () => {
						dynamics.animate(
							el,
							{
								scaleX: 0.01,
								scaleY: 0.01
							},
							{
								type: dynamics.easeOut,
								friction: 100,
								duration: 100,
								complete: () => join.current({ delay: 0 })
							}
						);
					}
				}
			);
		};

		leave.current = () => {
			dynamics.animate(
				el,
				{
					backgroundColor: '#00FFE0',
					scaleX: 1,
					scaleY: 0.01
				},
				{
					type: dynamics.linear,
					friction: 200,
					duration: 400,
					complete: () => {
						dynamics.animate(
							el,
							{
								scaleX: 0.01,
								scaleY: 0.01
							},
							{
								type: dynamics.easeOut,
								friction: 200,
								duration: 200
							}
						);
					}
				}
			);
		};
	}, [id, name]);

	return (
		<ChatBoxStyle
			id={id}
			transformOrigin={transformOrigin}
			className={`${name.toLowerCase()} ${className}`}
		>
			<i className="name">{name}</i>
			<span className="text">
				{textArray.map((str, index) =>
					hasSlot ? (
						<Slot key={index} str={str} element={slot[index]} />
					) : (
						<HeightLight key={index} index={index} str={str} />
					)
				)}
			</span>
			<NextArrow />
		</ChatBoxStyle>
	);
}

const HeightLight = ({ str, index }) => {
	return str && <span className={index % 2 ? 'heightlight' : ''}>{str}</span>;
};

const Slot = ({ str, element }) => {
	return (
		str && (
			<>
				<span>{str}</span>
				{React.isValidElement(element)
					? React.cloneElement(element)
					: null}
			</>
		)
	);
};

export default React.forwardRef(CheckBox);
