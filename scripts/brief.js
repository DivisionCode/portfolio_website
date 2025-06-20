document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab');
    const slides = document.querySelectorAll('.slide');

    tabs.forEach(tab => {
        tab.addEventListener('click',() => {
            const targetId = tab.dataset.tab;

            tabs.forEach((btn) => btn.classList.remove('active'));
            tab.classList.add('active');

            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });
});