let showHref = document.getElementById("showHref");
showHref.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true
	});
	console.log("click")
	chrome.scripting.executeScript({
		target: {
			tabId: tab.id
		},
		function: hrefLogic,
	});
});

function hrefLogic() {
	const links = document.getElementsByTagName('a');
	try {
		for (var i = 0; i < links.length; i++) {
			let link = links[i]
			let x_of_y = i + " of " + links.length
			const rect = link.getBoundingClientRect();
			const x = rect.x
			const y = rect.y
			const w = rect.width
			const h = rect.height
      const u = "" + link
      if ( u.includes("lululemon.com")) {
			console.log("NEEW NEW STYLE  " +x_of_y + " x=" + x + " y=" + y + " w=" + w + " h=" + h + "  href=|" + u + "|")

			const id = "qa" + i
      try {
	      const newDiv = document.createElement("div");
	      newDiv.id = id;
	      const newContent = document.createTextNode(x_of_y);
	      newDiv.appendChild(newContent);
	      const currentDiv = document.getElementById("div1");
	      document.body.insertBefore(newDiv, currentDiv);
	      newDiv.style.position = "absolute";
	      newDiv.style.left = x + "px";
	      newDiv.style.top = y + "px";
	      newDiv.style.width = w + "px";
	      newDiv.style.height = h + "px";
	      newDiv.style.backgroundColor = "#ff6633";
	      newDiv.style.color = "#000";
	      newDiv.style["z-index"] = "1000" + i;
	      //newDiv.addEventListener("click", () => removeElement(tags[i]));
      } catch ( failbot) { 
        console.log( i + "  NO! " + failbot )
      }
    }
		}
	} catch (boom) {
		console.log(boom)
	}

}