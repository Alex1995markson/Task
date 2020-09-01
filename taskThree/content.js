const regex = /sea/g;
function highlight() {
  
let text = document.querySelectorAll("p,li,h1,h2,h3,h4,h5,a");
let k = [];
  for(let i=0; i < text.length-1;i++) {
    let arr = text[i].innerHTML.split(" ");
    for(var y = 0; y < arr.length-1;y++) {
       if (regex.test(arr[y])) {
          arr[y] = `<span class="highlight">${arr[y]}</span>`;
       }
    }
    text[i].innerHTML = arr.join(" ");

    }
}
highlight();