export const color = {
	primary: '#00FFE0',
	primaryDark: '#008D96',
	primaryDeepdark: '#005656',
	roleSm: '#D355FF',
	roleSmDark: '#4C0071',
	roleSmTint: '#FF00F5',
	roleTeam1: '#FFC700',
	roleTeam2: '#FF5C00',
	roleTeamDark: '#933500',
	bgDark: '#0A0D14',
	text: '#FFFFFF',
	textDark: '#1C3245',
	textTint: '#00FFE0',
	danger: '#FF0000'
};

export const alpha = (value) =>
	('0' + (~~((value / 100) * 255)).toString(16)).slice(-2);

export const fontSize = {
	small: '16px',
	default: '20px',
	large: '24px',
	h2: '32px'
}

export const boxShadow = (color) => `
	0 0 20px ${color + alpha(30)},
	0 0 40px ${color + alpha(20)},
	0 0 60px ${color + alpha(10)}
`;

export const radial = (color) => `
	radial-gradient(
		50% 50% at 50% 50%,
		${color},
		transparent
	)
`;

const linear = (color, ...rest) => `
	linear-gradient(
		${rest
			.map(
				([alphaValue, percent]) => `
					${color + alpha(alphaValue)} ${percent}%
				`
			)
			.join(',')}
	)
`;

export const primaryLinear = linear(
	color.primary,
	[0, 0],
	[25, 60],
	[45, 80],
	[70, 90],
	[90, 100]
);
export const rolePoLinear = linear(
	color.primary,
	[0, 0],
	[3, 60],
	[12, 78],
	[36, 100]
);
export const roleSmLinear = linear(
	color.roleSm,
	[0, 0],
	[5, 60],
	[20, 80],
	[60, 100]
);
export const roleTeam1Linear = linear(
	color.roleTeam1,
	[0, 0],
	[5, 60],
	[20, 80],
	[60, 100]
);
export const roleTeam2Linear = linear(
	color.roleTeam2,
	[0, 0],
	[5, 60],
	[20, 80],
	[60, 100]
);

export const role = {
	po: {
		color: color.primary,
		darkColor: color.primaryDeepdark,
		boxShadow: boxShadow(color.primary),
		linear: rolePoLinear,
		transformOrigin: 'left'
	},
	sm: {
		color: color.roleSm,
		darkColor: color.roleSmDark,
		boxShadow: boxShadow(color.roleSm),
		linear: roleSmLinear,
		transformOrigin: 'right'
	},
	ee: {
		color: color.roleTeam1,
		darkColor: color.roleTeamDark,
		boxShadow: boxShadow(color.roleTeam1),
		linear: roleTeam1Linear,
		transformOrigin: 'right'
	},
	gg: {
		color: color.roleTeam2,
		darkColor: color.roleTeamDark,
		boxShadow: boxShadow(color.roleTeam2),
		linear: roleTeam2Linear,
		transformOrigin: 'right'
	}
}
