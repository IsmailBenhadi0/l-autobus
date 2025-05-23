// src/lib/data.ts

import Papa from 'papaparse';

// Define the structure of your menu items, matching your Google Sheet columns
export interface DrinkType {
    id: number;
    name: string;
    price: number;
    category: string; // Used for filtering
    description?: string;
    image?: string;
    size?: string;
    new?: boolean;
    type?: 'red' | 'white' | 'rose';
    byGlass?: boolean;
    byBottle?: boolean;
}

// --- IMPORTANT: PASTE YOUR SINGLE FULL MENU CSV URL HERE ---
// Get this URL from your Google Sheet: File > Share > Publish to web,
// then select your specific menu tab, choose "Comma-separated values (.csv)", and copy the generated URL.
const FULL_MENU_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRusInzox0NKiitqv9er7JAZ4lH64YyIF8o8N9YMUk52L2zJ6E61fXTkpeiUUt98MLWOJRdFdwTRvuu/pub?gid=1240253638&single=true&output=csv'; // REMEMBER TO REPLACE THIS

// Function to fetch and parse the CSV data
async function fetchCsvData(): Promise<DrinkType[]> {
    try {
        const response = await fetch(FULL_MENU_CSV_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${FULL_MENU_CSV_URL}: ${response.statusText || response.status}`);
        }
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true, // Use first row as column headers
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
                        if (row === null || typeof row !== 'object' || Array.isArray(row)) {
                            console.warn('Skipping invalid row during CSV processing:', row);
                            return null;
                        }

                        const processedRow = { ...row } as any;
                        
                        if (typeof processedRow.new === 'string') processedRow.new = processedRow.new.toLowerCase() === 'true';
                        if (typeof processedRow.byGlass === 'string') processedRow.byGlass = processedRow.byGlass.toLowerCase() === 'true';
                        if (typeof processedRow.byBottle === 'string') processedRow.byBottle = processedRow.byBottle.toLowerCase() === 'true';

                        if (!processedRow.name || processedRow.id === undefined || processedRow.id === null) return null;

                        return processedRow as DrinkType;
                    }).filter(item => item !== null) as DrinkType[];

                    // --- DEBUG LOG: See the raw data after parsing ---
                    console.log("Raw processed data from CSV (in data.ts):", processedData);

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

// Function to get all menu items (will be called by the load function)
export async function getAllMenuItems(): Promise<DrinkType[]> {
    return fetchCsvData();
}

// Helper functions to filter items by category (used by load function)
// All filters now include .trim() for robustness against whitespace
export async function getCocktails(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category?.trim() === 'Cocktails');
}

export async function getSoftDrinks(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category?.trim() === 'Soft Drinks');
}

export async function getHotDrinks(): Promise<DrinkType[]> {
    const allItems = await getAllMenuItems();
    return allItems.filter(item => item.category?.trim() === 'Hot Drinks');
}

// You can add more getters here if you add more categories to +page.svelte
// Remember to adjust their filter strings to exactly match your Google Sheet category names.
// Example:
// export async function getBeersOnTap(): Promise<DrinkType[]> {
//     const allItems = await getAllMenuItems();
//     return allItems.filter(item => item.category?.trim() === 'Beers on Tap');
// }
// export async function getWines(): Promise<DrinkType[]> {
//     const allItems = await getAllMenuItems();
//     return allItems.filter(item => item.category?.trim().includes('Wine')); // Using includes for all wine types
// }