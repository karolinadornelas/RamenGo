function handleBrothSelection() {
    const brothOptionCards = document.querySelectorAll('#broth-order .option-card');
        brothOptionCards.forEach(card => {
            card.addEventListener('click', () => {
                if (!card.classList.contains('selected')) {
                    brothOptionCards.forEach(c => {
                        c.classList.remove('selected');
                        const inactiveImg = c.getAttribute('card-inactive-img');
                        c.querySelector('img').src = inactiveImg;
                    });

                    card.classList.add('selected');
                    const activeImg = card.getAttribute('card-active-img');
                    card.querySelector('img').src = activeImg;
                } else {
                    card.classList.remove('selected');
                    const inactiveImg = card.getAttribute('card-inactive-img');
                    card.querySelector('img').src = inactiveImg;
                }
            }
        )}

)};
export default handleBrothSelection;