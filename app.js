const handleSearch = async (event) => {
  event.preventDefault();
  const searchId = document.getElementById("searchId").value;
  console.log(searchId, "searchId");

  // Fetch data from the API
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchId}&key=7f6d2665-ff6e-48ed-83d5-a538c2afa70d`
  );
  const conJson = await res.json();
  console.log(conJson, "conJson");

  const ul = document.getElementById("ul");
  ul.innerHTML = ""; 


  conJson.data.recipes.forEach((recipe) => {
    const li = document.createElement("li");
    li.style.color = "#F38E82";
    const img = document.createElement("img");
    img.src = recipe.image_url; // Set image URL
    img.alt = recipe.title;
    // li.textContent = `${recipe.title}<br>${recipe.publisher}`;
    li.innerHTML = `${recipe.title}<br>${recipe.publisher}`;
    li.prepend(img); 
    ul.appendChild(li);


    li.addEventListener("click", async () => {
      const recResp = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}?key=7f6d2665-ff6e-48ed-83d5-a538c2afa70d`
      );
      const recJson = await recResp.json();
      console.log(recJson, "recipe json");

      const { image_url, servings, cooking_time, title } = recJson.data.recipe;

      const recipeUpperSide = document.getElementById("recipeUpperSide");
      recipeUpperSide.innerHTML = "";

      const recipeImage = document.createElement("img");
      recipeImage.src = image_url;
      recipeImage.alt = title;

      const recipeTitle = document.createElement("h2");
      recipeTitle.textContent = title;

      const recipeDetailsUl = document.createElement("ul");

      const servingsItem = document.createElement("li");
      servingsItem.textContent = `Servings: ${servings}`;

      const cookingTimeItem = document.createElement("li");
      cookingTimeItem.textContent = `Cooking Time: ${cooking_time} minutes`;

      recipeDetailsUl.appendChild(servingsItem);
      recipeDetailsUl.appendChild(cookingTimeItem);

      recipeUpperSide.appendChild(recipeImage);
      recipeUpperSide.appendChild(recipeTitle);
      recipeUpperSide.appendChild(recipeDetailsUl);

      const recipeDiv = document.getElementById("recipeDiv");
      recipeDiv.innerHTML = "";

      const ingredientsList = document.createElement("ul");
      recJson.data.recipe.ingredients.forEach((item) => {
        const recList = document.createElement("li");
        recList.textContent = `${item.quantity || ""} ${item.unit || ""} ${
          item.description
        }`;
        ingredientsList.appendChild(recList);
      });

      recipeDiv.appendChild(ingredientsList);
    });
  });
};
