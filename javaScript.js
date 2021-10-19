console.log("Dictionary App");
var str = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let btnsubmit = document.getElementById("btnsubmit").addEventListener('click',DisplayMeaning);
function DisplayMeaning(e){
    console.log("meaning : ");
    e.preventDefault()

    str += document.getElementById("inputWord").value;
    console.log(str);
    
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET',str,true);

    xhr.onload = function(){
        if(this.status == 200){
            let obj = JSON.parse(this.responseText);
            console.log(obj); 
            let list = document.getElementById("display");
            let audio = document.getElementById("aud1");
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
        else
            console.log("Sorry the word you are looking for not found");
    }
    xhr.send();
    str = "https://api.dictionaryapi.dev/api/v2/entries/en/";
}