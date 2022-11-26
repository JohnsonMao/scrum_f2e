import React, { useId, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import dynamics from 'dynamics.js'
import './index.scss';

function Role({ role }, ref) {
	const roleModules = import.meta.glob(
		['/src/assets/images/role*.png', '!/src/assets/images/role*light.png'],
		{
			eager: true,
			import: 'default'
		}
	);
	const roleImages = Object.keys(roleModules).reduce((obj, key) => {
		obj[/role_(.*)\.png/.exec(key)?.[1]] = roleModules[key];
		return obj;
	}, {})
	const id = useId();
	const join = useRef(null);
	const leave = useRef(null);
	
	useImperativeHandle(ref, () => ({ join, leave }));

	useLayoutEffect(() => {
		const el = document.getElementById(id);

		join.current = () => {
			dynamics.animate(
				el,
				{
					scale: 1,
					translateY: '100%'
				},
				{
					type: dynamics.spring,
					friction: 500,
					duration: 1200,
					delay: 400
				}
			);
		}
	
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
		}
	}, [id])

	return (
		<div className={['role', role].join(' ')}>
			<div className="role__frame">
				<img id={id} src={roleImages[role]} alt="PO" />
			</div>
		</div>
	);
}

export default React.forwardRef(Role);
