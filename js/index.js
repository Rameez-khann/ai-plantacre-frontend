// Plant Data Module
const PlantData = {
    plants: [
        {
            id: 1,
            name: "Monstera Deliciosa",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
            care: "Water weekly, bright indirect light",
            status: "Healthy"
        },
        {
            id: 2,
            name: "Snake Plant",
            image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=400&q=80",
            care: "Water bi-weekly, low light tolerant",
            status: "Needs Water"
        },
        {
            id: 3,
            name: "Pothos",
            image: "https://images.unsplash.com/photo-1586093158851-4b8d95ac3b89?auto=format&fit=crop&w=400&q=80",
            care: "Water when soil is dry, bright indirect light",
            status: "Healthy"
        },
        {
            id: 4,
            name: "Peace Lily",
            image: "https://images.unsplash.com/photo-1509423350716-97f2360af503?auto=format&fit=crop&w=400&q=80",
            care: "Keep soil moist, medium light",
            status: "Needs Water"
        },
        {
            id: 5,
            name: "Rubber Plant",
            image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80",
            care: "Water when top inch is dry, bright light",
            status: "Healthy"
        },
        {
            id: 6,
            name: "Fiddle Leaf Fig",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
            care: "Water weekly, bright indirect light",
            status: "Needs Water"
        }
    ],

    getPlants() {
        return this.plants;
    },

    getLimitedPlants(limit = 2) {
        return this.plants.slice(0, limit);
    },

    updatePlantStatus(plantId, newStatus) {
        const plant = this.plants.find(p => p.id === plantId);
        if (plant) {
            plant.status = newStatus;
            this.updateStats();
        }
    },

    updateStats() {
        const stats = {
            total: this.plants.length,
            needsWater: this.plants.filter(p => p.status === "Needs Water").length,
            healthy: this.plants.filter(p => p.status === "Healthy").length,
            humidity: Math.floor(Math.random() * 20) + 55 + "%"
        };

        UI.updateDashboard(stats);
    }
};

// UI Management Module
const UI = {
    init() {
        this.renderLimitedPlants();
        this.bindEvents();
        this.animateOnScroll();
        PlantData.updateStats();
    },

    renderLimitedPlants() {
        const gallery = document.getElementById('plantGallery');
        const plants = PlantData.getLimitedPlants(2); // Show only 2 plants

        gallery.innerHTML = `
            ${plants.map(plant => `
                <div class="plant-card fade-in" data-plant-id="${plant.id}">
                    <img src="${plant.image}" alt="${plant.name}" class="plant-image">
                    <div class="plant-info">
                        <h3 class="plant-name">${plant.name}</h3>
                        <p class="plant-care">${plant.care}</p>
                        <span class="plant-status ${plant.status.toLowerCase().replace(' ', '-')}">${plant.status}</span>
                    </div>
                </div>
            `).join('')}
            <div class="see-more-card fade-in">
                <div class="see-more-content">
                    <h3>View All Plants</h3>
                    <p>See your complete plant collection</p>
                    <a href="/plants.html" class="btn">See More Plants</a>
                </div>
            </div>
        `;
    },

    updateDashboard(stats) {
        document.getElementById('totalPlants').textContent = stats.total;
        document.getElementById('needsWater').textContent = stats.needsWater;
        document.getElementById('healthyPlants').textContent = stats.healthy;
        document.getElementById('avgHumidity').textContent = stats.humidity;
    },

    bindEvents() {
        // Refresh button functionality
        document.getElementById('refreshBtn').addEventListener('click', this.handleRefresh.bind(this));

        // Plant card click events
        document.getElementById('plantGallery').addEventListener('click', this.handlePlantClick.bind(this));
    },

    handleRefresh() {
        const refreshBtn = document.getElementById('refreshBtn');
        const refreshText = document.getElementById('refreshText');
        const loadingSpinner = document.getElementById('loadingSpinner');

        // Show loading state
        refreshText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        refreshBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            PlantData.updateStats();

            // Hide loading state
            refreshText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
            refreshBtn.disabled = false;

            // Show success feedback
            this.showNotification('Plant data refreshed successfully!', 'success');
        }, 1500);
    },

    handlePlantClick(event) {
        const plantCard = event.target.closest('.plant-card');
        if (plantCard) {
            const plantId = parseInt(plantCard.dataset.plantId);
            const plant = PlantData.getPlants().find(p => p.id === plantId);

            if (plant) {
                this.showPlantDetails(plant);
            }
        }
    },

    showPlantDetails(plant) {
        const newStatus = plant.status === 'Healthy' ? 'Needs Water' : 'Healthy';
        PlantData.updatePlantStatus(plant.id, newStatus);
        this.renderLimitedPlants();
        this.showNotification(`${plant.name} status updated to: ${newStatus}`, 'info');
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px var(--shadow);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .see-more-card {
        background: var(--white);
        border-radius: 8px;
        padding: 40px 24px;
        text-align: center;
        box-shadow: 0 4px 12px var(--shadow);
        transition: var(--transition);
        border: 2px dashed var(--accent-green);
    }
    
    .see-more-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px var(--shadow-hover);
    }
    
    .see-more-content h3 {
        color: var(--primary-green);
        margin-bottom: 12px;
        font-size: 1.3rem;
    }
    
    .see-more-content p {
        color: var(--text-light);
        margin-bottom: 20px;
    }
`;
document.head.appendChild(style);


