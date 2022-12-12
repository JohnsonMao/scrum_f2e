import { css } from '@linaria/core';
import { RoleStyle } from '@/components/Role/Role.style';
import { ChatBoxStyle } from '@/components/ChatBox/ChatBox.style';

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

export const fixedCenterX = css`
	--position: fixed;
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
`;

export const fixedRB = css`
	--position: fixed;
	position: fixed;
	right: 1.5rem;
	bottom: 3rem;
`

export const fixedRT = css`
	--position: fixed;
	position: fixed;
	right: 0;
	top: 2rem;
`

export const fixedFullScreen = css`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export const roleChat = css`
	position: var(--position, sticky);
	top: 0;
	bottom: 0;
	display: flex;
	padding: 2rem 1rem;
	gap: 2rem;
	height: 38vh;
	z-index: 30;

	${RoleStyle} {
		flex: 0 0 15%;
	}

	${ChatBoxStyle} {
		flex: 1 1 85%;
	}
`
