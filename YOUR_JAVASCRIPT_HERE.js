// Write your JS here
const hero = {
    name : 'Player',
    heroic : true,
    inventory : [],
    health : 10,
    weapon : {
        type : 'fork',
        damage : 2
    }
};

const dagger = {
    type : 'dagger',
    damage : 2
}

const enemy = {
    name : 'slak',
    inventory : [],
    health : Math.round(Math.random()*4+6), //6-10
    weapon : {
        type : 'slime',
        damage : Math.round(Math.random()+2)//2 or 3
    }
};

//rest function
const rest = (hero) => {
    if (hero.health === 10) {
        alert('Full health. No need to rest!');
    } else {
        hero.health = 10;
        return hero;
    }
};

//pick up item
const pickUpItem = (hero, weapon) => {
    hero.inventory.push(weapon);
};

//equip weapon
const equipWeapon = (hero) => {
    if(hero && hero.inventory.length) {
        hero.weapon = hero.inventory[0];
        displayMsg(`Equipped a ${hero.weapon.type}, damage ${hero.weapon.damage}`);
        displayStats(hero);
    }
};

//fight agian enemy, enemy removed from page if killed.
const fight = (hero, enemy) => {
    hero.health -= enemy.weapon.damage;
    enemy.health -= hero.weapon.damage;
    if ( hero.health <= 0 ) {
        displayMsg('Game over!');
    } else {
        if( enemy.health <= 0 ) {
            displayMsg('Enemy is killed.')
            document.getElementById('slak').remove();
        } else {           
            displayStats(hero);
            if ( hero.health <= 4 ) {
                displayMsg('Health is low. Rest to restore.');
            }        
        }
    }
};

//say welcome
const greet = (hero) => {
    displayMsg(`Welcome, ${hero.name}!`);
};

//function that writes hero's name, health, weapontype, weapon damage to the page
const displayStats = (hero) => {
    const msg = document.getElementById('msg');
    document.getElementById('status').innerHTML = `Name: ${hero.name} <br> Health: ${hero.health} <br> Weapon type: ${hero.weapon.type} <br> Weapon damage: ${hero.weapon.damage}`;
}

//display message
const displayMsg = (msg) => {
    document.getElementById('msg').innerHTML = msg;
};

//change name prompt
const changeHeroName = () => {   
        const newName = prompt("Please enter your name", "Bob");
        if (name != null) {
            hero.name = newName;
          greet(hero);
        }    
}

//listeners
document.getElementById('inn').addEventListener('click', () => {
    rest(hero);
    displayMsg('Health restored.');
    displayStats(hero);
});
document.getElementById('dagger').addEventListener('click', function() {
    pickUpItem(hero, dagger);
    //console.log(this);
    this.remove();
    displayMsg(`Picked up ${hero.inventory[hero.inventory.length-1].type}, damage ${hero.inventory[hero.inventory.length-1].damage}`);
    displayStats(hero);
});
document.getElementById('bag').addEventListener('click', () => equipWeapon(hero));
document.getElementById('slak').addEventListener('click', () => {
    fight(hero, enemy);
});
// document.querySelectorAll('.slak').forEach( (item) => {
//         item.addEventListener('click', () => fight(hero, enemy));
// });
document.getElementById('changeNameButton').addEventListener('click', changeHeroName);

window.onload = () => {
    greet(hero);
    displayStats(hero);
};