"use strict";
const player = {
    name: "Hero",
    health: 100,
    attack: 15,
    inventory: ["potion", "potion"]
};
const enemies = [
    { name: "Goblin", health: 50, attack: 10 },
    { name: "Orc", health: 80, attack: 18 },
    { name: "Troll", health: 120, attack: 25 },
    { name: "Dragon", health: 200, attack: 40 }
];
function spawnEnemy() {
    const randomIndex = Math.floor(Math.random() * enemies.length);
    return { ...enemies[randomIndex] };
}
function getRandomDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function logMessage(message) {
    const log = document.getElementById("combat-log");
    const entry = document.createElement("p");
    entry.textContent = message;
    log.appendChild(entry);
}
function usePotion() {
    player.inventory = player.inventory.filter((item, index) => index !== 0);
    player.health = Math.min(player.health + 30, 100);
    console.log(player.health);
    document.getElementById("player-health").innerHTML = player.health.toString();
    document.getElementById("potion-count").textContent = player.inventory.length.toString();
}
function attackEnemy(attacker, defender, lower, upper) {
    const dmg = getRandomDamage(lower, upper);
    defender.health -= dmg;
    logMessage(`${attacker.name} attacked ${defender.name} for ${dmg} damage. ${defender.name} has ${defender.health} health left.`);
}
function resetGame() {
    player.health = 100;
    enemy = spawnEnemy();
    document.getElementById("player-health").innerHTML = player.health.toString();
    document.getElementById("enemy-name").textContent = enemy.name;
    document.getElementById("enemy-health").textContent = enemy.health.toString();
    document.getElementById("combat-log").innerHTML = "";
    document.getElementById("game-message").textContent = "";
    player.inventory = ["potion", "potion"];
    document.getElementById("potion-count").textContent = player.inventory.length.toString();
    potion.disabled = false;
}
let enemy = spawnEnemy();
console.log("Enemy Spawned:", enemy);
document.getElementById("enemy-name").textContent = enemy.name.toString();
document.getElementById("enemy-health").textContent = enemy.health.toString();
let element = document.getElementById("attack-btn");
let new_game = document.getElementById("new-game-btn");
let potion = document.getElementById("use-potion");
element.addEventListener("click", function () {
    if (player.health > 0 && enemy.health > 0) {
        attackEnemy(player, enemy, 10, 20);
        attackEnemy(enemy, player, 5, 15);
        document.getElementById("player-health").textContent = player.health.toString();
        document.getElementById("enemy-health").textContent = enemy.health.toString();
    }
    else {
        if (player.health <= 0) {
            document.getElementById("player-health").textContent = "0";
            document.getElementById("game-message").textContent = "YOU LOSE";
            element.disabled = true;
        }
        else {
            document.getElementById("enemy-health").textContent = "0";
            document.getElementById("game-message").textContent = "YOU WIN";
            element.disabled = true;
        }
    }
});
new_game.addEventListener("click", function () {
    resetGame();
});
potion.addEventListener("click", function () {
    if (player.inventory.length > 0) {
        usePotion();
        if (player.inventory.length == 0) {
            potion.disabled = true;
        }
    }
});
