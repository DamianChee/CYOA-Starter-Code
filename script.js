/*-------------------------------- Thoughts ---------------------------------*/

/**
 * Game Start -> Main Menu
 * Main Menu -> New Game / Continue / Options / Credits
 * New Game -> Init
 * Continue -> Load from file / Load from local storage
 *
 * Game Loop:
 * Start of Week -> Do things / Expend Energy? -> End Week
 * End Week -> randomize 5 events -> Start of Next Week
 *
 */

/*-------------------------------- Constants --------------------------------*/

const player = {
  name: "",
  age: 0,
  money: 0,
  inventory: [],
  perks: [],
};

const eventTemplate = {
  id: 0,
  title: "",
  texts: [],
  images: [],
  choices: [],
  probablity: 0,
  updates: {},
};

const events = [
  {
    id: 1,
    title: "event 1",
    texts: ["this is event 1"],
    images: [],
    choices: [],
    probability: 0.5,
    updates: {},
  },
  {
    id: 2,
    title: "event 2",
    texts: ["this is event 2"],
    images: [],
    choices: [],
    probability: 1,
    updates: {},
  },
  {
    id: 3,
    title: "event 3",
    texts: ["this is event 3"],
    images: [],
    choices: [],
    probability: 0.2,
    updates: {},
  },
  {
    id: 4,
    title: "event 4",
    texts: ["this is event 4"],
    images: [],
    choices: [],
    probability: 0.75,
    updates: {},
  },
  {
    id: 5,
    title: "event 5",
    texts: ["this is event 5"],
    images: [],
    choices: [],
    probability: 0.1,
    updates: {},
  },
  {
    id: 6,
    title: "event 6",
    texts: ["this is event 6"],
    images: [],
    choices: [],
    probability: 0.5,
    updates: {},
  },
  {
    id: 7,
    title: "event 7",
    texts: ["this is event 7"],
    images: [],
    choices: [],
    probability: 1,
    updates: {},
  },
  {
    id: 8,
    title: "event 8",
    texts: ["this is event 8"],
    images: [],
    choices: [],
    probability: 0.2,
    updates: {},
  },
  {
    id: 9,
    title: "event 9",
    texts: ["this is event 9"],
    images: [],
    choices: [],
    probability: 0.75,
    updates: {},
  },
  {
    id: 10,
    title: "event 10",
    texts: ["this is event 10"],
    images: [],
    choices: [],
    probability: 0.1,
    updates: {},
  },
];

const weeklyEvents = [];

/*-------------------------------- Variables --------------------------------*/

let gameState = "";
let gameWeeks = 0;

/*------------------------ Cached Element References ------------------------*/

const root = document.querySelector("#root");

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener("keydown", handleInput);
root.addEventListener("click", null);

/*-------------------------------- Functions --------------------------------*/

function init() {
  // Initialize state
  gameState = "INIT";
  gameWeeks = 1;

  // Initialize player
  player.name = "";
  player.age = 0;
  player.money = 0;
  player.inventory = [];
  player.perks = [];

  // Initialize events
  weeklyEvents.length = 0;

  // loggers
  console.log(gameState);
  console.log(player);

  gameState = "WEEK START";
  createWeekStartUI();
  createInstructionUI();
}

function endWeek() {
  deleteUI();
  createWeekStartUI();

  const genEvents = document.createElement("div");
  genEvents.innerText = "Generating events... Hit Enter to continue!";
  root.append(genEvents);

  const numOfEvents = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numOfEvents; ++i) {
    const index = Math.floor(Math.random() * events.length);
    weeklyEvents.push(events[index]);
  }
  console.log(weeklyEvents);
}

function handleInput(event) {
  switch (event.code) {
    case "Escape":
      if (gameState === "QUIT") gameState = "QUIT CANCELLED";
      else gameState = "QUIT";
      break;
    case "Enter":
      if (gameState === "QUIT") {
        gameState = "QUIT CONFIRMED";
        init();
      } else if (gameState === "WEEK START") {
        gameState = "WEEK ENDED";
        endWeek();
      } else if (weeklyEvents.length) {
        deleteUI();
        const ev = weeklyEvents.shift();
        createEventUI(ev);
        console.log(ev);
        console.log(`${weeklyEvents.length} weekly events left`);
      } else if (!weeklyEvents.length) {
        ++gameWeeks;
        gameState = "WEEK START";
        deleteUI();
        createWeekStartUI();
        createInstructionUI();
      }
      break;
    default:
      console.log(event.code);
  }
  console.log(gameState);
}

function createEventUI(ev) {
  const title = document.createElement("div");
  title.innerText = ev.title;
  const textArray = [];
  for (let i = 0; i < ev.texts.length; ++i) {
    const text = document.createElement("div");
    text.innerHTML = ev.texts[i];
    textArray.push(text);
  }

  root.append(title);
  for (let i = 0; i < textArray.length; ++i) {
    root.append(textArray[i]);
  }
}

function createWeekStartUI() {
  const title = document.createElement("div");
  title.innerText = `Week ${gameWeeks}`;
  root.append(title);
}

function createInstructionUI() {
  const text = document.createElement("div");
  text.innerText = "Hit Enter to continue!";
  root.append(text);
}

function deleteUI() {
  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }
}

init();
