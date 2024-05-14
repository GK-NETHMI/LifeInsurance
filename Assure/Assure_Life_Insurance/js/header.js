img = "";
PEname = "";

function includeHeader() {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == 0) {
                    loadHeader(1);
                } else {
                    PEname = JSON.parse(this.responseText)[0];
                    img = JSON.parse(this.responseText)[1];
                    loadHeader(2);
                }
            }
        }
    }
    xmlHttp.open("GET", "php/header.php?id=1", true);
    xmlHttp.send();
}

function loadHeader(id) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("header").innerHTML = this.responseText;
                if (id == 2)
                    loadHeaderValues();
            }
        }
    }
    if (id == 1) {
        xmlHttp.open("GET", "utils/header.html", true);
    } else {
        xmlHttp.open("GET", "utils/header2.html", true);
    }
    xmlHttp.send();
}

function loadHeaderValues() {
    document.getElementById("uName").innerHTML = PEname;
}

function toggle() {

    let profileDropdownList = document.querySelector(".profile-dropdown-list");
    let btn = document.querySelector(".dropdown-btn");

    profileDropdownList.classList.toggle('active');
    if (!btn.contains(document.getElementById("dropdown-b")))
        profileDropdownList.classList.remove("active");
}

function includeFooter(fNo) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("footer").innerHTML = this.responseText;
            }
        }
    }
    if (fNo == 1) {
        xmlHttp.open("GET", "utils/footer1.html", true);
    } else {
        xmlHttp.open("GET", "utils/footer2.html", true);
    }
    xmlHttp.send();
}

function logout() {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.readyState == 4 && this.status == 200) {
                window.location = "index.html";
            }
        }
    }
    xmlHttp.open("GET", "php/header.php?id=2", true);
    xmlHttp.send();
}

function viewProfile() {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.readyState == 4 && this.status == 200) {
                if(this.responseText == 1){
                    window.location = "customerProfile.html";
                }else if(this.responseText == 2){
                    window.location = "employeeProfile.html";
                }
            }
        }
    }
    xmlHttp.open("GET", "php/header.php?id=3", true);
    xmlHttp.send();
}