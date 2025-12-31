<script lang="ts">
    import { currentUser } from '$lib/store';
    import ContactForm from '$lib/components/ContactForm.svelte';

    function handleLogout() {
        fetch('/logout', { method: 'POST' }).then(() => {
            window.location.href = '/login';
        });
    }
</script>

<div class="dashboard-container">
    <header class="dashboard-header">
        <div class="header-content">
            <h1>Contact Us</h1>
            {#if $currentUser}
                <div class="user-info">
                    <span>Welcome, {$currentUser.name || $currentUser.email}</span>
                    <button class="logout-btn" on:click={handleLogout}>Logout</button>
                </div>
            {/if}
        </div>
    </header>

    <main class="dashboard-main">
        <ContactForm />
    </main>
</div>

<style>
    .dashboard-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
        color: #fff;
    }

    .dashboard-header {
        background: rgba(255, 87, 51, 0.05);
        border-bottom: 2px solid #FF5733;
        padding: 2rem;
        sticky-top: 0;
        z-index: 10;
    }

    .header-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        margin: 0;
        font-size: 2.5rem;
        color: #FF5733;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .logout-btn {
        background: linear-gradient(135deg, #FF5733, #FF8C42);
        color: #fff;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .logout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 87, 51, 0.3);
    }

    .dashboard-main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 3rem 2rem;
    }

    @media (max-width: 768px) {
        .header-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
        }

        .user-info {
            flex-direction: column;
            width: 100%;
        }

        h1 {
            font-size: 1.8rem;
        }
    }
</style>
