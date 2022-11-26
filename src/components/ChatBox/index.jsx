import React, {
	useImperativeHandle,
	useId,
	useLayoutEffect,
	useRef
} from 'react';
import dynamics from 'dynamics.js';
import { ReactComponent as TriangleSvg } from '@images/triangle.svg';
import './index.scss';

function CheckBox({ text, name, className, children }, ref) {
	const HEIGHTLIGHT_KEY = '_HEIGHTLIGHT_';
	const textArray = text?.split(HEIGHTLIGHT_KEY) || [];
	const id = useId();
	const join = useRef(null);
	const leave = useRef(null);

	useImperativeHandle(ref, () => ({ join, leave }));

	useLayoutEffect(() => {
		const el = document.getElementById(id);

		join.current = (joinParam) => {
			const complete = joinParam?.complete;

			dynamics.animate(
				el,
				{
					backgroundColor: '#00FFE0',
					scaleX: 1,
					scaleY: 0.01
				},
				{
					type: dynamics.linear,
					friction: 400,
					duration: 400,
					delay: 800,
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

		leave.current = () => {
			dynamics.animate(
				el,
				{
					scale: 0.3,
					opacity: 0
				},
				{
					type: dynamics.easeInOut,
					friction: 400,
					duration: 1000
				}
			);
		};
	}, [id]);

	return (
		<p id={id} className={['chatBox', className].join(' ')}>
			<i className="chatBox__name">{name}</i>
			<span className="chatBox__text">
				{textArray.map((str, index) =>
					str.includes('_children_') ? (
						str
							.split('_')
							.map((s, i) =>
								s === 'children' ? (
									children
								) : (
									s && <span key={`${index}-${i}`}>{s}</span>
								)
							)
					) : (
						<HeightLight key={index} index={index} str={str} />
					)
				)}
			</span>
			<TriangleSvg className="chatBox__next" width="32px" />
		</p>
	);
}

const HeightLight = ({ str, index }) =>
	str && (
		<span key={index} className={index % 2 ? 'heightlight' : ''}>
			{str}
		</span>
	);

export default React.forwardRef(CheckBox);
