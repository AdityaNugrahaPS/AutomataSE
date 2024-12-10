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

// ==============================================================================================
// ==============================================================================================
// ======================= SEARCH SUGGESTIONS FUNCTIONALITY START ===============================
// ==============================================================================================
// ==============================================================================================

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[name="query"]');
    const suggestionsBox = document.getElementById('suggestions');
    const staticSuggestions = [
        "Aaron Ramsdale Usai Ditahan Liverpool: Satu Angka Lebih Baik Daripada Tidak",
        "Abaikan China, Tetangga RI dan AS Latihan Militer Besar di LCS",
        "Abaikan Saran PKS Gelar Salat Id di JIS Seperti Era Anies, Heru Budi: Karyawan Maunya di Balai Kota",
        "Abaikan Surat Kapolri, Firli Tetap Copot Direktur Penyelidikan Brigjen Endar ",
        "Abaikan Surat Kapolri, Firli Tolak Perpanjangan Tugas Endar Priantoro",
        "Abaikan Surat Kapolri, KPK Akui Tak Minta Jabatan Brigjen Endar Diperpanjang",
        "Abaikan Surat Kapolri, KPK Tetap Berhentikan Endar Priantoro",
        "Abaikan Surat Kapolri, KPK Tunjuk Jaksa Ronald Jadi Plt Direktur Penyelidikan Gantikan Brigjen Endar",
        "Abdus Salam: Jenius Ahmadiyah Peraih Nobel Fisika yang Dikubur Sejarah"
    ];

    let selectedIndex = -1; // Index untuk navigasi keyboard

    searchInput.addEventListener("input", function () {
        const inputValue = this.value.trim();
        suggestionsBox.innerHTML = ''; // Clear previous suggestions

        if (!inputValue) {
            suggestionsBox.classList.add('hidden');
            return;
        }

        const words = inputValue.split(" ");
        const lastWord = words[words.length - 1].toLowerCase(); // Ambil kata terakhir

        if (words.length > 1) { // Jika input terdiri dari lebih dari satu kata
            // Tampilkan saran yang cocok dengan seluruh input
            const filteredSuggestions = staticSuggestions.filter(suggestion =>
                suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
            ).slice(0, 5);

            if (filteredSuggestions.length > 0) {
                const suggestionList = document.createElement('ul');
                filteredSuggestions.forEach((suggestion, index) => {
                    const li = document.createElement("li");
                    li.textContent = suggestion;

                    li.addEventListener("click", function () {
                        searchInput.value = suggestion + " "; // Tambahkan spasi
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
        } else if (lastWord) { // Jika hanya satu kata
            // Tampilkan kata awal unik
            const uniqueWords = Array.from(new Set(staticSuggestions.map(s => s.split(" ")[0].toLowerCase())));
            const filteredWords = uniqueWords.filter(word => word.startsWith(lastWord)).slice(0, 5);

            if (filteredWords.length > 0) {
                const suggestionList = document.createElement('ul');
                filteredWords.forEach((word, index) => {
                    const li = document.createElement("li");
                    li.textContent = word.charAt(0).toUpperCase() + word.slice(1);

                    li.addEventListener("click", function () {
                        searchInput.value = word + " "; // Tambahkan spasi
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
        } else {
            suggestionsBox.classList.add('hidden');
        }
    });

    searchInput.addEventListener("keydown", function (event) {
        const inputValue = this.value.trim();
        const items = suggestionsBox.querySelectorAll('li');

        if (event.key === " ") { // Ketika spasi ditekan
            const words = inputValue.split(" ");
            const lastWord = words[words.length - 1].toLowerCase();

            if (lastWord) {
                // Cari saran yang dimulai dengan kata terakhir
                const filteredSentences = staticSuggestions.filter(s => s.toLowerCase().startsWith(lastWord)).slice(0, 5);

                if (filteredSentences.length > 0) {
                    const suggestionList = document.createElement('ul');
                    filteredSentences.forEach((sentence, index) => {
                        const li = document.createElement("li");
                        li.textContent = sentence;

                        li.addEventListener("click", function () {
                            searchInput.value = sentence; // Set input ke saran yang dipilih
                            suggestionsBox.classList.add('hidden');
                            selectedIndex = -1;
                        });

                        suggestionList.appendChild(li);
                    });

                    suggestionsBox.innerHTML = '';
                    suggestionsBox.appendChild(suggestionList);
                    suggestionsBox.classList.remove('hidden');
                }
            }

            // Tambahkan spasi secara otomatis di akhir input saat menekan spasi
            searchInput.value = inputValue + " ";
            event.preventDefault();
        }



        else if (event.key === "ArrowDown") { // Navigasi ke bawah
            if (items.length > 0) {
                if (selectedIndex < items.length - 1) {
                    if (selectedIndex >= 0) {
                        items[selectedIndex].classList.remove("hover");
                    }
                    selectedIndex++;
                    items[selectedIndex].classList.add("hover");
                    items[selectedIndex].scrollIntoView({ block: "nearest" });
                }
            }
            event.preventDefault();
        } else if (event.key === "ArrowUp") { // Navigasi ke atas
            if (items.length > 0) {
                if (selectedIndex > 0) {
                    items[selectedIndex].classList.remove("hover");
                    selectedIndex--;
                    items[selectedIndex].classList.add("hover");
                    items[selectedIndex].scrollIntoView({ block: "nearest" });
                }
            }
            event.preventDefault();
        } else if (event.key === "Enter") { // Pilih item yang disorot atau lakukan pencarian
            if (selectedIndex >= 0 && selectedIndex < items.length) {
                searchInput.value = items[selectedIndex].textContent; // Salin teks saran ke input
                suggestionsBox.classList.add('hidden');
                selectedIndex = -1; // Reset indeks setelah memilih
            } else {
                // Jika kursor tidak di daftar saran, submit form
                document.querySelector("form").submit();
            }
            event.preventDefault();
        }
    });

    // Menutup saran saat mengklik di luar elemen input atau suggestions box
    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.classList.add('hidden');
        }
    });



});





// ==============================================================================================
// ==============================================================================================
// ======================= SEARCH SUGGESTIONS FUNCTIONALITY END =================================
// ==============================================================================================
// ==============================================================================================

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
    { name: 'Ariasyah Ramadhan', role: 'Developer' },
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

document.addEventListener('DOMContentLoaded', function () {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 120,  // Jumlah partikel
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'  // Warna partikel putih
            },
            shape: {
                type: 'circle',  // Bentuk partikel
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'  // Efek saat hover
                },
                onclick: {
                    enable: true,
                    mode: 'push'  // Efek saat diklik
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true  // Dukungan layar retina
    });
});

AOS.init({
    duration: 800,
    once: true
});

