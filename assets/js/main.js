        

        const container = document.getElementById('team-container');
        const prevBtn = document.getElementById('team-prev');
        const nextBtn = document.getElementById('team-next');

        const scrollAmount = 300; // nombre de pixels à défiler à chaque clic

        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });