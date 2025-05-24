// src/routes/+page.ts

// Import the specific get functions from your data library
import {
    getCocktails, getNonAlcoholicCocktails, getBeersOnTap,
    getBottledBeers, getWines, getSoftDrinks, getHotDrinks,
} from '$lib/data';

// Import the PageLoad type from SvelteKit's generated types
// This helps TypeScript understand the load function's context
import type { PageLoad } from './$types';

// The load function runs both on the server (during prerendering) and in the browser
export const load: PageLoad = async () => {
    try {
        // Use Promise.all to fetch all data categories concurrently
        const [
            cocktails,
            nonAlcoholicCocktails,
            beersOnTap,
            bottledBeers,
            wines,
            softDrinks,
            hotDrinks
        ] = await Promise.all([
            getCocktails(),
            getNonAlcoholicCocktails(),
            getBeersOnTap(),
            getBottledBeers(),
            getWines(),
            getSoftDrinks(),
            getHotDrinks(),
        ]);

        // Return the fetched data as an object. These properties will be passed
        // as props to your +page.svelte component.
        return {
            cocktails,
            nonAlcoholicCocktails,
            beersOnTap,
            bottledBeers,
            wines,
            softDrinks,
            hotDrinks,
        };
    } catch (error: any) {
        console.error('Error fetching menu data in load function during build:', error);
        // If an error occurs during prerendering, return empty arrays and an error message.
        // This will allow the page to build, but show an error message instead of content.
        return {
            cocktails: [],
            nonAlcoholicCocktails: [],
            beersOnTap: [],
            bottledBeers: [],
            wines: [],
            softDrinks: [],
            hotDrinks: [],
            error: `Failed to load menu: ${error.message}. Please check Google Sheet and network access.`,
        };
    }
};