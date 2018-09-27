"use strict";

let Dom = {
	elements: {
		chatPage: document.getElementById("chatPage"),
		inventoryPage: document.getElementById("inventoryPage"),
		hotbar: document.getElementById("hotbar"),
		questsPage: document.getElementById("questsPage"),
		settingsPage: document.getElementById("settingsPage"),
		instructionsPage: document.getElementById("instructionsPage"),
		reputationPage: document.getElementById("reputationPage"),
		questStart: document.getElementById("questStart"),
		questFinish: document.getElementById("questFinish"),
		merchantPage: document.getElementById("merchantPage"),
		identifierPage: document.getElementById("identifierPage"),
		identifiedPage: document.getElementById("identifiedPage"),
		lootPage: document.getElementById("lootPage"),
		buyerPage: document.getElementById("buyerPage"),
		choosePage: document.getElementById("choosePage"),
		textPage: document.getElementById("textPage"),
		levelUpPage: document.getElementById("levelUpPage"),
	},
	chat: {},
	inventory: {},
	hotbar: {},
	quests: {},
	instructions: {},
	reputation: {},
	settings: {},
	quest: {},
	merchant: {},
	identifier: {},
	loot: {},
	buyer: {},
	choose: {},
	text: {},
	levelUp: {},
	alert: {},
};

Dom.previous = "instructionsPage"; // change currently displayed page
Dom.changeBook = function(page, override, x) { // changes the page or changes the color of close buttons
	//override says if the function should be run regardless of if the player has a quest active (e.g: declining a quest or closing a merchant)
	if((this.currentlyDisplayed === "" || override) && page !== "levelUpPage") { // check the player doesn't have a quest active
		// hide all pages
		if(page === "chatPage" || page === "inventoryPage" || page === "questsPage" || page === "instructionsPage" || page === "reputationPage" || page === "settingsPage"){ // if the page being changed to is a not a pop up...
			document.getElementById("change"+Dom.previous.substring(0,1).toUpperCase()+Dom.previous.substring(1,Dom.previous.length-4)).getElementsByTagName("polygon")[0].style.strokeWidth = "1";
			document.getElementById("change"+page.substring(0,1).toUpperCase()+page.substring(1,page.length-4)).getElementsByTagName("polygon")[0].style.strokeWidth = "3";
			Dom.previous = page; // ... it will open it next time you close a pop up
		}
		this.elements.chatPage.hidden = true;
		this.elements.inventoryPage.hidden = true;
		this.elements.questsPage.hidden = true;
		this.elements.settingsPage.hidden = true;
		this.elements.instructionsPage.hidden = true;
		this.elements.reputationPage.hidden = true;
		this.elements.questStart.hidden = true;				// Hides all other pages
		this.elements.questFinish.hidden = true;
		this.elements.merchantPage.hidden = true;
		this.elements.identifierPage.hidden = true;
		this.elements.identifiedPage.hidden = true;
		this.elements.lootPage.hidden = true;
		this.elements.buyerPage.hidden = true;
		this.elements.choosePage.hidden = true;
		this.elements.textPage.hidden = true;
		document.getElementById(page).hidden = false; // displays the page you are opening
		if(page === "chatPage"){ // if the chat is being opened
			if(Dom.chat.newString === ""){ // if there is no new chat
				chatPage.innerHTML = "<br>" + Dom.chat.oldString; // display the old chat
			}
			document.getElementById("dot").hidden = true; // remove notifications
			document.getElementById("dot").innerHTML = 0; // set notification number to 0
			Dom.chat.oldString = Dom.chat.newString + Dom.chat.oldString; // add the new chat to the old chat
			Dom.chat.newString = ""; // set the new chat to nothing
			clearInterval(Dom.chat.borderRed);
			clearInterval(Dom.chat.borderBlack);
			Dom.chat.borderRed = false;
			Dom.chat.borderBlack = false;
			document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.stroke = "black";
		}
		if(page === "reputationPage"){ // if the reputation is being opened
			Dom.reputation.update(); // update the reputation (not sure why it is necessary)
		}
		if(page === "questsPage"){
			Dom.quests.active(); // update the active quests box
		}
		//if(override) { // if the a pop up is being closed
		for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
			document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622"; // set close button border color to normal
		}
		Dom.currentlyDisplayed = ""; // reset current display if it is overriden
		//}
		return true; // returns true if the page was changed
	}else{ // if the page cannot be changed
		for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
			document.getElementsByClassName("closeClass")[i].style.border = "5px solid red"; // set close button border color to red
		}
		document.getElementById("levelUpPageClose").style.border = "5px solid red"; // set close button border color to red
		if(x !== 0 && x !== 1){ // if x = "undefined"
			Dom.override = true; // overrides future updates
			setTimeout(function(){ // waits 200
				for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
					document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622"; // set close button border color back to normal	
				}
				document.getElementById("levelUpPageClose").style.border = "5px solid #886622"; // set close button border color to red
				Dom.override = false; // allows future updates
			},200); // waits 0.2 seconds
		} else if(x === 1){ // // if x = 1
			for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
				document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622"; // instantly set close button border color back to normal
			}
			document.getElementById("levelUpPageClose").style.border = "5px solid #886622"; // set close button border color to red
		}
		if(page === "levelUpPage"){
			document.getElementById(page).hidden = false; // displays the page you are opening
			for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
				document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622"; // set close button border color to red
			}
			document.getElementById("levelUpPageClose").style.border = "5px solid #886622"; // set close button border color to red
		}
		return false; // returns false if the page was not changed
	}
}

Dom.hotbar.update = function(){
	for(let i = 0; i < 6; i++){
		document.getElementById("hotbar").getElementsByTagName("td")[i].innerHTML = document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML;
		if(document.getElementById("hotbar").getElementsByTagName("td")[i].getElementsByTagName("img").length > 0){
			document.getElementById("hotbar").getElementsByTagName("td")[i].getElementsByTagName("img")[0].setAttribute('draggable', false);
		}
	}
}

Dom.chat.borderRed = false;
Dom.chat.borderBlack = false;
Dom.chat.newString = ""; // sets the new chat to nothing
Dom.chat.oldString = ""; // sets the old chat to nothing
Dom.chat.contents = []; // sets the chat contents to 0
document.getElementById("dot").innerHTML = 0; // sets the notification number to 0
Dom.chat.insert = function(text, delay, important) { // // insert text in chat page
	if(this.contents.length > 1000) { // if chat is too big
		this.contents.shift(); // purge it
	}
	if(chatPage.hidden) { // if the chat is hidden
		if(document.getElementById("dot").innerHTML !== "<b>...</b>") { // if there are less than 100 notifications
			document.getElementById("dot").hidden = false; // display the notifications
			document.getElementById("dot").innerHTML = parseInt(document.getElementById("dot").innerHTML) + 1; // add 1 to the notification number
			if(parseInt(document.getElementById("dot").innerHTML) > 99) { // if there are 100 notifications
				document.getElementById("dot").innerHTML = "<b>...</b>"; // set the notification number to "..."
				document.getElementById("dot").style.lineHeight = "7.5px"; // move the "..." to the centre
			}
		}
	}
	this.contents.push(text); // add the text to the array of chat contents
	setTimeout(function() { // wait for the amount of time specified in the parameter
		this.newString = text + "<br><br>" + this.newString; // adds the text to the new chat
		chatPage.innerHTML = "<br>" + this.newString; // sets the chat to the new chat
		if(this.oldString !== 0){chatPage.innerHTML += '-------------------- <b>New Messages</b> --------------------';} // if there is old chat write "New Messages"
		chatPage.innerHTML += "</p>" + this.oldString; // write old chat under new messages
		if(!chatPage.hidden){ // if the chat is displayed...
			Dom.changeBook("chatPage"); // ...update the chat
			Dom.changeBook("chatPage"); // ...update the chat
		}
	}.bind(this), delay); // sets the delay to the amount specified in the parameter
	if(important && !this.borderRed && !this.borderBlack) {
		this.borderRed = setInterval(function(){
			document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.strokeWidth = "3";
			document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.stroke = "red";
		},500);
		this.borderBlack = setInterval(function(){
			document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.strokeWidth = "1";
			document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.stroke = "black";
		},1000);
	}
}

Dom.chat.purge = function(insertMessage) { // delete all chat
	this.oldString = ""; // sets the old chat to nothing
	if (insertMessage) { // insertMessage is a boolean that specifies if something should be inserted to say that the chat was purged
		this.newString = "Chat cleared to free up memory"; // warns the user that the chat was reset
	}
	this.contents = []; // sets the chat contents to nothing
}

/*
// translates chat to goblin language (giblish)
// the chat should be raw, and not contain who said it, /me, etc.
Dom.chat.translateToGiblish = function(chat) {
	chat = "<em>(giblish)</em> " + chat;
	return chat;
}
*/

Dom.expand = function(block) { // expand/collapse element
	block = document.getElementById(block); // sets block to the element: block
	if(block.hidden) { // if the element is hidden...
		block.hidden = false; // ...display it
	}
	else { // if the element is displayed...
		block.hidden = true; // ...hide it
	}
	if(block === activeQuestBox && Player.quests.activeQuestArray.length === 0){ // if the player has no active quests... (possibly inefficient? doesn't need to check every time it's opened)
		document.getElementById("activeQuestBox").style.textAlign = "center"; // ...the text in the active quest box is written in the centre...
		document.getElementById("activeQuestBox").innerText = "You have no active quests"; // ... and it says "you have no active quests"
	}else if(block === completedQuestBox && Player.quests.completedQuestArray.length === 0){ // if the player has no completed quests...
		document.getElementById("completedQuestBox").style.textAlign = "center"; // ...the text in the completed quest box is written in the centre... 
		document.getElementById("completedQuestBox").innerText = "You have no completed quests"; // ...and it says "you have no completed quests"
	}else if(block === itemInformation || block === identifierInformation || block === inventoryInformation || block === lootInformation){ // if the block is the itemInformation...
		block.hidden = true; // ...hide it
	}
}

Dom.settings.bookmarkPosition = function() { // arrange position of bookmarks
	if(document.getElementById("bottom").checked) { // arrange bookmarks at bottom of screen
		if(localStorage.getItem("accept") === "true"){
			localStorage.setItem("bookmarksPosition","bottom");
		}
		document.getElementById("changeChat").style.top="619px";
		document.getElementById("changeChat").style.transform="rotate(90deg)";
		document.getElementById("changeChat").style.transformOrigin="top left";
		document.getElementById("changeInventory").style.top="619px";
		document.getElementById("changeInventory").style.transform="rotate(90deg)";
		document.getElementById("changeInventory").style.transformOrigin="top left";
		document.getElementById("changeQuests").style.top="619px";
		document.getElementById("changeQuests").style.transform="rotate(90deg)";
		document.getElementById("changeQuests").style.transformOrigin="top left";
		document.getElementById("changeInstructions").style.top="619px";
		document.getElementById("changeInstructions").style.transform="rotate(90deg)";
		document.getElementById("changeInstructions").style.transformOrigin="top left";
		document.getElementById("changeReputation").style.top="619px";
		document.getElementById("changeReputation").style.transform="rotate(90deg)";
		document.getElementById("changeReputation").style.transformOrigin="top left";
		document.getElementById("changeSettings").style.top="619px";
		document.getElementById("changeSettings").style.transform="rotate(90deg)";
		document.getElementById("changeSettings").style.transformOrigin="top left";
		document.getElementById("changeChat").style.left="710px";
		document.getElementById("changeInventory").style.left="780px";
		document.getElementById("changeQuests").style.left="850px";
		document.getElementById("changeInstructions").style.left="920px";
		document.getElementById("changeReputation").style.left="990px";
		document.getElementById("changeSettings").style.left="1060px";
		document.getElementById("chatImage").style.top="649px";
		document.getElementById("inventoryImage").style.top="649px";
		document.getElementById("questsImage").style.top="649px";
		document.getElementById("instructionsImage").style.top="649px";
		document.getElementById("reputationImage").style.top="649px";
		document.getElementById("settingsImage").style.top="649px";
		document.getElementById("chatImage").style.left="669px";
		document.getElementById("inventoryImage").style.left="739px";
		document.getElementById("questsImage").style.left="820px";
		document.getElementById("instructionsImage").style.left="875px";
		document.getElementById("reputationImage").style.left="943px";
		document.getElementById("settingsImage").style.left="1015px";
		document.getElementById("dot").style.top="646px";
		document.getElementById("dot").style.left="689px";
	}
	else { // arrange bookmarks at right of screen
		if(localStorage.getItem("accept") === "true"){
			localStorage.setItem("bookmarksPosition","right");
		}
		document.getElementById("changeChat").style.left="1162px";
		document.getElementById("changeChat").style.transform="rotate(0deg)";
		document.getElementById("changeChat").style.transformOrigin="top left";
		document.getElementById("changeInventory").style.left="1162px";
		document.getElementById("changeInventory").style.transform="rotate(0deg)";
		document.getElementById("changeInventory").style.transformOrigin="top left";
		document.getElementById("changeQuests").style.left="1162px";
		document.getElementById("changeQuests").style.transform="rotate(0deg)";
		document.getElementById("changeQuests").style.transformOrigin="top left";
		document.getElementById("changeInstructions").style.left="1162px";
		document.getElementById("changeInstructions").style.transform="rotate(0deg)";
		document.getElementById("changeInstructions").style.transformOrigin="top left";
		document.getElementById("changeReputation").style.left="1162px";
		document.getElementById("changeReputation").style.transform="rotate(0deg)";
		document.getElementById("changeReputation").style.transformOrigin="top left";
		document.getElementById("changeSettings").style.left="1162px";
		document.getElementById("changeSettings").style.transform="rotate(0deg)";
		document.getElementById("changeSettings").style.transformOrigin="top left";
		document.getElementById("changeChat").style.top="38px";
		document.getElementById("changeInventory").style.top="108px";
		document.getElementById("changeQuests").style.top="178px";
		document.getElementById("changeInstructions").style.top="248px";
		document.getElementById("changeReputation").style.top="318px";
		document.getElementById("changeSettings").style.top="388px";
		document.getElementById("chatImage").style.top="43px";
		document.getElementById("inventoryImage").style.top="113px";
		document.getElementById("questsImage").style.top="183px";
		document.getElementById("instructionsImage").style.top="253px";
		document.getElementById("reputationImage").style.top="323px";
		document.getElementById("settingsImage").style.top="393px";
		document.getElementById("chatImage").style.left="1197px";
		document.getElementById("inventoryImage").style.left="1197px";
		document.getElementById("questsImage").style.left="1212px";
		document.getElementById("instructionsImage").style.left="1197px";
		document.getElementById("reputationImage").style.left="1197px";
		document.getElementById("settingsImage").style.left="1197px";
		document.getElementById("dot").style.top="41px";
		document.getElementById("dot").style.left="1217px";
	}
}

if(window.innerHeight >= 754) { // if the window height is big enough...
	document.getElementById("bottom").checked = true; // ...set the bookmark position to the bottom...
	if(window.innerWidth >= 1295 && localStorage.getItem("bookmarksPosition") === "right"){
		document.getElementById("right").checked = true; // ...set the bookmark position to the right...
	}
	Dom.settings.bookmarkPosition(); // ...then update the position
}else if(window.innerWidth >= 1295) { // if the window height is too small but the width is big enough...
	document.getElementById("right").checked = true; // ...set the bookmark position to the right...
	Dom.settings.bookmarkPosition(); // ...then update the position
}else { // if the window size is too small...
	alert("Your window size is too small. Please zoom out and refresh the page!"); // ...alert the user that their window is too small...
	console.warn("Your window size is too small. Please zoom out and refresh the page!"); // ...warn the user that their window is too small...
	document.getElementById("bottom").checked = true; // ...set the bookmark position to bottom...
	Dom.settings.bookmarkPosition(); // ...then update the position
}

Dom.reputation.start = function(){
	document.getElementById("reputationPage").innerHTML = "";
	for(let i = 0; i < Object.keys(Player.reputation).length; i++){
		if(Player.reputation[Object.keys(Player.reputation)[i]].changed){
			let replaceStat = Object.keys(Player.reputation)[i].replace( /([A-Z])/g, " $1" );
			document.getElementById("reputationPage").innerHTML += replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1) + ':<div class="widthPadding"></div> <div class="reputationBox"> <div class="reputationBar"></div> </div><br><br><br>';
		}
	}
	Player.reputationReady = true;
	Dom.reputation.ready = true;
	Dom.reputation.update();
}

Dom.reputation.levels = ["Adhorred","Hated","Unfriendly","Neutral","Friendly","Honoured","Venerated"]; // possible reputation levels
Dom.reputation.pointsPerLevel = [1,2500,500,100,500,2500,1]; // possible reputation levels
Dom.reputation.update = function(){ // update reputation
	if(!Dom.reputation.ready && document.getElementById("reputationPage").getElementsByTagName("div").length === 0){
		for(let i = 0; i < Object.keys(Player.reputation).length; i++){
			if(Player.reputation[Object.keys(Player.reputation)[i]].changed && document.getElementById("closeReputation") === null){
				document.getElementById("reputationPage").innerHTML += "<div id='closeReputation' onclick='Dom.reputation.start()'>Close</div>"
			}
		}
	}
	for(let i = 0; i < Object.keys(Player.reputation).length; i++){ // repeat for all reputations
		if(Player.reputation[Object.keys(Player.reputation)[i]].changed){
			if(Player.reputation[Object.keys(Player.reputation)[i]].score >= Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]){ // if the reputation is above 10...
				this.upLevel(Player.reputation[Object.keys(Player.reputation)[i]],i); // ...increase the reputation level
			}
			else if(Player.reputation[Object.keys(Player.reputation)[i]].score < 0){ // if the reputation is below 0...
				this.downLevel(Player.reputation[Object.keys(Player.reputation)[i]],i); // ...decrease the reputation level
			}
			else if(Dom.reputation.ready){ // if the reputation is between 0 and 10
				if(Player.reputation[Object.keys(Player.reputation)[i]].level > 3){ // if the reputation is positive...
					document.getElementsByClassName("reputationBar")[i].style.backgroundColor = "green"; // ...sets the color to green
				}else if(Player.reputation[Object.keys(Player.reputation)[i]].level < 3){ // if the reputation is negative...
					document.getElementsByClassName("reputationBar")[i].style.backgroundColor = "red"; // ...sets the color to red
				}else{ // if the reputation is neutral...
					document.getElementsByClassName("reputationBar")[i].style.backgroundColor = "gold"; // ...sets the color to yellow
				}
				if(Player.reputation[Object.keys(Player.reputation)[i]].level !== 6 && Player.reputation[Object.keys(Player.reputation)[i]].level !== 0){
					document.getElementsByClassName("reputationBar")[i].innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level] + "&nbsp;&nbsp;(" + Player.reputation[Object.keys(Player.reputation)[i]].score + "/"+Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+")"; // writes the level in the repuatation bar
					document.getElementsByClassName("widthPadding")[i].innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level] + " (" + Player.reputation[Object.keys(Player.reputation)[i]].score + "/"+Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+")"; // gets the width of the text
				}else{
					document.getElementsByClassName("reputationBar")[i].innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level]; // writes the level in the repuatation bar
					document.getElementsByClassName("widthPadding")[i].innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level]; // gets the width of the text
				}
				if(Player.reputation[Object.keys(Player.reputation)[i]].level >= 3) { // if the reputation is neutral or above
					document.getElementsByClassName("reputationBar")[i].style.textIndent = ((250-document.getElementsByClassName("widthPadding")[i].clientWidth)/2) + "px"; // writes the text in the centre
					document.getElementsByClassName("reputationBar")[i].style.width = Player.reputation[Object.keys(Player.reputation)[i]].score*250/Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+"px"; // sets the width of the bar
					document.getElementsByClassName("reputationBar")[i].style.left = "0px"; // sets the bar to start on the left
				}
				else{ // if the reputation is negative
					document.getElementsByClassName("reputationBar")[i].style.textIndent = ((250-document.getElementsByClassName("widthPadding")[i].clientWidth)/2)-Player.reputation[Object.keys(Player.reputation)[i]].score*250/Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+ "px"; // writes the text in the centre
					document.getElementsByClassName("reputationBar")[i].style.width = (Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]-Player.reputation[Object.keys(Player.reputation)[i]].score)*250/Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+"px"; // sets the width of the bar
					document.getElementsByClassName("reputationBar")[i].style.left = Player.reputation[Object.keys(Player.reputation)[i]].score*250/Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+"px"; // sets the bar to start on the right
				}
				if(Player.reputation[Object.keys(Player.reputation)[i]].level === 6){
					document.getElementsByClassName("reputationBar")[i].style.width = "250px"; // sets the width of the bar
				}
			}
		}
	}
}

Dom.reputation.upLevel = function(Area,i){ // increases the reputation level
	if(Area.level < 5){
		Area.score -= Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]; // resets the score to 0 + the remainder
		Area.level++; // increases the reputation level
		let replaceStat = Object.keys(Player.reputation)[i].replace( /([A-Z])/g, " $1" );
		Dom.chat.insert("Your reputation with " + replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1) + " has increased to " + Dom.reputation.levels[Area.level], 0, true);
		this.update(); // updates the reputation
	}else{
		Area.level = 6;
		Area.score = 0;
		this.update(); // updates the reputation
	}
}

Dom.reputation.downLevel = function(Area,i){ // decreases the reputation level
	if(Area.level > 1){
		Area.level--; // decreases the reputation level
		Area.score += Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]; // resets the score to 10 - the remainder
		let replaceStat = Object.keys(Player.reputation)[i].replace( /([A-Z])/g, " $1" );
		Dom.chat.insert("Your reputation with " + replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1) + " has decreased to " + Dom.reputation.levels[Area.level], 0, true);
		this.update(); // updates the reputation
	}else{
		Area.level = 0;
		Area.score = 0;
		this.update(); // updates the reputation
	}
}

function romanize(num){
  let lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for(i in lookup){
    while(num >= lookup[i]){
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

document.onmousemove = function(e){
	let event = e || window.event;
    window.mouseX = event.clientX;
    window.mouseY = event.clientY;
}

Dom.inventory.updatePosition = function(object){
	if(window.mouseX !== Dom.inventory.prevMouseX || window.mouseY !== Dom.inventory.prevMouseY){
		Dom.inventory.prevMouseX = window.mouseX;
		Dom.inventory.prevMouseY = window.mouseY;
		if(window.mouseX+200 <= 1161){
			object.style.left = window.mouseX+30+"px";
			for(let i = 0; i < document.getElementsByClassName("triangleLeft").length; i++){
				if(document.getElementsByClassName("triangleLeft")[i].id !== "leftArrow"){
					document.getElementsByClassName("triangleLeft")[i].style = "right: 165px; border-right: 20px solid #886622; border-left: 0px solid transparent;";
				}
			}
			for(let i = 0; i < document.getElementsByClassName("innerTriangleLeft").length; i++){
				document.getElementsByClassName("innerTriangleLeft")[i].style = "right: 157px; border-right: 20px solid #fef9b4; border-left: 0px solid transparent;";
			}
		}else{
			object.style.left = window.mouseX-200+"px";
			for(let i = 0; i < document.getElementsByClassName("triangleLeft").length; i++){
				if(document.getElementsByClassName("triangleLeft")[i].id !== "leftArrow"){
					document.getElementsByClassName("triangleLeft")[i].style = "left: 165px; border-left: 20px solid #886622; border-right: 0px solid transparent;";
				}
			}
			for(let i = 0; i < document.getElementsByClassName("innerTriangleLeft").length; i++){
				document.getElementsByClassName("innerTriangleLeft")[i].style = "left: 157px; border-left: 20px solid #fef9b4; border-right: 0px solid transparent;";
			}
		}
		if(window.mouseY+object.offsetHeight-30 <= 618){
			object.style.top = window.mouseY-30+"px";
			for(let i = 0; i < document.getElementsByClassName("triangleLeft").length; i++){
				if(document.getElementsByClassName("triangleLeft")[i].id !== "leftArrow"){
					document.getElementsByClassName("triangleLeft")[i].style.top = "10px";
				}
			}
			for(let i = 0; i < document.getElementsByClassName("innerTriangleLeft").length; i++){
				document.getElementsByClassName("innerTriangleLeft")[i].style.top = "10px";
			}
		}else{
			object.style.top = 618-object.offsetHeight+"px";
			for(let i = 0; i < document.getElementsByClassName("triangleLeft").length; i++){
				if(document.getElementsByClassName("triangleLeft")[i].id !== "leftArrow"){
					document.getElementsByClassName("triangleLeft")[i].style.top = window.mouseY - object.getBoundingClientRect().top - 20 + "px";
				}
			}
			for(let i = 0; i < document.getElementsByClassName("innerTriangleLeft").length; i++){
				document.getElementsByClassName("innerTriangleLeft")[i].style.top = window.mouseY - object.getBoundingClientRect().top - 20 + "px";
			}
		}
	}
	if(!object.hidden){
		setTimeout(function(){
			Dom.inventory.updatePosition(object);
		},1);
	}
}

Dom.inventory.displayIdentification = function(){
	document.getElementById("itemIdentification").hidden = false;
	Dom.inventory.updatePosition(document.getElementById("itemIdentification"));
	document.getElementById("innerStats").innerHTML = "";
	document.getElementById("innerStats").innerHTML += "<strong>Level: " + Player.level + "</strong>"; // updates the level display
	document.getElementById("innerStats").innerHTML += "<br><strong>XP: " + damageRound(100*Player.xp/LevelXP[Player.level],100) + "%</strong>"; // updates the xp display
	document.getElementById("innerStats").innerHTML += "<br><br><strong>Stats:</strong>"; // updates the xp display
	if(Player.inventory.weapon[0].name !== ""){
		document.getElementById("innerStats").innerHTML += "<br>Damage: " + Player.stats.damage; // updates the damage display
		if(Player.stats.maxDamage !== 0 && Player.stats.maxDamage !== Player.stats.damage){
			document.getElementById("innerStats").innerHTML += "-" + Player.stats.maxDamage; // updates the damage display
		}
	}else{
		document.getElementById("innerStats").innerHTML += "<br>Damage: 0"; // updates the damage display
	}
	document.getElementById("innerStats").innerHTML += "<br>Defence: " + Player.stats.defence; // updates the defence display
	if(Player.stats.blockDefence !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Block Defence: " + Player.stats.blockDefence; // updates the critical chance display
	}
	document.getElementById("innerStats").innerHTML += "<br>Critical Chance: " + Player.stats.criticalChance + "%"; // updates the critical chance display
	document.getElementById("innerStats").innerHTML += "<br>Dodge Chance: " + Player.stats.dodgeChance + "%"; // updates the dodge chance display
	if(Player.stats.flaming !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Flaming "+romanize(Player.stats.flaming);
	}
	if(Player.class === "a"){
		document.getElementById("innerStats").innerHTML += "<br>Focus Speed: " + Player.stats.focusSpeed + "/s"; // updates the focus speed display
	}
	document.getElementById("innerStats").innerHTML += "<br>Health Regen: " + Player.stats.healthRegen + "/s"; // updates the health regen display
	if(Player.stats.looting !== 100){
		document.getElementById("innerStats").innerHTML += "<br>Looting: " + Player.stats.looting + "%"; // updates the looting display
	}
	if(Player.stats.poisonX !== 0 && Player.stats.posionY !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Poison: " + Player.stats.poisonX + "/" + Player.stats.poisonY + "s"; // updates the poison display
	}
	if(Player.stats.reflection !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Reflection: " + Player.stats.reflection + "%"; // updates the reflection display
	}
	if(Player.stats.stun !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Stun: " + Player.stats.stun + "s"; // updates the stun display
	}
	document.getElementById("innerStats").innerHTML += "<br>Swim Speed: " + Player.stats.swimSpeed + "/s"; // updates the swim speed display
	document.getElementById("innerStats").innerHTML += "<br>Walk Speed: " + Player.stats.walkSpeed + "/s"; // updates the walk speed display
	if(Player.stats.fishingSkill !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Fishing Skill: " + Player.stats.fishingSkill; // updates the fishing skill display
	}
	
	if(Player.statusEffects.length !== 0){
		document.getElementById("innerStats").innerHTML += "<br><br><strong>Status Effects:</strong>"; // adds status effects
		for(let i = 0; i < Player.statusEffects.length; i++){
			document.getElementById("innerStats").innerHTML += "<br>" + Player.statusEffects[i].title + ": " + Player.statusEffects[i].effect; // updates the walk speed display
		}
	}
}

Dom.inventory.updateIdentification = function(){ // display inventory information
	document.getElementById("innerStats").innerHTML = "";
	document.getElementById("innerStats").innerHTML += "<strong>Level: " + Player.level + "</strong>"; // updates the level display
	document.getElementById("innerStats").innerHTML += "<br><strong>XP: " + 100*Player.xp/LevelXP[Player.level] + "%</strong>"; // updates the xp display
	document.getElementById("innerStats").innerHTML += "<br><br><strong>Stats:</strong>"; // updates the xp display
	if(Player.inventory.weapon[0].name !== ""){
		document.getElementById("innerStats").innerHTML += "<br>Damage: " + Player.stats.damage; // updates the damage display
		if(Player.stats.maxDamage !== 0 && Player.stats.maxDamage !== Player.stats.damage){
			document.getElementById("innerStats").innerHTML += "-" + Player.stats.maxDamage; // updates the damage display
		}
	}else{
		document.getElementById("innerStats").innerHTML += "<br>Damage: 0"; // updates the damage display
	}
	document.getElementById("innerStats").innerHTML += "<br>Defence: " + Player.stats.defence; // updates the defence display
	if(Player.stats.blockDefence !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Block Defence: " + Player.stats.blockDefence; // updates the critical chance display
	}
	document.getElementById("innerStats").innerHTML += "<br>Critical Chance: " + Player.stats.criticalChance + "%"; // updates the critical chance display
	document.getElementById("innerStats").innerHTML += "<br>Dodge Chance: " + Player.stats.dodgeChance + "%"; // updates the dodge chance display
	if(Player.stats.flaming !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Flaming "+romanize(Player.stats.flaming);
	}
	if(Player.class === "a"){
		document.getElementById("innerStats").innerHTML += "<br>Focus Speed: " + Player.stats.focusSpeed + "/s"; // updates the focus speed display
	}
	document.getElementById("innerStats").innerHTML += "<br>Health Regen: " + Player.stats.healthRegen + "/s"; // updates the health regen display
	if(Player.stats.looting !== 100){
		document.getElementById("innerStats").innerHTML += "<br>Looting: " + Player.stats.looting + "%"; // updates the looting display
	}
	if(Player.stats.poisonX !== 0 && Player.stats.posionY !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Poison: " + Player.stats.poisonX + "/" + Player.stats.poisonY + "s"; // updates the poison display
	}
	if(Player.stats.reflection !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Reflection: " + Player.stats.reflection + "%"; // updates the reflection display
	}
	if(Player.stats.stun !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Stun: " + Player.stats.stun + "s"; // updates the stun display
	}
	document.getElementById("innerStats").innerHTML += "<br>Swim Speed: " + Player.stats.swimSpeed + "/s"; // updates the swim speed display
	document.getElementById("innerStats").innerHTML += "<br>Walk Speed: " + Player.stats.walkSpeed + "/s"; // updates the walk speed display
	if(Player.stats.fishingSkill !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Fishing Skill: " + Player.stats.fishingSkill; // updates the fishing skill display
	}
	
	if(Player.statusEffects.length !== 0){
		document.getElementById("innerStats").innerHTML += "<br><br><strong>Status Effects:</strong>"; // adds status effects
		for(let i = 0; i < Player.statusEffects.length; i++){
			document.getElementById("innerStats").innerHTML += "<br>" + Player.statusEffects[i].title + ": " + Player.statusEffects[i].effect; // updates the walk speed display
		}
	}
}

Dom.inventory.displayInformation = function(y,array){ // display inventory information
	document.getElementById("itemInformation").hidden = true; // hide item information
	if(array[0].name !== ""){ // if the user is hovering over an item...
		document.getElementById("itemInformation").hidden = false; // ...display information
		Dom.inventory.updatePosition(document.getElementById("itemInformation"));
		document.getElementById("name").innerHTML = "<strong>"+array[0].name+"</strong>";
		if(array[0].rarity === "common"){ // if the item is a common...
			document.getElementById("name").style.color = "black"; // ...sets the name color to black
		}else if(array[0].rarity === "unique"){ // if the item is a unique...
			document.getElementById("name").style.color = "orange"; // ...sets the name color to orange
		}else{ // if the item is a mythic...
			document.getElementById("name").style.color = "purple"; // ...sets the name color to purple
		}
		if(array[0].type !== "rod"){
			document.getElementById("stats").innerHTML = "Tier: "+array[0].tier; // add the tier to the information
		}
		for(let i = 0; i < Object.keys(array[0].stats).length; i++){ // repeat for all stats
			if(Object.keys(array[0].stats)[i] !== "flaming"){
				let replaceStat = Object.keys(array[0].stats)[i].replace( /([A-Z])/g, " $1" );
				document.getElementById("stats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+array[0].stats[Object.keys(array[0].stats)[i]];
			}else{
				let replaceStat = Object.keys(array[0].stats)[i].replace( /([A-Z])/g, " $1" );
				document.getElementById("stats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+" "+romanize(array[0].stats[Object.keys(array[0].stats)[i]]);
			}
		}
		if(array[0].set !== undefined){ // if the item has a set...
			let setNum = 0;
			for(let i = 0; i < Items.set[array[0].set].armour.length; i++){
				for(let x = 0; x < 4; x++){
					if(Player.inventory[Object.keys(Player.inventory)[x]][0].name === Items.set[array[0].set].armour[i]){
						setNum++;
						break;
					}
				}
			}
			document.getElementById("set").innerHTML = Items.set[array[0].set].name + " (" + setNum + "/" + Items.set[array[0].set].armour.length+")"; // ...add the set to the information
			if(setNum === Items.set[array[0].set].armour.length){
				document.getElementById("set").innerHTML += "<br><br>Set Bonus:";
				for(let i = 0; i < Object.keys(Items.set[array[0].set].stats).length; i++){ // repeat for all stats
					if(Object.keys(Items.set[array[0].set].stats)[i] !== "flaming"){
						let replaceStat = Object.keys(Items.set[array[0].set].stats)[i].replace( /([A-Z])/g, " $1" );
						document.getElementById("set").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+Items.set[array[0].set].stats[Object.keys(Items.set[array[0].set].stats)[i]];
					}else{
						let replaceStat = Object.keys(Items.set[Player.inventory.items[num].set].stats)[i].replace( /([A-Z])/g, " $1" );
						document.getElementById("set").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+" "+romanize(Items.set[array[0].set].stats[Object.keys(Items.set[array[0].set].stats)[i]]);
					}
				}
			}
		}else{
			document.getElementById("set").innerHTML = "";
		}
		if(array[0].lore !== undefined){ // if the item has a lore...
			document.getElementById("lore").innerHTML = "<i>"+array[0].lore+"</i>"; // ...add the lore to the information
		}else{
			document.getElementById("lore").innerHTML = "";
		}
	}
}

Dom.inventory.displayEquipmentInformation = function(num){
	document.getElementById("inventoryInformation").hidden = true; // hide item information
	if(Object.keys(Player.inventory.items[num]).length !== 0){ // if the user is hovering over an item...
		document.getElementById("inventoryInformation").hidden = false; // ...display information
		Dom.inventory.updatePosition(document.getElementById("inventoryInformation"));
		if(Player.inventory.items[num].name !== undefined){
			document.getElementById("invName").innerHTML = Player.inventory.items[num].name;
			if(Player.inventory.items[num].rarity === "mythic"){ // if the item is a mythic...
				document.getElementById("invName").style.color = "purple"; // ...sets the name color to purple
			}else if(Player.inventory.items[num].rarity === "unique"){ // if the item is a unique...
				document.getElementById("invName").style.color = "orange"; // ...sets the name color to orange
			}else if(Player.inventory.items[num].rarity === "junk"){
				document.getElementById("invName").style.color = "darkgray";
			}else{ // if the item is a common...
				document.getElementById("invName").style.color = "black"; // ...sets the name color to black
			}
		}else{
			document.getElementById("invName").innerHTML = "Unidentified "+Player.inventory.items[num].type.charAt(0).toUpperCase() + Player.inventory.items[num].type.slice(1);
			document.getElementById("invName").style.color = "black"; // ...sets the name color to black
		}
		if(Player.inventory.items[num].type !== "item" && Player.inventory.items[num].type !== "bag" && Player.inventory.items[num].type !== "currency" && Player.inventory.items[num].type !== "fish" && Player.inventory.items[num].type !== "consumable"){
			if(Player.inventory.items[num].type !== "rod"){
				document.getElementById("invStats").innerHTML = "Tier: "+Player.inventory.items[num].tier; // add the tier to the information
			}else{
				document.getElementById("invStats").innerHTML = ""; // remove any information
			}
			if(Player.inventory.items[num].stats !== undefined){
				for(let i = 0; i < Object.keys(Player.inventory.items[num].stats).length; i++){ // repeat for all stats
					if(Object.keys(Player.inventory.items[num].stats)[i] !== "flaming"){
						let replaceStat = Object.keys(Player.inventory.items[num].stats)[i].replace( /([A-Z])/g, " $1" );
						document.getElementById("invStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+Player.inventory.items[num].stats[Object.keys(Player.inventory.items[num].stats)[i]];
					}else{
						let replaceStat = Object.keys(Player.inventory.items[num].stats)[i].replace( /([A-Z])/g, " $1" );
						document.getElementById("invStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+" "+romanize(Player.inventory.items[num].stats[Object.keys(Player.inventory.items[num].stats)[i]]);
					}
				}
			}else{
				document.getElementById("invStats").innerHTML += "<br><br>Area: "+Player.inventory.items[num].area; // add the tier to the information
			}
			if(Player.inventory.items[num].set !== undefined){ // if the item has a set...
				let setNum = 0;
				for(let i = 0; i < Items.set[Player.inventory.items[num].set].armour.length; i++){
					let checkUsed = true;
					for(let x = 0; x < Player.inventory.items.length; x++){
						if(Player.inventory.items[x].name === Items.set[Player.inventory.items[num].set].armour[i]){
							setNum++;
							checkUsed = false;
							break;
						}
					}
					if(checkUsed){
						for(let x = 0; x < 4; x++){
							if(Player.inventory[Object.keys(Player.inventory)[x]][0].name === Items.set[Player.inventory.items[num].set].armour[i]){
								setNum++;
								break;
							}
						}
					}
				}
				document.getElementById("invSet").innerHTML = Items.set[Player.inventory.items[num].set].name + " (" + setNum + "/" + Items.set[Player.inventory.items[num].set].armour.length+")"; // ...add the set to the information
				if(setNum === Items.set[Player.inventory.items[num].set].armour.length){
					document.getElementById("invSet").innerHTML += "<br><br>Set Bonus:";
					for(let i = 0; i < Object.keys(Items.set[Player.inventory.items[num].set].stats).length; i++){ // repeat for all stats
						if(Object.keys(Items.set[Player.inventory.items[num].set].stats)[i] !== "flaming"){
							let replaceStat = Object.keys(Items.set[Player.inventory.items[num].set].stats)[i].replace( /([A-Z])/g, " $1" );
							document.getElementById("invSet").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+Items.set[Player.inventory.items[num].set].stats[Object.keys(Items.set[Player.inventory.items[num].set].stats)[i]];
						}else{
							let replaceStat = Object.keys(Items.set[Player.inventory.items[num].set].stats)[i].replace( /([A-Z])/g, " $1" );
							document.getElementById("invSet").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+" "+romanize(Items.set[Player.inventory.items[num].set].stats[Object.keys(Items.set[Player.inventory.items[num].set].stats)[i]]);
						}
					}
				}
			}else{
				document.getElementById("invSet").innerHTML = "";
			}
		}else{
			document.getElementById("invSet").innerHTML = "";
			document.getElementById("invStats").innerHTML = "";
		}
		if(Player.inventory.items[num].type === "bag"){
			document.getElementById("invStats").innerHTML = "Capacity: "+Player.inventory.items[num].size; // add the size to the information
		}
		if(Player.inventory.items[num].type === "currency"){
			if(Player.inventory.items[num].stacked !== undefined){
				document.getElementById("invName").innerHTML = Player.inventory.items[num].stacked + " " + document.getElementById("invName").innerHTML; // add the size to the information
			}else{
				document.getElementById("invName").innerHTML = "1 " + document.getElementById("invName").innerHTML; // add the size to the information
			}
		}
		if(Player.inventory.items[num].type === "consumable"){
			document.getElementById("invStats").innerHTML = (Player.inventory.items[num].charges !== undefined ? "Charges: " + Player.inventory.items[num].charges + "<br><br>" : "") + Player.inventory.items[num].onClickText;
		}
		if(Player.inventory.items[num].fishingType === "fish"){
			document.getElementById("invStats").innerHTML = "Length: " + Player.inventory.items[num].length + "cm";
		}
		if(Player.inventory.items[num].quest){
			document.getElementById("invStats").style.color = "slateblue";
			document.getElementById("invStats").innerHTML = "Quest item";
		}else{
			document.getElementById("invStats").style.color = "black";
		}
		if(Player.inventory.items[num].lore !== undefined){ // if the item has a lore...
			document.getElementById("invLore").innerHTML = "<i>"+Player.inventory.items[num].lore+"</i>"; // ...add the lore to the information
		}else{
			document.getElementById("invLore").innerHTML = "";
		}
	}
}

Dom.merchant.displayInformation = function(y,array,num) { // display merchant information
	document.getElementById("informationMerchant").hidden = false; // display merchant information
	Dom.inventory.updatePosition(document.getElementById("informationMerchant"));
	//document.getElementById("informationMerchant").innerHTML = "<div class='triangleLeft'></div><div id='merchantTriangle' class='innerTriangleLeft'></div><p id='merchantName'></p><p id='merchantStats'></p><p id='merchantLore'></p>"; // construct the information without the values
	document.getElementById("merchantName").innerHTML = "<strong>" + array[num].name + "</strong>";
	if(array[num].rarity === "mythic"){ // if the item is a mythic...
		document.getElementById("invName").style.color = "purple"; // ...sets the name color to purple
	}else if(array[num].rarity === "unique"){ // if the item is a unique...
		document.getElementById("invName").style.color = "orange"; // ...sets the name color to orange
	}else if(array[num].rarity === "junk"){
		document.getElementById("lootName").style.color = "darkgray";
	}else{ // if the item is a common...
		document.getElementById("invName").style.color = "black"; // ...sets the name color to black
	}
	if(array[num].type !== "item" && array[num].type !== "bag" && array[num].type !== "currency" && array[num].type !== "fish" && array[num].type !== "consumable"){
		document.getElementById("merchantStats").innerHTML = "Tier: "+array[num].tier; // add the tier to the information
		for(let i = 0; i < Object.keys(array[num].stats).length; i++){ // repeat for all stats
			if(Object.keys(array[num].stats)[i] !== "flaming"){
				let replaceStat = Object.keys(array[num].stats)[i].replace( /([A-Z])/g, " $1" );
				document.getElementById("merchantStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+array[num].stats[Object.keys(array[num].stats)[i]];
			}else{
				let replaceStat = Object.keys(array[num].stats)[i].replace( /([A-Z])/g, " $1" );
				document.getElementById("merchantStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+romanize(array[num].stats[Object.keys(array[num].stats)[i]]);
			}
		}
	}
	if(array[num].lore !== undefined){ // if the item has a lore...
		document.getElementById("merchantLore").innerHTML = "<i>"+array[num].lore+"</i>"; // ...add the lore to the information
	}else{
		document.getElementById("merchantLore").innerHTML = "";
	}
	//document.getElementById("merchantTriangle").style.bottom = document.getElementById("informationMerchant").offsetHeight - 50 + "px"; // postition the triangle in the correct place
}

Dom.quests.displayInformation = function(num,array,total){ // display quest start information
	document.getElementById("questInformation").hidden = false; // display quest start information
	Dom.inventory.updatePosition(document.getElementById("questInformation"));
	//document.getElementById("questInformation").innerHTML = "<div class='triangleLeft'></div><div id='questTriangle' class='innerTriangleLeft'></div><p id='questName'></p><p id='questStats'></p><p id='questLore'></p>"; // construct the information without the values
	document.getElementById("questName").innerHTML = "<strong>" + array[num].name + "</strong>";
	if(array[num].rarity === "mythic"){ // if the item is a common...
		document.getElementById("questName").style.color = "purple"; // ...sets the name color to black
	}else if(array[num].rarity === "unique"){ // if the item is a unique...
		document.getElementById("questName").style.color = "orange"; // ...sets the name color to orange
	}else{ // if the item is a mythic...
		document.getElementById("questName").style.color = "black"; // ...sets the name color to purple
	}
	if(array[num].type !== "item" && array[num].type !== "bag" && array[num].type !== "currency"){
		document.getElementById("questStats").innerHTML = "Tier: "+array[num].tier; // add the tier to the information
		for(let i = 0; i < Object.keys(array[num].stats).length; i++){ // repeat for all stats
			if(Object.keys(array[num].stats)[i] !== "flaming"){
				let replaceStat = Object.keys(array[num].stats)[i].replace( /([A-Z])/g, " $1" );
				document.getElementById("questStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+array[num].stats[Object.keys(array[num].stats)[i]];
			}else{
				let replaceStat = Object.keys(array[num].stats)[i].replace( /([A-Z])/g, " $1" );
				document.getElementById("questStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+romanize(array[num].stats[Object.keys(array[num].stats)[i]]);
			}
		}
	}else{
		document.getElementById("questStats").innerHTML = "";
	}
	if(array[num].type === "currency"){
		document.getElementById("questName").innerHTML = "<strong>" + total[num] + " " + document.getElementById("questName").innerHTML + "</strong>"; // add the size to the information
	}
	if(array[num].lore !== undefined){ // if the item has a lore...
		document.getElementById("questLore").innerHTML = "<i>"+array[num].lore+"</i>"; // ...add the lore to the information
	}else{
		document.getElementById("questLore").innerHTML = "";
	}
	//document.getElementById("questTriangle").style.bottom = document.getElementById("questInformation").offsetHeight - 50 + "px"; // position the triangle in the correct place
}

Dom.quests.displayFinishInformation = function(num,array,total){ // display quest finish information
	document.getElementById("questFinishInformation").hidden = false; // display quest start information
	Dom.inventory.updatePosition(document.getElementById("questFinishInformation"));
	//document.getElementById("questFinishInformation").innerHTML = "<div class='triangleLeft'></div><div id='finishTriangle' class='innerTriangleLeft'></div><p id='finishName'></p><p id='finishStats'></p><p id='finishLore'></p>"; // construct the information without the values
	document.getElementById("finishName").innerHTML = "<strong>" + array[num].name + "</strong>";
	if(array[num].rarity === "mythic"){ // if the item is a common...
		document.getElementById("finishName").style.color = "purple"; // ...sets the name color to black
	}else if(array[num].rarity === "unique"){ // if the item is a unique...
		document.getElementById("finishName").style.color = "orange"; // ...sets the name color to orange
	}else{ // if the item is a mythic...
		document.getElementById("finishName").style.color = "black"; // ...sets the name color to purple
	}
	if(array[num].type !== "item" && array[num].type !== "bag" && array[num].type !== "currency"){
		document.getElementById("finishStats").innerHTML = "Tier: "+array[num].tier; // add the tier to the information
		for(let i = 0; i < Object.keys(array[num].stats).length; i++){ // repeat for all stats
			if(Object.keys(array[num].stats)[i] !== "flaming"){
				let replaceStat = Object.keys(array[num].stats)[i].replace( /([A-Z])/g, " $1" );
				document.getElementById("finishStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+array[num].stats[Object.keys(array[num].stats)[i]];
			}else{
				let replaceStat = Object.keys(array[num].stats)[i].replace( /([A-Z])/g, " $1" );
				document.getElementById("finishStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+romanize(array[num].stats[Object.keys(array[num].stats)[i]]);
			}
		}
	}else{
		document.getElementById("finishStats").innerHTML = "";
	}
	if(array[num].type === "currency"){
		document.getElementById("finishName").innerHTML = "<strong>" + total[num] + " " + document.getElementById("finishName").innerHTML + "</strong>"; // add the size to the information
	}
	if(array[num].lore !== undefined){ // if the item has a lore...
		document.getElementById("finishLore").innerHTML = "<i>"+array[num].lore+"</i>"; // ...add the lore to the information
	}else{
		document.getElementById("finishLore").innerHTML = "";
	}
	//document.getElementById("finishTriangle").style.bottom = document.getElementById("questFinishInformation").offsetHeight - 50 + "px"; // position the triangle in the correct place
}

Dom.identifier.displayInformation = function(num,array){ // display identifier information
	document.getElementById("identifierInformation").hidden = true; // hide identifier information
	if(array.length !== 0){ // if the player is hovering over an item
		document.getElementById("identifierInformation").hidden = false; // display identifier information
		Dom.inventory.updatePosition(document.getElementById("identifierInformation"));
		//document.getElementById("identifierInformation").innerHTML = "<div class='triangleLeft'></div><div id='identifierTriangle' class='innerTriangleLeft'></div><p id='identifierName'></p><p id='identifierStats'></p><p id='identifierLore'></p>"; // construct the information without the values		
		document.getElementById("identifierName").innerHTML = "<strong> Unidentified " + array[num].type.charAt(0).toUpperCase() + array[num].type.slice(1) + "</strong>";
		document.getElementById("identifierStats").innerHTML = "Tier: "+array[num].tier; // add the tier to the information
		document.getElementById("identifierLore").innerHTML = "Area: "+array[num].area; // add the area to the information
		//document.getElementById("identifierTriangle").style.bottom = document.getElementById("identifierInformation").offsetHeight - 50 + "px"; // positition the triangle in the correct place
	}
}

Dom.identifier.displayIdentifiedInformation = function(num,array){ // display identified information
	document.getElementById("identifiedInformation").hidden = false; // display identified information
	Dom.inventory.updatePosition(document.getElementById("identifiedInformation"));
	document.getElementById("identifiedName").innerHTML = "<strong>" + array[num].name + "</strong>";
	if(array[num].rarity === "common"){ // if the item is a common...
		document.getElementById("identifiedName").style.color = "black"; // ...sets the name color to black
	}else if(array[num].rarity === "unique"){ // if the item is a unique...
		document.getElementById("identifiedName").style.color = "orange"; // ...sets the name color to orange
	}else{ // if the item is a mythic...
		document.getElementById("identifiedName").style.color = "purple"; // ...sets the name color to purple
	}
	document.getElementById("identifiedStats").innerHTML = "Tier: "+array[num].tier; // add the tier to the information
	for(let i = 0; i < Object.keys(array[num].stats).length; i++){ // repeat fot all stats
		if(Object.keys(array[num].stats)[i] !== "flaming"){
			let replaceStat = Object.keys(array[num].stats)[i].replace( /([A-Z])/g, " $1" );
			document.getElementById("identifiedStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+array[num].stats[Object.keys(array[num].stats)[i]];
		}else{
			let replaceStat = Object.keys(array[num].stats)[i].replace( /([A-Z])/g, " $1" );
			document.getElementById("identifiedStats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+romanize(array[num].stats[Object.keys(array[num].stats)[i]]);
		}
	}
	if(array[num].lore !== undefined){ // if the items has a lore...
		document.getElementById("identifiedLore").innerHTML = "<i>"+array[num].lore+"</i>"; // ...add the lore to the information
	}else{
		document.getElementById("identifiedLore").innerHTML = "";
	}
	//document.getElementById("identifiedTriangle").style.bottom = document.getElementById("identifiedInformation").offsetHeight - 50 + "px"; // position the triangle in the correct place
}

Dom.loot.displayInformation = function(num, array, total){
	document.getElementById("lootInformation").hidden = false; // ...display information
	Dom.inventory.updatePosition(document.getElementById("lootInformation"));
	if(array[num].name !== undefined){
		document.getElementById("lootName").innerHTML = array[num].name;
		if(array[num].rarity === "mythic"){ // if the item is a mythic...
			document.getElementById("lootName").style.color = "purple"; // ...sets the name color to purple
		}else if(array[num].rarity === "unique"){ // if the item is a unique...
			document.getElementById("lootName").style.color = "orange"; // ...sets the name color to orange
		}else if(array[num].rarity === "junk"){
			document.getElementById("lootName").style.color = "darkgray";
		}else{ // if the item is a common...
			document.getElementById("lootName").style.color = "black"; // ...sets the name color to black
		}
	}else{
		document.getElementById("lootName").innerHTML = "Unidentified "+array[num].type.charAt(0).toUpperCase() + array[num].type.slice(1);
		document.getElementById("lootName").style.color = "black"; // ...sets the name color to black
	}
	if(array[num].type !== "item" && array[num].type !== "bag" && array[num].type !== "currency"){
		document.getElementById("lootStats").innerHTML = "Tier: "+array[num].tier; // add the tier to the information
		document.getElementById("lootStats").innerHTML += "<br><br>Area: "+array[num].area; // add the tier to the information
	}else{
		document.getElementById("lootStats").innerHTML = "";
	}
	if(array[num].type === "bag"){
		document.getElementById("lootStats").innerHTML = "Capacity: "+array[num].size; // add the size to the information
	}
	if(array[num].type === "currency"){
		if(total[num] > 1){
			document.getElementById("lootName").innerHTML = total[num] + " " + document.getElementById("lootName").innerHTML; // add the size to the information
		}else{
			document.getElementById("lootName").innerHTML = "1 " + document.getElementById("lootName").innerHTML; // add the size to the information
		}
	}
	if(array[num].quest){
		document.getElementById("lootStats").style.color = "slateblue";
		document.getElementById("lootStats").innerHTML = "Quest item";
	}else{
		document.getElementById("lootStats").style.color = "black";
	}
	if(array[num].lore !== undefined){ // if the item has a lore...
		document.getElementById("lootLore").innerHTML = "<i>"+array[num].lore+"</i>"; // ...add the lore to the information
	}else{
		document.getElementById("lootLore").innerHTML = "";
	}
}

Dom.currentlyDisplayed = ""; // the currently displayed quest, merchant, etc. (any pop up)
Dom.quest.start = function(quest){ // display quest start page
	if(Dom.changeBook("questStart", true/*false*/)) { // display quest start page
		document.getElementById("questStartQuest").innerHTML = quest.quest; // sets title to quest name
		document.getElementById("questStartName").innerHTML = quest.startName; // sets NPC name to NPC name
		document.getElementById("questStartChat").innerHTML = quest.startChat; // sets chat to NPC chat
		document.getElementById("questStartObjectives").innerHTML = ""; // sets objectives to none
		for(let i = 0; i < quest.objectives.length; i++){ // repeat for all objectives
			document.getElementById("questStartObjectives").innerHTML += quest.objectives[i] + "<br>"; // adds ovjective to objectives
		}
		if(quest.rewards.xp === 0 || quest.rewards.xp === undefined){ // if there is no xp reward...
			document.getElementById("questStartXP").style.display = "none"; // ...do not display xp
			//document.getElementById("xpClass").style.display = "none";
		}else{ // if there is a xp reward...
			document.getElementById("questStartXP").innerHTML = quest.rewards.xp; // ...display the amount of xp inside the xp
		}
		document.getElementById("questStartItems").innerHTML = ""; // sets the item rewards to none
		if(quest.rewards.items !== undefined){
			for(let i = 0; i < quest.rewards.items.length; i++){ // repeats for all item rewards
				if(quest.rewards.itemQuantities[i] !== 1){
					document.getElementById("questStartItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestOptions'><div class='questStackNum'>"+quest.rewards.itemQuantities[i]+"</div></img>&nbsp;&nbsp;"; // adds item to item rewards
				}else{
					document.getElementById("questStartItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestOptions'><span class='questStackNum'></span></img>&nbsp;&nbsp;"; // adds item to item rewards
				}
			}
		}
		for(let x = 0; x < document.getElementsByClassName("theseQuestOptions").length; x++){ // repeats for all item rewards
			document.getElementsByClassName("theseQuestOptions")[x].onmouseover = function() { // when the user hovers over the item...
				Dom.quests.displayInformation(x, quest.rewards.items, quest.rewards.itemQuantities); // ...displays the information for that item
			};
			document.getElementsByClassName("theseQuestOptions")[x].onmouseleave = function() { // when the user stops hovering over the item...
				Dom.expand("questInformation"); // ...stops displaying the information for that item
			};
		}
		for(let x = 0; x < document.getElementsByClassName("questStackNum").length; x++){ // repeats for all item rewards
			document.getElementsByClassName("questStackNum")[x].onmouseover = function() { // when the user hovers over the item...
				Dom.quests.displayInformation(x, quest.rewards.items, quest.rewards.itemQuantities); // ...displays the information for that item
			};
			document.getElementsByClassName("questStackNum")[x].onmouseleave = function() { // when the user stops hovering over the item...
				Dom.expand("questInformation"); // ...stops displaying the information for that item
			};
			document.getElementsByClassName("questStackNum")[x].style.left = document.getElementsByClassName("theseQuestOptions")[x].getBoundingClientRect().left + 5 + "px";
			document.getElementsByClassName("questStackNum")[x].style.top = document.getElementsByClassName("theseQuestOptions")[x].getBoundingClientRect().top + 33 + "px";
		}
		Dom.currentlyDisplayed = quest; // sets the currently displayed pop up to the quest
	}
}

Dom.quest.finish = function(quest){ // display quest finish page
	if(Dom.changeBook("questFinish", true/*false*/)){ // display quest finish page
		document.getElementById("questFinishQuest").innerHTML = quest.quest; // sets title to quest name
		document.getElementById("questFinishName").innerHTML = quest.finishName; // sets NPC name to NPC name
		document.getElementById("questFinishChat").innerHTML = quest.finishChat; // sets chat to NPC chat
		if(quest.rewards.xp === 0 || quest.rewards.xp === undefined){ // if there is no xp reward...
			document.getElementById("questFinishXP").style.display = "none"; // ...do not display xp
			//document.getElementById("xpClass").style.display = "none";
		}else{ // if there is a xp reward...
			document.getElementById("questFinishXP").innerHTML = quest.rewards.xp; // ...display the amount of xp inside the xp
		}
		document.getElementById("questFinishItems").innerHTML = ""; // sets the item rewards to none
		if(quest.rewards.items !== undefined){
			for(let i = 0; i < quest.rewards.items.length; i++){ // repeats for all item rewards
				if(quest.rewards.itemQuantities[i] !== 1){
					document.getElementById("questFinishItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestFinishOptions'><div class='questFinishStackNum'>"+quest.rewards.itemQuantities[i]+"</div></img>&nbsp;&nbsp;"; // adds item to item rewards
				}else{
					document.getElementById("questFinishItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestFinishOptions'><span class='questFinishStackNum'></span></img>&nbsp;&nbsp;"; // adds item to item rewards
				}
			}
		}
		for(let x = 0; x < document.getElementsByClassName("theseQuestFinishOptions").length; x++){ // repeats for all item rewards
			document.getElementsByClassName("theseQuestFinishOptions")[x].onmouseover = function() { // when the user hovers over the item...
				Dom.quests.displayFinishInformation(x, quest.rewards.items, quest.rewards.itemQuantities); // ...displays the information for that item
			};
			document.getElementsByClassName("theseQuestFinishOptions")[x].onmouseleave = function() { // when the user stops hovering over the item...
				Dom.expand("questFinishInformation"); // ...stops displaying the information for that item
			};
		}
		for(let x = 0; x < document.getElementsByClassName("questFinishStackNum").length; x++){ // repeats for all item rewards
			document.getElementsByClassName("questFinishStackNum")[x].onmouseover = function() { // when the user hovers over the item...
				Dom.quests.displayFinishInformation(x, quest.rewards.items, quest.rewards.itemQuantities); // ...displays the information for that item
			};
			document.getElementsByClassName("questFinishStackNum")[x].onmouseleave = function() { // when the user stops hovering over the item...
				Dom.expand("questFinishInformation"); // ...stops displaying the information for that item
			};
			document.getElementsByClassName("questFinishStackNum")[x].style.left = document.getElementsByClassName("theseQuestFinishOptions")[x].getBoundingClientRect().left + 5 + "px";
			document.getElementsByClassName("questFinishStackNum")[x].style.top = document.getElementsByClassName("theseQuestFinishOptions")[x].getBoundingClientRect().top + 33 + "px";
		}
		Dom.currentlyDisplayed = quest; // sets the currently displayed variable to the quest
		Dom.quest.waitForReward = quest;
	}
}

Dom.quest.accept = function(){ // quest accepted
	Dom.quests.active(Dom.currentlyDisplayed); // add the quest to the active quests
	if (Dom.currentlyDisplayed.onQuestStart !== undefined) { // if there is a quest start function...
		Dom.currentlyDisplayed.onQuestStart(); // ...do it
	}
	if(Dom.currentlyDisplayed.startRewards !== undefined){
		for(let i = 0; i < Dom.currentlyDisplayed.startRewards.items.length; i++){ // repeats for all item rewards
			Dom.inventory.give(Dom.currentlyDisplayed.startRewards.items[i],Dom.currentlyDisplayed.startRewards.itemQuantities[i]); // gives the player the reward
		}
	}
	Dom.quests.possible();
	Dom.changeBook(Dom.previous, true); // change page back to previous page
}

Dom.quest.acceptRewards = function(){ // quest rewards accepted
	let quest = Dom.quest.waitForReward;
	if (quest.onQuestFinish !== undefined) { // if there is a quest finish function...
		quest.onQuestFinish(); // ...do it
	}
	//Player.xp += quest.rewards.xp // gives the player the xp reward
	if(quest.rewards.items !== undefined){
		for(let i = 0; i < quest.rewards.items.length; i++){ // repeats for all item rewards
			Dom.inventory.give(quest.rewards.items[i],quest.rewards.itemQuantities[i]); // gives the player the reward
		}
	}
	if(quest.removeItems !== undefined){
		for(let i = 0; i < quest.removeItems.length; i++){ // repeats for all item rewards
			Dom.inventory.removeById(quest.removeItems[i].id,quest.removeItems[i].type,quest.removeItemQuantity[i]); // gives the player the reward
		}
	}
	if(quest.rewards.reputation !== undefined) { // reputation rewards
		for(let i = 0; i < Object.keys(quest.rewards.reputation).length; i++) { // repeats for all reputation rewards			
			let replaceStat = Object.keys(quest.rewards.reputation)[i].replace( /([A-Z])/g, " $1" );
			if(Player.reputation[Object.keys(quest.rewards.reputation)[i]].changed){ // if the reputation has already been changed
				Player.reputation[Object.keys(quest.rewards.reputation)[i]].score += quest.rewards.reputation[Object.keys(quest.rewards.reputation)[i]]; // gives the player the reputation reward
				Dom.chat.insert("You have gained " + quest.rewards.reputation[Object.keys(quest.rewards.reputation)[i]] + " reputation with " + replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1));
			}else{ // if the reputation has not been changed
				Player.reputation[Object.keys(quest.rewards.reputation)[i]].score += quest.rewards.reputation[Object.keys(quest.rewards.reputation)[i]]; // reputation score (between levels)
				Dom.chat.insert("You have gained " + quest.rewards.reputation[Object.keys(quest.rewards.reputation)[i]] + " reputation with " + replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1));
				Player.reputation[Object.keys(quest.rewards.reputation)[i]].changed = true;
				if(Dom.reputation.ready){
					document.getElementById("reputationPage").innerHTML += replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1) + ': <div class="widthPadding"></div> <div class="reputationBox"> <div class="reputationBar"></div> </div><br><br><br>';
				}
			}
		}
	}
	Dom.reputation.update(); // updates the reputation display
	for(let i = 0; i < Player.quests.activeQuestArray.length; i++){ // repeats for all active quests
		if(Player.quests.activeQuestArray[i] === Dom.currentlyDisplayed.quest){ // if this is the quest you just finished...
			Player.quests.activeQuestArray.splice(i,1); // ...remove it from the active quest array...
		}
	}
	Dom.quests.completed(Dom.currentlyDisplayed); // add the quest to the completed quest array
	if (Dom.currentlyDisplayed.onQuestFinish !== undefined) { // if there is a quest start function...
		Dom.currentlyDisplayed.onQuestFinish(); // ...do it
	}
	Dom.changeBook(Dom.previous, true); // change back to previous page
	Dom.quests.possible(); // update the possible quest box
}

Dom.quests.active = function(quest){ // when a quest is started or ended...
	if(quest !== undefined){ // if a quest is started...
		Player.quests.activeQuestArray.push(quest.quest); // adds the quest name to the array of active quest names
	}
	document.getElementById("activeQuestBox").style.textAlign = "left"; // the text in the box is written from the left
	document.getElementById("activeQuestBox").innerText = ""; // sets the text in the box to none
	for(let x = 0; x < Player.quests.activeQuestArray.length; x++){ // repeats for every active quest
		let currentQuest = "";
		for(let i = 0; i < Object.keys(Quests).length; i++){
			for(let y = 0; y < Quests[Object.keys(Quests)[i]].length; y++){
				if(Quests[Object.keys(Quests)[i]][y].quest === Player.quests.activeQuestArray[x]){
					currentQuest = Quests[Object.keys(Quests)[i]][y];
				}
			}
		}
		if(x !== 0){
			document.getElementById("activeQuestBox").innerHTML += "<br><br>";
		}
		document.getElementById("activeQuestBox").innerHTML += "<strong>" + currentQuest.quest + "</strong>"; // writes the name of the quest in the box
		for(let i = 0; i < currentQuest.objectives.length; i++){ // repeats for each objective
			document.getElementById("activeQuestBox").innerHTML += "<br>" + currentQuest.objectives[i]; // writes the objective in the box
			if(currentQuest.isCompleted()[i] === true && i !== currentQuest.objectives.length-1){ // if the objective has been completed...
				document.getElementById("activeQuestBox").innerHTML += " &#10004;"; // ...put a tick next to it
			}else if(currentQuest.isCompleted()[i] !== false && i !== currentQuest.objectives.length-1){ // if the objective is partly completed...
				document.getElementById("activeQuestBox").innerHTML += currentQuest.isCompleted()[i];
			}
		}
		if(currentQuest.wasCompleted === undefined){
			currentQuest.wasCompleted = currentQuest.isCompleted();
		}else{
			if(JSON.stringify(currentQuest.wasCompleted) !== JSON.stringify(currentQuest.isCompleted())){
				Dom.chat.insert("Quest log updated", 0, true);
				currentQuest.wasCompleted = currentQuest.isCompleted();
			}
		}
		if(quest !== undefined){ // if a quest is started
			document.getElementById("activeQuestBox").innerHTML += "<br>"; // adds a new line to the box
			//document.getElementById("activeQuestBox").style.height = "auto"; // ...the box
		}
	}
	if(Player.quests.activeQuestArray.length === 0){ // if there are no active quests
		//document.getElementById("activeQuestBox").style.height = "30px"; // set the height to 40px
		document.getElementById("activeQuestBox").style.textAlign = "center"; // write text in the centre
		document.getElementById("activeQuestBox").innerText = "You have no active quests"; // write "you have no active quests"
	}
}

Dom.quests.possible = function(){
	Player.quests.possibleQuestArray = [];
	document.getElementById("possibleQuestBox").innerHTML = "";
	document.getElementById("possibleQuestBox").style.textAlign = "left"; // write text in the centre
	for(let i = 0; i < Object.keys(Quests).length; i++){ // repeats this code for each area
		for(let x = 0; x < Quests[Object.keys(Quests)[i]].length; x++){ // repeats this code for each quest
			if(!Player.quests.completedQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest) && !Player.quests.activeQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest) && Player.level >= Quests[Object.keys(Quests)[i]][x].levelRequirement && isContainedInArray(Quests[Object.keys(Quests)[i]][x].questRequirements,Player.quests.completedQuestArray)){
				if(Player.quests.possibleQuestArray.length !== 0){
					document.getElementById("possibleQuestBox").innerHTML += "<br><br>";
				}
				Player.quests.possibleQuestArray.push(Quests[Object.keys(Quests)[i]][x].quest);
				document.getElementById("possibleQuestBox").innerHTML += "<strong>" + Quests[Object.keys(Quests)[i]][x].quest + "</strong><br>" + Quests[Object.keys(Quests)[i]][x].howToStart; // writes the name of the quest in the box
				//document.getElementById("possibleQuestBox").style.height = "auto"; // ...of the box
			}
		}
	}
	if(Player.quests.possibleQuestArray.length === 0){ // if there are no possible quests
		//document.getElementById("possibleQuestBox").style.height = "30px"; // set the height to 40px
		document.getElementById("possibleQuestBox").style.textAlign = "center"; // write text in the centre
		document.getElementById("possibleQuestBox").innerText = "You have no possible quests"; // write "you have no possible quests"
	}
	Dom.quests.other();
}

Dom.quests.completed = function(quest){ // when a quest is completed...
	//Dom.changeBook(Dom.previous, true); // the completed quest page opens
	if(quest !== undefined){
		Player.quests.completedQuestArray.push(quest.quest); // the quest is added to the array of completed quests
	}
	if(Player.quests.completedQuestArray.length > 0){
		document.getElementById("completedQuestBox").style.textAlign = "left"; // the text in the box is written from the left
		document.getElementById("completedQuestBox").innerText = ""; // ...it sets the box to empty
		for(let i = 0; i < Player.quests.completedQuestArray.length; i++){
			document.getElementById("completedQuestBox").innerHTML += Player.quests.completedQuestArray[i] + "<br>"; // adds the quests you just completed to the box
		}
	}
}

Dom.quests.other = function(){
	document.getElementById("otherQuestBox").innerHTML = "";
	for(let i = 0; i < Object.keys(Quests).length; i++){ // repeats this code for each area
		for(let x = 0; x < Quests[Object.keys(Quests)[i]].length; x++){ // repeats this code for each quest
			if(!Player.quests.activeQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest) && !Player.quests.possibleQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest) && !Player.quests.completedQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest)){
				document.getElementById("otherQuestBox").innerHTML += Quests[Object.keys(Quests)[i]][x].quest + "<br>"; // writes the name of the quest in the box
				//document.getElementById("otherQuestBox").style.height = "auto"; // ...of the box
			}
		}
	}
	if(document.getElementById("otherQuestBox").innerHTML === ""){ // if there are no possible quests
		//document.getElementById("otherQuestBox").style.height = "30px"; // set the height to 40px
		document.getElementById("otherQuestBox").style.textAlign = "center"; // write text in the centre
		document.getElementById("otherQuestBox").innerText = "You have unlocked every quest"; // write "you have no possible quests"
	}
}
Dom.quests.other();
Dom.quests.possible();

Dom.merchant.page = function(npc, sold){ // merchant page
	Dom.changeBook("merchantPage", true/*false*/); // changes the page to the merchant page
	Dom.currentlyDisplayed = npc.name; // sets the currently displayed variable to the merchant's name
	Dom.changeBook("merchantPage", false, 1); // stops close button being red
	document.getElementById("merchantPageTitle").innerHTML = npc.name; // sets the title to the merchant's name
	document.getElementById("merchantPageChat").innerHTML = npc.chat.shopGreeting; // sets the greeting to the merchant's greeting
	document.getElementById("merchantPageOptions").innerHTML = ""; // sets the options to none
	document.getElementById("merchantPageBuy").innerHTML = ""; // sets the buy buttons to none
	for(let i = 0; i < sold.length; i++){ // repeats for each option
		document.getElementById("merchantPageOptions").innerHTML += "<img src=" + sold[i].image + " class='theseOptions' style='border: 5px solid #886622;'></img><br><br>"; // sets the image for the option
		if(sold[i].costCurrency === undefined){
			sold[i].costCurrency = 2;
		}
		document.getElementById("merchantPageBuy").innerHTML += "<div class='buy'>Buy for: " + sold[i].cost + " " + Items.currency[sold[i].costCurrency].name + "</div><br>"; // makes a buy button next to the option
		for(let x = 0; x < document.getElementsByClassName("buy").length; x++){ // repeats for every buy button
			document.getElementsByClassName("buy")[x].onclick = function() { // when you click on a buy button...
				Dom.merchant.buy(sold[x], x, npc); // ...the buy function is called
			};
		}
		for(let x = 0; x < document.getElementsByClassName("theseOptions").length; x++){ // repeats for every option
			document.getElementsByClassName("theseOptions")[x].onmouseover = function() { // when you hover over an item...
				Dom.merchant.displayInformation(document.getElementsByClassName("theseOptions")[x].getBoundingClientRect().top, sold, x); // ...its information displays
			};
			document.getElementsByClassName("theseOptions")[x].onmouseleave = function() { // when you stop hovering over an item...
				Dom.expand("informationMerchant"); // ...its information stops displaying
			}
		}
		document.getElementById("close").onclick = function(){
			Dom.changeBook(Dom.previous, true);
			npc.say(npc.chat.shopLeave, true, 0, false);
		}
	}
}

Dom.merchant.buy = function(item,index,npc){ // buy item from merchant
	if(Dom.inventory.check(item.costCurrency,"currency",item.cost) && Dom.inventory.requiredSpace([item],[item.costQuantity])){ // if they have an enough gold...
		document.getElementsByClassName("buy")[index].style.backgroundColor = "#bb9933";
		setTimeout(function(){
			document.getElementsByClassName("buy")[index].style.backgroundColor = "#fef9b4";
		},200);
		Dom.inventory.removeById(item.costCurrency,"currency",item.cost);
		Dom.inventory.give(item,item.costQuantity); // gives the player the item
		Dom.chat.insert("You bought a " + item.name + ".", 100); // tells the player they bough an item in the chat
	}else{ // if they do not have enough gold...
		if(!Dom.inventory.check(item.costCurrency,"currency",item.cost)){
			document.getElementsByClassName("buy")[index].style.border = "5px solid red"; // alert them that they don't have enough gold
			setTimeout(function(){
				document.getElementsByClassName("buy")[index].style.border = "5px solid #886622";
			},200);
			npc.say(npc.chat.tooPoor, true, 0, false);
		}else{
			npc.say(npc.chat.inventoryFull, true, 0, false);
			Dom.alert.page("You do not have enough space in your inventory for that item.");
		}
	}
}

Dom.identifier.displayed = 0; // set the currently displayed item in the identifier to the latest one	
Dom.identifier.left = function(npc, over){ // code called on clicking the left arrow to change the displayed item to the previous item
	if(Dom.identifier.displayed !== 0){ // checks if the currently displayed item is the first in the array
		Dom.identifier.displayed--; // sets the currently displayed item to the previous item
	}else{
		Dom.identifier.displayed = Dom.identifier.unId.length-1; // sets the currently displayed item to the last item in the array
	}
	Dom.identifier.page(npc, over); // opens and updates the identifier page
}

Dom.identifier.right = function(npc, over){ // this code is not important
	if(Dom.identifier.displayed !== Dom.identifier.unId.length-1){ // checks if the currently displayed item is the last in the array
		Dom.identifier.displayed++; // sets the currently displayed item to the next item
	}else{
		Dom.identifier.displayed = 0; // sets the currently displayed item to the first item in the array
	}
	Dom.identifier.page(npc, over); // opens and updates the identifier page
}

Dom.identifier.page = function(npc, over){ // identifier page
	Dom.changeBook("identifierPage", over); // changes page to identifier
	Dom.currentlyDisplayed = npc.name; // sets the currently displayed page variable to identifier
	Dom.changeBook("identifierPage", false, 1); // stops close button being red
	Dom.identifier.unId = [];
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].unidentified){
			Dom.identifier.unId.push(Player.inventory.items[i]);
		}
	}
	if(Dom.identifier.unId.length !== 0){ // checks if the player has any unIDed items
		document.getElementById("identifierPageChat").innerHTML = npc.chat.identifierGreeting; // sets the greeting to the parameter (chat)
		document.getElementById("identifierPageOption").innerHTML = "<img src=" + Dom.identifier.unId[Dom.identifier.displayed].image + " class='theseOptions' style='padding: 0px; margin: 0px; border: 5px solid #886622; height: 50px; width: 50px;'></img>"; // sets the image to the selected item
		document.getElementById("identifierPageOption").onmouseover = function(){ // when the player hovers over the item...
			Dom.identifier.displayInformation(Dom.identifier.displayed,Dom.identifier.unId); // ...it displays its information
		}
		document.getElementById("identifierPageOption").onmouseleave = function(){ // when the player stops hovering over the item...
			Dom.expand("identifierInformation"); // ...it stops displaying the information
		}
		document.getElementById("identifierPageBuy").style.visibility = "visible"; // shows the buy button...
		document.getElementById("identifierPageBuy").onclick = function(){ // when the player clicks identify...
			Dom.identifier.identify(npc); // ...it calls the identify function (below)
		}
		document.getElementById("leftArrow").style.top = document.getElementById("identifierPageOption").getBoundingClientRect().top - 32 +"px"; // sets the left arrows position to the same height as the image
		document.getElementById("leftArrow").style.left = document.getElementById("identifierPageOption").getBoundingClientRect().left - 31 +"px"; // sets the left arrows position to left of the image
		document.getElementById("leftArrow").onclick = function(){ // when the player clicks on the left arrow...
			Dom.identifier.left(npc); // ...it changes the selected item to the previous unIDed item
		}
		document.getElementById("rightArrow").style.top = document.getElementById("identifierPageOption").getBoundingClientRect().top - 32 +"px"; // sets the right arrows position to the same height as the image
		document.getElementById("rightArrow").style.left = document.getElementById("identifierPageOption").getBoundingClientRect().left + 71 +"px"; // sets the right arrows position to right of the image
		document.getElementById("rightArrow").onclick = function(){ // when the player clicks in the right arrow...
			Dom.identifier.right(npc); // it changes the selected item to the next unIDed item
		}
		document.getElementById("identifierPageBuy").innerHTML = "Identify for: "+"1"+" gold"; // sets the text inside the identify button
	}else{
		document.getElementById("identifierPageChat").innerHTML = npc.chat.noUnidentified;
		document.getElementById("identifierPageOption").innerHTML = "";
		document.getElementById("identifierPageBuy").style.visibility = "hidden";
		document.getElementById("leftArrow").style.top = "-1000px";
		document.getElementById("rightArrow").style.top = "-1000px";
	}
}

Dom.inventory.give = function(item,num){ // gives the player the item
	let number = num;
	let added = false;
	if(number === undefined){
		number = 1;
	}
	for(let y = 0; y < number; y++){
		let add = true;
		for(let i = 0; i < Player.inventory.items.length; i++){
			if(Player.inventory.items[i].name === item.name && Player.inventory.items[i].type === item.type && Player.inventory.items[i].image === item.image){
				if(Player.inventory.items[i].stacked === undefined){
					Player.inventory.items[i].stacked = 1;
				}		
				if(Player.inventory.items[i].stacked < Player.inventory.items[i].stack){
					added = true;
					Player.inventory.items[i].stacked++;
					document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img><div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>"; // sets stack size
					add = false;
				}
			}
		}
		if(add){
			for(let i = 0; i < Player.inventory.items.length; i++){ // repeats code for all inventory slots
				if(Object.keys(Player.inventory.items[i]).length === 0){ // if the slot is empty
					added = true;
					Player.inventory.items[i] = Object.assign({},item); // puts the item in the inventory slot
					document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img>"; // sets the items image
					if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
						document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
					}
					if(i === 5 && item.type === "bag"){
						for(let x = 0; x < Math.floor(item.size/6); x++){
							document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+Player.inventory.items.length+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+1)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+2)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+3)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+4)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+5)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
							Player.inventory.items.push({},{},{},{},{},{});
						}
						Dom.inventory.update();
					}
					break; // stops the item being placed in multiple slots
				}
			}
		}
	}
	Dom.hotbar.update();
	if(added){
		return true;
	}else{
		return false;
	}
}

Dom.inventory.constructUnId = function(area,tier){
	let tempUnId = new unId(area,tier);
	Dom.inventory.give(tempUnId);
}

function unId(area,tier){ // constructs an unidentified item when you kill an enemy
	this.area = area; // sets the item's area to the area you are in
	this.tier = tier; // sets the item's tier to the tier of the enemy
	let types = ["helm","chest","greaves","boots","sword","staff","bow"]; // an array of types of weapon/armour
	this.typeNum = Math.floor(Math.random()*7); // a random number between 0 and 7...
	this.type = types[this.typeNum].toLowerCase(); // ...used to choose a random category (e.g. bow)
	this.image = "assets/items/"+this.type+"/unidentified.png"; // sets the item's image to the default for its category (e.g. basic bow)
	this.rarityNum = Math.floor(Math.random()*25); // a random number between 0 and 25
	if(this.rarityNum < 18){ // 18/25 chance that the item is a...
	this.rarity = "common"; // ...common
	}else if(this.rarityNum < 24){ // 6/25 chance that the item is a...
		this.rarity = "unique"; // ...unique
	}else{ // 1/25 chance that the item is a...
		this.rarity = "mythic"; // ...mythic
	}
	this.unidentified = true;
	this.sellPrice = 1;
}

Dom.identifier.identify = function(npc){ // the page that you go to when you click "identify for 1 gold"
	if(Dom.inventory.check(2,"currency",1) && Dom.identifier.unId.length !== 0){ // if the player can afford the item
		Dom.inventory.removeById(2,"currency",1);
		Dom.changeBook("identifiedPage",true); // changed page to the identified page
		Dom.currentlyDisplayed = npc.name; // sets the currently displayed page variable to identified
		
		for(let i = 0; i < Player.inventory.items.length; i++){
			if(Player.inventory.items[i].unidentified && Player.inventory.items[i].tier === Dom.identifier.unId[Dom.identifier.displayed].tier && Player.inventory.items[i].area === Dom.identifier.unId[Dom.identifier.displayed].area && Player.inventory.items[i].rarity === Dom.identifier.unId[Dom.identifier.displayed].rarity && Player.inventory.items[i].type === Dom.identifier.unId[Dom.identifier.displayed].type){
				Player.inventory.items[i] = {};
				document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "";
				break;
			}
		}
		
		Dom.identifier.array = []; // sets the possible items to none
		if(Dom.identifier.unId[Dom.identifier.displayed].rarity === "common"){ // if it is a common item...
			document.getElementById("identifiedPageChat").innerHTML = npc.chat.identifyCommon; // ...it uses the "common" chat
		}else if(Dom.identifier.unId[Dom.identifier.displayed].rarity === "unique"){ // if it is a unique item...
			document.getElementById("identifiedPageChat").innerHTML = npc.chat.identifyUnique; // ...it uses the "unique" chat
		}else{ // if it is a myhtic item...
			document.getElementById("identifiedPageChat").innerHTML = npc.chat.identifyMythic; // ...it uses the "mythic" chat
		}
		for(let i = 0; i < Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]].length; i++){ // for every item of the same catergory (e.g. bow)...
			if(Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]][i].tier === Dom.identifier.unId[Dom.identifier.displayed].tier && Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]][i].area === Dom.identifier.unId[Dom.identifier.displayed].area && Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]][i].rarity === Dom.identifier.unId[Dom.identifier.displayed].rarity){ // ...check if it matches the stats...
				Dom.identifier.array.push(Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]][i]); // ...if it does add is to the array of possible items
			}
		}
		Dom.identifier.num = Math.floor(Math.random()*Dom.identifier.array.length); // a random number between 0 and the number of items in the array of possible items
		Dom.identifier.item = Dom.identifier.array[Dom.identifier.num]; // a random item from the array of possible items
		document.getElementById("identifiedPageOption").innerHTML = "<img src=" + Dom.identifier.item.image + " class='theseOptions' style='padding: 0px; margin: 0px; border: 5px solid #886622; height: 50px; width: 50px;'></img>"; // sets the image to the selected item
		Dom.inventory.give(Dom.identifier.item); // gives the player the item
		document.getElementById("identifiedPageOption").getElementsByTagName("img")[0].onmouseover = function(){ // when the player hovers over the item...
			Dom.identifier.displayIdentifiedInformation(Dom.identifier.num,Dom.identifier.array); // ...it displays its information
		}
		document.getElementById("identifiedPageOption").getElementsByTagName("img")[0].onmouseleave = function(){ // when the player stops hovering over the item...
			Dom.expand("identifiedInformation"); // ...it stops displaying the information
		}
		document.getElementById("identifiedPageBack").onclick = function(){ // when you click on the back button...
			Dom.identifier.displayed = 0;
			Dom.identifier.page(npc, true); // ...the page goes back to the normal identifier
		}
		Dom.identifier.unId.splice(Dom.identifier.displayed, 1); // removes from the array of unidentified items
	}else if(Dom.identifier.unId.length !== 0){ // if the player can't afford the item
 		document.getElementById("identifierPageBuy").style.border = "5px solid red"; // alert them that they don't have enough gold
		setTimeout(function(){
			document.getElementById("identifierPageBuy").style.border = "5px solid #886622";
		},200);
		npc.say(npc.chat.tooPoor, true, 0, true);
	}
}

Dom.inventory.dispose = function(ev){
	let quest = false;
	if(!isNaN(parseInt(ev.dataTransfer.getData("text")))){
		if(Player.inventory.items[parseInt(ev.dataTransfer.getData("text"))].quest){
			quest = true;
		}
	}
	let remove = true;
	for(let i = 6; i < Player.inventory.items.length; i++){
		if(Object.keys(Player.inventory.items[i]).length !== 0){
			remove = false;
		}
	}
	ev.preventDefault(); // allows the item to drop
	if((ev.target.id === "inventoryPage" || ev.target.id === "displayStats" || ev.target.id === "bagText") && !(!remove && ev.dataTransfer.getData("text") === "5" && Player.inventory.items[5].type === "bag") && !quest){
		Dom.alert.target = function(ev, all){
			if(!isNaN(parseInt(ev[0]))){
				if(parseInt(ev[0]) === 5 && Player.inventory.items[5].type === "bag"){
					document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(0)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(1)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(2)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(3)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(4)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(5)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
					document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
					for(let x = 0; x < 6; x++){
						if(Object.keys(Player.inventory.items[x]).length !== 0){
							document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML = '<img src="'+Player.inventory.items[x].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+x+')"></img>';
							if(Player.inventory.items[x].stacked !== undefined && Player.inventory.items[x].stacked !== 1){
								document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML += "<div class='stackNum' id='stackNum"+x+"'>"+Player.inventory.items[x].stacked+"</div>";
							}					
						}
					}
					Player.inventory.items.splice(6,Player.inventory.items.length-6);
					Dom.inventory.update();
				}
				if(ev.length === 1){
					Dom.inventory.remove(parseInt(ev[0]), all); // removes the item
				}else{
					Dom.inventory.remove(parseInt(ev[0]+ev[1]), all); // removes the item
				}
			}else if(ev[0] === "w"){
				Dom.inventory.removeEquipment(Player.inventory.weapon);
				Player.inventory.weapon.splice(0,1); // removes the weapon
				Player.inventory.weapon.push({name: "",image: "",stats: {},},); // sets the weapon to no weapon
				document.getElementById("weapon").innerHTML = ""; // deletes the image
			}else if(ev[0] === "h"){
				Dom.inventory.removeEquipment(Player.inventory.helm);
				Player.inventory.helm.splice(0,1); // removes the helm
				Player.inventory.helm.push({name: "",image: "",stats: {},},); // sets the helm to no helm
				document.getElementById("helm").innerHTML = ""; // deletes the image
			}else if(ev[0] === "c"){
				Dom.inventory.removeEquipment(Player.inventory.chest);
				Player.inventory.chest.splice(0,1); // removes the chest
				Player.inventory.chest.push({name: "",image: "",stats: {},},); // sets the chest to no chest
				document.getElementById("chest").innerHTML = ""; // deletes the image
			}else if(ev[0] === "g"){
				Dom.inventory.removeEquipment(Player.inventory.greaves);
				Player.inventory.greaves.splice(0,1); // removes the greaves
				Player.inventory.greaves.push({name: "",image: "",stats: {},},); // sets the greaves to no greaves
				document.getElementById("greaves").innerHTML = ""; // deletes the image
			}else{
				Dom.inventory.removeEquipment(Player.inventory.boots);
				Player.inventory.boots.splice(0,1); // removes the boots
				Player.inventory.boots.push({name: "",image: "",stats: {},},); // sets the boots to no boots
				document.getElementById("boots").innerHTML = ""; // deletes the image
			}
		};
		Dom.alert.ev = Object.assign({},ev.dataTransfer.getData("text"));
		if(!isNaN(parseInt(ev.dataTransfer.getData("text")))){
			if(Player.inventory.items[parseInt(ev.dataTransfer.getData("text"))].stacked > 1){
				Dom.alert.page("How many would you like to drop?", true, true);
			}else{
				Dom.alert.page("Are you sure you want to drop this item? It will be lost forever!", true);
			}
		}else{
			Dom.alert.page("Are you sure you want to drop this item? It will be lost forever!", true);
		}
	}else if(ev.target.id === "inventoryPage" || ev.target.id === "displayStats" || ev.target.id === "bagText"){
		if(!quest){
			Dom.alert.page("Move some items to the bank, sell or dispose of them before you can do that.");
		}else{
			Dom.alert.page("You cannot dispose of this item because you need it for a quest.");
		}
	}
}

Dom.inventory.removeById = function(ID, type, num){
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].type === type && Player.inventory.items[i].id === ID){
			for(let x = 0; x < num; x++){
				Dom.inventory.remove(i);
			}
			break;
		}
	}
	Dom.hotbar.update();
}

Dom.inventory.remove = function(num, all){
	for(let i = 0; i < (isNaN(all) ? 1 : all); i++){
		if(Player.inventory.items[num].stacked === 1 || Player.inventory.items[num].stacked === undefined || all === true){
			document.getElementById("itemInventory").getElementsByTagName("td")[num].innerHTML = ""; // removes the image from the inventory
			Player.inventory.items[num] = {}; // removes the image from the inventory
		}else{
			Player.inventory.items[num].stacked--;
			if(Player.inventory.items[num].stacked !== 1){
				document.getElementById("itemInventory").getElementsByTagName("td")[num].innerHTML = "<img src='"+Player.inventory.items[num].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+num+")' "+(!Player.inventory.items[num].unidentified ? (Items[Player.inventory.items[num].type][Player.inventory.items[num].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+num+"].type][Player.inventory.items["+num+"].id].onClick("+num+")'" : "") : "")+"></img><div class='stackNum' id='stackNum"+num+"'>"+Player.inventory.items[num].stacked+"</div>"; // sets the stack size
			}else{
				document.getElementById("itemInventory").getElementsByTagName("td")[num].innerHTML = "<img src='"+Player.inventory.items[num].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+num+")' "+(!Player.inventory.items[num].unidentified ? (Items[Player.inventory.items[num].type][Player.inventory.items[num].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+num+"].type][Player.inventory.items["+num+"].id].onClick("+num+")'" : "") : "")+"></img>"; // sets the stack size
			}
		}
	}
	Dom.hotbar.update();
}

Dom.inventory.update = function(){ // updates the position of the "buy bags to get more inventory space" text
	document.getElementById("bagText").style.top = 300+(26*(document.getElementById("itemInventory").rows.length))+"px"; // sets the position to half way below the inventory
}

Dom.inventory.allowDrop = function(ev) { // when an item is held over a place that it can be dropped in...
    ev.preventDefault(); // ...allows the item to be dropped
}

Dom.inventory.drag = function(ev, x) { // when an item is dragged...
    ev.dataTransfer.setData("text", x); // ...sets the variables for the drop
	Dom.expand("itemInformation"); // hides the item information
}

Dom.inventory.drop = function(ev,equip) { // when an item is dropped
    ev.preventDefault(); // allows the item to drop
	let data = ev.dataTransfer.getData("text"); // sets the variable data to a set variable chosen when the item was picked up
	let test = ""+ev.target+""; // checks if there is an item already there
	if(equip === undefined){ // if the item is being moved to an inventory slot
		if(data !== "weapon" && data !== "helm" && data !== "chest" && data !== "greaves" && data !== "boots"){ // if the item is being moved from an inventory slot
			if(test[12] === "T" && ev.target.innerHTML === ""){ // if there is not an item already there
				for(let i = 0; i < Player.inventory.items.length; i++){ // repeats code for all inventory slots
					let remove = true;
					if((i === 5 && Player.inventory.items[i].type === "bag") || (data === "5" && Player.inventory.items[data].type === "bag")){
						for(let i = 6; i < Player.inventory.items.length; i++){
							if(Object.keys(Player.inventory.items[i]).length !== 0){
								remove = false;
							}
						}
					}
					if(document.getElementById("itemInventory").getElementsByTagName("td")[i] === ev.target && ((i < 6 && remove && parseInt(data) === 5 && Player.inventory.items[data].type === "bag") || !(parseInt(data) === 5 && Player.inventory.items[data].type === "bag"))){ // if the item slot is where you are putting the item
						Player.inventory.items[i] = Player.inventory.items[data]; // sets the slot you are putting the item in to the item you are putting in it
						document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = ""; // removes the image from the old slot
						ev.target.innerHTML = "<img src='"+Player.inventory.items[data].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img>"; // updates the image for the new slot
						if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
							ev.target.innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
						}
						if(parseInt(data) === 5 && Player.inventory.items[data].type === "bag"){
							document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(0)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(1)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(2)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(3)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(4)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(5)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
							document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
							for(let x = 0; x < 6; x++){
								if(Object.keys(Player.inventory.items[x]).length !== 0){
									document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML = '<img src="'+Player.inventory.items[x].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+x+')"></img>';
									if(Player.inventory.items[x].stacked !== undefined && Player.inventory.items[x].stacked !== 1){
										document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML += "<div class='stackNum' id='stackNum"+x+"'>"+Player.inventory.items[x].stacked+"</div>";
									}					
								}
							}
							Player.inventory.items.splice(6,Player.inventory.items.length-6);
						}
						if(i === 5 && Player.inventory.items[data].type === "bag"){
							for(let x = 0; x < Math.floor(Player.inventory.items[data].size/6); x++){
								document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+Player.inventory.items.length+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+1)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+2)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+3)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+4)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+5)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
								Player.inventory.items.push({},{},{},{},{},{});
							}
						}
						Player.inventory.items[data] = {}; // sets the slot you got the item from to empty
						document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = ""; // removes the image from the old slot
					}else if(document.getElementById("itemInventory").getElementsByTagName("td")[i] === ev.target){
						Dom.alert.page("Move some items to the bank or dispose of them before you can do that.");
					}
				}
			}else{ // if there is an item already there
				for(let i = 0; i < Player.inventory.items.length; i++){ // repeats code fot all inventory slots
					let str = document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML;
					
					let remove = true;
					if((i === 5 && Player.inventory.items[i].type === "bag") || (data === "5" && Player.inventory.items[data].type === "bag")){
						for(let x = 6; x < Player.inventory.items.length; x++){
							if(Player.inventory.items[x].image !== undefined){
								if(i === 5 && Player.inventory.items[i].type === "bag" && Player.inventory.items[data].type === "bag"){
									if(Player.inventory.items[i].size >= Player.inventory.items[data].size){
										if(x >= Player.inventory.items[i].size){
											remove = false;
										}
										//remove = false;
									/*}else{
										remove = Player.inventory.items[i].size - Player.inventory.items[data].size;*/
									}
								}else if(data === "5" && Player.inventory.items[data].type === "bag" && Player.inventory.items[i].type === "bag"){
									if(Player.inventory.items[data].size >= Player.inventory.items[i].size){
										if(x >= Player.inventory.items[data].size){
											remove = false;
										}
										//remove = false;
									/*}else{
										remove = Player.inventory.items[data].size - Player.inventory.items[i].size;*/
									}
								}else{
									remove = false;
								}
							}
						}
					}
					
					if((str === ev.target.outerHTML || ev.target.outerHTML === str.substring(0,str.length-44) || ev.target.outerHTML === str.substring(0,str.length-45) || ev.target.outerHTML === str.substring(0,str.length-46) || ev.target.outerHTML === str.substring(0,str.length-47) || ev.target.outerHTML === str.substring(str.length-44) || ev.target.outerHTML === str.substring(str.length-45) || ev.target.outerHTML === str.substring(str.length-46) || ev.target.outerHTML === str.substring(str.length-47)) && remove){// && ((i < 6 && remove && (parseInt(data) === 5 && Player.inventory.items[data].type === "bag" || i === 5 && Player.inventory.items[i].type === "bag")) || !(parseInt(data) === 5 && Player.inventory.items[data].type === "bag" || i === 5 && Player.inventory.items[i].type === "bag"))){ // if the item slot is where you are putting the item
						test = Player.inventory.items[i]; // sets the variable for later
						Player.inventory.items[i] = Player.inventory.items[data]; // sets the slot you are putting the item in to the item you are putting in it
						Player.inventory.items[data] = test; // sets the slot you got the item from to the item in the slot you are putting the item in
						document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = "<img src='"+test.image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+data+")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img>"; // updates the image for the previous slot
						if(test.stacked !== undefined && test.stacked !== 1){
							document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML += "<div class='stackNum' id='stackNum"+data+"'>"+test.stacked+"</div>";
						}
						document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img>"; // updates the image fot the new slot
						if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
							document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
						}
						if(parseInt(data) === 5 && Player.inventory.items[i].type === "bag"){ // going from bag slot from a bag
							if(test.type === "bag"){
								if(test.size >= Player.inventory.items[i].size){
									for(let x = 0; x < (test.size - Player.inventory.items[i].size)/6; x++){
										document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+Player.inventory.items.length+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+1)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+2)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+3)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+4)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+5)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
										Player.inventory.items.push({},{},{},{},{},{});
									}
								}else{
									Player.inventory.items.splice(6+test.size,Player.inventory.items[i].size - test.size);
									document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(0)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(1)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(2)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(3)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(4)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(5)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
									for(let y = 1; y < (test.size/6)+1; y++){
										document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(0+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(1+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(2+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(3+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(4+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(5+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
									}
									for(let y = 0; y < Player.inventory.items.length; y++){
										if(Object.keys(Player.inventory.items[y]).length !== 0){
											document.getElementById("itemInventory").getElementsByTagName("td")[y].innerHTML = '<img src="'+Player.inventory.items[y].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+y+')"></img>';
											if(Player.inventory.items[y].stacked !== undefined && Player.inventory.items[y].stacked !== 1){
												document.getElementById("itemInventory").getElementsByTagName("td")[y].innerHTML += "<div class='stackNum' id='stackNum"+y+"'>"+Player.inventory.items[y].stacked+"</div>";
											}
										}
									}
								}
							}else if(remove){
								document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(0)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(1)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(2)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(3)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(4)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(5)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
								document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
								for(let x = 0; x < 6; x++){
									if(Object.keys(Player.inventory.items[x]).length !== 0){
										document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML = '<img src="'+Player.inventory.items[x].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+x+')"></img>';
										if(Player.inventory.items[x].stacked !== undefined && Player.inventory.items[x].stacked !== 1){
											document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML += "<div class='stackNum' id='stackNum"+x+"'>"+Player.inventory.items[x].stacked+"</div>";
										}
									}
								}
								Player.inventory.items.splice(6,Player.inventory.items.length-6);
							}else{
								Dom.alert.page("Move some items to the bank or dispose of them before you can do that.");
							}
						}else if(i === 5 && test.type === "bag"){ // going to bag slot to a bag
							if(Player.inventory.items[i].type === "bag"){
								if(Player.inventory.items[i].size >= test.size){
									for(let x = 0; x < (Player.inventory.items[i].size - test.size)/6; x++){
										document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+Player.inventory.items.length+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+1)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+2)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+3)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+4)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+5)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
										Player.inventory.items.push({},{},{},{},{},{});
									}
								}else{
									Player.inventory.items.splice(6+Player.inventory.items[i].size,test.size - Player.inventory.items[i].size);
									document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(0)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(1)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(2)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(3)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(4)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(5)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
									for(let y = 1; y < (Player.inventory.items[i].size/6)+1; y++){
										document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(0+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(1+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(2+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(3+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(4+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(5+6*y)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
									}
									for(let y = 0; y < Player.inventory.items.length; y++){
										if(Object.keys(Player.inventory.items[y]).length !== 0){
											document.getElementById("itemInventory").getElementsByTagName("td")[y].innerHTML = '<img src="'+Player.inventory.items[y].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+y+')"></img>';
											if(Player.inventory.items[y].stacked !== undefined && Player.inventory.items[y].stacked !== 1){
												document.getElementById("itemInventory").getElementsByTagName("td")[y].innerHTML += "<div class='stackNum' id='stackNum"+y+"'>"+Player.inventory.items[y].stacked+"</div>";
											}
										}
									}
								}
							}else if(remove){
								document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(0)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(1)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(2)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(3)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(4)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(5)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
								document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
								for(let x = 0; x < 6; x++){
									if(Object.keys(Player.inventory.items[x]).length !== 0){
										document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML = '<img src="'+Player.inventory.items[x].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+x+')"></img>';
										if(Player.inventory.items[x].stacked !== undefined && Player.inventory.items[x].stacked !== 1){
											document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML += "<div class='stackNum' id='stackNum"+x+"'>"+Player.inventory.items[x].stacked+"</div>";
										}
									}
								}
								Player.inventory.items.splice(6,Player.inventory.items.length-6);
							}else{
								Dom.alert.page("Move some items to the bank or dispose of them before you can do that.");
							}
						}else if(i === 5 && Player.inventory.items[i].type === "bag"){ // going to bag slot from a bag
							for(let x = 0; x < Math.floor(Player.inventory.items[i].size/6); x++){
								document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+Player.inventory.items.length+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+1)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+2)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+3)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+4)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+5)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
								Player.inventory.items.push({},{},{},{},{},{});
							}
						}else if(parseInt(data) === 5 && test.type === "bag"){ // going from bag slot to a bag
							for(let x = 0; x < Math.floor(test.size/6); x++){
								document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+Player.inventory.items.length+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+1)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+2)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+3)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+4)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation('+(Player.inventory.items.length+5)+')" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
								Player.inventory.items.push({},{},{},{},{},{});
							}
						}
						break;
					}else if(str === ev.target.outerHTML || ev.target.outerHTML === str.substring(0,str.length-44) || ev.target.outerHTML === str.substring(0,str.length-45) || ev.target.outerHTML === str.substring(0,str.length-46) || ev.target.outerHTML === str.substring(0,str.length-47) || ev.target.outerHTML === str.substring(str.length-44) || ev.target.outerHTML === str.substring(str.length-45) || ev.target.outerHTML === str.substring(str.length-46) || ev.target.outerHTML === str.substring(str.length-47)){
						Dom.alert.page("Move some items to the bank or dispose of them before you can do that.");
					}
				}
			}
		}else{ // if the item is being moved from a weapon/armour slot
			if(test[12] === "T" && ev.target.innerHTML === ""){ // if there is not an item already there
				for(let i = 0; i < Player.inventory.items.length; i++){ // repeats code for all inventory slots
					if(document.getElementById("itemInventory").getElementsByTagName("td")[i] === ev.target){ // if the item slot is where you are putting the item
						Player.inventory.items[i] = Player.inventory[data][0]; // sets the slot you are putting the item in to the item you are putting in it
						document.getElementById(data).innerHTML = ""; // updates the image for the new slot
						ev.target.innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img>"; // updates the image for the new slot
						if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
							ev.target.innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
						}
						if(Player.inventory.items[i].type !== "sword" && Player.inventory.items[i].type !== "staff" && Player.inventory.items[i].type !== "bow" && Player.inventory.items[i].type !== "rod"){ // if it is armour
							Dom.inventory.removeEquipment(Player.inventory[Player.inventory.items[i].type]); // removes the stats of that armour from the total
							Player.inventory[Player.inventory.items[i].type].splice(0,1); // sets the slot you are putting the item in to the item you are putting in it
							Player.inventory[Player.inventory.items[i].type].push({name: "",image: "",stats: {},},); // sets the slot you are putting the item in to the item you are putting in it
						}else{ // if it is a weapon
							Dom.inventory.removeEquipment(Player.inventory.weapon); // removes the stats of that weapon from the total
							Player.inventory.weapon.splice(0,1); // removes the weapon
							Player.inventory.weapon.push({name: "",image: "",stats: {},},); // sets the weapon to no weapon
						}
					}
				}
			}else{ // if there is an item already there
				for(let i = 0; i < Player.inventory.items.length; i++){ // repeats code for all inventory slots
					if(document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML === ev.target.outerHTML && ((((Player.inventory.items[i].type === "sword" && Player.class === "k") || (Player.inventory.items[i].type === "staff" && Player.class === "m") || (Player.inventory.items[i].type === "bow" && Player.class === "a") || Player.inventory.items[i].type === "rod") && data === "weapon") || Player.inventory.items[i].type === data)){ // if the item slot is where you are putting the item
						test = Player.inventory.items[i];
						Player.inventory.items[i] = Player.inventory[data][0]; // sets the slot you are putting the item in to the item you are putting in it
						document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory[data][0].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img>"; // updates the image for the new slot
						if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
							ev.target.innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
						}
						if(Player.inventory.items[i].type !== "sword" && Player.inventory.items[i].type !== "staff" && Player.inventory.items[i].type !== "bow" && Player.inventory.items[i].type !== "rod"){ // if it is armour
							Dom.inventory.removeEquipment(Player.inventory[Player.inventory.items[i].type]); // removes the stats of that armour from the total
							Player.inventory[Player.inventory.items[i].type].splice(0,1); // sets the slot you are putting the item in to the item you are putting in it
							Player.inventory[Player.inventory.items[i].type].push({name: "",image: "",stats: {},},); // sets the slot you are putting the item in to the item you are putting in it
						}else{ // if it is a weapon
							Dom.inventory.removeEquipment(Player.inventory.weapon); // removes the stats of that weapon from the total
							Player.inventory.weapon.splice(0,1); // removes the weapon
							Player.inventory.weapon.push({name: "",image: "",stats: {},},); // sets the weapon to no weapon
						}
						Player.inventory[data].splice(0,1);
						Player.inventory[data].push(test);
						Dom.inventory.addEquipment(Player.inventory[data]); // removes the stats of that armour from the total
						document.getElementById(data).innerHTML = "<img src='"+Player.inventory[data][0].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+data+"\")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img>"; // updates the image
					}
				}
			}
		}
	}else if(data !== "weapon" && data !== "helm" && data !== "chest" && data !== "greaves" && data !== "boots"){ // if the item is being moved to a weapon/armour slot
		if(test[12] === "D"){ // if there is not an item already there
			if((Player.inventory.items[data].type === ev.target.id || (((Player.inventory.items[data].type === "sword" && Player.class === "k") || (Player.inventory.items[data].type === "staff" && Player.class === "m") || (Player.inventory.items[data].type === "bow" && Player.class === "a") || Player.inventory.items[data].type === "rod") && ev.target.id === "weapon")) && !Player.inventory.items[data].unidentified){ // if the item is allowed in that slot (e.g. a helm in the helm slot)
				Player.inventory[ev.target.id].splice(0,1); // sets the slot you are putting the item in to the item you are putting in it
				Player.inventory[ev.target.id].push(Player.inventory.items[data]); // sets the slot you are putting the item in to the item you are putting in it
				Dom.inventory.addEquipment(Player.inventory[equip]); // adds the stats of the equipment to the total
				document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = ""; // updates the image for the new slot
				Player.inventory.items[data] = {}; // sets the slot you got the item from to empty
				document.getElementById(ev.target.id).innerHTML = "<img src='"+Player.inventory[ev.target.id][0].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+ev.target.id+"\")'></img>"; // updates the image
			}
		}else{ // if there is already an item there
			if((Player.inventory.items[data].type === equip || (((Player.inventory.items[data].type === "sword" && Player.class === "k") || (Player.inventory.items[data].type === "staff" && Player.class === "m") || (Player.inventory.items[data].type === "bow" && Player.class === "a") || Player.inventory.items[data].type === "rod") && equip === "weapon")) && !Player.inventory.items[data].unidentified){ // if the item is allowed in that slot (e.g. a helm in the helm slot);
				test = Player.inventory[equip][0]; // sets the variable for later
				Dom.inventory.removeEquipment(Player.inventory[equip]); // removes the stats of the equipment from the total
				Player.inventory[equip].splice(0,1); // sets the slot you are putting the item in to the item you are putting in it
				Player.inventory[equip].push(Player.inventory.items[data]); // sets the slot you are putting the item in to the item you are putting in it
				Dom.inventory.addEquipment(Player.inventory[equip]); // adds the stats of the equipment from the total
				document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = "<img src='"+test.image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+data+"\")'></img>"; // updates the image for the previous slot
				Player.inventory.items[data] = test; // sets the slot you got the item from to empty
				document.getElementById(equip).innerHTML = "<img src='"+Player.inventory[equip][0].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+equip+"\")'></img>"; // updates the image for the new slot
			}
		}
	}
	Dom.hotbar.update();
	Dom.inventory.update();
}

Dom.inventory.removeEquipment = function(array){ // removes the stats of an item from the player's total
	/*if(array === Player.inventory.weapon){
		document.getElementById("secondary").style.cursor = "default";
	}*/
	if(array[0].stats !== undefined){
		for(let i = 0; i < Object.keys(array[0].stats).length; i++){ // repeats code for all stats in old item
			if(Object.keys(array[0].stats)[i] !== "poison" && Object.keys(array[0].stats)[i] !== "damage"){
				Player.stats[Object.keys(array[0].stats)[i]] -= parseFloat(array[0].stats[Object.keys(array[0].stats)[i]]); // minuses that stat from the player's stats
			}else if(Object.keys(array[0].stats)[i] === "damage"){
				let split = array[0].stats.damage.split('-');
				Player.stats.damage -= parseFloat(split[0]);
				if(!isNaN(parseFloat(split[1]))){
					Player.stats.maxDamage -= parseFloat(split[1]);
				}
			}else{
				let split = array[0].stats.poison.split('/');
				Player.stats.poisonX -= parseFloat(split[0]);
				Player.stats.poisonY -= parseFloat(split[1]);
			}
		}
	}
	if(array[0].set !== undefined){ // if the item being removed is part of a set
		Dom.inventory.noSet = false; // allows the set code to run
		for(let i = 0; i < Items.set[array[0].set].armour.length; i++){ // repeats for all armour in the set
			if(Player.inventory.helm[0].name !== Items.set[array[0].set].armour[i] && Player.inventory.chest[0].name !== Items.set[array[0].set].armour[i] && Player.inventory.greaves[0].name !== Items.set[array[0].set].armour[i] && Player.inventory.boots[0].name !== Items.set[array[0].set].armour[i]){ // checks if the armour is being worn
				Dom.inventory.noSet = true; // does not allow the set code to run
			}
		}
		if(!Dom.inventory.noSet){ // set code (runs if the player was wearing a set but now isn't)
			for(let i = 0; i < Object.keys(Items.set[array[0].set].stats).length; i++){ // repeats for all stats in set
				if(Object.keys(Items.set[array[0].set].stats)[i] !== "poison" && Object.keys(Items.set[array[0].set].stats)[i] !== "damage"){
					Player.stats[Object.keys(Items.set[array[0].set].stats)[i]] -= parseFloat(Items.set[array[0].set].stats[Object.keys(Items.set[array[0].set].stats)[i]]); // minuses that stat from the player's stats
				}else if(Object.keys(Items.set[array[0].set].stats)[i] === "damage"){
					Player.stats.damage -= parseFloat(Items.set[array[0].set].stats.damage);
					if(Player.class === "m"){
						Player.stats.maxDamage -= parseFloat(Items.set[array[0].set].stats.damage);
					}
				}else{
					let split = Items.set[array[0].set].stats.poison.split('/');
					Player.stats.poisonX -= parseFloat(split[0]);
					Player.stats.poisonY -= parseFloat(split[1]);
				}
			}
		}
	}
}

Dom.inventory.addEquipment = function(array){ // adds the stats of an item to the payer's total
	/*if(array === Player.inventory.weapon){
		//document.getElementById("secondary").style.cursor = Player.class+Player.gender+Player.skin !== "am1" ? "crosshair" : "url(assets/unused/predatorTarget.png), auto;";
	}*/
	if(array[0].stats !== undefined){
		for(let i = 0; i < Object.keys(array[0].stats).length; i++){ // repeats code for all stats in old item
			if(Object.keys(array[0].stats)[i] !== "poison" && Object.keys(array[0].stats)[i] !== "damage"){
				Player.stats[Object.keys(array[0].stats)[i]] += parseFloat(array[0].stats[Object.keys(array[0].stats)[i]]); // minuses that stat from the player's stats
			}else if(Object.keys(array[0].stats)[i] === "damage"){
				let split = array[0].stats.damage.split('-');
				Player.stats.damage += parseFloat(split[0]);
				if(!isNaN(parseFloat(split[1]))){
					Player.stats.maxDamage += parseFloat(split[1]);
				}
			}else{
				let split = array[0].stats.poison.split('/');
				Player.stats.poisonX += parseFloat(split[0]);
				Player.stats.poisonY += parseFloat(split[1]);
			}
		}
	}
	if(array[0].set !== undefined){ // if the item being removed is part of a set
		Dom.inventory.noSet = false; // allows the set code to run
		for(let i = 0; i < Items.set[array[0].set].armour.length; i++){ // repeats for all armour in the set
			if(Player.inventory.helm[0].name !== Items.set[array[0].set].armour[i] && Player.inventory.chest[0].name !== Items.set[array[0].set].armour[i] && Player.inventory.greaves[0].name !== Items.set[array[0].set].armour[i] && Player.inventory.boots[0].name !== Items.set[array[0].set].armour[i]){ // checks if the armour is being worn
				Dom.inventory.noSet = true; // does not allow the set code to run
			}
		}
		if(!Dom.inventory.noSet){ // set code (runs if the player was wearing a set but now isn't)
			for(let i = 0; i < Object.keys(Items.set[array[0].set].stats).length; i++){ // repeats for all stats in set
				if(Object.keys(Items.set[array[0].set].stats)[i] !== "poison" && Object.keys(Items.set[array[0].set].stats)[i] !== "damage"){
					Player.stats[Object.keys(Items.set[array[0].set].stats)[i]] += parseFloat(Items.set[array[0].set].stats[Object.keys(Items.set[array[0].set].stats)[i]]); // minuses that stat from the player's stats
				}else if(Object.keys(Items.set[array[0].set].stats)[i] === "damage"){
					Player.stats.damage += parseFloat(Items.set[array[0].set].stats.damage);
					if(Player.class === "m"){
						Player.stats.maxDamage += parseFloat(Items.set[array[0].set].stats.damage);
					}
				}else{
					let split = Items.set[array[0].set].stats.poison.split('/');
					Player.stats.poisonX += parseFloat(split[0]);
					Player.stats.poisonY += parseFloat(split[1]);
				}
			}
		}
	}
}

Dom.inventory.check = function(ID, type, num){
	let completed = 0;
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].type === type && Player.inventory.items[i].id === ID){
			if(Player.inventory.items[i].stacked === undefined){
				Player.inventory.items[i].stacked = 1;
			}
			completed += Player.inventory.items[i].stacked;
			//break;
		}
	}
	if((Player.inventory.weapon[0].type === type && Player.inventory.weapon[0].id === ID) || (Player.inventory.helm[0].type === type && Player.inventory.helm[0].id === ID) || (Player.inventory.chest[0].type === type && Player.inventory.chest[0].id === ID) || (Player.inventory.greaves[0].type === type && Player.inventory.greaves[0].id === ID) || (Player.inventory.boots[0].type === type && Player.inventory.boots[0].id === ID)){
		completed++;
	}
	if(num !== undefined){
		if(completed >= num){
			completed = true;
		}else{
			completed = false;
		}
	}
	return(completed);
}

if(Player.class === "a"){
	document.getElementById("weapon").style.backgroundImage = "url('./assets/items/bow/1.png')";
}else if(Player.class === "m"){
	document.getElementById("weapon").style.backgroundImage = "url('./assets/items/staff/1.png')";
}else{
	document.getElementById("weapon").style.backgroundImage = "url('./assets/items/sword/1.png')";
}

document.getElementById("inventoryGoldXP").style.backgroundImage = 'url("./assets/class-select/'+Player.class+Player.gender+Player.skin+'/f.png")';
if(Player.class+Player.gender+Player.skin === "am1"){
	document.getElementById("inventoryGoldXP").style.right = "8px";
}
document.getElementById("settingLogout").innerHTML = "You are logged in as "+Player.name+"<div id='settingSave' onclick='Game.saveProgress()'>Save</div><div id='settingLogoutInner' onclick='Game.saveProgress(\"logout\")'>Logout</div><div id='settingDelete'>Delete</div>";

Dom.levelUp.page = function(){
	Dom.changeBook("levelUpPage",false,0);
	if(Dom.currentlyDisplayed === ""){
		Dom.currentlyDisplayed = Dom.previous;
	}
	Player.stats.maxHealth+=5;
	document.getElementById("levelUpPageLevel").innerHTML = Player.level-1 + " &#10132; " + Player.level;
	document.getElementById("levelUpPageUnlock").innerHTML = "<strong>Quests Unlocked:</strong>"
	for(let i = 0; i < Object.keys(Quests).length; i++){
		for(let x = 0; x < Quests[Object.keys(Quests)[i]].length; x++){
			if(Quests[Object.keys(Quests)[i]][x].levelRequirement === Player.level){
				document.getElementById("levelUpPageUnlock").innerHTML += "<br>" + Quests[Object.keys(Quests)[i]][x].quest;
			}
		}
	}
	if(Player.level >= LevelXP.length - 1){
		Player.xp = LevelXP[Player.level];
	}
	Dom.quests.possible();
}

Dom.alert.page = function(text, buttons, dispose, values){
	document.getElementById("alert").hidden = false;
	if(dispose){
		document.getElementById("alertYes").style.display = "inline-block";
		document.getElementById("alertDispose").style.display = "inline-block";
		document.getElementById("alertNo").style.left = "0px";
		document.getElementById("alertNo").style.bottom = "5px";
		document.getElementById("alertNo").innerHTML = "Cancel";
		document.getElementById("alertYes").innerHTML = values !== undefined ? values[0] : "One";
		document.getElementById("alertDispose").innerHTML = values !== undefined ? values[1] : "All";
	}else if(buttons){
		document.getElementById("alertYes").style.display = "inline-block";
		document.getElementById("alertDispose").style.display = "none";
		document.getElementById("alertNo").style.left = "15px";
		document.getElementById("alertNo").innerHTML = "No";
		document.getElementById("alertYes").innerHTML = "Yes";
		document.getElementById("alertNo").style.bottom = "20px";
	}else{
		document.getElementById("alertYes").style.display = "none";
		document.getElementById("alertDispose").style.display = "none";
		document.getElementById("alertNo").style.left = "0px";
		document.getElementById("alertNo").innerHTML = "OK";
		document.getElementById("alertNo").style.bottom = "20px";
	}
	document.getElementById("alertText").innerHTML = text;
}

document.getElementById("alertYes").onclick = function(){
	Dom.alert.target(Dom.alert.ev);
	document.getElementById("alert").hidden = true;
}

document.getElementById("alertDispose").onclick = function(){
	Dom.alert.target(Dom.alert.ev, true);
	document.getElementById("alert").hidden = true;
}

document.getElementById("alertNo").onclick = function(){
	document.getElementById("alert").hidden = true;
}

document.getElementById("hotbar").onmouseover = function(){
	document.getElementById("hotbar").style.opacity = "1";
}

document.getElementById("hotbar").onmouseleave = function(){
	document.getElementById("hotbar").style.opacity = "0.6";
}

Dom.alert.target = function(){
	localStorage.setItem("accept","true");
	document.getElementById("settingAcceptHolder").innerHTML = "";
}

if(localStorage.getItem("accept") !== "true"){
	Dom.alert.page("This site uses local storage for progress saving, do you accept?",true);
}else{
	document.getElementById("settingAcceptHolder").innerHTML = "";
}

if(localStorage.getItem("playMusic") === "true"){
	document.getElementById("musicOn").checked = true;
}

Dom.inventory.checkSpace = function(){
	let space = 0;
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Object.keys(Player.inventory.items[i]).length === 0){
			space++
		}
	}
	return space;
}

Dom.inventory.requiredSpace = function(items,quantities){
	let required = 0;
	for(let i = 0; i < items.length; i++){
		if(items[i].stack !== undefined){
			let notRequired = false;
			for(let x = 0; x < Player.inventory.items.length; x++){
				if(Player.inventory.items[x].id === items[i].id && Player.inventory.items[x].type === items[i].type){
					if(Player.inventory.items[x].stack >= Player.inventory.items[x].stacked + quantities[i] || (Player.inventory.items[x].stacked === undefined && Player.inventory.items[x].stack > quantities[i])){
						notRequired = true;
					}
				}
			}
			if(!notRequired){
				required++;
			}
		}else{
			required++;
		}
	}
	return required <= Dom.inventory.checkSpace();
}

// round number to 1dp
// normally used for damage and to get rid of floating point errors
// uses floor round instead of standard round because otherwise it might seem like a quest has been completed when it hasn't!
function damageRound (number,dp) {
    if(dp === undefined){
		number *= 10;
    }else{
		number *= dp;
	}
	number = Math.floor(number);
    if(dp === undefined){
		number /= 10;
    }else{
		number /= dp;
	}
	return number;
}

Dom.inventory.hideHotbar = function(hide){
	if(hide){
		document.getElementById("hotbar").hidden = true;
	}else{
		document.getElementById("hotbar").hidden = false;
	}
}

Dom.loot.page = function(name, items, quantities, space){
	Dom.changeBook("lootPage", false);
	Dom.currentlyDisplayed = "loot";
	let spaces = [];
	for(let i = 0; i < space; i++){
		spaces.push(i);
	}
	document.getElementById("lootingPageTitle").innerHTML = name;
	let lootSpaces = "";
	for(let i = 0; i < space; i+=8){
		lootSpaces += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}
	let promise = new Promise(function(resolve, reject) {
		document.getElementById("loot").innerHTML = lootSpaces;
		resolve("resolved");
	}).then(function(result) {
		if(items.length > space){
			console.warn(name+" has generated too much loot for its space of "+space);
		}
		for(let i = 0; i < items.length && i < space; i++){
			let currentSpaceNum = Math.floor(Math.random()*(spaces.length));
			let currentSpace = spaces[currentSpaceNum];
			spaces.splice(currentSpaceNum,1);
			if(quantities[i] !== 1){
				document.getElementById("loot").getElementsByTagName("td")[currentSpace].innerHTML = "<img src=" + items[i].image + " class='lootOptions' id='"+i+"'><div class='lootStackNum'>"+quantities[i]+"</div></img>"; // adds item to item rewards
			}else{
				document.getElementById("loot").getElementsByTagName("td")[currentSpace].innerHTML = "<img src=" + items[i].image + " class='lootOptions' id='"+i+"'><span class='lootStackNum'></span></img>"; // adds item to item rewards
			}
		}
		for(let i = 0; i < document.getElementsByClassName("lootOptions").length; i++){
			document.getElementsByClassName("lootOptions")[i].onclick = function(){
				Dom.expand("lootInformation");
				if(Dom.inventory.requiredSpace([items[document.getElementsByClassName("lootOptions")[i].id]],[quantities[document.getElementsByClassName("lootOptions")[i].id]])){
					Dom.inventory.give(items[document.getElementsByClassName("lootOptions")[i].id],quantities[document.getElementsByClassName("lootOptions")[i].id]);
					document.getElementsByClassName("lootOptions")[i].outerHTML = "<span class='lootOptions'></span>";
					document.getElementsByClassName("lootStackNum")[i].outerHTML = "<span class='lootStackNum'></span>";
				}else{
					Dom.alert.page("You do not have enough space in your inventory for that item.");
				}
			};
			document.getElementsByClassName("lootOptions")[i].onmouseover = function(){
				Dom.loot.displayInformation(document.getElementsByClassName("lootOptions")[i].id, items, quantities);
			}
			document.getElementsByClassName("lootOptions")[i].onmouseleave = function(){
				Dom.expand("lootInformation");
			}
		}
		document.getElementById("lootAll").onclick = function(){
			for(let i = 0; i < document.getElementsByClassName("lootOptions").length; i++){
				if(document.getElementsByClassName("lootOptions")[i].onclick !== null){
					document.getElementsByClassName("lootOptions")[i].onclick();
				}
			}
			Dom.changeBook(Dom.previous, true);
		}
		document.getElementById("lootingPageClose").style.top = 55 * space/8 + "px";
	},items,quantities,space);
}

// checks if all elements of subArray can be found in largeArray
function isContainedInArray (subArray, largeArray) {
	for(let i = 0; i < subArray.length; i++) {
		if (largeArray.indexOf(subArray[i]) === -1) { // an element from subArray can't be found in largeArray
			return false;
		}
	}
	return true;
}

document.getElementById("levelUpPageClose").onclick = function(){
	document.getElementById("levelUpPage").hidden = true;
	Dom.currentlyDisplayed = "";
}

Dom.text.page = function(name, text, buttons, functions){
	Dom.changeBook("textPage", true/*false*/);
	Dom.currentlyDisplayed = name;
	document.getElementById("textPage").innerHTML = '<h1 id="textPageName">'+name+'</h1>'
	document.getElementById("textPage").innerHTML += '<p id="textPageText">'+text+'</p>'
	for(let i = 0; i < buttons.length; i++){
		document.getElementById("textPage").innerHTML += "<br><br><br><center><div id='buttons"+i+"' class='buttons'>"+buttons[i]+"</div></center>";
	}
	document.getElementById("textPage").innerHTML += "<br><br><br><center><div class='closeClass' onclick='Dom.changeBook(Dom.previous, true)'>Close</div></center>";
	for(let i = 0; i < buttons.length; i++){
		document.getElementById("buttons"+i).onclick = function(){
			functions[i]();
		}
	}
}

Dom.buyer.remove = function(i, all){
	if(i === 5 && Player.inventory.items[5].type === "bag"){
		document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(0)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(1)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(2)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(3)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(4)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayEquipmentInformation(5)" onmouseleave="Dom.expand(\'inventoryInformation\')" ondrag="Dom.expand(\'inventoryInformation\')" onclick="Game.inventoryUpdate()"></td></tr>';
		document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
		for(let x = 0; x < 6; x++){
			if(Object.keys(Player.inventory.items[x]).length !== 0){
				document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML = '<img src="'+Player.inventory.items[x].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+x+')"></img>';
				if(Player.inventory.items[x].stacked !== undefined && Player.inventory.items[x].stacked !== 1){
					document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML += "<div class='stackNum' id='stackNum"+x+"'>"+Player.inventory.items[x].stacked+"</div>";
				}					
			}
		}
		Player.inventory.items.splice(6,Player.inventory.items.length-6);
		Dom.inventory.update();
	}
	if(Player.inventory.items[i].sellCurrency === undefined){
		Player.inventory.items[i].sellCurrency = 2;
	}
	Dom.inventory.give(Items.currency[Player.inventory.items[i].sellCurrency], (all ? Player.inventory.items[i].sellPrice*Math.floor(Player.inventory.items[i].stacked/Player.inventory.items[i].sellQuantity)*Player.inventory.items[i].sellQuantity : Player.inventory.items[i].sellPrice*Player.inventory.items[i].sellQuantity <= Player.inventory.items[i].stacked ? Player.inventory.items[i].sellQuantity : 0));
	Dom.inventory.remove(i, all ? Math.floor(Player.inventory.items[i].stacked/Player.inventory.items[i].sellQuantity)*Player.inventory.items[i].sellQuantity : Player.inventory.items[i].sellQuantity <= Player.inventory.items[i].stacked ? Player.inventory.items[i].sellQuantity : 0);
	Dom.buyer.page();
}

Dom.buyer.page = function(npc){
	Dom.changeBook("buyerPage", true/*false*/);
	if(npc !== undefined){
		Dom.currentlyDisplayed = npc.name;
		document.getElementById("buyerPageChat").innerHTML = npc.chat.buyerGreeting;
	}
	document.getElementById("buyerPageInventory").innerHTML = "";
	for(let i = 0; i < document.getElementById("itemInventory").getElementsByTagName("td").length / 6; i++){
		document.getElementById("buyerPageInventory").innerHTML += "<tr><td/><td/><td/><td/><td/><td/></tr>";
	}
	//document.getElementById("buyerPageClose").style.top = 50 + 55* document.getElementById("itemInventory").getElementsByTagName("td").length / 6 + "px";
	let remove = true;
	for(let i = 6; i < Player.inventory.items.length; i++){
		if(Object.keys(Player.inventory.items[i]).length !== 0){
			remove = false;
		}
	}
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].image !== undefined){
			document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")'></img>";;
			if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
				document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
			}
		}
		if(document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].getElementsByTagName("img").length > 0){
			document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].getElementsByTagName("img")[0].setAttribute('draggable', false);
			if(Player.inventory.items[i].sellPrice !== undefined){
				if(Player.inventory.items[i].sellCurrency === undefined){
					Player.inventory.items[i].sellCurrency = 2;
				}
				if(Player.inventory.items[i].sellQuantity === undefined){
					Player.inventory.items[i].sellQuantity = 1;
				}
				if(Player.inventory.items[i].stacked === undefined){
					Player.inventory.items[i].stacked = 1;
				}
				document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].onclick = function(){
					if(!(!remove && i === 5 && Player.inventory.items[5].type === "bag") && Player.inventory.items[i].stacked >= Player.inventory.items[i].sellQuantity){
						Dom.alert.ev = i;
						Dom.alert.target = Dom.buyer.remove;
						if(Player.inventory.items[i].stacked >= Player.inventory.items[i].sellQuantity*2){
							Dom.alert.page("How many <strong>"+Player.inventory.items[i].name.toLowerCase()+"</strong> would you like to sell for <strong>"+Player.inventory.items[i].sellPrice+" "+Items.currency[Player.inventory.items[i].sellCurrency].name.toLowerCase()+"</strong> each?", true, true, [Player.inventory.items[i].sellQuantity <= Player.inventory.items[i].stacked ? Player.inventory.items[i].sellQuantity : 0, Math.floor(Player.inventory.items[i].stacked/Player.inventory.items[i].sellQuantity)*Player.inventory.items[i].sellQuantity]);
						}else{
							Dom.alert.page("Are you sure you want to sell <strong>"+(Player.inventory.items[i].sellQuantity > 1 ? Player.inventory.items[i].sellQuantity+" " : "")+(Player.inventory.items[i].unidentified ? "unidentified "+Player.inventory.items[i].type : Player.inventory.items[i].name.toLowerCase())+"</strong> for <strong>"+Player.inventory.items[i].sellPrice+" "+Items.currency[Player.inventory.items[i].sellCurrency].name.toLowerCase()+"</strong>? You cannot buy it back!", true);
						}
					}else if(!(!remove && i === 5 && Player.inventory.items[5].type === "bag")){
						Dom.alert.page("You need "+Player.inventory.items[i].sellQuantity+" of these to sell them.");
					}else{
						Dom.alert.page("Move some items to the bank, sell or dispose of them before you can do that.");
					}
				}
			}else{
				document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].onclick = function(){
					Dom.alert.page("You cannot sell that item.");
				}
			}
		}
	}
}

Dom.choose.page = function(npc, buttons, functions, parameters){
	if(Dom.currentlyDisplayed === ""){
		if(buttons.length > 1){
			Dom.changeBook("choosePage");
			Dom.currentlyDisplayed = npc.name;
			document.getElementById("choosePage").innerHTML = "<h1>"+npc.name+"</h1><p>"+npc.chat.chooseChat+"</p>";
			for(let i = 0; i < buttons.length; i++){
				let imagenum = 0;
				if(functions[i] === Dom.buyer.page){
					imagenum = 1;
				}else if(functions[i] === Dom.merchant.page){
					imagenum = 2;
				}else if(functions[i] === Dom.quest.finish){
					imagenum = 3;
				}else if(functions[i] === Dom.quest.start){
					imagenum = 4;
				}else if(functions[i] === Dom.text.page){
					imagenum = 5;
				}
				document.getElementById("choosePage").innerHTML += "<p id='choosePageButtons"+i+"'><img src='assets/icons/choose.png' class='chooseIcon' style='clip: rect("+25*imagenum+"px, 25px, "+25*(imagenum+1)+"px, 0px); margin-top: -"+(25*imagenum+3)+"px'></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+buttons[i]+"</p>";
			}
			document.getElementById("choosePage").innerHTML += '<br><br><center><div id="choosePageClose" class="closeClass" onclick="Dom.changeBook(Dom.previous, true)">Close</div></center>';
			for(let i = 0; i < buttons.length; i++){
				document.getElementById("choosePageButtons"+i).onclick = function(){
					functions[i](...parameters[i]);
				}
			}
		}else{
			functions[0](...parameters[0]);
		}
	}else if(Dom.currentlyDisplayed !== npc.name && npc.roles.find(role => role.quest ==/*==*/ Dom.currentlyDisplayed) === undefined){
		if(document.getElementsByClassName("closeClass")[0].style.border !== "5px solid red") {
			Dom.changeBook("identifierPage",false,2);
		}
	}
}

//
// DO NOT ADD CODE BELOW THIS POINT
//

//LOADS A NEW CLASS
for(let i = 0; i < 5; i++){
	Player.inventory[Object.keys(Player.inventory)[i]].push({
		name: "",
		image: "",
		stats: {},
	});
}
Dom.inventory.give(Items.currency[2],3);

//LOADS ALL EXISTING SAVEDATA
if(localStorage.getItem(Player.class) !== null){
	Player = JSON.parse(localStorage.getItem(Player.class));
	Player.name = playerName;
	Player.gender = playerGender;
	Player.skin = playerSkin;
}

//LOADS AN EXISTING CLASS
document.getElementById("itemInventory").innerHTML = "";
for(let i = 0; i < Player.inventory.items.length/6; i++){
	document.getElementById("itemInventory").innerHTML += "<tr>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayEquipmentInformation("+6*i+")\" onmouseleave=\"Dom.expand('inventoryInformation')\" ondrag=\"Dom.expand('inventoryInformation')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayEquipmentInformation("+(6*i+1)+")\" onmouseleave=\"Dom.expand('inventoryInformation')\" ondrag=\"Dom.expand('inventoryInformation')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayEquipmentInformation("+(6*i+2)+")\" onmouseleave=\"Dom.expand('inventoryInformation')\" ondrag=\"Dom.expand('inventoryInformation')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayEquipmentInformation("+(6*i+3)+")\" onmouseleave=\"Dom.expand('inventoryInformation')\" ondrag=\"Dom.expand('inventoryInformation')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayEquipmentInformation("+(6*i+4)+")\" onmouseleave=\"Dom.expand('inventoryInformation')\" ondrag=\"Dom.expand('inventoryInformation')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayEquipmentInformation("+(6*i+5)+")\" onmouseleave=\"Dom.expand('inventoryInformation')\" ondrag=\"Dom.expand('inventoryInformation')\" onclick=\"Game.inventoryUpdate()\"></td>\
	</tr>"
}
for(let i = 0; i < Player.inventory.items.length; i++){ // repeats the code for all inventory slots
	if(Player.inventory.items[i].image !== undefined){ // if the slot is not empty...
		document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(!Player.inventory.items[i].unidentified ? (Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick !== undefined ? "onclick='Items[Player.inventory.items["+i+"].type][Player.inventory.items["+i+"].id].onClick("+i+")'" : "") : "")+"></img>"; // ...puts the image in the slot
		if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
			document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
		}
	}else{
		document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = ""; // ...clears the slot
	}
}
document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
for(let i = 0; i < Object.keys(Player.inventory).length-1; i++){
	if(Player.inventory[Object.keys(Player.inventory)[i]][0].image !== ""){
		document.getElementById(Object.keys(Player.inventory)[i]).innerHTML = "<img src='"+Player.inventory[Object.keys(Player.inventory)[i]][0].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+Object.keys(Player.inventory)[i]+"\")'</img>"; // updates the image
	}
}
Dom.hotbar.update();
Dom.inventory.update(); // sets the original position of the text
Dom.quests.active();
Dom.quests.possible();
Dom.quests.completed();
if(Player.reputationReady){
	Dom.reputation.start();
}

//DELTES EXISTING CLASS
document.getElementById("settingDelete").onclick = function(){
	Dom.alert.target = function(){
		localStorage.removeItem(Player.class);
		window.location.replace("./selection.html");
	}
	Dom.alert.page("Are you sure you want to delete your progress for this class? It will be lost forever!", true);
}