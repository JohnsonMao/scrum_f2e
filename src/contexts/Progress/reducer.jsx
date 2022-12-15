export const initState = { loading: true, max: 8, progress: 0 };

export const ACTIONS = {
	NEXT: 'NEXT',
	LOADED: 'LOADED'
};

const ProgressReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTIONS.NEXT:
			return { ...state, progress: payload.progress };
		case ACTIONS.LOADED:
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default ProgressReducer;
