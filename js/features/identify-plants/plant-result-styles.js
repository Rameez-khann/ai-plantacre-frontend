export const plantResultsCSS = `
<style>
.plant-results-container {
    animation: slideUp 0.6s ease-out;
}

.results-header {
    text-align: center;
    padding: 1.5rem 0;
    border-bottom: 2px solid var(--cream);
    margin-bottom: 2rem;
}

.detection-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.detection-status.is-plant {
    color: var(--primary-green);
}

.detection-status.not-plant {
    color: var(--text-light);
}

.detection-status i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.detection-status h2 {
    margin: 0;
    font-size: 1.8rem;
}

.detection-status p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.suggestions-section h3 {
    color: var(--primary-green);
    margin-bottom: 0.5rem;
}

.suggestions-section > p {
    color: var(--text-light);
    margin-bottom: 1.5rem;
}

.plant-suggestions {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.plant-suggestion {
    background: linear-gradient(135deg, var(--cream) 0%, rgba(167, 210, 143, 0.1) 100%);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    border: 2px solid var(--accent-green);
    transition: var(--transition);
}

.plant-suggestion.top-match {
    border-color: var(--primary-green);
    background: linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(167, 210, 143, 0.15) 100%);
    box-shadow: 0 4px 12px var(--shadow);
}

.plant-suggestion:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-hover);
}

.suggestion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.suggestion-header h3 {
    color: var(--primary-green);
    margin: 0;
    font-size: 1.3rem;
}

.confidence-badge {
    background: var(--accent-green);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

.top-match .confidence-badge {
    background: var(--primary-green);
}

.similar-images {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.similar-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: var(--border-radius);
    border: 2px solid var(--accent-green);
    transition: var(--transition);
}

.similar-image:hover {
    transform: scale(1.1);
    border-color: var(--primary-green);
}

.plant-info {
    display: flex;
    justify-content: center;
}

.get-care-btn {
    background: var(--secondary-green);
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
}

.get-care-btn:hover {
    background: var(--primary-green);
}

.no-results {
    text-align: center;
    padding: 2rem;
    color: var(--text-light);
}

.no-results p {
    font-size: 1.1rem;
    line-height: 1.6;
}

.results-visible {
    animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .suggestion-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .similar-images {
        justify-content: center;
    }
    
    .similar-image {
        width: 70px;
        height: 70px;
    }
    
    .detection-status h2 {
        font-size: 1.5rem;
    }
}
</style>
`;

export const plantCareInstructionsCSS = `<style>
.care-instructions {
    margin-top: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #28a745;
}

.care-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.care-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.care-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: white;
    flex-shrink: 0;
}

.care-item:nth-child(1) .care-icon { background: #007bff; } /* Water - Blue */
.care-item:nth-child(2) .care-icon { background: #ffc107; } /* Light - Yellow */
.care-item:nth-child(3) .care-icon { background: #8b4513; } /* Soil - Brown */
.care-item:nth-child(4) .care-icon { background: #28a745; } /* Nutrition - Green */

.care-content {
    flex: 1;
}

.care-content h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
}

.care-content p {
    margin: 0;
    font-size: 13px;
    color: #666;
    line-height: 1.4;
}

.nutrition-item {
    grid-column: 1 / -1; /* Full width for nutrition */
}

.nutrient {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
}

.nutrient:last-child {
    border-bottom: none;
}

.nutrient-name {
    font-weight: 500;
    color: #333;
    font-size: 12px;
}

.nutrient-schedule {
    font-size: 11px;
    color: #28a745;
    font-weight: 500;
}

@media (max-width: 768px) {
    .care-grid {
        grid-template-columns: 1fr;
    }
    
    .nutrition-item {
        grid-column: 1;
    }
}
</style>`;