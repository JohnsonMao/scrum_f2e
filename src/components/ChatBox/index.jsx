import React, {
	useImperativeHandle,
	useId,
	useLayoutEffect,
	useRef
} from 'react';
import dynamics from 'dynamics.js';
import { ReactComponent as TriangleSvg } from '@images/triangle.svg';
import './index.scss';

function CheckBox({ text, name, className, slot }, ref) {
	const SLOT_KEY = '_SLOT_';
	const HEIGHTLIGHT_KEY = '_HEIGHTLIGHT_';
	const hasSlot = typeof text === 'string' && text.includes(SLOT_KEY);
	const textArray = hasSlot
		? text.split(SLOT_KEY)
		: text?.split(HEIGHTLIGHT_KEY) || [];

	const id = useId();
	const join = useRef(null);
	const leave = useRef(null);
	const toggle = useRef(null);

	useImperativeHandle(ref, () => ({ join, leave, toggle }));

	useLayoutEffect(() => {
		const el = document.getElementById(id);
		const colorMap = {
			PO: 'rgb(0, 255, 224)',
			MM: 'rgb(211, 85, 255)',
			GG: 'rgb(255, 199, 0)',
			EE: 'rgb(255, 122, 0)'
		}

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
		<p id={id} className={['chatBox', className].join(' ')}>
			<i className="chatBox__name">{name}</i>
			<span className="chatBox__text">
				{textArray.map((str, index) =>
					hasSlot ? (
						<Slot key={index} str={str} element={slot[index]} />
					) : (
						<HeightLight key={index} index={index} str={str} />
					)
				)}
			</span>
			<TriangleSvg className="chatBox__next" width="32px" />
		</p>
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
