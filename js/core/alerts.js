let activeNotification = null;

export function showAlert(message, type = 'info') {
    // Remove existing notification if present
    if (activeNotification) {
        activeNotification.remove();
        activeNotification = null;
    }

    const colors = {
        success: 'var(--accent-green)',     // light green
        warning: '#f39c12',                 // amber
        info: '#3498db',                    // blue
        error: '#e74c3c'                    // red
    };

    const iconMap = {
        success: '✅',
        warning: '⚠️',
        info: 'ℹ️',
        error: '❌'
    };

    const div = document.createElement('div');
    div.textContent = `${iconMap[type] || ''} ${message}`;
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 10px var(--shadow-hover);
        font-weight: 500;
        z-index: 1000;
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 0;
        transform: translateY(-10px);
    `;

    document.body.appendChild(div);
    activeNotification = div;

    // Animate in
    requestAnimationFrame(() => {
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
    });

    // Remove after 3 seconds
    setTimeout(() => {
        if (div === activeNotification) {
            div.style.opacity = '0';
            div.style.transform = 'translateY(-10px)';
            setTimeout(() => div.remove(), 300); // Smooth fade out
            activeNotification = null;
        }
    }, 3000);
}

