import { styled } from '@linaria/react';
import { color, listStyle, alpha } from '@styles/setting.style';

export const ListHeaderStyle = styled.header`
	padding: 15px 0;
	width: 100%;
	border-radius: 20px 20px 0 0;

	h2 {
		text-align: center;
		color: ${color.bgDark};
	}

	div {
		text-align: center;
	}
`;

export const ListBodyStyle = styled.div`
	border-radius: 0 0 20px 20px;
	min-height: 3rem;
`;

export const ListStyle = styled.div`
	/* position: relative; */
	width: 33%;
	border-radius: 20px;

	${ListHeaderStyle} {
		background: ${(props) => listStyle[props.type].header};

		div {
			color: ${(props) => listStyle[props.type].dark};
		}
	}

	${ListBodyStyle} {
		background: ${(props) => listStyle[props.type].bg + alpha(30)};
        backdrop-filter: blur(5px);
	}

    /* &::before,
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        backdrop-filter: blur(8px);
    }
    &::before {
        top: 12px;
        left: 12px;
		background: ${(props) => listStyle[props.type].bg + alpha(20)};
        box-shadow: 12px 12px ${(props) => listStyle[props.type].bg + alpha(10)};
        z-index: -1;
    }
    &::after {
        top: 24px;
        left: 24px;
		background: ${(props) => listStyle[props.type].radial};
        z-index: -2;
    } */
`;
