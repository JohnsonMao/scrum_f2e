import { styled } from '@linaria/react';
import { color } from '@styles/setting.style';

const LogoLinkStyle = styled.a`
    display: inline-block;
    margin-bottom: -6px;

    svg {
        width: ${props => props.width};
        height: auto;
    }

    &:hover path {
        fill: ${color.primary};
    }
`;

export default LogoLinkStyle;
