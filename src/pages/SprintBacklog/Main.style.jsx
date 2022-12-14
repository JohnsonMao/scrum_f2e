import { styled } from '@linaria/react';
import List from '@/components/List';
import { ListBodyStyle } from '@/components/List/List.style';
import { color, alpha } from '@styles/setting.style';

export const ItemStyle = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 12px;
	padding: 12px;
	border: 2px dashed ${color.text + alpha(60)};
	border-radius: 20px;
	background: ${color.bgDark + alpha(60)};
	gap: 10px;

	span {
		&:first-child {
			background: var(--bg);
			border-radius: 50%;
			text-align: center;
			height: 36px;
			flex: 0 0 36px;
		}
		&:last-child {
			flex: 1;
		}
	}

	&:first-child {
		margin-top: 0;
	}
`;

export const ListStyle = styled(List)`
	height: 100%;

	&:first-child {
		--bg: ${color.primary};
	}
	&:last-child {
		--bg: ${color.roleTeam2};
	}

	${ListBodyStyle} {
		padding: 24px 32px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
`;

export const ListGroup = styled.div`
	margin-left: 2rem;
	display: flex;
	gap: 2rem;
`;

export const Process = styled.div`
	position: relative;
	box-sizing: content-box;
	margin-top: 12px;
	background: ${color.roleTeamDark};
	border: 4px solid ${color.roleTeamDark};
	height: 14px;
	width: 100%;
	border-radius: 11px;

	&::after {
		content: '';
		position: absolute;
		background: ${(props) =>
			props.danger ? color.danger : color.roleTeam1};
		height: 100%;
		border-radius: 7px;
		width: ${(props) => `${props.percent}%`};
		transition: 0.3s;
		transform-origin: left;
	}
	&::before {
		content: attr(data-content);
		position: absolute;
		top: 50%;
		left: 50%;
		font-size: 14px;
		transform: translate(-50%, -50%);
		z-index: 1;
	}
`;

export const MainStyle = styled.main`
	pointer-events: none;

	.eeChatBox {
		flex: 0 0 70%;
	}
`;
