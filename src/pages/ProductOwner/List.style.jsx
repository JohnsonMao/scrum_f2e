import { styled } from '@linaria/react';
import List from '@/components/List';
import { ListBodyStyle } from '@/components/List/List.style';
import { color, alpha } from '@styles/setting.style';

export const ListSideStyle = styled.div`
	position: absolute;
    left: 0;
    bottom: 0;
    padding: 1.1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 86px;
    height: 100%;
    z-index: 2;

	&::before,
	&::after {
        content: '';
        position: absolute;
        left: 42px;
    }
	&::before {
        top: 50px;
		width: 2px;
		height: calc(100% - 102px);
        border-radius: 1px;
		background: #fff;
	}
	&::after {
		bottom: 52px;
		width: 10px;
		height: 10px;
		border-right: 3px solid #fff;
		border-bottom: 3px solid #fff;
        border-radius: 2px;
		transform: rotate(45deg) translate(-29%, 29%);
	}
`;

export const ItemStyle = styled.li`
    position: relative;
    padding: 12px 24px;
    border: 2px solid;
    border-color: ${color.primary};
    border-radius: 20px;
    background: ${color.bgDark + alpha(60)};
    width: max-content;
    max-width: 300px;
    z-index: 10;
`

export const ItemsStyle = styled.div`
    height: 0;
    width: 0;

    svg {
        position: absolute;
        width: 48px;
        height: auto;
        bottom: -20px;
        left: 15px;
    }
    
    ${ItemStyle} {
        position: absolute;
    
        &:nth-child(1) {
            top: 72%;
            left: 4%;
        }
        &:nth-child(2) {
            top: 46%;
            left: calc(98% - 300px);
        }
        &:nth-child(3) {
            top: 42%;
            left: 10%;
        }
        &:nth-child(4) {
            top: 70%;
            left: calc(90% - 300px);
            will-change: auto;
            animation: moveItem ${props => props.animation ? '1s infinite alternate' : ''};
        }
    }
    
    @keyframes moveItem {
        100% {
            top: ${props => `${props.top}px`};
            left: 38%;
        }
    }
`

export const ListStyle = styled(List)`
    margin: 0 auto;
    width: 50%;
    max-width: 450px;

    ${ListBodyStyle} {
        padding: 1.5rem 2rem;
        padding-left: 70px;
    }

    ${ItemStyle} {
        margin-top: 1rem;
        padding: 12px 24px;
        width: initial;
        max-width: initial;
        border-color: ${color.text + alpha(60)};
        border-style: dashed;
        border-radius: 20px;
        user-select: none;

        &:first-child {
            margin-top: 0;
        }
    }
`;
