var Quests = {
	eaglecrestLoggingCamp: [
		{
			id: 0,
			quest: "To the Logging Camp",
			questArea: "eaglecrestLoggingCamp", // name of the array this is contained in

			important: true, // appears at top of quest log and choose dom

			startName: "Cart Driver",
			startChat: `That's it, we're here! I'm afraid you're going to have to walk to the <strong>Eaglecrest Logging Camp</strong> from here. If you walk down a bit to the west you should see the entrance to the camp.<br>You should probably buy a weapon on your way there. It looks like you have enough gold on you to do so. There's a good weaponsmith on your way to the camp, not far from here.`,

			finishName: "Marshall Teper",
			finishChat: `Welcome to the Eaglecrest Logging Camp, adventurer. It's useful to have you here. I hope your journey was fine.<br>Take this gold and pair of boots. They're provided by the King's Covenant to all new adventurers. Feel free to have a look around the camp and buy anything you want, but not for too long. We've got work to be done.`,

			objectives: [
				"Buy a weapon from a nearby weaponsmith.",
				"Speak to <strong>Marshall Teper</strong>.",
			],

			isCompleted: function() {
				let completed = []; // contains true or false for all of the objectives, with the last element being if the quest is ready to complete

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Dom.inventory.check(2, "sword", 1) || Dom.inventory.check(2, "staff", 1) || Dom.inventory.check(2, "bow", 1));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to the <strong>Cart Driver</strong>.",
			levelRequirement: 1,
			questRequirements: [],
			requirement: function () {
				return Player.unlockedInstructions.length >= 1;
			},

			rewards: {
				xp: 10,
				items: [
					{item: Items.boots[2],},
				],
			},

			onQuestStart: function() {
				Dom.instructions.unlockTab("quests");
				Dom.instructions.page(1);
			},
		},

		{
			id: 1,
			quest: "Learning from the Best",
			questArea: "eaglecrestLoggingCamp",

			important: true,

			startName: "Mashall Teper",
			startChat: `You're going to need to learn how to fight if you're going to be able to help us gather some wood - there are goblins out there.<br>Go and see <strong>Combat Trainer Saral</strong>. She's more skilled in combat than anyone else here. She'll be able to teach you what you need to know.`,

			finishName: "Combat Trainer Saral",
			finishChat: `Why hello, ${Player.name}. I always love new blood in the Logging Camp. Now let's get started, shall we?`,

			objectives: [
				"Equip your weapon in the inventory.",
				"Speak to <strong>Combat Trainer Saral</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Player.inventory.weapon.type === "bow" || Player.inventory.weapon.type === "staff" || Player.inventory.weapon.type === "sword");

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Marshall Teper</strong>.",
			levelRequirement: 1,
			questRequirements: ["To the Logging Camp"],

			rewards: {
				xp: 10,
			},

			onQuestStart: function() {
				Dom.instructions.unlockTab("inventory");
				Dom.instructions.page(4);
			},
		},

		{
			id: 2,
			quest: "Combat Training",
			questArea: "eaglecrestLoggingCamp",

			important: true,

			startName: "Combat Trainer Saral",
			startChat: `${Player.name}, I'd like for you to deal some damage to this <strong>Training Dummy</strong>. 20 should suffice. <br>You can find out more about how you can attack in your <strong>adventure log</strong>.`,

			finishName: "Combat Trainer Saral",
			finishChat: `Well done. It's inspiring to watch a new adventurer learn their ways - I look forward to seeing more of you in the future. I imagine <strong>Marshall Teper</strong> would like for you to get to work with him now.`,

			objectives: [
				"Deal at least 20 damage to the <strong>Training Dummy</strong>.",
				"Speak to <strong>Combat Trainer Saral</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				// quest must be finished in Eaglecrest Logging Camp, hence Game.dummies[0] is always the right dummy
				completed.push(typeof Game.dummies !== "undefined" && typeof Game.dummies[0] !== "undefined" && checkProgress(Game.dummies[0].damageTaken, 20));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Combat Trainer Saral</strong>.",
			levelRequirement: 1,
			questRequirements: ["Learning from the Best"],

			rewards: {
				xp: 20,
				items: [
					{item: Items.currency[2], quantity: 3,},
				],
			},
		},

		{
			id: 3,
			quest: "Retrieval of Logs",
			questArea: "eaglecrestLoggingCamp",

			important: true,

			startName: "Marshall Teper",
			startChat: `You looked good enough at the training dummy to go out to <strong>The Nilbog</strong>. It's the camp of some goblins, but trust me - they're not much stronger than that dummy you just fought.<br>They recently invaded our camp in huge numbers, and managed to steal some logs of wood whilst we were fighting them off. Head east to <strong>The Nilbog</strong> and retrieve some wood from them, and return it to me.`,

			finishName: "Marshall Teper",
			finishChat: `Good. Now we need to make sure that a goblin attack like this won't happen again.`,

			objectives: [
				"Retrieve 4 logs from The Nilbog. <em>(press space when standing on one to pick it up)</em>",
				"Speak to <strong>Marshall Teper</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Dom.inventory.check(2, "item"), 4));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Marshall Teper</strong>.",
			levelRequirement: 1,
			questRequirements: ["Combat Training"],

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 2,},
					{item: Items.bag[2],}, // logging sack
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},

			removeItems: [
				{item: Items.item[2], quantity: 4,}, // logs
			],

			onQuestFinish: function() {
				// unlock reputation tab
				Dom.instructions.unlockTab("reputation");
			}
		},
		{
			id: 4,
			quest: "More Logs",
			questArea: "eaglecrestLoggingCamp",

			startName: "Marshall Teper",
			startChat: `There's still more logs out there in The Nilbog. We need to retrieve some more.`,

			finishName: "Marshall Teper",
			finishChat: `Good. Come back tomorrow and we can retrieve some more.`,

			objectives: [
				"Retrieve 4 logs from The Nilbog.",
				"Speak to <strong>Marshall Teper</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Dom.inventory.check(2, "item"), 4));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Marshall Teper</strong>.",
			levelRequirement: 2,
			questRequirements: ["Retrieval of Logs"],
			repeatTime: "daily",

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 1,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},

			removeItems: [
				{item: Items.item[2], quantity: 4,}, // logs
			],
		},

		{
			id: 5,
			quest: "Making Yourself Useful",
			questArea: "eaglecrestLoggingCamp",

			important: true,

			startName: "Marshall Teper",
			startChat: `There's lots going on around the logging camp at the moment, especially after the goblin attack. Speak to some people in the camp and see if there's anyone that could use your help.`,

			finishName: "Marshall Teper",
			finishChat: `You made quick work of that. I believe it is time for you to head to Eaglecrest soon, but first we need to get to the root of this goblin problem.`,

			objectives: [
				"Help 3 people around the Logging Camp.",
				"Speak to <strong>Marshall Teper</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				let peopleHelped = 0; // count number of people that the player has helped
				if (Player.quests.completedQuestArray.includes("First Class Recovery")) { peopleHelped++; }
				if (Player.quests.completedQuestArray.includes("Strengthening Defences")) { peopleHelped++; }
				if (Player.quests.completedQuestArray.includes("The Sceptre of Souls")) { peopleHelped++; }
				if (Player.quests.completedQuestArray.includes("Another Man's Treasure")) { peopleHelped++; }
				if (Player.quests.completedQuestArray.includes("Fire Power")) { peopleHelped++; }
				if (Player.quests.completedQuestArray.includes("Potion Making")) { peopleHelped++; }
				if (Player.quests.completedQuestArray.includes("A Lost Fishing Rod")) { peopleHelped++; }
				completed.push(checkProgress(peopleHelped, 3));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Marshall Teper</strong>.",
			levelRequirement: 2,
			questRequirements: ["Retrieval of Logs"],

			rewards: {
				xp: 50,
				items: [
					{item: Items.currency[2], quantity: 3,},
					{item: Items.chest[4],},
				],
				reputation: {
					eaglecrestLoggingCamp: 100,
				},
			},
		},

		{
			id: 6,
			quest: "First Class Recovery",
			questArea: "eaglecrestLoggingCamp",

			startName: "Eaglecrest Mailman",
			startChat: `Oh no - I was driving my mail cart through that boggy area to the east and came across a huge group of goblins! I had to abandon the cart and flee for my life, but I left a mail sack in the cart. Please, would you be able to try to find my missing mail sack?`,

			finishName: "Eaglecrest Mailman",
			finishChat: `Phew, I was so worried. It's a shame about the cart though...`,

			objectives: [
				"Find a mail sack inside the mail cart at the Nilbog.",
				"Speak to the <strong>Eaglecrest Mailman</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Dom.inventory.check(6, "item", 1));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to the <strong>Eaglecrest Mailman</strong>.",
			levelRequirement: 2,
			questRequirements: ["Retrieval of Logs"],

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 1,},
				],
				reputation: {
					eaglecrestCity: 20,
				},
			},

			removeItems: [
				{item: Items.item[6],}, // mail sack
			],
		},

		{
			id: 7,
			quest: "A Lost Fishing Rod",
			questArea: "eaglecrestLoggingCamp",

			startName: "Fisherman Tobenam",
			startChat: "You! You look like you've been to see the goblins! One of my fav'rite fishing rods has been stolen from me, and I think it was one of those goblins, heheh! Would you be able to head down to them and see if you can find it? I'll happily give you a couple o' lessons on fishing if you're able to get your hands on it.",

			finishName: "Fisherman Tobenam",
			finishChat: "You found it! Heheh, let me clean it for you. You can keep it for your fishing lessons with me. I've plenty of other rods I can be using. Now, let me teach you... the way of the water! Heheheh.",

			objectives: [
				"Find <strong>Fisherman Tobenam's</strong> fishing rod. He thinks it has been taken by a goblin.",
				"Return to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push((Dom.inventory.check(7, "item", 1)) ? true : false);

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong> at the Fishers' Valley.",
			levelRequirement: 2,
			questRequirements: ["Retrieval of Logs"],

			rewards: {
				xp: 20,
				items: [
					{item: Items.rod[2],},
				],
			},

			removeItems: [
				{item: Items.item[7],}, // Tobenam's Lost Fishing Rod (cleaned version given in its place)
			],
		},

		{
			id: 8,
			quest: "Strengthening Defences",
			questArea: "eaglecrestLoggingCamp",

			startName: "Galuthel the Trap Mechanic",
			startChat: `Welcome to the logging camp, adventurer. I hope Teper hasn't been too harsh to you. Since the goblin attack, we've been investing in ways to stop something like it happening again. My traps are some of the best technology this area has to offer to stop those goblins.<br>Help me by taking some traps and place them around in The Nilbog. 3 should suffice. They won't arm right away, but when they do there's sure to be a huge impact.`,

			finishName: "Galuthel the Trap Mechanic",
			finishChat: `Excellent. You can always come back later if you have a bit of spare time. I'd appreciate your help.`,

			objectives: [
				"Place 3 goblin traps around The Nilbog. <em>(click on one to place it)</em>",
				"Speak to <strong>Galuthel the Trap Mechanic</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.goblinTrapsPlaced, 3));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Galuthel the Trap Mechanic</strong>.",
			levelRequirement: 2,
			questRequirements: ["Retrieval of Logs"],

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 1,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},

			removeItems: [
				// remove all traps
				{item: Items.consumable[7], quantity: "all",},
			],
		},
		{
			id: 9,
			quest: "Reinforcing Defences",
			questArea: "eaglecrestLoggingCamp",

			startName: "Galuthel the Trap Mechanic",
			startChat: `If you have some time, I need 3 more traps placed around The Nilbog. We can't let those goblins attack us again!`,

			finishName: "Galuthel the Trap Mechanic",
			finishChat: `Thank you. Same time tomorrow?`,

			objectives: [
				"Place 3 goblin traps around The Nilbog. <em>(click on one to place it)</em>",
				"Speak to <strong>Galuthel the Trap Mechanic</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.goblinTrapsPlaced, 3));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Galuthel the Trap Mechanic</strong>.",
			levelRequirement: 4,
			questRequirements: ["Strengthening Defences"],
			repeatTime: "daily",

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 1,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},

			removeItems: [
				// remove all traps
				{item: Items.consumable[7], quantity: "all",},
			],

			resetVariables: [
				"goblinTrapsPlaced",
			],
		},

		{
			id: 10,
			quest: "The Sceptre of Souls",
			questArea: "eaglecrestLoggingCamp",

			startName: "Soul Healer Nalaa",
			startChat: `My blessings to you. My sceptre is running low on soul essence, a sacred power contained in the corpses of those who have recently died. I use it to remove XP fatigue from those who have died, here at the logging camp. I am not well equipped to go out to collect this essence, however I believe that you are. May you restore my scepter's power?`,

			finishName: "Soul Healer Nalaa",
			finishChat: `Thank you. It is people like you that allow the Logging Camp to flourish.`,

			objectives: [
				"Use the sceptre of souls near 5 corpses to restore its power. <em>(click on it to use it)</em>",
				"Speak to <strong>Soul Healer Nalaa</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.soulSceptreEnergy, 5));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Soul Healer Nalaa</strong>.",
			levelRequirement: 3,
			questRequirements: ["Retrieval of Logs"],

			startRewards: {
				items: [
					{item: Items.item[8],}, // soul sceptre
				],
			},

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 1,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},

			removeItems: [
				{item: Items.item[8],}, // remove soul sceptre
			],
		},

		{
			id: 11,
			quest: "Partners in Goblin Destruction",
			questArea: "eaglecrestLoggingCamp",

			startName: "Goblin Torch",
			startChat: `<em>The torch speaks to you with a coarse whisper.</em><br>Please help. Goblins used wrong spell. On me. I can think. And speak. Other torches. Can not.<br>I hate goblins. As much as you. Please. Give me. A lift? We can kill. Together.`,

			finishName: "Goblin Torch",
			finishChat: `Thank you. That was the. Best time of my life.`,

			objectives: [
				"Kill 10 goblins with the help of the goblin torch.",
				"Place the torch back at the goblin camp.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.goblinsKilledWithTorch, 10));
				completed.push(completed[0] === true); // second objective isn't actually an objective so just mirrors the first

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "???",
			levelRequirement: 5,
			questRequirements: [],

			autofinish: true,

			startRewards: {
				items: [
					{item: Items.staff[7],}, // goblin torch
				],
			},

			onQuestStart: function () {
                let torchNPC = Game.npcs.find(npc => npc.name === "Goblin Torch");
                Game.removeObject(torchNPC.id, "npcs");
            },

			rewards: {
				xp: 50,
			},

			removeItems: [
				{item: Items.staff[7],}, // remove goblin torch
			],

			onQuestFinish: function() {
				if (Game.areaName === "nilbog") {
					Game.npcs.push(new NPC(Areas.nilbog.npcs[0])); // add goblin torch image to the map
				}
			},
		},

		{
			id: 12,
			quest: "Another Man's Treasure",
			questArea: "eaglecrestLoggingCamp",

			startName: "Item Buyer Noledar",
			startChat: `Hello. I've been working on my latest achievement and need some assistance if you wouldn't mind. I need to collect 8 <strong>Scraps of Cloth</strong> and 4 <strong>Polished Rocks</strong> from the goblins in <strong>The Nilbog</strong>, but I've heard it's dangerous out there and don't want to leave my cart unattended. Is there any chance you could head down there to help me? I've heard you're good around the goblins.`,

			finishName: "Item Buyer Noledar",
			finishChat: `Thank you so much! Now, I just need to find some space in my cart...<br>If you ever have more items you don't want, you can come and visit me to sell them any time.`,

			objectives: [
				"Obtain 8 <strong>Scraps of Cloth</strong> from goblins.",
				"Obtain 4 <strong>Polished Rocks</strong> from goblins.",
				"Speak to <strong>Item Buyer Noledar</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Dom.inventory.check(3, "item"), 8));
				completed.push(checkProgress(Dom.inventory.check(4, "item"), 4));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Item Buyer Noledar</strong>.",
			levelRequirement: 2,
			questRequirements: ["Retrieval of Logs"],

			rewards: {
				xp: 30,
				services: [
					{image: "itemBuyer", lore: "You will be able to sell items to Noledar after completing this quest."},
				],
				items: [
					{item: Items.currency[2], quantity: 2,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},

			removeItems: [
				{item: Items.item[3], quantity: 8,}, // scrap of cloth
				{item: Items.item[4], quantity: 4,}, // polished rock
			],
		},

		{
			id: 13,
			quest: "Fire Power",
			questArea: "eaglecrestLoggingCamp",

			startName: "Identifier Gilas",
			startChat: `As part of my research, I have been looking into what makes the <strong>fire goblin</strong> so much stronger than the other goblins. You might have seen one at the <strong>north</strong> of <strong>The Nilbog</strong>. I believe their strength is down to <strong>Fiery Rocks</strong>, which would have been sourced from the <strong>Nilbog Tower</strong>. They are potentially very strong forms of magic, but not that the goblins would know how to use them to their full potential!<br><br>Please, find one of these rocks from a fire goblin and return it to me. It will be very useful in my research.`,

			finishName: "Identifier Gilas",
			finishChat: `Thank you. This will be very useful for my research.`,

			objectives: [
				"Obtain a <strong>Fiery Rock</strong> from a <strong>Fire Goblin</strong>.",
				"Speak to <strong>Identifier Gilas</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Dom.inventory.check(5, "item", 1));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Identifier Gilas</strong>.",
			levelRequirement: 4,
			questRequirements: ["Retrieval of Logs"],

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 1,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},

			removeItems: [
				{item: Items.item[5],}, // fiery rock
			],
		},

		{
			id: 14,
			quest: "Potion Making",
			questArea: "eaglecrestLoggingCamp",

			startName: "Ciarra Darkbrew",
			startChat: `It's important that we potion merchants experiment with our wares. You wouldn't want to feel to safe as a customer, would you? Gather some potion ingredients for me and let's see what we can brew up.`,

			finishName: "Ciarra Darkbrew",
			finishChat: `Interesting. Let's see how this goes.`,

			onQuestFinish: function () {
				Dom.closePage('questFinish');
				Dom.chat.insertSequence([
					Dom.chat.say("Ciarra Darkbrew", "Stand back. We wouldn't want your arms to detatch so soon."),
					Dom.chat.say("Ciarra Darkbrew", "/me adds the potion ingredients to an inert vial."),
					"The vial fizzes rapidly.",
					"The vial explodes.",
					Dom.chat.say("Ciarra Darkbrew", "That... didn't go as planned.")],
				[1000, 3000, 2500, 2000, 2000], undefined, undefined, true); // cutscene with no end function

				setTimeout(function () {
					if (Game.areaName === "eaglecrestLoggingCamp") {
						// damage Ciarra
						Game.npcs.find(NPC => NPC.name === "Ciarra Darkbrew").takeDamage(100);
						// displace player if they are too close
                        let d = Game.distance(Game.hero, {x: 1571, y: 633}); // distance from ciarra
                        if (d < 240) {
                            Game.hero.displace(0, 240-d, 1, Game.bearing({x: 1571, y: 633}, Game.hero));
                        }
					}
				}, 8600);
			},

			objectives: [
				"Gather 2 goblin eyes.",
				"Fill up a bucket with mud from The Nilbog.",
				"Obtain a vial of goblin blood. You might be able to ask a nearby merchant for one.",
				"Speak to <strong>Ciarra Darkbrew</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Dom.inventory.check(10, "item"), 2));
				completed.push(Dom.inventory.check(13, "item", 1));
				completed.push(Dom.inventory.check(11, "item", 1));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Ciarra Darkbrew</strong>.",
			levelRequirement: 3,
			questRequirements: ["Retrieval of Logs"],

			startRewards: {
				items: [
					{item: Items.item[12],},
				],
			},

			removeItems: [
				{item: Items.item[10], quantity: 1,}, // goblin eye
				{item: Items.item[13],}, // bucket of Nilbog mud
				{item: Items.item[11],}, // vial of goblin blood
			],

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 2,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},
		},

		{
			id: 15,
			quest: "Potion Making II",
			questArea: "eaglecrestLoggingCamp",

			startName: "Ciarra Darkbrew",
			startChat: `Let's try again. Perhaps adding Nilbog mud wasn't a good idea. To stop such a violent reaction, <strong>direweed</strong> should be added. If you know how to fish, you can catch it from nearby waters.`,

			finishName: "Ciarra Darkbrew",
			finishChat: `Try two. Stand back; you wouldn't want to die <em>such</em> a horrible death.`,

			onQuestFinish: function () {
				Dom.closePage('questFinish');
				Dom.chat.insertSequence([
					Dom.chat.say("Ciarra Darkbrew", "/me adds the potion ingredients to an inert vial."),
					"The vial fizzes rapidly.",
					"The vial simmers to produce a bluish-green coloured liquid.",
					Dom.chat.say("Ciarra Darkbrew", "Excellent. If you'd like to try the potion, you can buy some from me. I promise it won't kill you. Probably.")],
				[1500, 4000, 6000, 8000], undefined, undefined, true); // cutscene with no end function
			},

			objectives: [
				"Gather 2 more goblin eyes.",
				"Fish up 1 direweed.",
				"Obtain another vial of goblin blood.",
				"Speak to <strong>Ciarra Darkbrew</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Dom.inventory.check(10, "item"), 2));
				completed.push(Dom.inventory.check(19, "fish", 1));
				completed.push(Dom.inventory.check(11, "item", 1));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Ciarra Darkbrew</strong>.",
			levelRequirement: 3,
			questRequirements: ["Potion Making"],

			removeItems: [
				{item: Items.item[10], quantity: 2,}, // goblin eye
				{item: Items.fish[19],}, // direweed
				{item: Items.item[11],}, // vial of goblin blood
			],

			rewards: {
				xp: 50,
				items: [
					{item: Items.currency[2], quantity: 2,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},
		},

		{
			id: 16,
			quest: "Combat Practice",
			questArea: "eaglecrestLoggingCamp",

			startName: "Combat Trainer Saral",
			startChat: `We meet again, ${Player.name}. It's always important to warm up before a day of combat. Hone your skills and kill 9 goblins in The Nilbog.`,

			finishName: "Combat Trainer Saral",
			finishChat: `Beautifully done, ${Player.name}. I love the smell of goblin blood. Same time tomorrow?`,

			objectives: [
				"Kill 9 goblins.",
				"Speak to <strong>Combat Trainer Saral</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.goblinsKilled, 9));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Combat Trainer Saral</strong>.",
			levelRequirement: 3,
			questRequirements: [],
			repeatTime: "daily",

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[2], quantity: 1,},
				],
				reputation: {
					eaglecrestLoggingCamp: 50,
				},
			},

			resetVariables: [
				"goblinsKilled",
			],
		},

		{
			id: 17,
			quest: "The Goblin King",
			questArea: "eaglecrestLoggingCamp",

			important: true,

			startName: "Marshall Teper",
			startChat: `The Goblin King is the ruler over the goblins. We believe it is because of their ruler that the goblins act as hostile towards us as they do. Unfortunately, the Antorax ley energy nearby means that the goblins and their ruler come back to life after killed, however killing the Goblin King will certainly offset the goblins for a while.<br>The Goblin Tower has been a dangerous place since they first took it over - it has all sorts of magical items left over that will will be unlike anything you have seen before. Moreover, only the strongest of goblins are elected to protect their ruler. I suggest not engaging them. Prepare yourself with equipment and potions, and see how you fare against the Goblin King.`,

			finishName: "Marshall Teper",
			finishChat: `Well done. Few novices can say they have killed the Goblin King.`,

			objectives: [
				"Kill the Goblin King at the top of the Nilbog Tower.",
				"Speak to <strong>Marshall Teper</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Player.bossesKilled.goblinKing !== 0);

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Marshall Teper</strong>.",
			levelRequirement: 4,
			questRequirements: ["Making Yourself Useful"],

			rewards: {
				xp: 50,
				items: [
					{item: Items.currency[2], quantity: 3,},
				],
				reputation: {
					eaglecrestLoggingCamp: 250,
				},
			},
		},

		{
			id: 18,
			quest: "The Festive Spirit",
			questArea: "eaglecrestLoggingCamp",

			startName: "Combat Trainer Saral",
			startChat: `Merry Christmas, ${Player.name}. The snow does make a beautiful weapon here in the logging camp, wouldn't you agree? Of course, snowballs won't do much against our normal target dummy at this time of year, but I have an idea for a different 'target dummy' we can use.<br>Gather some snowballs from snow gathering on nearby rocks, and toss them at <strong>Marshall Teper</strong>. It's the festive spirit, ${Player.name}!`,

			finishName: "Combat Trainer Saral",
			finishChat: `Nice work, ${Player.name}. I bet he got really angry!`,

			objectives: [
				"Make 3 snowballs from the snow gathering on the nearby rocks.",
				"Throw them all at <strong>Marshall Teper</strong>.",
				"Speak to <strong>Combat Trainer Saral</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.snowCollected, 3));
				completed.push(checkProgress(Player.quests.questProgress.hitTeper, 3));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Combat Trainer Saral</strong>.",
			levelRequirement: 2,
			questRequirements: ["Retrieval of Logs"],
			eventRequirement: "Christmas",

			repeatTime: "daily",

			rewards: {
				xp: 25,
				items: [
					{item: Items.currency[5], quantity: 2,}, // christmas token
				],
			},

			resetVariables: [
				"snowCollected",
				"hitTeper",
			],
		},

		{
			id: 19,
			quest: "Sunken Presents",
			questArea: "eaglecrestLoggingCamp",

			startName: "Fisherman Tobenam",
			startChat: `There're Christmas presents in the river! I saw it! The sleigh crashed! Heheh, maybe you could help to fish them up and deliver them!`,

			finishName: "You saved Christmas!",
			finishChat: `The last present is for you!<br>Merry Christmas, ${Player.name}!`,

			objectives: [
				"Fish up 3 presents from the river at Fishers' Valley.",
				"Deliver them to their intended recipients.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.christmasPresentsCaught, 3));
				if (Player.quests.questProgress.christmasPresentsDelivered === 2 && completed[0] === true) {
					// player has delivered first 2 presents and has caught the third
					completed.push(true);
				}
				else {
					completed.push(checkProgress(Player.quests.questProgress.christmasPresentsDelivered, 3));
				}

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong>.",
			levelRequirement: 2,
			questRequirements: ["Learning to Fish III"],
			eventRequirement: "Christmas",

			autofinish: true,

			rewards: {
				xp: 50,
				items: [
					{item: Items.currency[5], quantity: 6,}, // christmas token
					{item: Items.item[1],}, // secret (fishing rod is given through present)
				],
			},
		},

		{
			id: 20,
			quest: "Deck the Halls!",
			questArea: "eaglecrestLoggingCamp",

			startName: "Marshall Teper",
			startChat: `Merry Christmas. For us to win the Antorax Christmas Decoration Competition in the Logging Camp this year, we're going to need to make more of an effort than this. Plant some new Christmas Trees around the camp.`,

			finishName: "Marshall Teper",
			finishChat: `Hmm, I guess that looks fine.`,

			objectives: [
				"Place at least 5 Christmas Saplings around the Logging Camp. <em>(click on one to place it)</em>",
				"Speak to <strong>Marshall Teper</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.christmasSaplingsPlaced, 5));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Marshall Teper</strong>.",
			levelRequirement: 2,
			questRequirements: ["Retrieval of Logs"],
			eventRequirement: "Christmas",

			repeatTime: "daily",

			rewards: {
				xp: 25,
				items: [
					{item: Items.currency[5], quantity: 2,}, // christmas token
				],
			},

			resetVariables: [
				"christmasSaplingsPlaced",
			],

			removeItems: [
				// remove all saplings
				{item: Items.consumable[18], quantity: "all",},
			]
		},

		{
			id: 21,
			quest: "A 'Spark' of Imagination",
			questArea: "eaglecrestLoggingCamp",

			startName: "Goblin Torch",
			startChat: `Hello. Conscious goblin torch. Gets very bored. Please. Bring some books. Tower has books. Books cure boredom.`,

			finishName: "Goblin Torch",
			finishChat: `This will be. Exciting. Thank you.`,

			objectives: [
				"Gather 4 tattered tomes from goblins in the Nilbog Tower.",
				"Bring them back to the <strong>Goblin Torch</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Dom.inventory.check(16, "item"), 4));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to the <strong>Goblin Torch</strong> in The Nilbog.",
			levelRequirement: 5,
			questRequirements: ["Partners in Goblin Destruction"],

			rewards: {
				xp: 50,
			},

			removeItems: [
				{item: Items.item[16], quantity: 4,}, // remove goblin torch
			],

			onQuestFinish: function() {
				// goblin torch chat line
				Dom.chat.insert(Dom.chat.say("Goblin Torch", "Wizard runic. Very interesting. I'll be wizard soon."), 2500); // has to read the book
			},
		},

		{
			id: 22,
			quest: "The Legend of the Tattered Knight",
			questArea: "eaglecrestLoggingCamp",

			startName: "There once was a knight sent into exile, from the magical realm of Azuras,",
			startChat: `He invaded towers, looted innocents, and stole from the vulnerable and young.<br>
He was defeated by the great Wizard Andrews, near his tower in the Nilbog,<br>
The same great wizard who would become the leader of the Wizards in Antorax.<br><br>
Since then, many have recounted sightings of a knight in red and orange armour,<br>
However few have fought him, and even fewer have lived to tell the tale.<br>
It is said that there are riches to behold for those who emerge victorious,<br>
In a past timezone where the knight still stands, can you reap his spoils?<br>
<br><i>You will be teleported upon starting this quest</i>`,

			finishName: "To the victor goes the spoils!",
			finishChat: `And thus, ${Player.name} defeats the tattered knight. However this was not his end.<br>
Many still recount seeing a knight in red and yellow armour around Antorax and its outskirts.<br>
After all, death is never the end in Antorax...<br>
<br><i>You will be teleported back upon finishing this quest</i>`,

			objectives: [
				"Defeat and loot the Tattered Knight in Nilbog Past.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Player.bossesKilled.tatteredKnight !== 0 && // boss has been killed
				Game.areaName === "nilbogPast" && // area is nilbogPast (where boss is)
				(Game.enemies[0] === undefined || // enemy doesn't exist (game has been refreshed) OR
				Game.enemies[0].isCorpse === false) && // enemy's corpse has despawned (has been looted)
				Dom.currentlyDisplayed !== "The Tattered Knight"); // DOM is not currently showing looting screen

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Started from a message sent by mail.",
			levelRequirement: 1,
			questRequirements: [],
			eventRequirement: "Antorax",

			autofinish: true,

			rewards: {
				xp: 50,
				items: [{item: Items.item[1],}], // secret (items from tattered knight)
			},

			onQuestStart: function() {
				Game.hero.temporaryAreaTeleport("nilbogPast", 100, 100);
			},

			onQuestFinish: function() {
				Game.hero.temporaryAreaTeleportReturn();
			},
		},

		{
			id: 23,
			quest: "To Eaglecrest, and Beyond!",
			questArea: "eaglecrestLoggingCamp",

			important: true,

			startName: "Marshall Teper",
			startChat: `You've done fine with your work here in the Logging Camp, but it's time for you to head to Eaglecrest. Finish off anything you want to here, then speak to <strong>Cart Driver Alaran</strong> to take a cart to Eaglecrest, the capital city of Antorax.<br>You'll always be able to come back here in the future; just speak to Alaran in Eaglecrest and he can take you over. There's always work to be done and goblins to be defended against. I hope we'll be seeing you again soon.`,

			finishName: "Cart Driver Alaran",
			finishChat: `Here we are, Eaglecrest! You'll love it here.`,

			objectives: [
				"Take a cart to Eaglecrest.",
				"Speak to <strong>Cart Driver Alaran</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Game.areaName === "eaglecrest");

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Marshall Teper</strong>.",
			levelRequirement: 4,
			questRequirements: ["The Goblin King"],

			startRewards: {
				services: [
					{image: "driver", lore: "You will be able to take a cart to Eaglecrest upon starting this quest."},
				],
			},

			rewards: {
				xp: 10,
			},
		},

		{
			id: 24,
			quest: "A Burning Need to be Cleaned",
			questArea: "eaglecrestLoggingCamp",

			startName: "Goblin Torch",
			startChat: `Goblins. Make goblin torch dirty. Please, clean me. No water. Just cloth.`,

			finishName: "Goblin Torch",
			finishChat: `I am clean! Thank you. Adventurer.<br>Oh. What is your name?`,

			objectives: [
				"Obtain 1 scrap of cloth.",
				"Use it to clean the <strong>Goblin Torch</strong>.",
				"Obtain 1 scrap of cloth.",
				"Speak to a <strong>potion merchant</strong> about a potion of fire resistance.",
				"Bring 1 fireroot from the Eaglecrest Bazaar to <strong>Alchemist Tamtam</strong>.",
				"Douse the scrap of cloth in the potion of fire resistance.",
				"Use it to clean the <strong>Goblin Torch</strong>.",
				"",
			],

			isHidden: function() {
				let completed = [];

				if (Player.quests.npcProgress.eaglecrestLoggingCamp[24] === undefined) {
					Player.quests.npcProgress.eaglecrestLoggingCamp[24] = 1;
				}

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(false);
				completed.push(false);
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] < 2);
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] < 2);
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] < 3);
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] < 2);
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] < 2);
				completed.push(true);

				completed = checkFinished(completed);

				return completed;
			},

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Dom.inventory.check(3, "item", 1) || Player.quests.npcProgress.eaglecrestLoggingCamp[24] >= 2); // 1 scrap of cloth
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] >= 2);
				completed.push((Dom.inventory.check(3, "item", 1) || Dom.inventory.check(27, "item", 1)) && Player.quests.npcProgress.eaglecrestLoggingCamp[24] >= 2 ); // 1 scrap of cloth
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] >= 3);
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] >= 4);
				completed.push(Dom.inventory.check(27, "item", 1)); // 1 fire resistant cloth
				completed.push(Player.quests.npcProgress.eaglecrestLoggingCamp[24] >= 5);

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to the <strong>Goblin Torch</strong> in The Nilbog.",
			levelRequirement: 5,
			questRequirements: ["A 'Spark' of Imagination"],

			autofinish: true,

			rewards: {
				xp: 50,
			},

		},

		{
			id: 25,
			quest: "A Tale of Two Twintops",
			questArea: "eaglecrestLoggingCamp",

			startName: [
				"Nessy Tintop",
				"Torian Tintop",
				"Nessy Tintop",
				"Torian Tintop",
				"Nessy Tintop",
				"Torian Tintop",
				"Nessy Tintop",
				"Torian Tintop",
				"Nessy Tintop",
				"Torian Tintop",
				"Torian and Nessy Tintop",
			],

			finishName: [
				"Torian Tintop",
				"Nessy Tintop",
				"Torian Tintop",
				"Nessy Tintop",
				"Torian Tintop",
				"Nessy Tintop",
				"Torian Tintop",
				"Nessy Tintop",
				"Torian Tintop",
				"Nessy Tintop",
				"Tightly Packed Present",
			],

			startChat: [
				"Hello? What are you lookin' at? I'm just tryin' to find a friend, OK? He's not missing, it's for a game.<br><br>Yes I've been looking for a while. Yes there's a reward for whoever finds 'im first. Doesn't mean you can go off and look for him and take my reward! But yes, I wouldn't mind your help finding 'im if you insist.",
				"Alright, my turn to search now - bet y' can't find Nessy before me!",
				"Yes, I'm looking for Torian. He says I <strong>have</strong> to let you join in, but don't take all the reward this time!",
				"Y'know the game! Let's find Nessy! Who can get the reward first?",
				"Yes, I'm looking for Torian. He says I <strong>have</strong> to let you join in, but don't take all the reward this time!",
				"Y'know the game! Let's find Nessy! Who can get the reward first?",
				"Yes, I'm looking for Torian. He says I <strong>have</strong> to let you join in, but don't take all the reward this time!",
				"Y'know the game! Let's find Nessy! Who can get the reward first?",
				"Yes, I'm looking for Torian. He says I <strong>have</strong> to let you join in, but don't take all the reward this time!",
				"I swear, Nessy's not <strong>anywhere</strong>!!! No way you'll be able to find her this time.",
				`<strong>Torian Tintop</strong>: Haha, thanks from us for all the help with our hide 'n' find games. Not sure Nessy would 'ave ever found me otherwise!<br><br>
<strong>Nessy Tintop</strong>: Hey! I'm good as well y'know! They're taller than me! But yeah, Torian's not very good.<br><br>
<strong>Torian Tintop</strong>: Remember the time you were eaten by a goblin Nessy? ... Anyway, we've set up one last game for y'. We've hidden a present somewhere in the Camp for y'. We promise the reward's worth your time!<br><br>
<strong>Nessy Tintop</strong>: Bet y' can't find it!`,
			],

			finishChat: [
				"Well done! Y' found me! Oh, you're not Nessy... Never mind, y' can still have all the reward! It's not much, but it's all we have. I'm sure it'll be more after a few games here!",
				"Awh what, you're playin' now? I thought it was Torian's turn! OK, here's your reward.",
				"Haha, you again! Here's ya reward!",
				"Ugh, I guess you can have the reward this time. Why's it Torian never finds me first?",
				"Haha, you again! Here's ya reward!",
				"Ugh, I guess you can have the reward this time. Why's it Torian never finds me first?",
				"Haha, you again! Here's ya reward!",
				"Ugh, I guess you can have the reward this time. Why's it Torian never finds me first?",
				"Haha, you again! Here's ya reward!",
				"<strong>What!</strong> You really are good at hide 'n' find!",
				'<em>The present is signed "From Nessy and Torian Tintop"</em> ',
			],

			objectives: [
				["Find <strong>Torian Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Nessy Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Torian Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Nessy Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Torian Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Nessy Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Torian Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Nessy Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Torian Tintop</strong> somewhere in the logging camp area."],
				["Find <strong>Nessy Tintop</strong> somewhere in the logging camp area."],
				["Find the <strong>Tightly Packed Present</strong> somewhere in the logging camp area."],
			],

			howToStart: "Speak to one of the <strong>Tintop</strong> twins in the logging camp.",
			levelRequirement: 4,
			questRequirements: ["Making Yourself Useful"],

			repeatTime: "daily",
			numberOfRepeats: 11,
			multipleAreas: true,

			rewards: {
				xp: 30,
				items: [{item: Items.item[1],}], // question mark
				timesCompleted: [
                    [{item: Items.item[4]}], // polished rock
                    [{item: Items.item[3], quantity: 3}], // scrap of cloth
                    [{item: Items.fish[8]}], // old boot
                    [{item: Items.item[29]}], // burnt cloth
                    [{item: Items.food[0]}], // bread
                    [{item: Items.consumable[6]}], // goblin brewed potion
                    [{item: Items.consumable[5]}], // wood-brewed beer
                    [{item: Items.consumable[3]}], // potion of swiftness
                    [{item: new UnId("loggingCamp", 1)}, {item: new UnId("loggingCamp", 1)}], // unidentified item
                    [{item: Items.fish[17]}], // ocean chest key
                    [],
                ],
			},

			isCompleted: function() {
				return [true];
			},

			onQuestStart: function () {
				if (Game.areaName === "eaglecrestLoggingCamp") {
					if (Player.quests.timesCompleted.eaglecrestLoggingCamp[25] === null || Player.quests.timesCompleted.eaglecrestLoggingCamp[25] === undefined) {
						if (Game.prepareNPC(Areas.eaglecrestLoggingCamp.npcs[9], "npcs", true)) {
							Game.things.push(new NPC(Areas.eaglecrestLoggingCamp.npcs[9]));
						}
	                }
					else if (Player.quests.timesCompleted.eaglecrestLoggingCamp[25] === 5) {
						if (Game.prepareNPC(Areas.eaglecrestLoggingCamp.npcs[10], "npcs", true)) {
							Game.things.push(new NPC(Areas.eaglecrestLoggingCamp.npcs[10]));
						}
					}
					else if (Player.quests.timesCompleted.eaglecrestLoggingCamp[25] === 8) {
						if (Game.prepareNPC(Areas.eaglecrestLoggingCamp.npcs[11], "npcs", true)) {
							Game.things.push(new NPC(Areas.eaglecrestLoggingCamp.npcs[11]));
						}
					}
				}
			}

		},

	],

	eaglecrest: [
		{
			id: 0,
			quest: "Help! Lost Cat",
			questArea: "eaglecrest",

			startName: "Have you seen this cat?",
			startChat: "Black cat with white paws and nose.<br>His name is Amelio.<br>Last seen outside the Eaglecrest tavern.<br>Please bring to Priest Kemp-Eau inside Eaglecrest Monastery for a reward.",

			finishName: "Priest Kemp-Eau",
			finishChat: "",

			objectives: [
				"Find the lost cat, Amelio.",
				"Speak to <strong>Priest Kemp-Eau</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(false);

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Find the 'lost cat' notice in Eaglecrest City.",
			levelRequirement: 4,
			questRequirements: ["To Eaglecrest, and Beyond!"],

			rewards: {
				xp: 30,
				items: [{item: Items.currency[2], quantity: 3}],
			},
		},
	],

	tavern: [
		{
			id: 0,
			quest: "A Drink on Us!",
			questArea: "tavern",

			startName: "Gregor Goldenbrew",
			startChat: "I 'aven't seen you round 'ere before! Hehe, enjoy a drink by the hearth - free on us!",

			finishName: "Gregor Goldenbrew",
			finishChat: "Heh, yer gonna love it here!",

			objectives: [
				"Take a sip from your wood-brewed beer around the hearth.",
				"Speak to <strong>Gregor Goldenbrew</strong>.",
			],

			howToStart: "Speak to <strong>Gregor Goldenbrew</strong> in the Treefeller's Tavern.",
			levelRequirement: 1,
			questRequirements: ["To the Logging Camp"],

			rewards: {
				xp: 10,
			},

			startRewards: {
				items: [
					{item: Items.consumable[5],},
				],
			},

			resetVariables: [
				"drunkBeer",
			],

			isCompleted: function() {
				let completed = [];

				completed.push(checkProgress(Player.quests.questProgress.drunkBeer, 1));

				completed = checkFinished(completed);

				return completed;
			},

			onQuestStart: function() {
				Dom.chat.insert("Gregor brews you an extra large beer. Try not to get too tipsy!", 100);
			},
		},
		{
			id: 1,
			quest: "Cleaning the Floor",
			questArea: "tavern",

			gregorGoldenbrew: {
				startName: "Gregor Goldenbrew",
				startChat: "It's getting a bit dirty 'round 'ere! Any chance ya can help clean up for a li'l gold?",
				finishName: "Gregor Goldenbrew",
				finishChat: "Wow! The tavern's looking better than ever. Here's yer reward.",
				objectives: [
					"Use the mop to clean away the dirt in the tavern.",
					"Speak to <strong>Gregor Goldenbrew</strong>.",
				],
			},

			innkeepersRhusJak: {
				startName: "Innkeepers Rhus-Jak",
				startChat: `<strong>Jak</strong>: The tavern's a bit dirty at the moment. We're both busy serving guests, but if you wanted a job and a bit of gold ...
<br><strong>Rhus</strong>: Then clean the floor with mop!!`,
				finishName: "Innkeepers Rhus-Jak",
				finishChat: `<strong>Rhus</strong>: Give mop back here!
<br><strong>Jak</strong>: Thank you! It's looking a lot better here now.`,
				objectives: [
					"Use the mop to clean away the dirt in the tavern.",
					"Speak to <strong>Innkeeper Rhus-Jak</strong>.",
				],
			},

			multipleAreas: true,

			howToStart: "Speak to an innkeeper.",
			levelRequirement: 1,
			questRequirements: ["To the Logging Camp"],
			requirement: function () {
				return Game.areaName !== "loggingCampTavern" || Player.quests.completedQuestArray.includes("A Drink on Us!");
			},
			repeatTime: "repeatable",
			randomGroup: "tavernJobs",

			rewards: {
				xp: 10,
				items: [
					{item: Items.currency[2],}, // 1 gold
				],
			},

			startRewards: {
				items: [
					{item: Items.sword[13],}, // the mop
				],
			},

			removeItems: [
				{item: Items.sword[13],}, // remove the mop
			],

			isCompleted: function () {
				let completed = [];

				completed.push(checkProgress(Player.quests.questProgress.dirtDone, Player.quests.questProgress.dirtTotal));

				completed = checkFinished(completed);

				return completed;
			},

			onQuestStart: function () {

				// select a random number of dirt to generate between 5 and 15
				let random = Random(5, 15);
				Player.quests.questProgress.dirtTotal = random;
				Player.quests.questProgress.dirtDone = 0;

				// spawn the dirt
				for (let i = 0; i < random; i++) {

					// generate the dirt at a random location
					Game.attackables.push(new Character({
	                    map: map,
	                    type: "attackables",
	                    x: Random(0, map.cols * map.tsize),
	                    y: Random(0, (map.rows-1.5) * map.tsize),
						z: -0.5, // should never be infront of player
	                    image: "dirt",
	                    name: "Dirt",
	                    hostility: "neutral",
	                    level: 1,
						xpGiven: 0,
						corpseOnDeath: false,
						respawnOnDeath: false,
						canBeDamagedBy: ["Mop"],
	                    stats: {
	                        walkSpeed: 0,
	                        maxHealth: 1,
	                    },
						onDeath: function () {
							Player.quests.questProgress.dirtDone++;
						}
	                }));

					let array = Game.things.concat(Game.npcs); // array of things that cannot be touched

					// if the centre of the dirt is touching any thing then choose a new location
					let dirt = Game.attackables[Game.attackables.length-1];
					let touching = true;
					while (touching) {
						touching = false;
						if ([30, 85].includes(map.getTile(0, map.getCol(dirt.x-dirt.width/2), map.getRow(dirt.y+dirt.height/2))) // floor tile (2 numbers because 2 areas)
						&& [30, 85].includes(map.getTile(0, map.getCol(dirt.x+dirt.width/2), map.getRow(dirt.y+dirt.height/2)))) { // (update if moved)
							for (let x = 0; x < array.length; x++) {
								if (array[x].isTouching(dirt)) {
									touching = true;
									dirt.x = Random(0, map.cols * map.tsize);
									dirt.y = Random(0, (map.rows-1.5) * map.tsize);
									break;
								}
							}
						}
						else {
							touching = true;
							dirt.x = Random(0, map.cols * map.tsize);
							dirt.y = Random(0, (map.rows-1.5) * map.tsize);
						}
					}
				}
			},
		},
		{
			id: 2,
			quest: "Tavern Tidy-Up",
			questArea: "tavern",

			gregorGoldenbrew: {
				startName: "Gregor Goldenbrew",
				startChat: "My tables are getting covered with all these plates and mugs. Would ya mind collecting 'em all and bringing 'em back 'ere for me? I'll give ya some gold for yer time.",
				finishName: "Gregor Goldenbrew",
				finishChat: "Don't worry, I got yer reward here. My tavern's very popular so come back 'n' help whenever ya want.",
				objectives: [
					"Collect mugs and plates from tables.",
					"Return them to <strong>Gregor Goldenbrew</strong>.",
				],
			},

			innkeepersRhusJak: {
				startName: "Innkeepers Rhus-Jak",
				startChat: `<strong>Rhus</strong>: Tables are messy.
<br><strong>Jak</strong>: Could you help us tidy them a little? You can have a bit of gold for your time.
<br><strong>Rhus</strong>: Tables are <strong>very</strong> messy.`,
				finishName: "Innkeepers Rhus-Jak",
				finishChat: `<strong>Jak</strong>: Thank you! I'm sure they'll get cluttered again, but the tavern's looking great at the moment.
<br><strong>Rhus</strong>: Tables are clean.`,
				objectives: [
					"Collect mugs and plates from tables.",
					"Return them to <strong>Innkeeper Rhus-Jak</strong>.",
				],
			},

			multipleAreas: true,

			howToStart: "Speak to an innkeeper.",
			levelRequirement: 1,
			questRequirements: ["To the Logging Camp"],
			requirement: function () {
				return Game.areaName !== "loggingCampTavern" || Player.quests.completedQuestArray.includes("A Drink on Us!");
			},
			repeatTime: "repeatable",
			randomGroup: "tavernJobs",

			rewards: {
				xp: 10,
				items: [
					{item: Items.currency[2],}, // 1 gold
				],
			},

			removeItems: [
				{item: Items.item[25], quantity: true}, // all mugs
				{item: Items.item[26], quantity: true}, // all plates
			],

			isCompleted: function () {
				let completed = [];

				completed.push(checkProgress(Player.quests.questProgress.mugsPlatesDone, Player.quests.questProgress.mugsPlatesTotal));

				completed = checkFinished(completed);

				return completed;
			},

			onQuestStart: function () {

				if (Player.quests.questProgress.mugsPlatesDone === undefined) {
					Areas[Game.areaName].onAreaJoin();
					Player.quests.questProgress.mugsPlatesDone = 0;
				}

				for (let i = 0; i < Game.things.length; i++) {
					if (Game.things[i].name === "Mug") {
						Game.things[i].onInteract = function () {
							Game.removeObject(this.id, "things");
							Dom.inventory.give(Items.item[25]);
							Player.quests.questProgress.mugsPlatesDone++;
						}
					}
					else if (Game.things[i].name === "Plate") {
						Game.things[i].onInteract = function () {
							Game.removeObject(this.id, "things");
							Dom.inventory.give(Items.item[26]);
							Player.quests.questProgress.mugsPlatesDone++;
						}
					}
				}
			},

			onQuestFinish: function () {
				Player.quests.questProgress.mugsPlatesDone = undefined;
			}
		},
		{
			id: 3,
			quest: "Hungry Taverners",
			questArea: "tavern",

			gregorGoldenbrew: {
				startName: "Gregor Goldenbrew",
				startChat: "'Ey you! Wanna make a bit o' money helpin' me out? If ya do I need someone to hand out these tavern goods for me.",
				finishName: "Gregor Goldenbrew",
				finishChat: "Great! That should keep 'em happy for a few minutes",
				objectives: [
					"Hand out some tavern goods to people around the tavern",
					"Speak to <strong>Gregor Goldenbrew</strong>.",
				],
			},

			innkeepersRhusJak: {
				startName: "Innkeepers Rhus-Jak",
				startChat: `<strong>Jak</strong>: There's a lot of people waiting for their orders! Could you lend us a hand and give out some foodstuffs?`,
				finishName: "Innkeepers Rhus-Jak",
				finishChat: `<strong>Rhus</strong>: Good. People happy.
<strong>Jak</strong>: Thank you!`,
				objectives: [
					"Hand out some tavern goods to people around the tavern",
					"Speak to <strong>Innkeeper Rhus-Jak</strong>.",
				],
			},

			multipleAreas: true,

			howToStart: "Speak to an innkeeper.",
			levelRequirement: 1,
			questRequirements: ["To the Logging Camp"],
			requirement: function () {
				return Game.areaName !== "loggingCampTavern" || Player.quests.completedQuestArray.includes("A Drink on Us!");
			},
			repeatTime: "repeatable",
			randomGroup: "tavernJobs",

			rewards: {
				xp: 10,
				items: [
					{item: Items.currency[2],}, // 1 gold
				],
			},

			isCompleted: function () {
				let completed = [];

				for (let i = Game.villagers.length-1; i >= 0; i--) {
					completed.push(Game.villagers[i].tavernGoodsDelivered === true);
				}

				completed = checkFinished(completed);

				return completed;
			},

			onQuestStart: function (npc) {

				// remove the first objective which just tells you you will hand general stuff to general people
				this[ToObjectKey(npc.name)].objectives.shift();

				// filter out all unactive event items
				let sold = npc.roles[0].sold.filter(item => item.eventRequirement === undefined || item.eventRequirement === Event.event);

				// for each villager assign a random item sold by the npc
				for (let i = 0; i < Game.villagers.length; i++) {
					let item = sold[Random(0, sold.length-1)].item;
					this[ToObjectKey(npc.name)].objectives.unshift("Give " + item.name + " to " + Game.villagers[i].name + ".")

					Game.villagers[i].roles.push({
						role: "function",
						chooseText: "Here is your " + item.name,
						forceChoose: true, // forces choose dom
						onClick: function () {
							// remove the item
							Dom.inventory.removeById(item.id, item.type, 1, undefined, true); // remove the QUEST item
							// quest progress
							Game.villagers[i].tavernGoodsDelivered = true; // always the first NPC to be delivered to
							// chat
							Dom.chat.insert(Dom.chat.say(Game.villagers[i].name, Game.villagers[i].chat.receiveTavernGood));
							// because it thinks a dom page is open
							Dom.currentlyDisplayed = "";
							Dom.currentNPC = {};
						},
						roleRequirement: function () {
							return Dom.inventory.check(item.id, item.type, 1, true, undefined, true); // if they have the item AS A QUEST ITEM
						}
					});
				}
			},

			callQuestFinishOnAbandon: true,

			onQuestFinish: function (npc) {
				// remove all items with the property removeOnAbandon set to the quest name
				for (let i = 0; i < Player.inventory.items.length; i++) {
					if (Player.inventory.items[i].removeOnAbandon === "Hungry Taverners") {
						Dom.inventory.remove(i, true);
					}
				}

				// remove the roll for giving the tavern goods of all the villagers
				for (let i = 0; i < Game.villagers.length; i++) {
					Game.villagers[i].roles.pop();
				}

				// reset the objectives
				this[ToObjectKey(npc.name)].objectives = ["Hand out some tavern goods to people around the tavern", this[ToObjectKey(npc.name)].objectives.pop()];
			}
		},
	],

	fishing: [
		{
			id: 0,
			quest: "Learning to Fish I",
			questArea: "fishing",

			startName: "Fisherman Tobenam",
			startChat: "Heheh, you can't always fish up a fish right away, but you can always fish up some driftwood! Take a fish and see what you're gettin', heh.",

			finishName: "Fisherman Tobenam",
			finishChat: "Heheh, you'll slowly improve at fishing the more you do it.",

			objectives: [
				"Fish something up!",
				"Speak to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Player.stats.fishingSkill > 0);

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong>.",
			levelRequirement: 2,
			questRequirements: ["A Lost Fishing Rod"],

			rewards: {
				xp: 20,
			},
		},

		{
			id: 1,
			quest: "Learning to Fish II",
			questArea: "fishing",

			startName: "Fisherman Tobenam",
			startChat: "What better way to get a fish than to use some bait? Buy a <strong>Can of Worms</strong> from me, and try your luck, heheh.",

			finishName: "Fisherman Tobenam",
			finishChat: "Heheh, your first catch! You'll be good as me in no time...",

			objectives: [
				"Buy a can of worms from Fisherman Tobenam and use it.",
				"Catch your first fish!",
				"Speak to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Player.quests.questProgress.hasUsedBait || false);
				completed.push(Player.quests.questProgress.fishCaught > 0 || false);

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong>.",
			levelRequirement: 2,
			questRequirements: ["Learning to Fish I"],

			rewards: {
				xp: 20,
			},
		},

		{
			id: 2,
			quest: "Learning to Fish III",
			questArea: "fishing",

			startName: "Fisherman Tobenam",
			startChat: "What did I say, you can't get fish all the time without practising! Keep fishing until your skill is level 10... your effort now will be made up for later, heheh. Oh, and don't forget to use up that bait!",

			finishName: "Fisherman Tobenam",
			finishChat: "Wow, well done! You're now a fishing master, heheh, almost. Come back to me every day and I'll give you something to do, heheh.",

			objectives: [
				"Level your base fishing skill to 10.",
				"Speak to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = [];

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(Player.stats.fishingSkill >= 10 ? true : " ("+Round(Player.stats.fishingSkill)+"/10)");

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong>.",
			levelRequirement: 2,
			questRequirements: ["Learning to Fish II"],

			rewards: {
				xp: 50,
			},
		},

		{
			id: 3,
			quest: "A Big Catch",
			questArea: "fishing",

			startName: "Fisherman Tobenam",
			startChat: `How's your fishing going? Reel up 15 items and we'll see, heheh.`,

			finishName: "Fisherman Tobenam",
			finishChat: `Not bad, heheh. I'm glad I taught you how to fish now!`,

			objectives: [
				"Fish up 15 items.",
				"Speak to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = []; // contains true or false for all of the objectives, with the last element being if the quest is ready to complete

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.itemsFishedUp, 15));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong>.",
			levelRequirement: 2,
			questRequirements: ["Learning to Fish III"],
			fishingRequirement: {
				min: 0,
				max: 1000,
			},
			repeatTime: "daily",
			randomGroup: "fishingDaily",

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[3],}, // fishing seal
				],
			},

			resetVariables: [
				"itemsFishedUp",
			],
		},

		{
			id: 4,
			quest: "A Big Splash",
			questArea: "fishing",

			startName: "Fisherman Tobenam",
			startChat: `Heheh, what's the point in fishing if you don't fish up fish? Fish up 10 fish! Heheh.`,

			finishName: "Fisherman Tobenam",
			finishChat: `Heheh, you're getting better and better!`,

			objectives: [
				"Fish up 10 fish.",
				"Speak to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = []; // contains true or false for all of the objectives, with the last element being if the quest is ready to complete

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.fishCaught, 10));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong>.",
			levelRequirement: 2,
			questRequirements: ["Learning to Fish III"],
			fishingRequirement: {
				min: 0,
				max: 1000,
			},
			repeatTime: "daily",
			randomGroup: "fishingDaily",

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[3],}, // fishing seal
				],
			},

			resetVariables: [
				"fishCaught",
			],
		},

		{
			id: 5,
			quest: "A Bigger Splash",
			questArea: "fishing",

			startName: "Fisherman Tobenam",
			startChat: `Today feels like a lucky day, heheh! Fish up lots and test your luck!`,

			finishName: "Fisherman Tobenam",
			finishChat: `Heheh, you sure were lucky!`,

			objectives: [
				"Fish up 25 fish.",
				"Speak to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = []; // contains true or false for all of the objectives, with the last element being if the quest is ready to complete

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.fishCaught, 25));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong>.",
			levelRequirement: 2,
			questRequirements: ["Learning to Fish III"],
			fishingRequirement: {
				min: 0,
				max: 1000,
			},
			repeatTime: "daily",
			randomGroup: "fishingDaily",

			rewards: {
				xp: 50,
				items: [
					{item: Items.currency[3], quantity: 2,}, // fishing seal
				],
			},

			resetVariables: [
				"fishCaught",
			],
		},

		/*{
			id: 6,
			quest: "Plenty of Perch",
			questArea: "fishing",

			startName: "Fisherman Tobenam",
			startChat: `tbd`,

			finishName: "Fisherman Tobenam",
			finishChat: `tbd`,

			objectives: [
				"Fish up 3 yellow perch.",
				"Speak to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = []; // contains true or false for all of the objectives, with the last element being if the quest is ready to complete

				// true or falses for each objective (apart from the turn-in objective)
				completed.push(checkProgress(Player.quests.questProgress.yellowPerchCaught, 3));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to <strong>Fisherman Tobenam</strong>.",
			levelRequirement: 1,
			questRequirements: ["Learning to Fish III"],
			fishingRequirement: {
				min: 0,
				max: 60,
			},
			repeatTime: "daily",

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[3],}, // fishing seal
				],
			},

			resetVariables: [
				"yellowPerchCaught",
			],
		},

		{
			id: 7,
			quest: "Lots o' Fish",
			questArea: "fishing",

			startName: "Fisherman Tobenam",
			startChat: `tbd`,

			finishName: "Fisherman Tobenam",
			finishChat: `tbd`,

			objectives: [
				"Fish up 1 yellow perch.",
				"Fish up 1 saffron cod.",
				"Fish up 1 pink salmon.",
				"Fish up 1 sea trout.",
				"Speak to <strong>Fisherman Tobenam</strong>.",
			],

			isCompleted: function() {
				let completed = []; // contains true or false for all of the objectives, with the last element being if the quest is ready to complete

				// true or falses for each objective (apart from the turn-in objective)
				//completed.push(checkProgress(Player.quests.questProgress.fishCaught, 25));

				completed = checkFinished(completed);

				return completed;
			},

			howToStart: "Speak to Fisherman Tobenam.",
			levelRequirement: 1,
			questRequirements: ["Learning to Fish III"],
			fishingRequirement: {
				min: 0,
				max: 60,
			},
			repeatTime: "daily",

			rewards: {
				xp: 30,
				items: [
					{item: Items.currency[3],}, // fishing seal
				],
			},

			resetVariables: [
				"fishCaught",
			],
		},*/
	],
};

// check if all of the contents of the array are true
// adds the last value to the completed array
function checkFinished (completed) {
	let finished = true;
	for (let i = 0; i < completed.length; i++) {
		if (completed[i] !== true) {
			finished = false;
		}
	}
	completed.push(finished);
	return completed;
}

// return a string that contains the progress for a countable objectives
// currentProgress and requiredProgress should be countable values (currentProgress can be undefined though)
// either false, true, or (x/y)
function checkProgress (currentProgress, requiredProgress) {
	if (currentProgress === undefined || currentProgress === 0) {
		return false;
	}
	else if (currentProgress >= requiredProgress) {
		return true;
	}
	else {
		return "(" + currentProgress + "/" + requiredProgress + ")";
	}
}
