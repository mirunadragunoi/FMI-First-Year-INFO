function afiseazaRezultatul(){
    rezultat.style.display = 'block';
    mesajEroare.style.display = 'none'; 
}

function afiseazaMesajEroare() {
    mesajEroare.style.display = 'block'; 
    rezultat.style.display = 'none'; 
}

function calculeaza() {
    const varsta = document.getElementById('varsta').value;
    const inaltimea = document.getElementById('inaltimea').value;
    const greutatea = document.getElementById('greutatea').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const activitate = document.querySelector('input[name="activitate"]:checked').value;

    let valid = true;

    let ani, cm, kg;
    ani = varsta;
    cm = inaltimea;
    kg = greutatea; 

    const mesajeroare = document.getElementById('mesajeroare');
    mesajeroare.innerHTML = '';

    ///verific daca toate campurile sunt completate
    if(!varsta || varsta <= 0){
        mesajeroare.innerHTML += '<p>Te rugăm să introduci o vârstă validă!</p>';
        valid = false;
    }

    if(!inaltimea || inaltimea <= 0){
        mesajeroare.innerHTML += '<p>Te rugăm să introduci o înălțime validă!</p>';
        valid = false;
    }

    if(!greutatea || greutatea <= 0){
        mesajeroare.innerHTML += '<p>Te rugăm să introduci o greutate validă!</p>';
        valid = false;
    }

    if (!sex) {
        mesajeroare.innerHTML += '<p>Te rugăm să selectezi sexul.</p>';
        valid = false;
    }
    if (!activitate) {
        mesajeroare.innerHTML += '<p>Te rugăm să selectezi nivelul de activitate.</p>';
        valid = false;
    }


    ///imc si rmb
    ///imc - > indice de masa corporala
    ///rmb - > rata metabolica bazala

    if(valid){
        let rmb;
        if(sex == 'Masculin')
            rmb = 10 * greutatea + 6.25 * inaltimea - 5 * varsta + 5;
        else
            rmb = 10 * greutatea + 6.25 * inaltimea - 5 * varsta - 161;
        
        let nrkcal;
        switch(activitate) {
            case 'Sedentar':
                nrkcal = rmb * 1.2;
                break;
            case 'Mai putin activ':
                nrkcal = rmb * 1.375;
                break;
            case 'Activ':
                nrkcal = rmb * 1.55;
                break;
            case 'Foarte activ':
                nrkcal = rmb * 1.725;
                break;
        }
        
        const imc = greutatea / ((inaltimea / 100) * (inaltimea / 100));

        // Resetează orice linie colorată anterior
        const rows = document.querySelectorAll('#imc-table tbody tr');
        rows.forEach(row => row.classList.remove('highlight'));

        // Adaugă clasa 'highlight' la linia corespunzătoare
        if (imc < 18.5) {
            document.getElementById('subponderal').classList.add('highlight');
        } else if (imc >= 18.5 && imc < 25) {
            document.getElementById('normal').classList.add('highlight');
        } else if (imc >= 25 && imc < 30) {
            document.getElementById('supraponderal').classList.add('highlight');
        } else if (imc >= 30 && imc < 35) {
            document.getElementById('obez1').classList.add('highlight');
        } else if (imc >= 35 && imc < 40) {
            document.getElementById('obez2').classList.add('highlight');
        } else {
            document.getElementById('obez3').classList.add('highlight');
        }


        let nrcalorii;
        nrcalorii = nrkcal;

        let gen='';
        if(sex == 'Feminin') gen += 'o Femeie';
        else gen += 'un Bărbat';

        ///actualizez valorile din html
        document.getElementById('sex').textContent = gen;
        document.getElementById('varstaOutput').textContent = ani;
        document.getElementById('inaltimeaOutput').textContent = cm;
        document.getElementById('greutateaOutput').textContent = kg;
        document.getElementById('activitate').textContent = activitate;

        document.getElementById('nrcalorii').textContent = nrcalorii.toFixed(0);

        document.getElementById('rmb').textContent = rmb.toFixed(0);
        document.getElementById('nrkcal').textContent = nrkcal.toFixed(0);
        document.getElementById('imc').textContent = imc.toFixed(2);

        document.getElementById('rezultat').style.display = 'block';
        document.getElementById('mesajeroare').style.display = 'none';
    }
    else {
        document.getElementById('mesajeroare').style.display = 'block';
        document.getElementById('rezultat').style.display = 'none';
    }
}

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