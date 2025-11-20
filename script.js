window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        initApp();
    }, 1500);
});

function initApp() {
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax on Hamilton
    gsap.to("#character-wrapper", {
        scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 150 
    });

    // Liquid Reveal Logic
    const wrapper = document.getElementById('character-wrapper');
    const revealImg = document.querySelector('.reveal-img');
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        if (wrapper) {
            const rect = wrapper.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        }
    });

    function animateLiquid() {
        if (revealImg && wrapper) {
            currentX += (mouseX - currentX) * 0.08; 
            currentY += (mouseY - currentY) * 0.08;
            
            const rect = wrapper.getBoundingClientRect();
            if (rect.width > 0) {
                const xPct = (currentX / rect.width) * 100;
                const yPct = (currentY / rect.height) * 100;
                revealImg.style.setProperty('--x', `${xPct}%`);
                revealImg.style.setProperty('--y', `${yPct}%`);
            }
        }
        requestAnimationFrame(animateLiquid);
    }
    animateLiquid();
    
    const btn = document.querySelector('.book-btn');
    if(btn) {
        btn.addEventListener('click', () => {
            lenis.scrollTo('#gallery-section');
        });
    }

    // Horizontal Scroll Animation
    const rowsLeft = document.querySelectorAll('.row-left');
    const rowsRight = document.querySelectorAll('.row-right');
    const gallerySection = document.getElementById('gallery-section');

    // Animate background color transition from white to red
    gsap.fromTo(gallerySection, 
        { backgroundColor: '#ffffff' },
        {
            backgroundColor: '#1a0000',
            scrollTrigger: {
                trigger: gallerySection,
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
            }
        }
    );

    rowsLeft.forEach(row => {
        gsap.to(row, {
            x: -500,
            scrollTrigger: {
                trigger: '#gallery-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    });

    rowsRight.forEach(row => {
        gsap.to(row, {
            x: 500,
            scrollTrigger: {
                trigger: '#gallery-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    });
}