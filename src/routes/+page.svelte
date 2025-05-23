<script lang="ts">
    import { onMount } from 'svelte';
    import {
        getCocktails, getNonAlcoholicCocktails, getBeersOnTap, // These now filter from combined data
        getBottledBeers, getWines, getSoftDrinks, getHotDrinks,
        type DrinkType,
    } from '$lib/data';

    // No need for ContactInfo type as it's hardcoded
    // type ContactInfo

    // Declare variables to hold your fetched data
    let cocktails: DrinkType[] = [];
    let nonAlcoholicCocktails: DrinkType[] = [];
    let beersOnTap: DrinkType[] = [];
    let bottledBeers: DrinkType[] = [];
    let wines: DrinkType[] = [];
    let softDrinks: DrinkType[] = [];
    let hotDrinks: DrinkType[] = [];
    let errorMessage: string | null = null;
    let isLoading = true;

    // Hardcode contact info directly in the component
    const contactInfo = {
        name: "CAFE L'AUTOBUS",
        address: "PLACE FLAGEY 28",
        city: "1050 IXELLES",
        phone: "02 640 06 80",
        hours: {
            mondayToThursday: "11:00 AM - 1:00 AM",
            fridayToSaturday: "11:00 AM - 2:00 AM",
            sunday: "11:00 AM - 12:00 AM",
        },
        happyHour: "4:00 PM - 7:00 PM Daily",
    };

    onMount(async () => {
        try {
            // Fetch all data categories concurrently for efficiency
            // These functions will now internally call getAllMenuItems() and filter.
            [
                cocktails, nonAlcoholicCocktails, beersOnTap,
                bottledBeers, wines, softDrinks, hotDrinks
            ] = await Promise.all([
                getCocktails(), getNonAlcoholicCocktails(), getBeersOnTap(),
                getBottledBeers(), getWines(), getSoftDrinks(), getHotDrinks()
            ]);

              console.log("--- Menu Data Status ---");
            console.log("Cocktails:", cocktails);
            console.log("Non-Alcoholic Cocktails:", nonAlcoholicCocktails);
            console.log("Beers on Tap:", beersOnTap);
            console.log("Bottled Beers:", bottledBeers);
            console.log("Wines:", wines);
            console.log("Soft Drinks:", softDrinks); // <--- CHECK THIS ONE CAREFULLY
            console.log("Hot Drinks:", hotDrinks);   // <--- CHECK THIS ONE CAREFULLY
            console.log("--- End Data Status ---");

            
        } catch (error: any) {
            console.error('Error fetching menu data:', error);
            errorMessage = `Failed to load menu: ${error.message}. Please ensure the Google Sheet is published correctly.`;
        } finally {
            isLoading = false;
        }
    });
</script>

<style>
    /* ... (your existing CSS styles remain the same) ... */
</style>

{#if errorMessage}
    <p class="error">{errorMessage}</p>
{:else if isLoading}
    <p class="loading">Loading menu from Google Sheets...</p>
{:else}
    <h1>Our Bar Menu</h1>

    <div class="menu-section">
        <h2>Cocktails</h2>
        <ul>
            {#each cocktails as item (item.id)}
                <li>
                    <div>
                        <span class="item-name">{item.name}</span>
                        {#if item.description}<p class="item-description">{item.description}</p>{/if}
                    </div>
                    <span class="item-price">${item.price.toFixed(2)}</span>
                </li>
            {/each}
        </ul>
         <h2>Softs</h2>
        <ul>
            {#each softDrinks as item (item.id)}
                <li>
                    <div>
                        <span class="item-name">{item.name}</span>
                        {#if item.description}<p class="item-description">{item.description}</p>{/if}
                    </div>
                    <span class="item-price">${item.price.toFixed(2)}</span>
                </li>
            {/each}
        </ul>
         <h2>Softs</h2>
        <ul>
            {#each hotDrinks as item (item.id)}
                <li>
                    <div>
                        <span class="item-name">{item.name}</span>
                        {#if item.description}<p class="item-description">{item.description}</p>{/if}
                    </div>
                    <span class="item-price">${item.price.toFixed(2)}</span>
                </li>
            {/each}
        </ul>
    </div>

    <div class="menu-section contact-info">
        <h2>Contact & Hours</h2>
        <p><strong>{contactInfo.name}</strong></p>
        <p>{contactInfo.address}, {contactInfo.city}</p>
        <p>Phone: {contactInfo.phone}</p>
        <p><strong>Hours:</strong></p>
        <p>Monday - Thursday: {contactInfo.hours.mondayToThursday}</p>
        <p>Friday - Saturday: {contactInfo.hours.fridayToSaturday}</p>
        <p>Sunday: {contactInfo.hours.sunday}</p>
        <p><strong>Happy Hour:</strong> {contactInfo.happyHour}</p>
    </div>
{/if}