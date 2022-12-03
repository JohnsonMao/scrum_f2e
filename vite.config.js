import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import autoprefixer from 'autoprefixer';
import linaria from '@linaria/vite';
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
				include: ['**/*.{js,jsx}'],
				babelOptions: {
					presets: ['@babel/preset-react']
				}
			}),
			react({
				jsxRuntime: 'classic'
			}),
			svgrPlugin()
		],
		resolve: {
			alias: {
				'@': '/src',
				'@images': '/src/assets/images',
				'@styles': '/src/assets/styles'
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
