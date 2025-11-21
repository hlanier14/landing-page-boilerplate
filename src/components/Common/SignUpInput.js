import React, { useState, useRef } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { getInputClasses, getButtonClasses } from '../../theme/themeUtils';
import { trackSignupFormStart, trackSignupFormSubmit } from '../../services/AnalyticsService';
import { SIGNUP_URL } from '../../config/constants';

export default function SignUpInput({
    placeholder = 'you@company.com',
    buttonText = 'Subscribe',
    loadingText = 'Subscribing…',
    onSubmit,
    className = '',
    inputClassName = '',
    buttonClassName = '',
    showStatus = true,
    onSuccess,
    onError,
    formLocation = 'unknown'
}) {

    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const formStartTime = useRef(null);
    const hasTrackedFormStart = useRef(false);

    async function handleSubmit(e) {

        e.preventDefault();
        if (!email || status === 'loading') return;
        setErrorMessage('');
        
        trackSignupFormSubmit({
            email,
            location: formLocation,
            status: 'attempt'
        });
        
        try {
            setStatus('loading');
            
            const formData = new FormData();
            formData.append('email', email);
            
            const response = await fetch(SIGNUP_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit email. Please try again.');
            }
            
            const submittedEmail = email;
            const timeToSubmit = formStartTime.current 
                ? Math.floor((Date.now() - formStartTime.current) / 1000) 
                : null;
            
            trackSignupFormSubmit({
                email: submittedEmail,
                location: formLocation,
                status: 'success',
                timeToSubmit
            });
            
            setStatus('success');
            setEmail('');
            setErrorMessage('');
            onSuccess?.();
            
            if (onSubmit) {
                try {
                    await onSubmit(submittedEmail);
                } catch (error) {
                    console.error('Error in onSubmit callback:', error);
                }
            }
        } catch (error) {
            const errorMsg = error?.message || 'Unknown error';
            trackSignupFormSubmit({
                email,
                location: formLocation,
                status: 'error',
                errorMessage: errorMsg
            });
            
            setStatus('error');
            setErrorMessage(errorMsg);
            onError?.(error);
        }
    }

    return (
        <div className={className}>
            <form 
                action={SIGNUP_URL}
                method="POST"
                onSubmit={handleSubmit} 
                className="relative"
            >
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (!hasTrackedFormStart.current && e.target.value.length > 0) {
                            hasTrackedFormStart.current = true;
                            formStartTime.current = Date.now();
                            trackSignupFormStart(formLocation);
                        }
                    }}
                    placeholder={placeholder}
                    className={`${getInputClasses(theme)} pl-4 pr-28 ${inputClassName}`}
                    required
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || !email}
                    className={`absolute right-1.5 top-1/2 -translate-y-1/2 ${getButtonClasses('primary', theme, { size: 'sm' })} ${buttonClassName}`}
                >
                    {status === 'loading' ? loadingText : buttonText}
                </button>
            </form>
            {showStatus && status === 'success' && (
                <div className="mt-3 text-green-700 text-sm dark:text-green-400">
                    Thank you for joining! We'll be in touch soon.
                </div>
            )}
            {showStatus && status === 'error' && errorMessage && (
                <div className="mt-3 text-red-600 text-sm dark:text-red-400">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

