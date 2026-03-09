// JavaScript files are compiled and minified during the build process to the assets/built folder. See available scripts in the package.json file.

// Import CSS
import '../css/main.css';

(function () {
    const html = document.documentElement;
    const button = document.getElementById('themeCycleBtn');
    const iconLight = document.getElementById('iconLight');
    const iconDark = document.getElementById('iconDark');
    const iconSystem = document.getElementById('iconSystem');
    const tooltipText = document.getElementById('tooltipText');

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
        if (theme === 'system') {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            html.classList.toggle('dark', systemDark);
        } else {
            html.classList.toggle('dark', theme === 'dark');
        }

        Object.values(icons).forEach(icon => {
            icon.classList.remove('opacity-100', 'scale-100');
            icon.classList.add('opacity-0', 'scale-0');
        });

        if (animate) {
            setTimeout(() => {
                icons[theme].classList.remove('opacity-0', 'scale-0');
                icons[theme].classList.add('opacity-100', 'scale-100');
            }, 150);
        } else {
            icons[theme].classList.remove('opacity-0', 'scale-0');
            icons[theme].classList.add('opacity-100', 'scale-100');
        }

        tooltipText.textContent = labels[theme];
        button.setAttribute('aria-label', `Theme: ${labels[theme]}`);
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
        // Show the native share button if Web Share API is supported
        webShareButton.classList.remove('hidden');
        webShareButton.classList.add('inline-flex');

        webShareButton.addEventListener('click', async function () {
            const title = this.getAttribute('data-title');
            const text = this.getAttribute('data-text');
            const url = this.getAttribute('data-url');

            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url
                });
            } catch (err) {
                // User cancelled or error occurred
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
        button.addEventListener('click', async function () {
            const url = this.getAttribute('data-url');
            const textElement = this.querySelector('[data-share-copy-text]');
            const originalText = textElement.textContent;

            try {
                await navigator.clipboard.writeText(url);
                textElement.textContent = 'Kopiert!';

                setTimeout(() => {
                    textElement.textContent = originalText;
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();

                try {
                    document.execCommand('copy');
                    textElement.textContent = 'Kopiert!';

                    setTimeout(() => {
                        textElement.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    textElement.textContent = 'Fehler!';

                    setTimeout(() => {
                        textElement.textContent = originalText;
                    }, 2000);
                }

                document.body.removeChild(textArea);
            }
        });
    });
})();
