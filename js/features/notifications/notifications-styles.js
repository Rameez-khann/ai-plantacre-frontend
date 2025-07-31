export const notificationWidgetStyles = `
        .notification-bell {
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            color: var(--text-dark);
            transition: var(--transition);
            position: relative;
        }

        .notification-bell:hover {
            background: var(--primary-green);
            color: white;
        }

        .notification-badge {
            position: absolute;
            top: -2px;
            right: -2px;
            background: #ff4757;
            color: white;
            font-size: 11px;
            font-weight: 600;
            padding: 2px 5px;
            border-radius: 8px;
            min-width: 16px;
            text-align: center;
        }

        .notification-badge.hidden { display: none; }

        .notification-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            width: 280px;
            max-height: 350px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            border: 1px solid #e0e0e0;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-5px);
            transition: all 0.2s ease;
        }

        .notification-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .notification-header {
            padding: 12px 16px;
            border-bottom: 1px solid #f0f0f0;
            font-weight: 600;
            font-size: 14px;
        }

        .notification-list {
            max-height: 250px;
            overflow-y: auto;
        }

        .notification-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 12px 16px;
            border-bottom: 1px solid #f5f5f5;
            cursor: pointer;
            transition: background 0.2s;
        }

        .notification-item:hover { background: #f8f9fa; }
        .notification-item.unread { background: #f0f8ff; }

        .notification-icon {
            font-size: 20px;
            flex-shrink: 0;
        }

        .notification-content {
            flex: 1;
            min-width: 0;
        }

        .notification-message {
            font-size: 13px;
            color: var(--text-dark);
            margin-bottom: 2px;
            line-height: 1.3;
        }

        .notification-time {
            font-size: 11px;
            color: #999;
        }

        .notification-dot {
            width: 6px;
            height: 6px;
            background: var(--primary-green);
            border-radius: 50%;
            flex-shrink: 0;
            margin-top: 4px;
        }

        .notification-empty {
            padding: 30px 16px;
            text-align: center;
            color: #999;
            font-size: 13px;
        }
    `