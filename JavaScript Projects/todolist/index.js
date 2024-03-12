const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask() {
  if (inputbox.value === "") {
    alert("Oops! you didn't write anything");
  } else {
    // creates a li element using javascript
    let li = document.createElement("li");
    li.innerHTML = inputbox.value;
    // adds the li tag with text to list container
    listcontainer.appendChild(li);

    //adding cross icon at the end
    let span = document.createElement("span");
    //code for cross icon
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputbox.value = "";
  //whenever new notes added they are saved
  saveData();
}

listcontainer.addEventListener(
  "click",
  function (e) {
    // Step to access the target li
    if (e.target.tagName === "LI") {
      //here toggle adds and removes the class checked in li list tag
      e.target.classList.toggle("checked");
      saveData();
    }
    //step to access the span tag
    else if (e.target.tagName === "SPAN") {
      //removes the target element from listcontainer
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

//saves the notes in local storage so they don't disappear when refreshed
function saveData() {
  // item name is data which we will fetch later
  localStorage.setItem("data", listcontainer.innerHTML);
}

//display the saved data
function showTask() {
  listcontainer.innerHTML = localStorage.getItem("data");
}

showTask();
