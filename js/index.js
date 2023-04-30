"use strict";

const searchForm = document.querySelector(".search form");
searchForm.addEventListener("submit", searchHandler);

const generateImagesBtn = document.querySelector("#generateImage");
generateImagesBtn.addEventListener("click", generateImagesHandler);

const errorCloserBtn = document.querySelector(".error-container .closer");
errorCloserBtn.addEventListener("click", errorCloserHandler);
