// Inisialisasi Lucide icons
lucide.createIcons();

// Tambahkan padding ke body untuk mencegah konten tertutup footer
document.body.classList.add('pb-16'); // Reduced from pb-20

// GSAP Animation for Result Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('[data-animate-card]');
    cards.forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[name="query"]');
    const suggestionsBox = document.getElementById('suggestions');
    const staticSuggestions = [
        "Belajar PHP Dasar",
        "Pengertian Database MYSQL",
        "Pengenalan JavaScript",
        "Belajar CSS Untuk Pemula",
        "Manajemen Server Dengan Debian",
        "Kriptografi Untuk Keamanan",
        "Pemrograman Di C# Untuk Pemula",
    ];

    let selectedIndex = -1;

    searchInput.addEventListener("input", function () {
        const inputValue = this.value.trim();
        suggestionsBox.innerHTML = ''; // Clear previous suggestions

        if (!inputValue) {
            suggestionsBox.classList.add('hidden');
            return;
        }

        const filteredSuggestions = staticSuggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase())
        ).slice(0, 5);

        if (filteredSuggestions.length > 0) {
            const suggestionList = document.createElement('ul');
            filteredSuggestions.forEach((suggestion, index) => {
                const li = document.createElement("li");
                li.textContent = suggestion;
                li.addEventListener("click", function () {
                    searchInput.value = suggestion;
                    suggestionsBox.classList.add('hidden');
                    selectedIndex = -1;
                });
                suggestionList.appendChild(li);
            });

            suggestionsBox.innerHTML = '';
            suggestionsBox.appendChild(suggestionList);
            suggestionsBox.classList.remove('hidden');
        } else {
            suggestionsBox.classList.add('hidden');
        }
    });

    // Keyboard navigation
    searchInput.addEventListener("keydown", function (event) {
        const items = suggestionsBox.querySelectorAll('li');

        if (event.key === "ArrowDown") {
            if (selectedIndex < items.length - 1) {
                if (selectedIndex >= 0) {
                    items[selectedIndex].classList.remove("hover");
                }
                selectedIndex++;
                items[selectedIndex].classList.add("hover");
            }
            event.preventDefault();
        } else if (event.key === "ArrowUp") {
            if (selectedIndex > 0) {
                items[selectedIndex].classList.remove("hover");
                selectedIndex--;
                items[selectedIndex].classList.add("hover");
            }
            event.preventDefault();
        } else if (event.key === "Enter") {
            if (selectedIndex >= 0 && selectedIndex < items.length) {
                searchInput.value = items[selectedIndex].textContent;
                suggestionsBox.classList.add('hidden');
                selectedIndex = -1;
            } else {
                // Normal form submission
                document.querySelector("form").submit();
            }
            event.preventDefault();
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.classList.add('hidden');
        }
    });
});

window.addEventListener('scroll', function () {
    const footer = document.querySelector('footer');
    const scrollPosition = window.innerHeight + window.scrollY;
    const bodyHeight = document.body.offsetHeight;

    // Tambahkan efek fade atau transform ketika mendekati footer
    if (scrollPosition >= bodyHeight - window.innerHeight * 0.2) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});

// Initialize AOS
AOS.init();

// Creators data (matching PHP script)
const creators = [
    { name: 'Aditya Nugraha Pratama Saiya', role: 'Designer' },
    { name: 'Andre Alputra', role: 'Developer' },
    { name: 'Ariasyah Ramadhan', role: 'Devloper' },
    { name: 'Wira Maulana', role: 'Developer' }
];

// Dynamically populate creators grid
const creatorsGrid = document.getElementById('creators-grid');

creators.forEach((creator, index) => {
    const creatorCard = document.createElement('div');
    creatorCard.className = 'bg-dark-background p-4 rounded-lg text-center';
    creatorCard.innerHTML = `
        <div class="mb-3">
            <i data-lucide="user" class="w-12 h-12 mx-auto text-neon-blue"></i>
        </div>
        <h4 class="font-semibold text-lg">${creator.name}</h4>
        <p class="text-gray-400">${creator.role}</p>
    `;

    // GSAP Animation for each creator card
    gsap.fromTo(creatorCard,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'power2.out'
        }
    );

    creatorsGrid.appendChild(creatorCard);
});

AOS.init();

// Assuming GSAP is included in your project
gsap.to(".search-form", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power4.out"
});

// GSAP Animasi
document.getElementById('search-button').addEventListener('click', function () {
    gsap.to(this, {
        scale: 1.2,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
            gsap.to(this, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
        }
    });
});

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('focus', () => {
    gsap.to(searchInput, { backgroundColor: "#3C3C3C", duration: 0.5 });
});
searchInput.addEventListener('blur', () => {
    gsap.to(searchInput, { backgroundColor: "#2C2C2C", duration: 0.5 });
});