import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import autoprefixer from 'autoprefixer';

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
		css: {
			postcss: {
				plugins: [
					autoprefixer({
						overrideBrowserslist: [
							'Android 4.1',
							'IOS 7.1',
							'Chrome > 40',
							'ff > 31',
							'ie 11',
							'> 1%'
						]
					})
				]
			},
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/styles/inject.scss";'
				}
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
