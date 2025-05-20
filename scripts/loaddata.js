document.addEventListener('DOMContentLoaded', function() {
    const catsGrid = document.querySelector('.cats-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const errorMessage = document.querySelector('.error-message');

    // Загрузка данных
    async function loadCats() {
        try {
            const response = await fetch('../data/cats.json');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const cats = await response.json();
            displayCats(cats.slice(0, 6)); // Показываем первые 6 котиков
            setupFiltering(cats);
            
        } catch (error) {
            console.error('Error loading cats data:', error);
            errorMessage.style.display = 'block';
        }
    }


    function displayCats(cats) {
        catsGrid.innerHTML = '';
        
        cats.forEach(cat => {
            const catCard = document.createElement('div');
            catCard.className = 'cat-card';
            catCard.dataset.category = cat.category;
            
            catCard.innerHTML = `
    <div class="cat-image-container">
        <img src="${cat.image}" alt="${cat.name}" class="cat-image">
    </div>
    <div class="cat-info">
        <div class="cat-name">${cat.name}</div>
        <div class="cat-age">Возраст: ${cat.age}</div>
        <div class="cat-description">${cat.description}</div>
        <div class="cat-history">История: ${cat.history}</div>
        <div class="cat-requirements">Требования: ${cat.requirements}</div>
        <!-- Новая кнопка -->
        <button class="learn-more-btn">Узнать больше</button>
    </div>
`;
            
            catsGrid.appendChild(catCard);
        });
    }


    function setupFiltering(cats) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                const filteredCats = filter === 'all' 
                    ? cats.slice(0, 6) 
                    : cats.filter(cat => cat.category === filter).slice(0, 6);
                
                displayCats(filteredCats);
            });
        });
    }


    loadCats();
});