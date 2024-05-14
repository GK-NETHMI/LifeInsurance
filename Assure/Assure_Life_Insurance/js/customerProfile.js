function view(id) {

    document.getElementById("view-info").hidden = true;
    document.getElementById("view-policy").hidden = true;
    document.getElementById("pay-premium").hidden = true;
    document.getElementById("request-claim").hidden = true;
    document.getElementById("send-enquiry").hidden = true;
    document.getElementById("notification").hidden = true;
    document.getElementById("your-feedback").hidden = true;
    document.getElementById("btn1").style = "border: none;";
    document.getElementById("btn2").style = "border: none;";
    document.getElementById("btn3").style = "border: none;";
    document.getElementById("btn4").style = "border: none;";
    document.getElementById("btn5").style = "border: none;";
    //document.getElementById("btn6").style = "border: none;";
    document.getElementById("btn7").style = "border: none;";
    switch (id) {
        case 1:
            document.getElementById("view-info").hidden = false;
            document.getElementById("btn1").style = "border: 3px solid black;";
            break;
        case 2:
            document.getElementById("view-policy").hidden = false;
            document.getElementById("btn2").style = "border: 3px solid black;";
            break;
        case 3:
            document.getElementById("pay-premium").hidden = false;
            document.getElementById("btn3").style = "border: 3px solid black;";
            break;
        case 4:
            document.getElementById("request-claim").hidden = false;
            document.getElementById("btn4").style = "border: 3px solid black;";
            break;
        case 5:
            document.getElementById("send-enquiry").hidden = false;
            document.getElementById("btn5").style = "border: 3px solid black;";
            break;
//        case 6:
//            document.getElementById("notification").hidden = false;
//            document.getElementById("btn6").style = "border: 3px solid black;";
//            break;
        case 7:
            document.getElementById("your-feedback").hidden = false;
            document.getElementById("btn7").style = "border: 3px solid black;";
            break;
    }

}
//--------------------------------------------Load Initial Data Start-----------------------------------------
function checkUser() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            user = JSON.parse(this.responseText);
            setUserPrivileges(user['u_type']);
        }
    };
    xmlHttp.open("POST", "php/customerProfile/checkUser.php", true);
    xmlHttp.send();
}
//--------------------------------------------Load Initial Data End-----------------------------------------

//--------------------------------------------Set Values accoriding to Privileges Start-----------------------------------------
function setUserPrivileges(u_type) {

    document.getElementById('name').value = user['full_name'];
    document.getElementById('nic').value = user['nic'];
    document.getElementById('gender').value = user['gender'];
    document.getElementById('dob').value = user['dob'];
    document.getElementById('ms').value = user['marital_status'];
    document.getElementById('address').value = user['address'];
    document.getElementById('mobile').value = user['mobile'];
    document.getElementById('email').value = user['email'];
    document.getElementById('dp').src = user['img'];
    document.getElementById('enquiry-id').value = user['eid'];
    document.getElementById('claim-id').value = "CLM"+user['cid'];
    document.getElementById('feedback-id').value = user['fbid'];
    var intU_type = Number(u_type);
    switch (intU_type) {
        case 3:
            document.getElementById('occupation').value = user['occupation'];
            document.getElementById('wPlace').value = user['work_company'];
            document.getElementById('premium-id').value = user['prid'];
            var actPol = user['actPol'];
            actPol.forEach((element) => {

                document.getElementById("policy-container").innerHTML +=
                        '<div class="view-act-policy">\n\
                                <div class="view-act-policy-topic">' + element.policy_name + '</div>\n\
                                <div class="view-act-policy-content">Premium : ' + element.premium + '</div>\n\
                                <div class="view-act-policy-content">Last Payed Month : ' + element.month + '</div>\n\
                                <div class="view-act-policy-content">Start Date : ' + element.date + ' Years</div>\n\
                                <div class="view-act-policy-content">Duration : ' + element.duration + '</div>';

                document.getElementById("act-policy-name-premium").innerHTML += "<option value=" + element.p_id + ">" + element.policy_name + "</option>";
                document.getElementById("act-policy-name-claim").innerHTML += "<option value=" + element.p_id + ">" + element.policy_name + "</option>";
            });
            break;
        case 4:
            document.getElementById('edit-btn').disabled = true;
            document.getElementById('edit-btn').className += " unUsable";
            document.getElementById('occupation').disabled = true;
            document.getElementById('wPlace').disabled = true;
            document.getElementById('btn2').disabled = true;
            document.getElementById('btn3').disabled = true;
            document.getElementById('btn2').className += " unUsable";
            document.getElementById('btn3').className += " unUsable";
            document.getElementById("act-policy-name-claim").innerHTML += "<option value=" + user.p_id + ">" + user.policy_name + "</option>";
            break;
    }
}
//--------------------------------------------Set Values accoriding to Privileges End-----------------------------------------

function policySelected() {
    var selected = document.getElementById('act-policy-name-premium').value;
    if (selected == 0) {
        document.getElementById('amount').value = "";
    } else {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == 0) {
                    window.location = "index.html";
                } else {
                    var response = JSON.parse(this.responseText);
                    document.getElementById('amount').value = response['premium'];

                }
            }
        };
        xmlHttp.open("GET", "php/customerProfile/payPremium.php?policy_id=" + selected, true);
        xmlHttp.send();
    }
}

function validatePremium(option) {
    var state = true;
    if (option === 1) {

        if (document.getElementById('act-policy-name-premium').value === "0") {
            document.getElementById('act-policy-name-premium').style = "border: 1.5px solid red;";
            state = false;
        }
        if (document.getElementById('card-no').value === "") {
            document.getElementById('card-no').style = "border: 1.5px solid red;";
            state = false;
        }
        if (document.getElementById('card-name').value === "") {
            document.getElementById('card-name').style = "border: 1.5px solid red;";
            state = false;
        }
        if (document.getElementById('cvc').value === "") {
            document.getElementById('cvc').style = "border: 1.5px solid red;";
            state = false;
        }
        if (document.getElementById('expiry').value === "") {
            document.getElementById('expiry').style = "border: 1.5px solid red;";
            state = false;
        }

    } else {
        if (document.getElementById('bank-slip').files.length == 0) {
            document.getElementById('bank-slip').style = "border: 1.5px solid red;";
            state = false;
        }
    }

    return state;
}

function validateClaim() {
    var state = true;
    if (document.getElementById('act-policy-name-claim').value === "0") {
        document.getElementById('act-policy-name-claim').style = "border: 1.5px solid red;";
        state = false;
    }
    if (document.getElementById('cause').value === "") {
        document.getElementById('cause').style = "border: 1.5px solid red;";
        state = false;
    }
    if (document.getElementById('date').value === "") {
        document.getElementById('date').style = "border: 1.5px solid red;";
        state = false;
    }
    if (document.getElementById('place').value === "") {
        document.getElementById('place').style = "border: 1.5px solid red;";
        state = false;
    }
    if (document.getElementById('hospital').value === "") {
        document.getElementById('hospital').style = "border: 1.5px solid red;";
        state = false;
    }
    if (document.getElementById('ward').value === "") {
        document.getElementById('ward').style = "border: 1.5px solid red;";
        state = false;
    }
    if (document.getElementById('comment').value === "") {
        document.getElementById('comment').style = "border: 1.5px solid red;";
        state = false;
    }
    return state;
}

function validateEnquiry() {
    var state = true;
    if (document.getElementById('enquiry-text').value == "") {
        document.getElementById('enquiry-text').style = "border : 1.5px solid red;";
        state = false;
    }
    return state;
}

function validateFeedback() {
    var state = true;
    if (document.getElementById('feedback-text').value == "") {
        document.getElementById('feedback-text').style = "border : 1.5px solid red;";
        state = false;
    }
    return state;
}

function validateInfo() {
    var status = true;
    var ms = document.getElementById('ms').value;
    var address = document.getElementById('address').value;
    var mobile = document.getElementById('mobile').value;
    var email = document.getElementById('email').value;
    var occupation = document.getElementById('occupation').value;
    var wPlace = document.getElementById('wPlace').value;

    if (ms == "") {
        document.getElementById('ms').style = "border : 1.5px solid red;";
        status = false;
    }
    if (address == "") {
        document.getElementById('address').style = "border : 1.5px solid red;";
        status = false;
    }
    if (mobile == "") {
        document.getElementById('mobile').style = "border : 1.5px solid red;";
        status = false;
    }
    if (email == "") {
        document.getElementById('email').style = "border : 1.5px solid red;";
        status = false;
    }
    if (occupation == "") {
        document.getElementById('occupation').style = "border : 1.5px solid red;";
        status = false;
    }
    if (wPlace == "") {
        document.getElementById('wPlace').style = "border : 1.5px solid red;";
        status = false;
    }
    if (/\d/.test(ms.toString())) {
        document.getElementById("ms").style = "background-color: red;";
        status = false;
    }

    if (!mobile.toString().match(/^\d{10}$/)) {
        document.getElementById("mobile").style = "background-color: red;";
        status = false;
    }

    var atpos = email.toString().indexOf("@");
    var dotpos = email.toString().lastIndexOf(".");
    if (atpos < 1 || (dotpos - atpos < 2)) {
        document.getElementById("email").style = "background-color: red;";
        status = false;
    }

    if (/\d/.test(occupation.toString())) {
        document.getElementById("occupation").style = "background-color: red;";
        status = false;
    }

    if (/\d/.test(wPlace.toString())) {
        document.getElementById("wPlace").style = "background-color: red;";
        status = false;
    }

    return status;
}

function changePic() {
    var img = document.getElementById("img").files[0];
    var fr = new FileReader();
    fr.onload = function () {
        document.getElementById('dp').src = fr.result;
    };
    fr.readAsDataURL(img);
}