window.addEventListener("load", function(){
    let dropProducts = document.querySelector(".products");
    let dropdown = document.querySelector(".drop-down");

    dropProducts.addEventListener("mouseover", function(){
        dropdown.style.display = "block"
    })

    dropdown.addEventListener("mouseover", function(){
        dropdown.style.display = "block"
    })

    dropProducts.addEventListener("mouseout", function(){
        dropdown.style.display = "none"
    })

    dropdown.addEventListener("mouseout", function(){
        dropdown.style.display = "none"
    })

})