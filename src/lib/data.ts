// src/lib/data.ts
import Papa from 'papaparse';

// Keep your interfaces as they are. They cover all possible fields.
export interface DrinkType {
    id: number;
    name: string;
    price: number;
    category: string; // Crucial for filtering
    description?: string;
    image?: string;
    size?: string;
    new?: boolean;
    type?: 'red' | 'white' | 'rose'; // Added for wines, will be undefined for others
    byGlass?: boolean; // Added for wines, will be undefined for others
    byBottle?: boolean; // Added for wines, will be undefined for others
}

// No need for WineType interface anymore if DrinkType can cover all properties
// export interface WineType extends DrinkType { ... }

// Remove ContactInfo interface as we'll hardcode it

// --- IMPORTANT: PASTE YOUR SINGLE FULL MENU CSV URL HERE ---
// Get this URL from File > Share > Publish to web for your combined "Full Menu" tab.
const FULL_MENU_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8mHeQpE95y_GYAjjvNuNQ9qnM84YVEuqpXrZ44Xy0IZVF2VojQNFAZQknQbCpMwm3w5l_VoGfJrZC/pub?gid=1240253638&single=true&output=csv';


// Generic function to fetch and parse CSV data
async function fetchCsvData(): Promise<DrinkType[]> {
    try {
        const response = await fetch(FULL_MENU_CSV_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${FULL_MENU_CSV_URL}: ${response.statusText}`);
        }
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: (field) => {
                    if (field === 'id' || field === 'price') return true;
                    if (field === 'new' || field === 'byGlass' || field === 'byBottle') return true;
                    return false;
                },
                complete: (results) => {
                    if (results.errors.length) {
                        console.error('CSV Parsing Errors:', results.errors);
                        reject(new Error('Error parsing CSV data.'));
                        return;
                    }

                    const processedData = results.data.map(row => {
                        // --- ADDED CHECK HERE ---
                        // Ensure 'row' is a non-null, non-array object before spreading
                        if (row === null || typeof row !== 'object' || Array.isArray(row)) {
                            console.warn('Skipping non-object row:', row); // Optional: log if this happens
                            return null; // Skip invalid rows
                        }

                        const processedRow = { ...row } as any; // Now 'row' is guaranteed to be an object
                        // Explicitly convert "TRUE"/"FALSE" strings to booleans
                        // Ensure keys exist before accessing, to prevent runtime errors if columns are missing
                        if (typeof processedRow.new === 'string') processedRow.new = processedRow.new.toLowerCase() === 'true';
                        if (typeof processedRow.byGlass === 'string') processedRow.byGlass = processedRow.byGlass.toLowerCase() === 'true';
                        if (typeof processedRow.byBottle === 'string') processedRow.byBottle = processedRow.byBottle.toLowerCase() === 'true';

                        // Filter out empty rows that might come from sheet or incomplete data
                        // Ensure 'name' and 'id' are checked safely, as they might be missing or null
                        if (!processedRow.name || processedRow.id === undefined || processedRow.id === null) return null;

                        return processedRow as DrinkType; // All items are now DrinkType
                    }).filter(item => item !== null) as DrinkType[]; // Filter out the nulls

                    resolve(processedData);
                },
                error: (error: Error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error(`Error fetching or parsing data from ${FULL_MENU_CSV_URL}:`, error);
        throw error;
    }
}

// Function to get ALL menu items from the single sheet
export async function getAllMenuItems(): Promise<DrinkType[]> {
    return fetchCsvData();
}

// No more individual category functions fetching; we'll filter from getAllMenuItems
// You might remove getCocktails, getNonAlcoholicCocktails, etc. here,
// or keep them as helper functions that filter the main list:

// Example of how you'd get categories from the single source:
// (You could even define these directly in +page.svelte if you prefer)
export async function getCocktails(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category === 'Cocktails');
}

export async function getNonAlcoholicCocktails(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category === 'Non-Alcoholic Cocktails');
}

export async function getBeersOnTap(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category === 'Beers on Tap');
}

export async function getBottledBeers(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category === 'Bottled Beers');
}

export async function getWines(): Promise<DrinkType[]> { // <--- Changed from WineType[]
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category.includes('Wine'));
}

export async function getSoftDrinks(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category === 'Soft Drinks');
}

export async function getHotDrinks(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category === 'Hot Drinks');
}

// Remove getContactInfo function and ContactInfo interface