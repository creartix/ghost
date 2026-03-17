export default async function loadCommentCounts() {
    const cards = document.querySelectorAll('[data-post-id]');
    if (!cards.length) { return; }

    const apiKey = '5bfab7dc5082a73924d4b32cb9';
    const apiUrl = `${window.location.origin}/ghost/api/content/posts/`;

    const ids = Array.from(cards).map(c => c.dataset.postId);
    const filter = ids.map(id => `id:${id}`).join(',');

    try {
        const res = await fetch(
            `${apiUrl}?key=${apiKey}&filter=${encodeURIComponent(filter)}&fields=id&include=count.comments&limit=${ids.length}`
        );
        const { posts } = await res.json();

        posts.forEach(post => {
            const card = document.querySelector(`[data-post-id="${post.id}"]`);
            if (!card) { return; }
            const span = card.querySelector('.comment-count');
            if (!span) { return; }
            const count = post.count?.comments ?? 0;
            span.textContent = count === 1 ? '1 Kommentar' : `${count} Kommentare`;
        });
    } catch (e) {
        // silently fail — comment counts are non-critical
    }
}
