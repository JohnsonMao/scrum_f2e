import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/vite';
import svgr from 'vite-plugin-svgr';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isDev = mode === 'development';

	return {
		base: isDev ? '/' : '/scrum_f2e/',
		plugins: [
			nodeResolve({
				extensions: ['.jsx', '.js']
			}),
			linaria({
				include: ['**/*.{js,jsx}']
			}),
			react(),
			svgr(),
		],
		resolve: {
			alias: {
				'@': '/src',
				'@images': '/src/assets/images',
				'@styles': '/src/assets/styles'
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
