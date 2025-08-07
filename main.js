console.log("✅ JS file is loaded.");
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("services").value;
    const message = document.getElementById("message").value.trim();
    console.log("Selected service value:", service);

    if (!service) {
      alert("⚠️ Please select a service before submitting the form.");
      return;
    }

    const subject = encodeURIComponent(`New Service Request: ${service}`);
    const body = encodeURIComponent(
      `Service: ${service}\n\n \n${message}\n\nName: ${name}\nEmail: ${email}`
    );

    window.location.href = `mailto:hello@aarohitavigyan.com?subject=${subject}&body=${body}`;
  });
});
