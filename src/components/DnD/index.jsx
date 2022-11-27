import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export function Drop({ children, ...props }) {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		// 為了解決 React.StrictMode 初始兩次渲染導致拖曳失效的問題
		const animation = requestAnimationFrame(() => setEnabled(true));

		return () => {
			cancelAnimationFrame(animation);
			setEnabled(false);
		};
	}, []);

	if (!enabled) {
		return null;
	}

	return (
		<Droppable {...props}>
			{(provided) => {
				if (React.isValidElement(children)) {
					return React.cloneElement(children, {
						...provided.droppableProps,
						ref: provided.innerRef,
						provided
					});
				}
				return <div />;
			}}
		</Droppable>
	);
}

export const DropChild = React.forwardRef(
	({ children, as, provided, ...props }, ref) => {
		const Tag = as || 'div';

		return (
			<Tag ref={ref} {...props} {...provided.droppableProps}>
				{children}
				{provided?.placeholder}
			</Tag>
		);
	}
);

export const Drag = ({ children, ...props }) => {
	return (
		<Draggable {...props}>
			{(provided, s) => {
				console.log(s)
				if (React.isValidElement(children)) {
					return React.cloneElement(children, {
						...provided.draggableProps,
						...provided.dragHandleProps,
						ref: provided.innerRef
					});
				}
				return <div />;
			}}
		</Draggable>
	);
};
