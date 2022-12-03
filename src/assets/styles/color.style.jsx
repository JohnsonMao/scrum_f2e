const alpha = (value) => ('0' + (~~(value / 100 * 255)).toString(16)).slice(-2);

const color = {
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

export default color;
