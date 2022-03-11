function totalClick(click){
    const chooseQuantity = document.getElementById("quantity");
    
    const addOrRemove = parseInt(chooseQuantity.innerText) + click;
    chooseQuantity.innerText = addOrRemove
    
    if(addOrRemove < 1){
        chooseQuantity.innerText = 1
    };

}
