
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    data.forEach(objet => {
        const div = document.createElement("div");
        document.querySelector('.gallery').appendChild(div);
        const title = document.createElement("p");
        title.textContent = objet.title;
        const img = document.createElement("img");
        img.src = objet.imageUrl;
        div.appendChild(img);
        div.appendChild(title);
  })
  })
  .catch(error => {
    console.error(error); 
  });

  let filteredData = null;

  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      const allButton = document.createElement("button");
      document.querySelector('.filtre').appendChild(allButton);
      allButton.textContent = "Tous";
      allButton.addEventListener('click', () => {
        fetch('http://localhost:5678/api/works')
          .then(response => response.json())
          .then(data => {
            filteredData = null;
            displayProjects(data);
          });
      });
  
      data.forEach(objet => {
        const button = document.createElement("button");
        document.querySelector('.filtre').appendChild(button);
        button.textContent = objet.name;
        button.addEventListener('click', () => {
          fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
              filteredData = data.filter(obj => obj.categoryId === objet.id);
              displayProjects(filteredData);
            });
        });
      });
    })
    .catch(error => {
      console.error(error); 
    });
  
  function displayProjects(data) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    data.forEach(objet => {
      const div = document.createElement("div");
      gallery.appendChild(div);
      const title = document.createElement("p");
      title.textContent = objet.title;
      const img = document.createElement("img");
      img.src = objet.imageUrl;
      div.appendChild(img);
      div.appendChild(title);
    });
  }
  