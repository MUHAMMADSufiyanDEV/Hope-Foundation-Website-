
        // Initialize Lucide icons
        lucide.createIcons();
        
        // Global Variables
        let currentLang = 'de';
        let selectedAmount = 0;
        let selectedFrequency = 'one-time';
        let selectedPayment = 'card';
        
        // Smooth scrolling
        function scrollTo(target) {
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString();
                    }
                }, 16);
            });
        }
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.querySelector('.counter')) {
                        animateCounters();
                    }
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Language Functions
        function toggleLanguageDropdown() {
            const dropdown = document.getElementById('languageDropdown');
            dropdown.classList.toggle('show');
        }
        
        function setLanguage(lang) {
            currentLang = lang;
            document.getElementById('currentLang').textContent = lang.toUpperCase();
            
            // Update content based on language
            const content = translations[lang];
            if (content) {
                document.querySelector('#home h1').textContent = content.heroTitle;
                document.querySelector('#home p').textContent = content.heroSubtitle;
            }
            
            // Close dropdown
            document.getElementById('languageDropdown').classList.remove('show');
            
            // Set document direction for Arabic
            if (lang === 'ar') {
                document.dir = 'rtl';
            } else {
                document.dir = 'ltr';
            }
        }
        
        // Mobile Menu
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }
        
        // Map Popup Functions
        function showMapPopup(pin, title, status, description) {
            const popup = document.getElementById('mapPopup');
            const rect = pin.getBoundingClientRect();
            
            document.getElementById('popupTitle').textContent = title;
            document.getElementById('popupDescription').textContent = description;
            
            const statusElement = document.getElementById('popupStatus');
            statusElement.textContent = status;
            statusElement.className = `inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getStatusClass(status)}`;
            
            popup.style.left = rect.left + 'px';
            popup.style.top = (rect.top - 150) + 'px';
            popup.classList.add('show');
        }
        
        function getStatusClass(status) {
            switch(status.toLowerCase()) {
                case 'urgent': return 'bg-red-100 text-red-800';
                case 'active': return 'bg-green-100 text-green-800';
                case 'completed': return 'bg-gray-100 text-gray-800';
                default: return 'bg-blue-100 text-blue-800';
            }
        }
        
        // Donation Modal Functions
        function openDonationModal(project = 'general') {
            document.getElementById('donationModal').classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Set project if specified
            if (project !== 'general') {
                document.querySelector('select[name="project"]').value = project;
            }
        }
        
        function closeDonationModal() {
            document.getElementById('donationModal').classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        
        function selectAmount(button, amount) {
            document.querySelectorAll('.amount-option').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
            selectedAmount = amount;
            document.getElementById('customAmount').value = amount;
            updateImpactText(amount);
        }
        
        function selectFrequency(button, frequency) {
            document.querySelectorAll('.amount-option').forEach(btn => {
                if (btn.textContent === 'One-Time' || btn.textContent === 'Monthly') {
                    btn.classList.remove('selected');
                }
            });
            button.classList.add('selected');
            selectedFrequency = frequency;
        }
        
        function selectPayment(button, method) {
            document.querySelectorAll('.payment-option').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
            selectedPayment = method;
            
            // Show/hide card details
            const cardDetails = document.getElementById('cardDetails');
            if (method === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        }
        
        function updateImpactText(amount) {
            const impacts = {
                25: "Sauberes Wasser für 5 Familien für eine Woche bereitstellen",
                50: "10 Kinder einen Monat lang mit Nahrung versorgen",
                100: "Schulmaterial für 20 Schüler bereitstellen",
                250: "Notfallmedizinische Versorgung für 5 Familien finanzieren",
                500: "Einen Wasserbrunnen bauen, der 100 Menschen versorgt",
                1000: "Eine Klasse für ein ganzes Jahr sponsern"
            };
            
            const impactText = document.getElementById('impactText');
            impactText.textContent = impacts[amount] || "provide direct aid to families in need";
        }
        
        // Project Modal Functions
        function openProjectModal(projectType) {
            const modal = document.getElementById('projectModal');
            const title = document.getElementById('projectModalTitle');
            const content = document.getElementById('projectModalContent');
            
            const projectData = {
                education: {
                    title: "Bildung für Alle",
                    content: `
                        <img src="https://assets.weforum.org/article/image/responsive_large_QzWxty3lUv2ITHZBG5TEyu0QTafPdnTFu1Nwq8f3M7A.jpg" alt="Students in a newly built classroom in Kenya studying with modern textbooks and educational materials under bright LED lighting" class="w-full rounded-lg mb-4">
                        <h3 class="text-xl font-bold mb-3">Bildungschancen schaffen</h3>
                        <p class="text-gray-600 mb-4">Unser Programm „Bildung für Alle“ konzentriert sich darauf, Kindern in unterversorgten Gemeinden hochwertige Bildung zu ermöglichen. Durch den Bau von Schulen, die Ausbildung von Lehrern und die Bereitstellung von Lernmaterialien durchbrechen wir den Kreislauf der Armut.</p>
                        <div class="grid md:grid-cols-2 gap-4 mb-4">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h4 class="font-bold text-blue-800 mb-2">Gebaute Schulen</h4>
                                <p class="text-2xl font-bold text-blue-600">47</p>
                            </div>
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h4 class="font-bold text-blue-800 mb-2">Eingeschulte Schüler</h4>
                                <p class="text-2xl font-bold text-blue-600">12,450</p>
                            </div>
                        </div>
                        <button onclick="openDonationModal('education')" class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">Bildung unterstützen</button>
                    `
                },
               water: {
                 title: "Initiative für Sauberes Wasser",
                 content: `
                 <img src="https://www.emirates247.com/polopoly_fs/1.727873.1699513445!/image/image.jpg" alt="Solarbetriebenes Wasseraufbereitungssystem in Betrieb in ländlichem Indien mit Dorfbewohnern, die sauberes Wasser sammeln, und Kindern, die in der Nähe spielen" class="w-full rounded-lg mb-4" />
                 <h3 class="text-xl font-bold mb-3">Bringing Sauberes Wasser in ländliche Gemeinden</h3>
                 <p class="text-gray-600 mb-4">Der Zugang zu sauberem Wasser ist ein grundlegendes Menschenrecht. Unsere Initiative für Sauberes Wasser installiert nachhaltige Wasseraufbereitungssysteme in abgelegenen Gebieten, wodurch wasserbedingte Krankheiten erheblich reduziert und die Lebensqualität verbessert wird.</p>
                 <div class="grid md:grid-cols-2 gap-4 mb-4">
                 <div class="bg-blue-50 p-4 rounded-lg">
                 <h4 class="font-bold text-blue-800 mb-2">Installierte Brunnen</h4>
                 <p class="text-2xl font-bold text-blue-600">156</p>
                 </div>
                 <div class="bg-blue-50 p-4 rounded-lg">
                 <h4 class="font-bold text-blue-800 mb-2">Versorgte Menschen</h4>
                 <p class="text-2xl font-bold text-blue-600">78.000</p>
                </div>
                </div>
                <button onclick="openDonationModal('water')" class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">Sauberes Wasser finanzieren</button>
                `
                },
                food: {
    title: "Notfallnahrungsmittelhilfe",
    content: `
        <img src="https://secl.org.au/wp-content/uploads/2022/09/Emergency-Relief-2.png" alt="Notfallverteilung von Lebensmitteln in Somalia, bei der Hilfskräfte Ernährungspakete an dankbare Familien unter Notunterkünften verteilen" class="w-full rounded-lg mb-4" />
        <h3 class="text-xl font-bold mb-3">Bekämpfung von Hunger in Krisengebieten</h3>
        <p class="text-gray-600 mb-4">In Notfallsituationen kann der sofortige Zugang zu Nahrungsmitteln den Unterschied zwischen Leben und Tod bedeuten. Unser Programm „Notfallnahrungsmittelhilfe“ liefert lebensrettende Nährstoffe an Familien, die von Naturkatastrophen, Konflikten und wirtschaftlichen Krisen betroffen sind.</p>
        <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div class="bg-red-50 p-4 rounded-lg">
                <h4 class="font-bold text-red-800 mb-2">Verteilte Mahlzeiten</h4>
                <p class="text-2xl font-bold text-red-600">2,3 Mio</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
                <h4 class="font-bold text-red-800 mb-2">Hilfefamilien</h4>
                <p class="text-2xl font-bold text-red-600">45.600</p>
            </div>
        </div>
        <button onclick="openDonationModal('food')" class="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700">Nahrungsmittelhilfe unterstützen</button>
    `
},
            };
            
            const data = projectData[projectType];
            if (data) {
                title.textContent = data.title;
                content.innerHTML = data.content;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }
        
        function closeProjectModal() {
            document.getElementById('projectModal').classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        
        // Form Handlers
        function handleDonationForm(e) {
            e.preventDefault();
            
            // Simulate payment processing
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i data-lucide="loader" class="w-5 h-5 inline mr-2 animate-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your donation! You will receive a confirmation email shortly.');
                closeDonationModal();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                e.target.reset();
            }, 2000);
        }
        
        function handleVolunteerForm(e) {
            e.preventDefault();
            alert('Thank you for your interest in volunteering! We will contact you within 48 hours.');
            e.target.reset();
        }
        
        function handleContactForm(e) {
            e.preventDefault();
            alert('Thank you for your message! We will respond within 24 hours.');
            e.target.reset();
        }
        
        function registerEvent(eventType) {
            alert(`Thank you for registering for the ${eventType}! You will receive confirmation details via email.`);
        }
        
        // Sticky Donation Banner
        function showStickyDonation() {
            const banner = document.getElementById('stickyDonation');
            banner.classList.add('show');
        }
        
        // Scroll Functions
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        function handleScroll() {
            const scrollBtn = document.getElementById('scrollToTop');
            const stickyBanner = document.getElementById('stickyDonation');
            
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
            
            if (window.scrollY > 1000) {
                stickyBanner.classList.add('show');
            } else {
                stickyBanner.classList.remove('show');
            }
        }
        
        // Cookie Functions
        function acceptCookies() {
            document.getElementById('cookieBanner').style.display = 'none';
            localStorage.setItem('cookiesAccepted', 'true');
        }
        
        function manageCookies() {
            alert('Cookie preferences panel would open here in a real implementation.');
        }
        
        // Close modals when clicking outside
        function handleModalClick(e) {
            if (e.target.classList.contains('modal')) {
                if (e.target.id === 'donationModal') {
                    closeDonationModal();
                } else if (e.target.id === 'projectModal') {
                    closeProjectModal();
                }
            }
        }
        
        // Initialize on DOM load
        document.addEventListener('DOMContentLoaded', function() {
            // Observe sections for animations
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
            
            // Add event listeners
            window.addEventListener('scroll', handleScroll);
            
            // Form event listeners
            document.getElementById('donationForm').addEventListener('submit', handleDonationForm);
            document.getElementById('volunteerForm').addEventListener('submit', handleVolunteerForm);
            document.getElementById('contactForm').addEventListener('submit', handleContactForm);
            
            // Modal click handlers
            document.getElementById('donationModal').addEventListener('click', handleModalClick);
            document.getElementById('projectModal').addEventListener('click', handleModalClick);
            
            // Close language dropdown when clicking outside
            document.addEventListener('click', function(e) {
                const dropdown = document.getElementById('languageDropdown');
                const button = dropdown.previousElementSibling;
                if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
            
            // Hide map popup when clicking elsewhere
            document.addEventListener('click', function(e) {
                const popup = document.getElementById('mapPopup');
                if (!e.target.closest('.map-pin') && !popup.contains(e.target)) {
                    popup.classList.remove('show');
                }
            });
            
            // Check cookie consent
            if (!localStorage.getItem('cookiesAccepted')) {
                document.getElementById('cookieBanner').style.display = 'block';
            } else {
                document.getElementById('cookieBanner').style.display = 'none';
            }
            
            // Custom amount input handler
            document.getElementById('customAmount').addEventListener('input', function(e) {
                const amount = parseInt(e.target.value);
                if (amount > 0) {
                    updateImpactText(amount);
                    // Remove selection from preset amounts
                    document.querySelectorAll('.amount-option').forEach(btn => {
                        if (btn.textContent.includes('$')) {
                            btn.classList.remove('selected');
                        }
                    });
                }
            });
            
            // Initialize counters animation when impact section is visible
            const impactSection = document.getElementById('impact');
            if (impactSection) {
                observer.observe(impactSection);
            }
            
            // Initialize Lucide icons for dynamically added content
            lucide.createIcons();
        });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeDonationModal();
                closeProjectModal();
                document.getElementById('languageDropdown').classList.remove('show');
                document.getElementById('mapPopup').classList.remove('show');
            }
        });