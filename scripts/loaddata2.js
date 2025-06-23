document.addEventListener('DOMContentLoaded', function() {
    const catsGrid2 = document.querySelector('.cats-grid2');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const errorMessage = document.querySelector('.error-message');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    let allCats = [];
    let displayedCount = 12;
    let currentFilter = 'all';

    // Загрузка данных
    async function loadCats() {
        try {
            const response = await fetch('../data/cats.json');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            allCats = await response.json();
            displayCats(getFilteredCats().slice(0, displayedCount));
            setupFiltering();
            setupLoadMore();
            
        } catch (error) {
            console.error('Error loading cats data:', error);
            errorMessage.style.display = 'block';
        }
    }

    function getFilteredCats() {
        return currentFilter === 'all' 
            ? allCats 
            : allCats.filter(cat => cat.category === currentFilter);
    }

    function displayCats(cats) {
        catsGrid2.innerHTML = '';

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
                    <img src="${imagePath}" alt="${cat.name}" class="cat-image" onerror="handleImageError(this)">
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

            catCard.querySelector('.learn-more-btn').addEventListener('click', function () {
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

            catsGrid2.appendChild(catCard);
        });

        // Показываем/скрываем кнопку "Загрузить еще"
        if (loadMoreBtn) {
            const filteredCats = getFilteredCats();
            loadMoreBtn.style.display = filteredCats.length > cats.length ? 'block' : 'none';
        }
    }

    function handleImageError(img) {
        console.error('Не удалось загрузить изображение:', img.src);
        img.onerror = null;
        img.src = 'img/no-image.jpg';
        img.alt = 'Изображение не найдено';
    }

    function setupFiltering() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                currentFilter = button.dataset.filter;
                displayedCount = 12; // Сбрасываем счетчик при смене фильтра
                displayCats(getFilteredCats().slice(0, displayedCount));
            });
        });
    }

    function setupLoadMore() {
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                displayedCount += 12;
                displayCats(getFilteredCats().slice(0, displayedCount));
            });
        }
    }

    // Закрытие модального окна
    document.querySelector('.modal-close')?.addEventListener('click', function () {
        document.getElementById('cat-modal').style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        const modal = document.getElementById('cat-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    loadCats();
});
