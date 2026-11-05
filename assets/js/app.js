
/* =========================================
   PHYSIOCARE CLINIC - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");

    if (!menuToggle || !mobileNav) return;

    function setMenuState(isOpen) {
        menuToggle.classList.toggle("active", isOpen);
        mobileNav.classList.toggle("open", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        mobileNav.inert = !isOpen;
    }

    // Open / close hamburger
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        setMenuState(!isOpen);
    });

    // Close when clicking navigation links
    mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    // Close when clicking outside
    document.addEventListener("click", event => {
        if (
            !menuToggle.contains(event.target) &&
            !mobileNav.contains(event.target)
        ) {
            setMenuState(false);
        }
    });

    // Close with Escape key
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            setMenuState(false);
            menuToggle.focus();
        }
    });

    // Reset when returning to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            setMenuState(false);
        }
    });

});




/* =========================================
   PHYSIOCARE CLINIC
   CONTACT FORM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById(
        "physiocare-contact-form"
    );

    const successMessage = document.getElementById(
        "form-success-message"
    );

    if (!contactForm || !successMessage) return;

    const phoneInput = document.getElementById("phone");

    // Hide previous success message when editing
    contactForm.addEventListener("input", () => {
        successMessage.hidden = true;
    });

    contactForm.addEventListener("change", () => {
        successMessage.hidden = true;
    });

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        // Normalize spaces and hyphens
        const normalizedPhone = phoneInput.value
            .replace(/[\s-]/g, "");

        // Accept 7 or 8 digits, optionally starting with 0
        const lebanesePhonePattern = /^0?\d{7,8}$/;

        if (!lebanesePhonePattern.test(normalizedPhone)) {

            phoneInput.setCustomValidity(
                "Please enter a valid Lebanese phone number."
            );

            phoneInput.reportValidity();
            return;
        }

        phoneInput.setCustomValidity("");

        // This is a frontend-only demonstration.
        // No email or server request is sent.

        contactForm.reset();

        successMessage.hidden = false;

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

    // Clear custom validation when user edits phone
    phoneInput.addEventListener("input", () => {
        phoneInput.setCustomValidity("");
    });

});





/* =========================================
   HOME PAGE - ANIMATED COUNTERS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const statsSection = document.querySelector(".home-stats");
    const statItems = document.querySelectorAll(".home-stat-item");
    const counters = document.querySelectorAll(".stat-counter");

    if (!statsSection || !counters.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let hasAnimated = false;

    function animateCounter(counter) {

        const target = Number(counter.dataset.target);
        const duration = 1800;

        if (!Number.isFinite(target)) return;

        if (reducedMotion) {
            counter.textContent = target.toLocaleString("en-US");
            return;
        }

        let startTime = null;

        function updateCounter(timestamp) {

            if (startTime === null) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            // Ease-out cubic
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue = Math.round(
                target * easedProgress
            );

            counter.textContent =
                currentValue.toLocaleString("en-US");

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent =
                    target.toLocaleString("en-US");
            }

        }

        requestAnimationFrame(updateCounter);
    }

    function startStatsAnimation() {

        if (hasAnimated) return;

        hasAnimated = true;

        statItems.forEach(item => {
            item.classList.add("stat-visible");
        });

        counters.forEach(counter => {
            animateCounter(counter);
        });
    }

    // Fallback for older browsers
    if (!("IntersectionObserver" in window)) {
        startStatsAnimation();
        return;
    }

    const statsObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    startStatsAnimation();
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    statsObserver.observe(statsSection);

});




/* =========================================
   WHY CHOOSE PHYSIOCARE
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const whySection = document.querySelector(".home-why");
    const whyCards = document.querySelectorAll(".home-why-card");

    if (!whySection || !whyCards.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        whyCards.forEach(card => {
            card.classList.add("why-visible");
        });
        return;
    }

    const whyObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    whyCards.forEach(card => {
                        card.classList.add("why-visible");
                    });

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    whyObserver.observe(whySection);

});



/* =========================================
   HOME PAGE - PATIENT REVIEWS ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reviewsSection = document.querySelector(".home-reviews");

    if (!reviewsSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    if (!("IntersectionObserver" in window)) {
        reviewsSection.classList.add("animate-reviews");
        return;
    }

    const reviewsObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    reviewsSection.classList.add("animate-reviews");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    reviewsObserver.observe(reviewsSection);

});




/* =========================================
   ABOUT US - OUR VISION
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const visionSection = document.querySelector(".about-vision");

    if (!visionSection) return;

    const visionElements = visionSection.querySelectorAll(
        ".about-vision-visual, .about-vision-content"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        return;
    }

    const visionObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    visionElements.forEach(element => {
                        element.classList.add("vision-visible");
                    });

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    visionObserver.observe(visionSection);

});




/* =========================================
   ABOUT US - WHAT WE TREAT
   SCROLL ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const treatSection = document.querySelector(".about-treat");

    if (!treatSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        treatSection.classList.add("is-visible");
        return;
    }

    const treatObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    treatSection.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    treatObserver.observe(treatSection);

});





/* =========================================
   ABOUT US - FAQ SECTION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const faqSection = document.querySelector(".about-faq");

    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll(
        ".about-faq-item"
    );

    /* =====================================
       ACCORDION - ONE OPEN AT A TIME
    ===================================== */

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach(otherItem => {

                if (otherItem !== item && otherItem.open) {
                    otherItem.open = false;
                }

            });

        });

    });

    /* =====================================
       SCROLL ENTRANCE ANIMATION
    ===================================== */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        faqSection.classList.add("faq-visible");
        return;
    }

    const faqObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    faqSection.classList.add("faq-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    faqObserver.observe(faqSection);

});



/* =========================================
   SERVICES - INTRODUCTION
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const introSection = document.querySelector(".services-intro");

    if (!introSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        introSection.classList.add("is-visible");
        return;
    }

    const introObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    introSection.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    introObserver.observe(introSection);

});




/* =========================================
   SERVICES - MUSCULOSKELETAL
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const musculoSection = document.querySelector(".services-musculo");

    if (!musculoSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        musculoSection.classList.add("is-visible");
        return;
    }

    const musculoObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    musculoSection.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    musculoObserver.observe(musculoSection);

});




/* =========================================
   SERVICES - SPORTS REHABILITATION
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sportsSection = document.querySelector(".services-sports");

    if (!sportsSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        sportsSection.classList.add("is-visible");
        return;
    }

    const sportsObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    sportsSection.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    sportsObserver.observe(sportsSection);

});



/* =========================================
   SERVICES - SHOCKWAVE THERAPY
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const shockwaveSection = document.querySelector(
        ".services-shockwave"
    );

    if (!shockwaveSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        shockwaveSection.classList.add("is-visible");
        return;
    }

    const shockwaveObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    shockwaveSection.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    shockwaveObserver.observe(shockwaveSection);

});




/* =========================================
   SERVICES - EMS TRAINING
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const emsSection = document.querySelector(".services-ems");

    if (!emsSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        emsSection.classList.add("is-visible");
        return;
    }

    const emsObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    emsSection.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    emsObserver.observe(emsSection);

});




/* =========================================
   SERVICES - REHAB & PERSONAL TRAINING
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const rehabSection = document.querySelector(".services-rehab");

    if (!rehabSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        rehabSection.classList.add("is-visible");
        return;
    }

    const rehabObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    rehabSection.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    rehabObserver.observe(rehabSection);

});



/* =========================================
   SERVICES - MEDICAL MASSAGE
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const massageSection = document.querySelector(
        ".services-massage"
    );

    if (!massageSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        massageSection.classList.add("is-visible");
        return;
    }

    const massageObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    massageSection.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    massageObserver.observe(massageSection);

});



/* =========================================
   ACL & KNEE REHABILITATION
   SCROLL ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const aclSection = document.querySelector(".services-acl");

    if (!aclSection) return;

    if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        aclSection.classList.add("is-visible");
        return;
    }

    const aclObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    aclObserver.observe(aclSection);
});



/* =========================================
   FOOTBALL INJURY REHABILITATION
   SCROLL ENTRANCE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const footballSection = document.querySelector(
        ".services-football"
    );

    if (!footballSection) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        footballSection.classList.add("is-visible");
        return;
    }

    const footballObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.08
        }
    );

    footballObserver.observe(footballSection);

});
