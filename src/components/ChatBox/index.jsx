import React, { useState, useId, useLayoutEffect, useRef } from 'react';
import dynamics from 'dynamics.js';
import { cx } from '@linaria/core';
import { color } from '@styles/setting.style.jsx';
import { ChatBoxStyle, NextArrow } from './ChatBox.style';

function CheckBox({
	name,
	text,
	nextArrow,
	aniType,
	aniDelay,
	aniCallback,
	className,
	slot
}) {
	const SLOT_KEY = '_SLOT_';
	const HEIGHTLIGHT_KEY = '_HEIGHTLIGHT_';
	const hasSlot = typeof text === 'string' && text.includes(SLOT_KEY);
	const textArray = hasSlot
		? text.split(SLOT_KEY)
		: text?.split(HEIGHTLIGHT_KEY) || [];

	const id = useId();
	const toggle = useRef(null);

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

		const join = (delay = 800, complete) => {
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
						complete
					});
				}
			});
		};

		const leave = (complete, isToggle) => {
			if (isToggle) processProps.color = 'transparent';
			dynamics.animate(el, processProps, {
				type: dynamics.linear,
				friction: 50,
				duration: 100,
				complete: () => {
					dynamics.animate(el, initProps, {
						type: dynamics.easeOut,
						friction: 100,
						duration: 180,
						complete
					});
				}
			});
		};

		toggle.current = () => leave(() => join(0));

		switch (aniType) {
			case 'join':
				join(aniDelay, aniCallback);
				break;
			case 'leave':
				leave(aniCallback);
				break;
			default:
		}
	}, [id, name, aniType, aniDelay, aniCallback]);

	useLayoutEffect(() => {
		if (text && aniType === 'toggle') toggle.current();
	}, [text, aniType]);

	return (
		<>
			<ChatBoxStyle
				id={id}
				role={name.toLowerCase()}
				className={cx(className)}
			>
				<i className="name">{name}</i>
				<p className="text">
					{textArray.map((str, index) =>
						hasSlot ? (
							<Slot key={index} str={str} element={slot[index]} />
						) : (
							<HeightLight key={index} index={index} str={str} />
						)
					)}
				</p>
				{nextArrow !== false && <NextArrow />}
			</ChatBoxStyle>
		</>
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

export default CheckBox;
