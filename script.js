// Floating support widget bubble closure logic
document.querySelector('.close-chat-action').addEventListener('click', function() {
    document.querySelector('.chat-message-bubble').style.display = 'none';
});

// Mobile basic navbar toggle tracking
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    const navMenu = document.querySelector('nav');
    if(navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.right = '20px';
        navMenu.style.background = '#ffffff';
        navMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        navMenu.style.padding = '15px';
        navMenu.style.borderRadius = '8px';
        navMenu.style.zIndex = '99999';
    }
});
