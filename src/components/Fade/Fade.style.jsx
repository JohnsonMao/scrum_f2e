import { styled } from '@linaria/react';

const FadeStyle = styled.div`
    transition-duration: ${props => props.duration || '1s'};
    transition-delay: ${props => props.delay || '0s'};
    opacity: ${props => props.show ? 1 : 0};
    pointer-events: ${props => props.show ? 'auto' : 'none'};
`;

export default FadeStyle;
