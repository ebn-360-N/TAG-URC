// script.js - Logic ya Ticker View

// Load data kutoka localStorage
function loadTickerData() {
    const title = localStorage.getItem('tickerTitle') || 'UPDATES';
    const content = localStorage.getItem('tickerContent') || 'Karibu Kanisani';
    const announcements = localStorage.getItem('tickerAnnouncements') || '📢 Karibu Sana';

    document.getElementById('dynamicTitle').textContent = title;
    document.getElementById('dynamicContent').textContent = content;
    document.getElementById('announcements').textContent = announcements;
}

// Update time
function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const dateTimeStr = now.toLocaleDateString('sw-TZ', options);
    document.getElementById('dateTime').textContent = dateTimeStr;
}

// Listen for storage changes (kutoka manager)
window.addEventListener('storage', function(e) {
    if (e.key === 'tickerTitle' || e.key === 'tickerContent' || e.key === 'tickerAnnouncements') {
        loadTickerData();
    }
});

// Load data na time
loadTickerData();
updateTime();
setInterval(updateTime, 1000);

// Refresh every 5 seconds kusoma updates
setInterval(loadTickerData, 5000);