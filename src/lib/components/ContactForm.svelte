<script lang="ts">
    import { currentUser } from '$lib/store';

    let subject = '';
    let message = '';
    let email = $currentUser?.email || '';
    let imageUrl = '';
    let selectedFile: File | null = null;
    let loading = false;
    let successMessage = '';
    let errorMessage = '';

    function handleFileSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            selectedFile = file;
            // For now, we'll show a preview URL
            imageUrl = URL.createObjectURL(file);
        }
    }

    async function handleUploadImage() {
        if (!selectedFile) {
            errorMessage = 'Please select an image first';
            return;
        }

        loading = true;
        errorMessage = '';

        try {
            // This will use Cloudinary once credentials are configured
            // For now, it's a placeholder
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const data = await response.json();
            imageUrl = data.url;
            successMessage = 'Image uploaded successfully';
            selectedFile = null;
            setTimeout(() => successMessage = '', 3000);
        } catch (error) {
            errorMessage = 'Failed to upload image. Please try again.';
            console.error('Upload error:', error);
        } finally {
            loading = false;
        }
    }

    async function handleSubmit() {
        if (!subject.trim() || !message.trim()) {
            errorMessage = 'Please fill in all required fields';
            return;
        }

        loading = true;
        errorMessage = '';
        successMessage = '';

        try {
            const response = await fetch('/api/send-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    subject,
                    message,
                    imageUrl
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            successMessage = 'Your message has been sent successfully!';
            subject = '';
            message = '';
            imageUrl = '';

            setTimeout(() => successMessage = '', 5000);
        } catch (error) {
            errorMessage = 'Failed to send message. Please try again.';
            console.error('Submit error:', error);
        } finally {
            loading = false;
        }
    }
</script>

<div class="contact-form-container">
    <div class="form-card">
        <h2>Send us a Message</h2>
        <p class="form-subtitle">Share your feedback, questions, or concerns with us</p>

        <form on:submit|preventDefault={handleSubmit}>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    bind:value={email}
                    placeholder="your@email.com"
                    readonly
                />
            </div>

            <div class="form-group">
                <label for="subject">Subject <span class="required">*</span></label>
                <input
                    type="text"
                    id="subject"
                    bind:value={subject}
                    placeholder="What is this about?"
                    maxlength="100"
                />
            </div>

            <div class="form-group">
                <label for="message">Message <span class="required">*</span></label>
                <textarea
                    id="message"
                    bind:value={message}
                    placeholder="Tell us more..."
                    rows="6"
                    maxlength="1000"
                ></textarea>
                <span class="char-count">{message.length}/1000</span>
            </div>

            <div class="image-upload-section">
                <label for="image-input">Add an Image (Optional)</label>
                <div class="upload-area">
                    {#if imageUrl}
                        <div class="image-preview">
                            <img src={imageUrl} alt="Preview" />
                            <button type="button" class="remove-btn" on:click={() => {
                                imageUrl = '';
                                selectedFile = null;
                            }}>✕</button>
                        </div>
                    {:else}
                        <div class="upload-placeholder">
                            <input
                                type="file"
                                id="image-input"
                                accept="image/*"
                                on:change={handleFileSelect}
                            />
                            <label for="image-input" class="upload-label">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="17 8 12 3 7 8"/>
                                    <line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                                <span>Click to upload image</span>
                            </label>
                        </div>
                    {/if}
                </div>
                {#if selectedFile}
                    <button type="button" class="upload-btn" on:click={handleUploadImage} disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Image'}
                    </button>
                {/if}
            </div>

            {#if successMessage}
                <div class="success-message">✓ {successMessage}</div>
            {/if}

            {#if errorMessage}
                <div class="error-message">✗ {errorMessage}</div>
            {/if}

            <button type="submit" class="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    </div>
</div>

<style>
    .contact-form-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
    }

    .form-card {
        background: rgba(26, 26, 26, 0.8);
        border: 2px solid #FF5733;
        border-radius: 15px;
        padding: 3rem;
        width: 100%;
        max-width: 700px;
        box-shadow: 0 10px 40px rgba(255, 87, 51, 0.15);
        animation: slideUp 0.5s ease-out;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 2rem;
        color: #FF5733;
    }

    .form-subtitle {
        color: #aaa;
        margin-bottom: 2rem;
        font-size: 0.95rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
        position: relative;
    }

    label {
        display: block;
        margin-bottom: 0.7rem;
        color: #ddd;
        font-weight: 600;
        font-size: 0.95rem;
    }

    .required {
        color: #FF5733;
    }

    input[type="text"],
    input[type="email"],
    textarea {
        width: 100%;
        padding: 0.9rem;
        background: rgba(255, 255, 255, 0.08);
        border: 2px solid rgba(255, 87, 51, 0.2);
        color: #fff;
        border-radius: 8px;
        font-family: inherit;
        font-size: 1rem;
        transition: border-color 0.3s ease, background-color 0.3s ease;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    textarea:focus {
        outline: none;
        border-color: #FF5733;
        background: rgba(255, 87, 51, 0.1);
    }

    input[type="email"][readonly] {
        background: rgba(255, 255, 255, 0.04);
        cursor: not-allowed;
    }

    textarea {
        resize: vertical;
        min-height: 150px;
    }

    .char-count {
        display: block;
        text-align: right;
        font-size: 0.8rem;
        color: #999;
        margin-top: 0.3rem;
    }

    .image-upload-section {
        margin-bottom: 2rem;
    }

    .upload-area {
        background: rgba(255, 87, 51, 0.05);
        border: 2px dashed rgba(255, 87, 51, 0.3);
        border-radius: 10px;
        padding: 2rem;
        text-align: center;
        transition: border-color 0.3s ease, background-color 0.3s ease;
    }

    .upload-area:hover {
        border-color: #FF5733;
        background: rgba(255, 87, 51, 0.1);
    }

    .upload-placeholder {
        position: relative;
    }

    input[type="file"] {
        display: none;
    }

    .upload-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        cursor: pointer;
        color: #FF8C42;
        transition: color 0.3s ease;
    }

    .upload-label:hover {
        color: #FF5733;
    }

    .image-preview {
        position: relative;
        display: inline-block;
    }

    .image-preview img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 8px;
        border: 2px solid #FF5733;
    }

    .remove-btn {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 28px;
        height: 28px;
        background: #FF5733;
        color: #fff;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .remove-btn:hover {
        background: #FF8C42;
        transform: scale(1.1);
    }

    .upload-btn {
        background: linear-gradient(135deg, #FF5733, #FF8C42);
        color: #fff;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        margin-top: 1rem;
        width: 100%;
    }

    .upload-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 87, 51, 0.3);
    }

    .upload-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .success-message,
    .error-message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-weight: 500;
        animation: fadeIn 0.3s ease-out;
    }

    .success-message {
        background: rgba(76, 175, 80, 0.1);
        border: 2px solid #4caf50;
        color: #4caf50;
    }

    .error-message {
        background: rgba(255, 87, 51, 0.1);
        border: 2px solid #FF5733;
        color: #FF5733;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .submit-btn {
        width: 100%;
        background: linear-gradient(135deg, #FF5733, #FF8C42);
        color: #fff;
        border: none;
        padding: 1rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 87, 51, 0.3);
    }

    .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .form-card {
            padding: 2rem;
        }

        h2 {
            font-size: 1.5rem;
        }

        .upload-area {
            padding: 1.5rem;
        }

        .image-preview img {
            max-width: 150px;
            max-height: 150px;
        }
    }
</style>
