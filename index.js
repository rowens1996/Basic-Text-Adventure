class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character = "";
    this._roomItem = "";
    this._unlockItem = "";
  }

  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get roomItem() {
    return this._roomItem;
  }
  get character() {
    return this._character;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("name must be 4 or more characters"); //change or remove
      return;
    }
    this._name = value;
  }
  set description(value) {
    if (value.length < 4) {
      console.log("Room description too short"); //change or remove
      return;
    }
    this._name = value;
  }

  set roomItem(value) {
    this._roomItem = value;
  }

  set character(value) {
    this._character = value;
  }

  get unlockItem() {
    return this._unlockItem;
  }

  set unlockItem(value) {
    this._unlockItem = value;
  }

  describe() {
    return "This is the " + this._name + " , You can see " + this._description;
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      if (this._unlockItem !== "") {
        if (checkInvetory(this._unlockItem) === false) {
          alert("You do not have the item to go this direction")
          return this;
        }
      }
      return this._linkedRooms[direction];
    } else {
      alert("There is not exit to the " + direction + ".")
      return this;
    }
  }
}

class Character {
  constructor(name, description, dialogue, state) {
    this._name = name;
    this._description = description;
    this._dialogue = dialogue;
    this._state = state;
  }

  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get dialogue() {
    return this._dialogue;
  }

  set name(value) {
    this._name = value;
  }
  set dialogue(value) {
    if (value.length < 10) {
      console.log("dialogue too short");
      return;
    }
    this._dialogue = value;
  }

  describe() {
    return (
      "This is " +
      this._name +
      " you would describe them as " +
      this._description
    );
  }

  talk() {
    if (this._name == "Friend") {
      inventory.push("a passcode")
    }
    return (
      "You try to start a conversation with " +
      this._name +
      "<br>" +
      this._dialogue
    );
  }
}

class Target extends Character {
  constructor(name, description, dialogue, state, specialItem, drop) {
    super(name, description, dialogue, state);
    this._specialItem = specialItem;
    this._drop = drop;
    this._state = 1;
  }
  get specialItem() {
    return this._specialItem;
  }
  get drop() {
    return this._drop;
  }
  set specialItem(value) {
    this._specialItem = value;
  }
  set drop(value) {
    this._drop = value;
  }

  fight() {
    if (this._specialItem !== null) {
      if (checkInvetory(this.specialItem)) {
        //description of fight to display
        return true;
      } else {
        //describe defeat and force game over but removing inputbox
        return false;
      }
    }
  }

  defeated() {
    return (
      "You have defeated " +
      this._name +
      " they dropped " +
      this._drop +
      " you may find a use for this"
    );
  }

  loot() {
    inventory.push(this._drop);
    return `you found ${this._drop}`;
  }
}

class Item {
  constructor(name, description, state, specialItem, drop) {
    this._name = name;
    this._description = description;
    this._state = state; //`0 out-of-play, 1 in game world but not found, 2 in player inventory`
    this._specialItem = specialItem;
    this._drop = drop;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get state() {
    return this._state;
  }
  get specialItem() {
    return this._specialItem;
  }
  get drop() {
    return this._drop;
  }
  set name(value) {
    if (value.length < 3) {
      return;
    }
    this._name = value;
  }
  set description(value) {
    if (value.length < 10) {
      return;
    }
    this._description = value;
  }
  set state(value) {
    this._state = value;
  }
  set specialItem(value) {
    this._specialItem = value;
  }
  set drop(value) {
    this._drop = value;
  }

  describe() {
    return this._name + " is " + this._description;
  }
}

//Rooms
let rooms = [
  (Room1 = new Room(
    "Start",
    "this is the start, there is a door to the north of you.",
  )),
  (Room2 = new Room(
    "Enemy Room",
    "in the room is a enemy and a padlocked door to the north",
  )),
  (Room3 = new Room(
    "Friend Room",
    "here there is a friend and a passcode locked door to the north"
  )),
  (Room4 = new Room(
    "End",
    "this is the final room there is a item on the floor",
  )),
];

//Character objects name, description, dialogue
let characters = [
  (character1 = new Target(
    "Enemy",
    "the enemy is unaware of you presence and facing away, they have a key attached to thier belt",
    "you should have shot me before I shot you <br> *bang* <i>he shot you with his own gun</i> <b>NEED A BAD END SCREEN</b>",
    1,
    "a gun",
    "a key"
  )),
  (character2 = new Character(
    "Friend",
    "this friendly character looks eager to tell you something",
    "Hello friend, you want to pass through the door? <br> I can unlock it for you"
  )),
];

//Item objects names, description, game state
let allItems = [
  (item1 = new Item("a gun", "you can shoot someone with this", 2)),
  (item2 = new Item("a key", "this key looks like it fits into a door", 1)),
  (item3 = new Item(
    "a winner's trophy",
    "you cant be a winner without a trophy 'type win to obviously win :)'",
    1
  )),
];

let inventory = [];

function gameWorldItems() {
  //might be to complex to implement
  for (let i of allItems) {
    if (i.state === 2) {
      inventory.push(i.name);
    }
  }
}
gameWorldItems();
function displayInventory() {
  document.getElementById("textArea").innerHTML =
    "In your inventory you have: " + inventory;
}
function checkInvetory(item) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] === item) {
      return true;
    }  
  }
  return false;
}

//Linking Rooms
Room1.linkRoom("north", Room2);

Room2.linkRoom("north", Room3);
Room2.linkRoom("south", Room1);

Room3.linkRoom("north", Room4);
Room3.linkRoom("south", Room2);

Room4.linkRoom("south", Room3);
//Locking Rooms
Room2.unlockItem = "a key";
Room3.unlockItem = "a passcode";
//Populate Rooms
//items
Room4.roomItem = item3;
//characters
Room2.character = character1;
Room3.character = character2;

function displayRoom(room) {
  textContent = room.describe();
  document.getElementById("textArea").innerHTML = textContent;
  document.getElementById("input").focus();
}

//character commands
function commandHandler1(command, character, roomItem) {
  let output = [];
  if (character == "" && roomItem =="") {
    output = "there is nothing in the room to do that to";
  } else {
    switch (command) {
      case "talk":
        output = character.talk();
        break;
      case "fight":
        if (character.fight(character) === true) {
          //need to define
          output = character.defeated(); //need to define
          character.loot(); //not sure if this works
        }
        break;
        case "take":
          {
            inventory.push(roomItem);
          }
          output = "You pick up " + roomItem.describe()
        break;
        case "win":
          if(checkInvetory(item3))
          output = "congratulations you have won"
    }
  }
  document.getElementById("textArea").innerHTML = output;
}
function startGame() {
  let currentRoom = Room1;
  displayRoom(currentRoom);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let command = document.getElementById("input").value.toLowerCase();
      const direction = ["north", "east", "south", "west", "up", "down"];
      const actionChar = ["talk", "fight", "take", "win"];
      if (direction.includes(command)) {
        currentRoom = currentRoom.move(command);
        displayRoom(currentRoom);
      } else if (actionChar.includes(command)) {
        commandHandler1(command, currentRoom.character, currentRoom.roomItem);
        //} else if (actionItem.includes(command)) {
        //  commandHandler2(command, item.player) //probably not how to do this
      } else {
        alert("invalid command");
      }
    }
  });
}
startGame();
