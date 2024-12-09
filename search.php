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
        <div id="particles-js" class="fixed inset-0 z-[-1]"></div>

        <!-- Main Content with Enhanced Animations -->
        <div class="content flex-grow container mx-auto px-4 py-12 animate-fade-in mb-24 md:mb-40">
            <!-- Search Container with Neon Glow -->
            <div class="bg-dark-surface p-10 rounded-2xl max-w-4xl mx-auto mb-8">
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

                <form action="search.php" method="GET" class="max-w-xl mx-auto mt-40" data-aos="fade-up" data-aos-duration="800">
                    <div class="relative flex items-center">
                        <!-- Kotak input -->
                        <input type="text" name="query" autocomplete="off" value="<?php echo htmlspecialchars($search); ?>"
                            placeholder="Cari sesuatu..." required
                            class="search-input w-full pl-4 pr-12 py-3 bg-[#2C2C2C] border border-dark-border text-white rounded-xl focus:ring-2 focus:ring-neon-blue outline-none transition-transform duration-500 ease-in-out hover:scale-105 focus:scale-110">
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
                        <div class="grid grid-cols-2 gap-4 justify-center">
                            <?php foreach ($creators as $index => $creator): ?>
                                <div class="creator-card bg-dark-background p-4 rounded-lg text-center" data-aos="fade-up"
                                    data-aos-delay="<?php echo $index * 100; ?>">
                                    <div class="mb-3">
                                        <i data-lucide="user-circle" class="w-12 h-12 mx-auto text-neon-blue"></i>
                                    </div>
                                    <h4 class="font-semibold text-lg"><?php echo htmlspecialchars($creator['name']); ?></h4>
                                    <p class="text-gray-400"><?php echo htmlspecialchars($creator['role']); ?></p>
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