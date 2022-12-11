import { styled } from '@linaria/react';
import { color, alpha, radial } from '@styles/setting.style';
import { RoleStyle } from '@/components/Role/Role.style';

const stageConfig = {
	0: {
		bg: color.primary + alpha(30),
		bg1: color.primary + alpha(15),
		bg2: radial(color.primary),
		tooltip: color.textTint,
		padding: '1.5rem',
		translate: 'translate(-50%, -10%)'
	},
	1: {
		bg: color.roleSm + alpha(30),
		bg1: color.roleSm + alpha(15),
		bg2: radial(color.roleSm),
		tooltip: 'transparent',
		padding: '1.5rem',
		translate: 'translate(0%, -85%)'
	},
	2: {
		bg: color.roleSm + alpha(30),
		bg1: color.roleSm + alpha(15),
		bg2: radial(color.roleSm),
		tooltip: color.roleSmDark,
		padding: '3rem',
		translate: 'translate(-120%, -85%)'
	},
	3: {
		bg: 'transparent',
		bg1: 'transparent',
		bg2: 'transparent',
		tooltip: 'transparent',
		padding: '3rem',
		translate: 'translate(-120%, -85%)'
	}
};

const clockImg = {
	1: '../../../src/assets/images/clock_1.svg',
	2: '../../../src/assets/images/clock_2.svg',
	3: '../../../src/assets/images/clock_3.svg',
	4: '../../../src/assets/images/clock_4.svg',
	5: '../../../src/assets/images/clock_5.svg',
	6: '../../../src/assets/images/clock_6.svg',
	7: '../../../src/assets/images/bomb.svg'
};

export const Circle = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	padding: ${(props) =>
		stageConfig[props.stage]?.padding || stageConfig[3].padding};
	border-radius: 50%;
	width: 45vh;
	height: 45vh;
	background: ${(props) => stageConfig[props.stage]?.bg || stageConfig[3].bg};
	transform: ${(props) =>
		stageConfig[props.stage]?.translate || stageConfig[3].translate};
	transition: 1s;

	svg {
		filter: url(#noise) blur(1px)
			drop-shadow(12px 12px 1px ${color.text + alpha(15)});
	}

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 10px;
		left: 10px;
		height: inherit;
		width: inherit;
		border-radius: inherit;
		backdrop-filter: blur(4px);
		z-index: -2;
	}

	&::before {
		background: ${(props) =>
			stageConfig[props.stage]?.bg1 || stageConfig[3].bg1};
		z-index: -1;
	}

	&::after {
		background: ${(props) =>
			stageConfig[props.stage]?.bg2 || stageConfig[3].bg2};
	}

	.text {
		position: absolute;
		padding: 0 12px;
		background: ${(props) =>
			stageConfig[props.stage]?.tooltip || stageConfig[3].tooltip};
		color: ${color.bgDark};
		font-weight: bold;
		transform: translateY(-100%);
		transition-duration: 0.5s;
		transition-delay: 1s;

		&::before,
		&::after {
			content: '';
			position: absolute;
			background: inherit;
		}

		&::after {
			left: 50%;
			top: 100%;
			width: 2px;
			height: 50%;
		}
		&::before {
			left: calc(50% - 2px);
			top: 150%;
			width: 6px;
			height: 6px;
			border-radius: 50%;
		}
	}
	.sprint {
		top: 16%;
		left: 16%;
	}
	.sprintBacklog {
		top: 16%;
		right: 0;
	}
	${RoleStyle} {
		position: absolute;
		width: 33.33%;

		&.po {
			bottom: 36%;
			right: 4%;
			z-index: 2;
		}
		&.sm {
			bottom: 22%;
			right: 24%;
			z-index: 3;
		}
		&.gg {
			bottom: 43%;
			left: 28%;
			z-index: 1;
		}
		&.ee {
			bottom: 30%;
			left: 8%;
			z-index: 2;
		}
	}

	.point {
		position: absolute;
		top: 48%;
		right: 48%;
		background: ${color.primary + alpha(90)};
		font-size: 36px;
		border-radius: 50%;
		width: 20%;
		height: 20%;
		line-height: 1;
	}
	.tramLimit {
		top: 15%;
		right: 25%;
	}
	.storyPoint {
		bottom: -6%;
		left: 19.5%;

		&::before {
			top: -180%;
		}
		&::after {
			height: 180%;
			top: -180%;
		}
	}
`;

export const StoryStyle = styled.div`
	position: relative;
	transition-duration: 0.3s;
	opacity: 0;

	.storyClock {
		position: absolute;
		top: -18px;
		right: -2px;
		width: 54px;
		height: 54px;
		transition-duration: inherit;
		transition-delay: inherit;
		opacity: 0;
		z-index: 1;

		path {
			stroke: ${color.roleTeam1};
			fill: ${color.bgDark + alpha(98)};
		}
	}

	&::after {
		content: attr(data-number);
		position: absolute;
		top: 50%;
		left: 50%;
		padding: 0.5rem;
		width: 54px;
		height: 54px;
		line-height: 1;
		text-align: center;
		background: ${color.primary + alpha(90)};
		font-size: 36px;
		border-radius: 50%;
		transform: translate(-25%, -50%);
		transition-duration: inherit;
		transition-delay: inherit;
		opacity: 0;
		filter: url(#noise) blur(0.6px);
	}
`;

export const StoriesStyle = styled.div`
	--w: 70px;
	--h: 140px;
	--g: 2rem;
	--x: calc(var(--w) + var(--g));
	--y: calc(var(--h) + var(--g));

	bottom: 2rem;
	display: grid;
	grid-template-columns: repeat(9, var(--w));
	grid-template-rows: repeat(2, var(--h));
	gap: var(--g);

	svg {
		filter: url(#noise) blur(1px);
	}

	.clock path {
		stroke: ${color.roleTeam1};
		fill: ${color.bgDark + alpha(90)};
	}

	div:nth-child(1),
	div:nth-child(2),
	div:nth-child(3),
	div:nth-child(4) {
		grid-row: 1/2;
	}
	div:nth-child(5),
	div:nth-child(6),
	div:nth-child(7),
	div:nth-child(8) {
		grid-row: 2/3;
	}
	div:nth-child(1) {
		grid-column: 1/3;
		padding-left: 3rem;
		padding-bottom: 3rem;
		opacity: 0;
	}
	div:nth-child(2) {
		grid-column: 3/5;
	}
	div:nth-child(3) {
		grid-column: 5/7;
		transition-delay: 0.3s;
		transform: translate(calc(var(--x) * -2), 0);
	}
	div:nth-child(4) {
		grid-column: 7/9;
		transition-delay: 0.6s;
		transform: translate(calc(var(--x) * -4), 0);
	}
	div:nth-child(5) {
		grid-column: 2/4;
		transition-delay: 0.9s;
		transform: translate(calc(var(--x) * 1), calc(var(--y) * -1));
	}
	div:nth-child(6) {
		grid-column: 4/6;
		transition-delay: 1.2s;
		transform: translate(calc(var(--x) * -1), calc(var(--y) * -1));
	}
	div:nth-child(7) {
		grid-column: 6/8;
		transition-delay: 1.5s;
		transform: translate(calc(var(--x) * -3), calc(var(--y) * -1));

		.storyClock path {
			stroke: ${color.roleTeam2};
		}
	}
	div:nth-child(8) {
		grid-column: 8/10;
		transition-delay: 1.8s;
		transform: translate(calc(var(--x) * -5), calc(var(--y) * -1));

		.storyClock {
			width: 64px;
			height: 64px;
			path {
				stroke: ${color.danger};
			}
		}
	}
	.storeSpine {
		position: absolute;
		top: 0;
		left: calc(var(--x) * 2.15);
		width: 43px;
		height: auto;
		transition: 0.3s;
		transform: translate(-18px, -108px) scale(0.86);
		opacity: 0;
	}

	&.ready {
		.storeSpine {
			transform: translate(0, 0) scale(1);
			opacity: 1;
		}
		div:nth-child(1),
		div:nth-child(2) {
			transition-delay: 0.3s;
			opacity: 1;
		}
	}

	&.expand {
		div {
			transform: translate(0, 0);
			opacity: 1;
		}
		.storeSpine {
			opacity: 0;
		}
	}
	&.check {
		.storyClock {
			opacity: 1;
		}
		${StoryStyle}::after {
			opacity: 1;
		}
		div:nth-child(7) {
			&::after {
				background: ${color.roleTeam2};
			}
			path {
				transition-duration: 0.3s;
				transition-delay: 1.5s;
				stroke: ${color.roleTeam2};
			}
		}
		div:nth-child(8) {
			&::after {
				background: ${color.danger};
			}
			path {
				transition-duration: 0.3s;
				transition-delay: 1.8s;
				stroke: ${color.danger};
			}
		}
	}
`;

export const MainStyle = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100vh;
	pointer-events: none;

	.order-1 {
		order: 1;
	}
`;
