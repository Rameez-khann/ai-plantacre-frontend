        // Utility Functions Module
        const Utils = {
            formatDate(date) {
                return new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(date);
            },

            debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            },

            generateRandomStats() {
                return {
                    humidity: Math.floor(Math.random() * 30) + 50,
                    temperature: Math.floor(Math.random() * 10) + 20,
                    lightLevel: Math.floor(Math.random() * 100)
                };
            }
        };

        module.exports = {Utils}