import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isDev = mode === 'development';

	return {
		base: isDev ? '/' : '/scrum_f2e/',
		plugins: [svgrPlugin(), react()],
		resolve: {
			alias: {
				'@': '/src',
				'@images': '/src/assets/images'
			}
		},
		build: {
			outDir: 'dist',
			target: isDev ? 'modules' : 'es2015'
		},
		server: {
			host: '0.0.0.0',
			open: true
		}
	};
});
