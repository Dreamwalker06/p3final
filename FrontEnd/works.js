fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    data.forEach(objet => {
        const div = document.createElement("div");
        const title = document.createElement("p");
        title.textContent = objet.title;
        const img = document.createElement("img");
        img.src = objet.imageUrl;
        div.appendChild(img);
        div.appendChild(title);
        document.querySelector('.gallery').appendChild(div);
    })
         console.log(data); 
    
  })
  .catch(error => {
    console.error(error); 
  });


