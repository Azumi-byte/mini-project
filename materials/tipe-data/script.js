const switchButton = document.querySelector('.switch-theme');
switchButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.addEventListener('DOMContentLoaded', function() {
    const animation = document.querySelectorAll('.animated');

    const checkVisibility = () => {
        animation.forEach(animated => {
            const animatedTop = animated.getBoundingClientRect().top; //digunakan untuk mendapatkan posisi elemen relatif terhadap viewport.
            const animatedBottom = animated.getBoundingClientRect().bottom;

            if (animatedTop < window.innerHeight && animatedBottom > 0) {
                animated.classList.add('visible');
            }
            else {
                animated.classList.remove('visible');
            }
        });
    };

    setTimeout(() => {
        checkVisibility();
    }, 100);

    window.addEventListener('scroll', checkVisibility);     
});