import { styled } from '@linaria/react';
import { color, alpha } from '@styles/setting.style'

const ProgressBarStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
	background: ${color.primaryDark + alpha(80)};
	height: 12px;
	z-index: -6;

	&::after {
        content: '';
		position: absolute;
		background: linear-gradient(90deg, transparent, ${color.primary});
		width: 100%;
		height: inherit;
		transition: 1s;
		transform-origin: left;
		transform: scaleX(${props => props.percent});
	}
`;

export default ProgressBarStyle;
