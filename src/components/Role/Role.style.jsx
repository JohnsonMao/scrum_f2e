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
		transition-duration: 1s;
		opacity: 0;
		z-index: 2;
	}
`;

export const RoleStyle = styled.div`
	position: relative;
	z-index: 29;
	flex: 0 0 10%;
	width: 10%;
	min-width: 180px;
	transform: rotate(${(props) => (props.isBottom ? '180deg' : '0')});
	pointer-events: none;

	img {
		position: relative;
		width: 100%;
		object-fit: cover;
		transform: translateY(-100%) scale(0.5, 0);
		transform-origin: top;
		z-index: 3;
	}

	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: -40%;
		width: 100%;
		height: 100%;
		background: ${color.bgDark};
		border-radius: 50%;
		transform: rotateX(75deg) scale(0);
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
			transition-delay: ${(props) =>
				props.delay != null ? `${(+props.delay + 500) / 1000}s` : '0.5s'};
			opacity: 1;
		}
		&::after {
			transition-delay: ${(props) =>
				props.delay != null ? `${+props.delay / 1000}s` : '0s'};
			transform: rotateX(75deg) scale(1);
		}
	}
`;
