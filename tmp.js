// Initialize button with user's preferred color
let showHref = document.getElementById("showHref");

chrome.storage.sync.get("color", ({ color }) => {
  showHref.style.backgroundColor = color;
});


// When the button is clicked, inject hrefLogic into current page
showHref.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	console.log("click") 
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: hrefLogic,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function hrefLogic() {
	console.log("hrefLogic") 
  	chrome.storage.sync.get("color", ({ color }) => {
    	document.body.style.backgroundColor = color;
        try { 
        alert("hrefLogic")
        } catch( boom ) {
            console.log( boom )
        }

  });
}


