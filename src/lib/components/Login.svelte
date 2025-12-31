<script lang="ts">
    import { currentUser } from '$lib/store';
    import { account } from '$lib/appwrite'; // Keep for handleForgotPassword

    let email = '';
    let password = '';
    let errorMessage = '';

    async function handleAuth(type: 'login' | 'signup') {
        errorMessage = ''; // Clear previous errors
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, type })
            });

            const data = await response.json();

            if (response.ok) {
                // If login/signup is successful, redirect to dashboard
                window.location.href = '/dashboard';
            } else {
                errorMessage = data.message || 'Authentication failed.';
            }
        } catch (error) {
            console.error('Network error during authentication:', error);
            errorMessage = 'Network error. Please try again.';
        }
    }

    async function handleLogin() {
        await handleAuth('login');
    }

    async function handleSignup() {
        await handleAuth('signup');
    }

    async function handleForgotPassword() {
        errorMessage = ''; // Clear previous errors
        if (!email) {
            errorMessage = 'Please enter your email address to reset your password.';
            return;
        }
        try {
            // This still uses the client-side Appwrite for now as it doesn't involve session management directly
            // and the server endpoint for this is more complex to set up due to email templates.
            await account.createRecovery(email, window.location.origin + '/reset-password'); // Redirect to a SvelteKit page for password reset
            alert('Password recovery email sent! Please check your inbox.');
        } catch (error: any) {
            console.error('Forgot password failed:', error);
            errorMessage = error.message || 'Forgot password failed. Check the console for details.';
        }
    }

    async function handleLogout() {
        try {
            const response = await fetch('/logout', {
                method: 'POST'
            });

            if (response.ok) {
                currentUser.set(null); // Clear client-side store
                window.location.href = '/login'; // Redirect to login page
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
</script>

<div class="login-container">
    {#if $currentUser}
        <div class="welcome-message">
            <h2>Welcome, {$currentUser.name || $currentUser.email}!</h2>
            <button on:click={handleLogout}>Logout</button>
        </div>
    {:else}
        <div class="form-wrapper">
            <h2>Login or Sign Up</h2>
            <form on:submit|preventDefault>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" bind:value={email} placeholder="your@email.com" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" bind:value={password} placeholder="••••••••" />
                </div>
                {#if errorMessage}
                    <p class="error-message">{errorMessage}</p>
                {/if}
                <div class="button-group">
                    <button type="button" on:click={handleLogin}>Sign In</button>
                    <button type="button" on:click={handleSignup}>Sign Up</button>
                </div>
                <div class="forgot-password">
                    <button type="button" on:click={handleForgotPassword}>Forgot Password?</button>
                </div>
            </form>
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

    .forgot-password {
        text-align: center;
        margin-top: 1.5rem;
    }

    .forgot-password button {
        background: none;
        border: none;
        color: #FF8C42;
        font-size: 0.9rem;
        cursor: pointer;
        transition: color 0.3s ease;
        padding: 0;
    }

    .forgot-password button:hover {
        color: #FF5733;
        text-decoration: underline;
    }

    .error-message {
        color: #ff5733;
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
    }
</style>
