

"use strict";
let aside = $("aside");

// start main
(() => {
   $("#date").html(`
   ${new Date().getFullYear()}
   `);
   getSearch("m", "https://www.themealdb.com/api/json/v1/1/search.php?s=", "content");
})();

$(function () {
   $(".loading").fadeOut(1300, function () {
      $(this).addClass("d-none");
   });
});


//Menu
$("#menuIcon").on("click", showMenu);

// Check Select Link
$(".aside-links a").on("click", function (e) {
   selectArea(e.target.innerHTML);
   $(".aside-links a").removeClass("active");
   $(this).addClass("active");
});

// Show Menu
function showMenu() {
   if (aside.css("left") == "-240px") {
      $("#menuIcon").removeClass("fa-bars").addClass("fa-close");

      $("aside").animate({
         left: 0,
      });

      $(".aside-links li").animate(
         {
            paddingTop: 25,
         },
         1000
      );
   } else {
      $("#menuIcon").removeClass("fa-close").addClass("fa-bars");
      $("aside").animate({
         left: -240,
      });

      $(".aside-links li").animate(
         {
            paddingTop: 500,
         },
         1000
      );
   }
}

// Select Area By Link Aside and (Validation )
function selectArea(btn) {
   if (btn == "Search") {
      $("#content").html(`
      
      <!-- --- Start Inputs -- -->
      <div class="row gy-3">
        <div class="col-lg-6">
          <input
            type="search"
            class="form-control"
            placeholder="Search By Name ..."
            id="searchName"
          />
        </div>

        <div class="col-lg-6">
          <input
            type="search"
            class="form-control"
            placeholder="Search By One Letter ..."
            id="searchTitle"
          />
        </div>
      </div>
      <!-- --- End Inputs -- -->

      <!-- --- Start Content -- -->
      <div class="content-area pt-5 mt-5" id="contentArea">
    
      </div>
      `);

      // Search Event by Name
      $("#searchName").on("input", function () {
         console.log(this.value);
         getSearch(this.value, "https://www.themealdb.com/api/json/v1/1/search.php?s=", "contentArea");
      });

      // Search Event by Title
      $("#searchTitle").on("input", function () {
         this.value = this.value.length > 0 ? this.value.slice(0, 1) : "";

         getSearch(this.value.length > 0 ? this.value : "m", "https://www.themealdb.com/api/json/v1/1/search.php?f=", "contentArea");
      });
   } else if (btn == "Categories") {
      getCategory();
   } else if (btn == "Area") {
      area();
   } else if (btn == "Ingredients") {
      ingredient();
   } else {
      $("#content").html(`
   <h1 class="text-center py-5 text-white">Contact us</h1>

   <form autocomplete="off">
   
<div class="row  gy-3 ">

<div class="col-lg-6 position-relative">
<input
type="text"
class="form-control text-center"
placeholder="Enter Your Name ..."/>

<p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
Special Characters and Numbers not allowed
</p>
</div>

<div class="col-lg-6 position-relative">
<input
type="email"
class="form-control text-center"
placeholder="Enter your E-mail..."/>

<p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
Enter valid email. *Ex: xxx@yyy.zzz

</p>

</div>


<div class="col-lg-6 position-relative">
  <input
  type="tel"
  class="form-control text-center"
  placeholder="Enter Phone..."/>

  <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
  Enter valid Phone Number
</p>
  </div>



  <div class="col-lg-6 position-relative">
    <input
    type="number"
    class="form-control text-center"
    placeholder="Enter Age ..."/>

    <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
    Enter valid Age

  </p>

    </div>



    <div class="col-lg-6 position-relative">
      <input
      type="password"
      class="form-control text-center"
      placeholder="Enter password..."/>

      <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
      Enter valid password *Minimum eight characters, at least one letter and one number:*

  
    </p>
      </div>



      <div class="col-lg-6 position-relative">
        <input
        type="password"
        class="form-control text-center"
        placeholder="Enter Repassword ..."/>

        <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
        Enter valid Repassword
  
    
      </p>
        </div>


<div class="d-flex justify-content-center">
<button type="submit" class=" btn btn-outline-danger mx-auto my-4 " disabled>submit</button>
</div>
</div>
   </form>


   
   `);

      // ------------------- Start Validation
      $("form").on("submit", function (e) {
         e.preventDefault(); 
         this.reset();

         $("input").removeClass("is-valid success");
         $("button").attr("disabled", true);
      });

      let valid = {
         name: /^[a-zA-Z ]+$/,
         email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         phone: /^01[0125][0-9]{8}$/,
         age: /^([1-9]|[1-9][0-9]|100)$/,
         password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,

         repassword: function () {
            let password = $("input").eq(4);
            let repassword = $("input").eq(5);
            if (password.val() == repassword.val()) {
               repassword.addClass("is-valid success"); 
               repassword.removeClass("is-invalid error"); 
               repassword.next().addClass("d-none");
               return true;
            } else {
               repassword.addClass("is-invalid error"); 
               repassword.removeClass("is-valid success"); 
               repassword.next().removeClass("d-none");
               return false;
            }
         },
         validTest: function (style, inputNum) {
            let inputs = $("input").eq(inputNum);
            console.log(inputNum);
            console.log(inputs);
            let checkType = style.test(inputs.val());
            if (checkType) {
               inputs.addClass("is-valid success"); 
               inputs.removeClass("is-invalid error"); 
               inputs.next().addClass("d-none");

               return true;
            } else {
               inputs.addClass("is-invalid error"); 
               inputs.removeClass("is-valid success"); 
               inputs.next().removeClass("d-none");
               return false;
            }
         },
      };

      $("form").on("input", function () {
         if (
            valid.validTest(valid.name, 0) &&
            valid.validTest(valid.email, 1) &&
            valid.validTest(valid.phone, 2) &&
            valid.validTest(valid.age, 3) &&
            valid.validTest(valid.password, 4) &&
            valid.repassword()
         ) {
            $("button").removeAttr("disabled");
         } else {
            $("button").attr("disabled", true);
         }
      });
   }

   showMenu();
}

// Get Api By Name and By Title
async function getSearch(meal, url, section) {
   $(".loading").removeClass("d-none");
   let ApiResult = await fetch(`${url}${meal}`);

   let listData = (await ApiResult.json()).meals;

   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 300);
   displayMeals(listData, section);
}

// api filter Category
async function filterCategory(letter, char) {
   $(".loading").removeClass("d-none");
   let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${char}=${letter}`);
   let result = (await data.json()).meals;
   $(".loading").addClass("d-none");
   displayMeals(result, "content");
}

// api filter area
async function area() {
   $(".loading").removeClass("d-none");
   let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list
      `
   );
   let result = (await data.json()).meals.slice(0, 20);
   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 500);

   
   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `
  
     
  
      <div class="col">
    <div class="item open-card  rounded p-4 " onclick="filterCategory('${result[i].strArea}','a')">
        <div class="image position-relative text-center">
    <i class="fa-solid fa-city fa-3x text-danger"></i>
    
    <div >
    <p class="text-white fw-semibold fs-5 ">${result[i].strArea}</p>
    
            </div>
        </div>
    </div>
    </div>
      `;
   }

   $("#content").html(`
  <div
  class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-5"
  
 >
 ${cartona}
 </div> 
 
  `);
}

// api filter ingredient
async function ingredient() {
   $(".loading").removeClass("d-none");
   let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list
       `
   );
   let result = (await data.json()).meals.slice(0, 20);
   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 500);
  
   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `
   
      
   
       <div class="col">
     <div class="item h-100 open-card rounded p-4 " onclick="filterCategory('${result[i].strIngredient}','i')">
         <div class="image position-relative text-center">
     <i class="fa-solid fa-bowl-food fa-3x text-success bg-opacity-10"></i>
     
     <div >
     <h3>${result[i].strIngredient}</h3>
     <p class="text-white small">${result[i].strDescription.split(" ", 10).join(" ")}</p>
     
             </div>
         </div>
     </div>
     </div>
       `;
   }

   $("#content").html(`
   <div
   class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-5"
   
  >
  ${cartona}
  </div> 
  
   `);
}

//Display Category  or Area or Ingredients
async function getCategory() {
   $(".loading").removeClass("d-none");
   let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   let result = (await apiData.json()).categories;
   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 500);
  
   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `

  
   <div class="col">
 <div class="item open-card text-dark " onclick="filterCategory('${result[i].strCategory}','c')">
     <div class="image position-relative">
<div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${result[i].strCategoryThumb}"></div>
 
 <div class="layer position-absolute end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 ">



 <h3 class="align-self-center">${result[i].strCategory}</h3>



 <p class=" small ">${result[i].strCategoryDescription.split(" ", 15).join(" ")}</p>
 
         </div>
     </div>
 </div>
 </div>
   `;
   }

   $("#content").html(`
 <div
 class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-5"
 
>
${cartona}
</div> 

 `);
}

// Display Data
function displayMeals(dataAray, section = "content") {
  
   let cartona = ``;
   for (let i = 0; i < dataAray.length; i++) {
      cartona += `

   

    <div class="col">
  <div class="item open-card " onclick="getDetails(${dataAray[i].idMeal},'${section}')">
      <div class="image position-relative">
      <div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${dataAray[i].strMealThumb}"></div>
 
  
  <div class="layer position-absolute end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 ">
  <p class="text-dark fw-semibold fs-5 ">${dataAray[i].strMeal}</p>
  
          </div>
      </div>
  </div>
  </div>
    `;
   }

   $(`#${section}`).html(`
  <div
  class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center"
  
>
${cartona}
</div> 
 
  `);
}

// Display Data By Id Get Details
async function getDetails(id, section) {
   $(".loading").removeClass("d-none");
   console.log(id, section);
   let apiDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   let resultDetails = (await apiDetails.json()).meals[0];
   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 500);

   // Content Area Details
   $(`#${section}`).html(`
   <div class="row g-4">
   <div class="col-md-4">
     <div class="image ratio ratio-4x3">
       <img loading="lazy"
         class="w-100"
         src="${resultDetails.strMealThumb}"
         alt=""
       />
       <h3 class="h5 text-center mt-3 lead">
         ${resultDetails.strMeal}
       </h3>
     </div>
   </div>
   <div class="col-md-8">
     <h3 class="lh">Instructions</h3>
     <p class="pt-3">
      ${resultDetails.strInstructions}
     </p>
     <h4>Area : <span class="fw-light">${resultDetails.strArea}</span></h4>
     <h4>Category : <span class="fw-light">${resultDetails.strCategory}</span></h4>
     <h4 class="recipes-title">Recipes :</h4>

     <ul class="d-flex flex-wrap mt-4 gap-3" id="recipes">
      
     </ul>
     <h4  class="tags-title">Tags :</h4>

     <ul class="d-flex flex-wrap mt-4 gap-3" id="tags">
      
     </ul>


   <div class="hstack mt-4 gap-2">
     <a href="${resultDetails.strSource}" target="_blank" class="btn btn-secondary">Source</a>
     <a href="${resultDetails.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
     
   </div>

   </div>
 </div>
   `);

   // Content Area Details Recipes
   let recipes = ``;

   for (let i = 1; i <= 20; i++) {
      if (resultDetails[`strIngredient${i}`]) {
         recipes += `
      
      <li class="badge bg-success bg-opacity-50 p-2 fw-light fs-6">
      ${resultDetails[`strMeasure${i}`]}${resultDetails[`strIngredient${i}`]}
    </li>
      
      `;
      }
   }

   if (!recipes) {
      $(".recipes-title").addClass("d-none");
   }

   // Content Area Details Tags
   let tagsArray = resultDetails.strTags?.split(","); 
   if (!tagsArray) {
      $(".tags-title").addClass("d-none");
   }
   let tags = ``;
   for (let i = 0; i < tagsArray?.length; i++) {
      tags += `
      
      <li class="badge bg-danger bg-opacity-50 p-2 fw-light fs-6">
      ${tagsArray[i]}
    </li>
      `;
   }

   // Content Area Details Add Tags and recips
   $("#recipes").html(recipes);
   $("#tags").html(tags);
}

