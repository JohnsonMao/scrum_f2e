import { cx } from '@linaria/core';
import { useState, useLayoutEffect } from 'react';
import TransitionStyle from './Transition.style';

const convertToSecond = (number) => {
	if (!Number.isNaN(+number)) {
		if (String(number).includes('.') || number < 100) return number + 's';
		if (number) return number + 'ms';
	}
	return number;
};

const convertToNumber = (number) => {
	if (Number.isNaN(+number)) {
		const n = String(number).replace(/[^\d]/g, '') * 1;
		return n < 100 ? n * 1000 : n;
	}
	if (String(number).includes('.') || number < 100) return number * 1000;
	return +number;
};

function Transition({ children, className, show, duration = 1, delay = 0 }) {
	const [active, setActive] = useState('hide');
	const transformDuration = convertToSecond(duration);
	const transformDelay = convertToSecond(delay);
	const activeDelayTime = convertToNumber(delay);
	const endTotalTime = convertToNumber(delay) + convertToNumber(duration);

	useLayoutEffect(() => {
		const handleActive = () => setActive(show ? 'active' : 'hide');
		const time = show ? activeDelayTime : endTotalTime;
		const timer = setTimeout(handleActive, time);

		if (show) setActive(show ? '' : 'active')

		return () => clearTimeout(timer);
	}, [show, activeDelayTime, endTotalTime]);

	return (
		<TransitionStyle
			duration={transformDuration}
			delay={transformDelay}
			show={show}
			className={cx(active, className)}
		>
			{children}
		</TransitionStyle>
	);
}

export default Transition;
