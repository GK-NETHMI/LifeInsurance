function changeProduct(id) {
    document.getElementById("protection-intro").hidden = true;
    document.getElementById("retirement-intro").hidden = true;
    document.getElementById("children-intro").hidden = true;
    document.getElementById("savings-intro").hidden = true;
  
    if (id == 1) {
      document.getElementById("protection-intro").hidden = false;
    } else if (id == 2) {
      document.getElementById("retirement-intro").hidden = false;
    } else if (id == 3) {
      document.getElementById("children-intro").hidden = false;
    } else if (id == 4) {
      document.getElementById("savings-intro").hidden = false;
    }
  }

  