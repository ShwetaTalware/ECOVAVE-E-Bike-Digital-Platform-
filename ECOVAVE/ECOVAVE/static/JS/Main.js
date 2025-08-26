document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle - Improved version
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

        // Close menu on nav link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Add scroll effect to navigation
    const nav = document.querySelector('.eco-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Carbon Calculator Functionality
    const carbonCalculator = document.getElementById('carbon-calculator');
    if (carbonCalculator) {
        const vehicleType = document.getElementById('vehicle-type');
        const dailyDistance = document.getElementById('daily-distance');
        const distanceValue = document.getElementById('distance-value');
        const ridingDays = document.getElementById('riding-days');
        const calculateBtn = document.getElementById('calculate-btn');
        const calculationResult = document.getElementById('calculation-result');
        const co2Saving = document.getElementById('co2-saving');
        const fuelSaving = document.getElementById('fuel-saving');
        const moneySaving = document.getElementById('money-saving');

        // Update distance value display when slider changes
        dailyDistance.addEventListener('input', () => {
            distanceValue.textContent = `${dailyDistance.value} km`;
        });

        // Calculate button click handler
        calculateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get input values
            const selectedVehicle = vehicleType.value;
            const distance = parseFloat(dailyDistance.value);
            const days = parseInt(ridingDays.value);
            
            // Calculate annual distance
            const annualDistance = distance * days * 52; // weeks in a year
            
            // Calculate savings based on vehicle type
            let co2, fuel, cost;
            
            switch(selectedVehicle) {
                case 'petrol-bike':
                    co2 = annualDistance * 0.12; // kg CO2 per km
                    fuel = annualDistance * 0.03; // liters per km (100-125cc bike)
                    cost = fuel * 110; // approximate fuel cost per liter
                    break;
                case 'diesel-bike':
                    co2 = annualDistance * 0.15;
                    fuel = annualDistance * 0.025;
                    cost = fuel * 100;
                    break;
                case 'petrol-car':
                    co2 = annualDistance * 0.2;
                    fuel = annualDistance * 0.1;
                    cost = fuel * 110;
                    break;
                case 'diesel-car':
                    co2 = annualDistance * 0.18;
                    fuel = annualDistance * 0.08;
                    cost = fuel * 100;
                    break;
                case 'none':
                    // For new riders, show potential savings compared to average bike
                    co2 = annualDistance * 0.12;
                    fuel = annualDistance * 0.03;
                    cost = fuel * 110;
                    break;
            }
            
            // Update results
            co2Saving.textContent = `${Math.round(co2)} kg/year`;
            fuelSaving.textContent = `${Math.round(fuel)} liters/year`;
            moneySaving.textContent = `₹${Math.round(cost)}/year`;
            
            // Show results with animation
            calculationResult.classList.add('show');
            
            // Animate result cards
            const resultCards = document.querySelectorAll('.result-card');
            resultCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value && emailInput.value.includes('@')) {
                // Here you would typically send the data to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Model card hover effect enhancement
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.model-image img').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.model-image img').style.transform = 'scale(1)';
        });
    });

    // Blog card hover effect enhancement
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.blog-image img').style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.blog-image img').style.transform = 'scale(1)';
        });
    });

    // Initialize animations when elements come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .model-card, .testimonial-card, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .model-card, .testimonial-card, .blog-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on load
    animateOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Model image zoom effect
    const mainImages = document.querySelectorAll('.main-image img');
    mainImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Test ride button functionality
    const testRideButtons = document.querySelectorAll('.test-ride-btn');
    testRideButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modelName = this.closest('.model-detail').querySelector('h2').textContent;
            
            // In a real implementation, this would open a booking form
            // For now, we'll just show a confirmation
            alert(`Thank you for your interest in the ${modelName}!\nOur team will contact you shortly to schedule your test ride.`);
            
            // Here you would typically track this conversion event
            console.log(`Test ride requested for ${modelName}`);
        });
    });

    // Brochure download functionality
    const brochureButtons = document.querySelectorAll('.brochure-btn');
    brochureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modelName = this.closest('.model-detail').querySelector('h2').textContent;
            
            // In a real implementation, this would download a PDF
            // For now, we'll simulate it with an alert
            alert(`The brochure for ${modelName} will be downloaded.\n(Simulated in this demo)`);
            
            // Here you would typically track this download event
            console.log(`Brochure downloaded for ${modelName}`);
        });
    });

    // Schedule test ride CTA button
    const scheduleTestRideBtn = document.querySelector('.test-ride-cta .cta-button');
    if (scheduleTestRideBtn) {
        scheduleTestRideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Redirecting to contact page to schedule your test ride...');
            window.location.href = 'contact.html';
        });
    }

    // Highlight current model in comparison table when scrolled to
    const modelSections = document.querySelectorAll('.model-detail');
    const comparisonRows = document.querySelectorAll('.comparison-table tbody tr');
    
    const highlightComparison = () => {
        const scrollPosition = window.scrollY + 150;
        
        modelSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                const modelId = section.id;
                
                // Remove all highlights first
                comparisonRows.forEach(row => {
                    row.classList.remove('highlight');
                });
                
                // Highlight corresponding row in comparison table
                if (modelId === 'standard') {
                    comparisonRows.forEach(row => {
                        row.querySelector('td:nth-child(2)').classList.add('highlight');
                    });
                } else if (modelId === 'magnetic') {
                    comparisonRows.forEach(row => {
                        row.querySelector('td:nth-child(3)').classList.add('highlight');
                    });
                } else if (modelId === 'warrior') {
                    comparisonRows.forEach(row => {
                        row.querySelector('td:nth-child(4)').classList.add('highlight');
                    });
                } else if (modelId === 'zanskar') {
                    comparisonRows.forEach(row => {
                        row.querySelector('td:nth-child(5)').classList.add('highlight');
                    });
                }
            }
        });
    };

    // Run on scroll and on load
    window.addEventListener('scroll', highlightComparison);
    highlightComparison();

    // Blog search functionality
    const blogSearch = document.getElementById('blog-search');
    const searchBtn = document.querySelector('.search-container button');
    
    if (blogSearch && searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = blogSearch.value.trim().toLowerCase();
            
            if (searchTerm) {
                searchArticles(searchTerm);
            } else {
                resetArticleDisplay();
            }
        });
        
        blogSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = blogSearch.value.trim().toLowerCase();
                
                if (searchTerm) {
                    searchArticles(searchTerm);
                } else {
                    resetArticleDisplay();
                }
            }
        });
    }

    function searchArticles(term) {
        const articles = document.querySelectorAll('.blog-article');
        let foundResults = false;
        
        articles.forEach(article => {
            const title = article.querySelector('h2').textContent.toLowerCase();
            const content = article.querySelector('.article-body').textContent.toLowerCase();
            
            if (title.includes(term) || content.includes(term)) {
                article.style.display = 'grid';
                foundResults = true;
            } else {
                article.style.display = 'none';
            }
        });
        
        if (!foundResults) {
            alert('No articles found matching your search. Try different keywords.');
        }
    }

    function resetArticleDisplay() {
        document.querySelectorAll('.blog-article').forEach(article => {
            article.style.display = 'grid';
        });
    }

    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterArticles(category);
        });
    });

    function filterArticles(category) {
        const articles = document.querySelectorAll('.blog-article');
        
        if (category === 'all') {
            articles.forEach(article => {
                article.style.display = 'grid';
            });
            return;
        }
        
        articles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            
            if (articleCategory === category) {
                article.style.display = 'grid';
            } else {
                article.style.display = 'none';
            }
        });
    }

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-answer').style.padding = '0 25px';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 25px 25px';
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 25px';
            }
        });
    });

    // FAQ Search Functionality
    const faqSearchInput = document.getElementById('faq-search-input');
    const faqSearchBtn = document.querySelector('.search-btn');
    
    if (faqSearchInput && faqSearchBtn) {
        faqSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = faqSearchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                searchFAQs(searchTerm);
            } else {
                resetFAQDisplay();
            }
        });
        
        faqSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = faqSearchInput.value.trim().toLowerCase();
                
                if (searchTerm) {
                    searchFAQs(searchTerm);
                } else {
                    resetFAQDisplay();
                }
            }
        });
    }

    function searchFAQs(term) {
        const questions = document.querySelectorAll('.faq-question h3');
        let foundResults = false;
        
        // Hide all FAQ sections first
        document.querySelectorAll('.faq-section').forEach(section => {
            section.style.display = 'none';
        });
        
        questions.forEach(question => {
            const questionText = question.textContent.toLowerCase();
            const answerText = question.parentElement.nextElementSibling.textContent.toLowerCase();
            const faqItem = question.closest('.faq-item');
            const faqSection = question.closest('.faq-section');
            
            if (questionText.includes(term) || answerText.includes(term)) {
                faqItem.style.display = 'block';
                faqSection.style.display = 'block';
                foundResults = true;
                
                // Expand matching items
                faqItem.classList.add('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 25px 25px';
            } else {
                faqItem.style.display = 'none';
            }
        });
        
        if (!foundResults) {
            alert('No FAQs found matching your search. Try different keywords.');
            resetFAQDisplay();
        }
    }

    function resetFAQDisplay() {
        document.querySelectorAll('.faq-section').forEach(section => {
            section.style.display = 'block';
        });
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.style.display = 'block';
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-answer').style.padding = '0 25px';
        });
    }

    // Video Play Button Functionality
    const promoVideo = document.getElementById('promoVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    
    if (promoVideo && videoOverlay && videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function() {
            promoVideo.play();
            videoOverlay.style.opacity = '0';
            videoOverlay.style.pointerEvents = 'none';
        });
        
        promoVideo.addEventListener('pause', function() {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
        });
        
        promoVideo.addEventListener('ended', function() {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Team Card Hover Effects
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.team-image img');
            if (img) img.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.team-image img');
            if (img) img.style.transform = 'scale(1)';
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const model = document.getElementById('model').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, you would send this data to your server
            console.log('Form submitted:', {
                name,
                email,
                phone,
                subject,
                model,
                message
            });
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Map tab functionality
    const mapTabs = document.querySelectorAll('.map-tab');
    const locationMap = document.getElementById('locationMap');
    
    mapTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            mapTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Change map based on location
            const location = this.getAttribute('data-location');
            updateMap(location);
        });
    });

    // Function to update map based on location
    function updateMap(location) {
        let mapUrl;
        
        if (location === 'registered') {
            mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.692790357015!2d73.729856315625!3d18.592895982635832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb13b7b3013d%3A0x5d6b0a8b9a8b5b1a!2sEON%20IT%20Park%2C%20Kharadi%2C%20Pune%2C%20Maharashtra%20411014!5e0!3m2!1sen!2sin!4v1624456789012!5m2!1sen!2sin';
        } else if (location === 'factory') {
            mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.356963342664!2d74.817315315644!3d20.28941808640491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0c0a1f0a1f0a%3A0x1f0a1f0a1f0a1f0a!2sNardana%20Growth%20Center%2C%20Phase%202%2C%20Bangale%20MIDC%20Area%2C%20NH-52%2C%20Nardana%2C%20Maharashtra%20425404!5e0!3m2!1sen!2sin!4v1624456789012!5m2!1sen!2sin';
        }
        
        if (locationMap) {
            locationMap.src = mapUrl;
        }
    }

    // View on Map links functionality
    const mapLinks = document.querySelectorAll('.map-link');
    
    mapLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const location = this.getAttribute('data-location');
            
            // Find corresponding map tab and click it
            const tabToClick = document.querySelector(`.map-tab[data-location="${location}"]`);
            if (tabToClick) {
                tabToClick.click();
                
                // Smooth scroll to map section
                const mapSection = document.querySelector('.map-section');
                if (mapSection) {
                    window.scrollTo({
                        top: mapSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // External link confirmation
    function handleExternalLink(event) {
        const isExternal = event.currentTarget.getAttribute('href').startsWith('http');
        if (isExternal) {
            const confirmed = confirm('You are about to leave our website. Are you sure you want to continue?');
            if (!confirmed) {
                event.preventDefault();
            }
        }
    }

    // Add event listeners to all social links
    const socialLinks = document.querySelectorAll('.social-links a[href^="http"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', handleExternalLink);
    });

    // Stat counter animation
    const statCards = document.querySelectorAll('.stat-card');
    const statsSection = document.querySelector('.about-hero');
    
    const animateStats = () => {
        if (!statsSection) return;
        
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;
        
        if (statsPosition < screenPosition) {
            statCards.forEach((card, index) => {
                setTimeout(() => {
                    const numberElement = card.querySelector('h3');
                    const targetNumber = parseInt(numberElement.textContent.replace('+', ''));
                    let currentNumber = 0;
                    const increment = targetNumber / 20;
                    
                    const counter = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            clearInterval(counter);
                            currentNumber = targetNumber;
                        }
                        numberElement.textContent = Math.floor(currentNumber) + (targetNumber > 1000 ? '+' : '');
                    }, 50);
                }, index * 200);
            });
            
            // Remove event listener after animation runs once
            window.removeEventListener('scroll', animateStats);
        }
    };
    
    // Initialize stat counter animation
    window.addEventListener('scroll', animateStats);
    animateStats(); // Run on load in case section is already visible
});