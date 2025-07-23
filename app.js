let cps = 0;
let points = 0;
let clickMultiplier = 1;
let currentExtraIndex = 0;
const scoreDisplay = document.getElementById("score");
const clickButton = document.getElementById("click-button");



clickButton.addEventListener("click", () => {
  points += 1 * clickMultiplier;
  clickButton.classList.add("clicked");
  setTimeout(() => {
    clickButton.classList.remove("clicked");
  }, 100);
});

function updateScore() {
  scoreDisplay.textContent = "Points: " + Math.floor(points);
  document.getElementById("cps").textContent = "CPS: " + totalCPS.toFixed(1);
}

const clickArea = document.getElementById("click-area");
function createRainingCat() {
  const cat = document.createElement("img");
  const randomCat = Math.floor(Math.random() * 8) + 1;
  cat.src = `kitties/kit${randomCat}.png`;
  cat.classList.add("raining-cat");
  cat.style.left = `${Math.random() * 100}%`;
  document.querySelector("#click-area").appendChild(cat);
  cat.addEventListener("animationend", () => {
    cat.remove();
  });
}
setInterval(createRainingCat, 300);

const extraUpgrades = [
  {
    name: "Double Click I",
    image: "extra/double1.png",
    price: 1000,
    effect: "2x click",
    bought: false,
    description: "The kitty Gods have blessed you with a double click, purchase this upgrade and be blessed with your clicks doubling.",
    id: "double1"
  },
  {
    name: "Double Click II",
    image: "extra/double2.png",
    price: 5000,
    effect: "2x click",
    bought: false,
    description: "The Ancient ones have blessed you again, you know what it does.",
    id: "double2",
    showWhenBought: "double1"
  },
  {
    name: "Double Click III",
    image: "extra/double3.png",
    price: 20000,
    effect: "2x click",
    bought: false,
    description: "Benedicere, puer, nam apicem vim pulsandi assecutus es.",
    id: "double3",
    showWhenBought: "double2"
  },
  {
    name: "Logic Potion",
    image: "extra/potion_l.png",
    price: 15000,
    effect: "potion",
    bought: false,
    description: "Make your kitties smarter, maybe they will finally use their cat towers(20% boost to kitty paws & cat towers)",
    id: "logicPotion"
  },
  {
    name: "Speed Potion",
    image: "extra/potion_s.png",
    price: 30000,
    effect: "potion",
    bought: false,
    description: "I AM SPEEEEEEEEEEEEEEED (10% boost to total CPS)",
    id: "speedPotion"
  },
  {
    name: "Catnip Potion",
    image: "extra/potion_c.png",
    price: 50000,
    effect: "potion",
    bought: false,
    description: "Jesse, we need to cook some.... Catnip?!(20% Boost to catnip)",
    id: "catnipPotion"
  }
];

const upgrades = [
  { name: "Kitty Paw", image: "upgrades/paw.png", price: 10, cps: 0.1, description: "Simple and plain, don't tell david's parents he owns a pair.", count: 0 },
  { name: "Ball of Yarn", image: "upgrades/yarn.png", price: 50, cps: 0.5, description: "Haha Ball, effective for playfull cats.", count: 0 },
  { name: "Milk", image: "upgrades/milk.png", price: 150, cps: 5, description: "Or is it? there's only one way to find out...", count: 0 },
  { name: "Cat Tower", image: "upgrades/tower.png", price: 500, cps: 20, description: "No they didn't hit the second one, or did they?", count: 0 },
  { name: "Laser Pointer", image: "upgrades/laser.png", price: 1000, cps: 25, description: "WHERE? MUST FIND RED DOT! >:(", count: 0 },
  { name: "Fish Farm", image: "upgrades/farm.png", price: 2500, cps: 50, description: "Poor kitty needs your help to start a fish farm, don't be mean...", count: 0 },
  { name: "Catnip Farm", image: "upgrades/catnip.png", price: 5000, cps: 70, description: "Legal in most places, drives cats crazy ;)", count: 0 },
  { name: "Luxury Bed", image: "upgrades/bed.png", price: 10000, cps: 130, description: "Soft kitty,\n Warm kitty,\n Little ball of fur.\n Happy kitty,\n Sleepy kitty,\n Purr Purr Purr\nSoft kitty,\n Warm kitty,\n Little ball of fur.\n Happy kitty,\n Sleepy kitty,\n Purr Purr Purr", count: 0 },
  { name: "Cat Castle", image: "upgrades/castle.png", price: 20000, cps: 190, description: "Your personal kingdom, you earned it.", count: 0 },
  { name: "Royal Cat Servants", image: "upgrades/servant.png", price: 50000, cps: 250, description: "Your majestry, here to serve you, Purrrrrrrfection!", count: 0 },
  { name: "Spaceship", image: "upgrades/spaceship.png", price: 100000, cps: 400, description: "Purrfect for new adventures!", count: 0 }
];
 
const upgradeContainer = document.getElementById("upgrade-cards");
let totalCPS = 0;

function updateTotalCPS() {
  const logicPotion = extraUpgrades.find(
    upg => upg.name === "Logic Potion" && upg.bought
  );
  const speedPotion = extraUpgrades.find(
    upg => upg.name === "Speed Potion" && upg.bought
  );
  const catnipPotion = extraUpgrades.find(
    upg => upg.name === "Catnip Potion" && upg.bought
  );

  totalCPS = upgrades.reduce((sum, upgrade) => {
    let cps = upgrade.cps;

    if (logicPotion && (upgrade.name === "Kitty Paw" || upgrade.name === "Cat Tower")) {
      cps *= 1.2;
    }

    if (speedPotion) {
      cps *= 1.1;
    }

    if (catnipPotion && upgrade.name === "Catnip Farm") {
      cps *= 1.2;
    }

    return sum + upgrade.count * cps;
  }, 0);
}

let totalPointsSpent = 0;
const gameStartTime = Date.now();
const statsButton = document.getElementById("stats-button");
const statsPanel = document.getElementById("stats-panel");

statsButton.addEventListener("click", () => {
  if (statsPanel.style.display === "none") {
    updateStats();
    statsPanel.style.display = "block";
    statsButton.textContent = "Hide Stats";
  } else {
    statsPanel.style.display = "none";
    statsButton.textContent = "Show Stats";
  }
});

function updateStats() {
  const secondsPlayed = Math.floor((Date.now() - gameStartTime) / 1000);
  document.getElementById("time-played").textContent = `${secondsPlayed}s`;
  document.getElementById("points-spent").textContent = Math.floor(totalPointsSpent);
  const upgradesList = document.getElementById("upgrades-bought-list");
  upgradesList.innerHTML = "";

  upgrades.forEach(upg => {
    if (upg.count > 0) {
      const li = document.createElement("li");
      li.textContent = `${upg.name}: ${upg.count}`;
      upgradesList.appendChild(li);
    }
  });

  const boughtExtra = extraUpgrades.filter(upg => upg.bought);
  if (boughtExtra.length > 0) {
    const li = document.createElement("li");
    li.textContent = "Extra Upgrades:";
    li.style.fontWeight = "bold";
    upgradesList.appendChild(li);
    boughtExtra.forEach(upg => {
      const extraLi = document.createElement("li");
      extraLi.textContent = `- ${upg.name}`;
      extraLi.style.marginLeft = "15px";
      upgradesList.appendChild(extraLi);
    });
  }
}

function spendPoints(amount) {
  points -= amount;
  totalPointsSpent += amount;
}

const extraUpgradeContainer = document.getElementById("extra-upgrade-cards");
function buyUpgrade(index) {
  const upgrade = upgrades[index];
  if (points >= upgrade.price) {
    points -= upgrade.price;
    upgrade.count = (upgrade.count || 0) + 1;
    upgrade.price *= 1.15;

    totalCPS += upgrade.cps; // 💡 Increase totalCPS

    renderUpgrades();
    updateScore();
  }
}


function buyExtraUpgradeById(id) {
  const upgrade = extraUpgrades.find(u => u.id === id);
  if (!upgrade || upgrade.bought || points < upgrade.price) return;

  points -= upgrade.price;

  // Handle effect of 2x click upgrades:
  if (upgrade.effect === "2x click") {
    clickMultiplier *= 2;
  }

  // Mark bought and update UI
  upgrade.bought = true;

  updateScore();
  renderExtraUpgrades(); // To update which upgrades are shown next
}

function renderUpgrades() {
  upgradeContainer.innerHTML = "";
  upgrades.forEach((upgrade, index) => {
    const card = document.createElement("div");
    card.className = "upgrade-card";
    card.innerHTML = `
      <img src="${upgrade.image}" alt="${upgrade.name}">
      <div class="upgrade-info">
        <div class="upgrade-name">${upgrade.name}</div>
        <div class="upgrade-price" id="price-${index}">Price: ${Math.floor(upgrade.price)}</div>
        <div class="upgrade-cps">CPS: ${upgrade.cps}</div>
      </div>
    `;

    // ✅ Add tooltip events here
    card.addEventListener("mousemove", (e) => {
      showTooltip(upgrade.description, e);
    });
    card.addEventListener("mouseleave", hideTooltip);

    card.addEventListener("click", () => buyUpgrade(index));
    upgradeContainer.appendChild(card);
  });
}


function renderExtraUpgrades() {
  extraUpgradeContainer.innerHTML = "";

  extraUpgrades.filter(upg => {
    if (upg.bought) return false;
    if (upg.showWhenBought) {
      const prereq = extraUpgrades.find(u => u.id === upg.showWhenBought);
      return prereq && prereq.bought;
    }
    return true;
  }).forEach((upgrade) => {
    const card = document.createElement("div");
    card.className = "upgrade-card";
    card.innerHTML = `
      <img src="${upgrade.image}" alt="${upgrade.name}" class="upgrade-img">
      <div class="upgrade-info">
        <strong>${upgrade.name}</strong>
        <p>Price: ${upgrade.price}</p>
      </div>
    `;

    // ✅ Add tooltip handlers
    card.addEventListener("mousemove", (e) => {
      showTooltip(upgrade.description, e);
    });
    card.addEventListener("mouseleave", hideTooltip);

    card.addEventListener("click", () => buyExtraUpgradeById(upgrade.id));
    extraUpgradeContainer.appendChild(card);
  });
}



function updateUpgradePrice(index, newPrice) {
  const priceElement = document.getElementById(`price-${index}`);
  if (priceElement) {
    priceElement.textContent = `Price: ${Math.floor(newPrice)}`;
  }
}


const tooltip = document.getElementById('tooltip');

function showTooltip(text, event) {
  tooltip.textContent = text;
  tooltip.style.display = 'block';
  positionTooltip(event);
}



function hideTooltip() {
  tooltip.style.display = 'none';
}

function positionTooltip(event) {
  const padding = 10; // distance from cursor
  const tooltipRect = tooltip.getBoundingClientRect();
  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;

  let x = event.clientX + padding;
  let y = event.clientY + padding;

  // If tooltip goes beyond right edge, move it left
  if (x + tooltipRect.width > pageWidth) {
    x = event.clientX - tooltipRect.width - padding;
  }

  // If tooltip goes beyond bottom edge, move it above cursor
  if (y + tooltipRect.height > pageHeight) {
    y = event.clientY - tooltipRect.height - padding;
  }

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

function saveGame() {
  const saveData = {
    points,
    clickMultiplier,
    upgrades: upgrades.map(upg => ({
      count: upg.count,
      price: upg.price
    })),
    extraUpgrades: extraUpgrades.map(upg => ({
      id: upg.id,
      bought: upg.bought
    })),
    totalPointsSpent,
    gameStartTime: Date.now() - (Date.now() - gameStartTime)
  };

  localStorage.setItem("catClickerSave", JSON.stringify(saveData));
}

function loadGame() {
  const data = JSON.parse(localStorage.getItem("catClickerSave"));
  if (!data) return;

  points = data.points || 0;
  clickMultiplier = data.clickMultiplier || 1;

  if (data.upgrades) {
    data.upgrades.forEach((savedUpg, i) => {
      if (upgrades[i]) {
        upgrades[i].count = savedUpg.count || 0;
        upgrades[i].price = savedUpg.price || upgrades[i].price;
      }
    });
  }

  if (data.extraUpgrades) {
    data.extraUpgrades.forEach(savedExtra => {
      const upg = extraUpgrades.find(u => u.id === savedExtra.id);
      if (upg) upg.bought = savedExtra.bought;
    });
  }

  totalPointsSpent = data.totalPointsSpent || 0;

  // Optional: adjust gameStartTime if using session-based stats
}


loadGame();



renderUpgrades();
renderExtraUpgrades();
updateTotalCPS();
setInterval(() => {
  points += totalCPS / 10;
  updateScore();
}, 100);
setInterval(() => {
  points += cps;
  updateScore();
}, 1000); // every 1 second

setInterval(saveGame, 1000); // autosave every 10 seconds
