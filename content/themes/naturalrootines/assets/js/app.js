// JavaScript files are compiled and minified during the build process to the assets/built folder. See available scripts in the package.json file.

// Import CSS
import '../css/main.css';
import loadMore from './loadMore.js';

// Initialize load more functionality
loadMore();

// Theme Toggle with System Preference Support
(function () {
    const html = document.documentElement;
    const button = document.getElementById('themeCycleBtn');
    const iconLight = document.getElementById('iconLight');
    const iconDark = document.getElementById('iconDark');
    const iconSystem = document.getElementById('iconSystem');
    const tooltipText = document.getElementById('tooltipText');

    if (!button) return;

    const themes = ['system', 'light', 'dark'];
    const icons = {
        system: iconSystem,
        light: iconLight,
        dark: iconDark
    };
    const labels = {
        system: 'System',
        light: 'Hell',
        dark: 'Dunkel'
    };

    function getTheme() {
        return localStorage.getItem('theme') || 'system';
    }

    function applyTheme(theme, animate = false) {
        const isDark = theme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
            : theme === 'dark';

        html.classList.toggle('dark', isDark);

        Object.values(icons).forEach(icon => {
            icon?.classList.remove('opacity-100', 'scale-100');
            icon?.classList.add('opacity-0', 'scale-0');
        });

        const currentIcon = icons[theme];
        if (currentIcon) {
            const applyIconChange = () => {
                currentIcon.classList.remove('opacity-0', 'scale-0');
                currentIcon.classList.add('opacity-100', 'scale-100');
            };

            animate ? setTimeout(applyIconChange, 150) : applyIconChange();
        }

        if (tooltipText) tooltipText.textContent = labels[theme];
        button.setAttribute('aria-label', `Theme: ${labels[theme]}`);

        // Update Ghost comments color scheme
        const commentsWrapper = document.getElementById('comments-wrapper');
        const commentsScript = document.querySelector('script[data-ghost-comments]');
        if (commentsWrapper && commentsScript) {
            const newScript = document.createElement('script');
            Array.from(commentsScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            newScript.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
            commentsWrapper.innerHTML = '';
            commentsWrapper.appendChild(newScript);
        }
    }

    function cycleTheme() {
        const currentTheme = getTheme();
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];

        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme, true);
    }

    applyTheme(getTheme());

    button.addEventListener('click', cycleTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getTheme() === 'system') {
            applyTheme('system');
        }
    });
})();

// Web Share API - Native Share on Mobile
(function () {
    const webShareButton = document.querySelector('[data-web-share]');

    if (webShareButton && navigator.share) {
        webShareButton.classList.remove('hidden');
        webShareButton.classList.add('inline-flex');

        webShareButton.addEventListener('click', async function (e) {
            e.preventDefault();
            const title = this.getAttribute('data-title');
            const text = this.getAttribute('data-text');
            const url = this.getAttribute('data-url');

            try {
                await navigator.share({ title, text, url });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        });
    }
})();

// Social Share - Copy Link Functionality
(function () {
    const copyButtons = document.querySelectorAll('[data-share-copy]');

    copyButtons.forEach(button => {
        button.addEventListener('click', async function (e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            const textElement = this.querySelector('[data-share-copy-text]');
            const originalText = textElement?.textContent || 'Link kopieren';

            if (!textElement) return;

            try {
                await navigator.clipboard.writeText(url);
                textElement.textContent = 'Kopiert!';
                setTimeout(() => textElement.textContent = originalText, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                textArea.style.cssText = 'position:fixed;left:-999999px';
                document.body.appendChild(textArea);
                textArea.select();

                try {
                    document.execCommand('copy');
                    textElement.textContent = 'Kopiert!';
                } catch {
                    textElement.textContent = 'Fehler!';
                } finally {
                    setTimeout(() => textElement.textContent = originalText, 2000);
                    document.body.removeChild(textArea);
                }
            }
        });
    });
})();

// External Links - open in new tab with security attributes
(function () {
    function processExternalLinks() {
        const host = window.location.host;
        const contentLinks = document.querySelectorAll('.gh-content a[href]');

        contentLinks.forEach(link => {
            try {
                const url = new URL(link.href, window.location.origin);
                if (url.host && url.host !== host) {
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                }
            } catch {
                // Ignore relative or invalid URLs
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', processExternalLinks);
    } else {
        processExternalLinks();
    }
})();
