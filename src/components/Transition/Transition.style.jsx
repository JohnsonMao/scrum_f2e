import { styled } from '@linaria/react';

const TransitionStyle = styled.div`
	display: none;
	visibility: hidden;
	transition-duration: ${(props) => props.duration};
	transition-delay: ${(props) => props.delay};
	pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
    opacity: 0;
    
	&.active {
        display: block;
		visibility: visible;
        opacity: ${(props) => (props.show ? 1 : 0)};
	}
`;

export default TransitionStyle;
