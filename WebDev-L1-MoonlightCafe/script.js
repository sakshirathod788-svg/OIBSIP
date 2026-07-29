window.onload = function () {
    alert("☕ Welcome to Moon Light Cafe! Enjoy our delicious coffee and food.");
};

/* ------------------------------------------------------------------
   Mobile nav toggle (fixed: elements now exist in HTML)
------------------------------------------------------------------ */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // close mobile menu after picking a link
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/* ------------------------------------------------------------------
   Dark mode toggle
------------------------------------------------------------------ */
const darkToggle = document.getElementById("dark-toggle");

function applyDarkMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (darkToggle) darkToggle.textContent = isDark ? "☀️" : "🌙";
}

if (darkToggle) {
    const savedPreference = localStorage.getItem("mlc-dark-mode") === "true";
    applyDarkMode(savedPreference);

    darkToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        applyDarkMode(isDark);
        localStorage.setItem("mlc-dark-mode", isDark);
    });
}

/* ------------------------------------------------------------------
   Scroll reveal animation
------------------------------------------------------------------ */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add("show"));
}

/* ------------------------------------------------------------------
   Scroll-spy: highlight active nav link
------------------------------------------------------------------ */
const spySections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

function updateActiveLink() {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    spySections.forEach((section) => {
        if (scrollPos >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navLinkEls.forEach((link) => {
        const href = link.getAttribute("href").replace("#", "");
        link.classList.toggle("active", href === currentId);
    });
}

if (spySections.length) {
    document.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
}

/* ------------------------------------------------------------------
   Menu filter (Coffee / Food / Desserts)
------------------------------------------------------------------ */
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-container .card");

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        menuCards.forEach((card) => {
            const match = filter === "all" || card.dataset.category === filter;
            card.classList.toggle("hidden", !match);
        });
    });
});

/* ------------------------------------------------------------------
   Testimonials slider
------------------------------------------------------------------ */
const track = document.getElementById("testimonial-track");
const dotsWrap = document.getElementById("testimonial-dots");

if (track && dotsWrap) {
    const slides = track.querySelectorAll(".testimonial-slide");
    let current = 0;
    let autoSlide;

    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => goToSlide(i));
        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll(".dot");

    function goToSlide(index) {
        current = index;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    function nextSlide() {
        goToSlide((current + 1) % slides.length);
    }

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    if (slides.length > 1) {
        startAutoSlide();
        track.addEventListener("mouseenter", stopAutoSlide);
        track.addEventListener("mouseleave", startAutoSlide);
    }
}

/* ------------------------------------------------------------------
   Back to top button
------------------------------------------------------------------ */
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    document.addEventListener(
        "scroll",
        () => {
            backToTop.classList.toggle("show", window.scrollY > 400);
        },
        { passive: true }
    );

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ------------------------------------------------------------------
   Reservation form validation + confirmation
------------------------------------------------------------------ */
const reservationForm = document.getElementById("reservation-form");
const reservationStatus = document.getElementById("reservation-status");

if (reservationForm) {
    const fieldValidators = {
        name: (value) => (value.trim().length >= 2 ? "" : "Please enter your full name."),
        phone: (value) => (/^\d{10}$/.test(value.trim()) ? "" : "Enter a valid 10-digit phone number."),
        date: (value) => {
            if (!value) return "Please choose a date.";
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return new Date(value) >= today ? "" : "Please choose a future date.";
        },
        time: (value) => (value ? "" : "Please choose a time."),
        guests: (value) => (value ? "" : "Please select the number of guests.")
    };

    function validateField(field) {
        const validator = fieldValidators[field.name];
        if (!validator) return true;

        const message = validator(field.value);
        const errorEl = document.getElementById(field.id + "-error");
        if (errorEl) errorEl.textContent = message;
        field.classList.toggle("invalid", message !== "");
        return message === "";
    }

    ["res-name", "res-phone", "res-date", "res-time", "res-guests"].forEach((id) => {
        const field = document.getElementById(id);
        if (!field) return;
        field.addEventListener("blur", () => validateField(field));
    });

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const fieldIds = ["res-name", "res-phone", "res-date", "res-time", "res-guests"];
        const fields = fieldIds.map((id) => document.getElementById(id));

        const allValid = fields.reduce((valid, field) => validateField(field) && valid, true);

        if (!allValid) {
            reservationStatus.style.color = "#c62828";
            reservationStatus.textContent = "Please fix the highlighted fields.";
            return;
        }

        const name = document.getElementById("res-name").value.trim();
        const date = document.getElementById("res-date").value;
        const time = document.getElementById("res-time").value;

        const submitBtn = reservationForm.querySelector(".form-submit");
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        reservationStatus.style.color = "#555";
        reservationStatus.textContent = "Sending your reservation...";

        const formData = new FormData(reservationForm);
        const payload = Object.fromEntries(formData);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(async (response) => {
                const result = await response.json();

                if (response.status === 200 && result.success) {
                    reservationStatus.style.color = "#2e7d32";
                    reservationStatus.textContent =
                        `Thank you, ${name}! Your table is requested for ${date} at ${time}. We'll confirm shortly by phone.`;
                    reservationForm.reset();
                    fields.forEach((field) => field.classList.remove("invalid"));
                } else {
                    throw new Error(result.message || "Something went wrong.");
                }
            })
            .catch(() => {
                reservationStatus.style.color = "#c62828";
                reservationStatus.textContent =
                    "Something went wrong sending your reservation. Please call us directly at +91 9876543210.";
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Confirm Reservation";
            });
    });
}