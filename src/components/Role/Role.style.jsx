import { styled } from '@linaria/react';
import { color } from '@styles/setting.style';

export const RoleFrameStyle = styled.div`
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		left: -20%;
		width: 140%;
		height: 140%;
		background-size: contain;
		background-repeat: no-repeat;
		transform: scale(0);
		transform-origin: center 20px;
		transition-duration: 0.5s;
		opacity: 0;
		z-index: 2;
	}
`;

export const RoleStyle = styled.div`
	position: relative;
	z-index: 29;
	transform: rotate(${(props) => (props.isBottom ? '180deg' : '0')});
	pointer-events: none;

	img {
		position: relative;
		transform: translateY(-100%) scale(0.5, 0);
		transform-origin: top;
		z-index: 3;
	}

	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: -8px;
		width: 100%;
		height: 40px;
		background: ${color.bgDark};
		border-radius: 50%;
		transform: scale(0);
		transition-duration: 0.5s;
		z-index: 1;
	}

	${RoleFrameStyle}::before {
		background-image: ${(props) =>
			props.name &&
			`url(/src/assets/images/role_${props.name}_light.png)`};
	}

	&.active {
		${RoleFrameStyle}::before {
			transform: scale(1);
			transition-delay: ${(props) =>
				props.delay != null ? `${(+props.delay) / 1000}s` : '0s'};
			opacity: 1;
		}
		&::after {
			transition-delay: ${(props) =>
				props.delay != null ? `${+props.delay / 1000}s` : '0s'};
			transform: scale(1);
		}
	}
`;
