console.log("Dictionary App");

let btnsubmit = document.getElementById("btnsubmit").addEventListener('click',DisplayMeaning);  //submit btn variable

//function to display the meaning of word.
function DisplayMeaning(e){
    console.log("meaning : ");
    e.preventDefault()
    var str = "https://api.dictionaryapi.dev/api/v2/entries/en/";  //url request to fetch api
    str += document.getElementById("inputWord").value;  //url request to fetch api;
    console.log(str);
    //a constant use to call api, the below used object-fields lie under ajax
    const xhr = new XMLHttpRequest();    
    
    xhr.open('GET',str,true);

    xhr.onload = function(){
        if(this.status == 200){
            let obj = JSON.parse(this.responseText);
            console.log(obj); 
            let list = document.getElementById("display");
            s = "";
            for(key in obj){
                for(l in obj[key].meanings){
                    console.log("parts of speech: " +  obj[key].meanings[l].partOfSpeech + "\nmeaning: "+ obj[key].meanings[l].definitions[0].definition + " \nexample: " + obj[key].meanings[l].definitions[0].example);
                    s += "part of speech : "
                    s += `<b>${obj[key].meanings[l].partOfSpeech}</b>;<br>`;
                    
                    s += "meaning : ";
                    s += `<b>${obj[key].meanings[l].definitions[0].definition}</b>;<br>`;

                    if(obj[key].meanings[l].definitions[0].example != undefined){
                        s += "example : ";
                        s += `<b>${obj[key].meanings[l].definitions[0].example}</b>;<br>`;
                    }
                    if(obj[key].meanings[l].definitions[0].synonyms != undefined){
                        s += "synonyms : ";
                        s += `<b>${obj[key].meanings[l].definitions[0].synonyms.slice(0,5)}</b>;<br>`;
                    }
                    if(obj[key].meanings[l].definitions[0].antonyms != undefined){
                        s += "antonyms : ";
                        s += `<b>${obj[key].meanings[l].definitions[0].antonyms.slice(0,5)}</b>;<br><br>`;
                    }
                }
            }
            list.innerHTML = s;
        }
        else{
            console.log("Sorry the word you are looking for not found");
            document.getElementById("display").innerHTML = "<b>Sorry the word you are looking for not found</b>";
        }
    }
    xhr.send();
    str = "https://api.dictionaryapi.dev/api/v2/entries/en/";
}