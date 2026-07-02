export default function loadMore() {
    const btn = document.getElementById('load-more-btn');
    if (!btn) { return; }

    const feed = document.querySelector('.gh-postfeed');

    btn.addEventListener('click', async () => {
        const nextUrl = btn.getAttribute('data-next-url');
        if (!nextUrl) { return; }

        btn.textContent = 'Lädt...';
        btn.disabled = true;

        try {
            const res = await fetch(nextUrl);
            const html = await res.text();
            const parsed = new DOMParser().parseFromString(html, 'text/html');

            // Get all post-card articles from the next page
            const articles = parsed.querySelectorAll('.gh-postfeed article');
            articles.forEach(post => {
                feed.appendChild(post);
            });

            const nextPage = parsed.querySelector('#load-more-btn');
            if (nextPage) {
                btn.setAttribute('data-next-url', nextPage.getAttribute('data-next-url'));
                btn.textContent = 'Mehr laden';
                btn.disabled = false;
            } else {
                btn.remove();
            }
        } catch (e) {
            btn.textContent = 'Fehler – nochmal versuchen';
            btn.disabled = false;
        }
    });
}
