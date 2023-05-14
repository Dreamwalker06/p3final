
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Récupération des valeurs des champs email et password
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Envoi des données de connexion au serveur via une requête POST
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
      
    });
  console.log(response);


    // Vérification du code de réponse HTTP
    if (response.status === 200) {
      // Récupération du token d'authentification
      const data = await response.json();
      const token = data.token;

      // Stockage du token dans le localStorage
      localStorage.setItem('token', token);
 
      // Redirection vers la page d'accueil
      window.location.href = "../index.html"
    } else {
      // Affichage d'un message d'erreur
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error(error);
    alert('Une erreur est survenue lors de la connexion');
  }
});

// Vérification de la présence du token dans le localStorage
if (localStorage.getItem('token')) {
    // L'utilisateur est connecté, affichage des éléments correspondants
    document.querySelector('.top-edition').style.display = 'flex';
    document.querySelector('.modify-portrait').style.display = 'flex';
    document.querySelector('.modify-projet-logo').style.display = 'flex';
    document.querySelector('.filtre').style.display = 'none';
    document.querySelector('.gallery').style.marginTop = '90px';
    document.querySelector('.header-edition').style.paddingTop = '50px';
    document.querySelector('#logout').textContent = 'logout';
    logout.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('token');
      window.location.href = './index.html'; 

    })
 
  } else {
    // L'utilisateur n'est pas connecté, affichage des éléments correspondants
    document.querySelector('.top-edition').style.display = 'none';
    document.querySelector('.modify-portrait').style.display = 'none';
    document.querySelector('.modify-projet-logo').style.display = 'none';
    document.querySelector('.filtre').style.display = 'flex';
  }

  const modalContainer = document.querySelector(".modal-container");
  const modalTriggers = document.querySelectorAll(".modal-trigger")
  modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))
  function toggleModal() {
    modalContainer.classList.toggle("active")
  }
  