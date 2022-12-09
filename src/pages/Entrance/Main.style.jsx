import { styled } from '@linaria/react';
import { color } from '@styles/setting.style';

export const LeafStyle = styled.div`
	position: fixed;
	transition: 1s;

	&.bg_leaf {
		&_l_2 {
			height: 100%;
			bottom: 0;
			z-index: -4;
		}
		&_b_2 {
			width: 62%;
			left: 12%;
			bottom: 0;
			z-index: -5;
		}
		&_r_2 {
			height: 100%;
			right: 0;
			z-index: -4;
		}
		&_t_2 {
			width: 80%;
			left: 12%;
			z-index: -5;
		}
		&_lb_1 {
			width: 60%;
			bottom: 0;
			z-index: -2;
		}
		&_lt_1 {
			height: 70%;
			left: 0;
			z-index: -2;
		}
		&_rb_1 {
			height: 70%;
			right: 0;
			bottom: 0;
			z-index: -2;
		}
		&_t_1 {
			width: 50%;
			right: 18%;
			z-index: -2;
		}
	}
`;

export const LogoStyle = styled.div`
	width: 80%;
	height: 80vh;
	transition: 1s;

	@keyframes light {
		0% {
			filter: brightness(0.98);
		}
		100% {
			filter: brightness(1.05);
		}
	}

	img {
		position: absolute;
		top: -10%;
		animation: light 0.6s infinite alternate-reverse ease-in;
		z-index: 1;
	}

	h2 {
		top: 66%;
		text-shadow: 2px 1px 3px ${color.primary}, 2px -1px 3px ${color.primary};
		animation: light 0.6s infinite alternate-reverse ease-in;
		z-index: 2;
	}

	button {
		top: 76%;
		z-index: 3;
	}
`;

export const MainStyle = styled.main`
	overflow: hidden;
	pointer-events: none;
`;

export const LightPoint = styled.i`
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: white;
	box-shadow: 0 0 4px 4px var(--tint-color), 0 0 6px 6px var(--dark-color),
		0 0 24px 8px var(--dark-color), 0 0 40px 24px var(--dark-color);
	z-index: 11;
	animation: swing 10s infinite;

	&.sm {
		--tint-color: ${color.roleSmTint};
		--dark-color: ${color.roleSmDark};
	}

	&.ee {
		--tint-color: ${color.roleTeam1};
		--dark-color: ${color.roleTeam1};
	}

	&.gg {
		--tint-color: ${color.roleTeam2};
		--dark-color: ${color.danger};
	}

	&.l {
		&_sm {
			--direction: -1;
			left: 20%;
			top: 18%;
		}
		&_ee {
			--direction: -1;
			left: 18%;
			top: 40%;
			animation-delay: -2s;
		}
		&_gg {
			--direction: -1;
			left: 15%;
			top: 26%;
			animation-delay: -4s;
		}
	}
	&.r {
		&_sm {
			--direction: 1;
			top: 26%;
			right: 12%;
			animation-delay: -3s;
		}
		&_ee {
			--direction: 1;
			top: 38%;
			right: 18%;
			animation-delay: -5s;
		}
		&_gg {
			--direction: 1;
			top: 20%;
			right: 22%;
			animation-delay: -1s;
		}
	}

	@keyframes swing {
		0% {
			transform: rotate(0deg) scale(0.8) translate(calc(-40px * var(--direction)), 40px);
			opacity: 0;
		}
		50% {
			transform: rotate(180deg) scale(1.2) translate(0, 0);
			opacity: 0.9;
		}
		100% {
			transform: rotate(360deg) scale(0.8) translate(calc(-40px * var(--direction)), 40px);
			opacity: 0;
		}
	}
`;

// .join,
// .go {
//     .bg_leaf {
//         &_lb_1 {
//             transform: translate(-100%, 100%);
//         }
//         &_lt_1 {
//             transform: translate(-100%, -100%);
//         }
//         &_rb_1 {
//             transform: translate(100%, 100%);
//         }
//         &_t_1 {
//             transform: translate(0, -100%);
//         }
//     }
//     .entrance__logo {
//         opacity: 0;
//         pointer-events: none;
//     }
// }

// .join {
//     .entrance__chat button {
//         opacity: 1;
//     }
// }

// .go {
//     .bg_leaf {
//         &_l_2 {
//             transform: translate(-100%, 0);
//         }
//         &_b_2 {
//             transform: translate(0, 100%);
//         }
//         &_r_2 {
//             transform: translate(100%, 0);
//         }
//         &_t_2 {
//             transform: translate(0, -100%);
//         }
//     }
//     .entrance__chat button {
//         transition: 1s;
//         opacity: 0;
//         pointer-events: none;
//     }
// }
