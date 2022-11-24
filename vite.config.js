import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		base: mode === 'development' ? '/' : '/scrum_f2e/',
		plugins: [react()],
		resolve: {
			alias: {
				'@': '/src'
			}
		},
		server: {
			host: '0.0.0.0',
			open: true
		}
	}
});
