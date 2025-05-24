// src/routes/+page.ts
import {
    getCocktails, getNonAlcoholicCocktails, getBeersOnTap,
    getBottledBeers, getWines, getSoftDrinks, getHotDrinks,
    type DrinkType, // Keep DrinkType if still used here or elsewhere
} from '$lib/data';

// Correct way to import the PageLoad type from SvelteKit
import type { PageLoad } from './$types';

// This line is CRUCIAL for static site generation (prerendering)
export const prerender = true;

// The load function runs before the component is rendered,
// both at build time (for static sites) and in the browser.
export const load: PageLoad = async () => {
    try {
        const [
            cocktails, nonAlcoholicCocktails, beersOnTap,
            bottledBeers, wines, softDrinks, hotDrinks
        ] = await Promise.all([
            getCocktails(),
            getNonAlcoholicCocktails(),
            getBeersOnTap(),
            getBottledBeers(),
            getWines(),
            getSoftDrinks(),
            getHotDrinks(),
        ]);

        // Return the fetched data as props for the +page.svelte component
        return {
            cocktails,
            nonAlcoholicCocktails,
            beersOnTap,
            bottledBeers,
            wines,
            softDrinks,
            hotDrinks,
            // No 'isLoading' needed as the content will be prerendered
            // No 'errorMessage' needed here for initial render,
            // but you can pass an 'error' prop if the fetch fails during build.
        };
    } catch (error: any) {
        console.error('Error fetching menu data in load function during build:', error);
        // If an error occurs during prerendering, the build might fail,
        // or the page might be generated with an error state.
        // Return empty arrays and an error message to handle it gracefully in the UI.
        return {
            cocktails: [],
            nonAlcoholicCocktails: [],
            beersOnTap: [],
            bottledBeers: [],
            wines: [],
            softDrinks: [],
            hotDrinks: [],
            error: `Failed to load menu: ${error.message}. Please check Google Sheet and network.`,
        };
    }
};