let modal = document.getElementById("myModal");

let img = document.getElementById("myImg");
let btn  = document.getElementById("myBtn");
let modalImg = document.getElementById("img01");

img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
}

btn.onclick = function () {
    modal.style.display = "block";
    modalImg.src = img.src;
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}