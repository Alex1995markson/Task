const {google} = require('googleapis');
const keys = require('./client_acc.json');
const listCity = require('list-of-us-cities');
let rightJson = [];


const client = new google.auth.JWT(
    keys.client_email, 
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens){
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("Connected!");
        gsrun(client);
    }
});

async function gsrun(cl) {
    const gsapi = google.sheets({version:'v4', auth: cl});

    const opt = {
        spreadsheetId: '1d3iz0Ryt2tEB5R5hLFyeXjBEUUEVP9XFhuZEGAZLRDE',
        range: 'Data!A2:A5'
    };

    var data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;
    dataArray.forEach(str => {
        getRightString(str);
    }); 
    console.log(rightJson);
    // console.log("lol:",typeof dataArray);
    // let newData = dataArray.map(function(r) {
    //     return getRightString(r);
    // });


    function getRightString(str) {
        //console.log(typeof str);
        let empty = " ";
        let id = "";
        let lastCode = "";
        let whitespaceAfterNumberPos;
        let StateUs = "";
        let CityName ="";
        let Street = "";
        let partStreet ="";
        let CityNameAct = "";
    
        //console.log(str);
        let arr = Object.values(str).toString().split("");
        console.log("wew: ",arr);
        whitespaceAfterNumberPos=findPos(arr, 0, empty);
        id=makeNewStr(arr,whitespaceAfterNumberPos).join("");
        whitespaceAfterNumberPos=findPos(arr, arr.length-1, empty, true);
        lastCode = makeNewStr(arr, whitespaceAfterNumberPos, true).join("").trim();
        arr = deleteCharacter(arr.join(" "));
        StateUs = (arr[arr.length-2] + arr[arr.length-1]).toUpperCase();
        arr = deleteEmptyValue(deleteCharacter(arr,2));
    
        // console.log("After:",arr);
        whitespaceAfterNumberPos = findSity(arr,empty);
        CityName =titleCase(makeWord(arr.splice(whitespaceAfterNumberPos, arr.length-1)));
        //console.log(CityName);
       
        if (checkInDictonary(CityName)) {
            console.log("flag:", checkInDictonary(CityName));
        }
        else {
            let whitespace = CityName.indexOf(' ');
            if (whitespace != -1) {
                partStreet = CityName.split("").splice(0, whitespace).join("");
                CityNameAct = CityName.split("").splice(whitespace, CityName.length-1).join("");
            }
        }
    
        rightJson.push([(id + " " + arr.join("") + " " + partStreet + " " + CityNameAct + " " + StateUs + " " + " " + lastCode)]);
        // console.log(rightJson);
        
    
    }
    function findPos(arr, start = 0, elem, revLoop=false) {
        if (!revLoop) {
            for(let i = start; i < arr.length; i++) {
                if (arr[i] == elem) {
                    return i;
                }
            }
        }
        else if (revLoop) {
            for(let i = start; i >= 0; i--) {
                if (arr[i] == elem) {
                    return i;
                } 
            }
        }
    
    }
    function makeNewStr(arr, pos, revLoop=false) {
        let Nstr;
        if (!revLoop) {
            Nstr = arr.splice(0, pos); // start postion;
            arr.splice(0,1);
            return Nstr;
        }
        else if (revLoop) {
            Nstr = arr.splice(pos, arr.length-1);
            return Nstr; 
        }
    }
    function deleteCharacter(strA, count) {
        if (count == undefined) {
            var regex = /[.|,]/g;
            strA = strA.replace(regex, '');
            arr = strA.trimEnd().split(" ");
            // if (arr[arr.length-1].includes(''))
            //     arr.splice(arr.length-1, 1);
            return arr;
        }
        else if (count) {
            arr.splice(arr.length-count);
            return arr;   
        }
    
    }
    function deleteEmptyValue(str) {
        var regex = new RegExp("[A-Za-z]", "g");
        for(var i = str.length-1; i >= 0; i--) {
            if (regex.test(str[i])) {
                break;
            }
            str.splice(i,1);
        }
        return str;
    }
    function findSity(arr, empty) {
        let count = 4;
        let pos;
        for(var y = arr.length-1; y >= 0 && count > 0; y--) {
            // console.log(arr[y]);
            if (arr[y] == '') {
                count--;
                pos = y;
            }
        }
        return pos;
        
    }
    function makeWord(cityN) {
        let newWord="";
        cityN.toString().trim();
        for(var i=0; i < cityN.length; i++) {
            
            if (cityN[i] == "" && cityN[i+1] == "" && i != 0) {
                newWord += " ";
            }
            else if (cityN[i] == "")
                continue;
            newWord += cityN[i];
        }
        return newWord;
    }
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' '); 
    }
    function checkInDictonary(str) {
        if (listCity.indexOf(str) != -1) 
            return true;
        else {
            return false
            // let str1 = deletePartOfStr(str);
            // str1 = str1.join("");
            // if (listCity.indexOf(str1) != -1) {
            //     return true;
            // }
            // else return false;
        }
    }
    function deletePartOfStr(str) {
        let whitespaceIndex = str.indexOf(" ");
        str = str.split("");
        str.splice(0,4+1);
        // console.log(typeof str);
        return str;
    }

    const updateopt = {
        spreadsheetId: '1d3iz0Ryt2tEB5R5hLFyeXjBEUUEVP9XFhuZEGAZLRDE',
        range: 'Data!E2',
        valueInputOption: 'USER_ENTERED',
        resource: { values: rightJson }
    };
    
    let res = await gsapi.spreadsheets.values.update(updateopt);

    // console.log(responce);
}