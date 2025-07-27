import { createPage } from "../../core/create-page";
import { indoorPlantsList } from "../indoor-plants/indoor-plants-list"

const indoorPlants = indoorPlantsList;
const html = `
<section class="hero page">
    <div class="container">
        <div class="hero-grid">
            <div class="hero-content">
                <h1>🌱 Smart Plant Care for Dublin Homes</h1>
                <p>Help your indoor plants thrive — no sensors, no guesswork. Just daily check-ins and friendly care
                    suggestions tailored to your space.</p>
                <div class="hero-buttons">
                    <a href="/signup" class="btn">Get Started</a>
                    <a href="/login" class="btn btn-secondary">Log In</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="${indoorPlants[12].image}"
                    alt="Indoor Plant by Window">
            </div>
        </div>
    </div>
</section>

<section class="features">
    <div class="container">
        <h2>Why You'll Love It</h2>
        <div class="feature-grid">
            <div class="card">
                <img src="${indoorPlants[9].image}"
                    alt="Sunlight on Plants">
                <h3>Tailored for Dublin</h3>
                <p>Care tips are based on Dublin’s light patterns and indoor climate — no general advice here.</p>
            </div>
            <div class="card">
                <img src="${indoorPlants[0].image}"
                    alt="Notebook and Plant">
                <h3>No Devices Needed</h3>
                <p>Forget smart pots. Just tap in your care updates and let us handle the rest.</p>
            </div>
            <div class="card">
                <img src="${indoorPlants[3].image}"
                    alt="Peace Lily">
                <h3>Smart & Adaptive</h3>
                <p>Our AI learns from your routine and gives smarter suggestions over time — perfect for beginners or
                    busy plant parents.</p>
            </div>
        </div>
    </div>
</section>

<section class="how-it-works">
    <div class="container">
        <h2>How It Works</h2>
        <div class="steps">
            <div class="step">
                <span>1</span>
                <h4>Create your plant list</h4>
                <p>Add names, types, and even a photo for each of your indoor plants.</p>
            </div>
            <div class="step">
                <span>2</span>
                <h4>Check in each day</h4>
                <p>Tell us if your plant got water, sunlight, or nutrients. That’s it!</p>
            </div>
            <div class="step">
                <span>3</span>
                <h4>Get smart care tips</h4>
                <p>See alerts like “Your Peace Lily hasn’t had sunlight in 2 days” — all in a clean dashboard.</p>
            </div>
        </div>
    </div>
</section>

<section class="testimonial">
    <div class="container">
        <h2>What Users Are Saying</h2>
        <div class="testimonial-card card">
            <p>“I always forgot when I watered my plants. Now I get daily reminders and they’ve never looked better.
                Love how simple it is!”</p>
            <strong>– Ciara M., Dublin 4</strong>
        </div>
    </div>
</section>

<section class="cta">
    <div class="container">
        <h2>Start Taking Better Care of Your Plants</h2>
        <a href="/signup" class="btn">Create Your Free Account</a>
    </div>
</section>s
`

export function homePage() {
    const page = createPage(html, 'home.css');
    return page;
}