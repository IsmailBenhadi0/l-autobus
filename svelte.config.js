import adapter from '@sveltejs/adapter-static';
// CHANGE THIS LINE:
import preprocess from 'svelte-preprocess'; // <-- Import directly from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Use `preprocess` directly here, it's configured for Vite internally
    preprocess: preprocess(), // <--- No longer `vitePreprocess()`
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: undefined,
            precompress: false,
            strict: true
        }),
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/l-autobus' : '',
        }
    }
};

export default config;