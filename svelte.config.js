// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess(),
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: undefined, // Or you could set 'fallback: "404.html"' for a custom 404 page
            precompress: false,
            strict: true
        }),
        paths: {
            // THIS MUST MATCH YOUR REPOSITORY NAME EXACTLY, prefixed with a slash
            base: process.env.NODE_ENV === 'production' ? '/l-autobus' : '',
        }
    }
};

export default config;