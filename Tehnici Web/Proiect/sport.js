document.addEventListener('DOMContentLoaded', () => {
    const dynamicContainer = document.getElementById('dynamicContainer');
    const addElementBtn = document.getElementById('addElementBtn');
    const clearElementsBtn = document.getElementById('clearElementsBtn');
    const activityInput = document.getElementById('activityInput');

    let activities = [];

    ///salvez activitatile in localStorage
    function saveToLocalStorage() {
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    ///incarc activitatile in localStorage
    function loadFromLocalStorage() {
        const storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
        activities = storedActivities;
        activities.forEach(activityName => {
            createActivityElement(activityName);
        });
    }

    ///creez un element de activitate
    function createActivityElement(activityName) {
        const newElement = document.createElement('div');
        newElement.className = 'dynamic-element';
        newElement.innerHTML = `
             <span>${activityName}</span>
             <button class="delete-btn">Șterge</button>
        `;

        ///adaug un eveniment pt stergerea unui singur element
        newElement.querySelector('.delete-btn').addEventListener('click', () => {
            newElement.remove();
            activities = activities.filter(activity => activity !== activityName);
            saveToLocalStorage();
        });

        dynamicContainer.appendChild(newElement);
    }

    ///adaugarea unei activitate
    function addElement() {
        const activityName = activityInput.value.trim();

        if(activityName === ""){
            alert("Introduceți o activitate validă!");
            return;
        }
        
        activities.push(activityName);
        createActivityElement(activityName);
        saveToLocalStorage();

        dynamicContainer.style.height = 'auto';
        activityInput.value = '';
    }

    ///functie pt stergerea tuturor elementelor
    function clearElements() {
        dynamicContainer.innerHTML = '';
        activities = [];
        saveToLocalStorage();
    }

    ///evenimente butoane
    addElementBtn.addEventListener('click', addElement);
    clearElementsBtn.addEventListener('click', clearElements);

    loadFromLocalStorage();
});

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Șterge tot conținutul din localStorage
            localStorage.clear();

            // Redirecționează utilizatorul la pagina principală sau la pagina de login
            window.location.href = "login.html";
        });
    }
});