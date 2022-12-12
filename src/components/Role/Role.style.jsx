import { styled } from '@linaria/react';
import { color } from '@styles/setting.style';

export const RoleFrameStyle = styled.div`
	overflow: hidden;

	&::before {
		content: '';
		left: -20%;
		width: 140%;
		height: 140%;
		background-size: contain;
		background-repeat: no-repeat;
		transform: scale(0);
		transition-duration: 0.5s;
		opacity: 0;
		z-index: 2;
	}
`;

export const RoleStyle = styled.div`
	position: relative;
	display: flex;
	align-items: ${(props) => (props.name === 'sm' ? 'end' : 'start')};
	z-index: 29;
	transform: rotate(${(props) => (props.isBottom ? '180deg' : '0')});
	pointer-events: none;

	img {
		position: relative;
		transform: translateY(
				${(props) => (props.name === 'sm' ? '100%' : '-100%')}
			)
			scale(0.5, 0);
		transform-origin: ${(props) =>
			props.name === 'sm' ? 'bottom' : 'top'};
		z-index: 3;
	}
	&.keep {
		img {
			transform: translateY(0) scale(1);
		}
		&::after {
			transition: 0s;
		}
		${RoleFrameStyle}::before {
			transition: 0s;
		}
	}

	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: ${(props) => (props.name === 'sm' ? 'initial' : '-8px')};
		bottom: ${(props) => (props.name === 'sm' ? '-8px' : 'initial')};
		width: 100%;
		height: 40px;
		background: ${color.bgDark};
		border-radius: 50%;
		transform: scale(0);
		transition-duration: 0.5s;
		z-index: 1;
	}

	${RoleFrameStyle}::before {
		position: absolute;
		top: ${(props) => (props.name === 'sm' ? 'initial' : '0')};
		bottom: ${(props) => (props.name === 'sm' ? '0' : 'initial')};
		transform-origin: ${(props) =>
			props.name === 'sm' ? 'bottom' : 'top'};
		background-position: ${(props) =>
			props.name === 'sm' ? 'bottom' : 'top'};
		background-image: ${(props) =>
			props.name &&
			`url(/src/assets/images/role_${props.name}_light.png)`};
	}

	&.active {
		&::after {
			transition-delay: ${(props) =>
				props.delay != null ? `${+props.delay / 1000}s` : '0s'};
			transform: scale(1);
		}
		${RoleFrameStyle}::before {
			transform: scale(1);
			transition-delay: ${(props) =>
				props.delay != null ? `${+props.delay / 1000}s` : '0s'};
			opacity: 1;
		}
	}
`;
