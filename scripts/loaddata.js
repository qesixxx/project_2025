document.addEventListener('DOMContentLoaded', function() {
    const catsGrid = document.querySelector('.cats-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const errorMessage = document.querySelector('.error-message');

    const GIST_URL = 'https://gist.githubusercontent.com/qesixxx/78358c2e5ffd5e76654f8b958e9e1313/raw/d26ea84c417ab4957c8a68fb868044c29f16d165/cats.json';

    async function loadCats() {
        try {
            const response = await fetch(GIST_URL);
            //const response = await fetch('./data/cats.json');
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            
            const cats = await response.json();
            displayCats(cats.slice(0, 6)); 
            setupFiltering(cats);
            
        } catch (error) {
            console.error('Ошибка:', error);
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Не удалось загрузить данные. Попробуйте позже.';
        }
    }

    function displayCats(cats) {
    catsGrid.innerHTML = '';
    
    cats.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.className = 'cat-card';
        catCard.dataset.category = cat.category;
        
        
        const isLocalFile = window.location.protocol === 'file:';
        let imagePath = cat.image;
        
        
        if (isLocalFile) {
            imagePath = imagePath.replace('../', '');
        }
        
        catCard.innerHTML = `
            <div class="cat-image-container">
                <img src="${imagePath}" alt="${cat.name}" 
                     class="cat-image"
                     onerror="handleImageError(this)">
            </div>
            <div class="cat-info">
                <div class="cat-name">${cat.name}</div>
                <div class="cat-age">Возраст: ${cat.age}</div>
                <div class="cat-description">${cat.description}</div>
                <div class="cat-history">История: ${cat.history}</div>
                <div class="cat-requirements">Требования: ${cat.requirements}</div>
                <button class="learn-more-btn">Узнать больше</button>
            </div>
        `;
        catCard.querySelector('.learn-more-btn').addEventListener('click', function() {
            const modal = document.getElementById('cat-modal');
            const modalName = modal.querySelector('.modal-name');
            const modalAge = modal.querySelector('.modal-age');
            const modalDescription = modal.querySelector('.modal-description');
            const modalHistory = modal.querySelector('.modal-history');
            const modalRequirements = modal.querySelector('.modal-requirements');
            const modalImg = modal.querySelector('#modal-img');
        
           
            modalName.textContent = cat.name;
            modalAge.textContent = cat.age;
            modalDescription.textContent = cat.description;
            modalHistory.textContent = cat.history || 'Нет информации';
            modalRequirements.textContent = cat.requirements || 'Нет информации';
            modalImg.src = imagePath;
        
           
            modal.style.display = 'block';
        });
        
       
        document.querySelector('.modal-close')?.addEventListener('click', function() {
            document.getElementById('cat-modal').style.display = 'none';
        });
        
        
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('cat-modal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        catsGrid.appendChild(catCard);
    });
}

    
    function handleImageError(img) {
        console.error('Не удалось загрузить изображение:', img.src);
        img.onerror = null; 
        img.src = 'img/no-image.jpg'; 
        img.alt = 'Изображение не найдено';
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