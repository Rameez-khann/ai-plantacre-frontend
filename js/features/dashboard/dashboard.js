        // Plant data structure
        let plants = [
            {
                id: 1,
                name: "Peace Lily",
                scientificName: "Spathiphyllum",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop",
                careLevel: "easy",
                lightRequirement: "Medium",
                wateringFreq: 7,
                waterVolume: 200,
                fertilizingFreq: 14,
                lastWatered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                lastFertilized: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                notes: "Enjoys humidity and filtered water"
            },
            {
                id: 2,
                name: "Monstera Deliciosa",
                scientificName: "Monstera deliciosa",
                image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=200&fit=crop",
                careLevel: "medium",
                lightRequirement: "Bright",
                wateringFreq: 10,
                waterVolume: 300,
                fertilizingFreq: 21,
                lastWatered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                lastFertilized: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
                notes: "Loves to climb, provide moss pole"
            },
            {
                id: 3,
                name: "Snake Plant",
                scientificName: "Sansevieria trifasciata",
                image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=200&fit=crop",
                careLevel: "easy",
                lightRequirement: "Any",
                wateringFreq: 21,
                waterVolume: 150,
                fertilizingFreq: 60,
                lastWatered: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                lastFertilized: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
                notes: "Very drought tolerant, avoid overwatering"
            },
            {
                id: 4,
                name: "Fiddle Leaf Fig",
                scientificName: "Ficus lyrata",
                image: "https://images.unsplash.com/photo-1586016286298-65b62d8b8595?w=400&h=200&fit=crop",
                careLevel: "hard",
                lightRequirement: "Bright",
                wateringFreq: 7,
                waterVolume: 400,
                fertilizingFreq: 14,
                lastWatered: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                lastFertilized: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                notes: "Sensitive to overwatering and changes in light"
            }
        ];

        let completedActions = [];
        let currentEditingId = null;

        // Garden tips array
        const gardenTips = [
            "Winter months require less frequent watering. Check soil moisture before watering to prevent root rot.",
            "Yellow leaves often indicate overwatering. Let soil dry between waterings.",
            "Rotate your plants weekly to ensure even growth and prevent leaning.",
            "Clean leaves monthly with a damp cloth to improve photosynthesis.",
            "Group plants with similar humidity needs together for better care.",
            "Use filtered or distilled water for sensitive plants like Peace Lilies.",
            "Check for pests weekly - early detection makes treatment easier.",
            "Fertilize less in winter when most plants enter dormancy.",
            "Place humidity-loving plants near each other to create a microclimate.",
            "Morning sunlight is gentler than harsh afternoon sun for most indoor plants."
        ];

        // Initialize the dashboard
        function init() {
            renderPlants();
            renderStats();
            renderActions();
            showRandomTip();
        }

        // Show random garden tip
        function showRandomTip() {
            const tipElement = document.getElementById('gardenTip');
            const randomTip = gardenTips[Math.floor(Math.random() * gardenTips.length)];
            tipElement.textContent = randomTip;
        }

        // Render plant cards
        function renderPlants() {
            const plantsGrid = document.getElementById('plantsGrid');
            plantsGrid.innerHTML = '';

            plants.forEach(plant => {
                const plantCard = createPlantCard(plant);
                plantsGrid.appendChild(plantCard);
            });
        }

        // Create individual plant card
        function createPlantCard(plant) {
            const card = document.createElement('div');
            card.className = 'plant-card';

            const daysSinceWatered = Math.floor((Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24));
            const daysSinceFertilized = Math.floor((Date.now() - plant.lastFertilized.getTime()) / (1000 * 60 * 60 * 24));

            const needsWater = daysSinceWatered >= plant.wateringFreq;
            const needsFertilizer = daysSinceFertilized >= plant.fertilizingFreq;

            // Determine health indicator
            let healthClass = 'excellent';
            if (needsWater || needsFertilizer) {
                healthClass = 'warning';
            }
            if (daysSinceWatered > plant.wateringFreq + 3) {
                healthClass = 'poor';
            }

            const pulseClass = (needsWater && daysSinceWatered > plant.wateringFreq + 2) ? 'urgent-pulse' : '';

            card.innerHTML = `
                <div class="plant-card-inner">
                    <div class="plant-image-container">
                        <img src="${plant.image}" alt="${plant.name}" class="plant-image" 
                             onerror="this.src='https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=200&fit=crop'">
                        <div class="health-indicator ${healthClass} ${pulseClass}"></div>
                        <div class="plant-badges">
                            <span class="badge ${plant.careLevel}">${plant.careLevel}</span>
                        </div>
                        <div class="plant-actions">
                            <button class="action-btn edit-btn" onclick="editPlant(${plant.id})" title="Edit Plant">✏️</button>
                            <button class="action-btn delete-btn" onclick="deletePlant(${plant.id})" title="Delete Plant">🗑️</button>
                        </div>
                    </div>
                    <div class="plant-content">
                        <div class="plant-header">
                            <div class="plant-name">${plant.name}</div>
                            <div class="scientific-name">${plant.scientificName}</div>
                        </div>
                        
                        <div class="plant-stats">
                            <div class="stat-item">
                                <span class="stat-icon">☀️</span>
                                <span class="stat-label">Light:</span>
                                <span class="stat-value">${plant.lightRequirement}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-icon">💧</span>
                                <span class="stat-label">Water:</span>
                                <span class="stat-value">Every ${plant.wateringFreq}d</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-icon">🌱</span>
                                <span class="stat-label">Feed:</span>
                                <span class="stat-value">Every ${plant.fertilizingFreq}d</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-icon">💦</span>
                                <span class="stat-label">Amount:</span>
                                <span class="stat-value">${plant.waterVolume}ml</span>
                            </div>
                        </div>
                        
                        <div class="plant-footer">
                            <div class="last-care">
                                Last watered:<br>
                                <strong>${daysSinceWatered} days ago</strong>
                            </div>
                            <button class="view-btn" onclick="viewPlantDetails(${plant.id})">View Details</button>
                        </div>
                    </div>
                </div>
            `;

            return card;
        }

        // Render statistics
        function renderStats() {
            const statsGrid = document.getElementById('statsGrid');

            const totalPlants = plants.length;
            const easyPlants = plants.filter(p => p.careLevel === 'easy').length;
            const plantsNeedingWater = plants.filter(p => {
                const daysSinceWatered = Math.floor((Date.now() - p.lastWatered.getTime()) / (1000 * 60 * 60 * 24));
                return daysSinceWatered >= p.wateringFreq;
            }).length;
            const healthyPlants = plants.filter(p => {
                const daysSinceWatered = Math.floor((Date.now() - p.lastWatered.getTime()) / (1000 * 60 * 60 * 24));
                const daysSinceFertilized = Math.floor((Date.now() - p.lastFertilized.getTime()) / (1000 * 60 * 60 * 24));
                return daysSinceWatered < p.wateringFreq && daysSinceFertilized < p.fertilizingFreq;
            }).length;

            statsGrid.innerHTML = `
                <div class="stat-card">
                    <div class="stat-number">${totalPlants}</div>
                    <div class="stat-text">Total Plants</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${healthyPlants}</div>
                    <div class="stat-text">Healthy Plants</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${plantsNeedingWater}</div>
                    <div class="stat-text">Need Water</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${easyPlants}</div>
                    <div class="stat-text">Easy Care</div>
                </div>
            `;
        }

        // Render care actions
        function renderActions() {
            const actionList = document.getElementById('actionList');
            const actions = [];

            plants.forEach(plant => {
                const daysSinceWatered = Math.floor((Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24));
                const daysSinceFertilized = Math.floor((Date.now() - plant.lastFertilized.getTime()) / (1000 * 60 * 60 * 24));

                // Water action
                const waterActionId = `water-${plant.id}`;
                if (!completedActions.includes(waterActionId)) {
                    let waterUrgency = 'upcoming';
                    let waterTiming = `In ${plant.wateringFreq - daysSinceWatered} days`;

                    if (daysSinceWatered >= plant.wateringFreq) {
                        waterUrgency = daysSinceWatered > plant.wateringFreq + 2 ? 'urgent' : 'today';
                        waterTiming = daysSinceWatered > plant.wateringFreq ?
                            `${daysSinceWatered - plant.wateringFreq} days overdue` : 'Due today';
                    }

                    actions.push({
                        id: waterActionId,
                        plantId: plant.id,
                        type: 'water',
                        title: 'Water Plant',
                        plantName: plant.name,
                        urgency: waterUrgency,
                        timing: waterTiming,
                        priority: daysSinceWatered >= plant.wateringFreq ?
                            (daysSinceWatered > plant.wateringFreq + 2 ? 3 : 2) : 1
                    });
                }

                // Fertilizer action
                const fertilizerActionId = `fertilize-${plant.id}`;
                if (!completedActions.includes(fertilizerActionId)) {
                    let fertilizerUrgency = 'upcoming';
                    let fertilizerTiming = `In ${plant.fertilizingFreq - daysSinceFertilized} days`;

                    if (daysSinceFertilized >= plant.fertilizingFreq) {
                        fertilizerUrgency = 'today';
                        fertilizerTiming = `${daysSinceFertilized - plant.fertilizingFreq} days overdue`;
                    }

                    actions.push({
                        id: fertilizerActionId,
                        plantId: plant.id,
                        type: 'fertilize',
                        title: 'Fertilize Plant',
                        plantName: plant.name,
                        urgency: fertilizerUrgency,
                        timing: fertilizerTiming,
                        priority: daysSinceFertilized >= plant.fertilizingFreq ? 2 : 1
                    });
                }
            });

            // Sort by priority (urgent first)
            actions.sort((a, b) => b.priority - a.priority);

            // Add completed actions
            completedActions.forEach(actionId => {
                const [type, plantId] = actionId.split('-');
                const plant = plants.find(p => p.id === parseInt(plantId));
                if (plant) {
                    actions.push({
                        id: actionId,
                        plantId: plant.id,
                        type: type,
                        title: type === 'water' ? 'Water Plant' : 'Fertilize Plant',
                        plantName: plant.name,
                        urgency: 'completed',
                        timing: 'Completed today',
                        priority: 0
                    });
                }
            });

            actionList.innerHTML = actions.map(action => `
                <div class="action-item ${action.urgency}" onclick="toggleAction('${action.id}')">
                    <div class="action-icon">
                        ${action.type === 'water' ? '💧' : '🌱'}
                    </div>
                    <div class="action-content">
                        <div class="action-title">${action.title}</div>
                        <div class="action-plant">${action.plantName}</div>
                        <div class="action-timing ${action.urgency}">${action.timing}</div>
                    </div>
                    <button class="complete-btn ${action.urgency === 'completed' ? 'completed' : ''}" 
                            onclick="event.stopPropagation(); toggleAction('${action.id}')">
                    </button>
                </div>
            `).join('');
        }

        // Toggle action completion
        function toggleAction(actionId) {
            const index = completedActions.indexOf(actionId);
            if (index > -1) {
                completedActions.splice(index, 1);
            } else {
                completedActions.push(actionId);

                // Update last care date
                const [type, plantId] = actionId.split('-');
                const plant = plants.find(p => p.id === parseInt(plantId));
                if (plant) {
                    if (type === 'water') {
                        plant.lastWatered = new Date();
                    } else if (type === 'fertilize') {
                        plant.lastFertilized = new Date();
                    }
                    showNotification(`${plant.name} has been ${type === 'water' ? 'watered' : 'fertilized'}!`, 'success');
                }
            }

            renderPlants();
            renderStats();
            renderActions();
        }

        // Add new plant
        function addPlant() {
            currentEditingId = null;
            document.getElementById('modalTitle').textContent = 'Add New Plant';
            document.getElementById('plantForm').reset();
            document.getElementById('plantModal').style.display = 'block';
        }

        // Edit plant
        function editPlant(id) {
            const plant = plants.find(p => p.id === id);
            if (plant) {
                currentEditingId = id;
                document.getElementById('modalTitle').textContent = 'Edit Plant';
                document.getElementById('plantName').value = plant.name;
                document.getElementById('scientificName').value = plant.scientificName;
                document.getElementById('plantImage').value = plant.image;
                document.getElementById('careLevel').value = plant.careLevel;
                document.getElementById('lightRequirement').value = plant.lightRequirement;
                document.getElementById('wateringFreq').value = plant.wateringFreq;
                document.getElementById('waterVolume').value = plant.waterVolume;
                document.getElementById('fertilizingFreq').value = plant.fertilizingFreq;
                document.getElementById('notes').value = plant.notes || '';
                document.getElementById('plantModal').style.display = 'block';
            }
        }

        // Delete plant
        function deletePlant(id) {
            if (confirm('Are you sure you want to delete this plant?')) {
                plants = plants.filter(p => p.id !== id);
                // Remove related completed actions
                completedActions = completedActions.filter(actionId =>
                    !actionId.endsWith(`-${id}`)
                );
                renderPlants();
                renderStats();
                renderActions();
                showNotification('Plant deleted successfully', 'success');
            }
        }

        // View plant details (placeholder)
        function viewPlantDetails(id) {
            const plant = plants.find(p => p.id === id);
            if (plant) {
                alert(`${plant.name} Details:\n\nScientific Name: ${plant.scientificName}\nCare Level: ${plant.careLevel}\nLight: ${plant.lightRequirement}\nWatering: Every ${plant.wateringFreq} days\nFertilizing: Every ${plant.fertilizingFreq} days\n\nNotes: ${plant.notes || 'None'}`);
            }
        }

        // Close modal
        function closeModal() {
            document.getElementById('plantModal').style.display = 'none';
        }

        // Handle form submission
        document.getElementById('plantForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('plantName').value,
                scientificName: document.getElementById('scientificName').value,
                image: document.getElementById('plantImage').value || 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=200&fit=crop',
                careLevel: document.getElementById('careLevel').value,
                lightRequirement: document.getElementById('lightRequirement').value,
                wateringFreq: parseInt(document.getElementById('wateringFreq').value),
                waterVolume: parseInt(document.getElementById('waterVolume').value),
                fertilizingFreq: parseInt(document.getElementById('fertilizingFreq').value),
                notes: document.getElementById('notes').value
            };

            if (currentEditingId) {
                // Edit existing plant
                const plant = plants.find(p => p.id === currentEditingId);
                Object.assign(plant, formData);
                showNotification('Plant updated successfully!', 'success');
            } else {
                // Add new plant
                const newPlant = {
                    id: Math.max(...plants.map(p => p.id), 0) + 1,
                    ...formData,
                    lastWatered: new Date(),
                    lastFertilized: new Date()
                };
                plants.push(newPlant);
                showNotification('Plant added successfully!', 'success');
            }

            closeModal();
            renderPlants();
            renderStats();
            renderActions();
        });

        // Show notification
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Close modal when clicking outside
        window.onclick = function (event) {
            const modal = document.getElementById('plantModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Initialize dashboard when page loads
        document.addEventListener('DOMContentLoaded', init);

        // Auto-refresh tips periodically
        setInterval(showRandomTip, 30000); // Change tip every 30 seconds