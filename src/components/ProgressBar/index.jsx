import { useContext } from 'react';
import { ProgressContext } from '@/contexts/Progress';
import ProgressBarStyle from './ProgressBar.style';

function ProgressBar() {
	const { state } = useContext(ProgressContext);

	// console.log(state);
	return <ProgressBarStyle percent={0} />;
}

export default ProgressBar;
