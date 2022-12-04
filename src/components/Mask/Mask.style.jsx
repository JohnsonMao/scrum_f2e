import { styled } from '@linaria/react';
import { color, alpha } from '@styles/setting.style';

const MaskStyle = styled.div`
	background: ${color.primary + alpha(20)};
	opacity: ${(props) => (props.show ? 1 : 0)};
	pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
	transition: 0.3s;
	z-index: 20;

	span {
		padding: 4px 20px;
		border: 2px solid ${color.primary};
		border-radius: 28px;
		color: ${color.primary};
	}
`;

export default MaskStyle;
