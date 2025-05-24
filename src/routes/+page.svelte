<script lang="ts">
    // Remove the individual get functions here, data will come from props
    // import { getCocktails, getNonAlcoholicCocktails, getBeersOnTap, ... }
    
    // Import only the DrinkType type from $lib/data
    import type { DrinkType } from '$lib/data';

    // Declare variables to receive data as PROPS from the load function
    // The 'export let' makes them props
    export let cocktails: DrinkType[];
    export let nonAlcoholicCocktails: DrinkType[];
    export let beersOnTap: DrinkType[];
    export let bottledBeers: DrinkType[];
    export let wines: DrinkType[];
    export let softDrinks: DrinkType[];
    export let hotDrinks: DrinkType[];
    export let error: string | undefined; // To display error message if load fails

    // Hardcode contact info directly in the component (this remains the same)
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

    // REMOVE THE ENTIRE onMount BLOCK. It will no longer be used for data fetching.
    // onMount(async () => { /* ... */ });

    // Remove isLoading and errorMessage variables from here too.
    // The loading/error state will be handled by the presence of `error` prop
    // and the initial HTML content (if error, show error; otherwise, show content).
</script>

<style>
    /* ... (your existing CSS styles remain the same) ... */
</style>

{#if error}
    <p class="error">{error}</p>
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