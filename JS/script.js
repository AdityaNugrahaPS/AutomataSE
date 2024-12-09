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

        // Memecah input menjadi kata-kata
        const words = inputValue.split(" ");
        const lastWord = words[words.length - 1].toLowerCase(); // Ambil kata terakhir

        // Filter saran berdasarkan kata pertama dari saran dan kata terakhir dari input
        const filteredSuggestions = staticSuggestions.filter((suggestion) => {
            const firstWord = suggestion.split(" ")[0].toLowerCase(); // Ambil kata pertama dari saran
            return firstWord.startsWith(lastWord); // Cek apakah kata pertama dimulai dengan kata terakhir yang diketik
        }).slice(0, 5); // Batasi hingga 5 saran

        if (filteredSuggestions.length > 0) {
            const suggestionList = document.createElement('ul');
            filteredSuggestions.forEach((suggestion, index) => {
                const li = document.createElement("li");
                li.textContent = suggestion;

                li.addEventListener("click", function () {
                    searchInput.value = suggestion;  // Set input ke saran yang dipilih
                    suggestionsBox.classList.add('hidden'); // Sembunyikan saran
                    selectedIndex = -1; // Reset selectedIndex
                });

                suggestionList.appendChild(li);
            });

            suggestionsBox.innerHTML = '';  // Clear previous suggestionsBox content
            suggestionsBox.appendChild(suggestionList);
            suggestionsBox.classList.remove('hidden'); // Tampilkan saran
        } else {
            suggestionsBox.classList.add('hidden'); // Sembunyikan saran jika tidak ada yang cocok
        }
    });

    // Keyboard navigation (ArrowDown, ArrowUp, Enter)
    searchInput.addEventListener("keydown", function (event) {
        const items = suggestionsBox.querySelectorAll('li');

        if (event.key === "ArrowDown") {
            // Pindah ke bawah dalam daftar
            if (selectedIndex < items.length - 1) {
                if (selectedIndex >= 0) {
                    items[selectedIndex].classList.remove("hover");
                }
                selectedIndex++;
                items[selectedIndex].classList.add("hover");
            }
            event.preventDefault();
        } else if (event.key === "ArrowUp") {
            // Pindah ke atas dalam daftar
            if (selectedIndex > 0) {
                items[selectedIndex].classList.remove("hover");
                selectedIndex--;
                items[selectedIndex].classList.add("hover");
            }
            event.preventDefault();
        } else if (event.key === "Enter") {
            // Pilih item saat ini (jika ada)
            if (selectedIndex >= 0 && selectedIndex < items.length) {
                searchInput.value = items[selectedIndex].textContent;
                suggestionsBox.classList.add('hidden');
                selectedIndex = -1;  // Reset selectedIndex
            } else {
                // Jika tidak ada saran yang dipilih, submit form
                document.querySelector("form").submit();
            }
            event.preventDefault();
        }
    });

    // Menutup saran ketika mengklik di luar input atau suggestions box
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