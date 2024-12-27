// 當文檔加載完成時執行
document.addEventListener('DOMContentLoaded', function() {
    // 為所有導航連結添加點擊效果
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('你點擊了 ' + this.textContent + ' 連結！');
        });
    });
});

const interests = {
    zh: [
        "我最喜歡的團體是TXT！",
        "BOYNEXTDOOR的成員很有魅力",
        "最愛明宰鉉的歌聲"
    ],
    en: [
        "My favorite group is TXT!",
        "BOYNEXTDOOR members are so charming",
        "I love Min Jaehyun's voice"
    ]
};

const quizQuestions = {
    zh: [
        {
            question: "TXT是哪一年出道的？",
            options: ["2018", "2019", "2020", "2021"],
            correct: 1
        },
        {
            question: "BOYNEXTDOOR有幾位成員？",
            options: ["4", "5", "6", "7"],
            correct: 2
        }
    ],
    en: [
        {
            question: "When did TXT debut?",
            options: ["2018", "2019", "2020", "2021"],
            correct: 1
        },
        {
            question: "How many members are in BOYNEXTDOOR?",
            options: ["4", "5", "6", "7"],
            correct: 2
        }
    ]
};

let currentLang = 'zh';
let currentInterestIndex = 0;
let currentQuestionIndex = 0;

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-lang]').forEach(elem => {
        elem.style.display = elem.dataset.lang === lang ? 'block' : 'none';
    });
    updateInterestSlider();
    updateQuiz();
}

function updateInterestSlider() {
    const slider = document.getElementById('interest-slider');
    slider.textContent = interests[currentLang][currentInterestIndex];
}

function updateQuiz() {
    const question = quizQuestions[currentLang][currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentLang][currentQuestionIndex];
    if (selectedIndex === question.correct) {
        alert(currentLang === 'zh' ? '答對了！' : 'Correct!');
    } else {
        alert(currentLang === 'zh' ? '答錯了，再試一次！' : 'Wrong, try again!');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updateInterestSlider();
    updateQuiz();
    
    // 每3秒切换一次兴趣展示
    setInterval(() => {
        currentInterestIndex = (currentInterestIndex + 1) % interests[currentLang].length;
        updateInterestSlider();
    }, 3000);
});

let currentQuestion = 0;
const questions = [
    {
        question: "TXT的隊長秀彬是哪一年出生的？",
        options: ["1999年", "2000年", "2001年", "2002年"],
        correctAnswer: 1
    },
    {
        question: "BOYNEXTDOOR的主唱Jaehyun最喜歡的顏色是？",
        options: ["藍色", "紫色", "粉色", "白色"],
        correctAnswer: 2
    },
    {
        question: "TXT的'The Name Chapter: FREEFALL'是在哪一年發行的？",
        options: ["2021年", "2022年", "2023年", "2024年"],
        correctAnswer: 2
    },
    {
        question: "BOYNEXTDOOR是哪個公司的男團？",
        options: ["HYBE", "JYP", "SM", "YG"],
        correctAnswer: 0
    },
    {
        question: "TXT的忙內休寧凱是哪一國人？",
        options: ["韓國", "日本", "美國", "德國"],
        correctAnswer: 0
    },
    {
        question: "BOYNEXTDOOR的'But I Like You'發行於哪一年？",
        options: ["2022年", "2023年", "2024年", "2021年"],
        correctAnswer: 1
    }
];

function displayQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const question = questions[currentQuestion];
    
    let html = `
        <h3>${question.question}</h3>
        <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <button class="btn option-btn" onclick="checkAnswer(${index})">
                ${option}
            </button>
        `;
    });
    
    html += '</div>';
    quizContainer.innerHTML = html;
}

function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestion];
    if (selectedAnswer === question.correctAnswer) {
        alert('答對了！你真是專業的粉絲！');
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            document.getElementById('quiz-container').innerHTML = `
                <h3>太棒了！你完成了所有問題！</h3>
                <p>你真是TXT和BOYNEXTDOOR的資深粉絲！</p>
                <button class="btn" onclick="resetQuiz()">重新開始</button>
            `;
        }
    } else {
        alert('答錯了！再想想看～');
    }
}

function resetQuiz() {
    currentQuestion = 0;
    displayQuestion();
}

// 页面加载时显示第一个问题
window.onload = displayQuestion;
