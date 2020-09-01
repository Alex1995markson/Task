let arr_word = [];
const regex = /^[rR]/g;

window.addEventListener('DOMContentLoaded', makeCopyElement => {
    let first_para = document.getElementById('childElement');
    let arr_word = first_para.innerHTML.split(" ");
  
    let sp1 = document.createElement("span");
    for(var i = 0; i < arr_word.length; i++) {
        let str = arr_word[i];
        if (str.match(regex)) {
            console.log(str);
            str = str.split("").reverse().join("") + " ";
            console.log(typeof str);
            tagNew=addTag(str);
            sp1.appendChild(tagNew);
        }
        else {
            sp1.innerHTML +=str + " ";   
        }
    }
    console.log(sp1.innerHTML);
    sp1.innerHTML = sp1.innerHTML.replace(/[rR]$/g, '<strong>lol</strong>');
  
    let sp2 = document.getElementById("childElement");

    insertAfter(sp1,sp2);
});
function addTag(tag) {
    var para = document.createElement("span");
    var node = document.createTextNode(tag);
    para.setAttribute("class", "dda");
    para.appendChild(node);
    return para;
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}