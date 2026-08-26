/* =========================================================
   GVOZDJARA JANKOVIC — main.js
   Sticky header state, mobile nav, scroll-reveal, form validation.
   No dependencies. Respects prefers-reduced-motion where relevant.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header background on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");

  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-locked");
  }
  function openNav() {
    if (!mobileNav) return;
    mobileNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-locked");
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    // Close nav automatically if viewport grows to desktop size
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960) closeNav();
    });
  }

  /* ---------- Scroll reveal (Intersection Observer) ---------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var status = form.querySelector(".form-status");

    function setError(field, message) {
      var wrap = field.closest(".field");
      var msg = wrap.querySelector(".error-msg");
      wrap.classList.add("has-error");
      if (msg) msg.textContent = message;
      field.setAttribute("aria-invalid", "true");
    }
    function clearError(field) {
      var wrap = field.closest(".field");
      wrap.classList.remove("has-error");
      field.removeAttribute("aria-invalid");
    }

    function validatePhone(value) {
      var digits = value.replace(/[^\d+]/g, "");
      return digits.length >= 6;
    }

    form.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        clearError(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var name = form.querySelector("#cf-name");
      var phone = form.querySelector("#cf-phone");
      var message = form.querySelector("#cf-message");

      if (!name.value.trim()) {
        setError(name, "Unesite ime i prezime.");
        valid = false;
      } else {
        clearError(name);
      }

      if (!phone.value.trim()) {
        setError(phone, "Unesite broj telefona.");
        valid = false;
      } else if (!validatePhone(phone.value)) {
        setError(phone, "Proverite da li je broj telefona ispravan.");
        valid = false;
      } else {
        clearError(phone);
      }

      if (!message.value.trim() || message.value.trim().length < 8) {
        setError(message, "Opišite ukratko šta vam je potrebno (bar par reči).");
        valid = false;
      } else {
        clearError(message);
      }

      if (!valid) {
        var firstError = form.querySelector(".has-error input, .has-error textarea");
        if (firstError) firstError.focus();
        if (status) status.classList.remove("is-success");
        return;
      }

      // No backend wired up — show a friendly local success state.
      if (status) {
        status.classList.add("is-success");
        status.focus && status.focus();
      }
      form.reset();
    });
  }
})();
