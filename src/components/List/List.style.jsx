import { styled } from '@linaria/react';
import { color, listStyle } from '@styles/setting.style';

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
	min-height: 8rem;
`;

export const ListStyle = styled.div`
	position: relative;
	width: 36%;
	border-radius: 20px;

	${ListHeaderStyle} {
		background: ${(props) => listStyle[props.type].header};

		div {
			color: ${(props) => listStyle[props.type].dark};
		}
	}

	${ListBodyStyle} {
		position: relative;
		background: ${(props) => listStyle[props.type].bg1};

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			backdrop-filter: blur(5px);
			z-index: -1;
		}
	}

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        backdrop-filter: blur(5px);
    }
    &::before {
        top: 12px;
        left: 12px;
		background: ${(props) => listStyle[props.type].bg2};
        box-shadow: 12px 12px ${(props) => listStyle[props.type].bg3};
        z-index: -1;
    }
    &::after {
        top: 24px;
        left: 24px;
		background: ${(props) => listStyle[props.type].radial};
        z-index: -2;
    }
`;
