export default {
    darkMode: 'class',
    content: [
        './**/*.hbs',
        './assets/**/*.js',
    ],
    theme: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
    // Performance optimizations for production
    corePlugins: {
        preflight: true,
    },
}