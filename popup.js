document.addEventListener('DOMContentLoaded', function () {
    // add event listeners
    const addButton = document.querySelector('#add')
    const removeButton = document.querySelector('#remove')
    addButton.addEventListener('click',onClickAdd)
    removeButton.addEventListener('click',onClickRemove)

    // initialize data to be displayed on show ids
    chrome.tabs.query({currentWindow: true, active: true}, (tabs)=> {
        chrome.tabs.sendMessage(tabs[0].id,'collect ids')
    })

    // send messages to the injected script
    function onClickAdd() {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs)=> {
            chrome.tabs.sendMessage(tabs[0].id,'add ids')
        })
        
    }
    function onClickRemove () {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs)=> {
            chrome.tabs.sendMessage(tabs[0].id,'remove ids')
        })
    }
})



