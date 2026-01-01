<script lang="ts">
    import { currentUser } from '$lib/store';

    let email = '';
    let phone = '';
    let errorMessage = '';
    let successMessage = '';
    let isLoading = false;
    let isSignUp = false;
    let linkSent = false;

    async function handleMagicLinkRequest(type: 'login' | 'signup') {
        errorMessage = '';
        successMessage = '';
        isLoading = true;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    phone: type === 'signup' ? phone : undefined,
                    type
                })
            });

            const data = await response.json();

            if (response.ok) {
                successMessage = `Magic link sent to ${email}. Please check your inbox!`;
                linkSent = true;
                email = '';
                phone = '';
            } else {
                errorMessage = data.message || 'Failed to send magic link.';
            }
        } catch (error) {
            console.error('Network error:', error);
            errorMessage = 'Network error. Please try again.';
        } finally {
            isLoading = false;
        }
    }

    async function handleLogout() {
        try {
            const response = await fetch('/logout', {
                method: 'POST'
            });

            if (response.ok) {
                currentUser.set(null);
                window.location.href = '/login';
            } else {
                const data = await response.json();
                console.error('Server logout error:', data.message);
                alert(data.message || 'Logout failed.');
            }
        } catch (error) {
            console.error('Network error during logout:', error);
            alert('Network error during logout. Please try again.');
        }
    }

    function toggleAuthMode() {
        isSignUp = !isSignUp;
        linkSent = false;
        errorMessage = '';
        successMessage = '';
        email = '';
        phone = '';
    }
</script>

<div class="login-container">
    {#if $currentUser}
        <div class="welcome-message">
            <h2>Welcome, {$currentUser.name || $currentUser.email}!</h2>
            <button on:click={handleLogout}>Logout</button>
        </div>
    {:else}
        <div class="form-wrapper">
            <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>

            {#if linkSent}
                <div class="confirmation-message">
                    <p>{successMessage}</p>
                    <p class="subtext">The link will expire in 24 hours.</p>
                    <button type="button" on:click={toggleAuthMode} class="back-btn">
                        {isSignUp ? 'Back to Sign In' : 'Back to Sign Up'}
                    </button>
                </div>
            {:else}
                <form on:submit|preventDefault>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    {#if isSignUp}
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                bind:value={phone}
                                placeholder="+1234567890"
                                required
                            />
                        </div>
                    {/if}

                    {#if errorMessage}
                        <p class="error-message">{errorMessage}</p>
                    {/if}

                    <div class="button-group">
                        <button
                            type="button"
                            on:click={() => handleMagicLinkRequest(isSignUp ? 'signup' : 'login')}
                            disabled={isLoading}
                            class="primary-btn"
                        >
                            {isLoading ? 'Sending...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                        </button>
                    </div>

                    <div class="toggle-mode">
                        <p>
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button
                                type="button"
                                on:click={toggleAuthMode}
                                class="toggle-btn"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </form>
            {/if}
        </div>
    {/if}
</div>

<style>
    .login-container {
        padding-top: 150px; /* To avoid being hidden by the fixed navbar */
        padding-bottom: 50px;
        max-width: 450px;
        margin: 0 auto;
        animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .form-wrapper {
        background: #1a1a1a;
        padding: 2.5rem;
        border-radius: 15px;
        border: 2px solid #FF5733;
        box-shadow: 0 10px 40px rgba(255, 87, 51, 0.2);
    }

    .welcome-message {
        text-align: center;
        color: #fff;
    }
    .welcome-message h2 {
        color: #FF5733;
        margin-bottom: 1.5rem;
    }
    .welcome-message button {
        background: linear-gradient(135deg, #FF5733, #FF8C42);
        color: #fff;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    .welcome-message button:hover {
        transform: translateY(-2px);
    }

    h2 {
        color: #FF5733;
        margin-bottom: 2rem;
        text-align: center;
        font-size: 2rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #ccc;
        font-size: 0.9rem;
    }

    input {
        width: 100%;
        padding: 0.8rem;
        border: 2px solid rgba(255, 87, 51, 0.3);
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    input:focus {
        outline: none;
        border-color: #FF5733;
    }

    .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    .button-group button {
        flex-grow: 1;
        background: linear-gradient(135deg, #FF5733, #FF8C42);
        color: #fff;
        border: none;
        padding: 0.8rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .button-group button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 87, 51, 0.3);
    }
    
    /* Secondary button style */
    .button-group button:last-child {
        background: none;
        border: 2px solid #FF5733;
    }

    .error-message {
        color: #ff5733;
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
    }

    .confirmation-message {
        text-align: center;
        padding: 2rem 1rem;
    }

    .confirmation-message p {
        color: #ccc;
        margin-bottom: 1rem;
        font-size: 1rem;
    }

    .confirmation-message .subtext {
        color: #999;
        font-size: 0.85rem;
        margin-bottom: 2rem;
    }

    .back-btn {
        background: linear-gradient(135deg, #FF5733, #FF8C42);
        color: #fff;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .back-btn:hover {
        transform: translateY(-2px);
    }

    .toggle-mode {
        text-align: center;
        margin-top: 1.5rem;
    }

    .toggle-mode p {
        color: #ccc;
        font-size: 0.95rem;
    }

    .toggle-btn {
        background: none;
        border: none;
        color: #FF5733;
        font-weight: 600;
        cursor: pointer;
        text-decoration: underline;
        margin-left: 0.5rem;
        padding: 0;
        transition: color 0.3s ease;
    }

    .toggle-btn:hover {
        color: #FF8C42;
    }

    .primary-btn {
        width: 100%;
        background: linear-gradient(135deg, #FF5733, #FF8C42);
        color: #fff;
        border: none;
        padding: 0.8rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .primary-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 87, 51, 0.3);
    }

    .primary-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>
