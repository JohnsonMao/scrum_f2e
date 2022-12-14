import { useId, useLayoutEffect, useState } from 'react';
import dynamics from 'dynamics.js';
import { cx } from '@linaria/core';
import { RoleStyle, RoleFrameStyle } from './Role.style';

function Role({
	name,
	isBottom,
	aniType,
	aniDelay = 400,
	aniCallback,
	className
}) {
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
	}, {});
	const id = useId();
	const [state, setState] = useState('');

	useLayoutEffect(() => {
		const el = document.getElementById(id);

		const join = (delay, complete) => {
			const props = {
				scale: 1,
				translateY: 0
			};
			const options = {
				type: dynamics.spring,
				friction: 600,
				duration: 1800,
				delay,
				complete
			};
			setState('active');
			dynamics.animate(el, props, options);
		};

		const leave = (complete) => {
			const props = {
				scale: 0.5,
				translateY: name === 'sm' ? 150 : -150
			};
			const options = {
				type: dynamics.bezier,
				points: [
					{ x: 0, y: 0, cp: [{ x: 0.292, y: -0.623 }] },
					{ x: 1, y: 1, cp: [{ x: 0.546, y: 1.838 }] }
				],
				friction: 400,
				duration: 600,
				complete: () => {
					setState('');
					complete && complete();
				}
			};
			dynamics.animate(el, props, options);
		};

		switch (aniType) {
			case 'join':
				join(aniDelay, aniCallback);
				break;
			case 'leave':
				leave(aniCallback);
				break;
			case 'keep':
				setState('active keep');
				break;
			default:
		}
	}, [id, name, aniType, aniDelay, aniCallback]);

	return (
		<RoleStyle
			isBottom={isBottom}
			delay={aniDelay - 400}
			name={name}
			className={cx(name, className, state)}
		>
			<RoleFrameStyle>
				<img id={id} src={roleImages[name]} alt="PO" />
			</RoleFrameStyle>
		</RoleStyle>
	);
}

export default Role;
