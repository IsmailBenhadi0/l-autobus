// src/routes/+page.ts

// Import the specific category getters from your data library
import {
    getCocktails, getSoftDrinks, getHotDrinks,
    // Add other getters here if you make them in data.ts and want to display them
    // getBeersOnTap, getWines, // etc.
} from '$lib/data';

// Import the PageLoad type from SvelteKit's generated types
import type { PageLoad } from './$types';

// The load function runs before the component is rendered, both at build time and in the browser
export const load: PageLoad = async () => {
    try {
        // Fetch data for all categories concurrently
        const [
            cocktails,
            softDrinks,
            hotDrinks,
            // Add other categories here if you want to display them
            // beersOnTap, wines, // etc.
        ] = await Promise.all([
            getCocktails(),
            getSoftDrinks(),
            getHotDrinks(),
            // Call other getters here
            // getBeersOnTap(), getWines(), // etc.
        ]);

        // --- DEBUG LOG: See the data being passed from load to +page.svelte ---
        console.log("Data passed from load to +page.svelte (Cocktails):", cocktails);
        console.log("Data passed from load to +page.svelte (Soft Drinks):", softDrinks);
        console.log("Data passed from load to +page.svelte (Hot Drinks):", hotDrinks);


        // Return the fetched data as an object. These properties will be passed
        // as props to your +page.svelte component.
        return {
            cocktails,
            softDrinks,
            hotDrinks,
            // Pass other categories here
            // beersOnTap, wines, // etc.
        };
    } catch (error: any) {
        console.error('Error in load function during build/prerendering:', error);
        // If an error occurs, return empty arrays and an error message.
        // This will allow the page to build, but show an error message instead of content.
        return {
            cocktails: [],
            softDrinks: [],
            hotDrinks: [],
            // Pass empty arrays for other categories on error
            // beersOnTap: [], wines: [], // etc.
            error: `Failed to load menu: ${error.message}. Please check Google Sheet and network access.`,
        };
    }
};