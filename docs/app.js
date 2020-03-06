const application_id = "1510e1d52b056bc47b8e884e0a9f6ad2";
const baseUrl = "https://api.worldoftanks.eu/wot/";
let account_id;

function getId() {
    let x = String(document.getElementById("nameInput").value);
    console.log(x);
    let url = "https://api.worldoftanks.eu/wot/account/list/?application_id=" + application_id + "&search=" + x;
    console.log(url);
    let obj = JSON.parse(String(httpGet(url)));
    account_id = obj.data[0].account_id;
    document.getElementById("textField").innerHTML = "account_id: " + account_id;
}

function login() {
    let x = String(document.getElementById("idInput").value);
    let url = baseUrl + "auth/login/?application_id=" + application_id;
    let xhr = createCORSRequest("GET", url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    xhr.onload = function() {
        console.log(xhr.responseText);
    };
    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };
    xhr.send();
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }