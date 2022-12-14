import { styled } from '@linaria/react';

const TransitionStyle = styled.div`
	transition-duration: ${(props) => props.duration};
	transition-delay: ${(props) => props.delay};
	pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
    opacity: 0;

	&.hide {
		display: none;
		visibility: hidden;
	}

	&.active {
        opacity: ${(props) => (props.show ? 1 : 0)};
	}
`;

export default TransitionStyle;
