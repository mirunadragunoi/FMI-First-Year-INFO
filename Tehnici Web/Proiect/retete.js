document.addEventListener("DOMContentLoaded", function() {

    const cards = document.querySelectorAll('.nutrienti-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = "#7550A3";
            card.style.color = "#fff";
            card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
        });

        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = "var(--color-cards)";
            card.style.color = "#333";
            card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const menuImages = document.querySelectorAll('.menu-card img');

    menuImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.style.transform = "rotate(180deg)";
        });

        image.addEventListener('mouseleave', () => {
            image.style.transform = "rotate(0deg)";
        });
    });
});