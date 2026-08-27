/* =========================================================
   Divi SAFETY NETS
   SPRINT 1 — UPDATED JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.getElementById("siteHeader");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileMenuClose =
        document.getElementById("mobileMenuClose");

    const backToTop =
        document.getElementById("backToTop");

    /* =====================================================
       HEADER SCROLL
    ====================================================== */

    function updateHeader() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 15);
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function closeMobileMenu() {

        if (!mobileMenu || !mobileMenuButton) return;

        mobileMenu.classList.remove("open");
        mobileMenuButton.classList.remove("open");
        mobileMenuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }
    if (mobileMenuClose) {

        mobileMenuClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }

    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            mobileMenuButton.classList.toggle(
                "open",
                isOpen
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });

    }


    /* =====================================================
       MOBILE ACCORDIONS
    ====================================================== */

    document.querySelectorAll(".mobile-accordion").forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.toggle("open");

            const submenu = button.nextElementSibling;

            if (submenu) {
                submenu.classList.toggle("open");
            }
        });

    });


    /* =====================================================
       CLOSE MENU AFTER LINK
    ====================================================== */

    document.querySelectorAll(".mobile-menu a").forEach((link) => {

        link.addEventListener("click", closeMobileMenu);

    });


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

        backToTop.classList.toggle("show", window.scrollY > 500);
    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
      HERO SLIDER
      5 SCREENS — SMOOTH AUTOPLAY
   ===================================================== */

    const slides = [...document.querySelectorAll(".hero-slide")];
    const dots = [...document.querySelectorAll(".hero-dot")];

    const nextButton = document.querySelector(".hero-next");
    const prevButton = document.querySelector(".hero-prev");

    const currentCounter =
        document.getElementById("heroCurrent");

    let currentSlide = 0;
    let autoplayTimer = null;

    const AUTOPLAY_DELAY = 5500;


    /* =====================================================
       UPDATE COUNTER
    ===================================================== */

    function updateCounter() {

        if (!currentCounter) return;

        currentCounter.textContent =
            String(currentSlide + 1).padStart(2, "0");

    }


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showSlide(index) {

        if (!slides.length) return;

        currentSlide =
            (index + slides.length) % slides.length;


        /* Remove active state */

        slides.forEach((slide) => {

            slide.classList.remove("active");

        });


        /* Activate current slide */

        const activeSlide =
            slides[currentSlide];

        activeSlide.classList.add("active");


        /* Update dots */

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });


        /* Update counter */

        updateCounter();

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    /* =====================================================
       AUTOPLAY
    ===================================================== */

    function startAutoplay() {

        stopAutoplay();

        autoplayTimer = setInterval(() => {

            nextSlide();

        }, AUTOPLAY_DELAY);

    }


    /* =====================================================
       STOP AUTOPLAY
    ===================================================== */

    function stopAutoplay() {

        if (autoplayTimer !== null) {

            clearInterval(autoplayTimer);

            autoplayTimer = null;

        }

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            nextSlide();

            startAutoplay();

        });

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (prevButton) {

        prevButton.addEventListener("click", () => {

            previousSlide();

            startAutoplay();

        });

    }


    /* =====================================================
       DOTS
    ===================================================== */

    dots.forEach((dot) => {

        dot.addEventListener("click", () => {

            const slideIndex =
                Number(dot.dataset.slide);

            showSlide(slideIndex);

            startAutoplay();

        });

    });


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            nextSlide();

            startAutoplay();

        }


        if (event.key === "ArrowLeft") {

            previousSlide();

            startAutoplay();

        }

    });


    /* =====================================================
       MOBILE SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    const hero =
        document.querySelector(".hero");


    if (hero) {

        hero.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;


                const distance =
                    touchEndX - touchStartX;


                if (Math.abs(distance) < 50) {

                    return;

                }


                if (distance < 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }


                startAutoplay();

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    /*
       Slide 1 appears immediately.
    */

    showSlide(0);


    /*
       Start autoplay immediately.
    */

    startAutoplay();


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
    ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1180) {
            closeMobileMenu();
        }

    });

    /* =====================================================
       PREMIUM SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.10,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }

});

/* =========================================================
   HERO OFFER COUNTDOWN
   ONE 60-MINUTE TIMER FOR ALL 5 HERO SLIDES
========================================================= */

const heroHours =
    document.querySelectorAll(".hero-hours");

const heroMinutes =
    document.querySelectorAll(".hero-minutes");

const heroSeconds =
    document.querySelectorAll(".hero-seconds");


/* ---------------------------------------------------------
   SETTINGS
--------------------------------------------------------- */

const OFFER_DURATION =
    60 * 60 * 1000;

const OFFER_STORAGE_KEY =
    "DiviSafetyOfferDeadline";


/* ---------------------------------------------------------
   GET SAVED DEADLINE
--------------------------------------------------------- */

function getOfferDeadline() {

    let storedDeadline =
        localStorage.getItem(
            OFFER_STORAGE_KEY
        );

    let deadline =
        Number(storedDeadline);


    /*
       If there is no valid saved deadline,
       create a new 60-minute countdown.
    */

    if (
        !storedDeadline ||
        !Number.isFinite(deadline)
    ) {

        deadline =
            Date.now() +
            OFFER_DURATION;

        localStorage.setItem(
            OFFER_STORAGE_KEY,
            String(deadline)
        );

    }


    return deadline;

}


let offerDeadline =
    getOfferDeadline();


/* ---------------------------------------------------------
   UPDATE ALL 5 COUNTDOWNS
--------------------------------------------------------- */

function updateHeroOfferCountdown() {

    let remaining =
        offerDeadline -
        Date.now();


    /* ---------------------------------------------
       WHEN TIMER REACHES ZERO

       Restart another 60-minute cycle.
    --------------------------------------------- */

    if (remaining <= 0) {

        offerDeadline =
            Date.now() +
            OFFER_DURATION;

        localStorage.setItem(
            OFFER_STORAGE_KEY,
            String(offerDeadline)
        );

        remaining =
            offerDeadline -
            Date.now();

    }


    const totalSeconds =
        Math.floor(
            remaining / 1000
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    const formattedHours =
        String(hours).padStart(2, "0");


    const formattedMinutes =
        String(minutes).padStart(2, "0");


    const formattedSeconds =
        String(seconds).padStart(2, "0");


    /* ---------------------------------------------
       UPDATE EVERY HERO SLIDE
    --------------------------------------------- */

    heroHours.forEach((element) => {

        element.textContent =
            formattedHours;

    });


    heroMinutes.forEach((element) => {

        element.textContent =
            formattedMinutes;

    });


    heroSeconds.forEach((element) => {

        element.textContent =
            formattedSeconds;

    });

}


/* ---------------------------------------------------------
   RUN IMMEDIATELY
--------------------------------------------------------- */

updateHeroOfferCountdown();


/* ---------------------------------------------------------
   UPDATE EVERY SECOND
--------------------------------------------------------- */

setInterval(
    updateHeroOfferCountdown,
    1000
);
/* =====================================================
   FAQ ACCORDION
===================================================== */

document.querySelectorAll(".faq-question").forEach((button) => {

    button.addEventListener("click", () => {

        const currentItem =
            button.closest(".faq-item");

        if (!currentItem) return;


        const isCurrentlyOpen =
            currentItem.classList.contains("active");


        /* Close all FAQ items */

        document
            .querySelectorAll(".faq-item")
            .forEach((item) => {

                item.classList.remove("active");

                const question =
                    item.querySelector(".faq-question");

                if (question) {

                    question.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


        /* Open clicked item */

        if (!isCurrentlyOpen) {

            currentItem.classList.add("active");

            button.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});
/* =========================================================
   CONTACT FORM → WHATSAPP
========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const phone =
            document.getElementById("contactPhone").value.trim();

        const service =
            document.getElementById("contactService").value;

        const message =
            document.getElementById("contactMessage").value.trim();


        const whatsappMessage =
            `Hello Divi Safety Nets,

I would like to enquire about your safety services.

Name: ${name}
Phone: ${phone}
Service: ${service}
Message: ${message || "No additional message"}

Please contact me regarding my requirement.`;

        const whatsappURL =
            "https://wa.me/917995905335?text=Hi+Divi+Safety+Nets%2C+I%27m+interested+in+your+safety+net+services+in+Bangalore.+Please+share+the+details+and+quotation.&utm_source=chatgpt.com?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}
/* =========================================================
   CONTACT FORM → WHATSAPP
   Divi SAFETY NETS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm =
        document.getElementById("contactForm");


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document
                .getElementById("contactName")
                .value
                .trim();


        const phone =
            document
                .getElementById("contactPhone")
                .value
                .trim();


        const service =
            document
                .getElementById("contactService")
                .value
                .trim();


        const message =
            document
                .getElementById("contactMessage")
                .value
                .trim();


        if (!name || !phone || !service) {

            return;

        }


        const whatsappMessage =
`Hello Divi Safety Nets,

I would like to enquire about your safety services.

Name: ${name}
Phone: ${phone}
Service: ${service}
Message: ${message || "No additional message"}

I am looking for a safety solution in Bangalore.

Please contact me regarding my requirement.`;


        const whatsappURL =
            "https://wa.me/917995905335?text=Hi+Divi+Safety+Nets%2C+I%27m+interested+in+your+safety+net+services+in+Bangalore.+Please+share+the+details+and+quotation.&utm_source=chatgpt.com?text=" +
            encodeURIComponent(
                whatsappMessage
            );


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});