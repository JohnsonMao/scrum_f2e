import { styled } from '@linaria/react';
import { color, alpha } from '@styles/setting.style';

const FooterStyle = styled.footer`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    text-align: center;
    font-size: 14px;
    color: ${color.primary};
    background: ${color.bgDark + alpha(80)};
    z-index: 1000;

    a {
        padding: 0 4px;
        color: inherit;
    }
`;


export default FooterStyle;