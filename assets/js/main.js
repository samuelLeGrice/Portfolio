AOS.init();
// You can also pass an optional settings object
// below listed default settings
AOS.init({
  
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 250, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 2000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    }, 1500); // 1 seconds delay

    createParticles();
});

// Close navbar on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).toggle();
    }
  });
});

// Change navbar background color on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    let opacity = 0.3;

    sections.forEach((section, index) => {
        if (window.scrollY >= section.offsetTop) {
            opacity = 0.3 + (index * 0.1);
        }
    });

    navbar.style.backgroundColor = `rgba(0, 0, 0, ${Math.min(opacity, 0.9)})`; // Cap opacity at 0.9
});

// Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = window.innerWidth <= 991 ? 60 : 80; // 40 particles on small devices, 80 on larger devices

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        const random = Math.random();
        if (random > 0.75) {
            particle.classList.add('dark-blue');
        } else if (random > 0.5) {
            particle.classList.add('light-blue');
        } else if (random > 0.25) {
            particle.classList.add('navbar-color');
        }
        particlesContainer.appendChild(particle);
    }

    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const dx = (particle.offsetLeft - e.clientX) / (Math.random() * 20 + 10);
            const dy = (particle.offsetTop - e.clientY) / (Math.random() * 20 + 10);
            particle.style.transform = `translate(${dx}px, ${dy}px)`;
        });
    });
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'emailtest/index.php', true);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText);
            const messageContainer = document.getElementById('messageContainer');
            const closeButton = document.createElement('button');
            closeButton.className = 'close-button';
            closeButton.innerHTML = '&times;';
            closeButton.onclick = () => messageContainer.style.display = 'none';

            messageContainer.innerHTML = ''; // Clear previous content
            messageContainer.appendChild(closeButton);

            if (response.status === 'success') {
                messageContainer.className = 'alert alert-success';
                messageContainer.appendChild(document.createTextNode(response.message + '!'));
                document.getElementById('contactForm').reset();
            } else {
                messageContainer.className = 'alert alert-error';
                messageContainer.appendChild(document.createTextNode(response.message));
            }
            messageContainer.style.display = 'block';

            // Hide the message after 10 seconds
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 10000);
        }
    };

    xhr.send(formData);
});


