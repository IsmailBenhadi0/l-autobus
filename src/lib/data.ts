// src/lib/data.ts
import Papa from 'papaparse';

// Define your interfaces (ensure these match your Google Sheet column headers and types)
export interface DrinkType {
    id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
    image?: string;
    size?: string;
    new?: boolean; // True/False in sheet, converted to boolean
}

export interface WineType extends DrinkType {
    type: 'red' | 'white' | 'rose';
    byGlass?: boolean; // True/False in sheet, converted to boolean
    byBottle?: boolean; // True/False in sheet, converted to boolean
}

export interface ContactInfo {
    name: string;
    address: string;
    city: string;
    phone: string;
    hours: {
        mondayToThursday: string;
        fridayToSaturday: string;
        sunday: string;
    };
    happyHour: string;
}

// --- IMPORTANT: REPLACE THESE WITH YOUR ACTUAL GOOGLE SHEET DETAILS ---
const GOOGLE_SHEET_BASE_URL = 'https://docs.google.com/spreadsheets/d/1vRQMkh9VVcm27z6XUcxdDlqvtCWHGI6UkRo4dScwqr8/edit?pli=1&gid=';
const COCKTAILS_GID = '0'; // Example GID, replace with your Cocktails tab's GID
const NON_ALCOHOLIC_GID = '123456789'; // Example GID, replace with your Non-Alcoholic tab's GID
// ... add all your other GIDs here based on your Google Sheet structure
const BEERS_ON_TAP_GID = '987654321';
const BOTTLED_BEERS_GID = '246813579';
const WINES_GID = '135792468';
const SOFT_DRINKS_GID = '1122334455';
const HOT_DRINKS_GID = '5544332211';
const CONTACT_INFO_GID = '9988776655'; // For contact info tab

// Helper to get the full CSV URL
const getCsvUrl = (gid: string) => `<span class="math-inline">\{GOOGLE\_SHEET\_BASE\_URL\}</span>{gid}&single=true&output=csv`;

// Generic function to fetch and parse CSV data
async function fetchCsvData<T>(gid: string): Promise<T[]> {
    const url = getCsvUrl(gid);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
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
                        const processedRow = { ...row } as any;
                        // Explicitly convert "TRUE"/"FALSE" strings to booleans
                        if (typeof processedRow.new === 'string') processedRow.new = processedRow.new.toLowerCase() === 'true';
                        if (typeof processedRow.byGlass === 'string') processedRow.byGlass = processedRow.byGlass.toLowerCase() === 'true';
                        if (typeof processedRow.byBottle === 'string') processedRow.byBottle = processedRow.byBottle.toLowerCase() === 'true';
                        // Filter out empty rows that might come from sheet
                        if (!processedRow.name && !processedRow.id) return null;
                        return processedRow as T;
                    }).filter(item => item !== null) as T[];

                    resolve(processedData);
                },
                error: (error: Error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error(`Error fetching or parsing data for GID ${gid}:`, error);
        throw error;
    }
}

// Functions to get specific menu categories
export async function getCocktails(): Promise<DrinkType[]> { return fetchCsvData<DrinkType>(COCKTAILS_GID); }
export async function getNonAlcoholicCocktails(): Promise<DrinkType[]> { return fetchCsvData<DrinkType>(NON_ALCOHOLIC_GID); }
export async function getBeersOnTap(): Promise<DrinkType[]> { return fetchCsvData<DrinkType>(BEERS_ON_TAP_GID); }
export async function getBottledBeers(): Promise<DrinkType[]> { return fetchCsvData<DrinkType>(BOTTLED_BEERS_GID); }
export async function getWines(): Promise<WineType[]> { return fetchCsvData<WineType>(WINES_GID); }
export async function getSoftDrinks(): Promise<DrinkType[]> { return fetchCsvData<DrinkType>(SOFT_DRINKS_GID); }
export async function getHotDrinks(): Promise<DrinkType[]> { return fetchCsvData<DrinkType>(HOT_DRINKS_GID); }

// Special handling for Contact Info to reconstruct nested 'hours' object
export async function getContactInfo(): Promise<ContactInfo> {
    const rawData = await fetchCsvData<{ key: string; value: string }>(CONTACT_INFO_GID);
    const info: any = {};
    rawData.forEach(row => {
        if (row.key.startsWith('hours_')) {
            // If it's an hours-related key, ensure 'hours' object exists
            if (!info.hours) info.hours = {};
            const hourKey = row.key.replace('hours_', '');
            info.hours[hourKey] = row.value;
        } else {
            info[row.key] = row.value;
        }
    });
    return info as ContactInfo;
}