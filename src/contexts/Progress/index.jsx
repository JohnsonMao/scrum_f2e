import { createContext, useReducer } from 'react';
import ProgressReducer, { ACTIONS, initState } from './reducer';

export const ProgressContext = createContext(initState);

export const ProgressProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ProgressReducer, initState);

	const next = () => {
		dispatch({
			type: ACTIONS.NEXT,
			payload: {
				progress: state.progress + 1
			}
		});
	};

	const loaded = () => {
		dispatch({ type: ACTIONS.LOADED });
	};

	const value = {
		state,
		next,
		loaded
	};

	return (
		<ProgressContext.Provider value={value}>
			{children}
		</ProgressContext.Provider>
	);
};
