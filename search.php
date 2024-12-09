        <?php
        // Minimal PHP setup kept for search functionality
        include 'mysql-connect.php';
        include 'header.php';

        ?>

        <!DOCTYPE html>
        <html lang="id">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AutomataSE - Pencarian</title>

            <!-- External Libraries -->
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
            <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
            <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

            <!-- Fonts -->
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">

            <!-- Custom CSS -->
            <link rel="stylesheet" href="CSS/styles.css">

            <!-- Smooth Scroll CSS -->
            <style>
                html {
                    scroll-behavior: smooth;
                }
            </style>
        </head>

        <body class="bg-dark-background text-gray-100 min-h-screen flex flex-col overflow-x-hidden">
            <div id="particles-js" style="position: fixed; width: 100%; height: 100%; z-index: -1;"></div>

            <!-- Main Content with Enhanced Animations -->
            <div class="content flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
                <!-- Animated Title Section (Modified) -->
                <h1 class="text-center mb-6 text-6xl font-extrabold animated-title text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 animate-pulse"
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    style="text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5);">
                    <div class="cssanimation leBlurIn sequence">
                        <span>AutomataSE</span>
                    </div>
                </h1>

                <!-- Search Container with Neon Glow -->
                <div class="bg-dark-surface p-10 rounded-2xl max-w-4xl mx-auto mb-8 w-full">
                    <!-- Search Form with Improved Interactivity -->
                    <?php
                    // Minimal PHP setup kept for search functionality
                    include 'mysql-connect.php';

                    $search = '';
                    $results = [];

                    if (isset($_GET['query'])) {
                        $search = $conn->real_escape_string($_GET['query']);
                        $sql = "SELECT * FROM search_db WHERE 
                        title LIKE '%$search%' OR 
                        content LIKE '%$search%'";
                        $result = $conn->query($sql);

                        if (!$result) {
                            die("Query error: " . $conn->error);
                        }

                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $results[] = $row;
                            }
                        }
                    }
                    ?>

                    <form action="search.php" method="GET" class="max-w-xl mx-auto w-full" data-aos="fade-up" data-aos-duration="800">
                        <div class="relative flex items-center">
                            <!-- Kotak input -->
                            <input type="text" name="query" autocomplete="off" value="<?php echo htmlspecialchars($search); ?>"
                                placeholder="Cari sesuatu..." required
                                class="search-input w-full pl-4 pr-12 py-3 bg-[#2C2C2C] border border-dark-border text-white rounded-full focus:ring-2 focus:ring-neon-blue outline-none transition-transform duration-500 ease-in-out hover:scale-105 focus:scale-110">
                            <div id="suggestions" class="suggestions hidden"></div>

                            <!-- Tombol ikon -->
                            <button type="submit" id="search-button"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full transition-all duration-500 ease-in-out hover:scale-110">
                                <img src="icon/search.svg" alt="Search Icon" class="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Display Search Results with Slide-In Animation -->
                <?php foreach ($results as $index => $row): ?>
                    <div class='result-card rounded-xl p-6 my-6 opacity-0 transform translate-y-10'
                        style='animation-delay: <?php echo $index * 0.1; ?>s' data-animate-card>
                        <h2 class='text-xl font-semibold mb-3'>
                            <a href='detail.php?id=<?php echo htmlspecialchars($row['id']); ?>'
                                class='text-neon-blue hover:text-neon-purple transition-colors duration-300'>
                                <?php echo htmlspecialchars($row['title']); ?>
                            </a>
                        </h2>

                        <!-- Media Display with Hover Effects -->
                        <div class='flex items-center space-x-4 my-4'>
                            <?php if (!empty($row['image_url'])): ?>
                                <img src='<?php echo htmlspecialchars($row['image_url']); ?>' alt='Image'
                                    class='max-w-[300px] h-auto rounded-lg shadow-neon-sm transition-transform duration-300 hover:scale-105'>
                            <?php endif; ?>

                            <?php if (!empty($row['video_url'])): ?>
                                <div class='relative'>
                                    <video controls class='max-w-[500px] h-auto rounded-lg shadow-neon-sm'>
                                        <source src='<?php echo htmlspecialchars($row['video_url']); ?>' type='video/mp4'>
                                        Video tidak dapat diputar.
                                    </video>
                                    <div class='absolute top-2 right-2 bg-black/50 rounded-full p-2'>
                                        <i data-lucide="video" class="text-white w-6 h-6"></i>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>

                        <p class='text-base text-gray-300 leading-relaxed'>
                            <?php
                            $content = htmlspecialchars($row['content']);
                            echo strlen($content) > 300 ? substr($content, 0, 300) . '...' : $content;
                            ?>
                        </p>
                    </div>
                <?php endforeach; ?>

            </div>

            <!-- Footer with Dynamic Content and Animations -->
            <footer class="bg-dark-surface text-white py-12 mt-auto relative z-10 flex items-center justify-center">
                <div id="footer-particles-js" class="absolute inset-0 z-[-1]"></div>
                <div class="container mx-auto px-4 text-center">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-start">
                        <!-- Team Section -->
                        <div data-aos="fade-right" data-aos-duration="1000" class="mx-auto">
                            <h3 class="text-2xl font-bold mb-6 text-neon-blue text-center">Our Team</h3>
                            <!-- Letakkan kode ini di dalam file search.php, gantikan bagian tampilan hasil pencarian sebelumnya -->
                            <div class="search-results-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
                                <?php foreach ($results as $index => $row): ?>
                                    <div class="result-card group relative bg-dark-surface rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                                        <!-- Kontainer Media -->
                                        <div class="media-container relative overflow-hidden">
                                            <?php if (!empty($row['image_url'])): ?>
                                                <img
                                                    src='<?php echo htmlspecialchars($row['image_url']); ?>'
                                                    alt='Image'
                                                    class='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
                                                    data-aos="zoom-in"
                                                    data-aos-delay="<?php echo $index * 100; ?>">
                                            <?php endif; ?>

                                            <?php if (!empty($row['video_url'])): ?>
                                                <div class="video-wrapper relative">
                                                    <video
                                                        controls
                                                        class='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
                                                        data-aos="zoom-in"
                                                        data-aos-delay="<?php echo $index * 100; ?>">
                                                        <source src='<?php echo htmlspecialchars($row['video_url']); ?>' type='video/mp4'>
                                                        Video tidak dapat diputar.
                                                    </video>
                                                    <div class="absolute top-4 right-4 bg-black/50 rounded-full p-2">
                                                        <i data-lucide="video" class="text-white w-6 h-6"></i>
                                                    </div>
                                                </div>
                                            <?php endif; ?>

                                            <!-- Overlay Informasi -->
                                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                <h2 class="text-white text-xl font-bold mb-2 truncate">
                                                    <?php echo htmlspecialchars($row['title']); ?>
                                                </h2>
                                            </div>
                                        </div>

                                        <!-- Konten Deskripsi -->
                                        <div class="p-4">
                                            <a href='detail.php?id=<?php echo htmlspecialchars($row['id']); ?>'
                                                class='block text-neon-blue hover:text-neon-purple transition-colors duration-300'>
                                                <h3 class="text-lg font-semibold mb-2 truncate">
                                                    <?php echo htmlspecialchars($row['title']); ?>
                                                </h3>
                                            </a>
                                            <p class='text-gray-300 text-sm leading-relaxed'>
                                                <?php
                                                $content = htmlspecialchars($row['content']);
                                                echo strlen($content) > 150 ? substr($content, 0, 150) . '...' : $content;
                                                ?>
                                            </p>
                                        </div>

                                        <!-- Quick Actions -->
                                        <div class="quick-actions absolute top-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button class="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/40 transition-colors">
                                                <i data-lucide="heart" class="text-white w-5 h-5"></i>
                                            </button>
                                            <button class="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/40 transition-colors">
                                                <i data-lucide="share-2" class="text-white w-5 h-5"></i>
                                            </button>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>

                        <!-- Contact Section -->
                        <div data-aos="fade-left" data-aos-duration="1000" class="mx-auto">
                            <h3 class="text-2xl font-bold mb-6 text-neon-purple text-center">Connect With Us</h3>
                            <div class="space-y-4 items-center">
                                <div class="flex items-center justify-center space-x-4">
                                    <i data-lucide="mail" class="text-neon-blue w-6 h-6"></i>
                                    <a href="mailto:contact@automatase.com" class="hover:text-neon-blue transition-colors">
                                        contact@automatase.com
                                    </a>
                                </div>
                                <div class="flex items-center justify-center space-x-4">
                                    <i data-lucide="phone" class="text-neon-blue w-6 h-6"></i>
                                    <span>+62 812-3456-7890</span>
                                </div>
                                <div class="flex space-x-4 mt-4 justify-center">
                                    <a href="#" class="social-icon hover:text-neon-blue transition-colors">
                                        <i data-lucide="linkedin" class="w-6 h-6"></i>
                                    </a>
                                    <a href="#" class="social-icon hover:text-neon-blue transition-colors">
                                        <i data-lucide="github" class="w-6 h-6"></i>
                                    </a>
                                    <a href="#" class="social-icon hover:text-neon-blue transition-colors">
                                        <i data-lucide="twitter" class="w-6 h-6"></i>
                                    </a>
                                    <a href="#" class="social-icon hover:text-neon-blue transition-colors">
                                        <i data-lucide="instagram" class="w-6 h-6"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Copyright Section -->
                    <div class="text-center mt-12 pt-6 border-t border-dark-border text-gray-400" data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom">
                        <p class="copyright-text">&copy; 2024 AutomataSE. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

            <script src="JS/script.js"></script>

        </body>

        </html>