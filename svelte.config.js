import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Apply svelte-preprocess for TypeScript and other Svelte features
    preprocess: preprocess(),

    kit: {
        // Configure the static adapter
        adapter: adapter({
            pages: 'build', // Output directory for pages (HTML files)
            assets: 'build', // Output directory for assets (JS, CSS, images)
            fallback: undefined, // No fallback page needed for simple static sites
            precompress: false, // Don't precompress
            strict: true // Enforce strict checks
        }),
        // IMPORTANT: Set the base path for GitHub Pages project sites
        // Replace '/l-autobus' with your exact repository name if it's different
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/l-autobus' : '',
        }
    }
};

export default config;