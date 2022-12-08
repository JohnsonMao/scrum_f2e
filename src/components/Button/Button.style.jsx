import { styled } from '@linaria/react';
import { ReactComponent as PillSvg } from '@images/pill.svg';
import { color } from '@styles/setting.style';

export const PillShape = styled(PillSvg)`
	position: absolute;
	top: ${(props) => (props.cover ? '-30px' : '-26px')};
	width: 100%;
	height: auto;
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
	position: relative;
	padding: 12px 60px;
	border-radius: 36px;
	pointer-events: none;
	opacity: 0;
	filter: ${(props) => (props.disabled ? 'grayscale(1)' : '')};
	
	&.show {
		pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
		opacity: 1;
	}

	> * {
		pointer-events: none;
	}

	.buttonText {
		transition: 0.3s;
	}

	&:active {
		${PillShape}:first-child, .buttonText {
			transform: translateY(3px);
		}
	}
`;
