import { styled } from '@linaria/react';
import { color, radial, primaryLinear } from '@styles/setting.style';

export const LoadingStyle = styled.div`
	flex-direction: column;
	height: 100vh;
	gap: 24px;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 20vh;
		background: ${primaryLinear};
		transform: rotate(180deg);
	}
`;

export const LoadingImgStyle = styled.div`
	position: relative;

	&::after {
		content: '';
		position: absolute;
		top: 64%;
		left: -40%;
		right: -40%;
		bottom: -10%;
		background: ${radial(color.primary)};
		z-index: -1;
	}
`;

export const LoadingBarStyle = styled.div`
	position: relative;
	background: ${color.primaryDark};
	width: 80vw;
	height: 8px;

	&::after {
		content: '';
		position: absolute;
		background: linear-gradient(90deg, transparent, ${color.primary});
		width: 100%;
		height: inherit;
		animation: loading 1s infinite linear;
		transform: scaleX(${(prop) => prop.percent});
		transition: 0.4s;
		transform-origin: left;
	}

	@keyframes loading {
		50% {
			opacity: 0.5;
		}
	}
`;
