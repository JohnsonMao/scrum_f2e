import React, {
	useId,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import dynamics from 'dynamics.js';
import './index.scss';

function Role({ role, className }, ref) {
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
	const isBottom = className?.includes('bottomHole')

	useImperativeHandle(ref, () => ({ join, leave }));

	useLayoutEffect(() => {
		const el = document.getElementById(id);

		join.current = (joinParam) => {
			const complete = joinParam?.complete;
			setActive(true);
			dynamics.animate(
				el,
				{
					scale: 1,
					translateY: isBottom ? '-100%' : '100%'
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
					translateY: isBottom ? '100%' : '-100%',
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
		<div className={`role ${role} ${className} ${active ? 'active': ''}`}>
			<div className="role__frame">
				<img id={id} src={roleImages[role]} alt="PO" />
			</div>
		</div>
	);
}

export default React.forwardRef(Role);
