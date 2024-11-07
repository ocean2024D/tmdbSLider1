//SWIPER

var swiper = new Swiper(".mySwiper1", {
    slidesPerView: 4,
    spaceBetween: 35,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper1-button-next",
        prevEl: ".swiper1-button-prev",
    },
    pagination: {
        el: ".swiper1-pagination",
        clickable: true,
    },
});

var swiper = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    spaceBetween: 35,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper2-button-next",
        prevEl: ".swiper2-button-prev",
    },
    pagination: {
        el: ".swiper2-pagination2",
        clickable: true,
    },
});


var swiper = new Swiper(".mySwiper3", {
    slidesPerView: 4,
    spaceBetween: 35,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper3-button-next",
        prevEl: ".swiper3-button-prev",
    },
    pagination: {
        el: ".swiper3-pagination3",
        clickable: true,
    },
});


//Dropdown Menu


function myFunction(dropdownNumber) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("show");
    }


    var dropdown = document.getElementById("myDropdown" + dropdownNumber);
    dropdown.classList.toggle("show");
}


window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
} 

//POPUP MOVIE DETAIL

let modal2 = document.getElementById("Modal2");

let btn2 = document.getElementById("modal2-Btn");

let span2 = document.getElementsByClassName("close2")[0];


btn2.onclick = function () {
    event.preventDefault();
    modal2.style.display = "block";
}

span2.onclick = function () {
    modal2.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}