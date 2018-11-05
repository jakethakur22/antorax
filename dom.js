"use strict";

let Dom = {
	elements: {
		chatPage: document.getElementById("chatPage"),
		inventoryPage: document.getElementById("inventoryPage"),
		hotbar: document.getElementById("hotbar"),
		questsPage: document.getElementById("questsPage"),
		settingsPage: document.getElementById("settingsPage"),
		settingsTwoPage: document.getElementById("settingsTwoPage"),
		adventurePage: document.getElementById("adventurePage"),
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
	adventure: {},
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

Dom.alert.page = function(text, type, values){
	document.getElementById("alert").hidden = false;
	// text only (e.g. chooseStats)
	if(type === 3){
		document.getElementById("alertOptions").style.display = "block";
		document.getElementById("alertOptions").innerHTML = values;
		document.getElementById("alertYes").style.display = "none";
		document.getElementById("alertNo").style.display = "none";
		document.getElementById("alertDispose").style.display = "none";
	// 3 buttons
	}else if(type === 2){
		document.getElementById("alertOptions").style.display = "none";
		document.getElementById("alertYes").style.display = "inline-block";
		document.getElementById("alertDispose").style.display = "inline-block";
		document.getElementById("alertNo").style.display = "inline-block";
		document.getElementById("alertNo").style.left = "0px";
		document.getElementById("alertNo").style.bottom = "5px";
		document.getElementById("alertNo").innerHTML = "Cancel";
		document.getElementById("alertYes").innerHTML = values !== undefined ? values[0] : "One";
		document.getElementById("alertDispose").innerHTML = values !== undefined ? values[1] : "All";
	// 2 buttons
	}else if(type === 1){
		document.getElementById("alertOptions").style.display = "none";
		document.getElementById("alertYes").style.display = "inline-block";
		document.getElementById("alertNo").style.display = "inline-block";
		document.getElementById("alertDispose").style.display = "none";
		document.getElementById("alertNo").style.left = "15px";
		document.getElementById("alertNo").innerHTML = "No";
		document.getElementById("alertYes").innerHTML = "Yes";
		document.getElementById("alertNo").style.bottom = "20px";
	// 1 button
	}else{
		document.getElementById("alertOptions").style.display = "none";
		document.getElementById("alertYes").style.display = "none";
		document.getElementById("alertDispose").style.display = "none";
		document.getElementById("alertNo").style.display = "inline-block";
		document.getElementById("alertNo").style.left = "0px";
		document.getElementById("alertNo").innerHTML = "OK";
		document.getElementById("alertNo").style.bottom = "20px";
	}
	document.getElementById("alertText").innerHTML = text;
}

// Make the save, logout, delete buttons at the bottom of the settings page
document.getElementById("settingLogout").innerHTML = "<div id='settingControls' onclick='Dom.settings.page(\"settingsTwoPage\")'>Hotkey Bindings</div><br><br>You are logged in as "+Player.name+(localStorage.getItem("accept") ? "<div id='settingSave' onclick='Game.saveProgress()'>Save</div>" : "")+"<div id='settingLogoutInner' onclick='Game.saveProgress(\"logout\")'>Logout</div>"+(localStorage.getItem("accept") ? "<div id='settingDelete'>Delete</div>" : "");

// DELTES EXISTING CLASS
if(document.getElementById("settingDelete") !== null){
	document.getElementById("settingDelete").onclick = function(){
		Dom.alert.target = function(){
			localStorage.removeItem(Player.class);
			window.location.replace("./selection.html");
		}
		Dom.alert.page("Are you sure you want to delete your progress for this class? It will be lost forever!", 1);
	}
}

// DO NOT ADD CODE ABOVE THIS POINT

Dom.changeBook = function(page, override, shouldNotBeOverriden){
	// if the page can be changed
	if(this.currentlyDisplayed === "" || override){
		if((page === "chatPage" || page === "inventoryPage" || page === "questsPage" || page === "adventurePage" || page === "reputationPage" || page === "settingsPage" || page === "settingsTwoPage") && Dom.adventure.awaitingInstructions.length > 0){
			Dom.adventure.showInstructions(Dom.adventure.awaitingInstructions[0], true);
			Dom.adventure.awaitingInstructions.splice(0,1);
		}else{
			if(page === "chatPage" || page === "inventoryPage" || page === "questsPage" || page === "adventurePage" || page === "reputationPage" || page === "settingsPage" || page === "settingsTwoPage"){
				let changed = false;
				if(page === "settingsTwoPage"){
					page = "settingsPage";
					changed = true;
				}
				if(page === Player.tab && Dom.adventure.openedInstructions){
					Dom.adventure.openedInstructions = false;
				}
				document.getElementById("change"+Player.tab.substring(0,1).toUpperCase()+Player.tab.substring(1,Player.tab.length-4)).getElementsByTagName("polygon")[0].style.strokeWidth = "1";
				document.getElementById("change"+page.substring(0,1).toUpperCase()+page.substring(1,page.length-4)).getElementsByTagName("polygon")[0].style.strokeWidth = "3";
				Player.tab = page;
				if(changed){
					page = "settingsTwoPage";
				}
			}
			this.elements.chatPage.hidden = true;
			this.elements.inventoryPage.hidden = true;
			this.elements.questsPage.hidden = true;
			this.elements.settingsPage.hidden = true;
			this.elements.settingsTwoPage.hidden = true;
			this.elements.adventurePage.hidden = true;
			this.elements.reputationPage.hidden = true;
			this.elements.questStart.hidden = true;
			this.elements.questFinish.hidden = true;
			this.elements.merchantPage.hidden = true;
			this.elements.identifierPage.hidden = true;
			this.elements.identifiedPage.hidden = true;
			this.elements.lootPage.hidden = true;
			this.elements.buyerPage.hidden = true;
			this.elements.choosePage.hidden = true;
			this.elements.textPage.hidden = true;
			document.getElementById(page).hidden = false;
			if(page === "chatPage"){
				// if there is no new chat
				if(Dom.chat.newString === ""){
					chatPage.innerHTML = "<br>" + Dom.chat.oldString;
				}
				document.getElementById("dot").hidden = true;
				document.getElementById("dot").innerHTML = 0;
				Dom.chat.oldString = Dom.chat.newString + Dom.chat.oldString;
				Dom.chat.newString = "";
				clearInterval(Dom.chat.borderRed);
				clearInterval(Dom.chat.borderBlack);
				Dom.chat.borderRed = false;
				Dom.chat.borderBlack = false;
				document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.stroke = "black";
			}
			if(page === "reputationPage"){
				Dom.reputation.update();
			}
			Dom.quests.active();
			for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){
				document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622";
			}
			// if the page is a bookmark page
			if(!shouldNotBeOverriden){
				Dom.currentlyDisplayed = "";
			}
			if(page === "settingsPage" && !shouldNotBeOverriden){
				Dom.settings.page();
			}
			if(Dom.settings.hotkey !== undefined){
				document.getElementsByClassName("hotkey")[Dom.settings.hotkey].innerHTML = Dom.settings.bound[Dom.settings.hotkey].toUpperCase();
				Dom.settings.hotkey = undefined;
			}
			return true;
		}
	// if the page cannot be changed
	}else{
		for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){
			document.getElementsByClassName("closeClass")[i].style.border = "5px solid red";
		}
		document.getElementById("levelUpPageClose").style.border = "5px solid red";
		// close buttons turn red for 0.2 seconds
		Dom.override = true; // overrides future updates
		setTimeout(function(){
			for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){
				document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622";
			}
			document.getElementById("levelUpPageClose").style.border = "5px solid #886622";
			Dom.override = false; // allows future updates
		},200);
		return false;
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

Dom.chat.borderRed = false; // allows the chat bookmark to flash
Dom.chat.borderBlack = false; // allows the chat bookmark to flash
Dom.chat.newString = ""; // chat above the -new messages-
Dom.chat.oldString = ""; // chat below the -new messages-
Dom.chat.contents = []; // stores all the chat messages
document.getElementById("dot").innerHTML = 0;
Dom.chat.insert = function(text, delay, important){
	if(this.contents.length > 1000){
		// purge the oldest
		this.contents.shift();
	}
	setTimeout(function(){
		if(chatPage.hidden && document.getElementById("dot").innerHTML !== "<b>...</b>"){
			if(!document.getElementById("chatImage").hidden){
				document.getElementById("dot").hidden = false;
			}
			document.getElementById("dot").innerHTML = parseInt(document.getElementById("dot").innerHTML) + 1;
			if(parseInt(document.getElementById("dot").innerHTML) > 99){
				document.getElementById("dot").innerHTML = "<b>...</b>";
				document.getElementById("dot").style.lineHeight = "7.5px";
			}
		}
		this.contents.push(text);
		this.newString = text + "<br><br>" + this.newString;
		chatPage.innerHTML = "<br>" + this.newString;
		if(this.oldString !== ""){
			chatPage.innerHTML += '-------------------- <b>New Messages</b> --------------------';
		}
		chatPage.innerHTML += "</p>" + this.oldString;
		if(!chatPage.hidden){
			// update the chat
			Dom.changeBook("chatPage");
		}
		if(important && !this.borderRed && !this.borderBlack){
			this.borderRed = setInterval(function(){
				document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.strokeWidth = "3";
				document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.stroke = "red";
			},500);
			this.borderBlack = setInterval(function(){
				document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.strokeWidth = "1";
				document.getElementById("changeChat").getElementsByTagName("polygon")[0].style.stroke = "black";
			},1000);
		}
	}.bind(this), delay);
}

/*Dom.chat.purge = function(insertMessage) { // delete all chat
	this.oldString = ""; // sets the old chat to nothing
	if (insertMessage) { // insertMessage is a boolean that specifies if something should be inserted to say that the chat was purged
		this.newString = "Chat cleared to free up memory"; // warns the user that the chat was reset
	}
	this.contents = []; // sets the chat contents to nothing
}*/

/*
// translates chat to goblin language (giblish)
// the chat should be raw, and not contain who said it, /me, etc.
Dom.chat.translateToGiblish = function(chat) {
	chat = "<em>(giblish)</em> " + chat;
	return chat;
}
*/

Dom.expand = function(block){
	block = document.getElementById(block);
	if(block.hidden){
		block.hidden = false;
	}else {
		block.hidden = true;
	}
	if(block === information){
		block.hidden = true;
	}
}

Dom.settings.bookmarkPosition = function(){
	// arrange bookmarks at bottom of screen
	if(document.getElementById("bottom").checked){
		SaveItem("bookmarksPosition","bottom");
		document.getElementById("changeChat").style.top="619px";
		document.getElementById("changeChat").style.transform="rotate(90deg)";
		document.getElementById("changeChat").style.transformOrigin="top left";
		document.getElementById("changeInventory").style.top="619px";
		document.getElementById("changeInventory").style.transform="rotate(90deg)";
		document.getElementById("changeInventory").style.transformOrigin="top left";
		document.getElementById("changeQuests").style.top="619px";
		document.getElementById("changeQuests").style.transform="rotate(90deg)";
		document.getElementById("changeQuests").style.transformOrigin="top left";
		document.getElementById("changeAdventure").style.top="619px";
		document.getElementById("changeAdventure").style.transform="rotate(90deg)";
		document.getElementById("changeAdventure").style.transformOrigin="top left";
		document.getElementById("changeReputation").style.top="619px";
		document.getElementById("changeReputation").style.transform="rotate(90deg)";
		document.getElementById("changeReputation").style.transformOrigin="top left";
		document.getElementById("changeSettings").style.top="619px";
		document.getElementById("changeSettings").style.transform="rotate(90deg)";
		document.getElementById("changeSettings").style.transformOrigin="top left";
		document.getElementById("changeChat").style.left="710px";
		document.getElementById("changeInventory").style.left="780px";
		document.getElementById("changeQuests").style.left="850px";
		document.getElementById("changeAdventure").style.left="920px";
		document.getElementById("changeReputation").style.left="990px";
		document.getElementById("changeSettings").style.left="1060px";
		document.getElementById("chatImage").style.top="649px";
		document.getElementById("inventoryImage").style.top="649px";
		document.getElementById("questsImage").style.top="649px";
		document.getElementById("adventureImage").style.top="649px";
		document.getElementById("reputationImage").style.top="649px";
		document.getElementById("settingsImage").style.top="649px";
		document.getElementById("chatImage").style.left="669px";
		document.getElementById("inventoryImage").style.left="739px";
		document.getElementById("questsImage").style.left="820px";
		document.getElementById("adventureImage").style.left="875px";
		document.getElementById("reputationImage").style.left="943px";
		document.getElementById("settingsImage").style.left="1015px";
		document.getElementById("dot").style.top="646px";
		document.getElementById("dot").style.left="689px";
	// arrange bookmarks at right of screen
	}else{
		SaveItem("bookmarksPosition","right");
		document.getElementById("changeChat").style.left="1162px";
		document.getElementById("changeChat").style.transform="rotate(0deg)";
		document.getElementById("changeChat").style.transformOrigin="top left";
		document.getElementById("changeInventory").style.left="1162px";
		document.getElementById("changeInventory").style.transform="rotate(0deg)";
		document.getElementById("changeInventory").style.transformOrigin="top left";
		document.getElementById("changeQuests").style.left="1162px";
		document.getElementById("changeQuests").style.transform="rotate(0deg)";
		document.getElementById("changeQuests").style.transformOrigin="top left";
		document.getElementById("changeAdventure").style.left="1162px";
		document.getElementById("changeAdventure").style.transform="rotate(0deg)";
		document.getElementById("changeAdventure").style.transformOrigin="top left";
		document.getElementById("changeReputation").style.left="1162px";
		document.getElementById("changeReputation").style.transform="rotate(0deg)";
		document.getElementById("changeReputation").style.transformOrigin="top left";
		document.getElementById("changeSettings").style.left="1162px";
		document.getElementById("changeSettings").style.transform="rotate(0deg)";
		document.getElementById("changeSettings").style.transformOrigin="top left";
		document.getElementById("changeChat").style.top="38px";
		document.getElementById("changeInventory").style.top="108px";
		document.getElementById("changeQuests").style.top="178px";
		document.getElementById("changeAdventure").style.top="248px";
		document.getElementById("changeReputation").style.top="318px";
		document.getElementById("changeSettings").style.top="388px";
		document.getElementById("chatImage").style.top="43px";
		document.getElementById("inventoryImage").style.top="113px";
		document.getElementById("questsImage").style.top="183px";
		document.getElementById("adventureImage").style.top="253px";
		document.getElementById("reputationImage").style.top="323px";
		document.getElementById("settingsImage").style.top="393px";
		document.getElementById("chatImage").style.left="1197px";
		document.getElementById("inventoryImage").style.left="1197px";
		document.getElementById("questsImage").style.left="1212px";
		document.getElementById("adventureImage").style.left="1197px";
		document.getElementById("reputationImage").style.left="1197px";
		document.getElementById("settingsImage").style.left="1197px";
		document.getElementById("dot").style.top="41px";
		document.getElementById("dot").style.left="1217px";
	}
}

if(window.innerHeight >= 754){
	document.getElementById("bottom").checked = true;
	if(window.innerWidth >= 1295 && localStorage.getItem("bookmarksPosition") === "right"){
		document.getElementById("right").checked = true;
	}
	Dom.settings.bookmarkPosition();
}else if(window.innerWidth >= 1295){
	document.getElementById("right").checked = true;
	Dom.settings.bookmarkPosition();
}else{
	alert("Your window size is too small. Please zoom out and refresh the page!");
	console.warn("Your window size is too small. Please zoom out and refresh the page!");
	document.getElementById("bottom").checked = true;
	Dom.settings.bookmarkPosition();
}

Dom.reputation.give = function(area, amount){
	if(Player.reputation[area].changed){
		Player.reputation[area].score += amount;
		Dom.chat.insert("You have gained " + amount + " reputation with " + area.charAt(0).toUpperCase() + area.slice(1).replace( /([A-Z])/g, " $1" ));
	// add the reputation to the reputation page
	}else{
		Player.reputation[area].score += amount;
		Dom.chat.insert("You have gained " + amount + " reputation with " + area.charAt(0).toUpperCase() + area.slice(1).replace( /([A-Z])/g, " $1" ));
		Player.reputation[area].changed = true;
		if(Dom.reputation.ready){
			document.getElementById("reputationPage").innerHTML += area.charAt(0).toUpperCase() + area.slice(1).replace( /([A-Z])/g, " $1" ) + ': <div class="widthPadding"></div> <div class="reputationBox"> <div class="reputationBar"></div> </div><br><br><br>';
		}
	}
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

Dom.reputation.levels = ["Abhorred","Hated","Unfriendly","Neutral","Friendly","Honoured","Venerated"];
Dom.reputation.pointsPerLevel = [1,2500,500,100,500,2500,1];
Dom.reputation.update = function(){
	// if the close button is not there yet
	if(!Dom.reputation.ready && document.getElementById("reputationPage").getElementsByTagName("div").length === 0){
		for(let i = 0; i < Object.keys(Player.reputation).length; i++){
			if(Player.reputation[Object.keys(Player.reputation)[i]].changed && document.getElementById("closeReputation") === null){
				// if the close button should be there
				document.getElementById("reputationPage").innerHTML += "<div id='closeReputation' onclick='Dom.reputation.start()'>Close</div>"
			}
		}
	}
	for(let i = 0; i < Object.keys(Player.reputation).length; i++){
		if(Player.reputation[Object.keys(Player.reputation)[i]].changed){
			if(Player.reputation[Object.keys(Player.reputation)[i]].score >= Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]){
				this.upLevel(Player.reputation[Object.keys(Player.reputation)[i]],i);
			}else if(Player.reputation[Object.keys(Player.reputation)[i]].score < 0){
				this.downLevel(Player.reputation[Object.keys(Player.reputation)[i]],i);
			}else if(Dom.reputation.ready){
				if(Player.reputation[Object.keys(Player.reputation)[i]].level > 3){
					document.getElementsByClassName("reputationBar")[i].style.backgroundColor = "green";
				}else if(Player.reputation[Object.keys(Player.reputation)[i]].level < 3){
					document.getElementsByClassName("reputationBar")[i].style.backgroundColor = "red";
				}else{
					document.getElementsByClassName("reputationBar")[i].style.backgroundColor = "gold";
				}
				if(Player.reputation[Object.keys(Player.reputation)[i]].level !== 6 && Player.reputation[Object.keys(Player.reputation)[i]].level !== 0){
					document.getElementsByClassName("reputationBar")[i].innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level] + "&nbsp;&nbsp;(" + Player.reputation[Object.keys(Player.reputation)[i]].score + "/"+Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+")";
					document.getElementsByClassName("widthPadding")[i].innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level] + " (" + Player.reputation[Object.keys(Player.reputation)[i]].score + "/"+Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+")";
				}else{
					document.getElementsByClassName("reputationBar")[i].innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level];
					document.getElementsByClassName("widthPadding")[i].innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level];
				}
				if(Player.reputation[Object.keys(Player.reputation)[i]].level >= 3){
					document.getElementsByClassName("reputationBar")[i].style.textIndent = ((250-document.getElementsByClassName("widthPadding")[i].clientWidth)/2) + "px";
					document.getElementsByClassName("reputationBar")[i].style.width = Player.reputation[Object.keys(Player.reputation)[i]].score*250/Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+"px";
					document.getElementsByClassName("reputationBar")[i].style.left = "0px";
				}else{
					document.getElementsByClassName("reputationBar")[i].style.textIndent = ((250-document.getElementsByClassName("widthPadding")[i].clientWidth)/2)-Player.reputation[Object.keys(Player.reputation)[i]].score*250/Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+ "px";
					document.getElementsByClassName("reputationBar")[i].style.width = (Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]-Player.reputation[Object.keys(Player.reputation)[i]].score)*250/Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+"px";
					document.getElementsByClassName("reputationBar")[i].style.left = Player.reputation[Object.keys(Player.reputation)[i]].score*250/Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level]+"px";
				}
				if(Player.reputation[Object.keys(Player.reputation)[i]].level === 6){
					document.getElementsByClassName("reputationBar")[i].style.width = "250px";
				}
			}
		}
	}
}

Dom.reputation.upLevel = function(Area,i){
	if(Area.level < 5){
		Area.score -= Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level];
		Area.level++;
		let replaceStat = Object.keys(Player.reputation)[i].replace( /([A-Z])/g, " $1" );
		Dom.chat.insert("Your reputation with " + replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1) + " has increased to " + Dom.reputation.levels[Area.level], 0, true);
		this.update();
	}else{
		Area.level = 6;
		Area.score = 0;
		this.update();
	}
}

Dom.reputation.downLevel = function(Area,i){
	if(Area.level > 1){
		Area.level--;
		Area.score += Dom.reputation.pointsPerLevel[Player.reputation[Object.keys(Player.reputation)[i]].level];
		let replaceStat = Object.keys(Player.reputation)[i].replace( /([A-Z])/g, " $1" );
		Dom.chat.insert("Your reputation with " + replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1) + " has decreased to " + Dom.reputation.levels[Area.level], 0, true);
		this.update();
	}else{
		Area.level = 0;
		Area.score = 0;
		this.update();
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
		// information displays on the right
		if(window.mouseX+220 <= 1161){
			object.style.left = window.mouseX+30+"px";
			document.getElementById("outTriangle").style = "right: 185px; border-right: 20px solid #886622; border-left: 0px solid transparent;";
			document.getElementById("outIdtriangle").style = "right: 185px; border-right: 20px solid #886622; border-left: 0px solid transparent;";
			document.getElementById("triangle").style = "right: 177px; border-right: 20px solid #fef9b4; border-left: 0px solid transparent;";
			document.getElementById("idtriangle").style = "right: 177px; border-right: 20px solid #fef9b4; border-left: 0px solid transparent;";
		// information displays on the left
		}else{
			object.style.left = window.mouseX-220+"px";
			document.getElementById("outTriangle").style = "left: 185px; border-left: 20px solid #886622; border-right: 0px solid transparent;";
			document.getElementById("outIdtriangle").style = "left: 185px; border-left: 20px solid #886622; border-right: 0px solid transparent;";
			document.getElementById("triangle").style = "left: 177px; border-left: 20px solid #fef9b4; border-right: 0px solid transparent;";
			document.getElementById("idtriangle").style = "left: 177px; border-left: 20px solid #fef9b4; border-right: 0px solid transparent;";
		}
		// information fits vertically
		if(window.mouseY+object.offsetHeight-30 <= 618){
			object.style.top = window.mouseY-30+"px";
			document.getElementById("outTriangle").style.top = "10px";
			document.getElementById("outIdtriangle").style.top = "10px";
			document.getElementById("triangle").style.top = "10px";
			document.getElementById("idtriangle").style.top = "10px";
		// information does not fit vertically
		}else{
			object.style.top = 618-object.offsetHeight+"px";
			document.getElementById("outTriangle").style.top = window.mouseY - object.getBoundingClientRect().top - 20 + "px";
			document.getElementById("outIdtriangle").style.top = window.mouseY - object.getBoundingClientRect().top - 20 + "px";
			document.getElementById("triangle").style.top = window.mouseY - object.getBoundingClientRect().top - 20 + "px";
			document.getElementById("idtriangle").style.top = window.mouseY - object.getBoundingClientRect().top - 20 + "px";
		}
	}
	if(!object.hidden){
		setTimeout(function(){
			Dom.inventory.updatePosition(object);
		},1);
	}
}

Dom.inventory.displayIdentification = function(display){
	if(display){
		document.getElementById("itemIdentification").hidden = false;
		Dom.inventory.updatePosition(document.getElementById("itemIdentification"));
	}
	document.getElementById("innerStats").innerHTML = "<strong>Level: " + Player.level + "</strong>"+
	"<br><strong>XP: " + damageRound(100*Player.xp/LevelXP[Player.level],100) + "%</strong>"+
	"<br><br><strong>Stats:</strong>";
	if(Player.inventory.weapon.name !== ""){
		document.getElementById("innerStats").innerHTML += "<br>Damage: " + Player.stats.damage;
		if(Player.stats.maxDamage !== 0 && Player.stats.maxDamage !== Player.stats.damage){
			document.getElementById("innerStats").innerHTML += "-" + Player.stats.maxDamage;
		}
	}else{
		document.getElementById("innerStats").innerHTML += "<br>Damage: 0";
	}
	document.getElementById("innerStats").innerHTML += "<br>Defence: " + Player.stats.defence;
	if(Player.stats.blockDefence !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Block Defence: " + Player.stats.blockDefence;
	}
	document.getElementById("innerStats").innerHTML += "<br>Critical Chance: " + Player.stats.criticalChance + "%";
	document.getElementById("innerStats").innerHTML += "<br>Dodge Chance: " + Player.stats.dodgeChance + "%";
	if(Player.stats.flaming !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Flaming "+romanize(Player.stats.flaming);
	}
	if(Player.class === "a"){
		document.getElementById("innerStats").innerHTML += "<br>Focus Speed: " + Player.stats.focusSpeed + "/s";
	}
	document.getElementById("innerStats").innerHTML += "<br>Health Regen: " + Player.stats.healthRegen + "/s";
	if(Player.stats.lifesteal !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Lifesteal: " + Player.stats.lifesteal + "%";
	}
	if(Player.stats.looting !== 100){
		document.getElementById("innerStats").innerHTML += "<br>Looting: " + Player.stats.looting + "%";
	}
	if(Player.stats.poisonX !== 0 && Player.stats.posionY !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Poison: " + Player.stats.poisonX + "/" + Player.stats.poisonY + "s";
	}
	if(Player.stats.reflection !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Reflection: " + Player.stats.reflection + "%";
	}
	if(Player.stats.stun !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Stun: " + Player.stats.stun + "s";
	}
	document.getElementById("innerStats").innerHTML += "<br>Swim Speed: " + Player.stats.swimSpeed + "/s";
	document.getElementById("innerStats").innerHTML += "<br>Walk Speed: " + Player.stats.walkSpeed + "/s";
	if(Player.stats.fishingSkill !== 0){
		document.getElementById("innerStats").innerHTML += "<br>Fishing Skill: " + damageRound(Player.stats.fishingSkill);
	}
	if(Player.statusEffects.length !== 0){
		document.getElementById("innerStats").innerHTML += "<br><br><strong>Status Effects:</strong>";
		for(let i = 0; i < Player.statusEffects.length; i++){
			document.getElementById("innerStats").innerHTML += "<br>" + Player.statusEffects[i].title + ": " + Player.statusEffects[i].effect + " (" + (Player.statusEffects[i].info ? Player.statusEffects[i].info.time - Player.statusEffects[i].info.ticks + "s" : "") + ")";
		}
	}
}

Dom.inventory.displayInformation = function(item, stacked, position){
	document.getElementById("information").hidden = true;
	if(item.image !== undefined){
		document.getElementById("information").hidden = false;
		Dom.inventory.updatePosition(document.getElementById("information"));
		if(item.name !== undefined){
			document.getElementById("name").innerHTML = item.name;
			if(item.rarity === "mythic"){
				document.getElementById("name").style.color = "purple";
			}else if(item.rarity === "unique"){
				document.getElementById("name").style.color = "orange";
			}else if(item.rarity === "junk"){
				document.getElementById("name").style.color = "darkgray";
			}else{
				document.getElementById("name").style.color = "black";
			}
		}else{
			document.getElementById("name").innerHTML = "Unidentified "+item.type.charAt(0).toUpperCase() + item.type.slice(1);
			document.getElementById("name").style.color = "black";
		}
		// weapon, armour or rod
		if(item.type !== "item" && item.type !== "bag" && item.type !== "currency" && item.type !== "fish" && item.type !== "consumable"){
			if(item.type !== "rod"){
				document.getElementById("stats").innerHTML = "Tier: "+item.tier;
			}else{
				document.getElementById("stats").innerHTML = "";
			}
			if(item.stats !== undefined){
				for(let i = 0; i < Object.keys(item.stats).length; i++){
					if(Object.keys(item.stats)[i] !== item.chosenStat){
						if(Object.keys(item.stats)[i] !== "flaming"){
							let replaceStat = Object.keys(item.stats)[i].replace( /([A-Z])/g, " $1" );
							document.getElementById("stats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+item.stats[Object.keys(item.stats)[i]];
						}else{
							let replaceStat = Object.keys(item.stats)[i].replace( /([A-Z])/g, " $1" );
							document.getElementById("stats").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+" "+romanize(item.stats[Object.keys(item.stats)[i]]);
						}
					}
				}
				if(item.chooseStats !== undefined){
					document.getElementById("stats").innerHTML += "<br><br>"+item.functionText;
					for(let i = 0; i < Object.keys(item.chooseStats).length; i++){
						let color = "gray";
						if(Object.keys(item.chooseStats)[i] === item.chosenStat){
							color = "black";
						}
						if(Object.keys(item.chooseStats)[i] !== "flaming"){
							let replaceStat = Object.keys(item.chooseStats)[i].replace( /([A-Z])/g, " $1" );
							document.getElementById("stats").innerHTML += "<br><span style='color: "+color+"'>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+item.chooseStats[Object.keys(item.chooseStats)[i]]+"</span>";
						}else{
							let replaceStat = Object.keys(item.chooseStats)[i].replace( /([A-Z])/g, " $1" );
							document.getElementById("stats").innerHTML += "<br><span style='color: "+color+"'>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+" "+romanize(item.chooseStats[Object.keys(item.chooseStats)[i]])+"</span>";
						}
					}
				}
			}else{
				document.getElementById("stats").innerHTML += "<br><br>Area: "+item.area;
			}
			if(item.set !== undefined){
				// if the item is equipped
				if(position === "equip"){
					let setNum = 0;
					for(let i = 0; i < Items.set[item.set].armour.length; i++){
						for(let x = 0; x < 4; x++){
							if(Player.inventory[Object.keys(Player.inventory)[x]].name === Items.set[item.set].armour[i]){
								setNum++;
								break;
							}
						}
					}
					document.getElementById("set").innerHTML = Items.set[item.set].name + " (" + setNum + "/" + Items.set[item.set].armour.length+")";
					// if the whole set is equipped
					if(setNum === Items.set[item.set].armour.length){
						document.getElementById("set").innerHTML += "<br><br>Set Bonus:";
						for(let i = 0; i < Object.keys(Items.set[item.set].stats).length; i++){
							if(Object.keys(Items.set[item.set].stats)[i] !== "flaming"){
								let replaceStat = Object.keys(Items.set[item.set].stats)[i].replace( /([A-Z])/g, " $1" );
								document.getElementById("set").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+Items.set[item.set].stats[Object.keys(Items.set[item.set].stats)[i]];
							}else{
								let replaceStat = Object.keys(Items.set[item.set].stats)[i].replace( /([A-Z])/g, " $1" );
								document.getElementById("set").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+" "+romanize(Items.set[item.set].stats[Object.keys(Items.set[item.set].stats)[i]]);
							}
						}
						if(Items.set[item.set].multiplier !== undefined){
							for(let i = 0; i < Items.set[item.set].multiplier.length; i++){
								document.getElementById("set").innerHTML += "<br>"+ Items.set[item.set].multiplier[i].text;
							}
						}
					}
				// if the item is not equipped
				}else{
					let setNum = 0;
					for(let i = 0; i < Items.set[item.set].armour.length; i++){
						let checkUsed = true;
						for(let x = 0; x < Player.inventory.items.length; x++){
							if(Player.inventory.items[x].name === Items.set[item.set].armour[i]){
								setNum++;
								checkUsed = false;
								break;
							}
						}
						// if not in item inventory check equipped slots
						if(checkUsed){
							for(let x = 0; x < 4; x++){
								if(Player.inventory[Object.keys(Player.inventory)[x]].name === Items.set[item.set].armour[i]){
									setNum++;
									break;
								}
							}
						}
					}
					document.getElementById("set").innerHTML = Items.set[item.set].name + " (" + setNum + "/" + Items.set[item.set].armour.length+")";
					// if the whole set is in the inventory
					if(setNum === Items.set[item.set].armour.length){
						document.getElementById("set").innerHTML += "<br><br>Set Bonus:";
						for(let i = 0; i < Object.keys(Items.set[item.set].stats).length; i++){
							if(Object.keys(Items.set[item.set].stats)[i] !== "flaming"){
								let replaceStat = Object.keys(Items.set[item.set].stats)[i].replace( /([A-Z])/g, " $1" );
								document.getElementById("set").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+": "+Items.set[item.set].stats[Object.keys(Items.set[item.set].stats)[i]];
							}else{
								let replaceStat = Object.keys(Items.set[item.set].stats)[i].replace( /([A-Z])/g, " $1" );
								document.getElementById("set").innerHTML += "<br>"+replaceStat.charAt(0).toUpperCase() + replaceStat.slice(1)+" "+romanize(Items.set[item.set].stats[Object.keys(Items.set[item.set].stats)[i]]);
							}
						}
						if(Items.set[item.set].multiplier !== undefined){
							for(let i = 0; i < Items.set[item.set].multiplier.length; i++){
								document.getElementById("set").innerHTML += "<br>"+ Items.set[item.set].multiplier[i].text;
							}
						}
					}
				}
			}else{
				document.getElementById("set").innerHTML = "";
			}
		}else{
			document.getElementById("set").innerHTML = "";
			document.getElementById("stats").innerHTML = "";
		}
		if(item.type === "bag"){
			document.getElementById("stats").innerHTML = "Capacity: "+item.size;
		}
		if(item.type === "currency"){
			if(stacked !== undefined){
				document.getElementById("name").innerHTML = stacked + " " + document.getElementById("name").innerHTML;
			}else if(item.stacked !== undefined){
				document.getElementById("name").innerHTML = item.stacked + " " + document.getElementById("name").innerHTML;
			}else{
				document.getElementById("name").innerHTML = "1 " + document.getElementById("name").innerHTML;
			}
		}
		if(item.fishingType === "fish"){
			document.getElementById("stats").innerHTML = "Length: " + item.length + "cm";
		}
		if(item.quest){
			document.getElementById("stats").innerHTML = "<span style='color: slateblue;'>Quest item</span>" + (document.getElementById("stats").innerHTML !== "" ? "<br><br>"+document.getElementById("stats").innerHTML : "");
		}else{
			document.getElementById("stats").style.color = "black";
		}
		if(item.use !== undefined){
			document.getElementById("stats").innerHTML = item.use;
		}
		if(item.functionText !== undefined && item.chooseStats === undefined){
			document.getElementById("stats").innerHTML += (document.getElementById("stats").innerHTML !== "" ? "<br><br>" : "") + item.functionText + (item.charges !== undefined ? "<br><br>" + item.charges + " Charges" : "");
		}
		let lorebuyer = "";
		if(item.lore !== undefined && item.lore !== "" && !Array.isArray(item.lore)){
			document.getElementById("lore").innerHTML = "<i>"+item.lore+"</i>";
			lorebuyer = "<br><br>";
		}else{
			document.getElementById("lore").innerHTML = "";
		}
		if(position === "buyer" && item.sellPrice !== undefined){
			document.getElementById("lore").innerHTML += lorebuyer+"Sell "+(item.sellQuantity !== 1 ? item.sellQuantity : "")+" for "+item.sellPrice+" gold";
		}
	}
}

Dom.inventory.removeItemCharge = function (inventoryPosition) {
	Player.inventory.items[inventoryPosition].charges--;
	if (Player.inventory.items[inventoryPosition].charges <= 0) {
		this.remove(inventoryPosition);
	}
	this.displayInformation(Player.inventory.items[inventoryPosition]);
}

Dom.currentlyDisplayed = "";
Dom.quest.start = function(quest){
	if(Dom.changeBook("questStart", true/*false*/, true)) {
		document.getElementById("questStartQuest").innerHTML = quest.quest;
		document.getElementById("questStartName").innerHTML = quest.startName;
		document.getElementById("questStartChat").innerHTML = quest.startChat;
		document.getElementById("questStartObjectives").innerHTML = "";
		for(let i = 0; i < quest.objectives.length; i++){
			document.getElementById("questStartObjectives").innerHTML += "<br>" + quest.objectives[i];
		}
		if(quest.rewards.xp === 0 || quest.rewards.xp === undefined){
			document.getElementById("questStartXP").style.display = "none";
		}else{
			document.getElementById("questStartXP").innerHTML = quest.rewards.xp;
		}
		document.getElementById("questStartItems").innerHTML = "";
		if(quest.rewards !== undefined){
			document.getElementById("questStartRewardsTitle").innerHTML = "<br><br><b>Quest Rewards</b><br>";
			if(quest.rewards.items !== undefined){
				for(let i = 0; i < quest.rewards.items.length; i++){
					if(quest.rewards.itemQuantities[i] !== 1){
						document.getElementById("questStartItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestOptions'><div class='questStackNum'>"+quest.rewards.itemQuantities[i]+"</div></img>&nbsp;&nbsp;";
					}else{
						document.getElementById("questStartItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestOptions'><span class='questStackNum'></span></img>&nbsp;&nbsp;";
					}
				}
			}
		}else{
			document.getElementById("questStartRewardsTitle").innerHTML = "";
		}
		document.getElementById("questStartStartItems").innerHTML = "";
		if(quest.startRewards !== undefined){
			document.getElementById("questStartStartRewardsTitle").innerHTML = "<br><br><b>Quest Start Rewards</b><br>";
			if(quest.startRewards.items !== undefined){
				for(let i = 0; i < quest.startRewards.items.length; i++){
					if(quest.startRewards.itemQuantities[i] !== 1){
						document.getElementById("questStartStartItems").innerHTML += "<img src=" + quest.startRewards.items[i].image + " class='theseQuestStartOptions'><div class='questStartStackNum'>"+quest.startRewards.itemQuantities[i]+"</div></img>&nbsp;&nbsp;";
					}else{
						document.getElementById("questStartStartItems").innerHTML += "<img src=" + quest.startRewards.items[i].image + " class='theseQuestStartOptions'><span class='questStartStackNum'></span></img>&nbsp;&nbsp;";
					}
				}
			}
		}else{
			document.getElementById("questStartStartRewardsTitle").innerHTML = "";
		}
		// repeats for all item rewards
		for(let x = 0; x < document.getElementsByClassName("theseQuestOptions").length; x++){
			document.getElementsByClassName("theseQuestOptions")[x].onmouseover = function(){
				Dom.inventory.displayInformation(quest.rewards.items[x], quest.rewards.itemQuantities[x]);
			};
			document.getElementsByClassName("theseQuestOptions")[x].onmouseleave = function(){
				Dom.expand("information");
			};
		}
		for(let x = 0; x < document.getElementsByClassName("theseQuestStartOptions").length; x++){
			document.getElementsByClassName("theseQuestStartOptions")[x].onmouseover = function(){
				Dom.inventory.displayInformation(quest.startRewards.items[x], quest.startRewards.itemQuantities[x]);
			};
			document.getElementsByClassName("theseQuestStartOptions")[x].onmouseleave = function(){
				Dom.expand("information");
			};
		}
		for(let x = 0; x < document.getElementsByClassName("questStackNum").length; x++){
			document.getElementsByClassName("questStackNum")[x].onmouseover = function(){
				Dom.inventory.displayInformation(quest.rewards.items[x], quest.rewards.itemQuantities[x]);
			};
			document.getElementsByClassName("questStackNum")[x].onmouseleave = function(){
				Dom.expand("information");
			};
			document.getElementsByClassName("questStackNum")[x].style.left = document.getElementsByClassName("theseQuestOptions")[x].getBoundingClientRect().left - 635 + "px";
			document.getElementsByClassName("questStackNum")[x].style.top = document.getElementsByClassName("theseQuestOptions")[x].getBoundingClientRect().top + 15 + "px";
		}
		for(let x = 0; x < document.getElementsByClassName("questStartStackNum").length; x++){
			document.getElementsByClassName("questStartStackNum")[x].onmouseover = function(){
				Dom.inventory.displayInformation(quest.startRewards.items[x], quest.startRewards.itemQuantities[x]);
			};
			document.getElementsByClassName("questStartStackNum")[x].onmouseleave = function(){
				Dom.expand("information");
			};
			document.getElementsByClassName("questStartStackNum")[x].style.left = document.getElementsByClassName("theseQuestStartOptions")[x].getBoundingClientRect().left - 635 + "px";
			document.getElementsByClassName("questStartStackNum")[x].style.top = document.getElementsByClassName("theseQuestStartOptions")[x].getBoundingClientRect().top + 15 + "px";
		}
		Dom.currentlyDisplayed = quest;
	}
}

Dom.quest.finish = function(quest){
	if(Dom.changeBook("questFinish", true/*false*/, true)){
		document.getElementById("questFinishQuest").innerHTML = quest.quest;
		document.getElementById("questFinishName").innerHTML = quest.finishName;
		document.getElementById("questFinishChat").innerHTML = quest.finishChat;
		if(quest.rewards.xp === 0 || quest.rewards.xp === undefined){
			document.getElementById("questFinishXP").style.display = "none";
		}else{
			document.getElementById("questFinishXP").innerHTML = quest.rewards.xp;
		}
		document.getElementById("questFinishItems").innerHTML = "";
		if(quest.rewards !== undefined){
			document.getElementById("questFinishRewardsTitle").innerHTML = "<br><br><b>Quest Rewards</b><br>";
			if(quest.rewards.items !== undefined){
				for(let i = 0; i < quest.rewards.items.length; i++){
					if(quest.rewards.itemQuantities[i] !== 1){
						document.getElementById("questFinishItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestFinishOptions'><div class='questFinishStackNum'>"+quest.rewards.itemQuantities[i]+"</div></img>&nbsp;&nbsp;";
					}else{
						document.getElementById("questFinishItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestFinishOptions'><span class='questFinishStackNum'></span></img>&nbsp;&nbsp;";
					}
				}
			}
		}else{
			document.getElementById("questFinishRewardsTitle").innerHTML = "";
			document.getElementById("questFinishStartItems").innerHTML = "";
		}
		for(let x = 0; x < document.getElementsByClassName("theseQuestFinishOptions").length; x++){
			document.getElementsByClassName("theseQuestFinishOptions")[x].onmouseover = function(){
				Dom.inventory.displayInformation(quest.rewards.items[x], quest.rewards.itemQuantities[x]);
			};
			document.getElementsByClassName("theseQuestFinishOptions")[x].onmouseleave = function(){
				Dom.expand("information");
			};
		}
		for(let x = 0; x < document.getElementsByClassName("questFinishStackNum").length; x++){
			document.getElementsByClassName("questFinishStackNum")[x].onmouseover = function(){
				Dom.inventory.displayInformation(quest.rewards.items[x], quest.rewards.itemQuantities[x]);
			};
			document.getElementsByClassName("questFinishStackNum")[x].onmouseleave = function(){
				Dom.expand("information");
			};
			document.getElementsByClassName("questFinishStackNum")[x].style.left = document.getElementsByClassName("theseQuestFinishOptions")[x].getBoundingClientRect().left - 635 + "px";
			document.getElementsByClassName("questFinishStackNum")[x].style.top = document.getElementsByClassName("theseQuestFinishOptions")[x].getBoundingClientRect().top + 15 + "px";
		}
		Dom.currentlyDisplayed = quest;
	}
}

Dom.quest.accept = function(){
	Dom.quests.active(Dom.currentlyDisplayed);
	if(Dom.currentlyDisplayed.resetVariables !== undefined){
		for(let i = 0; i < Dom.currentlyDisplayed.resetVariables.length; i++){
			Player.quests.questProgress[Dom.currentlyDisplayed.resetVariables[i]] = undefined;
		}
	}
	if(Dom.currentlyDisplayed.startRewards !== undefined){
		for(let i = 0; i < Dom.currentlyDisplayed.startRewards.items.length; i++){
			Dom.inventory.give(Dom.currentlyDisplayed.startRewards.items[i],Dom.currentlyDisplayed.startRewards.itemQuantities[i]);
		}
	}
	Dom.quests.possible();
	let quest = Dom.currentlyDisplayed;
	if (Dom.currentlyDisplayed.onQuestStart !== undefined) {
		Dom.currentlyDisplayed.onQuestStart();
	}
	// if the onQuestStart changed the page then don't change the page
	if(Dom.currentlyDisplayed === quest){
		Dom.changeBook(Player.tab, true);
	}
}

Dom.quest.acceptRewards = function(){
	if(Dom.currentlyDisplayed.rewards.items !== undefined){
		for(let i = 0; i < Dom.currentlyDisplayed.rewards.items.length; i++){
			Dom.inventory.give(Dom.currentlyDisplayed.rewards.items[i],Dom.currentlyDisplayed.rewards.itemQuantities[i]);
		}
	}
	if(Dom.currentlyDisplayed.removeItems !== undefined){
		for(let i = 0; i < Dom.currentlyDisplayed.removeItems.length; i++){
			Dom.inventory.removeById(Dom.currentlyDisplayed.removeItems[i].id,Dom.currentlyDisplayed.removeItems[i].type,Dom.currentlyDisplayed.removeItemQuantity[i]);
		}
	}
	if(Dom.currentlyDisplayed.rewards.reputation !== undefined){
		for(let i = 0; i < Object.keys(Dom.currentlyDisplayed.rewards.reputation).length; i++) {
			Dom.reputation.give(Object.keys(Dom.currentlyDisplayed.rewards.reputation)[i], Dom.currentlyDisplayed.rewards.reputation[Object.keys(Dom.currentlyDisplayed.rewards.reputation)[i]])
		}
	}
	for(let i = 0; i < Player.quests.activeQuestArray.length; i++){
		if(Player.quests.activeQuestArray[i] === Dom.currentlyDisplayed.quest){
			Player.quests.activeQuestArray.splice(i,1);
		}
	}
	Dom.quests.completed(Dom.currentlyDisplayed);
	Player.quests.questLastFinished[Dom.currentlyDisplayed.questArea][Dom.currentlyDisplayed.id] = getFullDate();
	Dom.quests.possible();
	let quest = Dom.currentlyDisplayed;
	if (Dom.currentlyDisplayed.onQuestFinish !== undefined){
		Dom.currentlyDisplayed.onQuestFinish();
	}
	//if the onQuestFinish changed the page then don't change the page
	if(Dom.currentlyDisplayed === quest){
		Dom.changeBook(Player.tab, true);
	}
	Game.getXP(quest.rewards.xp);
}

Dom.quests.active = function(quest){
	if(quest !== undefined){
		Player.quests.activeQuestArray.push(quest.quest);
	}
	document.getElementById("activeQuestBox").style.textAlign = "left";
	document.getElementById("activeQuestBox").innerText = "";
	for(let x = 0; x < Player.quests.activeQuestArray.length; x++){
		let currentQuest = "";
		for(let i = 0; i < Object.keys(Quests).length; i++){
			for(let y = 0; y < Quests[Object.keys(Quests)[i]].length; y++){
				if(Quests[Object.keys(Quests)[i]][y].quest === Player.quests.activeQuestArray[x]){
					// the quest Object is worked out by the name saved in the activeQuestArray
					currentQuest = Quests[Object.keys(Quests)[i]][y];
				}
			}
		}
		if(x !== 0){
			// dont put a break before the first quest
			document.getElementById("activeQuestBox").innerHTML += "<br><br>";
		}
		document.getElementById("activeQuestBox").innerHTML += "<strong>" + currentQuest.quest + "</strong>";
		for(let i = 0; i < currentQuest.objectives.length; i++){
			document.getElementById("activeQuestBox").innerHTML += "<br>" + currentQuest.objectives[i];
			if(currentQuest.isCompleted()[i] === true && i !== currentQuest.objectives.length-1){
				if(currentQuest.autofinish){
					Dom.choose.page(currentQuest.finishName, ["Quest Finish: " + currentQuest.quest], [Dom.quest.finish], [[currentQuest]]);
				}else{
					document.getElementById("activeQuestBox").innerHTML += " &#10004;";
				}
			}else if(currentQuest.isCompleted()[i] !== false && i !== currentQuest.objectives.length-1){
				document.getElementById("activeQuestBox").innerHTML += " " + currentQuest.isCompleted()[i];
			}
		}
		if(currentQuest.wasCompleted === undefined){
			currentQuest.wasCompleted = currentQuest.isCompleted();
		}else{
			if(JSON.stringify(currentQuest.wasCompleted) !== JSON.stringify(currentQuest.isCompleted()) && currentQuest.isCompleted()[currentQuest.isCompleted().length-1]){
				Dom.chat.insert("Quest log updated", 0, true);
				currentQuest.wasCompleted = currentQuest.isCompleted();
			}
		}
		if(currentQuest.isCompleted()[currentQuest.isCompleted().length - 1]){
			currentQuest.completed = true;
		}else{
			currentQuest.completed = false;
		}
	}
	if(Player.quests.activeQuestArray.length === 0){
		document.getElementById("activeQuestBox").style.textAlign = "center";
		document.getElementById("activeQuestBox").innerText = "You have no active quests";
	}
}

Dom.quests.possible = function(){
	Player.quests.possibleQuestArray = [];
	document.getElementById("possibleQuestBox").innerHTML = "";
	document.getElementById("possibleQuestBox").style.textAlign = "left";
	for(let i = 0; i < Object.keys(Quests).length; i++){
		for(let x = 0; x < Quests[Object.keys(Quests)[i]].length; x++){
			if((!Player.quests.completedQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest) && !Player.quests.activeQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest) && Player.level >= Quests[Object.keys(Quests)[i]][x].levelRequirement && isContainedInArray(Quests[Object.keys(Quests)[i]][x].questRequirements,Player.quests.completedQuestArray)) || (Quests[Object.keys(Quests)[i]][x].repeatTime === "daily" && Player.quests.questLastFinished[Quests[Object.keys(Quests)[i]][x].questArea][Quests[Object.keys(Quests)[i]][x].id] && !Player.quests.completedQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest))){
				if(Player.quests.possibleQuestArray.length !== 0){
					document.getElementById("possibleQuestBox").innerHTML += "<br><br>";
				}
				// if the quest is possible it is added to the array and the box
				Player.quests.possibleQuestArray.push(Quests[Object.keys(Quests)[i]][x].quest);
				document.getElementById("possibleQuestBox").innerHTML += "<strong>" + Quests[Object.keys(Quests)[i]][x].quest + "</strong><br>" + Quests[Object.keys(Quests)[i]][x].howToStart;
			}
		}
	}
	if(Player.quests.possibleQuestArray.length === 0){
		document.getElementById("possibleQuestBox").style.textAlign = "center";
		document.getElementById("possibleQuestBox").innerText = "You have no possible quests";
	}
	Dom.quests.other();
}

Dom.quests.completed = function(quest){
	let first = true;
	for(let i = 0; i < Player.quests.completedQuestArray.length; i++){
		if(quest !== undefined && Player.quests.completedQuestArray[i] === quest.quest){
			// quest has already been completed (daily quest)
			first = false;
		}
	}
	if(quest !== undefined && first){
		Player.quests.completedQuestArray.push(quest.quest);
	}
	if(Player.quests.completedQuestArray.length > 0){
		document.getElementById("completedQuestBox").style.textAlign = "left";
		document.getElementById("completedQuestBox").innerText = "";
		for(let i = 0; i < Player.quests.completedQuestArray.length; i++){
			document.getElementById("completedQuestBox").innerHTML += Player.quests.completedQuestArray[i] + "<br>";
		}
	}
}

Dom.quests.other = function(){
	document.getElementById("otherQuestBox").innerHTML = "";
	for(let i = 0; i < Object.keys(Quests).length; i++){
		for(let x = 0; x < Quests[Object.keys(Quests)[i]].length; x++){
			if(!Player.quests.activeQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest) && !Player.quests.possibleQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest) && !Player.quests.completedQuestArray.includes(Quests[Object.keys(Quests)[i]][x].quest)){
				document.getElementById("otherQuestBox").innerHTML += Quests[Object.keys(Quests)[i]][x].quest + "<br>";
			}
		}
	}
	if(document.getElementById("otherQuestBox").innerHTML === ""){
		document.getElementById("otherQuestBox").style.textAlign = "center";
		document.getElementById("otherQuestBox").innerText = "You have unlocked every quest";
	}
}
Dom.quests.possible();

Dom.merchant.page = function(npc, sold){
	Dom.changeBook("merchantPage", true/*false*/, true);
	//Dom.currentlyDisplayed = npc.name;
	//Dom.changeBook("merchantPage", false); // stops close button being red
	document.getElementById("merchantPageTitle").innerHTML = npc.name;
	document.getElementById("merchantPageChat").innerHTML = npc.chat.shopGreeting;
	document.getElementById("merchantPageOptions").innerHTML = "";
	document.getElementById("merchantPageBuy").innerHTML = "";
	for(let i = 0; i < sold.length; i++){
		document.getElementById("merchantPageOptions").innerHTML += "<img src=" + sold[i].item.image + " class='theseOptions' style='border: 5px solid #886622;'></img><br><br>";
		if(sold[i].costCurrency === undefined){
			sold[i].costCurrency = 2;
		}
		document.getElementById("merchantPageBuy").innerHTML += "<div class='buy'>Buy for: " + sold[i].cost + " " + Items.currency[sold[i].costCurrency].name + "</div><br>";
		for(let x = 0; x < document.getElementsByClassName("buy").length; x++){
			document.getElementsByClassName("buy")[x].onclick = function(){
				Dom.merchant.buy(sold[x], x, npc);
			};
		}
		// repeats for every image
		for(let x = 0; x < document.getElementsByClassName("theseOptions").length; x++){
			document.getElementsByClassName("theseOptions")[x].onmouseover = function(){
				Dom.inventory.displayInformation(sold[x].item);
			};
			document.getElementsByClassName("theseOptions")[x].onmouseleave = function(){
				Dom.expand("information");
			}
		}
		document.getElementById("close").onclick = function(){
			Dom.changeBook(Player.tab, true);
			npc.say(npc.chat.shopLeave, true, 0, false);
		}
	}
}

Dom.merchant.buy = function(item,index,npc){
	if(Dom.inventory.check(item.costCurrency,"currency",item.cost) && Dom.inventory.requiredSpace([item.item],[item.costQuantity])){
		document.getElementsByClassName("buy")[index].style.backgroundColor = "#bb9933";
		setTimeout(function(){
			document.getElementsByClassName("buy")[index].style.backgroundColor = "#fef9b4";
		},200);
		Dom.inventory.removeById(item.costCurrency,"currency",item.cost);
		Dom.inventory.give(item.item,item.costQuantity);
		Dom.chat.insert("You bought a " + item.item.name + ".", 100);
	}else{
		if(!Dom.inventory.check(item.costCurrency,"currency",item.cost)){
			document.getElementsByClassName("buy")[index].style.border = "5px solid red";
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

Dom.identifier.displayed = 0;
Dom.identifier.left = function(npc, over){
	if(Dom.identifier.displayed !== 0){
		Dom.identifier.displayed--;
	}else{
		Dom.identifier.displayed = Dom.identifier.unId.length-1;
	}
	Dom.identifier.page(npc, over);
}

Dom.identifier.right = function(npc, over){
	if(Dom.identifier.displayed !== Dom.identifier.unId.length-1){
		Dom.identifier.displayed++;
	}else{
		Dom.identifier.displayed = 0;
	}
	Dom.identifier.page(npc, over);
}

Dom.identifier.check = function(){
	Dom.identifier.unId = [];
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].unidentified){
			Dom.identifier.unId.push(Player.inventory.items[i]);
		}
	}
	if(Dom.identifier.unId.length > 0){
		return true;
	}else{
		return false;
	}
}

Dom.identifier.page = function(npc, over){
	Dom.changeBook("identifierPage", over, true);
	//Dom.currentlyDisplayed = npc.name;
	//Dom.changeBook("identifierPage", false); // stops close button being red
	document.getElementById("identifierPageChat").innerHTML = npc.chat.identifierGreeting;
	document.getElementById("identifierPageOption").innerHTML = "<img src=" + Dom.identifier.unId[Dom.identifier.displayed].image + " class='theseOptions' style='padding: 0px; margin: 0px; border: 5px solid #886622; height: 50px; width: 50px;'></img>";
	document.getElementById("identifierPageOption").onmouseover = function(){
		Dom.inventory.displayInformation(Dom.identifier.unId[Dom.identifier.displayed]);
	}
	document.getElementById("identifierPageOption").onmouseleave = function(){
		Dom.expand("information");
	}
	document.getElementById("identifierPageBuy").style.visibility = "visible";
	document.getElementById("identifierPageBuy").onclick = function(){
		Dom.identifier.identify(npc);
	}
	document.getElementById("leftArrow").style.top = document.getElementById("identifierPageOption").getBoundingClientRect().top - 32 +"px";
	document.getElementById("leftArrow").style.left = document.getElementById("identifierPageOption").getBoundingClientRect().left - 31 +"px";
	document.getElementById("leftArrow").onclick = function(){
		Dom.identifier.left(npc);
	}
	document.getElementById("rightArrow").style.top = document.getElementById("identifierPageOption").getBoundingClientRect().top - 32 +"px";
	document.getElementById("rightArrow").style.left = document.getElementById("identifierPageOption").getBoundingClientRect().left + 71 +"px";
	document.getElementById("rightArrow").onclick = function(){
		Dom.identifier.right(npc);
	}
	document.getElementById("identifierPageBuy").innerHTML = "Identify for: 1 gold";
}

Dom.inventory.give = function(item, num, position){
	let added = false; // true if you received the item and returned at the end of the function
	if(num === undefined){
		num = 1;
	}
	if(position === undefined){
		for(let y = 0; y < num; y++){
			let add = true; // true if the item still needs to be added
			for(let i = 0; i < Player.inventory.items.length; i++){
				// if the item is already in the inventory
				if(Player.inventory.items[i].id === item.id && Player.inventory.items[i].type === item.type){
					if(Player.inventory.items[i].stacked === undefined){
						Player.inventory.items[i].stacked = 1;
					}		
					if(Player.inventory.items[i].stacked < Player.inventory.items[i].stack){
						// adds the item to the existing stack
						added = true;
						Player.inventory.items[i].stacked++;
						document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(Player.inventory.items[i].onClick !== undefined ? "onclick='Player.inventory.items["+i+"].onClick("+i+")'" : "") +"></img><div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
						add = false;
					}
				}
			}
			if(add){
				for(let i = 0; i < Player.inventory.items.length; i++){
					// if the slot is empty then the item is added
					if(Player.inventory.items[i].image === undefined){
						added = true;
						Player.inventory.items[i] = Object.assign({},item);
						if(Player.inventory.items[i].chooseStats !== undefined){
							item.onClick = Dom.inventory.chooseStats;
						}
						Player.inventory.items[i].onClick = item.onClick;
						if(Array.isArray(Player.inventory.items[i].lore)){
							Player.inventory.items[i].lore = item.lore[Math.floor(Math.random()*item.lore.length)];
						}
						document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(Player.inventory.items[i].onClick !== undefined ? "onclick='Player.inventory.items["+i+"].onClick("+i+")'" : "") +"></img>";
						// if a bag is being given to the bag slot
						if(i === 5 && item.type === "bag"){
							for(let x = 0; x < Math.floor(item.size/6); x++){
								document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+Player.inventory.items.length+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+1)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+2)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+3)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+4)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+5)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
								Player.inventory.items.push({},{},{},{},{},{});
							}
							Dom.inventory.update();
						}
						if(item.type !== "item" && item.type !== "bag" && item.type !== "currency" && item.type !== "fish" && item.type !== "consumable" && localStorage.getItem("accept") === "true" && !Dom.inventory.archaeology.includes(item.name) && item.name !== undefined){
							Dom.inventory.archaeology.push(item.name);
							localStorage.setItem("archaeology",JSON.stringify(Dom.inventory.archaeology));
						}
						break; // stops the item being placed in multiple slots
					}
				}
			}
		}
	// specific position
	}else{
		added = true;
		Player.inventory.items[position] = Object.assign({},item);
		if(Player.inventory.items[position].chooseStats !== undefined){
			item.onClick = Dom.inventory.chooseStats;
		}
		Player.inventory.items[position].onClick = item.onClick;
		if(Array.isArray(Player.inventory.items[position].lore)){
			Player.inventory.items[position].lore = item.lore[Math.floor(Math.random()*item.lore.length)];
		}
		document.getElementById("itemInventory").getElementsByTagName("td")[position].innerHTML = "<img src='"+Player.inventory.items[position].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+position+")' "+(Player.inventory.items[position].onClick !== undefined ? "onclick='Player.inventory.items["+position+"].onClick("+position+")'" : "") +"></img>";
		Player.inventory.items[position].stacked = num;
		if(Player.inventory.items[position].stacked !== undefined && Player.inventory.items[position].stacked !== 1){
			document.getElementById("itemInventory").getElementsByTagName("td")[position].innerHTML += "<div class='stackNum' id='stackNum"+position+"'>"+Player.inventory.items[position].stacked+"</div>";
		}
		// if a bag is being given to the bag slot
		if(position === 5 && item.type === "bag"){
			for(let x = 0; x < Math.floor(item.size/6); x++){
				document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+Player.inventory.items.length+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
				<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+1)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
				<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+2)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
				<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+3)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
				<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+4)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
				<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+5)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
				Player.inventory.items.push({},{},{},{},{},{});
			}
			Dom.inventory.update();
		}
		if(item.type !== "item" && item.type !== "bag" && item.type !== "currency" && item.type !== "fish" && item.type !== "consumable" && localStorage.getItem("accept") === "true" && !Dom.inventory.archaeology.includes(item.name) && item.name !== undefined){
			Dom.inventory.archaeology.push(item.name);
			localStorage.setItem("archaeology",JSON.stringify(Dom.inventory.archaeology));
		}
	}
	Dom.hotbar.update();
	Dom.quests.active();
	if(added){
		return true;
	}else{
		return false;
	}
}

if(localStorage.getItem("archaeology") !== null){
	Dom.inventory.archaeology = JSON.parse(localStorage.getItem("archaeology"));
}else{
	Dom.inventory.archaeology = [];
}

Dom.inventory.chooseStats = function(inventoryPosition){
	// item inventory
	if(!isNaN(inventoryPosition)){
		let values = "";
		let str = Player.inventory.items[inventoryPosition].chooseStats;
		Dom.alert.ev = [];
		// repeats for each chooseStat
		for(let i = 0; i < Object.keys(str).length; i++){
			if(Object.keys(str)[i] === Player.inventory.items[inventoryPosition].chosenStat){
				values += "<strong><span onclick='Dom.alert.target(Dom.alert.ev, "+i+")'>"+str[Object.keys(str)[i]] + " " + Object.keys(str)[i][0].toUpperCase() + Object.keys(str)[i].slice(1).replace( /([A-Z])/g, " $1" )+"</span></strong><br>";
			}else{
				values += "<span onclick='Dom.alert.target(Dom.alert.ev, "+i+")'>"+str[Object.keys(str)[i]] + " " + Object.keys(str)[i][0].toUpperCase() + Object.keys(str)[i].slice(1).replace( /([A-Z])/g, " $1" )+"</span><br>";
			}
			Dom.alert.ev.push([Object.keys(str)[i], str[Object.keys(str)[i]]]);
		}
		Dom.alert.target = function(ev, num){
			document.getElementById("alert").hidden = true;
			if(Player.inventory.items[inventoryPosition].chosenStat !== undefined){
				delete Player.inventory.items[inventoryPosition].stats[Player.inventory.items[inventoryPosition].chosenStat];
			}
			Player.inventory.items[inventoryPosition].chosenStat = ev[num][0];
			Player.inventory.items[inventoryPosition].stats[ev[num][0]] = ev[num][1];
		}
		Dom.alert.page("Choose an effect:", 3, values)
	// equipped
	}else{
		let values = "";
		let str = Player.inventory[inventoryPosition].chooseStats;
		Dom.alert.ev = [];
		// repeats for each chosenStat
		for(let i = 0; i < Object.keys(str).length; i++){
			if(Object.keys(str)[i] === Player.inventory[inventoryPosition].chosenStat){
				values += "<strong><span onclick='Dom.alert.target(Dom.alert.ev, "+i+")'>"+str[Object.keys(str)[i]] + " " + Object.keys(str)[i][0].toUpperCase() + Object.keys(str)[i].slice(1).replace( /([A-Z])/g, " $1" )+"</span></strong><br>";
			}else{
				values += "<span onclick='Dom.alert.target(Dom.alert.ev, "+i+")'>"+str[Object.keys(str)[i]] + " " + Object.keys(str)[i][0].toUpperCase() + Object.keys(str)[i].slice(1).replace( /([A-Z])/g, " $1" )+"</span><br>";
			}
			Dom.alert.ev.push([Object.keys(str)[i], str[Object.keys(str)[i]]]);
		}
		Dom.alert.target = function(ev, num){ /// FIX AND COMMENT THIS FUNCTION
			document.getElementById("alert").hidden = true;
			if(Player.inventory[inventoryPosition].chosenStat !== undefined){
				Player.stats[Player.inventory[inventoryPosition].chosenStat] -= parseFloat(Player.inventory[inventoryPosition].stats[Player.inventory[inventoryPosition].chosenStat]);
				let x = Items.set[Player.inventory[inventoryPosition].set].multiplier.findIndex(multiplier => multiplier.stat === "chosenStat");
				if(x !== -1){
					Player.stats[Player.inventory[inventoryPosition][Items.set[Player.inventory[inventoryPosition].set].multiplier[x].stat]] -= parseFloat(Player.inventory[inventoryPosition].stats[Player.inventory[inventoryPosition][Items.set[Player.inventory[inventoryPosition].set].multiplier[x].stat]]);
				}
				delete Player.inventory[inventoryPosition].stats[Player.inventory[inventoryPosition].chosenStat];
			}
			Player.inventory[inventoryPosition].chosenStat = ev[num][0];
			Player.stats[ev[num][0]] += parseFloat(ev[num][1]);
			Player.inventory[inventoryPosition].stats[ev[num][0]] = ev[num][1];
			let x = Items.set[Player.inventory[inventoryPosition].set].multiplier.findIndex(multiplier => multiplier.stat === "chosenStat");
			if(x !== -1){
				Player.stats[Player.inventory[inventoryPosition][Items.set[Player.inventory[inventoryPosition].set].multiplier[x].stat]] += parseFloat(Player.inventory[inventoryPosition].stats[Player.inventory[inventoryPosition][Items.set[Player.inventory[inventoryPosition].set].multiplier[x].stat]]);
			}
		}
		Dom.alert.page("Choose an effect:", 3, values)
	}
}

Dom.inventory.constructUnId = function(area,tier){
	let tempUnId = new UnId(area,tier);
	Dom.inventory.give(tempUnId);
}

function UnId(area,tier){
	this.area = area;
	this.tier = tier;
	let types = ["helm","chest","greaves","boots","sword","staff","bow"];
	this.typeNum = Math.floor(Math.random()*7);
	this.type = types[this.typeNum].toLowerCase();
	this.image = "assets/items/"+this.type+"/unidentified.png";
	this.rarityNum = Math.floor(Math.random()*25);
	if(this.rarityNum < 18){
	this.rarity = "common";
	}else if(this.rarityNum < 24){
		this.rarity = "unique";
	}else{
		this.rarity = "mythic";
	}
	this.unidentified = true;
	this.sellPrice = 1;
}

Dom.identifier.identify = function(npc){
	if(Dom.inventory.check(2,"currency",1)/* && Dom.identifier.unId.length !== 0*/){
		Dom.inventory.removeById(2,"currency",1);
		Dom.changeBook("identifiedPage",true);
		Dom.currentlyDisplayed = npc.name;
		for(let i = 0; i < Player.inventory.items.length; i++){
			if(Player.inventory.items[i].unidentified && Player.inventory.items[i].tier === Dom.identifier.unId[Dom.identifier.displayed].tier && Player.inventory.items[i].area === Dom.identifier.unId[Dom.identifier.displayed].area && Player.inventory.items[i].rarity === Dom.identifier.unId[Dom.identifier.displayed].rarity && Player.inventory.items[i].type === Dom.identifier.unId[Dom.identifier.displayed].type){
				Player.inventory.items[i] = {};
				document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "";
				break; // stops multiple items being removed
			}
		}
		Dom.identifier.array = []; // array of possible identified items
		if(Dom.identifier.unId[Dom.identifier.displayed].rarity === "common"){
			document.getElementById("identifiedPageChat").innerHTML = npc.chat.identifyCommon;
		}else if(Dom.identifier.unId[Dom.identifier.displayed].rarity === "unique"){
			document.getElementById("identifiedPageChat").innerHTML = npc.chat.identifyUnique;
		}else{
			document.getElementById("identifiedPageChat").innerHTML = npc.chat.identifyMythic;
		}
		// repeats for every item of the same catergory (e.g. bow)
		for(let i = 0; i < Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]].length; i++){
			if(Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]][i].tier === Dom.identifier.unId[Dom.identifier.displayed].tier && Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]][i].area === Dom.identifier.unId[Dom.identifier.displayed].area && Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]][i].rarity === Dom.identifier.unId[Dom.identifier.displayed].rarity){
				// add it to the array of possible items if it matches the stats
				Dom.identifier.array.push(Items[Object.keys(Items)[Dom.identifier.unId[Dom.identifier.displayed].typeNum]][i]);
			}
		}
		Dom.identifier.num = Math.floor(Math.random()*Dom.identifier.array.length);
		Dom.identifier.item = Dom.identifier.array[Dom.identifier.num]; // a random item from the array of possible items
		document.getElementById("identifiedPageOption").innerHTML = "<img src=" + Dom.identifier.item.image + " class='theseOptions' style='padding: 0px; margin: 0px; border: 5px solid #886622; height: 50px; width: 50px;'></img>";
		Dom.inventory.give(Dom.identifier.item);
		document.getElementById("identifiedPageOption").getElementsByTagName("img")[0].onmouseover = function(){
			Dom.inventory.displayInformation(Dom.identifier.array[Dom.identifier.num]);
		}
		document.getElementById("identifiedPageOption").getElementsByTagName("img")[0].onmouseleave = function(){
			Dom.expand("information");
		}
		document.getElementById("identifiedPageBack").onclick = function(){
			Dom.identifier.displayed = 0;
			if(Dom.identifier.check()){
				Dom.identifier.page(npc, true);
			}else{
				Dom.changeBook(Player.tab, true);
			}
		}
		Dom.identifier.unId.splice(Dom.identifier.displayed, 1);
	}else/* if(Dom.identifier.unId.length !== 0)*/{
 		document.getElementById("identifierPageBuy").style.border = "5px solid red";
		setTimeout(function(){
			document.getElementById("identifierPageBuy").style.border = "5px solid #886622";
		},200);
		npc.say(npc.chat.tooPoor, true, 0, true);
	}
}

Dom.inventory.dispose = function(ev){
	let quest = false;
	if(!isNaN(parseInt(ev.dataTransfer.getData("text"))) && Player.inventory.items[parseInt(ev.dataTransfer.getData("text"))].quest){
		// if it is a quest item
		quest = true;
	}
	let remove = true;
	for(let i = 6; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].image !== undefined){
			// if it is safe to dispose of the bag
			remove = false;
		}
	}
	ev.preventDefault(); // allows the item to drop
	if((ev.target.id === "inventoryPage" || ev.target.id === "displayStats" || ev.target.id === "bagText") && !(!remove && ev.dataTransfer.getData("text") === "5" && Player.inventory.items[5].type === "bag") && !quest){
		Dom.alert.target = function(ev, all){
			// item inventory
			if(!isNaN(parseInt(ev[0]))){
				// if you dispose of the bag then reset the inventory
				if(parseInt(ev[0]) === 5 && Player.inventory.items[5].type === "bag"){
					document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[0])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
					<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[1])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
					<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[2])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
					<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[3])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
					<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[4])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
					<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[5])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
					document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
					for(let x = 0; x < 6; x++){
						if(Player.inventory.items[x].image !== undefined){
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
					// removes the item from slot 0 to 9
					Dom.inventory.remove(parseInt(ev[0]), all);
				}else{
					// removes the item from slot 10 to 99
					Dom.inventory.remove(parseInt(ev[0]+ev[1]), all);
				}
			}else if(ev[0] === "w"){
				Dom.inventory.removeEquipment(Player.inventory.weapon);
				Player.inventory.weapon = {};
				document.getElementById("weapon").innerHTML = "";
			}else if(ev[0] === "h"){
				Dom.inventory.removeEquipment(Player.inventory.helm);
				Player.inventory.helm = {};
				document.getElementById("helm").innerHTML = "";
			}else if(ev[0] === "c"){
				Dom.inventory.removeEquipment(Player.inventory.chest);
				Player.inventory.chest = {};
				document.getElementById("chest").innerHTML = "";
			}else if(ev[0] === "g"){
				Dom.inventory.removeEquipment(Player.inventory.greaves);
				Player.inventory.greaves = {};
				document.getElementById("greaves").innerHTML = "";
			}else{
				Dom.inventory.removeEquipment(Player.inventory.boots);
				Player.inventory.boots = {};
				document.getElementById("boots").innerHTML = "";
			}
		};
		Dom.alert.ev = Object.assign({},ev.dataTransfer.getData("text"));
		if(!isNaN(parseInt(ev.dataTransfer.getData("text")))){
			if(Player.inventory.items[parseInt(ev.dataTransfer.getData("text"))].stacked > 1){
				Dom.alert.page("How many would you like to drop?", 2);
			}else{
				Dom.alert.page("Are you sure you want to drop this item? It will be lost forever!", 1);
			}
		}else{
			Dom.alert.page("Are you sure you want to drop this item? It will be lost forever!", 1);
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
	let remove = false;
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].type === type && Player.inventory.items[i].id === ID){
			Dom.inventory.remove(i, num);
			remove = true;
			break; // stops multiple items being removed
		}
	}
	// if the item has not yet been removed check the equipped slots
	if(!remove){
		for(let i = 0; i < Object.keys(Player.inventory).length-1; i++){
			if(Player.inventory[Object.keys(Player.inventory)[i]].type === type && Player.inventory[Object.keys(Player.inventory)[i]].id === ID){
				let equipment = ["helm","chest","greaves","boots","weapon"]
				Dom.inventory.removeEquipment(Player.inventory[equipment[i]]);
				Player.inventory[equipment[i]] = {};
				document.getElementById(equipment[i]).innerHTML = "";
				remove = true;
				break; // stops multiple items being removed
			}
		}
	}
	Dom.hotbar.update();
	if(remove){
		return true;
	}else{
		return false;
	}
}

Dom.inventory.remove = function(num, all){
	// repeats once unless all is a number
	for(let i = 0; i < (isNaN(all) ? 1 : all); i++){
		// remove item completely
		if(Player.inventory.items[num].stacked === 1 || Player.inventory.items[num].stacked === undefined || all === true){
			//if(Player.inventory.items[num].image !== undefined){
			document.getElementById("itemInventory").getElementsByTagName("td")[num].innerHTML = "";
			Player.inventory.items[num] = {};
			// if more items still need to be removed
			if(!isNaN(all) && all - i !== 1){
				// check for more of the same items and remove them
				Dom.inventory.removeById(Player.inventory.items[num].id, Player.inventory.items[num].type, all - i - 1);
			}
			//}
		// decrease stack size
		}else{
			Player.inventory.items[num].stacked--;
			if(Player.inventory.items[num].stacked !== 1){
				document.getElementById("itemInventory").getElementsByTagName("td")[num].innerHTML = "<img src='"+Player.inventory.items[num].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+num+")' "+(Player.inventory.items[num].onClick !== undefined ? "onclick='Player.inventory.items["+num+"].onClick("+num+")'" : "") +"></img><div class='stackNum' id='stackNum"+num+"'>"+Player.inventory.items[num].stacked+"</div>";
			}else{
				document.getElementById("itemInventory").getElementsByTagName("td")[num].innerHTML = "<img src='"+Player.inventory.items[num].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+num+")' "+(Player.inventory.items[num].onClick !== undefined ? "onclick='Player.inventory.items["+num+"].onClick("+num+")'" : "") +"></img>";
			}
		}
	}
	Dom.hotbar.update();
	Dom.quests.active();
}

// updates the position of the "buy bags to get more inventory space" text
Dom.inventory.update = function(){
	document.getElementById("bagText").style.top = 300+(26*(document.getElementById("itemInventory").rows.length))+"px";
}

// when an item is held over a place that it can be dropped in
Dom.inventory.allowDrop = function(ev){
    ev.preventDefault(); // allows the item to be dropped
}

Dom.inventory.drag = function(ev, x){
    ev.dataTransfer.setData("text", x); // ev.dataTransfer.getData("text") || data = initial position of item
	Dom.expand("information");
}

Dom.inventory.drop = function(ev,equip){
    ev.preventDefault(); // allows the item to drop
	let data = ev.dataTransfer.getData("text"); // initial position of item
	let test = ""+ev.target+""; // what it is being dropped on e.g. [object HTMLTableCellElement]
	// if the item is being moved to an item inventory slot
	if(equip === undefined){
		// if the item is being moved from an item inventory slot
		if(data !== "weapon" && data !== "helm" && data !== "chest" && data !== "greaves" && data !== "boots"){
			// if there is not an item already there
			if(test[12] === "T" && ev.target.innerHTML === ""){
				for(let i = 0; i < Player.inventory.items.length; i++){
					let remove = true;
					if((i === 5 && Player.inventory.items[i].type === "bag") || (data === "5" && Player.inventory.items[data].type === "bag")){
						for(let i = 6; i < Player.inventory.items.length; i++){
							if(Player.inventory.items[i].image !== undefined){
								// if a bag is being removed and is unsafe to remove
								remove = false;
							}
						}
					}
					// if the item slot is where you are putting the item and it is not a bag which is unsafe to remove
					if(document.getElementById("itemInventory").getElementsByTagName("td")[i] === ev.target && ((i < 6 && remove && parseInt(data) === 5 && Player.inventory.items[data].type === "bag") || !(parseInt(data) === 5 && Player.inventory.items[data].type === "bag"))){
						Player.inventory.items[i] = Player.inventory.items[data];
						ev.target.innerHTML = "<img src='"+Player.inventory.items[data].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(Player.inventory.items[i].onClick !== undefined ? "onclick='Player.inventory.items["+i+"].onClick("+i+")'" : "")+"></img>";
						if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
							ev.target.innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
						}
						// if a bag is being removed
						if(parseInt(data) === 5 && Player.inventory.items[data].type === "bag"){
							document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[0])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
							<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[1])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
							<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[2])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
							<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[3])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
							<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[4])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
							<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[5])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
							document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
							for(let x = 0; x < 6; x++){
								if(Player.inventory.items[x].image !== undefined){
									document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML = '<img src="'+Player.inventory.items[x].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+x+')"></img>';
									if(Player.inventory.items[x].stacked !== undefined && Player.inventory.items[x].stacked !== 1){
										document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML += "<div class='stackNum' id='stackNum"+x+"'>"+Player.inventory.items[x].stacked+"</div>";
									}					
								}
							}
							Player.inventory.items.splice(6,Player.inventory.items.length-6);
						}
						// if a bag is being equipped
						if(i === 5 && Player.inventory.items[data].type === "bag"){
							for(let x = 0; x < Math.floor(Player.inventory.items[data].size/6); x++){
								document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+Player.inventory.items.length+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+1)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+2)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+3)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+4)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
								<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+5)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
								Player.inventory.items.push({},{},{},{},{},{});
							}
						}
						Player.inventory.items[data] = {};
						document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = "";
					}else if(document.getElementById("itemInventory").getElementsByTagName("td")[i] === ev.target){
						Dom.alert.page("Move some items to the bank or dispose of them before you can do that.");
					}
				}
			// if there is an item already there
			}else{
				for(let i = 0; i < Player.inventory.items.length; i++){
					let remove = true;
					if((i === 5 && Player.inventory.items[i].type === "bag") || (data === "5" && Player.inventory.items[data].type === "bag")){
						for(let x = 6; x < Player.inventory.items.length; x++){
							if(Player.inventory.items[x].image !== undefined){
								// two bags are being swapped at the bag slot
								if(i === 5 && Player.inventory.items[i].type === "bag" && Player.inventory.items[data].type === "bag"){
									// if the new bag is smaller than the old bag
									if(Player.inventory.items[i].size > Player.inventory.items[data].size){
										// if the item is outside the new bag size
										if(x >= Player.inventory.items[i].size){
											// dont let the bags be swapped
											remove = false;
										}
									}
								// two bags are being swapped
								}else if(data === "5" && Player.inventory.items[data].type === "bag" && Player.inventory.items[i].type === "bag"){
									// if the new bag is smaller than the old bag
									if(Player.inventory.items[data].size > Player.inventory.items[i].size){
										// if the item is outside the new bag size
										if(x >= Player.inventory.items[data].size){
											// dont let the bags be swapped
											remove = false;
										}
									}
								// a bag is being removed and not replaced
								}else{
									// dont let the bag be removed
									remove = false;
								}
							}
						}
					}
					// if the item slot is where you are putting the item and it is not a bag which is unsafe to move
					if(document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML.indexOf(ev.target.outerHTML) >= 0 && ev.target.outerHTML !== "" && remove){
						// if it is not a key being dropped on a chest
						if(!(Player.inventory.items[data].opens !== undefined && Player.inventory.items[data].opens.type === Player.inventory.items[i].type && Player.inventory.items[data].opens.id === Player.inventory.items[i].id)){
							// swaps the items
							test = Player.inventory.items[i];
							Player.inventory.items[i] = Player.inventory.items[data];
							Player.inventory.items[data] = test;
							// swaps the items images
							document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = "<img src='"+Player.inventory.items[data].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+data+")' "+(Player.inventory.items[data].onClick !== undefined ? "onclick='Player.inventory.items["+data+"].onClick("+data+")'" : "")+"></img>";
							if(Player.inventory.items[data].stacked !== undefined && Player.inventory.items[data].stacked !== 1){
								document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML += "<div class='stackNum' id='stackNum"+data+"'>"+Player.inventory.items[data].stacked+"</div>";
							}
							document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(Player.inventory.items[i].onClick !== undefined ? "onclick='Player.inventory.items["+i+"].onClick("+i+")'" : "")+"></img>";
							if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
								document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
							}
							// bag cases
							// going from the bag slot from a bag
							if(parseInt(data) === 5 && Player.inventory.items[i].type === "bag"){
								// if it is being swapped with another bag
								if(Player.inventory.items[data].type === "bag"){
									// if the new bag is bigger than the old bag
									if(Player.inventory.items[data].size >= Player.inventory.items[i].size){
										for(let x = 0; x < (Player.inventory.items[data].size - Player.inventory.items[i].size)/6; x++){
											document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+Player.inventory.items.length+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+1)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+2)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+3)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+4)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+5)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
											Player.inventory.items.push({},{},{},{},{},{});
										}
									// if the new bag is smaller than the old bag
									}else{
										// removes the code from the rest of the inventory
										Player.inventory.items.splice(6+Player.inventory.items[data].size,Player.inventory.items[i].size - Player.inventory.items[data].size);
										// rebuilds the inventory
										document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[0])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[1])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[2])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[3])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[4])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[5])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
										for(let y = 1; y < (Player.inventory.items[data].size/6)+1; y++){
											document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(0+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(1+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(2+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(3+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(4+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(5+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
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
								// if the bag is bing removed and not replaced
								}else/* if(remove)*/{ 
									// removes the code from the rest of the inventory
									Player.inventory.items.splice(6,Player.inventory.items.length-6);
									// rebuilds the hotbar
									document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[0])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[1])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[2])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[3])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[4])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[5])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
									document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
									for(let x = 0; x < 6; x++){
										if(Player.inventory.items[x].image !== undefined){
											document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML = '<img src="'+Player.inventory.items[x].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+x+')"></img>';
											if(Player.inventory.items[x].stacked !== undefined && Player.inventory.items[x].stacked !== 1){
												document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML += "<div class='stackNum' id='stackNum"+x+"'>"+Player.inventory.items[x].stacked+"</div>";
											}
										}
									}
								}/*else{
									Dom.alert.page("Move some items to the bank or dispose of them before you can do that.");
								}*/
							// going to the bag slot to a bag
							}else if(i === 5 && Player.inventory.items[data].type === "bag"){
								// if it is being swapped with another bag
								if(Player.inventory.items[i].type === "bag"){
									// if the new bag is bigger than the old bag
									if(Player.inventory.items[i].size >= Player.inventory.items[data].size){
										for(let x = 0; x < (Player.inventory.items[i].size - Player.inventory.items[data].size)/6; x++){
											document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+Player.inventory.items.length+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+1)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+2)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+3)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+4)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+5)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
											Player.inventory.items.push({},{},{},{},{},{});
										}
									// if the new bag is smaller than the old bag
									}else{
										// removes the code from the rest of the inventory
										Player.inventory.items.splice(6+Player.inventory.items[i].size,Player.inventory.items[data].size - Player.inventory.items[i].size);
										// rebuilds the inventory
										document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[0])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[1])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[2])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[3])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[4])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
										<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[5])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
										for(let y = 1; y < (Player.inventory.items[i].size/6)+1; y++){
											document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(0+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(1+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(2+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(3+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(4+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
											<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(5+6*y)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
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
								// if the bag is being removed and not replaced
								}else/* if(remove)*/{
									// removes the code from the rest of the inventory
									Player.inventory.items.splice(6,Player.inventory.items.length-6);
									// rebuilds the hotbar
									document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[0])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[1])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[2])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[3])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[4])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[5])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
									document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
									for(let x = 0; x < 6; x++){
										if(Player.inventory.items[x].image !== undefined){
											document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML = '<img src="'+Player.inventory.items[x].image+'" draggable="true" ondragstart="Dom.inventory.drag(event,'+x+')"></img>';
											if(Player.inventory.items[x].stacked !== undefined && Player.inventory.items[x].stacked !== 1){
												document.getElementById("itemInventory").getElementsByTagName("td")[x].innerHTML += "<div class='stackNum' id='stackNum"+x+"'>"+Player.inventory.items[x].stacked+"</div>";
											}
										}
									}
								}/*else{
									Dom.alert.page("Move some items to the bank or dispose of them before you can do that.");
								}*/
							// going to the bag slot from a bag and not swapping
							}else if(i === 5 && Player.inventory.items[i].type === "bag"){
								for(let x = 0; x < Math.floor(Player.inventory.items[i].size/6); x++){
									document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+Player.inventory.items.length+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+1)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+2)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+3)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+4)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+5)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
									Player.inventory.items.push({},{},{},{},{},{});
								}
							// going from the bag slot to a bag and not swapping
							}else if(parseInt(data) === 5 && Player.inventory.items[data].type === "bag"){
								for(let x = 0; x < Math.floor(Player.inventory.items[data].size/6); x++){
									document.getElementById("itemInventory").innerHTML += '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+Player.inventory.items.length+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+1)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+2)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+3)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+4)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
									<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items['+(Player.inventory.items.length+5)+'])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
									Player.inventory.items.push({},{},{},{},{},{});
								}
							}
						// if it is a key being dropped on a chest
						}else{
							Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onOpen();
							Dom.inventory.remove(i);
							Dom.inventory.remove(data);
						}
						//break;
					}else if(document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML.indexOf(ev.target.outerHTML) >= 0 && ev.target.outerHTML !== ""){
						Dom.alert.page("Move some items to the bank or dispose of them before you can do that.");
					}
				}
			}
		// if the item is being moved from a weapon/armour slot
		}else{
			// if there is not an item already there
			if(test[12] === "T" && ev.target.innerHTML === ""){
				for(let i = 0; i < Player.inventory.items.length; i++){
					if(document.getElementById("itemInventory").getElementsByTagName("td")[i] === ev.target){
						Player.inventory.items[i] = Player.inventory[data];
						document.getElementById(data).innerHTML = "";
						ev.target.innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(Player.inventory.items[i].onClick !== undefined ? "onclick='Player.inventory.items["+i+"].onClick("+i+")'" : "") +"></img>";
						if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
							ev.target.innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
						}
						if(Player.inventory.items[i].type === "helm" || Player.inventory.items[i].type === "chest" || Player.inventory.items[i].type === "greaves" || Player.inventory.items[i].type === "boots"){
							Dom.inventory.removeEquipment(Player.inventory[Player.inventory.items[i].type]);
							Player.inventory[Player.inventory.items[i].type] = {};
						// if it is a weapon
						}else{
							Dom.inventory.removeEquipment(Player.inventory.weapon);
							Player.inventory.weapon = {};
						}
					}
				}
			// if there is an item already there
			}else{
				for(let i = 0; i < Player.inventory.items.length; i++){
					// if the item slot is where you are putting the item and it is allowed there
					if(document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML === ev.target.outerHTML && (((Player.inventory.items[i].allClasses === true || (Player.inventory.items[i].type === "sword" && Player.class === "k") || (Player.inventory.items[i].type === "staff" && Player.class === "m") || (Player.inventory.items[i].type === "bow" && Player.class === "a") || Player.inventory.items[i].type === "rod") && data === "weapon") || Player.inventory.items[i].type === data)){
						// swaps the items
						test = Player.inventory.items[i];
						Player.inventory.items[i] = Player.inventory[data];
						Player.inventory[data] = test;
						// swaps the items images
						document.getElementById(data).innerHTML = "<img src='"+Player.inventory[data].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+data+"\")' "+(Player.inventory[data].onClick !== undefined ? "onclick='Player.inventory."+data+".onClick(\""+data+"\")'" : "")+"></img>";
						document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(Player.inventory.items[i].onClick !== undefined ? "onclick='Player.inventory.items["+i+"].onClick("+i+")'" : "") +"></img>";
						if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
							ev.target.innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
						}
						if(Player.inventory.items[i].type === "helm" || Player.inventory.items[i].type === "chest" || Player.inventory.items[i].type === "greaves" || Player.inventory.items[i].type === "boots"){
							Dom.inventory.removeEquipment(Player.inventory[Player.inventory.items[i].type]);
							Player.inventory[Player.inventory.items[i].type] = {};
						// if it is a weapon
						}else{
							Dom.inventory.removeEquipment(Player.inventory.weapon);
							Player.inventory.weapon = {};
						}
						Dom.inventory.addEquipment(Player.inventory[data]);			
					}
				}
			}
		}
	// if the item is being moved to a weapon/armour slot
	}else if(data !== "weapon" && data !== "helm" && data !== "chest" && data !== "greaves" && data !== "boots"){
		// if there is not an item already there
		if(test[12] === "D"){
			// if the item slot is where you are putting the item and it is allowed there
			if((Player.inventory.items[data].type === ev.target.id || ((Player.inventory.items[data].allClasses === true || (Player.inventory.items[data].type === "sword" && Player.class === "k") || (Player.inventory.items[data].type === "staff" && Player.class === "m") || (Player.inventory.items[data].type === "bow" && Player.class === "a") || Player.inventory.items[data].type === "rod") && ev.target.id === "weapon")) && !Player.inventory.items[data].unidentified){
				Player.inventory[ev.target.id] = Player.inventory.items[data];
				Player.inventory[ev.target.id].onClick = Player.inventory.items[data].onClick;
				Dom.inventory.addEquipment(Player.inventory[equip]);
				document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = "";
				Player.inventory.items[data] = {};
				document.getElementById(ev.target.id).innerHTML = "<img src='"+Player.inventory[ev.target.id].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+ev.target.id+"\")' "+(Player.inventory[ev.target.id].onClick !== undefined ? "onclick='Player.inventory."+ev.target.id+".onClick(\""+ev.target.id+"\")'" : "")+"></img>";
			}
		// if there is already an item there
		}else{
			// if the item slot is where you are putting the item and it is allowed there
			if((Player.inventory.items[data].type === equip || ((Player.inventory.items[data].allClasses === true || (Player.inventory.items[data].type === "sword" && Player.class === "k") || (Player.inventory.items[data].type === "staff" && Player.class === "m") || (Player.inventory.items[data].type === "bow" && Player.class === "a") || Player.inventory.items[data].type === "rod") && equip === "weapon")) && !Player.inventory.items[data].unidentified){
				// swaps the items
				test = Player.inventory[equip];
				Player.inventory[equip] = Player.inventory.items[data];
				Player.inventory[equip].onClick = Player.inventory.items[data].onClick;
				Player.inventory.items[data] = test;
				Dom.inventory.removeEquipment(Player.inventory[equip]);
				Dom.inventory.addEquipment(Player.inventory[equip]);
				document.getElementById("itemInventory").getElementsByTagName("td")[data].innerHTML = "<img src='"+Player.inventory.items[data].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+data+"\")' "+(Player.inventory.items[data].onClick !== undefined ? "onclick='Player.inventory.items["+data+"].onClick("+data+")'" : "")+"></img>";
				document.getElementById(equip).innerHTML = "<img src='"+Player.inventory[equip].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+equip+"\")' "+(Player.inventory[equip].onClick !== undefined ? "onclick='Player.inventory."+equip+".onClick(\""+equip+"\")'" : "")+"></img>";
			}
		}
	}
	Dom.hotbar.update();
	Dom.inventory.update();
}

Dom.inventory.removeEquipment = function(array){
	if(array.stats !== undefined){
		for(let i = 0; i < Object.keys(array.stats).length; i++){
			if(Object.keys(array.stats)[i] !== "poison" && Object.keys(array.stats)[i] !== "damage"){
				Player.stats[Object.keys(array.stats)[i]] -= parseFloat(array.stats[Object.keys(array.stats)[i]]);
			}else if(Object.keys(array.stats)[i] === "damage"){
				let split = array.stats.damage.split('-');
				Player.stats.damage -= parseFloat(split[0]);
				if(!isNaN(parseFloat(split[1]))){
					Player.stats.maxDamage -= parseFloat(split[1]);
				}
			}else{
				let split = array.stats.poison.split('/');
				Player.stats.poisonX -= parseFloat(split[0]);
				Player.stats.poisonY -= parseFloat(split[1]);
			}
		}
	}
	if(array.set !== undefined){
		Dom.inventory.noSet = false;
		for(let i = 0; i < Items.set[array.set].armour.length; i++){
			if(Player.inventory.helm.name !== Items.set[array.set].armour[i] && Player.inventory.chest.name !== Items.set[array.set].armour[i] && Player.inventory.greaves.name !== Items.set[array.set].armour[i] && Player.inventory.boots.name !== Items.set[array.set].armour[i]){
				// if the set bonus is NOT active
				Dom.inventory.noSet = true;
			}
		}
		if(!Dom.inventory.noSet){
			for(let i = 0; i < Object.keys(Items.set[array.set].stats).length; i++){
				if(Object.keys(Items.set[array.set].stats)[i] !== "poison" && Object.keys(Items.set[array.set].stats)[i] !== "damage"){
					Player.stats[Object.keys(Items.set[array.set].stats)[i]] -= parseFloat(Items.set[array.set].stats[Object.keys(Items.set[array.set].stats)[i]]);
				}else if(Object.keys(Items.set[array.set].stats)[i] === "damage"){
					Player.stats.damage -= parseFloat(Items.set[array.set].stats.damage);
					if(Player.class === "m"){
						Player.stats.maxDamage -= parseFloat(Items.set[array.set].stats.damage);
					}
				}else{
					let split = Items.set[array.set].stats.poison.split('/');
					Player.stats.poisonX -= parseFloat(split[0]);
					Player.stats.poisonY -= parseFloat(split[1]);
				}
			}
			if(Items.set[array.set].multiplier !== undefined){
				for(let x = 0; x < Items.set[array.set].multiplier.length; x++){
					// repeats for each slot that the multiplier applies to (helm, chest...)
					for(let i = 0; i < Items.set[array.set].multiplier[x].slots.length; i++){
						Player.stats[Player.inventory[Items.set[array.set].multiplier[x].slots[i]][Items.set[array.set].multiplier[x].stat]] -= parseFloat(Player.inventory[Items.set[array.set].multiplier[x].slots[i]].stats[Player.inventory[Items.set[array.set].multiplier[x].slots[i]][Items.set[array.set].multiplier[x].stat]]);
					}
				}
			}
		}
	}
}

Dom.inventory.addEquipment = function(array){
	if(array.stats !== undefined){
		for(let i = 0; i < Object.keys(array.stats).length; i++){
			if(Object.keys(array.stats)[i] !== "poison" && Object.keys(array.stats)[i] !== "damage"){
				Player.stats[Object.keys(array.stats)[i]] += parseFloat(array.stats[Object.keys(array.stats)[i]]);
			}else if(Object.keys(array.stats)[i] === "damage"){
				let split = array.stats.damage.split('-');
				Player.stats.damage += parseFloat(split);
				if(!isNaN(parseFloat(split[1]))){
					Player.stats.maxDamage += parseFloat(split[1]);
				}
			}else{
				let split = array.stats.poison.split('/');
				Player.stats.poisonX += parseFloat(split[0]);
				Player.stats.poisonY += parseFloat(split[1]);
			}
		}
	}
	if(array.set !== undefined){
		Dom.inventory.noSet = false;
		for(let i = 0; i < Items.set[array.set].armour.length; i++){
			if(Player.inventory.helm.name !== Items.set[array.set].armour[i] && Player.inventory.chest.name !== Items.set[array.set].armour[i] && Player.inventory.greaves.name !== Items.set[array.set].armour[i] && Player.inventory.boots.name !== Items.set[array.set].armour[i]){
				// if the set bonus is NOT active
				Dom.inventory.noSet = true;
			}
		}
		if(!Dom.inventory.noSet){
			for(let i = 0; i < Object.keys(Items.set[array.set].stats).length; i++){
				if(Object.keys(Items.set[array.set].stats)[i] !== "poison" && Object.keys(Items.set[array.set].stats)[i] !== "damage"){
					Player.stats[Object.keys(Items.set[array.set].stats)[i]] += parseFloat(Items.set[array.set].stats[Object.keys(Items.set[array.set].stats)[i]]);
				}else if(Object.keys(Items.set[array.set].stats)[i] === "damage"){
					Player.stats.damage += parseFloat(Items.set[array.set].stats.damage);
					if(Player.class === "m"){
						Player.stats.maxDamage += parseFloat(Items.set[array.set].stats.damage);
					}
				}else{
					let split = Items.set[array.set].stats.poison.split('/');
					Player.stats.poisonX += parseFloat(split[0]);
					Player.stats.poisonY += parseFloat(split[1]);
				}
			}
			if(Items.set[array.set].multiplier !== undefined){
				for(let x = 0; x < Items.set[array.set].multiplier.length; x++){
					// repeats for each slot that the multiplier applies to (e.g. helm, chest...)
					for(let i = 0; i < Items.set[array.set].multiplier[x].slots.length; i++){
						Player.stats[Player.inventory[Items.set[array.set].multiplier[x].slots[i]][Items.set[array.set].multiplier[x].stat]] += parseFloat(Player.inventory[Items.set[array.set].multiplier[x].slots[i]].stats[Player.inventory[Items.set[array.set].multiplier[x].slots[i]][Items.set[array.set].multiplier[x].stat]]);
					}
				}
			}
		}
	}
}

Dom.inventory.check = function(ID, type, num, noWeapons){
	let completed = 0;
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].type === type && Player.inventory.items[i].id === ID){
			if(Player.inventory.items[i].stacked === undefined){
				Player.inventory.items[i].stacked = 1;
			}
			completed += Player.inventory.items[i].stacked;
		}
	}
	if(((Player.inventory.weapon.type === type && Player.inventory.weapon.id === ID) || (Player.inventory.helm.type === type && Player.inventory.helm.id === ID) || (Player.inventory.chest.type === type && Player.inventory.chest.id === ID) || (Player.inventory.greaves.type === type && Player.inventory.greaves.id === ID) || (Player.inventory.boots.type === type && Player.inventory.boots.id === ID)) && !noWeapons){
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

document.getElementById("inventoryGoldXP").style.backgroundImage = 'url("./assets/class-select/'+Player.class+Player.skin+'/f.png")';
document.getElementById("inventoryGoldXP").style.right = 20 - Skins[Player.class][Player.skin].headAdjust.x + "px";
document.getElementById("inventoryGoldXP").style.height = 60 + Skins[Player.class][Player.skin].headAdjust.y + "px";
document.getElementById("inventoryGoldXP").style.bottom = 3 + Skins[Player.class][Player.skin].headAdjust.y + "px";

Dom.levelUp.page = function(){
	document.getElementById("levelUpPage").hidden = false; // displays over the top of other pages
	//Dom.changeBook("levelUpPage", false);
	if(Dom.currentlyDisplayed === ""){
		Dom.currentlyDisplayed = Player.tab; // so that the page can't change underneath it
	}
	Player.stats.maxHealth += 5;
	document.getElementById("levelUpPageLevel").innerHTML = Player.level-1 + " &#10132; " + Player.level;
	document.getElementById("levelUpPageUnlock").innerHTML = "<strong>Quests Unlocked:</strong>";
	for(let i = 0; i < Object.keys(Quests).length; i++){
		for(let x = 0; x < Quests[Object.keys(Quests)[i]].length; x++){
			if(Quests[Object.keys(Quests)[i]][x].levelRequirement === Player.level){
				document.getElementById("levelUpPageUnlock").innerHTML += "<br>" + Quests[Object.keys(Quests)[i]][x].quest;
			}
		}
	}
	if(document.getElementById("levelUpPageUnlock").innerHTML !== "<strong>Quests Unlocked:</strong>"){
		document.getElementById("levelUpPageUnlock").hidden = false;
	}else{
		document.getElementById("levelUpPageUnlock").hidden = true;
	}
	if(Player.level >= LevelXP.length - 1){
		// sets xp bar to fully completed because Game.getXP doesn't set it when you level up
		Player.xp = LevelXP[Player.level];
	}
	Dom.quests.possible();
}

document.getElementById("alertYes").onclick = function(){
	// close alert and call function with parameter
	Dom.alert.target(Dom.alert.ev);
	document.getElementById("alert").hidden = true;
}

document.getElementById("alertNo").onclick = function(){
	// close alert only
	document.getElementById("alert").hidden = true;
}

document.getElementById("alertDispose").onclick = function(){
	// close alert and call function with parameter and (true)
	Dom.alert.target(Dom.alert.ev, true);
	document.getElementById("alert").hidden = true;
}

document.getElementById("hotbar").onmouseover = function(){
	document.getElementById("hotbar").style.opacity = 1;
}

document.getElementById("hotbar").onmouseleave = function(){
	document.getElementById("hotbar").style.opacity = 0.6;
}

Dom.settings.acceptOn = function(){
	// accept localStorage for progress saving
	localStorage.setItem("accept","true");
	// hide option for progress saving in settings and add save button
	document.getElementById("settingAcceptHolder").innerHTML = "";
	document.getElementById("settingLogout").innerHTML = "<div id='settingControls' onclick='Dom.settings.page(\"settingsTwoPage\")'>Hotkey Bindings</div><br><br>You are logged in as "+Player.name+"<div id='settingSave' onclick='Game.saveProgress()'>Save</div><div id='settingLogoutInner' onclick='Game.saveProgress(\"logout\")'>Logout</div><div id='settingDelete'>Delete</div>";
}

Dom.alert.target = Dom.settings.acceptOn;
if(localStorage.getItem("accept") !== "true"){
	Dom.alert.page("This site uses local storage for progress saving, do you accept?", 1);
}else{
	document.getElementById("settingAcceptHolder").innerHTML = "";
}

if(localStorage.getItem("playMusic") === "true"){
	document.getElementById("musicOn").checked = true;
}

Dom.inventory.checkSpace = function(){
	let space = 0;
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].image === undefined){
			space++
		}
	}
	return space;
}

Dom.inventory.requiredSpace = function(items,quantities){
	let required = 0;
	// repeat for each required item
	for(let i = 0; i < items.length; i++){
		if(items[i].stack === undefined){
			items[i].stack = 1;
		}
		if(quantities[i] === undefined){
			quantities[i] = 1;
		}
		let notRequired = 0;
		for(let x = 0; x < Player.inventory.items.length; x++){
			if(Player.inventory.items[x].stacked === undefined){
				Player.inventory.items[x].stacked = 1;
			}
			if(Player.inventory.items[x].id === items[i].id && Player.inventory.items[x].type === items[i].type){
				notRequired += items[i].stack - Player.inventory.items[x].stacked;
			}
		}
		required += Math.ceil((quantities[i] - notRequired) / items[i].stack); // required empty spaces for this item
	}
	return required <= Dom.inventory.checkSpace();
}

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
	Dom.changeBook("lootPage", true/*false*/, true);
	//Dom.currentlyDisplayed = name;
	let spaces = [];
	for(let i = 0; i < space; i++){
		spaces.push(i);
	}
	document.getElementById("lootingPageTitle").innerHTML = name;
	let lootSpaces = "";
	for(let i = 0; i < space; i+=8){
		lootSpaces += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}
	document.getElementById("lootingPageClose").style.top = 55 * space/8 + "px";
	document.getElementById("lootAll").style.top = 55 * space/8 - 50 + "px";
	let promise = new Promise(function(resolve, reject){
		document.getElementById("loot").innerHTML = lootSpaces;
		resolve("resolved");
	// when the table has been drawn...
	}).then(function(result){
		if(items.length > space){
			console.warn(name+" has generated too much loot for its space of "+space);
		}
		for(let i = 0; i < items.length && i < space; i++){
			let currentSpaceNum = Math.floor(Math.random()*(spaces.length));
			let currentSpace = spaces[currentSpaceNum]; // random slot in the table array
			spaces.splice(currentSpaceNum,1); // removes slot from the table array so it can't be chosen again
			if(quantities[i] !== 1){
				document.getElementById("loot").getElementsByTagName("td")[currentSpace].innerHTML = "<img src=" + items[i].image + " class='lootOptions' id='"+i+"'><div class='lootStackNum'>"+quantities[i]+"</div></img>";
			}else{
				document.getElementById("loot").getElementsByTagName("td")[currentSpace].innerHTML = "<img src=" + items[i].image + " class='lootOptions' id='"+i+"'><span class='lootStackNum'></span></img>";
			}
		}
		// repeats for each piece of loot
		for(let i = 0; i < document.getElementsByClassName("lootOptions").length; i++){
			document.getElementsByClassName("lootOptions")[i].onclick = function(){
				Dom.expand("information");
				if(Dom.inventory.requiredSpace([items[document.getElementsByClassName("lootOptions")[i].id]],[quantities[document.getElementsByClassName("lootOptions")[i].id]])){
					Dom.inventory.give(items[document.getElementsByClassName("lootOptions")[i].id],quantities[document.getElementsByClassName("lootOptions")[i].id]);
					document.getElementsByClassName("lootOptions")[i].outerHTML = "<span class='lootOptions'></span>";
					document.getElementsByClassName("lootStackNum")[i].outerHTML = "<span class='lootStackNum'></span>";
				}else{
					Dom.alert.page("You do not have enough space in your inventory for that item.");
				}
			};
			document.getElementsByClassName("lootStackNum")[i].onclick = function(){
				Dom.expand("information");
				if(Dom.inventory.requiredSpace([items[document.getElementsByClassName("lootOptions")[i].id]],[quantities[document.getElementsByClassName("lootOptions")[i].id]])){
					Dom.inventory.give(items[document.getElementsByClassName("lootOptions")[i].id],quantities[document.getElementsByClassName("lootOptions")[i].id]);
					document.getElementsByClassName("lootOptions")[i].outerHTML = "<span class='lootOptions'></span>";
					document.getElementsByClassName("lootStackNum")[i].outerHTML = "<span class='lootStackNum'></span>";
				}else{
					Dom.alert.page("You do not have enough space in your inventory for that item.");
				}
			};
			document.getElementsByClassName("lootOptions")[i].onmouseover = function(){
				Dom.inventory.displayInformation(items[document.getElementsByClassName("lootOptions")[i].id], quantities[document.getElementsByClassName("lootOptions")[i].id]);
			}
			document.getElementsByClassName("lootStackNum")[i].onmouseover = function(){
				Dom.inventory.displayInformation(items[document.getElementsByClassName("lootOptions")[i].id], quantities[document.getElementsByClassName("lootOptions")[i].id]);
			}
			document.getElementsByClassName("lootOptions")[i].onmouseleave = function(){
				Dom.expand("information");
			}
			document.getElementsByClassName("lootStackNum")[i].onmouseleave = function(){
				Dom.expand("information");
			}
		}
		document.getElementById("lootAll").onclick = function(){
			for(let i = 0; i < document.getElementsByClassName("lootOptions").length; i++){
				if(document.getElementsByClassName("lootOptions")[i].onclick !== null){
					document.getElementsByClassName("lootOptions")[i].onclick();
				}
			}
			Dom.changeBook(Player.tab, true);
			Game.lootClosed();
		}
	},items,quantities,space);
}

function isContainedInArray (subArray, largeArray){
	for(let i = 0; i < subArray.length; i++){
		// if an element from subArray can't be found in largeArray
		if (largeArray.indexOf(subArray[i]) === -1){
			return false;
		}
	}
	return true;
}

document.getElementById("levelUpPageClose").onclick = function(){
	document.getElementById("levelUpPage").hidden = true; // because it was absolutely positioned over the previous page
	if(Dom.currentlyDisplayed === Player.tab){ // because it was never changed if something was already open
		Dom.currentlyDisplayed = "";
	}
}

Dom.text.page = function(npcName, name, text, close, buttons, functions){
	Dom.changeBook("textPage", true/*false*/, true);
	//Dom.currentlyDisplayed = npcName;
	document.getElementById("textPage").innerHTML = '<h1 id="textPageName">'+name+'</h1>'
	document.getElementById("textPage").innerHTML += '<p id="textPageText">'+text+'</p>'
	for(let i = 0; i < buttons.length; i++){
		if(buttons[i] !== undefined){ // because instructions page has undefined buttons meaning no buttons
			document.getElementById("textPage").innerHTML += "<br><center><div id='buttons"+i+"' class='buttons'>"+buttons[i]+"</div></center>";
		}
	}
	if(close){
		document.getElementById("textPage").innerHTML += "<br><br><br><center><div class='closeClass' onclick='Dom.changeBook(Player.tab, true)'>Close</div></center>";
	}
	for(let i = 0; i < buttons.length; i++){
		if(buttons[i] !== undefined){ // because instructions page has undefined buttons meaning no buttons
			document.getElementById("buttons"+i).onclick = function(){
				functions[i]();
			}
		}
	}
}

Dom.buyer.remove = function(i, all){
	// if the bag was removed
	if(i === 5 && Player.inventory.items[5].type === "bag"){
		// rebuild the hotbar
		document.getElementById("itemInventory").innerHTML = '<tr><td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[0])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
		<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[1])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
		<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[2])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
		<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[3])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
		<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[4])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td>\
		<td ondrop="Dom.inventory.drop(event);Game.inventoryUpdate(event)" ondragover="Dom.inventory.allowDrop(event)" onmouseover="Dom.inventory.displayInformation(Player.inventory.items[5])" onmouseleave="Dom.expand(\'information\')" ondrag="Dom.expand(\'information\')" onclick="Game.inventoryUpdate()"></td></tr>';
		document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
		for(let x = 0; x < 6; x++){
			if(Player.inventory.items[x].image !== undefined){
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
	Dom.inventory.give(Items.currency[Player.inventory.items[i].sellCurrency], (all ? Player.inventory.items[i].sellQuantity*Math.floor(Player.inventory.items[i].stacked/Player.inventory.items[i].sellQuantity)*Player.inventory.items[i].sellPrice : /*Player.inventory.items[i].sellPrice*Player.inventory.items[i].sellQuantity <= Player.inventory.items[i].stacked ?*/ Player.inventory.items[i].sellPrice /*: 0*/));
	Dom.inventory.remove(i, all ? Math.floor(Player.inventory.items[i].stacked/Player.inventory.items[i].sellQuantity)*Player.inventory.items[i].sellQuantity : /*Player.inventory.items[i].sellQuantity <= Player.inventory.items[i].stacked ?*/ Player.inventory.items[i].sellQuantity /*: 0*/);
	Dom.buyer.page();
}

Dom.buyer.page = function(npc){
	Dom.changeBook("buyerPage", true/*false*/, true);
	// if the buyer page is being opened not refreshed
	if(npc !== undefined){0
		//Dom.currentlyDisplayed = npc.name;
		document.getElementById("buyerPageChat").innerHTML = npc.chat.buyerGreeting;
	}
	document.getElementById("buyerPageInventory").innerHTML = "";
	for(let i = 0; i < document.getElementById("itemInventory").getElementsByTagName("td").length / 6; i++){
		document.getElementById("buyerPageInventory").innerHTML += "<tr><td/><td/><td/><td/><td/><td/></tr>";
	}
	//document.getElementById("buyerPageClose").style.top = 50 + 55* document.getElementById("itemInventory").getElementsByTagName("td").length / 6 + "px";
	let remove = true;
	for(let i = 6; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].image !== undefined){
			// if the bag is unsafe to remove
			remove = false;
		}
	}
	for(let i = 0; i < Player.inventory.items.length; i++){
		if(Player.inventory.items[i].image !== undefined){
			// building the table
			document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")'></img>";;
			if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
				document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
			}
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
					if(!(!remove && i === 5 && Player.inventory.items[5].type === "bag") && Dom.inventory.check(Player.inventory.items[i].id, Player.inventory.items[i].type, Player.inventory.items[i].sellQuantity)){
						Dom.alert.ev = i;
						Dom.alert.target = Dom.buyer.remove;
						if(Player.inventory.items[i].stacked >= Player.inventory.items[i].sellQuantity*2){
							Dom.alert.page("How many <strong>"+Player.inventory.items[i].name.toLowerCase()+"</strong> would you like to sell for <strong>"+Player.inventory.items[i].sellPrice+" "+Items.currency[Player.inventory.items[i].sellCurrency].name.toLowerCase()+"</strong> each?", 2, [Player.inventory.items[i].sellQuantity <= Player.inventory.items[i].stacked ? Player.inventory.items[i].sellQuantity : 0, Math.floor(Player.inventory.items[i].stacked/Player.inventory.items[i].sellQuantity)*Player.inventory.items[i].sellQuantity]);
						}else{
							Dom.alert.page("Are you sure you want to sell <strong>"+(Player.inventory.items[i].sellQuantity > 1 ? Player.inventory.items[i].sellQuantity+" " : "")+(Player.inventory.items[i].unidentified ? "unidentified "+Player.inventory.items[i].type : Player.inventory.items[i].name.toLowerCase())+"</strong> for <strong>"+Player.inventory.items[i].sellPrice+" "+Items.currency[Player.inventory.items[i].sellCurrency].name.toLowerCase()+"</strong>? You cannot buy it back!", 1);
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
			document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].onmouseover = function(){
				Dom.inventory.displayInformation(Player.inventory.items[i], undefined, "buyer");
			}
			document.getElementById("buyerPageInventory").getElementsByTagName("td")[i].onmouseleave = function(){
				Dom.expand("information");
			}
		}
	}
}

Dom.choose.page = function(npc, buttons, functions, parameters){
	let name = npc.name !== undefined ? npc.name : npc; // for cases like Goblin Torch
	if(Dom.currentlyDisplayed === ""){
		Dom.currentlyDisplayed = name;
		if(buttons.length > 1){
			Dom.changeBook("choosePage", true/*false*/, true);
			document.getElementById("choosePage").innerHTML = "<h1>"+name+"</h1>"+(npc.chat !== undefined ? "<p>"+npc.chat.chooseChat+"</p>" : "");
			for(let i = 0; i < buttons.length; i++){
				let imagenum = 2;
				if(functions[i] === Dom.buyer.page){
					imagenum = 3;
				}else if(functions[i] === Dom.merchant.page){
					imagenum = 4;
				}else if(functions[i] === Dom.quest.finish){
					imagenum = 5;
				}else if(functions[i] === Dom.quest.start){
					if(parameters[i][0].repeatTime === "daily"){
						imagenum = 0;
					}else{
						imagenum = 6;
					}
				}else if(functions[i] === Dom.text.page){
					if(parameters[i][1] === "Soul Healer"){
						imagenum = 7;
					}else{
						imagenum = 1;
					}
				}
				document.getElementById("choosePage").innerHTML += "<p id='choosePageButtons"+i+"'><img src='assets/icons/choose.png' class='chooseIcon' style='clip: rect("+25*imagenum+"px, 25px, "+25*(imagenum+1)+"px, 0px); margin-top: -"+(25*imagenum+3)+"px'></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+buttons[i]+"</p>";
			}
			document.getElementById("choosePage").innerHTML += '<br><br><center><div id="choosePageClose" class="closeClass" onclick="Dom.changeBook(Player.tab, true)">Close</div></center>';
			for(let i = 0; i < buttons.length; i++){
				document.getElementById("choosePageButtons"+i).onclick = function(){
					functions[i](...parameters[i]);
				}
			}
		}else{
			functions[0](...parameters[0]);
		}
	}else{
		if(npc === "Instructions"){
			Dom.adventure.awaitingInstructions.push(parameters[0][0]);
		}else if(Dom.currentlyDisplayed !== name && (npc.roles === undefined || npc.roles.find(role => role.quest ==/*==*/ Dom.currentlyDisplayed) === undefined)){
			if(document.getElementsByClassName("closeClass")[0].style.border !== "5px solid red" && !Dom.choose.override) {
				//Dom.changeBook("identifierPage", false);
				Dom.choose.override = true; // overrides future updates
				for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){
					document.getElementsByClassName("closeClass")[i].style.border = "5px solid red";
				}
				document.getElementById("levelUpPageClose").style.border = "5px solid red";
				setTimeout(function(){
					for(let i = 0; i < document.getElementsByClassName("closeClass").length; i++){
						document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622";
					}
					document.getElementById("levelUpPageClose").style.border = "5px solid #886622";
					Dom.choose.override = false; // allows future updates
				},200);
			}
		}
	}
}

function random (minimum, maximum) {
    return Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);
}

// get date in format ddmmyyyy
function getFullDate () {
	let d = new Date();
	let dateString = "";
	// day
	let mem = d.getDate();
	if (mem.length !== 2) {
		mem = "0" + mem;
	}
	dateString += mem;
	// month
	mem = d.getMonth()+1;
	if (mem.length !== 2) {
		mem = "0" + mem;
	}
	dateString += mem;
	// year
	dateString += d.getFullYear();
	return dateString;
}

Dom.settings.bound = ["c","i","q","l","r","z"]; // hotkeys default from top to bottom
if(localStorage.getItem("hotkeys") !== null){
	Dom.settings.bound = JSON.parse(localStorage.getItem("hotkeys"));
}
window.addEventListener('keyup', function(ev){
	// if a hotkey is being set
	if(Dom.settings.hotkey !== undefined){
		let availible = true;
		for(let i = 0; i < Dom.settings.bound.length; i++){
			if(Dom.settings.bound[i] === ev.key && i !== Dom.settings.hotkey){
				// if that key is already a hot key
				availible = false;
			}
		}
		// if that key is available (not equal to shift, space, wasd, arrows)
		if(availible && ev.keyCode !== 65 && ev.keyCode !== 83 && ev.keyCode !== 68 && ev.keyCode !== 87 && ev.keyCode !== 16 && ev.keyCode !== 32 && ev.keyCode !== 37 && ev.keyCode !== 38 && ev.keyCode !== 39 && ev.keyCode !== 40 && ev.keyCode !== 255 && ev.keyCode !== 173 && ev.keyCode !== 174 && ev.keyCode !== 175 && ev.keyCode !== 176 && ev.keyCode !== 177 && ev.keyCode !== 179 && ev.keyCode !== 44){
			Dom.settings.bound[Dom.settings.hotkey] = ev.key;
			document.getElementsByClassName("hotkey")[Dom.settings.hotkey].innerHTML = ev.key.toUpperCase();
			Dom.settings.hotkey = undefined;
			SaveItem("hotkeys", JSON.stringify(Dom.settings.bound));
		// if it is unavailable set it back to what it was
		}else{
			document.getElementsByClassName("hotkey")[Dom.settings.hotkey].innerHTML = Dom.settings.bound[Dom.settings.hotkey].toUpperCase();
			Dom.settings.hotkey = undefined;
		}
	}else if(ev.key === Dom.settings.bound[0]){
		Dom.changeBook("chatPage");
	}else if(ev.key === Dom.settings.bound[1]){
		Dom.changeBook("inventoryPage");
	}else if(ev.key === Dom.settings.bound[2]){
		Dom.changeBook("questsPage");
	}else if(ev.key === Dom.settings.bound[3]){
		Dom.changeBook("adventurePage");
	}else if(ev.key === Dom.settings.bound[4]){
		Dom.changeBook("reputationPage");
	}else if(ev.key === Dom.settings.bound[5]){
		Dom.changeBook("settingsPage");
	}
});

Dom.settings.current = "settingsPage";
Dom.settings.page = function(page){
	if(page !== undefined){
		// change to a specific settings page
		Dom.settings.current = page
		Dom.changeBook(page, undefined, true);
	}else{
		// change to the last settings page that was open
		Dom.changeBook(Dom.settings.current, undefined, true);
	}
}

Dom.adventure.currentInstruction = 0;
Dom.adventure.awaitingInstructions = [];
Dom.adventure.openedInstructions = false; // instructions were opened through the book

Dom.adventure.addInstruction = function(chapter){
	if(Player.unlockedInstructions.length === chapter-1){
		Player.unlockedInstructions.push(Instructions[chapter-1].chapterTitle);
		if(!document.getElementById("tutorialOn").checked){
			Dom.choose.page("Instructions", [Instructions[chapter-1].chapterTitle], [Dom.adventure.showInstructions], [[chapter-1]]);
		}
	}
	if(Player.unlockedInstructions.length >= Instructions.length){
		document.getElementById("settingTutorialHolder").hidden = true;
	}
}

document.getElementById("tutorialOn").onclick = function(){
	Player.unlockedTabs.push("chat");
	document.getElementById("changeChat").style.display = "block";
	document.getElementById("chatImage").hidden = false;
	Player.unlockedTabs.push("inventory");
	document.getElementById("changeInventory").style.display = "block";
	document.getElementById("inventoryImage").hidden = false;
	Player.unlockedTabs.push("quests");
	document.getElementById("changeQuests").style.display = "block";
	document.getElementById("questsImage").hidden = false;
	Player.unlockedTabs.push("reputation");
	document.getElementById("changeReputation").style.display = "block";
	document.getElementById("reputationImage").hidden = false;
	Player.skipTutorial = true;
}

Dom.adventure.nextInstruction = function(){
	Dom.adventure.currentInstruction++;
	Dom.text.page("", Instructions[Dom.adventure.awaitingInstructions[0]].pages[Dom.adventure.currentInstruction].title, "<p>"+(Dom.adventure.currentInstruction > 0 ? "<span onclick='Dom.adventure.previousInstruction()' class='instructionArrowLeft'>&#8678;</span>" : "")+"Page "+(Dom.adventure.currentInstruction+1)+" of "+Instructions[Dom.adventure.awaitingInstructions[0]].pages.length+(Dom.adventure.currentInstruction < Instructions[Dom.adventure.awaitingInstructions[0]].pages.length-1 ? "<span onclick='Dom.adventure.nextInstruction()' class='instructionArrowRight'>&#8680;</span>" : "")+"</p>"+Instructions[Dom.adventure.awaitingInstructions[0]].pages[Dom.adventure.currentInstruction].text, false, [Dom.adventure.currentInstruction === Instructions[Dom.adventure.awaitingInstructions[0]].pages.length-1 ? "Close" : undefined], [Dom.adventure.instructionIndex]);
}

Dom.adventure.previousInstruction = function(){
	Dom.adventure.currentInstruction--;
	Dom.text.page("", Instructions[Dom.adventure.awaitingInstructions[0]].pages[Dom.adventure.currentInstruction].title, "<p>"+(Dom.adventure.currentInstruction > 0 ? "<span onclick='Dom.adventure.previousInstruction()' class='instructionArrowLeft'>&#8678;</span>" : "")+"Page "+(Dom.adventure.currentInstruction+1)+" of "+Instructions[Dom.adventure.awaitingInstructions[0]].pages.length+(Dom.adventure.currentInstruction < Instructions[Dom.adventure.awaitingInstructions[0]].pages.length-1 ? "<span onclick='Dom.adventure.nextInstruction()' class='instructionArrowRight'>&#8680;</span>" : "")+"</p>"+Instructions[Dom.adventure.awaitingInstructions[0]].pages[Dom.adventure.currentInstruction].text, false, [Dom.adventure.currentInstruction === Instructions[Dom.adventure.awaitingInstructions[0]].pages.length-1 ? "Close" : undefined], [Dom.adventure.instructionIndex]);
}

if(localStorage.getItem("instructions") === "true"){
	// link to instructions shows as purple
	document.getElementById("instructionsTitle").style.color = "#551a8b";
}

Dom.adventure.showInstructions = function(chapter, reverse){
	Dom.currentlyDisplayed = "";
	if(reverse){
		Dom.adventure.awaitingInstructions.unshift(chapter);
	}else{
		Dom.adventure.awaitingInstructions.push(chapter);
	}
	Dom.adventure.currentInstruction = 0;
	Dom.text.page("", Instructions[Dom.adventure.awaitingInstructions[0]].pages[Dom.adventure.currentInstruction].title, "<p>"+(Dom.adventure.currentInstruction > 0 ? "<span onclick='Dom.adventure.previousInstruction()' class='instructionArrowLeft'>&#8678;</span>" : "")+"Page "+(Dom.adventure.currentInstruction+1)+" of "+Instructions[Dom.adventure.awaitingInstructions[0]].pages.length+(Dom.adventure.currentInstruction < Instructions[Dom.adventure.awaitingInstructions[0]].pages.length-1 ? "<span onclick='Dom.adventure.nextInstruction()' class='instructionArrowRight'>&#8680;</span>" : "")+"</p>"+Instructions[Dom.adventure.awaitingInstructions[0]].pages[Dom.adventure.currentInstruction].text, false, [Dom.adventure.currentInstruction === Instructions[Dom.adventure.awaitingInstructions[0]].pages.length-1 ? "Close" : undefined], [Dom.adventure.instructionIndex]);
}

Dom.adventure.instructionIndex = function(){
	// remove the instruction you just closed
	Dom.adventure.awaitingInstructions.shift();
	// if there are more instructions to show
	if(Dom.adventure.awaitingInstructions.length > 0){
		// show the next instruction
		Dom.adventure.showInstructions(Dom.adventure.awaitingInstructions[0], true);
		// remove the duplicate of the next instruction
		Dom.adventure.awaitingInstructions.shift();
	// if there are no instructions waiting to be displayed and you are in the instruction book
	}else if(Player.unlockedInstructions.length > 1 && Dom.adventure.openedInstructions){
		Dom.choose.page("Instructions", Player.unlockedInstructions, [Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,], [[0],[1],[2],[3],[4],]);
	}else{
		Dom.changeBook(Player.tab, true);
	}
}

document.getElementById("instructions").onclick = function(){
	// link to instruction saves as purple
	SaveItem("instructions", true);
	// link to instructions shows as purple
	document.getElementById("instructionsTitle").style.color = "#551a8b";
	Dom.adventure.openedInstructions = true; // instructions were opened through the book
	Dom.choose.page("Instructions", Player.unlockedInstructions, [Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,], [[0],[1],[2],[3],[4],]);
}

function SaveItem(name, value){
	if(localStorage.getItem("accept") === "true"){
		localStorage.setItem(name, value);
	}
}

if(localStorage.getItem("coords") === "true"){
	document.getElementById("coordsOn").checked = true;
}
if(localStorage.getItem("fps") === "true"){
	document.getElementById("fpsOn").checked = true;
}
if(localStorage.getItem("hitboxes") === "true"){
	document.getElementById("hitboxesOn").checked = true;
}
if(localStorage.getItem("grid") === "true"){
	document.getElementById("gridOn").checked = true;
}

//
// DO NOT ADD CODE BELOW THIS POINT
//

// LOADS A NEW CLASS
for(let i = 0; i < 5; i++){
	Player.inventory[Object.keys(Player.inventory)[i]] = {};
}
Dom.inventory.give(Items.currency[2],3);

// LOADS ALL EXISTING SAVEDATA
if(localStorage.getItem(Player.class) !== null){
	Player = JSON.parse(localStorage.getItem(Player.class));
	Player.name = playerName;
	Player.skin = playerSkin;
}else{
	Dom.choose.page("Instructions", Player.unlockedInstructions, [Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,Dom.adventure.showInstructions,], [[0],[1],[2],[3],[4],]);
}

// LOADS AN EXISTING CLASS
document.getElementById("itemInventory").innerHTML = "";
for(let i = 0; i < Player.inventory.items.length/6; i++){
	document.getElementById("itemInventory").innerHTML += "<tr>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayInformation(Player.inventory.items["+6*i+"])\" onmouseleave=\"Dom.expand('information')\" ondrag=\"Dom.expand('information')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayInformation(Player.inventory.items["+(6*i+1)+"])\" onmouseleave=\"Dom.expand('information')\" ondrag=\"Dom.expand('information')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayInformation(Player.inventory.items["+(6*i+2)+"])\" onmouseleave=\"Dom.expand('information')\" ondrag=\"Dom.expand('information')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayInformation(Player.inventory.items["+(6*i+3)+"])\" onmouseleave=\"Dom.expand('information')\" ondrag=\"Dom.expand('information')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayInformation(Player.inventory.items["+(6*i+4)+"])\" onmouseleave=\"Dom.expand('information')\" ondrag=\"Dom.expand('information')\" onclick=\"Game.inventoryUpdate()\"></td>\
		<td ondrop=\"Dom.inventory.drop(event);Game.inventoryUpdate(event)\" ondragover=\"Dom.inventory.allowDrop(event)\" onmouseover=\"Dom.inventory.displayInformation(Player.inventory.items["+(6*i+5)+"])\" onmouseleave=\"Dom.expand('information')\" ondrag=\"Dom.expand('information')\" onclick=\"Game.inventoryUpdate()\"></td>\
	</tr>"
}
for(let i = 0; i < Player.inventory.items.length; i++){
	if(Player.inventory.items[i].image !== undefined){
		if(Player.inventory.items[i].chooseStats !== undefined){
			Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick = Dom.inventory.chooseStats;
		}
		if(!Player.inventory.items[i].unidentified){
			Player.inventory.items[i].onClick = Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onClick;
			Player.inventory.items[i].onKill = Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onKill;
			Player.inventory.items[i].onAttack = Items[Player.inventory.items[i].type][Player.inventory.items[i].id].onAttack;
		}
		document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "<img src='"+Player.inventory.items[i].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,"+i+")' "+(Player.inventory.items[i].onClick !== undefined ? "onclick='Player.inventory.items["+i+"].onClick("+i+")'" : "")+"></img>";
		if(Player.inventory.items[i].stacked !== undefined && Player.inventory.items[i].stacked !== 1){
			document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML += "<div class='stackNum' id='stackNum"+i+"'>"+Player.inventory.items[i].stacked+"</div>";
		}
	}else{
		document.getElementById("itemInventory").getElementsByTagName("td")[i].innerHTML = "";
	}
}
document.getElementById("itemInventory").getElementsByTagName("td")[5].style.backgroundImage = "url('assets/items/bag/1.png')";
for(let i = 0; i < Object.keys(Player.inventory).length-1; i++){ // repeats for each equipment slot
	if(Player.inventory[Object.keys(Player.inventory)[i]].image !== undefined){
		if(Player.inventory[Object.keys(Player.inventory)[i]].chooseStats !== undefined){
			Items[Player.inventory[Object.keys(Player.inventory)[i]].type][Player.inventory[Object.keys(Player.inventory)[i]].id].onClick = Dom.inventory.chooseStats;
		}
		if(Player.inventory[Object.keys(Player.inventory)[i]].image !== undefined){
			Player.inventory[Object.keys(Player.inventory)[i]].onClick = Items[Player.inventory[Object.keys(Player.inventory)[i]].type][Player.inventory[Object.keys(Player.inventory)[i]].id].onClick;
			Player.inventory[Object.keys(Player.inventory)[i]].onKill = Items[Player.inventory[Object.keys(Player.inventory)[i]].type][Player.inventory[Object.keys(Player.inventory)[i]].id].onKill;
			Player.inventory[Object.keys(Player.inventory)[i]].onAttack = Items[Player.inventory[Object.keys(Player.inventory)[i]].type][Player.inventory[Object.keys(Player.inventory)[i]].id].onAttack;
			document.getElementById(Object.keys(Player.inventory)[i]).innerHTML = "<img src='"+Player.inventory[Object.keys(Player.inventory)[i]].image+"' draggable='true' ondragstart='Dom.inventory.drag(event,\""+Object.keys(Player.inventory)[i]+"\")' "+(Player.inventory[Object.keys(Player.inventory)[i]].onClick !== undefined ? "onclick='Player.inventory."+Object.keys(Player.inventory)[i]+".onClick(\""+Object.keys(Player.inventory)[i]+"\")'" : "")+"></img>"; // updates the image
		}
	}
}
if(Player.reputationReady){
	Dom.reputation.start();
}
for(let i = 0; i < document.getElementsByClassName("hotkey").length; i++){
	document.getElementsByClassName("hotkey")[i].innerHTML = Dom.settings.bound[i].toUpperCase();
	document.getElementsByClassName("hotkey")[i].onclick = function(){
		if(Dom.settings.hotkey === undefined){
			document.getElementsByClassName("hotkey")[i].innerHTML = "...";
			Dom.settings.hotkey = i;
		}else{
			let temp = Dom.settings.bound[Dom.settings.hotkey];
			document.getElementsByClassName("hotkey")[Dom.settings.hotkey].innerHTML = document.getElementsByClassName("hotkey")[i].innerHTML;
			document.getElementsByClassName("hotkey")[i].innerHTML = temp.toUpperCase();
			Dom.settings.bound[Dom.settings.hotkey] = Dom.settings.bound[i];
			Dom.settings.bound[i] = temp;
			Dom.settings.hotkey = undefined;
			SaveItem("hotkeys", JSON.stringify(Dom.settings.bound));
		}
	}
}
document.getElementById("level").innerHTML = "Level "+Player.level;
for(let i = 0; i < Player.unlockedTabs.length; i++){
	document.getElementById("change"+Player.unlockedTabs[i][0].toUpperCase()+Player.unlockedTabs[i].slice(1)).style.display = "block";
	document.getElementById(Player.unlockedTabs[i]+"Image").hidden = false;
}
if(Player.unlockedInstructions.length >= Instructions.length){
	document.getElementById("settingTutorialHolder").hidden = true;
}
if(Player.skipTutorial){
	document.getElementById("tutorialOn").checked = true;
}
for(let i = 0; i < Player.statusEffects.length; i++){
	if(Player.statusEffects[i].title === "HIGH SPEED! (test status effect)"){
		document.getElementById("speedOn").checked = true;
	}
}

// TESTING
Dom.testing = {};
Dom.testing.completeQuest = function(quest){
	Dom.currentlyDisplayed = quest;
	Dom.quest.finish(quest);
	Game.getXP(Dom.currentlyDisplayed.rewards.xp);
	Dom.quest.acceptRewards();
	return quest.quest
}