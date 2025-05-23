<script lang="ts">
    import { onMount } from 'svelte';
    import {
        getCocktails, getNonAlcoholicCocktails, getBeersOnTap,
        getBottledBeers, getWines, getSoftDrinks, getHotDrinks,
        getContactInfo,
        type DrinkType, type WineType, type ContactInfo
    } from '$lib/data'; // Make sure this path is correct

    // Declare variables to hold your fetched data
    let cocktails: DrinkType[] = [];
    let nonAlcoholicCocktails: DrinkType[] = [];
    let beersOnTap: DrinkType[] = [];
    let bottledBeers: DrinkType[] = [];
    let wines: WineType[] = [];
    let softDrinks: DrinkType[] = [];
    let hotDrinks: DrinkType[] = [];
    let contactInfo: ContactInfo | null = null;
    let errorMessage: string | null = null;
    let isLoading = true;

    onMount(async () => {
        try {
            // Fetch all data categories concurrently for efficiency
            [
                cocktails, nonAlcoholicCocktails, beersOnTap,
                bottledBeers, wines, softDrinks, hotDrinks,
                contactInfo
            ] = await Promise.all([
                getCocktails(), getNonAlcoholicCocktails(), getBeersOnTap(),
                getBottledBeers(), getWines(), getSoftDrinks(), getHotDrinks(),
                getContactInfo()
            ]);
        } catch (error: any) {
            console.error('Error fetching menu data:', error);
            errorMessage = `Failed to load menu: ${error.message}. Please ensure Google Sheet is published and GIDs are correct.`;
        } finally {
            isLoading = false;
        }
    });
</script>

<style>
    /* Add your CSS styles here to format your menu */
    body { font-family: sans-serif; margin: 2em; line-height: 1.6; }
    h1, h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 0.5em; margin-top: 1.5em; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 0.5em; padding: 0.5em 0; display: flex; justify-content: space-between; align-items: flex-start;}
    .item-name { font-weight: bold; flex-grow: 1; }
    .item-price { margin-left: 1em; white-space: nowrap; }
    .item-description { font-size: 0.9em; color: #666; margin-top: 0.2em; flex-basis: 100%; }
    .error { color: red; font-weight: bold; }
    .loading { font-style: italic; color: #777; }
    .contact-info p { margin: 0.2em 0; }
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
    </div>

    <div class="menu-section">
        <h2>Non-Alcoholic Cocktails</h2>
        <ul>
            {#each nonAlcoholicCocktails as item (item.id)}
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

    <div class="menu-section">
        <h2>Beers on Tap</h2>
        <ul>
            {#each beersOnTap as item (item.id)}
                <li>
                    <div>
                        <span class="item-name">{item.name}</span> {item.size ? `(${item.size})` : ''}
                        {#if item.description}<p class="item-description">{item.description}</p>{/if}
                    </div>
                    <span class="item-price">${item.price.toFixed(2)}</span>
                </li>
            {/each}
        </ul>
    </div>

    <div class="menu-section">
        <h2>Bottled Beers</h2>
        <ul>
            {#each bottledBeers as item (item.id)}
                <li>
                    <div>
                        <span class="item-name">{item.name}</span> {item.size ? `(${item.size})` : ''}
                        {#if item.description}<p class="item-description">{item.description}</p>{/if}
                    </div>
                    <span class="item-price">${item.price.toFixed(2)}</span>
                </li>
            {/each}
        </ul>
    </div>

    <div class="menu-section">
        <h2>Wines</h2>
        <ul>
            {#each wines as item (item.id)}
                <li>
                    <div>
                        <span class="item-name">{item.name}</span> ({item.type} {item.byGlass ? 'Glass' : ''}{item.byBottle ? 'Bottle' : ''})
                        {#if item.description}<p class="item-description">{item.description}</p>{/if}
                    </div>
                    <span class="item-price">${item.price.toFixed(2)}</span>
                </li>
            {/each}
        </ul>
    </div>

    <div class="menu-section">
        <h2>Soft Drinks</h2>
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
    </div>

    <div class="menu-section">
        <h2>Hot Drinks</h2>
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

    {#if contactInfo}
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
{/if}