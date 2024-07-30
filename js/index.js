document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const monsterForm = document.getElementById("monster-form");
    const loadMoreBtn = document.getElementById("load-more");
    let currentPage = 1;
  
    function fetchMonsters(page = 1, limit = 50) {
      fetch(`http://localhost:4000/monsters?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(monster => displayMonster(monster));
        })
        .catch(error => console.error("Error fetching monsters:", error));
    }
  
    function displayMonster(monster) {
      const monsterDiv = document.createElement("div");
      monsterDiv.classList.add("monster");
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterDiv);
    }
  
    function addMonster(name, age, description) {
      fetch("http://localhost:4000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ name, age, description })
      })
        .then(response => response.json())
        .then(monster => displayMonster(monster))
        .catch(error => console.error("Error adding monster:", error));
    }
  
    monsterForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = event.target.name.value;
      const age = event.target.age.value;
      const description = event.target.description.value;
      addMonster(name, age, description);
      monsterForm.reset();
    });
  
    loadMoreBtn.addEventListener("click", () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  
    fetchMonsters();
  });
  