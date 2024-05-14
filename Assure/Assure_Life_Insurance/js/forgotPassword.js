queryString = window.location.search;
urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id');
if(id == 1){
    unLock();
}

function clickEvent(first, last) {
    if (first.value.length) {
        document.getElementById(last).focus();
    }
}

function unLock() {
    document.getElementById('newP').disabled = false;
    document.getElementById('newCP').disabled = false;
}