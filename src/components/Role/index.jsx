import React, {
	useId,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import dynamics from 'dynamics.js';
import { cx } from '@linaria/core';
import { RoleStyle, RoleFrameStyle } from './Role.style';

function Role({ name, isBottom, aniType, aniDelay, aniCallback, className }, ref) {
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
	const join = useRef(null);
	const leave = useRef(null);
	const [active, setActive] = useState(false);

	useImperativeHandle(ref, () => ({ join, leave }));

	useLayoutEffect(() => {
		const el = document.getElementById(id);

		const join = (delay = 400, complete) => {
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
			setActive(true);
			dynamics.animate(el, props, options);
		};

		const leave = (complete) => {
			const props = {
				scale: 0.5,
				translateY: -150
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
					setActive(false);
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
			default:
		}
	}, [id, aniType, aniDelay, aniCallback]);

	useLayoutEffect(() => {
		const el = document.getElementById(id);

		join.current = (joinParam) => {
			const complete = joinParam?.complete;
			setActive(true);
			dynamics.animate(
				el,
				{
					scale: 1,
					translateY: 0
				},
				{
					type: dynamics.spring,
					friction: 500,
					duration: 1800,
					delay: 400,
					complete
				}
			);
		};

		leave.current = (leaveParam) => {
			const complete = leaveParam?.complete;
			setActive(false);
			dynamics.animate(
				el,
				{
					scale: 0.3,
					translateY: '-100%',
					opacity: 0
				},
				{
					type: dynamics.bezier,
					points: [
						{ x: 0, y: 0, cp: [{ x: 0.292, y: -0.623 }] },
						{ x: 1, y: 1, cp: [{ x: 0.546, y: 1.838 }] }
					],
					friction: 400,
					duration: 600,
					complete
				}
			);
		};
	}, [id, isBottom]);

	return (
		<RoleStyle
			isBottom={isBottom}
			delay={aniDelay}
			name={name}
			className={cx(name, className, active ? 'active' : '')}
		>
			<RoleFrameStyle>
				<img id={id} src={roleImages[name]} alt="PO" />
			</RoleFrameStyle>
		</RoleStyle>
	);
}

export default React.forwardRef(Role);
