var Dom = { // DOM function arrays
	elements: { // pages
		chatPage: document.getElementById("chatPage"), // shortens references to the chatPage to "chatPage"
		inventoryPage: document.getElementById("inventoryPage"), // shortens references to the inventoryPage to "inventoryPage"
		questsPage: document.getElementById("questsPage"), // shortens references to the questsPage to "questsPage"
		settingsPage: document.getElementById("settingsPage"), // shortens references to the settingsPage to "settingsPage"
		instructionsPage: document.getElementById("instructionsPage"), // shortens references to the instructionsPage to "instructionsPage"
		reputationPage: document.getElementById("reputationPage"), // shortens references to the reputationPage to "reputationPage"
		questStart: document.getElementById("questStart"), // shortens references to the questStart to "questStart"
		questFinish: document.getElementById("questFinish"), // shortens references to the questFinish to "questFinish"
		merchantPage: document.getElementById("merchantPage"), // shortens references to the merchantPage to "merchantPage"
		identifierPage: document.getElementById("identifierPage"), // shortens references to the identifierPage to "identifierPage"
		identifiedPage: document.getElementById("identifiedPage"), // shortens references to the identifiedPage to "identifiedPage"
	},
	chat: {}, // variables to do with the chat are defined as Dom.chat.varName
	inventory: {}, // variables to do with inventory are defined as Dom.inventory.varName
	quests: {}, // variables to do with quests are defined as Dom.quests.varName
	instructions: {}, // variables to do with instructions are defined as Dom.instructions.varName
	reputation: {}, // variables to do with reputation are defined as Dom.reputation.varName
	settings: {}, // variables to do with settings are defined as Dom.settings.varName
	quest: {}, // variables to do with quest are defined as Dom.quest.varName
	merchant: {}, // variables to do with merchant are defined as Dom.merchant.varName
	identifier: {}, // variables to do with identifier are defined as Dom.identifier.varName
};
Dom.previous = "instructionsPage"; // change currently displayed page
Dom.changeBook = function(page, override, x) { // changes the page or changes the color of close buttons
	//override says if the function should be run regardless of if the player has a quest active (e.g: declining a quest or closing a merchant)
	if(this.currentlyDisplayed == "" || override) { // check the player doesn't have a quest active
		// hide all pages
		if(page != "questStart" && page != "questFinish" && page != "merchantPage" && page != "identifierPage" && page != "identifiedPage"){ // if the page being changed to is a not a pop up...
			Dom.previous = page; // ... it will open it next time you close a pop up
		}
		this.elements.chatPage.hidden = true; // hides the chat
		this.elements.inventoryPage.hidden = true; // hides the inventory
		this.elements.questsPage.hidden = true; // hides the quest log
		this.elements.settingsPage.hidden = true; // hides the settings
		this.elements.instructionsPage.hidden = true; // hides the instructions
		this.elements.reputationPage.hidden = true; // hides the reputation
		this.elements.questStart.hidden = true; // hides the questStart pop up
		this.elements.questFinish.hidden = true; // hides the questFinish pop up
		this.elements.merchantPage.hidden = true; // hides the merchant pop up
		this.elements.identifierPage.hidden = true; // hides the identifier pop up
		this.elements.identifiedPage.hidden = true; // hides the identified item pop up
		document.getElementById(page).hidden = false; // displays the page you are opening
		if(page == "chatPage"){ // if the chat is being opened
			if(Dom.chat.newString == ""){ // if there is no new chat
				chatPage.innerHTML = "<br>" + Dom.chat.oldString; // display the old chat
			}
			document.getElementById("dot").hidden = true; // remove notifications
			document.getElementById("dot").innerHTML = 0; // set notification number to 0
			Dom.chat.oldString = Dom.chat.newString + Dom.chat.oldString; // add the new chat to the old chat
			Dom.chat.newString = ""; // set the new chat to nothing
		}
		if(page == "reputationPage"){ // if the reputation is being opened
			Dom.reputation.update(); // update the reputation (not sure why it is necessary)
		}
		if(override) { // if the a pop up is being closed
			for(var i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
				document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622"; // set close button border color to normal
			}
			this.currentlyDisplayed = ""; // reset current display if it is overriden
			Dom.quests.activeQuests(undefined); // update the active quests box
		}
		return true; // returns true if the page was changed
	}
	else { // if the page cannot be changed
		for(var i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
			document.getElementsByClassName("closeClass")[i].style.border = "5px solid red"; // set close button border color to red
		}
		if(x != 0 && x != 1){ // if x = "undefined"
			Dom.override = true; // overrides future updates
			setTimeout(function(){ // waits 200
				for(var i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
					document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622"; // set close button border color back to normal
					Dom.override = false; // allows future updates
				}
			},200); // waits 0.2 seconds
		} else if(x == 1){ // // if x = 1
			for(var i = 0; i < document.getElementsByClassName("closeClass").length; i++){ // repeat for all close buttons
				document.getElementsByClassName("closeClass")[i].style.border = "5px solid #886622"; // instantly set close button border color back to normal
			}
		}
		return false; // returns false if the page was not changed
	}
}
Dom.inventory.updateGold = function() { // update the DOM display of gold and xp
	for(var i = 0; i < document.getElementsByClassName("goldDisplay").length; i++) { // repeat for each gold display
		document.getElementsByClassName("goldDisplay")[i].innerText = Player.gold; // set the number displayed to the amount of gold
	}
	for(var i = 0; i < document.getElementsByClassName("xpDisplay").length; i++) { // repeat for each xp display
		document.getElementsByClassName("xpDisplay")[i].innerText = Player.xp; // set the number displayed to the amount of xp
	}
}
Dom.inventory.updateGold(); // calls the function to update the gold display
Dom.inventory.changeEquipment = function(array,equipmentType) { // change which item is shown in inventory
	array.push(array[0]); // adds the first element of the array to the end of the array
	array.splice(0, 1); // removes the first element of the array
	document.getElementById(equipmentType).style.backgroundImage = "url(" + array[0].image + ")"; // sets the image of to the the item's image
	if(equipmentType == "helm"){ // if the equipment being changed is a helm...
		Player.inventory.helm = array; // ...updates the helm array...
		this.displayInformation("30px",Player.inventory.helm); // ... and displays the information for your helm
	}else if(equipmentType == "chest"){ // if the equipment being changed is a chest...
		Player.inventory.chest = array; // ...updates the chest array...
		this.displayInformation("100px",Player.inventory.chest); // ...and displays the information for your chest
	}else if(equipmentType == "greaves"){ // if the equipment being chaged are greaves...
		Player.inventory.greaves = array; // ...updates the greaves array...
		this.displayInformation("170px",Player.inventory.greaves); // ...and displays the information for your greaves
	}else if(equipmentType == "boots"){ // if the equipment being changed are boots...
		Player.inventory.boots = array; // ...updates the boots array...
		this.displayInformation("240px",Player.inventory.boots); // ...and displays the information for your boots
	}else{ // if the equipment being changed is a weapon...
		Player.inventory.weapon = array; // ...updates the weapon array...
		this.displayInformation("325px",Player.inventory.weapon); // ...and displays the information for your weapon
	}
}
Dom.inventory.stats = function(){ // updates the stats displayed in your inventory
	document.getElementById("statInfo").innerHTML = "<strong>Damage: <br>Defence: <br>Critical Chance: <br>Focus Speed: <br>Health Regen: <br>Looting: <br>Poison: <br>Reflection: <br>Walk Speed: </strong>"; // sets the stats in your inventory
}
Dom.inventory.stats(); // calls the function to display stats in your inventory
Dom.chat.newString = ""; // sets the new chat to nothing
Dom.chat.oldString = ""; // sets the old chat to nothing
Dom.chat.length = 0; // sets the chat length to 0
Dom.chat.contents = []; // sets the chat contents to 0
document.getElementById("dot").innerHTML = 0; // sets the notification number to 0
Dom.chat.insert = function(text, delay) { // // insert text in chat page
	if(Dom.chat.length == 10) { // if chat is too big
			Dom.chat.purge(); // purge it
		}
	if(chatPage.hidden){ // if the chat is hidden
		if(document.getElementById("dot").innerHTML != "<b>...</b>"){ // if there are less than 100 notifications
			document.getElementById("dot").hidden = false; // display the notifications
			document.getElementById("dot").innerHTML = parseInt(document.getElementById("dot").innerHTML) + 1; // add 1 to the notification number
			if(parseInt(document.getElementById("dot").innerHTML) > 99){ // if there are 100 notifications
				document.getElementById("dot").innerHTML = "<b>...</b>"; // set the notification number to "..."
				document.getElementById("dot").style.lineHeight = "7.5px"; // move the "..." to the centre
			}
		}
	}
	Dom.chat.contents.push(text); // add the text to the array of chat contents
	setTimeout(function() { // wait for the amount of time specified in the parameter
		Dom.chat.newString = text + "<br><br>" + Dom.chat.newString; // adds the text to the new chat
		chatPage.innerHTML = "<br>" + Dom.chat.newString; // sets the chat to the new chat
		if(Dom.chat.oldString != 0){chatPage.innerHTML += '-------------------- <b>New Messages</b> --------------------';} // if there is old chat write "New Messages"
		chatPage.innerHTML += "</p>" + Dom.chat.oldString; // write old chat under new messages
		if(!chatPage.hidden){ // if the chat is displayed...
			Dom.changeBook("chatPage",true); // ...update the chat
		}
		Dom.chat.length++; // adds 1 to the length of the chat
	}, delay); // sets the delay to the amount specified in the parameter
}
Dom.chat.purge = function() { // delete all chat
	Dom.chat.oldString = ""; // sets the old chat to nothing
	Dom.chat.newString = "Chat cleared to free up memory"; // warns the user that the chat was reset
	Dom.chat.length = 1; // sets the chat length to 1
	Dom.chat.contents = []; // sets the chat contents to nothing
}
Dom.expand = function(block) { // expand/collapse element
	block = document.getElementById(block); // sets block to the element: block
	if(block.hidden) { // if the element is hidden...
		block.hidden = false; // ...display it
	}
	else { // if the element is displayed...
		block.hidden = true; // ...hide it
	}
	if(block == activeQuestBox && Dom.quests.activeQuestArray.length == 0){ // if the player has no active quests... (possibly inefficient? doesn't need to check every time it's opened)
		document.getElementById("activeQuestBox").style.textAlign = "center"; // ...the text in the active quest box is written in the centre...
		document.getElementById("activeQuestBox").innerText = "You have no active quests"; // ... and it says "you have no active quests"
	}else if(block == completedQuestBox && Dom.quests.completedQuestArray.length == 0){ // if the player has no completed quests...
		document.getElementById("completedQuestBox").style.textAlign = "center"; // ...the text in the completed quest box is written in the centre... 
		document.getElementById("completedQuestBox").innerText = "You have no completed quests"; // ...and it says "you have no completed quests"
	}else if(block == itemInformation){ // if the block is the itemInformation...
		block.hidden = true; //...hide it
	}
}
Dom.settings.bookmarkPosition = function() { // arrange position of bookmarks
	// INEFFICIENT?
	if(document.getElementById("bottom").checked) { // arrange bookmarks at bottom of screen
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
if(window.innerHeight >= 755) { // if the window height is big enough...
	document.getElementById("bottom").checked = true; // ...set the bookmark position to the bottom...
	Dom.settings.bookmarkPosition(); // ...then update the position
}
else if(window.innerWidth >= 1295) { // if the window height is too small but the width is big enough...
	document.getElementById("right").checked = true; // ...set the bookmark position to the right...
	Dom.settings.bookmarkPosition(); // ...then update the position
}
else { // if the window size is too small...
	alert("Your window size is too small. Please zoom out!"); // ...alert the user that their window is too small...
	console.warn("Your window size is too small. Please zoom out!"); // ...warn the user that their window is too small...
	document.getElementById("bottom").checked = true; // ...set the bookmark position to bottom...
	Dom.settings.bookmarkPosition(); // ...then update the position
}
Dom.reputation.levels = ["Hated","Unfriendly","Neutral","Friendly","Honoured"]; // possible reputation levels
for(var i = 0; i < Object.keys(Player.reputation).length; i++){ // repeat for all reputations
	Player.reputation[Object.keys(Player.reputation)[i]].score = 5; // reputation score (between levels)
	Player.reputation[Object.keys(Player.reputation)[i]].level = 2; // reputation level
}
Dom.reputation.update = function(){ // update reputation
	for(var i = 0; i < Object.keys(Player.reputation).length; i++){ // repeat for all reputations
		if(Player.reputation[Object.keys(Player.reputation)[i]].score > 10) { // if the reputation is above 10...
			this.upLevel(Player.reputation[Object.keys(Player.reputation)[i]]); // ...increase the reputation level
		}
		else if(Player.reputation[Object.keys(Player.reputation)[i]].score < 0) { // if the reputation is below 0...
			this.downLevel(Player.reputation[Object.keys(Player.reputation)[i]]); // ...decrease the reputation level
		}
		else { // if the reputation is between 0 and 10
			document.getElementById("reputationBar").innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level]; // writes the level in the repuatation bar
			document.getElementById("widthPadding").innerHTML = this.levels[Player.reputation[Object.keys(Player.reputation)[i]].level]; // gets the width of the text
			if(Player.reputation[Object.keys(Player.reputation)[i]].level >=2) { // if the reputation is neutral or above
				document.getElementById("reputationBar").style.textIndent = ((250-document.getElementById("widthPadding").clientWidth)/2) + "px"; // writes the text in the centre
				document.getElementById("reputationBar").style.width = Player.reputation[Object.keys(Player.reputation)[i]].score*25+"px"; // sets the width of the bar
				document.getElementById("reputationBar").style.left = "0px"; // sets the bar to start on the left
			}
			else { // if the reputation is negative
				document.getElementById("reputationBar").style.textIndent = ((250-document.getElementById("widthPadding").clientWidth)/2)-Player.reputation[Object.keys(Player.reputation)[i]].score*25+ "px"; // writes the text in the centre
				document.getElementById("reputationBar").style.width = (10-Player.reputation[Object.keys(Player.reputation)[i]].score)*25+"px"; // sets the width of the bar
				document.getElementById("reputationBar").style.left = Player.reputation[Object.keys(Player.reputation)[i]].score*25+"px"; // sets the bar to start on the right
			}
		}
	}
}
Dom.reputation.upLevel = function(Area){ // increases the reputation level
	Area.score -= 11; // resets the score to 0 + the remainder
	Area.level++; // increases the reputation level
	if(Area.level > 2) { // if the reputation is positive...
		document.getElementById("reputationBar").style.backgroundColor = "green"; // ...sets the color to green
	}
	else if(Area.level < 2) { // if the reputation is negative...
		document.getElementById("reputationBar").style.backgroundColor = "red"; // ...sets the color to red
	}
	else { // if the reputation is neutral...
		document.getElementById("reputationBar").style.backgroundColor = "gold"; // ...sets the color to yellow
	}
	this.update(); // updates the reputation
}
Dom.reputation.downLevel = function(Area){ // decreases the reputation level
	Area.score += 11; // resets the score to 10 - the remainder
	Area.level--; // decreases the reputation level
	if(Area.level < 2){ // if the reputation is negative...
		document.getElementById("reputationBar").style.backgroundColor = "red"; // ...sets the color to red
	}else if(Area.level > 2){ // if the reputation is positive...
		document.getElementById("reputationBar").style.backgroundColor = "green"; // ...sets the color to green
	}else{ // if the reputation is neutral...
		document.getElementById("reputationBar").style.backgroundColor = "gold"; // ...sets the color to yellow
	}
	this.update(); // updates the reputation
}
Dom.inventory.displayInformation = function(y,array){ // display inventory information
	document.getElementById("itemInformation").hidden = true; // hide item information
	if(array[0].name != ""){ // if the user is hovering over an item...
		document.getElementById("itemInformation").hidden = false; // ...display information
		document.getElementById("itemInformation").style.top = y; // sets information's top value to the value specified in the parameter
		document.getElementById("itemInformation").innerHTML = "<div class='triangleLeft'></div><div id='triangle' class='innerTriangleLeft'></div><p id='name'><b>"+array[0].name+"</b></p><p id='stats'></p><p id='lore'></p>"; // construct the information without the values
		if(array[0].rarity == "common"){ // if the item is a common...
			document.getElementById("name").style.color = "black"; // ...sets the name color to black
		}else if(array[0].rarity == "unique"){ // if the item is a unique...
			document.getElementById("name").style.color = "orange"; // ...sets the name color to orange
		}else{ // if the item is a mythic...
			document.getElementById("name").style.color = "purple"; // ...sets the name color to purple
		}
		document.getElementById("stats").innerHTML = "Tier: "+array[0].tier; // add the tier to the information
		for(var i = 0; i < Object.keys(array[0].stats).length; i++){ // repeat for all stats
			var replaceStat = Object.keys(array[0].stats)[i].replace("_"," "); // replace any underscores with spaces
			document.getElementById("stats").innerHTML += "<br>"+replaceStat+": "+array[0].stats[Object.keys(array[0].stats)[i]]; // add the stats to the information
		}
		if(array[0].lore != undefined){ // if the item has a lore...
			document.getElementById("lore").innerHTML += "<i>"+array[0].lore+"</i>"; // ...add the lore to the information
		}
		document.getElementById("triangle").style.bottom = document.getElementById("itemInformation").offsetHeight - 50 + "px"; // position the triangle in the correct place
	}
}
Dom.merchant.displayInformation = function(y,array,num) { // display merchant information
	document.getElementById("informationMerchant").hidden = false; // hide merchant information
	document.getElementById("informationMerchant").style.top = y+"px"; // sets the information's top value to the value specified in the parameter
	document.getElementById("informationMerchant").innerHTML = "<div class='triangleLeft'></div><div id='merchantTriangle' class='innerTriangleLeft'></div><p id='merchantName'><b>"+array[num].name+"</b></p><p id='merchantStats'></p><p id='merchantLore'></p>"; // construct the information without the values
	if(array[num].rarity == "common"){ // if the item is a common...
		document.getElementById("merchantName").style.color = "black"; // ...sets the name color to black
	}else if(array[num].rarity == "unique"){ // if the item is a unique...
		document.getElementById("merchantName").style.color = "orange"; // ...sets the name color to orange
	}else{ // if the item is a mythic...
		document.getElementById("merchantName").style.color = "purple"; // ...sets the name color to purple
	}
	document.getElementById("merchantStats").innerHTML = "Tier: "+array[num].tier; // add the tier to the information
	for(var i = 0; i < Object.keys(array[num].stats).length; i++){ // repeat for all stats
		var replaceStat = Object.keys(array[num].stats)[i].replace("_"," "); // replace any underscores with spaces
		document.getElementById("merchantStats").innerHTML += "<br>"+replaceStat+": "+array[num].stats[Object.keys(array[num].stats)[i]]; // add the stats to the information
	}
	if(array[num].lore != undefined){ // if the item has a lore...
		document.getElementById("merchantLore").innerHTML += "<i>"+array[num].lore+"</i>"; // ...add the lore to the information
	}
	document.getElementById("merchantTriangle").style.bottom = document.getElementById("informationMerchant").offsetHeight - 50 + "px"; // postition the triangle in the correct place
}
Dom.quests.displayInformation = function(num,array,total){ // display quest start information
	document.getElementById("questInformation").hidden = false; // hide quest start information
	document.getElementById("questInformation").style.top = document.getElementById("questStartGold").getBoundingClientRect().top+"px"; // sets the information's top value to the top value of the gold and xp
	document.getElementById("questInformation").style.left = 780-(total*35)+(num*70) +"px"; // sets the information's left value based on information from the parameter
	document.getElementById("questInformation").innerHTML = "<div class='rectangleRightUp' id='questRectangle'></div><div class='rectangleRightDown'></div><div class='triangleRight'></div><div id='questTriangle' class='innerTriangleRight'></div><p id='questName'><b>"+array[num].name+"</b></p><p id='questStats'></p><p id='questLore'></p>"; // construct the information without the values
	if(array[num].rarity == "common"){ // if the item is a common...
		document.getElementById("questName").style.color = "black"; // ...sets the name color to black
	}else if(array[num].rarity == "unique"){ // if the item is a unique...
		document.getElementById("questName").style.color = "orange"; // ...sets the name color to orange
	}else{ // if the item is a mythic...
		document.getElementById("questName").style.color = "purple"; // ...sets the name color to purple
	}
	document.getElementById("questStats").innerHTML = "Tier: "+array[num].tier; // add the tier to the information
	for(var i = 0; i < Object.keys(array[num].stats).length; i++){ // reapeat for all stats
		var replaceStat = Object.keys(array[num].stats)[i].replace("_"," "); // replace any underscores with spaces
		document.getElementById("questStats").innerHTML += "<br>"+replaceStat+": "+array[num].stats[Object.keys(array[num].stats)[i]]; // add the stats to the information
	}
	if(array[num].lore != undefined){ // if the item has a lore...
		document.getElementById("questLore").innerHTML += "<i>"+array[num].lore+"</i>"; // ...add the lore to the information
	}
	document.getElementById("questTriangle").style.bottom = document.getElementById("questInformation").offsetHeight - 50 + "px"; // position the triangle in the correct place
	document.getElementById("questRectangle").style.bottom = document.getElementById("questInformation").offsetHeight - 50 + "px"; // position the rectangle in the correct place
}
Dom.quests.displayFinishInformation = function(num,array,total){ // display quest finish information
	document.getElementById("questFinishInformation").hidden = false; // hide quest start information
	document.getElementById("questFinishInformation").style.top = document.getElementById("questFinishGold").getBoundingClientRect().top+"px"; // sets the information's top value to the top value of the gold and xp
	document.getElementById("questFinishInformation").style.left = 780-(total*35)+(num*70) +"px"; // sets the information's left value based on the information from the parameter
	document.getElementById("questFinishInformation").innerHTML = "<div class='rectangleRightUp' id='finishRectangle'></div><div class='rectangleRightDown'></div><div class='triangleRight'></div><div id='finishTriangle' class='innerTriangleRight'></div><p id='finishName'><b>"+array[num].name+"</b></p><p id='finishStats'></p><p id='finishLore'></p>"; // construct the information without the values
	if(array[num].rarity == "common"){ // if the item is a common...
		document.getElementById("finishName").style.color = "black"; // ...sets the name color to black
	}else if(array[num].rarity == "unique"){ // if the item is a unique...
		document.getElementById("finishName").style.color = "orange"; // ...sets the name color to orange
	}else{ // if the item is a mythic...
		document.getElementById("finishName").style.color = "purple"; // ...sets the name color to purple
	}
	document.getElementById("finishStats").innerHTML = "Tier: "+array[num].tier;
	for(var i = 0; i < Object.keys(array[num].stats).length; i++){
		var replaceStat = Object.keys(array[num].stats)[i].replace("_"," ");
		document.getElementById("finishStats").innerHTML += "<br>"+replaceStat+": "+array[num].stats[Object.keys(array[num].stats)[i]];
	}
	if(array[num].lore != undefined){
		document.getElementById("finishLore").innerHTML += "<i>"+array[num].lore+"</i>";
	}
	document.getElementById("finishTriangle").style.bottom = document.getElementById("questFinishInformation").offsetHeight - 50 + "px";
	document.getElementById("finishRectangle").style.bottom = document.getElementById("questFinishInformation").offsetHeight - 50 + "px";
}

Dom.identifier.displayInformation = function(num,array){
	document.getElementById("identifierInformation").hidden = false;
	document.getElementById("identifierInformation").style.top = document.getElementById("identifierPageOption").getBoundingClientRect().top - 46 + "px";
	document.getElementById("identifierInformation").style.left = document.getElementById("identifierPageOption").getBoundingClientRect().left + 90 +"px";
	document.getElementById("identifierInformation").innerHTML = "<div class='rectangleLeftUp' id='identifierRectangle'></div><div class='rectangleLeftDown'></div><div class='triangleLeft'></div><div id='identifierTriangle' class='innerTriangleLeft'></div><p id='identifierName'><b> Unidentified "+array[num].type+"</b></p><p id='identifierStats'></p><p id='identifierLore'></p>";
	document.getElementById("identifierStats").innerHTML = "Tier: "+array[num].tier;
	document.getElementById("identifierLore").innerHTML += "Area: "+array[num].area;
	document.getElementById("identifierTriangle").style.bottom = document.getElementById("identifierInformation").offsetHeight - 50 + "px";
	document.getElementById("identifierRectangle").style.bottom = document.getElementById("identifierInformation").offsetHeight - 50 + "px";
}
Dom.identifier.displayIdentifiedInformation = function(num,array){
	document.getElementById("identifiedInformation").hidden = false;
	document.getElementById("identifiedInformation").style.top = document.getElementById("identifiedPageOption").getElementsByTagName("img")[0].getBoundingClientRect().top + "px";
	document.getElementById("identifiedInformation").style.left = document.getElementById("identifiedPageOption").getElementsByTagName("img")[0].getBoundingClientRect().left + 90 +"px";
	document.getElementById("identifiedInformation").innerHTML = "<div class='triangleLeft'></div><div id='identifiedTriangle' class='innerTriangleLeft'></div><p id='identifiedName'><b>" + array[num].name + "</b></p><p id='identifiedStats'></p><p id='identifiedLore'></p>";
	if(array[num].rarity == "common"){
		document.getElementById("identifiedName").style.color = "black";
	}else if(array[num].rarity == "unique"){
		document.getElementById("identifiedName").style.color = "orange";
	}else{
		document.getElementById("identifiedName").style.color = "purple";
	}
	document.getElementById("identifiedStats").innerHTML = "Tier: "+array[num].tier;
	for(var i = 0; i < Object.keys(array[num].stats).length; i++){
		var replaceStat = Object.keys(array[num].stats)[i].replace("_"," ");
		document.getElementById("identifiedStats").innerHTML += "<br>"+replaceStat+": "+array[num].stats[Object.keys(array[num].stats)[i]];
	}
	if(array[num].lore != undefined){
		document.getElementById("identifiedLore").innerHTML += "<i>"+array[num].lore+"</i>";
	}
	document.getElementById("identifiedTriangle").style.bottom = document.getElementById("identifiedInformation").offsetHeight - 50 + "px";
}
Dom.currentlyDisplayed = ""; // the currently displayed quest, merchant, etc. (something that can't be overridden)

// display quest start page
Dom.quest.start = function(quest) { // quest is passed in as parameter
	if(Dom.changeBook("questStart", false)) {
		document.getElementById("questStartQuest").innerHTML = quest.quest;
		document.getElementById("questStartName").innerHTML = quest.startName;
		document.getElementById("questStartChat").innerHTML = quest.startChat;
		document.getElementById("questStartObjectives").innerHTML = "";
		for(var i = 0; i < quest.objectives.length; i++){
			document.getElementById("questStartObjectives").innerHTML += quest.objectives[i] + "<br>";
		}
		if(quest.rewards.gold == 0){
			document.getElementById("questStartGold").style.display = "none";
			document.getElementById("goldClass").style.display = "none";
		}else{
			document.getElementById("questStartGold").innerHTML = quest.rewards.gold;
		}
		if(quest.rewards.xp == 0){
			document.getElementById("questStartXP").style.display = "none";
			document.getElementById("xpClass").style.display = "none";
		}else{
			document.getElementById("questStartXP").innerHTML = quest.rewards.xp;
		}
		document.getElementById("questStartItems").innerHTML = "";
		for(var i = 0; i < quest.rewards.items.length; i++){
			document.getElementById("questStartItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestOptions'></img>&nbsp;&nbsp;";
		}
		for(let x = 0; x < document.getElementsByClassName("theseQuestOptions").length; x++){
			document.getElementsByClassName("theseQuestOptions")[x].onmouseover = function() {
				Dom.quests.displayInformation(x, quest.rewards.items,document.getElementsByClassName("theseQuestOptions").length);
			};
			document.getElementsByClassName("theseQuestOptions")[x].onmouseleave = function() {
				Dom.expand("questInformation");
			}
		}
		Dom.currentlyDisplayed = quest;
	}
}

// display quest finish page
Dom.quest.finish = function(quest){
	Dom.changeBook("questFinish", false);
	document.getElementById("questFinishQuest").innerHTML = quest.quest;
	document.getElementById("questFinishName").innerHTML = quest.finishName;
	document.getElementById("questFinishChat").innerHTML = quest.finishChat;
	if(quest.rewards.gold == 0){
		document.getElementById("questFinishGold").style.display = "none";
		document.getElementById("goldClass").style.display = "none";
	}else{
		document.getElementById("questFinishGold").innerHTML = quest.rewards.gold;
	}
	if(quest.rewards.xp == 0){
		document.getElementById("questFinishXP").style.display = "none";
		document.getElementById("xpClass").style.display = "none";
	}else{
		document.getElementById("questFinishXP").innerHTML = quest.rewards.xp;
	}
	document.getElementById("questStartItems").innerHTML = "";
	for(var i = 0; i < quest.rewards.items.length; i++){
		document.getElementById("questFinishItems").innerHTML += "<img src=" + quest.rewards.items[i].image + " class='theseQuestOptions'></img>&nbsp;&nbsp;";
	}
	for(let x = 0; x < document.getElementsByClassName("theseQuestOptions").length; x++){
		document.getElementsByClassName("theseQuestOptions")[x].onmouseover = function() {
			Dom.quests.displayFinishInformation(x, quest.rewards.items,document.getElementsByClassName("theseQuestOptions").length);
		};
		document.getElementsByClassName("theseQuestOptions")[x].onmouseleave = function() {
			Dom.expand("questFinishInformation");
		}
	}
	Player.gold += parseInt(quest.rewards.gold);
	Player.xp += parseInt(quest.rewards.xp);
	Dom.inventory.updateGold();
	Dom.quest.give(quest.rewards.items[0]);
	Dom.currentlyDisplayed = quest;
	
	// reputation rewards
	if(quest.rewards.reputation != undefined) {
		for(var i = 0; i < Object.keys(quest.rewards.reputation).length; i++) {
			Player.reputation[Object.keys(quest.rewards.reputation)[i]].score += quest.rewards.reputation[Object.keys(quest.rewards.reputation)[i]];
		}
	}
	Dom.reputation.update();
}

// quest accepted
Dom.quest.accept = function(){
	Dom.quests.activeQuests(Dom.currentlyDisplayed);
	
	// check if there is a quest start function
	if (Dom.currentlyDisplayed.onQuestStart != undefined) {
		Dom.currentlyDisplayed.onQuestStart();
	}
	
	// switch off quest start screen (and to quest log)
	Dom.changeBook(Dom.previous, true); // also resets Dom.currentlyDisplayed
}

Dom.quest.acceptRewards = function(){
	for(var i = 0; i < Dom.quests.activeQuestArray.length; i++){
		if(Dom.quests.activeQuestArray[i] == Dom.currentlyDisplayed.quest){
			Dom.quests.activeQuestArray.splice(i,1);
			Dom.quests.activeQuestUseArray.splice(i,1);
		}
	}
	Dom.quests.completed(Dom.currentlyDisplayed);
	
	// check if there is a quest start function
	if (Dom.currentlyDisplayed.onQuestFinish != undefined) {
		Dom.currentlyDisplayed.onQuestFinish();
	}
	
	// switch off quest start screen (and to quest log)
	Dom.changeBook(Dom.previous, true); // also resets Dom.currentlyDisplayed
	Dom.quests.activeQuests(undefined);
}

Dom.quests.activeQuestArray = [];
Dom.quests.activeQuestUseArray = [];
Dom.quests.completedQuestArray = [];
Dom.quests.questNum = 0;
Dom.quests.questString = "";
// change to active
Dom.quests.activeQuests = function(quest){ // when a quest is started or ended...
	if(quest != undefined){ // if a quest is started...
		Dom.quests.activeQuestArray.push(quest.quest); // adds the quest name to the array of active quest names
		Dom.quests.activeQuestUseArray.push(quest); // adds the quest to the array of active quests
	}
	document.getElementById("activeQuestBox").style.textAlign = "left"; // the text in the box is written from the left
	document.getElementById("activeQuestBox").innerText = ""; // sets the text in the box to none
	for(var x = 0; x < Dom.quests.activeQuestArray.length; x++){ // repeats for every active quest
		document.getElementById("activeQuestBox").innerHTML += "<strong>" + Dom.quests.activeQuestUseArray[x].quest + "</strong>"; // writes the name of the quest in the box
		for(var i = 0; i < Dom.quests.activeQuestUseArray[x].objectives.length; i++){ // repeats for each objective
			document.getElementById("activeQuestBox").innerHTML += "<br>" + Dom.quests.activeQuestUseArray[x].objectives[i]; // writes the objective in the box
			if(Dom.quests.activeQuestUseArray[x].isCompleted()[i] && i != Dom.quests.activeQuestUseArray[x].objectives.length-1){ // if the objective has been completed...
				document.getElementById("activeQuestBox").innerHTML += " &#10004;"; // ...put a tick next to it
			}
		}
		if(quest != undefined){ // if a quest is started
			document.getElementById("activeQuestBox").innerHTML += "<br>"; // adds a new line to the box
			Dom.quests.questNum += 30+(18*Dom.quests.activeQuestUseArray[x].objectives.length); // sets the...
			Dom.quests.questString = JSON.stringify(Dom.quests.questNum+10)+"px"; // ...height of...
			document.getElementById("activeQuestBox").style.height = Dom.quests.questString; // ...the box
		}
	}
	if(Dom.quests.activeQuestArray.length == 0){ // if there are no active quests
		document.getElementById("activeQuestBox").style.height = "40px"; // set the height to 40px
		document.getElementById("activeQuestBox").style.textAlign = "center"; // write text in the centre
		document.getElementById("activeQuestBox").innerText = "You have no active quests"; // write "you have no active quests"
	}
}

Dom.quests.completedQuestNum = 0; // sets the number of completed quests to 0
Dom.quests.completedQuestString = ""; // sets the height of the box to 0
Dom.quests.completed = function(quest){ // when a quest is completed...
	Dom.changeBook(Dom.previous, true); // the completed quest page opens
	Dom.quests.completedQuestArray.push(quest.quest); // the quest is added to the array of completed quests
	document.getElementById("completedQuestBox").style.textAlign = "left"; // the text in the box is written from the left
	if(Dom.quests.completedQuestNum == 0){ // if there are completed quests...
		document.getElementById("completedQuestBox").innerText = ""; // ...it sets the box to empty
	}
	document.getElementById("completedQuestBox").innerHTML += quest.quest + "<br>"; // adds the quests you just completed to the box
	Dom.quests.completedQuestNum += 18; // increases the height...
	Dom.quests.questString = JSON.stringify(Dom.quests.questNum+10)+"px"; // ...of the box...
	document.getElementById("activeQuestBox").style.height = Dom.quests.questString; // ...by one line
	if(Dom.quests.questNum < 50){ // if the box is too small...
		document.getElementById("activeQuestBox").style.height = "40px"; // ...its height is set to 40px
	}
}

Dom.merchant.page = function(title,greeting,options){ // merchant page
	Dom.changeBook("merchantPage", false); // changes the page to the merchant page
	Dom.currentlyDisplayed = title; // sets the currently displayed variable to the merchant's name
	Dom.changeBook("merchantPage", false, 1); // stops close button being red
	document.getElementById("merchantPageTitle").innerHTML = title; // sets the title to the merchant's name
	document.getElementById("merchantPageChat").innerHTML = greeting; // sets the greeting to the merchant's greeting
	document.getElementById("merchantPageOptions").innerHTML = ""; // sets the options to none
	document.getElementById("merchantPageBuy").innerHTML = ""; // sets the buy buttons to none
	for(let i = 0; i < options.length; i++){ // repeats for each option
		document.getElementById("merchantPageOptions").innerHTML += "<img src=" + options[i].image + " class='theseOptions' style='border: 5px solid #886622;'></img><br><br>"; // sets the image for the option
		document.getElementById("merchantPageBuy").innerHTML += "<div class='buy'>Buy for: " + options[i].cost + " gold</div><br>"; // makes a buy button next to the option
		for(let x = 0; x < document.getElementsByClassName("buy").length; x++){ // repeats for every buy button
			document.getElementsByClassName("buy")[x].onclick = function() { // when you click on a buy button...
				Dom.merchant.buy(options[x]); // ...the buy function is called
			};
		}
		for(let x = 0; x < document.getElementsByClassName("theseOptions").length; x++){ // repeats for every option
			document.getElementsByClassName("theseOptions")[x].onmouseover = function() { // when you hover over an item...
				Dom.merchant.displayInformation(document.getElementsByClassName("theseOptions")[x].getBoundingClientRect().top, options, x); // ...its information displays
			};
			document.getElementsByClassName("theseOptions")[x].onmouseleave = function() { // when you stop hovering over an item...
				Dom.expand("informationMerchant"); // ...its information stops displaying
			}
		}
	}
}

Dom.merchant.buy = function(item){ // buy item from merchant
	if(Player.gold >= item.cost){ // if they have an enough gold...
		Player.gold -= item.cost; // takes the amount of gold from the player
		Dom.inventory.updateGold(); // updates how much gold the display shows
		Dom.quest.give(item); // gives the player the item
		Dom.chat.insert("You bought a " + item.name + ".", 100); // tells the player they bough an item in the chat
	}
	else { // if they do not have enough gold...
		alert("You don't have sufficient funds to buy that item."); // alert them that they don't have enough gold
	}
}
Dom.identifier.displayed = Player.inventory.unId.length-1; // set the currently displayed item in the identifier to the latest one
	
Dom.identifier.left = function(chat, chat1, chat2, chat3, over){ // code called on clicking the left arrow to change the displayed item to the previous item
	if(Dom.identifier.displayed != 0){ // checks if the currently displayed item is the first in the array
		Dom.identifier.displayed--; // sets the currently displayed item to the previous item
	}else{
		Dom.identifier.displayed = Player.inventory.unId.length-1; // sets the currently displayed item to the last item in the array
	}
	Dom.identifier.page(chat, chat1, chat2, chat3, over); // opens and updates the identifier page
}

Dom.identifier.right = function(chat, chat1, chat2, chat3, over){ // this code is not important
	if(Dom.identifier.displayed != Player.inventory.unId.length-1){ // checks if the currently displayed item is the last in the array
		Dom.identifier.displayed++; // sets the currently displayed item to the next item
	}else{
		Dom.identifier.displayed = 0; // sets the currently displayed item to the first item in the array
	}
	Dom.identifier.page(chat, chat1, chat2, chat3, over); // opens and updates the identifier page
}

Dom.identifier.page = function(chat, chat1, chat2, chat3, over){ // identifier page
	Dom.changeBook("identifierPage", over); // changes page to identifier
	Dom.currentlyDisplayed = "identifier"; // sets the currently displayed page variable to identifier
	Dom.changeBook("identifierPage", false, 1); // stops close button being red
	if(chat != undefined){
		document.getElementById("identifierPageChat").innerHTML = chat; // sets the greeting to the parameter (chat)
	}
	document.getElementById("identifierPageOption").onmouseover = function(){ // when the player hovers over the item...
	}
	document.getElementById("identifierPageOption").onmouseleave = function(){ // when the player stops hovering over the item...
	}
	document.getElementById("identifierPageBuy").onclick = function(){ // when the player clicks identify...
	}
	if(Player.inventory.unId.length != 0){ // checks if the player has any unIDed items
		document.getElementById("identifierPageOption").innerHTML = "<img src=" + Player.inventory.unId[Dom.identifier.displayed].image + " class='theseOptions' style='padding: 0px; margin: 0px; border: 5px solid #886622; height: 50px; width: 50px;'></img>"; // sets the image to the selected item
		document.getElementById("identifierPageOption").onmouseover = function(){ // when the player hovers over the item...
			Dom.identifier.displayInformation(Dom.identifier.displayed,Player.inventory.unId); // ...it displays its information
		}
		document.getElementById("identifierPageOption").onmouseleave = function(){ // when the player stops hovering over the item...
			Dom.expand("identifierInformation"); // ...it stops displaying the information
		}
		document.getElementById("identifierPageBuy").onclick = function(){ // when the player clicks identify...
			Dom.identifier.identify(chat,chat1,chat2,chat3); // ...it calls the identify function (below)
		}
	}else{
		document.getElementById("identifierPageOption").innerHTML = "<img class='theseOptions' style='background-color: #fef9b4; border: 5px solid #886622; height: 50px; width: 50px;'></img>"; // sets the image to empty
	}
	document.getElementById("leftArrow").style.top = document.getElementById("identifierPageOption").getBoundingClientRect().top - 32 +"px"; // sets the left arrows position to the same height as the image
	document.getElementById("leftArrow").style.left = document.getElementById("identifierPageOption").getBoundingClientRect().left - 31 +"px"; // sets the left arrows position to left of the image
	document.getElementById("leftArrow").onclick = function(){ // when the player clicks on the left arrow...
		Dom.identifier.left(chat, chat1, chat2, chat3); // ...it changes the selected item to the previous unIDed item
		// at the end of the function it calls Dom.identifier.page and that is when the code breaks
	}
	document.getElementById("rightArrow").style.top = document.getElementById("identifierPageOption").getBoundingClientRect().top - 32 +"px"; // sets the right arrows position to the same height as the image
	document.getElementById("rightArrow").style.left = document.getElementById("identifierPageOption").getBoundingClientRect().left + 71 +"px"; // sets the right arrows position to right of the image
	document.getElementById("rightArrow").onclick = function(){ // when the player clicks in the right arrow...
		Dom.identifier.right(chat, chat1, chat2, chat3); // it changes the selected item to the next unIDed item
		// this function does not work yet but does not cause the error.
	}
	document.getElementById("identifierPageBuy").innerHTML = "Identify for: "+"1"+" gold"; // sets the text inside the identify button
}

setTimeout(function(){ // wait for timeout
	Dom.identifier.page("What would you like to identify?","Here is your item, adventurer", "Some people would pay good money for that item", "Wow! A Mythic"); // opens and updates the identifier page
},100); // wait 100

Dom.quest.give = function(item){ // gives the player the item
	if(item.type == "helm"){Player.inventory.helm.push(item);} // adds the helm to the players helm array
	if(item.type == "chest"){Player.inventory.chest.push(item);} // adds the chest to the players chest array
	if(item.type == "greaves"){Player.inventory.greaves.push(item);} // adds the greaves to the players greaves array
	if(item.type == "boots"){Player.inventory.boots.push(item);} // adds the boots to the players boots array
	if(item.type == "sword" || item.type == "staff" || item.type == "bow" || item.type == "rod"){Player.inventory.weapon.push(item);} // adds the weapon to the players weapons arary
}

Dom.quests.allQuestNum = 18; // sets the box height...
Dom.quests.allQuestString = ""; // ...to one line
for(var i = 0; i < Object.keys(quests).length; i++){ // repeats this code for each area
	for(var x = 0; x < quests[Object.keys(quests)[i]].length; x++){ // repeats this code for each quest
		document.getElementById("allQuestBox").innerHTML += quests[Object.keys(quests)[i]][x].quest + "<br>"; // writes the name of the quest in the box
		//for(var y = 0; y < quests[Object.keys(quests)[i]][x].objectives.length; y++){ // repeats this code for each objective
			//document.getElementById("allQuestBox").innerHTML += quests[Object.keys(quests)[i]][x].objectives[y] + "<br>"; // writes the objective under the name
		//}
		//document.getElementById("allQuestBox").innerHTML += "<br>"; // adds a space after the objectives
		Dom.quests.allQuestNum += 18; // increases...
		Dom.quests.allQuestString = JSON.stringify(Dom.quests.allQuestNum)+"px"; // ...height...
		document.getElementById("allQuestBox").style.height = Dom.quests.allQuestString; // ...of the box
	}
}

function unIdConstruct(area,tier){ // constructs an unidentified item when you kill an enemy
	this.area = area; // sets the item's area to the area you are in
	this.tier = tier; // sets the item's tier to the tier of the enemy
	var types = ["Helm","Chest","Greaves","Boots","Sword","Staff","Bow"]; // an array of types of weapon/armour
	this.typeNum = Math.floor(Math.random()*7); // a random number between 0 and 7...
	this.type = types[typeNum]; // ...used to choose a random category (e.g. bow)
	this.image = "'assets/items/"+this.type+".png'"; // sets the item's image to the default for its category (e.g. basic bow)
	this.rarityNum = Math.floor(Math.random()*25); // a random number between 0 and 25
	if(this.rarityNum < 18){ // 18/25 chance that the item is a...
		this.rarity = "common"; // ...common
	}else if(this.rarity < 24){ // 6/25 chance that the item is a...
		this.rarity = "unique"; // ...unique
	}else{ // 1/25 chance that the item is a...
		this.rarity = "mythic"; // ...mythic
	}
}

Dom.identifier.identify = function(chat, chat1, chat2, chat3){ // the page that you go to when you click "identify for 1 gold"
	if(Player.gold >= 1){
		Player.gold--;
		Dom.changeBook("identifiedPage",true); // changed page to the identified page
		Dom.currentlyDisplayed = "identified"; // sets the currently displayed page variable to identified
		Dom.identifier.array = []; // sets the possible items to none
		if(Player.inventory.unId[Dom.identifier.displayed].rarity == "common"){ // if it is a common item...
			document.getElementById("identifiedPageChat").innerHTML = chat1; // ...it uses the "common" chat
		}else if(Player.inventory.unId[Dom.identifier.displayed].rarity == "unique"){ // if it is a unique item...
			document.getElementById("identifiedPageChat").innerHTML = chat2; // ...it uses the "unique" chat
		}else{ // if it is a myhtic item...
			document.getElementById("identifiedPageChat").innerHTML = chat3; // ...it uses the "mythic" chat
		}
		for(i = 0; i < items[Object.keys(items)[Player.inventory.unId[Dom.identifier.displayed].typeNum]].length; i++){ // for every item of the same catergory (e.g. bow)...
			if(items[Object.keys(items)[Player.inventory.unId[Dom.identifier.displayed].typeNum]][i].tier == Player.inventory.unId[Dom.identifier.displayed].tier && items[Object.keys(items)[Player.inventory.unId[Dom.identifier.displayed].typeNum]][i].area == Player.inventory.unId[Dom.identifier.displayed].area && items[Object.keys(items)[Player.inventory.unId[Dom.identifier.displayed].typeNum]][i].rarity == Player.inventory.unId[Dom.identifier.displayed].rarity){ // ...check if it matches the stats...
				Dom.identifier.array.push(items[Object.keys(items)[Player.inventory.unId[Dom.identifier.displayed].typeNum]][i]); // ...if it does add is to the array of possible items
			}
		}
		Dom.identifier.num = Math.floor(Math.random()*Dom.identifier.array.length); // a random number between 0 and the number of items in the array of possible items
		Dom.identifier.item = Dom.identifier.array[Dom.identifier.num]; // a random item from the array of possible items
		document.getElementById("identifiedPageOption").innerHTML = "<img src=" + Dom.identifier.item.image + " class='theseOptions' style='padding: 0px; margin: 0px; border: 5px solid #886622; height: 50px; width: 50px;'></img>"; // sets the image to the selected item
		Dom.quest.give(Dom.identifier.item); // gives the player the item
		document.getElementById("identifiedPageOption").getElementsByTagName("img")[0].onmouseover = function(){ // when the player hovers over the item...
			Dom.identifier.displayIdentifiedInformation(Dom.identifier.num,Dom.identifier.array); // ...it displays its information
		}
		document.getElementById("identifiedPageOption").getElementsByTagName("img")[0].onmouseleave = function(){ // when the player stops hovering over the item...
			Dom.expand("identifiedInformation"); // ...it stops displaying the information
		}
		document.getElementById("identifiedPageBack").onclick = function(){ // when you click on the back button...
			Dom.identifier.left(chat, chat1, chat2, chat3, true); // ...the page goes back to the normal identifier
		}
		Player.inventory.unId.splice(Dom.identifier.displayed, 1); // removes from the array of unidentified items
	}else{
		alert("You don't have sufficient funds to buy that item."); // alert them that they don't have enough gold
	}
}