import { styled } from '@linaria/react';
import { ReactComponent as TriangleSvg } from '@images/triangle.svg';
import { color, role } from '@styles/setting.style';

const roleKeys = Object.keys(role);

export const NextArrow = styled(TriangleSvg)`
	position: absolute;
	right: 40px;
	bottom: 40px;
	width: 32px;
	animation: next 0.35s infinite alternate ease-in;

	@keyframes next {
		80% {
			transform: translateY(64%) scale(1);
		}
		100% {
			transform: translateY(80%) scale(1.2, 0.5);
		}
	}
`;

export const ChatBoxStyle = styled.div`
	position: relative;
	padding: ${(props) =>
		roleKeys.includes(props.role) ? '40px 84px 40px 100px' : '100px 84px'};
	background-image: ${(props) => role[props.role]?.linear || role.po.linear};
	box-shadow: ${(props) => role[props.role]?.boxShadow || role.po.boxShadow};
	border: 2px solid ${(props) => role[props.role]?.color || role.po.color};
	border-radius: ${(props) =>
		roleKeys.includes(props.role) ? '40px' : '80px'};
	transform: scale(0, 0.01);
	transform-origin: ${(props) =>
		role[props.role]?.transformOrigin || 'center'};
	white-space: pre-wrap;
	pointer-events: none;
	flex: 1;
	z-index: 30;

	.name {
		position: absolute;
		left: -12px;
		top: 40px;
		padding: 0 24px;
		background: ${(props) => role[props.role]?.color || role.po.color};
		color: ${color.bgDark};
		text-transform: uppercase;

		&::before {
			content: ' ';
			position: absolute;
			left: 0;
			top: 0;
			width: 10px;
			background: ${(props) =>
				role[props.role]?.darkColor || role.po.darkColor};
			box-shadow: ${(props) =>
				role[props.role]?.boxShadow || role.po.boxShadow};
			transform: skewY(45deg) translateY(5px);
			z-index: -1;
		}
	}
	${NextArrow} path {
		stroke: ${(props) => role[props.role]?.color || role.po.color};
		fill: ${(props) => role[props.role]?.color || role.po.color};
	}

	.text {
		.heightlight {
			color: ${color.textTint};
		}
	}
`;
