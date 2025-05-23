<script lang="ts">
    // Import only the DrinkType type
    import type { DrinkType } from '$lib/data';

    // Declare props that will be passed from the load function in +page.ts
    export let cocktails: DrinkType[];
    export let softDrinks: DrinkType[];
    export let hotDrinks: DrinkType[];
    export let error: string | undefined; // Prop to receive error message if load failed

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
</script>

<style>
    /* Add some basic styles */
    body { font-family: sans-serif; margin: 2em; line-height: 1.6; }
    h1, h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 0.5em; margin-top: 1.5em; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 0.5em; padding: 0.5em 0; display: flex; justify-content: space-between; align-items: flex-start;}
    .item-name { font-weight: bold; flex-grow: 1; }
    .item-price { margin-left: 1em; white-space: nowrap; }
    .item-description { font-size: 0.9em; color: #666; margin-top: 0.2em; flex-basis: 100%; }
    .error { color: red; font-weight: bold; }
    .menu-section { margin-bottom: 2em; }
    .contact-info p { margin: 0.2em 0; }
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