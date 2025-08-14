let originalTitle = null;
const observeConfig = {subtree: true, childList: true };

let initiation = new MutationObserver((mutationsList, obs) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            let tries = 0

            function hasHolderLoaded() {
                const chatHolder = document.querySelector('[data-id="container-messages"]');
                if (chatHolder) {
                    chatCounter(chatHolder);
                    obs.disconnect();
                }
                else if (tries < 30) {
                    tries++
                    setTimeout(hasHolderLoaded, 1000);
                }
            }   

            hasHolderLoaded()
        }
    }
})
initiation.observe(document.querySelector('#main-page-content'), observeConfig);

function chatCounter(chatHolder) {

    const mutationObserver = new MutationObserver(mutationList => {
        const messages = chatHolder.querySelectorAll('.chat-message'); 
        const chatTitle = document.querySelector('.name.me-1');
    
        if (chatTitle && originalTitle === null) {
            originalTitle = chatTitle.textContent
        };

        chatTitle.innerHTML = `${originalTitle} <span style="color: ${messages.length >= 30 ? 'green' : 'red'}">Message Count: ${messages.length} </span>`;

    });
    mutationObserver.observe(chatHolder, observeConfig);

    }


