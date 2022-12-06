import { styled } from '@linaria/react';
import { ReactComponent as TriangleSvg } from '@images/triangle.svg';
import {
	color,
    boxShadow,
	rolePoLinear,
	roleSmLinear,
	roleTeam1Linear,
	roleTeam2Linear
} from '@styles/setting.style';

export const NextArrow = styled(TriangleSvg)`
	position: absolute;
	right: 40px;
	bottom: 40px;
	width: 32px;
	animation: next 0.35s infinite alternate ease-in;

	@keyframes next {
		80% {
			transform: translateY(64%) scale(1);
		}
		100% {
			transform: translateY(80%) scale(1.2, 0.5);
		}
	}
`;

export const ChatBoxStyle = styled.p`
	position: relative;
	padding: ${(props) =>
		props.size === 'large' ? '100px 84px' : '40px 84px 40px 100px'};
	white-space: pre-wrap;
	border-radius: ${(props) => (props.size === 'large' ? '80px' : '40px')};
	flex: 1;
	transform: scale(0.01);
	transform-origin: ${(props) => props.transformOrigin || 'right'};
	pointer-events: none;
	z-index: 30;

	&.large {
		padding: 100px 84px;
		border-radius: 80px;
	}

	&.no-next .chatBox__next {
		display: none;
	}

	&.po {
		background-image: ${rolePoLinear};
		border: 2px solid ${color.primary};
		box-shadow: ${boxShadow(color.primary)};
		transform-origin: left;

		.name {
			background: ${color.primary};

			&::before {
				background: ${color.primaryDeepdark};
				box-shadow: ${boxShadow(color.primary)};
			}
		}
		${NextArrow} path {
			stroke: ${color.primary};
			fill: ${color.primary};
		}
	}

	&.sm {
		background-image: ${roleSmLinear};
		border: 2px solid ${color.roleSm};
		box-shadow: ${boxShadow(color.roleSm)};

		.chatBox__name {
			background: ${color.roleSm};

			&::before {
				background: var(--role-sm-dark);
				box-shadow: ${boxShadow(color.roleSm)};
			}
		}
		.chatBox__next path {
			stroke: ${color.roleSm};
			fill: ${color.roleSm};
		}
	}

	&.ee {
		background-image: var(--role-team1-linear);
		border: 2px solid var(--role-team1-default);
		box-shadow: var(--role-po-box-shadow);

		.chatBox__name {
			background: var(--role-team1-default);

			&::before {
				background: var(--role-team-dark);
				box-shadow: var(--role-po-box-shadow);
			}
		}
		.chatBox__next path {
			stroke: var(--role-team1-default);
			fill: var(--role-team1-default);
		}
	}

	&.gg {
		background-image: var(--role-team2-linear);
		border: 2px solid var(--role-team2-default);
		box-shadow: var(--role-po-box-shadow);

		.chatBox__name {
			background: var(--role-team2-default);

			&::before {
				background: var(--role-team-dark);
				box-shadow: var(--role-po-box-shadow);
			}
		}
		.chatBox__next path {
			stroke: var(--role-team2-default);
			fill: var(--role-team2-default);
		}
	}

	.name {
		position: absolute;
		left: -12px;
		top: 40px;
		padding: 0 24px;
        color: ${color.bgDark};
        text-transform: uppercase;

		&::before {
			content: ' ';
			position: absolute;
			left: 0;
			top: 0;
			width: 10px;
			transform: skewY(45deg) translateY(5px);
			z-index: -1;
		}
	}
    .text {
        .heightlight {
            color: var(--text-tint);
        }
    }
`;
