export function autoScroll() {
    const orderNowButton = document.getElementById('orderNow');
    orderNowButton.addEventListener('click', function() {
        const brothOrderSection = document.getElementById('broth-order');
        if (brothOrderSection) {
            brothOrderSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

export default autoScroll;