var Skins = {
	a: [
		{
			id: 0,
			position: {x: -6.7, y: Infinity},
			name: "Green Archer",
			gender:	"m",
			projectile:	"arrow",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 0, y: 0},
		},
		{
			id: 1,
			position: {x: -6.7, y: Infinity},
			name: "Blue Archer",
			gender:	"f",
			projectile:	"arrow",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 0, y: 0},
		},
		{
			id: 2,
			position: {x: 20, y: Infinity},
			name: "Jungle Hunter",
			gender:	"m",
			projectile:	"blueBeam",
			projectileAdjust: {x: 20, y: 20},
			cursor: "jungleHunter",
			cursorPosition: {x: 9.5, y: 8},
			headAdjust: {x: 12, y: 0},
		},
		{
			id: 3,
			position: {x: Infinity, y: 6.7},
			name: "Were-Spider",
			gender:	"m",
			projectile:	"arrowOrange",
			projectileAdjust: {x: 20, y: 20},
			cursor: "spooky",
			cursorPosition: {x: 10, y: 10},
			headAdjust: {x: 10, y: 0},
		},
		{
			id: 4,
			position: {x: Infinity, y: Infinity},
			name: "Snow Elf",
			gender:	"m",
			projectile:	"snowball",
			projectileAdjust: {x: 0, y: 0},
			cursor: "chilly",
			cursorPosition: {x: 10, y: 10},
			headAdjust: {x: 10, y: 0},
		},
		{
			id: 5,
			position: {x: Infinity, y: Infinity},
			name: "Steel Man",
			gender:	"m",
			projectile:	"redBeam",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 10, y: 2},
		},
	],
	m: [
		{
			id: 0,
			position: {x: -10, y: 20},
			name: "Purple Mage",
			gender:	"m",
			projectile:	"fireball",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 0, y: 0},
		},
		{
			id: 1,
			position: {x: -10, y: 20},
			name: "Blue Mage",
			gender:	"f",
			projectile:	"fireball",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 0, y: 0},
		},
		{
			id: 2,
			position: {x: -20, y: Infinity},
			name: "Spirit Buster",
			gender:	"m",
			projectile:	"spiritBuster",
			projectileAdjust: {x: 0, y: 0},
			cursor: "crosshair",
			animations: {
				onHit: {
					type: "beam",
					width: 10,
					colour: "#D05C05"
					//gradient: {"0": "#e28909","1": "#e23e09",},
				}
			},
			headAdjust: {x: 8, y: 0},
		},
		{
			id: 3,
			position: {x: -20, y: -6.7},
			name: "Wicked Witch",
			gender:	"m",
			projectile:	"fireballGreen",
			projectileAdjust: {x: 20, y: 20},
			cursor: "spooky",
			cursorPosition: {x: 10, y: 10},
			headAdjust: {x: 5, y: 12},
		},
		{
			id: 4,
			position: {x: -10, y: 5},
			name: "Father Christmas",
			gender:	"m",
			projectile:	"bauble",
			projectileAdjust: {x: -5.5, y: -5.5},
			cursor: "chilly",
			cursorPosition: {x: 10, y: 10},
			headAdjust: {x: 0, y: 0},
		},
		{
			id: 5,
			position: {x: -6.7, y: 10},
			name: "The Lord of Thunder",
			gender:	"m",
			projectile:	"lightningBall",
			projectileAdjust: {x: 0, y: 0},
			cursor: "crosshair",
			headAdjust: {x: 0, y: 0},
		},
	],
	k: [
		{
			id: 0,
			position: {x: -6.7, y: -10},
			name: "Blue Knight",
			gender:	"m",
			projectile:	"slash",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 0, y: 0},
		},
		{
			id: 1,
			position: {x: -6.7, y: -10},
			name: "Red Knight",
			gender:	"f",
			projectile:	"slash",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 0, y: 0},
		},
		{
			id: 2,
			position: {x: -20, y: Infinity},
			name: "Wisconsin Jones",
			gender:	"m",
			projectile:	"slash",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 6, y: 0},
		},
		{
			id: 3,
			position: {x: -6.7, y: 10},
			name: "Animated Scarecrow",
			gender:	"m",
			projectile:	"slashBlood",
			projectileAdjust: {x: 20, y: 20},
			cursor: "spooky",
			cursorPosition: {x: 10, y: 10},
			headAdjust: {x: -2, y: 0},
		},
		{
			id: 4,
			position: {x: Infinity, y: -20},
			name: "The Yeti",
			gender:	"m",
			projectile:	"slashFrost",
			projectileAdjust: {x: 20, y: 20},
			cursor: "chilly",
			cursorPosition: {x: 10, y: 10},
			headAdjust: {x: 10, y: 0},
		},
		{
			id: 5,
			position: {x: Infinity, y: 20},
			name: "Captain Antorax",
			gender:	"m",
			projectile:	"slashRedWhite",
			projectileAdjust: {x: 20, y: 20},
			cursor: "crosshair",
			headAdjust: {x: 10, y: 0},
		},
	],
};

var Offsets = {
	cartDriver: {image: "assets/npcs/driver", x: 83, y: -15},
	weaponsmith: {image: "assets/npcs/weaponsmith", x: 75, y: -10},
	fishermanTobenam: {image: "assets/npcs/fisherman", x: -10, y: -10},
	marshallTeper: {image: "assets/npcs/teper", x: 117, y: -10},
	combatTrainerSaral: {image: "assets/npcs/saral", x: 71, y: -10},
	eaglecrestMailman: {image: "assets/npcs/mailman", x: 140, y: -10},
	identifierGilas: {image: "assets/npcs/identifier", x: 120, y: -10},
	soulHealerNalaa: {image: "assets/npcs/soulHealer", x: 110, y: -10},
	galuthelTheTrapMechanic: {image: "assets/npcs/galuthel", x: 83, y: 0},
	itemBuyerNoledar: {image: "assets/npcs/itemBuyer", x: -5, y: -10},
	ciarraDarkbrew: {image: "assets/npcs/darkbrew", x: 30, y: -10},
	gregorGoldenbrew: {image: "assets/npcs/innkeeper", x: 115, y: -20},
	goblinTorch: {image: "assets/items/staff/7", x: 0, y: 0},
	samhainGhost: {image: "assets/npcs/ghost", x: 83, y: -10},
	fatherChristmas: {image: "assets/player/m4", x: 13, y: -1.5},
	goblinRockthrower: {image: "assets/enemies/goblinRockthrower", x: 45, y: -15},
	goblinBruiser: {image: "assets/enemies/goblinBruiser", x: 10, y: -15},
	goblinCrusader: {image: "assets/enemies/goblinCrusader", x: -200, y: -10},
	goblinKing: {image: "assets/enemies/goblinKing", x: 57, y: 0},
	eaglecrestKing: {image: "assets/npcs/king", x: 33, y: -5},
	lordOfThunder: {image: "assets/player/m5", x: 19, y: -2},
	alysLoreworth: {image: "assets/npcs/alysLoreworth", x: 225, y: -2},
};
