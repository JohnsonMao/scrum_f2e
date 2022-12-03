import { styled } from '@linaria/react';

const MaskStyle = styled.div`
	background: rgba(var(--primary), 0.2);
	opacity: ${(props) => (props.show ? 1 : 0)};
	pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
	transition: 0.3s;
	z-index: 20;

	span {
		padding: 4px 20px;
		border: 2px solid var(--primary-default);
		border-radius: 28px;
		color: var(--primary-default);
	}
`;

export default MaskStyle;
