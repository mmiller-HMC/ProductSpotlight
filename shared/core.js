/* Homespire Product Spotlight — Navigation */
const totalSlides = slides.length;
        let currentSlideIndex = 0;


        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    currentSlideIndex = parseInt(entry.target.dataset.slide) - 1;
                    updateSlideCounter();
                }
            });
        }, observerOptions);

        slides.forEach(slide => observer.observe(slide));

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        function updateSlideCounter() {
            document.getElementById('currentSlide').textContent = currentSlideIndex + 1;
        }

        window.addEventListener('scroll', updateProgress);

        function nextSlide() {
            if (currentSlideIndex < totalSlides - 1) {
                currentSlideIndex++;
                slides[currentSlideIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }

        function previousSlide() {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                slides[currentSlideIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                previousSlide();
            }
        });

        // Disable swipe navigation on mobile to prevent jumping
        // Users can scroll naturally instead
        // Touch/Swipe Support for Mobile - DISABLED to prevent Android scroll jumping
        /*
        let touchStartY = 0;
        let touchEndY = 0;
        const minSwipeDistance = 50;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchStartY - touchEndY;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    // Swipe up - next slide
                    nextSlide();
                } else {
                    // Swipe down - previous slide
                    previousSlide();
                }
            }
        }
        */

        // Debounced resize handler for better performance
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateProgress();
            }, 250);
        }, { passive: true });

        // Prevent double-tap zoom on mobile
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Initial setup
        slides[0].classList.add('visible');
        updateProgress();

        // Preload images for better performance
        window.addEventListener('load', () => {
            const images = document.querySelectorAll('img[src]');
            images.forEach(img => {
                if (!img.complete) {
                    img.loading = 'lazy';
                }
            });
        });

        // Add loading='lazy' to all images for better performance
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    </script>

