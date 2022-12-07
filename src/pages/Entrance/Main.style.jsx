import { styled } from '@linaria/react';
import { color } from '@styles/setting.style';

export const LeafStyle = styled.div`
	position: fixed;
	transition: 1s;
`;

export const LogoStyle = styled.div`
	transition: 1s;
	z-index: 10;
	animation: light 0.6s infinite alternate-reverse ease-in;

	@keyframes light {
		0% {
			filter: brightness(0.98);
		}
		100% {
			filter: brightness(1.05);
		}
	}

    img {
        max-width: 900px;
        width: 100%;
        height: 80vh;
    }

	h2 {
        position: absolute;
        top: 50%;
        left: 50%;
		text-shadow: 2px 1px 3px ${color.primary}, 2px -1px 3px ${color.primary};
	}

    button {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
    }
`;

export const MainStyle = styled.main`
	overflow: hidden;
	pointer-events: none;
`;
