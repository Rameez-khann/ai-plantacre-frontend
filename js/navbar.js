// Reusable Navbar Component
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar');
    
    if (navbarContainer) {
        // Insert navbar HTML
        navbarContainer.innerHTML = `
            <nav class="nav">
                <div class="container">
                    <div class="nav-content">
                        <div class="logo">
                            🌱 Smart Plant Care
                        </div>
                        <ul class="nav-links">
                            <li><a href="/">Home</a></li>                        
                            <li><a href="/">About</a></li>                        
                            <li><a href="/#plants">My Plants</a></li>
                            <li><a href="/login.html">Login</a></li>
                            <li><a href="/signup.html">Sign Up</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        // Add smooth scrolling for anchor links
        navbarContainer.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
});