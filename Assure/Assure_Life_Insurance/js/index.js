let slideIndex = 1;
//showSlide(slideIndex);

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    const slides = document.querySelector('.slides').getElementsByTagName('img');

    if (n > slides.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'block';
}

function loadNews() {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.readyState == 4 && this.status == 200) {
                var news = JSON.parse(this.responseText);
                for(i=0; i<news.length; i++){
                    document.getElementById("news-tag").innerHTML += "<img src = newsfeed/"+news[i]+">";
                }
            }
        }
    }
    xmlHttp.open("POST", "php/loadNews.php", true);
    xmlHttp.send();
}


/*
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    $('.hero_content .hero_box').css('background-position', 'center ' + scrollTop / 2 + 'px');
});

 */

