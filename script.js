const links = document.querySelectorAll('.nav-links a');
const defaultLink = document.querySelector('.nav-links a[href="home.html"]')

function setActiveLink() {
    const activeLink = localStorage.getItem('activeLink');
    let found = false;

    if (activeLink) {
        links.forEach(link => {
            if (link.getAttribute('href') === activeLink) {
                link.classList.add('active');
                found = true;
            }
            else {
                link.classList.remove('active');
            }
        });

        if (!found && defaultLink) {
            defaultLink.classList.add('active');
            localStorage.setItem('activeLink', defaultLink.getAttribute('href'));
        }
    }
}

setActiveLink();

links.forEach(link => {
    link.addEventListener('click', (e) => {
        links.forEach(otherLink => otherLink.classList.remove('active'));
        e.target.classList.add('active');

        localStorage.setItem('activeLink', e.target.getAttribute('href'));
    });
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

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
        header.classList.add('header-shrink');
    } else {
        header.classList.remove('header-shrink');
    }
});


const homePage = document.getElementById('home');
const materialsPage = document.getElementById('materials');
const quizPage = document.getElementById('quiz');
const goToMaterialsButton = document.getElementById('goToMaterials');
const toMaterialsLink = document.querySelector('a[href="#materials"]');
const toHomeLink = document.querySelector('a[href="#home"]');
const learnMorePage = document.getElementById('learn-more');
const toQuizLink = document.querySelector('a[href="#quiz"]');

goToMaterialsButton.addEventListener('click', toMaterials);
toMaterialsLink.addEventListener('click', toMaterials);
toHomeLink.addEventListener('click', toHome);
toQuizLink.addEventListener('click', toQuiz);

function toHome() {
    materialsPage.classList.add('hidden');
    learnMorePage.classList.remove('hidden');
    quizPage.classList.add('hidden');
    homePage.classList.remove('hidden');
}

function toMaterials() {
    homePage.classList.add('hidden');
    learnMorePage.classList.add('hidden');
    quizPage.classList.add('hidden');
    materialsPage.classList.remove('hidden');
}

function toQuiz() {
    homePage.classList.add('hidden');
    learnMorePage.classList.add('hidden');
    materialsPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
}

const startQuiz = document.getElementById('start-quiz');

startQuiz.addEventListener('click', function() {
    let option = confirm('Apakah anda ingin mengerjakan kuis sekarang?');
    if (option) {
        alert('Anda memilih untuk melanjutkan!');
        window.location.href = 'quiz/quiz.html';
    }
    else {
        alert('Anda membatalkan tindakan.');
    }
});


