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

        this.generateHTML();
    }

    save() {
        localStorage.setItem('soloData', JSON.stringify(this.data));
    }

    createItem(type, category, item) {
        console.log(category)
        console.log(this.data[type][category])
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
        let oldName = this.data.name;

        this.data.name = newName;
        this.save();

        let renameAlert = showAlert('renameAlert', 'SYSTEM', `You have changed your name from ${oldName} to ${newName}.`);
        renameAlert.show();

        renameAlert._element.addEventListener('hidden.bs.modal', function () {
            removeAlert('renameAlert');
        });
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
        alertItem.setAttribute('href', '#')

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

    reset() {
        localStorage.clear();

        let resetAlert = showAlert('resetAlert', 'SYSTEM', `You have reset your progress.`);
        resetAlert.show();

        resetAlert._element.addEventListener('hidden.bs.modal', function () {
            removeAlert('resetAlert');
            location.reload();
        });
    }

    generateHTML() {
        // Clear existing content
        const storeContainer = document.getElementById('storeContainer');
        const exchangeContainer = document.getElementById('exchangeContainer');
        storeContainer.innerHTML = '';
        exchangeContainer.innerHTML = '';
    
        // Dynamically create and append the Store section
        for (let category in this.data.store) {
            for (let subCategory in this.data.store[category]) {
                const storeCard = this.createSectionCard(`Store - ${category} - ${subCategory}`, this.data.store[category][subCategory]);
                storeContainer.appendChild(storeCard);
            }
        }
    
        // Dynamically create and append the Exchange section
        for (let category in this.data.store) {
            for (let subCategory in this.data.store[category]) {
                const exchangeCard = this.createSectionCard(`Exchange - ${category} - ${subCategory}`, this.data.store[category][subCategory]);
                exchangeContainer.appendChild(exchangeCard);
            }
        }
    }
    
    createSectionCard(sectionName, items) {
        // Create the card element
        const card = document.createElement('div');
        card.className = 'card text-white bg-dark mb-3';
    
        // Create the card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header bg-primary d-flex justify-content-between align-items-center';
        cardHeader.innerHTML = `<h5 class="mb-0">${sectionName}</h5>`;
        card.appendChild(cardHeader);
    
        // Create the list group for items
        const listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-flush';

        console.log(sectionName);
        console.log(items);
        if (!Array.isArray(items)) {
            console.error('Invalid items: expected an array');
            return;
        }
    
        // Append items to the list group
        items.forEach(item => {
            const listItem = this.createListItem(item);
            listGroup.appendChild(listItem);
        });
    
        card.appendChild(listGroup);
    
        return card;
    }
    
    createListItem(item) {
        // Create the list item element
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item bg-dark d-flex justify-content-between align-items-start';
    
        // Set the inner HTML of the list item
        listItem.innerHTML = `
            <span>${item.name}</span>
            <div class="d-flex flex-column align-items-end">
                ${item.badges.map(badge => `<span class="badge bg-primary mb-2">${badge}</span>`).join('')}
            </div>
        `;
    
        return listItem;
    }

    createSubCategoryInJSON(sectionName, category, subCategory) {
        this.data[sectionName][category][subCategory] = [];
        this.save();
    }

    deleteSubCategoryInJSON(sectionName, category, subCategory) {
        delete this.data[sectionName][category][subCategory];
        this.save();
    }

    editSubCategoryInJSON(sectionName, category, subCategory, newValues) {
        this.data[sectionName][category][subCategory] = {
            ...this.data[sectionName][category][subCategory],
            ...newValues
        };
        this.save();
    }
}

// if soloData is not found in localStorage, create a new one with default values
const soloManager = new SoloManager();

// if soloData is found in localStorage, load it, otherwise create a new one with default values
if (!localStorage.getItem('soloData')) {
    // run the systemInit(); function and save returned value to as a name of the user in soloData
    systemInit(function (nameInit) {
        soloManager.data.name = nameInit;
        soloManager.save();
    });
} else {
    soloManager.load();
    soloManager.update();

    // Add notification to the notification center with the current date and time as the timestamp and the alert text as "Welcome back, [name]!"
    soloManager.addNotification(`Welcome back, ${soloManager.data.name}!`, new Date().toLocaleString());
}

function populateDefaultItems() {
    // create subcategories in the 'shop' category in the 'store' section called 'modes'
    soloManager.createSubCategoryInJSON('store', 'shop', 'modes');

    // add an item to the 'modes' subcategory in the 'shop' category in the 'store' section
    soloManager.createItem('store', 'shop', {
        id: '1',
        name: 'Easy Mode',
        badges: ['NEW']
    });
}

// Call the function to populate the default items
populateDefaultItems();

// download the soloData from the localStorage
function downloadSoloData() {
    const data = soloManager.data;
    const filename = 'soloData.json';
    const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
}