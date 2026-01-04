<script lang="ts">
    import { currentUser } from '$lib/store';

    let email = '';
    let code = '';
    let errorMessage = '';
    let successMessage = '';
    let isLoading = false;
    let codeSent = false;

    async function handleSendCode() {
        errorMessage = '';
        successMessage = '';
        isLoading = true;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                successMessage = data.message;
                codeSent = true;
            } else {
                errorMessage = data.message || 'Failed to send code.';
            }
        } catch (error) {
            console.error('Network error:', error);
            errorMessage = 'Network error. Please try again.';
        } finally {
            isLoading = false;
        }
    }

    async function handleVerifyCode() {
        errorMessage = '';
        successMessage = '';
        isLoading = true;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code })
            });

            const data = await response.json();

            if (response.ok) {
                successMessage = 'Logged in successfully! Redirecting...';
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
            } else {
                errorMessage = data.message || 'Invalid code. Please try again.';
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

    function resetForm() {
        codeSent = false;
        errorMessage = '';
        successMessage = '';
        email = '';
        code = '';
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
            <h2>Sign In or Create Account</h2>

            {#if codeSent}
                <form on:submit|preventDefault>
                    <p class="step-info">Enter the code sent to {email}</p>
                    <div class="form-group">
                        <label for="code">Verification Code</label>
                        <input
                            type="text"
                            id="code"
                            bind:value={code}
                            placeholder="Enter 6-digit code"
                            required
                            maxlength="6"
                        />
                    </div>

                    {#if errorMessage}
                        <p class="error-message">{errorMessage}</p>
                    {/if}

                    <div class="button-group">
                        <button
                            type="button"
                            on:click={handleVerifyCode}
                            disabled={isLoading || code.length < 6}
                            class="primary-btn"
                        >
                            {isLoading ? 'Verifying...' : 'Verify Code'}
                        </button>
                        <button
                            type="button"
                            on:click={resetForm}
                            disabled={isLoading}
                            class="secondary-btn"
                        >
                            Back
                        </button>
                    </div>
                </form>
            {:else}
                <form on:submit|preventDefault>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    {#if errorMessage}
                        <p class="error-message">{errorMessage}</p>
                    {/if}

                    <div class="button-group">
                        <button
                            type="button"
                            on:click={handleSendCode}
                            disabled={isLoading}
                            class="primary-btn"
                        >
                            {isLoading ? 'Sending...' : 'Send Code'}
                        </button>
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

    .error-message {
        color: #ff5733;
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
    }

    .step-info {
        color: #ccc;
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
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

    .secondary-btn {
        flex-grow: 1;
        background: none;
        color: #FF5733;
        border: 2px solid #FF5733;
        padding: 0.8rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .secondary-btn:hover:not(:disabled) {
        background: rgba(255, 87, 51, 0.1);
        transform: translateY(-2px);
    }

    .secondary-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>
