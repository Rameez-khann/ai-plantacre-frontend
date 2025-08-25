// notifications.js - Simple notification system with vanilla JS functions

import { notificationWidgetStyles } from "./notifications-styles.js";

let notifications = [];
let isDropdownOpen = false;

// Sample data
const sampleNotifications = [
    {
        id: 1,
        image: '🌱',
        message: 'Your plant needs water!',
        time: '2 min ago',
        read: false
    },
    {
        id: 2,
        image: '☀️',
        message: 'Perfect sunlight conditions detected',
        time: '1 hour ago',
        read: false
    },
    {
        id: 3,
        image: '📊',
        message: 'Weekly plant health report ready',
        time: '3 hours ago',
        read: true
    }
];

// Initialize notifications
function initNotifications() {
    // return false;
    const container = document.getElementById('notification');
    if (!container) return;

    injectStyles();
    createBell(container);
    loadNotifications();
    updateBadge();
}

// Inject CSS styles
function injectStyles() {
    if (document.getElementById('notification-styles')) return;

    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = notificationWidgetStyles;
    document.head.appendChild(style);
}

// Create notification bell
function createBell(container) {
    container.innerHTML = `
        <button class="notification-bell" id="notification-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="notification-badge hidden" id="notification-badge">0</span>
        </button>
        <div class="notification-dropdown" id="notification-dropdown">
            <div class="notification-header">Notifications</div>
            <div class="notification-list" id="notification-list"></div>
        </div>
    `;

    // Add click handlers
    document.getElementById('notification-btn').addEventListener('click', toggleDropdown);
    document.addEventListener('click', handleOutsideClick);
}

// Load sample notifications
function loadNotifications() {
    notifications = [...sampleNotifications];
    renderNotifications();
}

// Toggle dropdown
function toggleDropdown(e) {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    const dropdown = document.getElementById('notification-dropdown');
    dropdown.classList.toggle('show', isDropdownOpen);
}

// Handle outside clicks
function handleOutsideClick(e) {
    if (!e.target.closest('#notifications')) {
        isDropdownOpen = false;
        const dropdown = document.getElementById('notification-dropdown');
        dropdown?.classList.remove('show');
    }
}

// Render notifications
function renderNotifications() {
    const list = document.getElementById('notification-list');
    if (!list) return;

    if (notifications.length === 0) {
        list.innerHTML = '<div class="notification-empty">No notifications</div>';
        return;
    }

    list.innerHTML = notifications.map(notif => `
        <div class="notification-item ${!notif.read ? 'unread' : ''}" onclick="markAsRead(${notif.id})">
            <span class="notification-icon">${notif.image}</span>
            <div class="notification-content">
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
            ${!notif.read ? '<span class="notification-dot"></span>' : ''}
        </div>
    `).join('');
}

// Update badge count
function updateBadge() {
    const badge = document.getElementById('notification-badge');
    const bell = document.getElementById('notification-btn');
    if (!badge || !bell) return;

    const unreadCount = notifications.filter(n => !n.read).length;
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.classList.remove('hidden');
        bell.style.color = 'var(--primary-green)';
    } else {
        badge.classList.add('hidden');
        bell.style.color = '';
    }
}

// Mark notification as read
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        renderNotifications();
        updateBadge();
    }
}

// Add new notification
function addNotification(image, message, time = 'now') {
    const newNotif = {
        id: Date.now(),
        image,
        message,
        time,
        read: false
    };
    notifications.unshift(newNotif);
    renderNotifications();
    updateBadge();
}

// Clear all notifications
function clearAll() {
    notifications = [];
    renderNotifications();
    updateBadge();
}

// Mark all as read
function markAllRead() {
    notifications.forEach(n => n.read = true);
    renderNotifications();
    updateBadge();
}

// Make functions available globally for onclick handlers
window.markAsRead = markAsRead;

// Export functions for modular use
export { 
    initNotifications, 
    addNotification, 
    clearAll, 
    markAllRead, 
    markAsRead 
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', initNotifications());