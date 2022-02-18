"use strict";

// my account button ------------------------------
const myAccountBtn = document.querySelector(".account_holder");

if(myAccountBtn){
  myAccountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".log_sign").classList.toggle("log_sign_click");
  });
}

// hamburger button --------------------------------
const hambergerMenu = document.querySelector(".hamburger_menu");

hambergerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  document
    .querySelector(".mobile_view")
    .classList.toggle("display_mobile_view");

});

// input autocomplete -------------------------------

// 1--------
import { airports } from "./location.js";

let searchable = [];

airports.forEach((loc) => {
  searchable.push(loc.city_name);
});

const searchInput1 = document.querySelector(".search1");
const searchResults1 = document.querySelector(".results1");

const renderResults1 = (results) => {
  if (!results.length) {
    searchResults1.classList.remove("show");
  }

  let content = results
    .map((item) => {
      return "<li class='hovering1'>" + item + "<li>";
    })
    .join("");

  searchResults1.classList.add("show");

  searchResults1.innerHTML = content;

  // putting the value from the list into yhe input 
  const searchArray1 = document.querySelectorAll(".hovering1");

  searchArray1.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.preventDefault();
      const value=i.closest('.hovering1')
      document.querySelector('.search1').value=value.innerHTML
    });
  });
};

if(searchInput1){
searchInput1.addEventListener("keyup", () => {
  let results = [];
  let input = searchInput1.value;

  if (input.length) {
    results = searchable.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    });

    renderResults1(results);
  }
});
}

if(searchInput1){
document.querySelector('body').addEventListener('click',()=>{
  searchResults1.classList.remove("show");
})}

// 2------------

const searchInput2 = document.querySelector(".search2");
const searchResults2 = document.querySelector(".results2");

const renderResults2 = (results) => {
  if (!results.length) {
    searchResults2.classList.remove("show");
  }

  let content = results
    .map((item) => {
      return "<li class='hovering2'>" + item + "<li>";
    })
    .join("");

  console.log(content);
  searchResults2.classList.add("show");

  searchResults2.innerHTML = content;

  // putting the value from the list into yhe input 
  const searchArray2 = document.querySelectorAll(".hovering2");

  searchArray2.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.preventDefault();
      const value=i.closest('.hovering2')
      document.querySelector('.search2').value=value.innerHTML
    });
  });

};

if(searchInput2){ 
searchInput2.addEventListener("keyup", () => {
  let results = [];
  let input = searchInput2.value;

  if (input.length) {
    results = searchable.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    });

    renderResults2(results);
  }
});
}

if(searchInput2){ 
document.querySelector('body').addEventListener('click',()=>{
  searchResults2.classList.remove("show");
})}
