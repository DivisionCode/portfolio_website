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


    // const form =document.getElementById('connectForm');
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();

    //     const data = {
    //         name: document.getElementById('userName').value,
    //         email: document.getElementById('userEmail').value,
    //         message: document.getElementById('userText').value,
    //     };

    //     fetch("https://formsubmit.co/ajax/singh.rsingh.rohit@gmail.com", {
    //         method: "POST",
    //         headers: {'Content-Type': 'application/json'},
    //     })
    //     .then(response => {
    //         if(response.ok) {
    //             alert("Message sent Successfully!");
    //             form.reset();
    //         } else {
    //             alert("Failed to send.Please Try Again.")
    //         }
    //     })
    //     .catch( error => {
    //         alert("Error" + error.message);
    //     });
    // });
});