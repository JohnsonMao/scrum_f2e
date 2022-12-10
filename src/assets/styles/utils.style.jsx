import { css } from '@linaria/core';

export const flexCenter = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const flexColumn = css`
	flex-direction: column;
`;

export const positionCenter = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const positionCenterX = css`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
`;

export const fixedRB = css`
	--position: fixed;
	position: fixed;
	right: 1.5rem;
	bottom: 3rem;
`

export const fixedFullScreen = css`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export const roleChat = css`
	display: flex;
	padding: 2rem 1rem;
	gap: 2rem;
`
