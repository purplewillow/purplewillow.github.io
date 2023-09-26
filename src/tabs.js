// Event listener setup
document.querySelectorAll('.tablinks').forEach(button => {
    button.addEventListener('click', (event) => {
        openTab(event, button.getAttribute('data-tab'));
    });
});

// Function to open a specific tab
function openTab(evt, tabName) {
    hideAllTabContents();
    resetAllTabLinks();
    showTabContent(tabName);
    setActiveTabLink(evt.currentTarget);
}

// Function to hide all tab contents
function hideAllTabContents() {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
}

// Function to reset all tab link states
function resetAllTabLinks() {
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

// Function to show the content of a specific tab
function showTabContent(tabName) {
    document.getElementById(tabName).style.display = "block";
}

// Function to set the active tab link
function setActiveTabLink(element) {
    element.className += " active";
}
