<script lang="ts">
    // Import only the DrinkType type from your data library
    import type { DrinkType } from '$lib/data';

    // Declare props that will be passed from the load function in +page.ts
    // The 'export let' makes these properties accessible as props.
    export let cocktails: DrinkType[];
    export let nonAlcoholicCocktails: DrinkType[];
    export let beersOnTap: DrinkType[];
    export let bottledBeers: DrinkType[];
    export let wines: DrinkType[];
    export let softDrinks: DrinkType[];
    export let hotDrinks: DrinkType[];
    export let error: string | undefined; // Prop to receive error message if load failed

    // Hardcode contact info directly in the component (this part remains unchanged)
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

    // REMOVE THE ENTIRE onMount BLOCK from this file.
    // REMOVE 'isLoading' and 'errorMessage' variables.
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