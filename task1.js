let arr = [1,2,7,5,6,4,8];

let swap;
for(let i = 0; i < arr.length; i++) {
    if (isOdd(arr[i])) {
        for(let y = i+1; y < arr.length; y++ ) {
            if (isOdd(arr[y])){
                if (arr[i] < arr[y]) {
                    swap = arr[y];
                    arr[y] = arr[i];
                    arr[i] = swap;
                }

            }
        }
    }
    else if (isEven(arr[i])) {
        for(let y = i+1; y < arr.length; y++ ) {
            if (isEven(arr[y])){
                if (arr[i] > arr[y]) {
                    swap = arr[y];
                    arr[y] = arr[i];
                    arr[i] = swap;
                }

            }
        }
    }
}
function isOdd(x) {
    if (x % 2 != 0 || x == 1) 
        return true;
}
function isEven(x) {
    if (x % 2== 0)
        return true;
}
console.log(arr);