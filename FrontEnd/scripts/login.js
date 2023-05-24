
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
    document.querySelector('#logout').style.fontSize = '16.8px';
    document.querySelector('.modify-bio').style.display = 'flex';
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
    document.querySelector('.modify-bio').style.display = 'none';
  }

  const modalContainer = document.querySelector(".modal-container");
  const modalTriggers = document.querySelectorAll(".modal-trigger")
  modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))
  function toggleModal() {
    modalContainer.classList.toggle("active")
  }

  /* works et icone */
  fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    data.forEach(objet => {
        const div = document.createElement("div");
        document.querySelector('.gallery-edition').appendChild(div);
        const img = document.createElement("img");
        img.src = objet.imageUrl;
        img.classList.add("modal-img");
        const imgContainer = document.createElement("div");
        imgContainer.style.position = "relative"; 
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-regular", "fa-trash-can");
        trashIcon.style.position = "absolute"; 
        trashIcon.style.top = "5px"; 
        trashIcon.style.right = "10px"; 
        div.appendChild(imgContainer);
        imgContainer.appendChild(img);
        imgContainer.appendChild(trashIcon);
        const title = document.createElement("p");
        title.textContent = "éditer";
        div.appendChild(title);
/* Supression de works */
      trashIcon.addEventListener("click", () => {
        fetch(`http://localhost:5678/api/works/${objet.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then(response => {
            if (response.ok) {
              console.log("Élément supprimé avec succès de l'API");
              // Supprimer également l'élément de l'interface utilisateur
              div.remove();
            } else {
              console.error("La suppression de l'élément a échoué");
            }
          })
          .catch(error => {
            console.error("Une erreur s'est produite lors de la suppression :", error);
          });
      });
    });
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors de la récupération des données :", error);
  });
  
/* Switch modal */
const modalContainer2 = document.querySelector(".modal-container2");
const modalTriggers2 = document.querySelectorAll(".trigger")
modalTriggers2.forEach(trigger2 => trigger2.addEventListener("click", toggleModal2))

function toggleModal2() {
  modalContainer2.classList.toggle("active")
  modalContainer.classList.toggle("active")
}

const token = localStorage.getItem('token');

/* Catégorie */
let selectedCategory = ''; // Variable pour stocker la catégorie sélectionnée
const select = document.querySelector('select');

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.text = item.name;
      select.appendChild(option);
    });
     // Écouter le changement de sélection dans la liste déroulante
     select.addEventListener('change', () => {
      selectedCategory = select.value; // Mettre à jour la valeur de la catégorie sélectionnée
    });
  })
  .catch(error => console.error(error));

  /* Deuxieme modal : Ajout works*/
/* Ajout photo */
const btnAddPhoto = document.getElementById('btn-add-photo');
const inputFile = document.getElementById('input-file');
const imageContainer = document.getElementById('image-container');

btnAddPhoto.addEventListener('click', () => { 
  inputFile.click();
});

inputFile.addEventListener('change', () => {
  const file = inputFile.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const image = document.createElement('img');
    image.src = reader.result;
    image.style.width = '150px';
    image.style.height = '169px';
    imageContainer.appendChild(image);

      if (inputFile.files.length > 0) {
        document.getElementById("btn-add-photo").style.display = "none";
        document.querySelector(".fa-image").style.display = "none";
        document.querySelector('.text-maxsize').style.display = 'none';
      } else {
        document.getElementById("btn-add-photo").style.display = "block";
        document.querySelector(".fa-image").style.display = "block";
        document.querySelector('.text-maxsize').style.display = 'flex';
      }
  })
  if (file) {
    reader.readAsDataURL(file);
  }
});


// Requete POST via Fetch 
const submitBtn = document.getElementById('add-photo2');
submitBtn.addEventListener('click', postData);
function postData() {
  // Récupérer les données nécessaires (image, titre, catégorie) depuis les éléments HTML correspondants
 
  const title = document.getElementById('title-input').value;
  const category = document.getElementById('category-select').value;
  const image = document.getElementById('input-file').files[0];

  if (!title && !image) {
    // Afficher un message d'erreur à l'utilisateur
    alert('Veuillez ajouter une image et mettre un titre.');
    return; // Arrêter l'exécution de la fonction si les champs ne sont pas remplis
  }

  if (!title) {
    // Afficher un message d'erreur spécifique au champ titre
    alert('Veuillez remplir le champ titre.');
    return; // Arrêter l'exécution de la fonction si le champ titre n'est pas rempli
  }

  if (!image) {
    alert('Veuillez importer une image.');
    return; // Arrêter l'exécution de la fonction si l'image n'est pas rempli
  }

  // Créer un objet FormData pour envoyer les données en tant que multipart/form-data
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append("image", image);

  // Effectuer la requête POST avec fetch
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Traiter la réponse de l'API si nécessaire
    console.log(data);
  })
  .catch(error => {
    // Gérer les erreurs de requête
    console.error('Erreur :', error);
  });
}
