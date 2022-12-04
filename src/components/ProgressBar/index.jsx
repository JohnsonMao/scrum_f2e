import { useContext } from 'react';
import { ProgressContext } from '@/contexts/Progress';
import './index.scss';

function ProgressBar() {
	const { state } = useContext(ProgressContext);

console.log(state);
	return <div className="progress__bar"></div>;
}

export default ProgressBar;
