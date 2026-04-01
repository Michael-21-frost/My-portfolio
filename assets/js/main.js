(function() {
    "use strict";

    /**
     * Header toggle with auto-close on mobile link click
     */
    const headerToggleBtn = document.querySelector('.header-toggle');

    function headerToggle() {
        document.querySelector('#header').classList.toggle('header-show');
        headerToggleBtn.classList.toggle('bi-list');
        headerToggleBtn.classList.toggle('bi-x');
    }
    
    if (headerToggleBtn) {
        headerToggleBtn.addEventListener('click', headerToggle);
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
            if (document.querySelector('.header-show')) {
                headerToggle();
            }
        });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Scroll top button
     */
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

    /**
     * Animation on scroll function and init
     */
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

    /**
     * Init typed.js
     */
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

    /**
     * Initiate Pure Counter
     */
    if (typeof PureCounter !== 'undefined') {
        new PureCounter();
    }

    /**
     * Animate the skills items on reveal
     */
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

    /**
     * Initiate glightbox
     */
    if (typeof GLightbox !== 'undefined') {
        const glightbox = GLightbox({
            selector: '.glightbox'
        });
    }

    /**
     * Init isotope layout and filters for portfolio
     */
    function initPortfolioIsotope() {
        const portfolioSection = document.querySelector('#portfolio');
        if (!portfolioSection) return;

        const isotopeContainer = portfolioSection.querySelector('.portfolio-container');
        const filterButtons = portfolioSection.querySelectorAll('.portfolio-filters li');

        if (!isotopeContainer || !filterButtons.length) {
            console.log('Portfolio isotope: Missing elements');
            return;
        }

        // Check if Isotope and imagesLoaded are available
        if (typeof Isotope === 'undefined' || typeof imagesLoaded === 'undefined') {
            console.log('Isotope or imagesLoaded not available, using fallback filtering');
            initPortfolioFallback();
            return;
        }

        let initIsotope;
        imagesLoaded(isotopeContainer, function() {
            initIsotope = new Isotope(isotopeContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'masonry',
                filter: '*',
                transitionDuration: '0.6s',
                masonry: {
                    columnWidth: '.col-lg-6', // Ensure 2 columns on desktop
                    gutter: 30
                }
            });

            console.log('Portfolio Isotope initialized successfully');

            // Filter functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('filter-active'));
                    this.classList.add('filter-active');

                    const filterValue = this.getAttribute('data-filter');
                    initIsotope.arrange({ filter: filterValue });

                    // Mobile scroll functionality
                    if (window.innerWidth <= 991) {
                        setTimeout(() => {
                            const offsetTop = isotopeContainer.getBoundingClientRect().top + window.pageYOffset - 80;
                            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                        }, 400);
                    }

                    // Re-init AOS for new items
                    if (typeof aosInit === 'function') {
                        setTimeout(aosInit, 500);
                    }
                });
            });
        });
    }

    /**
     * Fallback portfolio filtering if Isotope is not available
     */
    function initPortfolioFallback() {
        const filterButtons = document.querySelectorAll('.portfolio-filters li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        console.log('Using fallback portfolio filtering');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('filter-active'));
                this.classList.add('filter-active');

                const filterValue = this.getAttribute('data-filter').replace('.', ''); // Remove '.' for fallback
                portfolioItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Mobile scroll functionality
                if (window.innerWidth <= 991) {
                    const portfolioSection = document.getElementById('portfolio');
                    if (portfolioSection) {
                        const cardsSection = portfolioSection.querySelector('.portfolio-container');
                        if (cardsSection) {
                            setTimeout(() => {
                                const offsetTop = cardsSection.getBoundingClientRect().top + window.pageYOffset - 80;
                                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                            }, 300);
                        }
                    }
                }
            });
        });
    }

    /**
     * Init swiper sliders
     */
    function initSwiper() {
        if (typeof Swiper !== 'undefined') {
            document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
                let config = JSON.parse(
                    swiperElement.querySelector(".swiper-config").innerHTML.trim()
                );

                if (swiperElement.classList.contains("swiper-tab")) {
                    new Swiper(swiperElement, config);
                } else {
                    new Swiper(swiperElement, config);
                }
            });
        }
    }

    /**
     * Correct scrolling position upon page load for URLs containing hash links
     */
    function initHashScroll() {
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
    }

    /**
     * Navmenu Scrollspy
     */
    function initNavmenuScrollspy() {
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
            });
        }
        
        window.addEventListener('load', navmenuScrollspy);
        document.addEventListener('scroll', navmenuScrollspy);
    }

    /**
     * Initialize everything when DOM is loaded
     */
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded - initializing all components');
        
        initPortfolioIsotope();
        initSwiper();
        initHashScroll();
        initNavmenuScrollspy();
    });

    /**
     * Initialize components that need window load
     */
    window.addEventListener('load', function() {
        aosInit();
        
        // Re-init portfolio if needed
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection && !portfolioSection.querySelector('.portfolio-item[style*="display: block"]')) {
            setTimeout(initPortfolioIsotope, 100);
        }
    });

})();