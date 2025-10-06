// Burger Menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Scroll Animations
window.addEventListener('scroll', () => {
    document.querySelectorAll('.section').forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Quiz Logic
const quizData = [
    { q: "What is Raiku's primary goal?", a: "Enterprise certainty", opts: ["New blockchain", "Reduce fees", "Enterprise certainty", "Hardware dev"] },
    { q: "What challenge does Raiku solve?", a: "Fragility under stress", opts: ["High fees", "Fragility under stress", "Lack of tools", "Slow speeds"] },
    { q: "Blockspace in Raiku becomes?", a: "Guaranteed resource", opts: ["Free", "Guaranteed resource", "Centralized", "Optional"] },
    { q: "Who does Raiku empower most for building?", a: "Developers", opts: ["Validators", "Traders", "Developers", "Institutions"] },
    { q: "Key tech highlight?", a: "Deterministic execution", opts: ["Storage", "Deterministic execution", "Cross-chain", "Auditing"] },
    { q: "Pre-confirmation speed?", a: "Sub-30ms", opts: ["Sub-10ms", "Sub-30ms", "Sub-50ms", "Sub-100ms"] },
    { q: "Max pre-book time?", a: "60s", opts: ["10s", "30s", "60s", "120s"] },
    { q: "Compatible clients?", a: "Anza & Firedancer", opts: ["Ethereum", "Anza & Firedancer", "Bitcoin", "Cosmos"] },
    { q: "Validator tool for blockspace sales?", a: "Raiku Sidecar", opts: ["Raiku Core", "Raiku Sidecar", "Dashboard", "Plugin"] },
    { q: "Lines of code for lite mode?", a: "2", opts: ["5", "2", "10", "20"] }
];
let currentQ = 0, score = 0;
const container = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');
const progressText = document.getElementById('progress-text');
const progressRingFill = document.getElementById('progress-ring-fill');

function loadQuestion() {
    const q = quizData[currentQ];
    container.innerHTML = `<p>${currentQ + 1}/10. ${q.q}</p><div id="options" class="slide-in"></div>`;
    const optsDiv = document.getElementById('options');
    q.opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(opt, q.a);
        optsDiv.appendChild(btn);
    });
    progressText.textContent = `${currentQ + 1}/10`;
    const progress = ((currentQ + 1) / quizData.length) * 188.4;
    progressRingFill.style.strokeDashoffset = 188.4 - progress;
    nextBtn.style.display = 'none';
    result.style.display = 'none';
}

function selectAnswer(selected, correct) {
    if (selected === correct) score++;
    const buttons = document.querySelectorAll('#options button');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) btn.classList.add('correct');
        else if (btn.textContent === selected && selected !== correct) btn.classList.add('incorrect');
    });
    nextBtn.style.display = 'block';
}

nextBtn.onclick = () => {
    if (currentQ < quizData.length - 1) {
        currentQ++;
        container.classList.remove('slide-in');
        void container.offsetWidth; // Trigger reflow
        container.classList.add('slide-in');
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    container.style.display = 'none';
    nextBtn.style.display = 'none';
    result.innerHTML = `<h3>Your Score: ${score}/${quizData.length}</h3><p>${score === quizData.length ? 'Raiku Master! 🚀' : 'Nice try! Dive into <a href="https://docs.raiku.com/" target="_blank" style="color: #bfff00">Raiku Docs</a> to learn more!'}</p><button onclick="resetQuiz()">Retake Quiz</button>`;
    result.style.display = 'block';
}

function resetQuiz() {
    currentQ = 0;
    score = 0;
    result.style.display = 'none';
    container.style.display = 'block';
    loadQuestion();
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section')[0].classList.add('visible');
    loadQuestion();
});
