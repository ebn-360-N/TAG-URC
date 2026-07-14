// manager-script.js - Logic ya Manager Dashboard

// Preview elements
const previewTitle = document.getElementById('previewTitle');
const previewContent = document.getElementById('previewContent');
const previewTime = document.getElementById('previewTime');
const previewAnnounce = document.getElementById('previewAnnounce');

const tickerOnlyTitle = document.getElementById('tickerOnlyTitle');
const tickerOnlyContent = document.getElementById('tickerOnlyContent');
const tickerOnlyTime = document.getElementById('tickerOnlyTime');

// Load saved data
function loadSavedData() {
    const title = localStorage.getItem('tickerTitle') || 'UPDATES';
    const content = localStorage.getItem('tickerContent') || 'Karibu Kanisani';
    const announce = localStorage.getItem('tickerAnnouncements') || '📢 Karibu Sana';
    const contentType = localStorage.getItem('tickerContentType') || 'somo';

    document.getElementById('titleInput').value = title;
    previewTitle.textContent = title;
    tickerOnlyTitle.textContent = title;

    // Update content based on type
    updateContentDisplay(content, contentType);

    document.getElementById('announceInput').value = announce;
    previewAnnounce.textContent = announce;

    // Update time
    updatePreviewTime();
}

function updateContentDisplay(content, type) {
    const displayContent = content || 'Karibu Kanisani';
    previewContent.textContent = displayContent;
    tickerOnlyContent.textContent = displayContent;

    // Update radio buttons
    const radios = document.querySelectorAll('input[name="contentType"]');
    radios.forEach(radio => {
        radio.checked = (radio.value === type);
    });

    // Save to localStorage
    localStorage.setItem('tickerContent', displayContent);
    localStorage.setItem('tickerContentType', type);
}

// Update Title
function updateTitle() {
    const title = document.getElementById('titleInput').value.trim() || 'UPDATES';
    localStorage.setItem('tickerTitle', title);
    previewTitle.textContent = title;
    tickerOnlyTitle.textContent = title;
    alert('✅ Title updated!');
}

// Update Content (Somo/Tangazo)
function updateContent() {
    const somo = document.getElementById('somoInput').value.trim();
    const tangazo = document.getElementById('tangazoInput').value.trim();
    const selected = document.querySelector('input[name="contentType"]:checked');

    let content = '';
    let type = 'somo';

    if (selected) {
        type = selected.value;
        if (type === 'somo') {
            content = somo || 'Karibu Kanisani';
        } else {
            content = tangazo || 'Karibu Kanisani';
        }
    }

    updateContentDisplay(content, type);
    alert('✅ Content updated!');
}

// Update Announcements
function updateAnnouncements() {
    const announce = document.getElementById('announceInput').value.trim() || '📢 Karibu Sana';
    localStorage.setItem('tickerAnnouncements', announce);
    previewAnnounce.textContent = announce;
    alert('✅ Matangazo updated!');
}

// Reset Announcements
function resetAnnouncements() {
    document.getElementById('announceInput').value = '📢 Karibu Sana';
    localStorage.setItem('tickerAnnouncements', '📢 Karibu Sana');
    previewAnnounce.textContent = '📢 Karibu Sana';
    alert('🔄 Matangazo reset!');
}

// Reset Everything
function resetAll() {
    if (confirm('Je, una hakika unataka kuweka upya yote?')) {
        localStorage.removeItem('tickerTitle');
        localStorage.removeItem('tickerContent');
        localStorage.removeItem('tickerContentType');
        localStorage.removeItem('tickerAnnouncements');
        
        document.getElementById('titleInput').value = 'UPDATES';
        document.getElementById('somoInput').value = '';
        document.getElementById('tangazoInput').value = '';
        document.getElementById('announceInput').value = '📢 Karibu Sana';
        
        document.querySelector('input[name="contentType"][value="somo"]').checked = true;
        
        loadSavedData();
        alert('🔄 Everything reset!');
    }
}

// Refresh Preview
function refreshPreview() {
    loadSavedData();
    updatePreviewTime();
    alert('👁️ Preview refreshed!');
}

// Update preview time
function updatePreviewTime() {
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
    previewTime.textContent = dateTimeStr;
    tickerOnlyTime.textContent = dateTimeStr;
}

// Update time every second
setInterval(updatePreviewTime, 1000);

// Load data on startup
loadSavedData();

// Auto-refresh preview every 5 seconds
setInterval(loadSavedData, 5000);