class SoloManager {
    constructor() {
        this.load();
    }

    load() {
        const data = localStorage.getItem('soloData');
        this.data = data ? JSON.parse(data) : {
            name: "Yuki",
            status: {
                xp: 0,
                coins: 0,
                points: 0,
                retries: 0,
                level: 1,
                demands: {
                    quests: 0,
                    xp: 0,
                    modes: 0,
                    skippers: 0,
                    unlockers: 0
                }
            },
            quests: {
                active: [],
                completed: [],
                failed: [],
                available: []
            },
            events: {
                active: [],
                completed: [],
                failed: [],
                available: []
            },
            store: {
                shop: [],
                exchange: [],
            }
        };
    }

    update() {
        this.load();

        // update the name of the user
        document.getElementById('name').innerText = this.data.name;
        document.getElementById('name-top').innerText = this.data.name;

        // update the level of the user
        document.getElementById('level').innerText = this.data.status.level;

        // update the xp of the user
        document.getElementById('xp').innerText = this.data.status.xp;

        // update the coins of the user
        document.getElementById('coins').innerText = this.data.status.coins;
    }

    save() {
        localStorage.setItem('soloData', JSON.stringify(this.data));
    }

    createItem(type, category, item) {
        if (!this.data[type] || !this.data[type][category]) {
            console.error('Invalid type or category');
            return;
        }
        this.data[type][category].push(item);
        this.save();
    }

    editItem(type, category, itemId, newValues) {
        const itemIndex = this.data[type][category].findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            console.error('Item not found');
            return;
        }
        this.data[type][category][itemIndex] = {
            ...this.data[type][category][itemIndex],
            ...newValues
        };
        this.save();
    }

    deleteItem(type, category, itemId) {
        const itemIndex = this.data[type][category].findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            console.error('Item not found');
            return;
        }
        this.data[type][category].splice(itemIndex, 1);
        this.save();
    }

    renameUser(newName) {
        this.data.name = newName;
        this.save();
    }

    modifyItemProperty(type, category, itemId, property, newValue) {
        const itemIndex = this.data[type][category].findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            console.error('Item not found');
            return;
        }
        this.data[type][category][itemIndex][property] = newValue;
        this.save();
    }

    changeItem(type, category, itemId, newItem) {
        const itemIndex = this.data[type][category].findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            console.error('Item not found');
            return;
        }
        this.data[type][category][itemIndex] = newItem;
        this.save();
    }

    moveItem(type, fromCategory, toCategory, itemId) {
        const itemIndex = this.data[type][fromCategory].findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            console.error('Item not found in source category');
            return;
        }
        const item = this.data[type][fromCategory].splice(itemIndex, 1)[0];
        this.data[type][toCategory].push(item);
        this.save();
    }

    addNotification(alertText, timestamp) {
        // Find the dropdown menu where the alerts will be added
        const dropdownMenu = document.getElementById('notification-center');

        // Create a new alert item
        const alertItem = document.createElement('a');
        alertItem.classList.add('dropdown-item', 'd-flex', 'align-items-center');

        // Add the inner HTML structure for the alert item
        alertItem.innerHTML = `
          <div class="fw-bold">
            <div class="text-truncate">
              <span>${alertText}</span>
            </div>
            <p class="small text-gray-500 mb-0">${timestamp}</p>
          </div>
        `;

        // Append the new alert item to the dropdown menu
        dropdownMenu.appendChild(alertItem);
    }
}

// if soloData is not found in localStorage, create a new one with default values
const soloManager = new SoloManager();

// if soloData is found in localStorage, load it, otherwise create a new one with default values
if (!localStorage.getItem('soloData')) {
    // run the createAndShowPopups(); function and save returned value to as a name of the user in soloData
    createAndShowPopups(function (nameInit) {
        soloManager.data.name = nameInit;
        soloManager.save();
    });
} else {
    soloManager.load();
    soloManager.update();

    // Add notification to the notification center with the current date and time as the timestamp and the alert text as "Welcome back, [name]!"
    soloManager.addNotification(`Welcome back, ${soloManager.data.name}!`, new Date().toLocaleString());
}