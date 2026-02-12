// Main interactive behaviors: language toggle, counters, smooth scroll
document.addEventListener('DOMContentLoaded', () => {
    // Language toggle: يبدل اتجاه الصفحة بين RTL و LTR
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const doc = document.documentElement;
            if (doc.lang === 'ar') {
                doc.lang = 'en';
                doc.dir = 'ltr';
                langToggle.textContent = 'العربية';
            } else {
                doc.lang = 'ar';
                doc.dir = 'rtl';
                langToggle.textContent = 'English';
            }
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const targetId = a.getAttribute('href').slice(1);
            if (!targetId) return;
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });

    // Counters animation when in viewport
    const counters = document.querySelectorAll('.counter');
    if ('IntersectionObserver' in window && counters.length) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = +el.getAttribute('data-target') || 0;
                    const duration = 1500;
                    const start = 0;
                    let startTime = null;

                    function step(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        el.textContent = Math.floor(progress * (target - start) + start).toLocaleString();
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    }
                    window.requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, {threshold: 0.5});
        counters.forEach(c => obs.observe(c));
    } else {
        // Fallback: set counters immediately
        counters.forEach(c => c.textContent = c.getAttribute('data-target'));
    }
});
