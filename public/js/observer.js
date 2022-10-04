function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > prevRatio) {
        entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
        } else {
        entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
        }
        prevRatio = entry.intersectionRatio;
    });
    }


// let conteiner = document.getElementById("conteBalls");
// let options = {
//     root:conteiner
// };
// function visto  (conteiner) {
//     conteiner.className += " animate__animated animate__backInLeft";
// }
// let observer = new IntersectionObserver(visto(conteiner),options);
// observer.observe(conteiner);
