import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingGif from '@images/loading.gif';
import './index.scss';

function Loading() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('Extrance')
		}, 1000);
		return () => clearTimeout(timer);
	}, [navigate])

	return (
		<div className="loading">
			<div className="loading__frame">
				<img src={LoadingGif} alt="Loading" />
			</div>
			<div className="loading__bar"></div>
		</div>
	);
}

export default Loading;
