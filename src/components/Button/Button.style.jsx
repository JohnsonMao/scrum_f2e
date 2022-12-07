import { styled } from '@linaria/react';
import { ReactComponent as PillSvg } from '@images/pill.svg';
import { color } from '@styles/setting.style';

export const PillShape = styled(PillSvg)`
	position: absolute;
	top: ${(props) => (props.cover ? '-64%' : '-54%')};
	width: 200%;
	height: 200%;
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
	padding: 12px 48px;
	pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
	filter: ${(props) => (props.disabled ? 'grayscale(1)' : '')};

	> * {
		pointer-events: none;
	}

	&:active ${PillShape}:first-child {
		transform: translateY(3%);
	}
`;
