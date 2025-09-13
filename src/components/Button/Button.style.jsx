import { styled } from '@linaria/react';
import PillSvg from '@images/pill.svg?react';
import { color } from '@styles/setting.style';

export const PillShape = styled(PillSvg)`
	position: absolute;
	top: ${(props) => (props.cover ? '-30px' : '-26px')};
	width: auto;
	height: 105px;
	z-index: ${(props) => (props.cover ? -1 : -2)};
	filter: ${(props) =>
		props.cover ? '' : `drop-shadow(0 2px 2px ${color.primaryDark})`};
	transition: 0.3s;

	path {
		fill: ${(props) =>
			props.cover ? 'url("#buttonGradient")' : color.primary};
	}
`;

export const ButtonStyle = styled.button`
	position: var(--position, relative);
	padding: 12px 60px;
	border-radius: 36px;
	pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
	transform: scale(0);
	filter: ${(props) => (props.disabled ? 'grayscale(1)' : '')};
	
	> * {
		pointer-events: none;
	}

	.buttonText {
		white-space: nowrap;
		transition: 0.3s;
	}

	&:active {
		${PillShape}:first-child, .buttonText {
			transform: translateY(3px);
		}
	}
`;
