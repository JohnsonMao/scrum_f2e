import { styled } from '@linaria/react';

export const BgVillage = styled.div`
	position: absolute;
	top: 0;
	left: -10%;
	width: 120%;
	height: 100%;
	overflow: hidden;
	z-index: -5;

	img {
		object-fit: cover;
	}
`;

export const Root = styled.div`
	z-index: -10;

    ${BgVillage}:nth-child(2) {
		transform: translateX(${props => `${props.parallax / 4}%`});
		animation: bg 2s infinite;
    }
    ${BgVillage}:nth-child(3) {
		transform: translateX(${props => `${props.parallax / -2}%`});
    }
    ${BgVillage}:nth-child(4) {
		transform: translateX(${props => `${props.parallax}%`});
    }

	@keyframes bg {
		50% {
			transform: translateX(${props => `${props.parallax / -2}%`}) scaleY(0.95);
		}
	}
`;
