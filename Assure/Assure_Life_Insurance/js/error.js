function checkError() {

    var error = new URLSearchParams(window.location.search).get('error');
    var errorMSG = "";

    //error codes
    let MYSQLERROR = 1;
    let PAGENOTFOUND = 2;
    let FILEUPLOADERROR = 3;
    let EMAILSENDERROR = 4;

    if (error === MYSQLERROR) {
        errorMSG = "An Error Occured with the Database";
    } else if (error === PAGENOTFOUND) {
        errorMSG = "Page Not Found";
    } else if (error === FILEUPLOADERROR) {
        errorMSG = "An error Ocuured when Uploading your File. Please Try Again.";
    } else if (error === EMAILSENDERROR) {
        errorMSG = "An error Ocuured when Sending the Email. Please Try Again.";
    }

    document.getElementById("msg").innerHTML = errorMSG;
}