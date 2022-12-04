import { createHashRouter } from 'react-router-dom';
import Loading from '@/components/Loading';
import Entrance from '@/pages/Entrance';
import ProductOwner from '@/pages/ProductOwner';
import SprintPlanning from '@/pages/SprintPlanning';
import SprintBacklog from '@/pages/SprintBacklog';
import SprintReview from '@/pages/SprintReview';
import SprintRetro from '@/pages/SprintRetro';
import Finish from '@/pages/Finish';

const router = [
	{
		path: '/',
		element: <Loading />
	},
	{
		path: '/Entrance',
		element: <Entrance />
	},
	{
		path: '/ProductOwner',
		element: <ProductOwner />
	},
	{
		path: '/SprintPlanning',
		element: <SprintPlanning />
	},
	{
		path: '/SprintBacklog',
		element: <SprintBacklog />
	},
	{
		path: '/SprintReview',
		element: <SprintReview />
	},
	{
		path: '/SprintRetro',
		element: <SprintRetro />
	},
	{
		path: '/Finish',
		element: <Finish />
	}
];

export default createHashRouter(router);
