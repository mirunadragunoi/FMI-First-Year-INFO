document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".button__section__waves");
    const mainSection = document.querySelector(".section__waves");
    const headerText = document.querySelector(".header__content h1");
    
    if(button){
        button.addEventListener("click", (event) => {
        ///iau stilurile pt buton
        const computedStyles = window.getComputedStyle(button);
    
        console.log("Background color:", computedStyles.backgroundColor);
        console.log("Width:", computedStyles.width);
        console.log("Height:", computedStyles.height);
    
        alert(`Stilurile butonului:\nBackground color: ${computedStyles.backgroundColor}\nWidth: ${computedStyles.width}\nHeight: ${computedStyles.height}`);
        });
    }
    
    if(mainSection){
        ///adaug un eveniment pt sectiune
        mainSection.addEventListener("click", (event) => {
        alert("Ai făcut click pe secțiune!");
    
        event.stopPropagation();
        });
    }

    ///elementele mele generate
    const greetingContainer = document.querySelector(".dynamic-greeting");
    const suggestionsContainer = document.querySelector(".dynamic-suggestions");

    const suggestionButton = document.createElement("button");
    suggestionButton.textContent = "Sugerează o activitate!";
    suggestionButton.classList.add("suggestion-button");


    const suggestionResult = document.createElement("p");
    suggestionResult.classList.add("suggestion-result");
    
    suggestionsContainer.appendChild(suggestionButton);
    suggestionsContainer.appendChild(suggestionResult);

    if (greetingContainer) {
        const greetingTime = document.createElement("h3");
        greetingTime.id = "greeting-time";
        greetingTime.style.cssText = "text-align: center; color: #fff; margin: 10px 0; font-size: 1.2rem;";

        const greetingMessage = document.createElement("p");
        greetingMessage.id = "greeting-message";
        greetingMessage.style.cssText = "text-align: center; color: #fff; margin: 5px 0; font-size: 1rem;";

        greetingContainer.appendChild(greetingTime);
        greetingContainer.appendChild(greetingMessage);
    }

    const suggestion = [
        "Fă un antrenament de yoga de 20 minute!",
    "Încearcă rețeta de smoothie verde!",
    "Fă o plimbare de 30 de minute în aer liber!",
    "Încearcă exercițiile de pilates pentru spate!",
    "Prepară o salată de quinoa și legume!"
    ];

    ///generez un index aleator
    function getRandomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
    }

    ///afisez o sugestie aleatorie
    suggestionButton.addEventListener("click", () => {
        const randomIndex = getRandomIndex(suggestion);
        suggestionResult.textContent = suggestion[randomIndex];
    });

    ///mesaj personalizat in functie de ora curenta
    function updateGreeting() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        ///formatez data curenta
        const formatTime = `${currentHour.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

        const greetingTime = document.getElementById("greeting-time");
        const greetingMessage = document.getElementById("greeting-message");

        const username = localStorage.getItem("username");
        
        let greeting;
        let message;

        if(currentHour < 12) {
            greeting = "Bună dimineața!";
            message = "E momentul perfect pentru un mic dejun sănătos!";
        }
        else if(currentHour < 18) {
            greeting = "Bună ziua!";
            message = "Nu uita să faci mișcare astăzi!";
        }
        else {
            greeting = "Bună seara!";
            message = "Relaxează-te și pregătește o cină delicioasă!";
        }
        
        if(username){
            greetingTime.textContent = `${greeting}, ${username}! Este ora ${formatTime}.`;
            greetingMessage.textContent = message;
        }
        else {
            greetingTime.textContent = `${greeting}! Este ora ${formatTime}.`;
            greetingMessage.textContent = message;
        }
    }
    
    ///apel initial si actualizare la fiecare minut
    updateGreeting();
    setInterval(updateGreeting, 60000);

    ///transformare text pentru buton
    suggestionButton.addEventListener("mouseenter", () => {
         headerText.textContent = headerText.textContent.split("").reverse().join("");
    });

    suggestionButton.addEventListener("mouseleave", () => {
         headerText.textContent = "Îmbunătățești STILUL DE VIAȚĂ";
    });

    
});

document.addEventListener("DOMContentLoaded", () => {
    const greetingContainer = document.querySelector(".greeting-container");

    if (greetingContainer) {
        let start = 0;

        function animateColor() {
            start = (start + 1) % 360; 

            greetingContainer.style.backgroundColor = `hsl(${start}, 50%, 30%)`;

            requestAnimationFrame(animateColor);
        }
        animateColor();
    }
});
  
