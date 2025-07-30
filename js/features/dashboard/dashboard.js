import { showAlert } from "../../core/alerts";

        document.addEventListener('DOMContentLoaded', function () {
            // Plant selection
            const plantCards = document.querySelectorAll('.plant-card');
            plantCards.forEach(card => {
                card.addEventListener('click', function () {
                    plantCards.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');

                    const plantName = this.querySelector('.plant-name').textContent;
                    document.querySelector('.care-form p strong').textContent = plantName;
                });
            });

            // Toggle buttons
            const toggleGroups = document.querySelectorAll('.toggle-group');
            toggleGroups.forEach(group => {
                const options = group.querySelectorAll('.toggle-option');
                options.forEach(option => {
                    option.addEventListener('click', function () {
                        options.forEach(o => o.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
            });

            // Slider updates
            const sunlightSlider = document.getElementById('sunlight');
            const sunlightValue = document.getElementById('sunlightValue');
            sunlightSlider.addEventListener('input', function () {
                sunlightValue.textContent = this.value + ' hours';
            });

            const humiditySlider = document.getElementById('humidity');
            const humidityValue = document.getElementById('humidityValue');
            humiditySlider.addEventListener('input', function () {
                humidityValue.textContent = this.value + '%';
            });

            // Form submission
            const form = document.getElementById('careForm');
            const submitBtn = document.getElementById('submitBtn');

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<div class="loading"></div> Analyzing...';

                // Simulate AI processing
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '🤖 Get AI Care Advice';

                    // Update notifications (in real app, this would come from AI)
                    updateNotifications();
                }, 2000);
            });

            function updateNotifications() {
                const notificationsPanel = document.querySelector('.notifications-panel');
                const timestamp = new Date().toLocaleTimeString();

                // Add a new success notification
                const newNotification = document.createElement('div');
                newNotification.className = 'notification success';
                newNotification.innerHTML = `
                    <div class="notification-icon">🆕</div>
                    <div class="notification-content">
                        <div class="notification-title">Care Logged Successfully</div>
                        <div class="notification-text">Data recorded at ${timestamp}. AI analysis complete!</div>
                    </div>
                `;

                notificationsPanel.insertBefore(newNotification, notificationsPanel.children[1]);

                // Remove oldest notification if more than 5
                const notifications = notificationsPanel.querySelectorAll('.notification');
                if (notifications.length > 5) {
                    notifications[notifications.length - 1].remove();
                }
            }
        });

    