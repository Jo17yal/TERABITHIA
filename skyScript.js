document.addEventListener('DOMContentLoaded', () => {
    const starCount = 200;
    const starContainer = document.querySelector('.stars');
    const exoplanetContainer = document.querySelector('.exoplanets');
    const constellationContainer = document.querySelector('.constellations');
    
    // Generate stars
    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        starContainer.appendChild(star);
    }

    // Generate clickable exoplanets
    const exoplanets = [
        {top: '30vh', left: '50vw', name: 'Exoplanet 1'},
        {top: '60vh', left: '40vw', name: 'Exoplanet 2'},
        {top: '80vh', left: '70vw', name: 'Exoplanet 3'}
    ];

    exoplanets.forEach(planet => {
        let exoplanet = document.createElement('div');
        exoplanet.classList.add('exoplanet');
        exoplanet.style.top = planet.top;
        exoplanet.style.left = planet.left;
        exoplanet.setAttribute('data-name', planet.name);
        exoplanet.addEventListener('click', () => {
            alert(`You clicked on ${planet.name}`);
        });
        exoplanetContainer.appendChild(exoplanet);
    });

    // Generate constellations (lines connecting stars)
    function createConstellation(x1, y1, x2, y2) {
        let line = document.createElement('div');
        line.classList.add('constellation-line');
        const length = Math.hypot(x2 - x1, y2 - y1);
        line.style.width = `${length}px`;
        line.style.top = `${y1}px`;
        line.style.left = `${x1}px`;
        line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
        constellationContainer.appendChild(line);
    }

    createConstellation(100, 100, 200, 200); // Example: connecting two stars
    createConstellation(200, 200, 300, 150); // Example: another line

    // Rotate sky with mouse movement
    document.addEventListener('mousemove', (e) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const mouseX = e.clientX / width * 2 - 1;
        const mouseY = e.clientY / height * 2 - 1;

        // Rotate the entire star container based on mouse movement
        starContainer.style.transform = `rotateX(${mouseY * 15}deg) rotateY(${mouseX * 30}deg)`;
        exoplanetContainer.style.transform = `rotateX(${mouseY * 15}deg) rotateY(${mouseX * 30}deg)`;
        constellationContainer.style.transform = `rotateX(${mouseY * 15}deg) rotateY(${mouseX * 30}deg)`;
    });
});
