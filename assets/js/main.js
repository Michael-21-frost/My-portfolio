(function() {
    "use strict";

    // Portfolio Filtering Functionality
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.portfolio-filters li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const portfolioContainer = document.querySelector('.portfolio-container');

        if (!filterButtons.length || !portfolioItems.length) return;

        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('filter-active'));
                
                // Add active class to clicked button
                this.classList.add('filter-active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        // Add animation class
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Mobile scroll functionality
                if (window.innerWidth <= 991) {
                    const portfolioSection = document.getElementById('portfolio');
                    if (portfolioSection) {
                        // Calculate the position to scroll to (cards section)
                        const cardsSection = portfolioSection.querySelector('.portfolio-container');
                        if (cardsSection) {
                            const offsetTop = cardsSection.getBoundingClientRect().top + window.pageYOffset - 80;
                            
                            setTimeout(() => {
                                window.scrollTo({
                                    top: offsetTop,
                                    behavior: 'smooth'
                                });
                            }, 300);
                        }
                    }
                }
            });
        });

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .portfolio-item {
                animation: fadeInUp 0.6s ease forwards;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initPortfolioFilter();
        
        // Your existing header toggle functionality
        const headerToggleBtn = document.querySelector('.header-toggle');
        if (headerToggleBtn) {
            function headerToggle() {
                document.querySelector('#header').classList.toggle('header-show');
                headerToggleBtn.classList.toggle('bi-list');
                headerToggleBtn.classList.toggle('bi-x');
            }
            headerToggleBtn.addEventListener('click', headerToggle);
        }

        // Hide mobile nav on same-page/hash links
        document.querySelectorAll('#navmenu a').forEach(navmenu => {
            navmenu.addEventListener('click', () => {
                if (document.querySelector('.header-show')) {
                    headerToggle();
                }
            });
        });

        // Toggle mobile nav dropdowns
        document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
            navmenu.addEventListener('click', function(e) {
                e.preventDefault();
                this.parentNode.classList.toggle('active');
                this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
                e.stopImmediatePropagation();
            });
        });

        // Preloader
        const preloader = document.querySelector('#preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.remove();
            });
        }

        // Scroll top button
        let scrollTop = document.querySelector('.scroll-top');
        if (scrollTop) {
            function toggleScrollTop() {
                if (scrollTop) {
                    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
                }
            }
            scrollTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            window.addEventListener('load', toggleScrollTop);
            document.addEventListener('scroll', toggleScrollTop);
        }

        // Animation on scroll function and init
        function aosInit() {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 600,
                    easing: 'ease-in-out',
                    once: true,
                    mirror: false
                });
            }
        }
        window.addEventListener('load', aosInit);

        // Init typed.js
        const selectTyped = document.querySelector('.typed');
        if (selectTyped && typeof Typed !== 'undefined') {
            let typed_strings = selectTyped.getAttribute('data-typed-items');
            typed_strings = typed_strings.split(',');
            new Typed('.typed', {
                strings: typed_strings,
                loop: true,
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000
            });
        }

        // Initiate Pure Counter
        if (typeof PureCounter !== 'undefined') {
            new PureCounter();
        }

        // Animate the skills items on reveal
        let skillsAnimation = document.querySelectorAll('.skills-animation');
        if (typeof Waypoint !== 'undefined') {
            skillsAnimation.forEach((item) => {
                new Waypoint({
                    element: item,
                    offset: '80%',
                    handler: function(direction) {
                        let progress = item.querySelectorAll('.progress .progress-bar');
                        progress.forEach(el => {
                            el.style.width = el.getAttribute('aria-valuenow') + '%';
                        });
                    }
                });
            });
        }

        // Initiate glightbox
        if (typeof GLightbox !== 'undefined') {
            const glightbox = GLightbox({
                selector: '.glightbox'
            });
        }

        // Init isotope layout and filters
        if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
            document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
                let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
                let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
                let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

                let initIsotope;
                imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
                    initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
                        itemSelector: '.isotope-item',
                        layoutMode: layout,
                        filter: filter,
                        sortBy: sort
                    });
                });

                isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
                    filters.addEventListener('click', function() {
                        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
                        this.classList.add('filter-active');
                        initIsotope.arrange({
                            filter: this.getAttribute('data-filter')
                        });
                        if (typeof aosInit === 'function') {
                            aosInit();
                        }
                    }, false);
                });
            });
        }

        // Init swiper sliders
        function initSwiper() {
            if (typeof Swiper !== 'undefined') {
                document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
                    let config = JSON.parse(
                        swiperElement.querySelector(".swiper-config").innerHTML.trim()
                    );

                    if (swiperElement.classList.contains("swiper-tab")) {
                        // Custom pagination function if needed
                        new Swiper(swiperElement, config);
                    } else {
                        new Swiper(swiperElement, config);
                    }
                });
            }
        }

        window.addEventListener("load", initSwiper);

        // Correct scrolling position upon page load for URLs containing hash links
        window.addEventListener('load', function(e) {
            if (window.location.hash) {
                if (document.querySelector(window.location.hash)) {
                    setTimeout(() => {
                        let section = document.querySelector(window.location.hash);
                        let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                        window.scrollTo({
                            top: section.offsetTop - parseInt(scrollMarginTop),
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        });

        // Navmenu Scrollspy
        let navmenulinks = document.querySelectorAll('.navmenu a');
        function navmenuScrollspy() {
            navmenulinks.forEach(navmenulink => {
                if (!navmenulink.hash) return;
                let section = document.querySelector(navmenulink.hash);
                if (!section) return;
                let position = window.scrollY + 200;
                if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                    document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
                    navmenulink.classList.add('active');
                } else {
                    navmenulink.classList.remove('active');
                }
            })
        }
        window.addEventListener('load', navmenuScrollspy);
        document.addEventListener('scroll', navmenuScrollspy);
    });

})();