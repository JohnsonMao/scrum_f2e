export const initState = { max: 8, progress: 0 };

export const ACTIONS = {
	NEXT: 'NEXT'
};

const ProgressReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTIONS.NEXT:
			return { ...state, progress: payload.progress };
		default:
			return state;
	}
};

export default ProgressReducer;
