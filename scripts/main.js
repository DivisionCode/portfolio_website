document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab');
    const slides = document.querySelectorAll('.slide');
    const tables = document.querySelectorAll('.table');

    tabs.forEach(tab => {
        tab.addEventListener('click',() => {
            const targetId = tab.dataset.tab;
            const type = tab.dataset.type;

            tabs.forEach((btn) => btn.classList.remove('active'));
            tab.classList.add('active');

            if (type === 'slide') {
                slides.forEach((slide) => {
                    slide.classList.remove('active');
                });
                const targetSlide = document.getElementById(targetId);                
                if (targetSlide) targetSlide.classList.add('active');
            } else if (type === 'table') {
                tables.forEach((table => {
                    table.classList.remove('active');
                }));
                const targetSlide = document.getElementById(targetId);  
                if (targetSlide) targetSlide.classList.add('active');
            }

        });
    });
});