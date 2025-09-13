import { styled } from '@linaria/react';
import { color, alpha } from '@styles/setting.style';
import SprintProcessSvg from '@images/sprint_process.svg?react';

export const SprintProcessBg = styled(SprintProcessSvg)`
	filter: url(#noise) blur(1px);
`;

export const ContentBox = styled.section`
	div {
		margin: 0 8px;
	}

	ul {
		margin-left: 40px;
		list-style: disc;
	}
`;

export const TitleBox = styled.header`
	padding: ${(props) => props.width === 'max-content' ? '0 1.5rem' : 'initial'};
	border: 4px solid
		${(props) =>
			props.color === 'primary' ? color.primary : color.roleTeam1};
	background: ${color.bgDark + alpha(60)};
	width: ${(props) => props.width || 'auto'};
	border-radius: 20px;
	pointer-events: auto;

	h2 {
		text-align: center;
		color: ${(props) =>
			props.color === 'primary' ? color.primary : color.roleTeam1};
	}
	h3 {
		text-align: center;
		color: ${(props) =>
			props.color === 'primary' ? color.primaryDark : color.primary};
	}
`;

export const IntroItem = styled.li`
	flex: 0 0 calc(33.33% - 2vw);
	transition-duration: 0.5s;
	transition-delay: var(--delay);

	&:nth-child(2) {
		transition-delay: calc(var(--delay) + 0.4s);
	}
	&:nth-child(3) {
		transition-delay: calc(var(--delay) + 0.8s);
	}

	img {
		height: max-content;
	}
`;

export const IntroList = styled.ul`
	display: flex;
	justify-content: space-between;
	margin: 0 2vw;
	gap: 2vw;

	${IntroItem} {
		--delay: ${(props) =>
			props.stage > 0 && props.stage < 3 ? '0.8s' : '0s'};
		opacity: ${(props) => (props.stage > 0 && props.stage < 3 ? 1 : 0)};
		transform: ${(props) => {
			if (props.stage < 1) {
				return 'translateY(200px)';
			}
			if (props.stage < 3) {
				return 'translateY(0)';
			}
			return 'translateY(-200px)';
		}};
	}
`;

export const MainStyle = styled.main`
	pointer-events: none;

	.relative {
		position: relative;
		margin: -2rem 6rem 2rem;
		width: calc(100vw - 22rem);

		${TitleBox} {
			position: absolute;
		}
		.scurm_0 {
			top: 11.5%;
			left: 4.5%;
			transform: translate(0, -50%);
		}
		.scurm_1 {
			top: 28%;
			left: 4.5%;
			transform: translate(0, -50%);
		}
		.scurm_2 {
			top: 44.5%;
			left: 4.5%;
			transform: translate(0, -50%);
		}
		.scurm_3 {
			top: 68%;
			left: 26.5%;
			transform: translate(-50%, 0);
		}
	}
`;
