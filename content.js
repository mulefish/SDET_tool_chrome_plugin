// remove one id at a time
const removeElement = (el) => {
  const htmlElement = document.querySelector(`#${el.qaId}`);
  htmlElement.remove();
};
// shows all ids
const addElements = () => {
  tags.forEach((tag, j) => {
    addElement(tag.me, tag.x, tag.y, tag.qaId, j);
    emitGreen(j + " " + JSON.stringify(tag));
  });
};
// global tags array
let tags = [];

// pretty logs
const emitOrange = (msg) => {
  console.log(`%c ${msg} `, "background: #ff6633; color: #000000");
};
// pretty logs
const emitGreen = (msg) => {
  console.log(`%c ${msg} `, "background: #00ff00; color: #000000");
};

// ignore things w/o id or name
const isWorthLookingAt = (kind, name, id, item) => {
  let isOk = false;
  if (
    // maybe diff colors for tags with ids vs names vs...?
    (name !== undefined && name.length > 0) ||
    (id !== undefined && id.length > 0 && !kind.includes("HTMLScriptElement"))
  ) {
    return true;
  } else {
    return false;
  }
};

// get Id and/or Name of an element
const getGUID = (id, name) => {
  let accum = "";
  if (id !== undefined && id.length > 0) {
    accum += "id:" + id;
  }

  if (name !== undefined && name.length > 0) {
    if (accum.length > 0) {
      accum += " n:" + name;
    } else {
      accum += "n:" + name;
    }
  }
  return accum;
};

// delete any old tags on the screen
const deleteQATag = (id) => {
  const tag = document.getElementById(id);
  tag.parentNode.removeChild(tag);
};

// inject a new tag unto the screen
const addElement = (text, x, y, qaId, i) => {
  const newDiv = document.createElement("div");
  newDiv.id = qaId;
  const newContent = document.createTextNode(text);
  newDiv.appendChild(newContent);
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
  newDiv.style.position = "absolute";
  newDiv.style.left = x + "px";
  newDiv.style.top = y + "px";
  newDiv.style.backgroundColor = "#ff6633";
  newDiv.style.color = "#000";
  newDiv.style.height = "20px";
  newDiv.style["z-index"] = "9999999" + i;
  newDiv.addEventListener("click", () => removeElement(tags[i]));
};
// Core logic.
function scanDomForItemsOfInterest() {
  // zap any old tags
  tags.forEach((tag) => {
    deleteQATag(tag.qaId);
  });
  tags = [];
  // Note! This is an HTMLCollection! Not an array.
  const every_visible_element = document.body.getElementsByTagName("*");
  let i = 0;
  for (let element of every_visible_element) {
    i++;
    const kind = "" + element.tagName; // Poor man's cast to a string
    const name = element.name;
    const id = element.id;

    if (isWorthLookingAt(kind, name, id, element)) {
      const rect = element.getBoundingClientRect();
      let me = getGUID(id, name);
      let qaId = "qa_" + i;
      tags.push({ me: me, x: rect.left, y: rect.top, qaId: qaId });
    }
  }
}

function showTheHrefs() { 
	console.log(" hello " ) 
}  


// on messages callBack
const handleMessages = (message) => {
  if (message === "add ids") addElements();
  else if (message === "remove ids") tags.forEach((el) => removeElement(el));
  else if (message === "collect ids") scanDomForItemsOfInterest();
  else if (message === "showHref ) showTheHrefs(); 
};

// This listens to incoming message form extension popup
chrome.runtime.onMessage.addListener(handleMessages);
