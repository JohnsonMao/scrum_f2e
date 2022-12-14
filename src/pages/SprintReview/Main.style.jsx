import { styled } from '@linaria/react';
import { color } from '@styles/setting.style';

export const IntroContent = styled.section`
    div {
        margin: 0 8px;
    }

	ul {
		margin-left: 40px;
		list-style: disc;
	}
`;

export const IntroHeader = styled.header`
	border: 2px solid var(--role-team1-default);
	border-radius: 20px;
	background: rgba(var(--dark), 0.6);
    pointer-events: auto;

	h2 {
		text-align: center;
		color: var(--role-team1-default);
	}
	h3 {
		text-align: center;
		color: var(--primary-default);
	}
`;

export const IntroItem = styled.li`
	flex: 0 0 calc(33.33% - 2vw);
	transition-duration: 0.5s;
	/* transform: translateY(200px); */

	&:nth-child(2) {
		transition-delay: 0.25s;
	}
	&:nth-child(3) {
		transition-delay: 0.5s;
	}

    img {
        height: max-content;
    }
`;

export const IntroList = styled.ul`
	display: flex;
	justify-content: space-between;
	margin: 0 2vw;
	gap: 2vw;
`;

export const MainStyle = styled.main`
	pointer-events: none;
`;
