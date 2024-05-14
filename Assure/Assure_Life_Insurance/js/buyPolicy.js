$(".tab").css("display", "none");
$("#tab-1").css("display", "block");

function run(hideTab, showTab) {
  if (hideTab < showTab) { // If not pressed previous button
    // Validation if pressed next button
    var currentTab = 0;
    var x = $('#tab-' + hideTab);
    var y = $(x).find("input, select, textarea"); // Include textarea elements for validation
    for (var i = 0; i < y.length; i++) {
      if (y[i].type === "radio") {
        // Check if any radio button in the group is selected
        var groupName = $(y[i]).attr("name");
        if ($('input[name="' + groupName + '"]:checked').length === 0) {
          $(y[i]).css("color", "#ffdddd");
          showError(y[i], "Input field is empty");
          return false;
        }
      } else if (y[i].tagName === "SELECT") {
        // Check if select option is selected
        if (y[i].selectedIndex === 0) {
          $(y[i]).css("background", "#ffdddd");
          showError(y[i], "Input field is empty");
          return false;
        }
      } else if (y[i].type === "email") {
        // Check if email is valid
        var email = y[i].value.trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          $(y[i]).css("background", "#ffdddd");
          showError(y[i], "Invalid email");
          return false;
        }
      } else if (y[i].tagName === "TEXTAREA") {
        // Check if textarea is empty
        if (y[i].value.trim() === "") {
          $(y[i]).css("background", "#ffdddd");
          showErrorTextarea(y[i], "Input field is empty");
          return false;
        }
      } else if (y[i].value === "") {
        // Check if input field is empty
        $(y[i]).css("background", "#ffdddd");
        showError(y[i], "Input field is empty");
        return false;
      }
    }
  }

  // Scroll to top of page
  window.scrollTo(0, 0);

  // Progress bar
  for (var j = 1; j < showTab; j++) {
    $("#step-" + j).css("background", "green");
  }

  // Switch tab
  $("#tab-" + hideTab).css("display", "none");
  $("#tab-" + showTab).css("display", "block");
  $("input, select, textarea").css("background", "#fff");
}

function showError(element, message) {
  $(element).attr("placeholder", message);
}


 function enable() {
 var check = document.getElementById("check1");
 var submit = document.getElementById("submit1");
 if (check.checked) {
     submit.removeAttribute("disabled");
     submit.style.color="black";
     submit.addEventListener('mouseover', function() {
         submit.style.backgroundColor = 'blue';
         submit.style.color = 'white';
     });
     submit.addEventListener('mouseleave', function() {
         submit.style.backgroundColor = 'rgb(214, 214, 214)';
         submit.style.color = 'black';
     });
 }
 else {
     submit.setAttribute("disabled", "disabled");
     submit.style.color="grey";
 }
}



function checkPolicy() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          if (this.responseText == 0) {
              window.location = "buyPolicy.html";
          } else {

              var user = JSON.parse(this.responseText);
              user.forEach((element) => {
    document.getElementById("policy_name").innerHTML += "<option value=" + element.policy_id + ">" + element.policy_name + "</option>";
              });
          }
      }
  };
  xmlHttp.open("POST", "php/buyPolicy.php", true);
  xmlHttp.send();
}

