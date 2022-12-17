import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProgressProvider } from './contexts/Progress';
import App from './App';

// import '@/assets/styles/base.scss';
import '@/assets/styles/base.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ProgressProvider>
			<App />
		</ProgressProvider>
	</React.StrictMode>
);
