//----------------------------------View Changing--------------------------------------
function view(id) {

    document.getElementById("view-info").hidden = true;
    document.getElementById("manage-customer").hidden = true;
    document.getElementById("new-customer").hidden = true;
    document.getElementById("approve-claim").hidden = true;
    document.getElementById("give-claim").hidden = true;
    document.getElementById("manage-employee").hidden = true;
    document.getElementById("enquiries").hidden = true;
    document.getElementById("news-feed").hidden = true;
    document.getElementById("testimonials").hidden = true;
    document.getElementById("btn1").style = "border: none;";
    document.getElementById("btn2").style = "border: none;";
    document.getElementById("btn3").style = "border: none;";
    document.getElementById("btn4").style = "border: none;";
    //document.getElementById("btn5").style = "border: none;";
    document.getElementById("btn6").style = "border: none;";
    document.getElementById("btn7").style = "border: none;";
    document.getElementById("btn8").style = "border: none;";
    document.getElementById("btn9").style = "border: none;";

    switch (id) {
        case 1:
            document.getElementById("view-info").hidden = false;
            document.getElementById("btn1").style = "border: 3px solid black;";
            break;
        case 2:
            document.getElementById("manage-customer").hidden = false;
            document.getElementById("btn2").style = "border: 3px solid black;";
            break;
        case 3:
            document.getElementById("new-customer").hidden = false;
            document.getElementById("btn3").style = "border: 3px solid black;";
            break;
        case 4:
            document.getElementById("approve-claim").hidden = false;
            document.getElementById("btn4").style = "border: 3px solid black;";
            break;
//        case 5:
//            document.getElementById("give-claim").hidden = false;
//            document.getElementById("btn5").style = "border: 3px solid black;";
//            break;
        case 6:
            document.getElementById("manage-employee").hidden = false;
            document.getElementById("btn6").style = "border: 3px solid black;";
            break;
        case 7:
            document.getElementById("enquiries").hidden = false;
            document.getElementById("btn7").style = "border: 3px solid black;";
            break;
        case 8:
            document.getElementById("news-feed").hidden = false;
            document.getElementById("btn8").style = "border: 3px solid black;";
            break;
        case 9:
            document.getElementById("testimonials").hidden = false;
            document.getElementById("btn9").style = "border: 3px solid black;";
            break;
    }

}

//----------------------------------------Load All Initial Data Start-------------------------------
function checkEmployee() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 0) {
                window.location = "index.html";
            } else {

                employee = JSON.parse(this.responseText);
                loadEmployeeData(employee);

                var userType = employee['u_type'];
                setEmployeePrivileges(userType);
            }
        }
    };
    xmlHttp.open("POST", "php/employeeProfile/checkEmployee.php", true);
    xmlHttp.send();
}
//----------------------------------------Load All Initial Data End-------------------------------

//---------------------------------------Load Employee Data Function Start---------------------------------
function setEmployeePrivileges(u_type) {

    customers = employee['customers'];
    loadCustomerManageData(customers);

    var newCustomers = employee['newCustomers'];
    loadNewCustomer(newCustomers);

    var approveClaims = employee['claims'];
    loadApproveClaimData(approveClaims);

    feedbacks = employee['feedbacks'];
    loadFeedbacks(feedbacks);

    enquiries = employee['enquiries'];
    enquirySort(1);

var intU_type = Number(u_type);
    switch (intU_type) {
        case 1:

            employees = employee['employees'];
            loadManageEmployeeData(employees);

            var newsfeed = employee['newsfeed'];
            loadAddNewsfeed(newsfeed);

            break;
        case 2:
            document.getElementById('btn6').disabled = true;
            document.getElementById('btn8').disabled = true;
            document.getElementById('btn9').disabled = true;
            document.getElementById('btn6').className += " unUsable";
            document.getElementById('btn8').className += " unUsable";
            document.getElementById('btn9').className += " unUsable";
            break;
    }
}
//---------------------------------------Load Employee Data Function Start---------------------------------

//---------------------------------------Load Employee Data Function Start---------------------------------
function loadEmployeeData(employee) {
    document.getElementById('name').value = employee['full_name'];
    document.getElementById('nic').value = employee['nic'];
    document.getElementById('gender').value = employee['gender'];
    document.getElementById('dob').value = employee['dob'];
    document.getElementById('ms').value = employee['marital_status'];
    document.getElementById('address').value = employee['address'];
    document.getElementById('mobile').value = employee['mobile'];
    document.getElementById('email').value = employee['email'];
    document.getElementById('dp').src = employee['img'];
}
//---------------------------------------Load Employee Data Function End-----------------------------------

//---------------------------------------Load Manage Customer Data Function Start----------------------------
function loadCustomerManageData(customers) {
    customers.forEach((element) => {
        document.getElementById('customer-table').innerHTML +=
                "<tr>\n\
                    <td>" + element.policy_holder_id + "</td>\n\
                    <td>" + element.full_name + "</td>\n\
                    <td>" + element.nic + "</td>\n\
                    <td>" + element.dob + "</td>\n\
                    <td>" + element.gender + "</td>\n\
                    <td>" + element.mobile + "</td>\n\
                    <td>" + element.email + "</td>\n\
                    <td>" + element.policies + "</td>\n\
                </tr>";

    });
}
//---------------------------------------Load Manage Customer Data Function End------------------------------

//---------------------------------------Load New Customer Data Function Start------------------------------
function loadNewCustomer(newCustomers) {
    cus_number = 0;
    newCustomers.forEach((element) => {
        cus_number++;
        var details = element.details;
        var beneficiary = element.beneficiary;
        var medical = element.medical;
        var additional = element.additional;
        var bank = element.bank;
        document.getElementById('new-customer').innerHTML +=
                "<div class='new-customer-full' id='new-customer-full'>\n\
                    <div class='new-customer-conatiner'>\n\
                        <div class='new-cus-topic'>Personal Details</div>\n\
                        <div class='new-cus-info'>Full Name: " + details.full_name + "</div>\n\
                        <div class='new-cus-info'>Initials Name: " + details.initials_name + "</div>\n\
                        <div class='new-cus-info'>NIC: " + details.nic + "</div>\n\
                        <div class='new-cus-info'>Date of Birth: " + details.dob + "</div>\n\
                        <div class='new-cus-info'>Gender: " + details.gender + "</div>\n\
                        <div class='new-cus-info'>Marital Status: " + details.marital_status + "</div>\n\
                        <div class='new-cus-info'>Address: " + details.address + "</div>\n\
                        <div class='new-cus-info'>Mobile: " + details.mobile + "</div>\n\
                        <div class='new-cus-info'>Email: " + details.email + "</div>\n\
                        <div class='new-cus-info'>Occupation: " + details.occupation + "</div>\n\
                        <div class='new-cus-info'>WorkPlace: " + details.work_company + "</div>\n\
                    </div>\n\
                    <div class='new-customer-conatiner'>\n\
                        <div class='new-cus-topic'>Beneficiary Details</div>\n\
                        <div class='new-cus-info'>Full Name: " + beneficiary.beneficiary_name + "</div>\n\
                        <div class='new-cus-info'>Initials Name: " + beneficiary.initials_name_beneficiary + "</div>\n\
                        <div class='new-cus-info'>NIC: " + beneficiary.nic + "</div>\n\
                        <div class='new-cus-info'>Date of Birth: " + beneficiary.dob + "</div>\n\
                        <div class='new-cus-info'>Gender: " + beneficiary.gender + "</div>\n\
                        <div class='new-cus-info'>Marital Status: " + beneficiary.marital_status + "</div>\n\
                        <div class='new-cus-info'>Address: " + beneficiary.address + "</div>\n\
                        <div class='new-cus-info'>Mobile: " + beneficiary.mobile + "</div>\n\
                        <div class='new-cus-info'>Email: " + beneficiary.email + "</div>\n\
                    </div>\n\
                    <div class='new-customer-conatiner'>\n\
                        <div class='new-cus-topic'>Medical Details</div>\n\
                        <div class='new-cus-info'>Question 01: " + answerConverter(medical.q1) + "</div>\n\
                        <div class='new-cus-info'>Question 02: " + answerConverter(medical.q2) + "</div>\n\
                        <div class='new-cus-info'>Question 03: " + answerConverter(medical.q3) + "</div>\n\
                        <div class='new-cus-info'>Question 04: " + answerConverter(medical.q4) + "</div>\n\
                        <div class='new-cus-info'>Question 05: " + answerConverter(medical.q5) + "</div>\n\
                        <div class='new-cus-info'>Question 06: " + answerConverter(medical.q6) + "</div>\n\
                        <div class='new-cus-info'>Question 07: " + answerConverter(medical.q7) + "</div>\n\
                        <div class='new-cus-info'>Question 08: " + answerConverter(medical.q8) + "</div>\n\
                        <div class='new-cus-info'>Question 09: " + answerConverter(medical.q9) + "</div>\n\
                        <div class='new-cus-info'>Question 10: " + answerConverter(medical.q10) + "</div>\n\
                    </div>\n\
                    <div class='new-customer-conatiner'>\n\
                        <div class='new-cus-topic'>Additional Details</div>\n\
                        <div class='new-cus-info'>Height(cm): " + additional.height + "</div>\n\
                        <div class='new-cus-info'>Weight(Kg): " + additional.weight + "</div>\n\
                        <div class='new-cus-info'>Question 01: " + answerConverter(additional.q1) + "</div>\n\
                        <div class='new-cus-info'>Question 02: " + answerConverter(additional.q2) + "</div>\n\
                        <div class='new-cus-info'>Question 03: " + answerConverter(additional.q3) + "</div>\n\
                        <div class='new-cus-info'>Question 04: " + answerConverter(additional.q4) + "</div>\n\
                        <div class='new-cus-info'>Question 05: " + answerConverter(additional.q5) + "</div>\n\
                        <div class='new-cus-info'>Question 06: " + answerConverter(additional.q6) + "</div>\n\
                    </div>\n\
                    <div class='new-customer-conatiner'>\n\
                        <div class='new-cus-topic'>Bank Details</div>\n\
                        <div class='new-cus-info'>Account No: " + bank.account_no + "</div>\n\
                        <div class='new-cus-info'>Account Name: " + bank.account_name + "</div>\n\
                        <div class='new-cus-info'>Branch: " + bank.branch + "</div>\n\
                        <div class='new-cus-info'>Bank: " + bank.bank + "</div>\n\
                    </div>\n\
                    <div class='new-customer-conatiner'>\n\
                        <div class='new-cus-topic'>Requested Policy Details</div>\n\
                        <div class='new-cus-info'>Policy Name: " + element.policy_name + "</div>\n\
                        <div class='new-cus-info'>Duration: " + element.duration + " Years</div>\n\
                        <label>Premium </label>\n\
                        <input type='text' class='view-text new-txt' id='new-premium-" + details.policy_holder_id + "'>\n\
                        <label>Initial Payment </label>\n\
                        <input type='text' class='view-text new-txt' id='new-initial-" + details.policy_holder_id + "'>\n\
                        <input type='button' value='Accept' class='new-cus-accept' onclick = 'return respondNewCustomer(1,\"" + element.p_id + "\",\"" + details.policy_holder_id + "\",\"" + details.email + "\")'>\n\
                        <input type='button' value='Reject' class='new-cus-reject' onclick = 'return respondNewCustomer(0,\"" + element.p_id + "\",\"" + details.policy_holder_id + "\",\"" + details.email + "\")'>\n\
                    </div>\n\
                </div>";
    });
    if (cus_number > 0) {
        document.getElementById('btn3').value += "(" + cus_number + ")";
    } else {
        document.getElementById('new-customer').innerHTML +=
                "<div class='new-customer-default'>No New Customers</div>";
    }
}
//---------------------------------------Load New Customer Data Function End------------------------------
//used for new customer data answer convert
function answerConverter(ans) {
    var answer = "";
    if (ans === "1") {
        answer = "Yes";
    } else {
        answer = "No";
    }
    return answer;
}

//---------------------------------------Load Manage Employee Data Function Start------------------------------
function loadManageEmployeeData(employees) {
    employees.forEach((element) => {
        document.getElementById('employee-table').innerHTML +=
                "<tr>\n\
                    <td>" + element.employee_id + "</td>\n\
                    <td>" + element.full_name + "</td>\n\
                    <td>" + element.nic + "</td>\n\
                    <td>" + element.dob + "</td>\n\
                    <td>" + element.gender + "</td>\n\
                    <td>" + element.mobile + "</td>\n\
                    <td>" + element.email + "</td>\n\
                    <td>" + element.occupation + "</td>\n\
                </tr>";
    });
}
//---------------------------------------Load Manage Employee Data Function End------------------------------

//---------------------------------------Load Approve Claim Data Function Start------------------------------
function loadApproveClaimData(approveClaims) {
    claimNumber = 0;
    approveClaims.forEach((element) => {
        claimNumber++;
        document.getElementById('approve-claim').innerHTML +=
                "<div class='new-customer-full' id='new-customer-full'>\n\
                    <div class='new-customer-conatiner'>\n\
                        <div class='new-cus-topic'>Claim Request</div>\n\
                        <div class='new-cus-info'>Claim Id: " + element.claim_id + "</div>\n\
                        <div class='new-cus-info'>Policy Name: " + element.policy_name + "</div>\n\
                        <div class='new-cus-info'>PHID: " + element.policy_holder_id + "</div>\n\
                        <div class='new-cus-info'>Cause: " + element.cause + "</div>\n\
                        <div class='new-cus-info'>Date: " + element.date + "</div>\n\
                        <div class='new-cus-info'>Place: " + element.place + "</div>\n\
                        <div class='new-cus-info'>Hospital: " + element.hospital + "</div>\n\
                        <div class='new-cus-info'>Ward No: " + element.ward_no + "</div>\n\
                        <div class='new-cus-info'>Comment: " + element.comment + "</div>\n\
                        <label>Claim Amount </label>\n\
                        <input type='text' class='view-text new-txt' id='clm-amount-" + element.policy_holder_id + "'>\n\
                        <input type='button' value='Accept' class='new-cus-accept' onclick = 'return respondToClaim(1,\"" + element.claim_id + "\",\"" + element.policy_holder_id + "\")'>\n\
                        <input type='button' value='Reject' class='new-cus-reject' onclick = 'return respondToClaim(0,\"" + element.claim_id + "\",\"" + element.policy_holder_id + "\")'>\n\
                    </div>\n\
                </div>";
    });
    if (claimNumber > 0) {
        document.getElementById('btn4').value += "(" + claimNumber + ")";
    } else {
        document.getElementById('approve-claim').innerHTML +=
                "<div class='new-customer-default'>No New Claims</div>";
    }
}
//---------------------------------------Load Approve Claim Data Function End------------------------------

//---------------------------------------Load Add Newsfeed Function Start----------------------------------
function loadAddNewsfeed(newsfeed) {
    for (var i = 0; i < newsfeed.length; i++) {
        document.getElementById('view-news-feed').innerHTML +=
                "<label class='news-label'>\n\
                    <input type='submit' value='Delete' class='dlt-btn' onclick='deleteNews(\"" + newsfeed[i] + "\");'>\n\
                    <img class='news-tag' src = 'newsfeed/" + newsfeed[i] + "'>\n\
                </label>";
    }
}
//---------------------------------------Load Add Newsfeed Function End----------------------------------

//---------------------------------------Load Feedbacks Function Start-----------------------------------
function loadFeedbacks(feedbacks) {
    feedbacks.forEach((element) => {
        if (element.status === "0") {
            document.getElementById('testimonial-table').innerHTML +=
                    "<tr onclick = 'loadTestimonial(" + element.feedback_id + ")'>\n\
                        <td>" + element.policy_holder_id + "</td>\n\
                        <td>" + element.feedback + "</td>\n\
                    </tr>";
        } else {
            document.getElementById('active-testimonials').innerHTML +=
                    "<div class='testimonial-tag'>" + element.feedback + "</div>";
        }
    });
}
//---------------------------------------Load Feedbacks Function End----------------------------------

//---------------------------------------Customer Advanced Search Start----------------------------------------
var customerSearch = document.getElementById('customer-search');
customerSearch.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        loadSortedCustomers();
    }
});

function loadSortedCustomers() {
    document.getElementById('customer-table').innerHTML = "";
    var search = document.getElementById('customer-search').value;

    if (document.getElementById('customer-sort1').checked === true) {
        customers.forEach((element) => {
            if (search === element.policy_holder_id) {
                document.getElementById('customer-table').innerHTML +=
                        "<tr>\n\
                                <td>" + element.policy_holder_id + "</td>\n\
                                <td>" + element.full_name + "</td>\n\
                                <td>" + element.nic + "</td>\n\
                                <td>" + element.dob + "</td>\n\
                                <td>" + element.gender + "</td>\n\
                                <td>" + element.mobile + "</td>\n\
                                <td>" + element.email + "</td>\n\
                                <td>" + element.policies + "</td>\n\
                        </tr>";
            }
        });

    } else if (document.getElementById('customer-sort2').checked === true) {
        customers.forEach((element) => {
            if (search === element.nic) {
                document.getElementById('customer-table').innerHTML +=
                        "<tr>\n\
                                <td>" + element.policy_holder_id + "</td>\n\
                                <td>" + element.full_name + "</td>\n\
                                <td>" + element.nic + "</td>\n\
                                <td>" + element.dob + "</td>\n\
                                <td>" + element.gender + "</td>\n\
                                <td>" + element.mobile + "</td>\n\
                                <td>" + element.email + "</td>\n\
                                <td>" + element.policies + "</td>\n\
                            </tr>";
            }
        });

    } else if (document.getElementById('customer-sort3').checked === true) {
        customers.forEach((element) => {
            var policiesList = element.policies.toString();
            if (policiesList.includes(search)) {
                document.getElementById('customer-table').innerHTML +=
                        "<tr>\n\
                                <td>" + element.policy_holder_id + "</td>\n\
                                <td>" + element.full_name + "</td>\n\
                                <td>" + element.nic + "</td>\n\
                                <td>" + element.dob + "</td>\n\
                                <td>" + element.gender + "</td>\n\
                                <td>" + element.mobile + "</td>\n\
                                <td>" + element.email + "</td>\n\
                                <td>" + element.policies + "</td>\n\
                            </tr>";
            }
        });
    }
    document.getElementById('customer-search').value = "";
}
//---------------------------------------Customer Advanced Search End----------------------------------------

//---------------------------------------Employee Advanced Search Start----------------------------------------
var employeeSearch = document.getElementById('employee-search');
employeeSearch.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        loadSortedEmployees();
    }
});

function loadSortedEmployees() {
    document.getElementById('employee-table').innerHTML = "";
    var search = document.getElementById('employee-search').value;

    if (document.getElementById('employee-sort1').checked === true) {
        employees.forEach((element) => {
            if (search === element.employee_id) {
                document.getElementById('employee-table').innerHTML +=
                        "<tr>\n\
                                <td>" + element.employee_id + "</td>\n\
                                <td>" + element.full_name + "</td>\n\
                                <td>" + element.nic + "</td>\n\
                                <td>" + element.dob + "</td>\n\
                                <td>" + element.gender + "</td>\n\
                                <td>" + element.mobile + "</td>\n\
                                <td>" + element.email + "</td>\n\
                                <td>" + element.occupation + "</td>\n\
                            </tr>";
            }
        });

    } else if (document.getElementById('employee-sort2').checked === true) {
        employees.forEach((element) => {
            if (search === element.nic) {
                document.getElementById('employee-table').innerHTML +=
                        "<tr>\n\
                                <td>" + element.employee_id + "</td>\n\
                                <td>" + element.full_name + "</td>\n\
                                <td>" + element.nic + "</td>\n\
                                <td>" + element.dob + "</td>\n\
                                <td>" + element.gender + "</td>\n\
                                <td>" + element.mobile + "</td>\n\
                                <td>" + element.email + "</td>\n\
                                <td>" + element.occupation + "</td>\n\
                            </tr>";
            }
        });

    } else if (document.getElementById('employee-sort3').checked === true) {
        employees.forEach((element) => {
            if (search === element.occupation) {
                document.getElementById('employee-table').innerHTML +=
                        "<tr>\n\
                                <td>" + element.employee_id + "</td>\n\
                                <td>" + element.full_name + "</td>\n\
                                <td>" + element.nic + "</td>\n\
                                <td>" + element.dob + "</td>\n\
                                <td>" + element.gender + "</td>\n\
                                <td>" + element.mobile + "</td>\n\
                                <td>" + element.email + "</td>\n\
                                <td>" + element.occupation + "</td>\n\
                            </tr>";
            }
        });
    }
    document.getElementById('employee-search').value = "";
}

//------------------------Load Enquiries Depending on Status as ID-----------------------------------
function enquirySort(id) {
    document.getElementById('enquiry-table').innerHTML = "";
    switch (id) {
        case 1:
            enquiries.forEach((element) => {
                document.getElementById('enquiry-table').innerHTML +=
                        "<tr onclick = 'setEnquiry(" + element.enquiry_id + ");'>\n\
                                <td>" + element.enquiry_id + "</td>\n\
                                <td>" + element.enquiry + "</td>\n\
                            </tr>";
            });
            break;

        case 2:
            enquiries.forEach((element) => {
                if (element.status === "1") {
                    document.getElementById('enquiry-table').innerHTML +=
                            "<tr onclick = 'setEnquiry(" + element.enquiry_id + ");'>\n\
                                <td>" + element.enquiry_id + "</td>\n\
                                <td>" + element.enquiry + "</td>\n\
                            </tr>";
                }
            });
            break;

        case 3:
            enquiries.forEach((element) => {
                if (element.status === "0") {
                    document.getElementById('enquiry-table').innerHTML +=
                            "<tr onclick = 'setEnquiry(" + element.enquiry_id + ");'>\n\
                                <td>" + element.enquiry_id + "</td>\n\
                                <td>" + element.enquiry + "</td>\n\
                            </tr>";
                }
            });
            break;
    }
}

//------------------------------Load a selected Enquiry to Text Fields----------------------------
function setEnquiry(id) {
    document.getElementById('enquiry-id').value = "";
    document.getElementById('enquiry-text').value = "";
    document.getElementById('reply-text').value = "";
    document.getElementById('reply-text').disabled = false;

    enquiries.forEach((element) => {
        if (element.enquiry_id === id.toString()) {
            document.getElementById('enquiry-id').value = id;
            document.getElementById('enquiry-text').value = element.enquiry;
            if (element.status === "1") {
                document.getElementById('reply-text').value = element.reply;
                document.getElementById('reply-text').disabled = true;
            }
        }
    });
}

//--------------------------------Load the Selected Image to Img Tag----------------------
function createNews() {
    var img = document.getElementById("new-news").files[0];
    var fr = new FileReader();
    fr.onload = function () {
        document.getElementById('new-news-view').src = fr.result;
    };
    fr.readAsDataURL(img);
}

//----------------------------Delete a News-----------------------------------------------
function deleteNews(news) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    xmlHttp.open("POST", "php/employeeProfile/manageNewsFeed.php", true);
    xmlHttp.setRequestHeader("content-type", "application/json");
    var data = JSON.stringify({"newsfeed": news});
    xmlHttp.send(data);
}

//-----------------------------Load testimonials currently appearing----------------------
function loadTestimonial(fid) {
    document.getElementById('feedback-fid').value = "";
    document.getElementById('feedback-pid').value = "";
    document.getElementById('feedback-text').value = "";

    feedbacks.forEach((element) => {
        if (element.feedback_id === fid.toString()) {
            document.getElementById('feedback-fid').value = element.feedback_id;
            document.getElementById('feedback-pid').value = element.policy_holder_id;
            document.getElementById('feedback-text').value = element.feedback;
        }
    });
}

//-----------------------------Reply to a Enquiry Empty Validation--------------------------------
function replyEnquiry() {
    var returnState = true;
    var enquiryID = document.getElementById('enquiry-id').value;
    var enquiryText = document.getElementById('enquiry-text').value;
    var replyText = document.getElementById('reply-text').value;

    if (enquiryID === "") {
        document.getElementById('enquiry-id').style = "border: 2px solid red;"
        returnState = false;
    }
    if (enquiryText === "") {
        document.getElementById('enquiry-text').style = "border: 2px solid red;"
        returnState = false;
    }
    if (replyText === "") {
        document.getElementById('reply-text').style = "border: 2px solid red;"
        returnState = false;
    }
    if (returnState) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xmlHttp.open("POST", "php/employeeProfile/replyEnquiry.php", true);
        xmlHttp.setRequestHeader("content-type", "application/json");
        var data = JSON.stringify({"eid": enquiryID, "rtext": replyText});
        xmlHttp.send(data);
    }

    return returnState;
}

//-----------------------------Add Testimonial empty Validation-----------------------------
function addTestimonial() {

    var state = true;
    var fid = document.getElementById('feedback-fid').value;
    var pid = document.getElementById('feedback-pid').value;
    var ftxt = document.getElementById('feedback-text').value;

    if (fid === "") {
        document.getElementById('feedback-fid').style = "border: 2px solid red;"
        state = false;
    }
    if (pid === "") {
        document.getElementById('feedback-pid').style = "border: 2px solid red;"
        state = false;
    }
    if (ftxt === "") {
        document.getElementById('feedback-text').style = "border: 2px solid red;"
        state = false;
    }

    if (state) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                location.reload();
            }
        };
        xmlHttp.open("POST", "php/employeeProfile/addTestimonial.php", true);
        xmlHttp.setRequestHeader("content-type", "application/json");
        var data = JSON.stringify({"fid": fid});
        xmlHttp.send(data);
    }
}

//-------------------------Respond(Accept/Reject) To New customer Emprty Validation---------------------------
function respondNewCustomer(state, p_id, phid, mail) {

    var status = true;
    var premium = document.getElementById('new-premium-' + phid).value;
    var ini_pay = document.getElementById('new-initial-' + phid).value;

    if (state === 1) {
        if (premium === "" || isNaN(premium)) {
            document.getElementById('new-premium-' + phid).style = "border: 2px solid red;"
            status = false;
        }
        if (ini_pay === "" || isNaN(ini_pay)) {
            document.getElementById('new-initial-' + phid).style = "border: 2px solid red;"
            status = false;
        }
    }

    if (status) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                location.reload();
            }
        };
        xmlHttp.open("POST", "php/employeeProfile/respondNewCustomer.php", true);
        xmlHttp.setRequestHeader("content-type", "application/json");
        var data = JSON.stringify({"pId": p_id, "phid": phid, "state": state, "premium": premium, "iniPay": ini_pay, "email": mail});
        xmlHttp.send(data);
    }

    return status;
}

//-------------------------Respond(Accept/Reject) To customer claim Emprty Validation--------------------------------
function respondToClaim(state, cid, phid) {
    var status = true;
    var amount = document.getElementById('clm-amount-' + phid).value;
    if (state === 1) {
        if (amount === "" || isNaN(amount.toString())) {
            document.getElementById('clm-amount-' + phid).style = "border: 2px solid red;"
            status = false;
        }
    }
    if (status) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                location.reload();
            }
        };
        xmlHttp.open("POST", "php/employeeProfile/respondToClaim.php", true);
        xmlHttp.setRequestHeader("content-type", "application/json");
        var data = JSON.stringify({"cid": cid, "phid": phid, "state": state, "amount": amount});
        xmlHttp.send(data);
    }
    return status;
}

//-------------------------Validate add Newsfeed Function Start--------------------------------
function validateNewsfeed() {
    var status = true;
    if (document.getElementById('new-news').files.length === 0) {
        document.getElementById('new-news-view').style = "border: 1.5px solid red;"
        status = false;
    }
    return status;
}
//-------------------------Validate add Newsfeed Function End--------------------------------

function tableTest() {
    var table = document.getElementById('table-cust');
    var wrapper = table.parentNode;
    var rowsInTable = table.rows.length;
    var height = 0;
    if (rowsInTable > 2) {
        for (var i = 0; i < 2; i++) {
            height += table.rows[i].clientHeight;
        }
        wrapper.style.height = height + "px";
    }
}

//-------------------------Edit Employee Validation Start--------------------------------
function validateEdit() {
    var status = true;
    var ms = document.getElementById("ms").value;
    var address = document.getElementById("address").value;
    var mobile = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;

    document.getElementById("ms").style = "background-color: none;";
    document.getElementById("address").style = "background-color: none;";
    document.getElementById("mobile").style = "background-color: none;";
    document.getElementById("email").style = "background-color: none;";

    if (ms == "") {
        document.getElementById("ms").style = "background-color: red;";
        status = false;
    }
    if (address == "") {
        document.getElementById("address").style = "background-color: red;";
        status = false;
    }
    if (mobile == "") {
        document.getElementById("mobile").style = "background-color: red;";
        status = false;
    }
    if (email == "") {
        document.getElementById("email").style = "background-color: red;";
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

    return status;
}
//-------------------------Edit Employee Validation End----------------------------------