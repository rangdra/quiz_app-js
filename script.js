const data = [
  {
    id: 1,
    question: 'JavaScript termasuk ke dalam scripting language, apa maksudnya?',
    answers: [
      {
        answer: 'Tidak perlu dikompilasi agar bisa dijalankan.',
        isCorrect: true,
      },
      {
        answer:
          'Pemrograman yang bisa merepresentasikan objek dunia nyata ke dalam program.',
        isCorrect: false,
      },
      {
        answer:
          'Tidak perlu mendefinisikan tipe data variabel secara eksplisit.',
        isCorrect: false,
      },
      {
        answer: 'Perlu mendefinisikan variabel sebelum bisa menggunakannya.',
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    question: 'Pada lingkungan manakah JavaScript dapat dijalankan?',
    answers: [
      { answer: 'Browser', isCorrect: true },
      { answer: 'Server', isCorrect: false },
      { answer: 'Mobile', isCorrect: false },
      { answer: 'Semua Benar', isCorrect: false },
    ],
  },
  {
    id: 3,
    question:
      'Diberikan sejumlah elemen yang harus disimpan secara berurutan. Manakah struktur data yang akan Anda gunakan?',
    answers: [
      { answer: 'Array', isCorrect: true },
      { answer: 'Map', isCorrect: false },
      { answer: 'Set', isCorrect: false },
      { answer: 'Object', isCorrect: false },
    ],
  },
  {
    id: 4,
    question:
      'Manakah dari pilihan berikut ini cara yang salah untuk mendeklarasikan fungsi pada JavaScript?',
    answers: [
      { answer: 'function sayHello() {}', isCorrect: false },
      { answer: 'const sayHello = () => {}', isCorrect: false },
      { answer: 'const sayHello = function() {}', isCorrect: false },
      { answer: 'Semua benar', isCorrect: true },
    ],
  },
  {
    id: 5,
    question:
      'Istilah pewarisan pada paradigma Object Oriented Programming biasa dikenal dengan…',
    answers: [
      { answer: 'Overriding', isCorrect: false },
      { answer: 'Extensions', isCorrect: false },
      { answer: 'Abstraction', isCorrect: false },
      { answer: 'Inheritance', isCorrect: true },
    ],
  },
  {
    id: 6,
    question: 'Berikut ini adalah pilar-pilar OOP, kecuali…',
    answers: [
      { answer: 'Constructor', isCorrect: true },
      { answer: 'Inheritance', isCorrect: false },
      { answer: 'Polymorphism', isCorrect: false },
      { answer: 'Abstraction', isCorrect: false },
    ],
  },
  {
    id: 7,
    question: 'Manakah pernyataan berikut ini yang benar terkait if statement?',
    answers: [
      {
        answer:
          'Statement if hanya bisa melakukan maksimal 3 pengecekan kondisi.',
        isCorrect: false,
      },
      {
        answer:
          'Statement if hanya bisa melakukan pengecekan untuk variabel boolean.',
        isCorrect: false,
      },
      { answer: 'Kode if harus diikuti dengan else.', isCorrect: false },
      {
        answer: 'Kita bisa menambahkan blok kode if di dalam if.',
        isCorrect: true,
      },
    ],
  },
  {
    id: 8,
    question: 'Manakah yang merupakan framework JavaScript',
    answers: [
      { answer: 'React Js', isCorrect: true },
      { answer: 'Laravel', isCorrect: false },
      { answer: 'Flask', isCorrect: false },
      { answer: 'Ruby On Rails', isCorrect: false },
    ],
  },
  {
    id: 9,
    question: 'Manakah yang merupakan framework Phython',
    answers: [
      { answer: 'React Js', isCorrect: false },
      { answer: 'Laravel', isCorrect: false },
      { answer: 'Flask', isCorrect: true },
      { answer: 'Ruby On Rails', isCorrect: false },
    ],
  },
  {
    id: 10,
    question: 'Manakah yang merupakan utility framework CSS',
    answers: [
      { answer: 'Bootstrap', isCorrect: false },
      { answer: 'Material UI', isCorrect: false },
      { answer: 'Tailwind CSS', isCorrect: true },
      { answer: 'Ant Design', isCorrect: false },
    ],
  },
];

const gameScreen = document.querySelector('.game');
const resultScreen = document.querySelector('.result');
const question = document.querySelector('.question');
const questionLength = document.querySelector('.question-length');
const answersContainer = document.querySelector('.answers');
const btnSubmit = document.querySelector('.submit');
const btnPlay = document.querySelector('.btn-play');

let questionIdx = 0;
let correntCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer = null;

const playAgain = () => {
  questionIdx = 0;
  correntCount = 0;
  wrongCount = 0;
  total = 0;
  selectedAnswer = null;
  showQuestion(questionIdx);
};

btnPlay.addEventListener('click', () => {
  resultScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  playAgain();
});

const showResult = () => {
  resultScreen.style.display = 'flex';
  resultScreen.style.flexDirection = 'column';
  resultScreen.style.alignItems = 'center';

  gameScreen.style.display = 'none';

  resultScreen.querySelector('h1').textContent =
    correntCount >= 7
      ? 'Selamat anda berhasil!'
      : 'Maaf anda gagal! Silahkan coba lagi.';

  resultScreen.querySelector(
    '.correct'
  ).textContent = `Jawabar Benar: ${correntCount}`;
  resultScreen.querySelector(
    '.wrong'
  ).textContent = `Jawaban Salah: ${wrongCount}`;
  resultScreen.querySelector('.score').textContent = `Score: ${
    correntCount * 10
  }`;
};

const showQuestion = (qNumber) => {
  if (questionIdx === data.length) return showResult();
  selectedAnswer = null;
  questionLength.textContent = `${correntCount + wrongCount}/10`;
  question.textContent = data[qNumber].question;
  answersContainer.innerHTML = data[qNumber].answers
    .map((item, idx) => {
      return `<div class="answer">
              <input name="answer" type="radio" id=${idx} value=${item.isCorrect} />
              <label for=${idx}>${item.answer}</label>
            </div>`;
    })
    .join(' ');

  selectAnswer();
};

const selectAnswer = () => {
  answersContainer.querySelectorAll('input').forEach((el) => {
    el.addEventListener('click', (e) => {
      selectedAnswer = e.target.value;
    });
  });
};

const submitAnswer = () => {
  btnSubmit.addEventListener('click', () => {
    if (selectedAnswer !== null) {
      JSON.parse(selectedAnswer) ? correntCount++ : wrongCount++;
      questionIdx++;
      showQuestion(questionIdx);
    } else {
      alert('Silahkan pilih jawaban terlebih dahulu!');
    }
  });
};

showQuestion(questionIdx);
submitAnswer();
