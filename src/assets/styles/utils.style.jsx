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

export const fixedFullScreen = css`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export const rotate180 = css`
	transform: rotate(180deg);
`;

export const bold = css`
	font-weight: bold;
`;

export const fadeIn = css`
	animation: fadeIn 1s;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
