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

const questions = [
    {
        question: '1. Manakah dari pernyataan berikut yang benar mengenai tipe data di C++?',
        options: ['int digunakan untuk menyimpan bilangan desimal', 'int hanya dapat menyimpan angka negatif', 'int digunakan untuk menyimpan bilangan bulat', 'int memiliki ukuran lebih besar dari double'], 
        answer: 'int digunakan untuk menyimpan bilangan bulat'
    },
    {
        question: '2. Apa yang akan terjadi jika kita mencoba mengubah nilai sebuah variabel yang dideklarasikan sebagai const di C++?',
        options: ['Program akan tetap berjalan tanpa masalah', 'Program akan menampilkan pesan peringatan tetapi tetap berjalan', 'Program akan mengalami error saat kompilasi', 'Program akan mengalami error saat dijalankan'],
        answer: ' Program akan mengalami error saat kompilasi'
    },
    {
        question: '3. Dalam pernyataan if-else, manakah operator yang digunakan untuk mengecek apakah dua nilai sama dalam C++?',
        options: ['=', '==', '!=', '<=>'],
        answer: '=='
    },
    {
        question: '4. Manakah pernyataan yang benar mengenai perulangan for dalam C++?',
        options: ['for hanya dapat digunakan dengan tipe data int', 'for digunakan untuk melakukan perulangan dengan jumlah iterasi yang jelas', 'for tidak bisa digunakan untuk mengakses elemen dalam array', 'for hanya bisa digunakan dalam fungsi main()'],
        answer: 'for digunakan untuk melakukan perulangan dengan jumlah iterasi yang jelas'
    },
    {
        question: '5. Manakah cara yang benar untuk mendeklarasikan sebuah fungsi di C++ yang menerima dua parameter bertipe int dan mengembalikan int?',
        options: ['int myFunction(int a, int b);', 'void myFunction(int a, int b);', 'function myFunction(int a, int b);', 'myFunction(int a, int b);'],
        answer: 'int myFunction(int a, int b);'
    }
];

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);
let timeLeft = 120; 
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result');
const submitButton = document.getElementById('submitBtn');

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;

    const letters = ["A", "B", "C", "D"];
    document.getElementById("options").innerHTML = q.options.map((option, index) => 
        `<label class="option ${answers[currentQuestion] === option ? 'selected' : ''}" onclick="selectOption('${option}')">
            <input type="radio" name="answer" value="${option}">
            <span>${letters[index]}.</span> ${option}
        </label>`
    ).join("");

    document.getElementById("prevBtn").disabled = currentQuestion === 0;
    document.getElementById("nextBtn").style.display = currentQuestion === questions.length - 1 ? "none" : "inline-block";
    document.getElementById("submitBtn").style.display = currentQuestion === questions.length - 1 ? "inline-block" : "none";
}

function selectOption(option) {
    answers[currentQuestion] = option;
    document.querySelectorAll(".option").forEach(el => el.classList.remove("selected"));
    document.querySelector(`.option:has(input[value="${option}"])`).classList.add("selected");
}

function nextQuestion() {
    if (answers[currentQuestion] !== null) {
        currentQuestion++;
        loadQuestion();
    } else {
        alert("Pilih jawaban terlebih dahulu!");
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

submitButton.addEventListener('click', submitQuiz);

function submitQuiz() {
    clearInterval(timer);
    let score = answers.filter((ans, i) => ans === questions[i].answer).length;
    alert(`Kuis selesai! Skor Anda: ${score}/${questions.length}`);
}

function showResult() {
    let score = 0;
    let resultHTML = "";

    questions.forEach((q, i) => {
        let isCorrect = answers[i] === q.answer;
        if (isCorrect) score++;
        resultHTML += `
            <p>${q.question} <br>
            <strong>Jawaban Anda:</strong> <span class="${isCorrect ? 'correct' : 'wrong'}">${answers[i] || "Tidak Dijawab"}</span><br>
            <strong>Jawaban Benar:</strong> <span class="correct">${q.answer}</span></p><hr>
        `;
    });

    document.getElementById("score").innerHTML = `<strong>Skor Anda: ${score}/${questions.length}</strong><br><br>${resultHTML}`;
}

let timer = setInterval(function() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `Waktu tersisa: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft === 0) {
        clearInterval(timer);
        alert("Waktu habis! Kuis akan dikirim otomatis.");
        submitQuiz();
    }
    timeLeft--;
}, 1000);

loadQuestion();