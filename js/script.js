
 
        const questions = [
            {
                question: "¿Cuál es la función principal del sistema respiratorio?",
                answers: [
                    "Transportar nutrientes",
                    "Eliminar desechos",
                    "Intercambiar gases",
                    "Regular la temperatura corporal"
                ],
                correct: 2,
            },
            {
                question: "¿Qué tipo de animales ponen huevos?",
                answers: ["Mamíferos", "Aves", "Reptiles", "Ambos B y C"],
                correct: 3,
            },
            {
                question: "¿Qué planeta es conocido como el planeta rojo?",
                answers: ["Venus", "Saturno", "Marte", "Júpiter"],
                correct: 2,
            },
            {
                question: "¿Qué órgano del cuerpo humano bombea la sangre?",
                answers: ["Cerebro", "Hígado", "Pulmones", "Corazón"],
                correct: 3,
            },
            {
                question: "¿Cómo se llama el proceso por el cual las plantas hacen su alimento?",
                answers: ["Germinación", "Fotosíntesis", "Respiración", "Digestión"],
                correct: 1,
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let timeLeft = 10;
        let timer;

        function startGame() {
            document.getElementById("startScreen").classList.add("hidden");
            document.getElementById("gameScreen").classList.remove("hidden");
            resetTimer();
            showQuestion();
        }

        function showQuestion() {
            if (currentQuestion < questions.length) {
                document.getElementById("question").innerText = questions[currentQuestion].question;
                let answersDiv = document.getElementById("answers");
                answersDiv.innerHTML = "";
                questions[currentQuestion].answers.forEach((ans, index) => {
                    let btn = document.createElement("button");
                    btn.innerText = ans;
                    btn.className = "btn";
                    btn.onclick = () => checkAnswer(index);
                    answersDiv.appendChild(btn);
                });
                startTimer();
            } else {
                endGame();
            }
        }

        function checkAnswer(index) {
            clearInterval(timer);
            if (index === questions[currentQuestion].correct) {
                score += 10;
                showModal("¡Correcto! +10 puntos");
            } else {
                showModal(
                    "Incorrecto. La respuesta correcta era: " +
                        questions[currentQuestion].answers[questions[currentQuestion].correct]
                );
            }
            document.getElementById("score").innerText = score;
            currentQuestion++;
            if (currentQuestion < questions.length) {
                setTimeout(() => {
                    resetTimer();
                    showQuestion();
                }, 2000);
            } else {
                endGame();
            }
        }


function showModal(message, isFinal = false) {
    let modal = document.getElementById("modal");
    modal.innerHTML = `<div>${message}</div>`;
    if (message.includes("Ganaste")) {
        modal.innerHTML +=
            `<br><img src="./imagenes/premio.jpg" 
            alt="Escarapela" style="width:200px;margin-top:15px;">`;
    }
    modal.classList.add("show");

    setTimeout(() => {
        modal.classList.remove("show");
        if (isFinal) {
            window.location.href = "./CienciasNaturales.html";
        }
    }, isFinal ? 4000 : 2000);
}



        function startTimer() {
            timer = setInterval(() => {
                timeLeft--;
                document.getElementById("timer").innerText = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    showModal("¡Tiempo agotado!");
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        setTimeout(() => {
                            resetTimer();
                            showQuestion();
                        }, 2000);
                    } else {
                        endGame();
                    }
                }
            }, 1000);
        }

        function resetTimer() {
            timeLeft = 10;
            document.getElementById("timer").innerText = timeLeft;
        }

        function endGame() {
            const maxScore = questions.length * 10;
            let finalMessage = `¡Juego terminado! Tu puntuación final es: ${score}`;

            if (score >= maxScore / 2) {
                finalMessage += "<br>🎉 ¡Felicitaciones! Ganaste🎖️";
            } else if (score === 0) {
                finalMessage += "<br>😞 Puntos insuficientes, mejor suerte la próxima.";
            } else {
                finalMessage += "<br>Intenta mejorar tu puntaje la próxima vez.";
            }

            showModal(finalMessage, true);

            document.getElementById("gameScreen").classList.add("hidden");
            document.getElementById("startScreen").classList.remove("hidden");
            currentQuestion = 0;
            score = 0;
            timeLeft = 10;
            document.getElementById("score").innerText = score;
            document.getElementById("timer").innerText = timeLeft;
        }
//FONDO ANIMAMO//

// crear burbujas en .fondo-animado
function createBubbles(count = 24) {
  const fondo = document.querySelector('.fondo-animado');
  if (!fondo) return;

  fondo.innerHTML = ''; // limpiar antes

  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';

    const size = Math.random() * 60 + 12;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}vw`;
    b.style.animationDuration = `${Math.random() * 10 + 8}s`;
    b.style.animationDelay = `${Math.random() * 5}s`;
    b.style.opacity = `${Math.random() * 0.6 + 0.15}`;

    fondo.appendChild(b);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createBubbles(26);
});
