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

