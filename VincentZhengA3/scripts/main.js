// VincentZhengA3
// G11 Computer Science, Mr.Hsiung P3
// 2023-01-15 (sorry had to work over the weekend)

/*-------------------------------------------------
| Declaring constants, objects, global variables,  |
| and arrays used throughout the code.             |
--------------------------------------------------*/

// Constant for pages
const LOGINPAGE = document.getElementById("login-form");                        // Constant for the login-form pge
const DATABASEPAGE = document.getElementById("database");                       // Constant for the database page

// Constant for DIVs
const ADDING_MONSTER = document.getElementById('add-monsters');                 // Constant for the add-monsters div
const SEARCH_DIV = document.getElementById('search-box');                       // Constant for the search-box div
const FULL_LIST_DIV = document.getElementById("full-list");                     // Constant for the full monster list div (including label)
const TRAVERSABLE_DIV = document.getElementById("traversable-list");            // Constant for the traversable monster list div (including label)
const TRAVERSABLE_MONSTER_CHART = document.getElementById("traversable-monster-list");// Constant for just the traversable monster database chart (excluding label)
const FULL_MONSTER_CHART = document.getElementById("full-monster-list");        // Constant for just the full monster database chart (excluding label)

// Constant for search box value
const SEARCHBOX = document.getElementById("search-input");

// Constants for buttons
const NEXT_ELEMENT = document.getElementById("next");                           // Constant for "Next" button
const PREVIOUS_ELEMENT = document.getElementById("previous");                   // Constant for "Previous" button
const VIEW_FULL = document.getElementById("view-full");                         // Constant for "View Full Array" button

const SORT_ASCENDING = document.getElementById('sort-ascending');               // Constant for "AscendingHP Sort" button
const SORT_DESCENDING = document.getElementById('sort-descending');             // Constant for "DescendingHP Sort" button
const SORT_ALPHABETICALLY = document.getElementById('sort-alphabetically');     // Constant for "Sort Name" butto
const FIND_LOWEST_HEALTH = document.getElementById('find-lowest');              // Constant for "Find Lowest HP" button

// Constants for login credentials. This is put into an object data type
const LOGINS = {
    guest: {                    // Guest login credentials
        username: "guest",
        password: "monster"
    },
    trainer: {                  // Trainer login credentials
        username: "trainer",
        password: "pass"
    },
    professor: {                // Professor login credentials
        username: "professor",
        password: "4321"    
    }
};

// Constants for permissions for logins. This is also put into an object data ty[e]
const PERMISSIONS = {
    guest:{                             // Guest permissions in boolean values
        canAddInfo: false,
        canSort: false,
        canSearch: false,
        canPartialSearch: false,
        canFindType: false,
        canFindLowesthealth: false,
        canTraverse: true
    },
    trainer:{                           // Trainer permissions in boolean values
        canAddInfo: true,
        canSort: true,
        canSearch: true,
        canPartialSearch: false,
        canFindType: false,
        canFindLowesthealth: false,
        canTraverse: false
    },
    professor:{                         // Professor permissions in boolean values
        canAddInfo: true,
        canSort: true,
        canSearch: true,
        canPartialSearch: true,
        canFindType: true,
        canFindLowesthealth: true,
        canTraverse: true
    }
};

// Create an array to store monster data. Starts off with 10 monsters (not sure how many monsters we are supposed to start off with)
let monsters = [
    {name: 'Pawn Golem', type: 'Earth Elemental', health: 500},
    {name: 'Rook Behemoth', type: 'Fire Elemental', health: 800},
    {name: "Knight Centaur", type: "Nature Elemental", health: 600},
    {name: "Bishop Banshee", type: "Spirit Elemental", health: 400},
    {name: "Queen Medusa", type: "Poison Elemental", health: 1000},
    {name: "King Colossus", type: "Metal Elemental", health: 1500},
    {name: "Checkmate Fiend", type: "Dark Elemental", health: 600},
    {name: "Checkmate Specter", type: "Ghost Elemental", health: 800},
    {name: "Pawned Wraith", type: "Undead Elemental", health: 400},
    {name: "Endgame Dragon", type: "Fire Elemental", health: 1200}
];

// Create an array that is the same as the monsters array
let monstersSearched = [];              // Array for individual monsters searched
let monstersTypesSearched = [];         // Array for the types/category of monsters searched
let monsterLowestHealthSearch = [];     // Array for if the user filtered the monsters by lowest health
let partialMonstersSearched = [];       // Array for monsters if the user performed a partial search

// Global variables for tracking
let currentUser = null;                 // Use a variable to store the current user that is logged in
let currentIndex = 0;                   // Global variable to traverse through array
let currentArray = monsters;            // Variable to store the current array that the user is traversing

/*--------------------------------------------------------
| End of declaring constants, objects, global variables,  |
| and arrays.                                             |
|                                                         |
| Start of code for login page                            |
---------------------------------------------------------*/

// Function to handle the login
function login(){
    // Get the username and password in lowercase values from the textbox. Logins are not case sensitive
    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value.toLowerCase();

    // Check if the user and password match the correct values
    for(const user in LOGINS){
        if(LOGINS[user].username === username && LOGINS[user].password === password){
            currentUser = user;
            break;
        }
    }

    // If the login is valid, then remove the login screen and display the monster database
    if(currentUser){
        LOGINPAGE.style.display = "none";           // Remove login screen
        DATABASEPAGE.hidden = false;                // Reveal database screen
        shuffleArray(monsters);                     // Shuffle (randomize) the monster chart (array)
        displayPage();                              // Display the page accordingly
    }

    // Alert the user if their login is invalid
    else{
        alert("Invalid Login! Please try again.");
    }
}

// Function to display the webpage according to the current user's permissions
function displayPage(){
    // Display add monsters DIV and also the view full button if user has permission
    if (PERMISSIONS[currentUser].canAddInfo){
        ADDING_MONSTER.style.display = "block";
        VIEW_FULL.hidden = false;

    // If the user does not have permission, the hide both the monsters DIV and the view full button
    }else{
        ADDING_MONSTER.style.display = "none";
        VIEW_FULL.hidden = true;
    }

    // Display sort buttons if user has permission
    if (PERMISSIONS[currentUser].canSort){
        SORT_ASCENDING.hidden = false;
        SORT_DESCENDING.hidden = false;
        SORT_ALPHABETICALLY.hidden = false;

    // If the user does not have the permission to sort, then hide all of the sorting buttons
    }else{
        SORT_ASCENDING.hidden = true;
        SORT_DESCENDING.hidden = true;
        SORT_ALPHABETICALLY.hidden = true;
    }

    // Display search DIV is user has permission
    if (PERMISSIONS[currentUser].canSearch){
        SEARCH_DIV.style.display = "block";

    // If the user does not have permission to conduct a search, then the search div will be hidden
    }else{
        SEARCH_DIV.style.display = "none";
    }

    // Display lowest health button if the user has permission  
    if (PERMISSIONS[currentUser].canFindLowesthealth){
        FIND_LOWEST_HEALTH.hidden = false;

    // If the current user does not have the permission to find by lowest health, then hide the button
    }else{
        FIND_LOWEST_HEALTH.hidden = true;
    }
}


/*--------------------------------------------------------
| End of code for login page                              |
|                                                         |
| Start of code for the database.                         |
---------------------------------------------------------*/

// This function will display all the monsters
function displayAllMonsters(monsterArray){
    // Variable to store the current monster being viewed
    let currentMonster = monsterArray[currentIndex];
    // Create the table in HTML
    let traversableMonsterChart = "<table><tr><th>Name</th><th>Type/Category</th><th>Health</th></tr>";
    // Create a parallel variable 
    let fullMonsterChart = traversableMonsterChart;

    // If the current user has permission to traverse, then display the traversable database and hide the full database
    if (PERMISSIONS[currentUser].canTraverse){
        FULL_LIST_DIV.style.display = "none";
        TRAVERSABLE_DIV.style.display = "block";

        // Display only the current monster
        traversableMonsterChart += `<tr><td>${currentMonster.name}</td><td>${currentMonster.type}</td><td>${currentMonster.health}</td></tr>`;
        // Close the table in HTML
        traversableMonsterChart += "</table>";
        // Update the HTML of the monster list element
        TRAVERSABLE_MONSTER_CHART.innerHTML = traversableMonsterChart;
    }

    // If the current user has permission to traverse AND partial search (professor) or the current user can search (trainer)
    if (PERMISSIONS[currentUser].canTraverse && PERMISSIONS[currentUser].canPartialSearch || PERMISSIONS[currentUser].canSearch){
        // If the current user is the professor, then show the full database
        if (PERMISSIONS[currentUser].canTraverse && PERMISSIONS[currentUser].canPartialSearch){
            FULL_LIST_DIV.style.display = "block";

        // If the current user is the trainer, then hide the traversable database and show the full database
        }else{
            TRAVERSABLE_DIV.style.display = "none";
            FULL_LIST_DIV.style.display = "block";
        }

        // Display all the monsters in the array (full database)
        for (const monster of monsterArray){
            fullMonsterChart += `<tr><td>${monster.name}</td><td>${monster.type}</td><td>${monster.health}</td></tr>`;
        }

        // Close the table in HTML
        fullMonsterChart += "</table>";
        // Update the HTML of the monster list element
        FULL_MONSTER_CHART.innerHTML = fullMonsterChart;
    }
    
    // Close the table in HTML
    traversableMonsterChart += "</table>";
    // Update the HTML of the traversable monster chart element
    TRAVERSABLE_MONSTER_CHART.innerHTML = traversableMonsterChart;
}

// Function for linear searching monsters
function search(){
    // Store the variable for the monster that the user searched for
    let searchedMonster;

    // Check if the user's current profile has the permission to search
    if (PERMISSIONS[currentUser].canSearch){
        // Initialize the monstersSearched array as empty
        monstersSearched = [];

        // If the user's search matches any of the monsters in the list, then add it to the searchedMonster variable. Break the for loop once this has occurred
        for(let i = 0; i < monsters.length; i++){
            if(monsters[i].name.toLowerCase() === SEARCHBOX.value){
                searchedMonster = monsters[i];
                break;
            }
        }

        // If the user has searched for a valid monster, then change the monstersSearched array to the stats of the monster that the user searched
        if(searchedMonster){
            // Add the searchedMonster to the end of the monstersSearched array
            push(monstersSearched, searchedMonster);
            // Display all monsters, but only the ones in the monstersSearched array
            displayAllMonsters(monstersSearched);
            // Set the current array as the monstersSearched array
            currentArray = monstersSearched;

        // Check if the user's current profile has the permissionto  search monsters by type or to conduct partials earched
        }else if (PERMISSIONS[currentUser].canFindType || PERMISSIONS[currentUser].canPartialSearch){
            // Initialize an empty array for the arrays of monsterTypesSearched and partialMonstersSearched
            partialMonstersSearched = [];
            monstersTypesSearched = [];

            // Iterate over the monsters array and make the monster variable equal to the current index of the monsters array
            for (let i = 0; i < monsters.length; i++) {
                let monster = monsters[i];

                // If the user's search matches a monster type, then add current indexes in the monsters array to the monsterTypesSearched array
                if (SEARCHBOX.value === monster.type.toLowerCase()){
                    push(monstersTypesSearched, monster);
                }

                // If the user's search matches any letter that is in a monster's name, then add current indexes in the monsters array to the partialMonstersSearched array
                if (isSubstring(monster.name.toLowerCase(), SEARCHBOX.value.toLowerCase())){
                    // If substring is found, then add the monster to the searched array
                    push(partialMonstersSearched, monster);
                }
            }

            // Display monstersSearched array if the array length is greater than 0
            if(monstersTypesSearched.length > 0){
                // Set current array to monsterTypesSearched
                currentArray = monstersTypesSearched;
                // Update the traversable buttons and set the current index to 0
                updateButtonsAndCurrentIndexes();
                // Display the searched monsters
                displayAllMonsters(monstersTypesSearched);
            }

            // Display partialMonstersSearched array, if the array length is greater than 0
            if(partialMonstersSearched.length > 0){
                // Set current array to monsterTypesSearched
                currentArray = partialMonstersSearched;
                // Update the traversable buttons and set the current index to 0
                updateButtonsAndCurrentIndexes();
                // Display the searched monsters
                displayAllMonsters(partialMonstersSearched);
            }
        }

        // If the user enters an input that does not match with any of the data base elements, then alert the user
        if (monstersSearched.length === 0 && monstersTypesSearched.length === 0 && partialMonstersSearched.length === 0){
            alert("Invalid Input or you do not have permission! Please try again!");
        }
    }
}

// Function to add a new monster
function addMonster(){
    // Check if the user's current profile has the permission to add new monster
    if (PERMISSIONS[currentUser].canAddInfo){
        // Get values for a new monster from inputs
        const name = String(document.getElementById('name').value);
        const health = Number(document.getElementById('health').value);
        const type = String(document.getElementById('type').value);

        // Create new monster object
        const newMonster = {name, type, health};

        // Check if a monster with the same statistics already exists in the monsters array
        let existingMonster = find(monsters, monster => monster.name.toLowerCase() === newMonster.name.toLowerCase() || monster.health === newMonster.health && monster.name === newMonster.name && monster.type.toLowerCase() === newMonster.type.toLowerCase());
        
        // Tell the user that either their name, health, and type is empty and if the monster doesn't exist, do not add it
        if (existingMonster || name.length === 0 || health.length === 0 || type.length === 0){
            alert("Your name, type, or health is/are empty or you've tried to input already existing stats! Try again!");

        // Add and display the new chart if nothing is the same
        }else{
            // Add new monster to array of monsters
            push(monsters, newMonster);
            // Set currentArray to the monsters array
            currentArray = monsters;
            // Display the new monster list
            displayAllMonsters(monsters);
        }
    }
}

// This function will display the next element in the monster array when traversing
function displayNextElement(monsterArray){
    // Only go to the next character if not at the array's end
    if (currentIndex < monsterArray.length - 1){
        currentIndex++;
        displayAllMonsters(monsterArray);
    }
}

// This function will display the previous element in the monster array when traversing
function displayPreviousElement(monsterArray){
    // only go the previous character when NOT at the first character
    if (currentIndex > 0){
        currentIndex--;
        displayAllMonsters(monsterArray);
    }
}

// Function to update the buttons for the traversing array (to see which array to traverse) and to set currentIndex to 0. This function is used throughout the code and acts as a way to update the buttons
function updateButtonsAndCurrentIndexes(){
    // Set the current index to 0
    currentIndex = 0;
    // Change the parameter for the next and previous functions (called in the buttons) to the current array
    NEXT_ELEMENT.onclick = function() {displayNextElement(currentArray);};
    PREVIOUS_ELEMENT.onclick = function() {displayPreviousElement(currentArray);};
}

// Function for viewing the full array again
function viewFullArray(){
    // Set the current index to 0
    currentIndex = 0;
    // Set currentArray to monsters
    currentArray = monsters;
    // Display the array once again
    displayAllMonsters(currentArray);
}

// Function for logging out (Bonus)
function logout(){
    // Display the login page once again and hide the database page
    LOGINPAGE.style.display = "block";
    DATABASEPAGE.hidden = true;
}

/*--------------------------------------------------------
| FUNCTIONS FOR ARRAY ALGORITHMS                          |
---------------------------------------------------------*/

// Function for sorting monster in ascending health
function sort(array, order){
    // Check if the user's current profile has the permission to sort
    if (PERMISSIONS[currentUser].canSort){
        // Sort by ascending if the order is ascending
        if (order === "ascending"){
            // Use nested for loops to implement the  sort algorithm
            for (let i = 0; i < array.length; i++){
                for(let j = 0; j < array.length - i - 1; j++){
                    // Compare the health of each monster and swap them if the next monster has a lower health
                    if (array[j].health > array[j + 1].health){
                        let temporary = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temporary;
                    }
                }
            }
        } 

        // Sort in descending order of health points
        else if (order === "descending"){
            // Use nested for loops to implement the sort algorithm
            for (let i = 0; i < array.length; i++){
                for(let j = 0; j < array.length - i - 1; j++){
                    // Compare the health of each monster and swap them if the next monster has a lower health
                    if (array[j].health < array[j + 1].health){
                        let temporary = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temporary;
                    }
                }
            }
        }

        // Sort in alphabetical order (bonus)
        else if (order === "alphabet"){
            // Use nested for loops to implement the sorting algorithm
            for (let i = 0; i < array.length; i++){
                // Start at the next element
                for (let j = i + 1; j < array.length; j++){
                    // Store the current monster as the current monster name in the iteration
                    let currentMonsterInIteration = array[i].name.toLowerCase();
                    let nextMonsterInIteration = array[j].name.toLowerCase();
                    // Compare the current monster name to the next name
                    // If the current monster name is after the next monster name in the alphabet, then swap the two monsters in the array
                    if (currentMonsterInIteration > nextMonsterInIteration){
                        let temporary = array[i];
                        array[i] = array[j];
                        array[j] = temporary;
                    }
                }
            }
        }

        // Update the traversable buttons and set the current index to 0
        updateButtonsAndCurrentIndexes();
        // Call the function to display all the monsters after sorting
        displayAllMonsters(currentArray);
    }
}

// Function to sort monsters by lowest health
function findLowest(){
    // Check if the user has permission to find monsters with the lowest health
    if (PERMISSIONS[currentUser].canFindLowesthealth){
        monsterLowestHealthSearch = [];
        // Sort the monsters array by ascending health
        sort(monsters, 'ascending');
        // Iterate over the monsters array
        for (let i = 0; i < monsters.length; i++) {
            let monster = monsters[i];
            let lowestHealth = monsters[0].health;
            if (monster.health === lowestHealth){
                push(monsterLowestHealthSearch, monster);
            }
        }
        // Set current array to the monsterLowestHealthSearch
        currentArray = monsterLowestHealthSearch;
        // Display the monsterLowestHealthSearch array
        displayAllMonsters(monsterLowestHealthSearch);
        // Update the traversable buttons and set the current index to 0
        updateButtonsAndCurrentIndexes();
    }
}

// Function that is basically the same as the built-in "push" function, since we cannot use built-in functions. It pushes an element to the end of an array
function push(array, element){
    // The first parameter 'array' is the array to which the element will be added
    // The second parameter 'element' is the element to be added to the array
    // Assign the element to the next index position of the array, which is the current length of the array
    array[array.length] = element;
}

// Function that is basically the same as the built-in "find" function, since we cannot use built-in functions
function find(array, callback){
    // Iterate over the array
    for (let i = 0; i < array.length; i++){
        // Pass everything through the callback function
        if (callback(array[i], i, array)){
            // If the callback function returns true for any element, return that same element
            return array[i];
        }
    }
    // If the callback function never returns true for any of the elements, then return undefined
    return undefined;
}

// Function to shuffle the array of monsters (randomize + bonus)
function shuffleArray(array){
    // Set currentIndex to 0;
    currentIndex = 0;
    // Iterate through the array
    for (let i = array.length - 1; i > 0; i--){
        // Choose a random index from the array from numbers 0 to i
        let randomIndex = Math.floor(Math.random() * (i + 1));
        // Swap the element at the current index with the element from the random index
        let temporary = array[i];   
        array[i] = array[randomIndex];
        array[randomIndex] = temporary;
    }
    // Display the array in the chart (database)
    displayAllMonsters(currentArray);
}

// Function to check for substrings 
// I created this function because I thought we couldn't use "indexOf", although it turns out that we can. My apologies.
function isSubstring(str, substring){
    // Iterate over the characters of the string
    for (let i = 0; i < str.length - substring.length + 1; i++){
        let j;
        // Compare the characters of the substring with the current string
        for (j = 0; j < substring.length; j++){
            if (str[i + j] !== substring[j]){
                // If the characters are not equal, then break the loops
                break;
            }
        }
        // If all the characters are equal, then return true
        if (j === substring.length){
            return true;
        }
    }
    // If no match is found, then return false
    return false;
}   