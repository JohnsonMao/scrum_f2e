import Layout from './layouts';
import { ProgressProvider } from './contexts/Progress';

function App() {
	return (
		<ProgressProvider>
			<Layout />
		</ProgressProvider>
	);
}

export default App;
