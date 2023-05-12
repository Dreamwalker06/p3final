const test = []
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
    test = data
  })
  .catch(error => {
    console.error(error); 
  });

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    data.forEach(objet => {
        const button = document.createElement("button");
        document.querySelector('.filtre').appendChild(button);
        button.textContent = objet.name;
        button.addEventListener('click', () => 
        // correspondance entre test et objet.name avec for //
        console.log(objet.name)
        )
        
  })
    
  })
  .catch(error => {
    console.error(error); 
  });

console.log(test)


