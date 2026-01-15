/**
 * Script pentru generarea utilizatorilor random - Versiunea Rafinată
 */

// Selectarea elementelor din DOM
const btnLoad = document.getElementById('btn-load');
const userPhoto = document.getElementById('user-photo');
const userName = document.getElementById('user-full-name');

const cellGender = document.getElementById('cell-gender');
const cellCountry = document.getElementById('cell-country');
const cellCity = document.getElementById('cell-city');
const cellEmail = document.getElementById('cell-email');

/**
 * Funcție pentru curățarea datelor vechi din interfață
 */
function clearProfile() {
    // Resetăm imaginea la un placeholder sau o golim
    userPhoto.src = "";
    userName.innerText = "Se încarcă...";
    
    // Curățăm celulele tabelului
    cellGender.innerText = "...";
    cellCountry.innerText = "...";
    cellCity.innerText = "...";
    cellEmail.innerText = "...";
    
    console.log('Interfața a fost curățată pentru noul utilizator.');
}

/**
 * Funcția principală asincronă pentru preluarea datelor
 */
async function fetchRandomUser() {
    // 1. Schimbăm starea butonului: text și inactiv
    btnLoad.innerText = 'Se încarcă...';
    btnLoad.disabled = true;
    
    // 4. Curățăm tabelul înainte de a introduce date noi
    clearProfile();

    console.log('Cerere trimisă către Random User API...');

    try {
        // 2. Apelăm API-ul
        const response = await fetch('https://randomuser.me/api/');

        if (!response.ok) {
            throw new Error(`Eroare HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Date primite cu succes');

        const user = data.results[0];
        
        // Populăm datele noi
        updateUI(user);

    } catch (error) {
        console.error('Eroare la preluarea datelor:', error);
        alert('Eroare la conectarea cu serverul. Încearcă din nou.');
        userName.innerText = "Eroare la încărcare";
    } finally {
        // 3. Revenirea butonului la starea inițială (indiferent de rezultat)
        btnLoad.innerText = 'Încarcă utilizator nou';
        btnLoad.disabled = false;
    }
}

/**
 * Actualizează elementele vizuale cu datele primite
 */
function updateUI(user) {
    userPhoto.src = user.picture.large;
    userName.innerText = `${user.name.first} ${user.name.last}`;
    
    // Populăm celulele tabelului
    cellGender.innerText = user.gender === 'male' ? 'Masculin' : 'Feminin';
    cellCountry.innerText = user.location.country;
    cellCity.innerText = user.location.city;
    cellEmail.innerText = user.email;
}

// Evenimentul de click
btnLoad.addEventListener('click', fetchRandomUser);

// Încărcare automată la prima deschidere
window.addEventListener('DOMContentLoaded', fetchRandomUser);