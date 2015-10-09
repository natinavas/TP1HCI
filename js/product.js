


document.getElementById("picture2").addEventListener("mouseover", function(){hover("picture2")});
document.getElementById("picture2").addEventListener("mouseout", function(){hover("picture2")});
document.getElementById("picture3").addEventListener("mouseover", function(){hover("picture3")});
document.getElementById("picture3").addEventListener("mouseout", function(){hover("picture3")});
document.getElementById("picture4").addEventListener("mouseover", function(){hover("picture4")});
document.getElementById("picture4").addEventListener("mouseout", function(){hover("picture4")});
document.getElementById("picture5").addEventListener("mouseover", function(){hover("picture5")});
document.getElementById("picture5").addEventListener("mouseout", function(){hover("picture5")});


function hover(picture) {
    imagen1 = document.getElementById(picture).src;
    document.getElementById(picture).src = document.getElementById("mainPicture").src;
    document.getElementById("mainPicture").src = imagen1;
}
