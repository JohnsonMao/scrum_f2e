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

	const value = {
		state,
		next
	};

	return (
		<ProgressContext.Provider value={value}>
			{children}
		</ProgressContext.Provider>
	);
};
