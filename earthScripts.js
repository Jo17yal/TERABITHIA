let scene, camera, renderer, earth, stars, exoplanets = [], controls;
let mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();
let selectedConstellation = null;
let drawingConstellation = false, constellationPoints = [];
let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 4);  // Adjust camera distance from the Earth

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('earthCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableRotate = true;  // Enable rotation of the night sky

    // Earth (Increase size for better visibility)
    const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const earthTexture = new THREE.TextureLoader().load('51 Pegasi b Planet.png'); 
    const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(0, -1, 0);  // Adjust Earth's position slightly lower
    scene.add(earth);

    // Add lighting to make the Earth more visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Starry Background (Rotatable sky)
    const starGeometry = new THREE.SphereGeometry(90, 64, 64);
    const starTexture = new THREE.TextureLoader().load('kep pl.jpg');
    const starMaterial = new THREE.MeshBasicMaterial({
        map: starTexture,
        side: THREE.BackSide
    });
    stars = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(stars);

    // Add exoplanets and constellations
    addExoplanetsAndConstellations();

    // Raycasting setup
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onMouseClick);

    // Handle window resizing
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // Update Latitude/Longitude
    updateLatLon();
}

function addExoplanetsAndConstellations() {
    const exoplanetGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const exoplanetMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // Add random exoplanets/constellations for demo
    for (let i = 0; i < 10; i++) {
        const exoplanet = new THREE.Mesh(exoplanetGeometry, exoplanetMaterial);
        exoplanet.position.set(
            Math.random() * 80 - 40,
            Math.random() * 80 - 40,
            Math.random() * 80 - 40
        );
        exoplanet.name = "Exoplanet " + (i + 1);  // Give it a name
        exoplanet.userData = {  // Add more details to the exoplanet
            distance: (Math.random() * 1000).toFixed(2),
            hostStar: `Star ${i + 1}`
        };
        scene.add(exoplanet);
        exoplanets.push(exoplanet);
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the sky around the user
    stars.rotation.y += 0.001;

    controls.update();
    renderer.render(scene, camera);
}

// Handle mouse movement for raycasting
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Handle clicking on exoplanets or drawing constellations
function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(exoplanets);

    if (drawingConstellation && intersects.length > 0) {
        const intersectedPoint = intersects[0].object.position;
        constellationPoints.push(intersectedPoint);
        if (constellationPoints.length > 1) {
            drawConstellationLine(constellationPoints);
        }
    } else if (intersects.length > 0) {
        // Exoplanet clicked - show details
        const exoplanet = intersects[0].object;
        document.getElementById('constellationInfo').innerHTML = `
            <p><strong>${exoplanet.name}</strong></p>
            <p>Distance: ${exoplanet.userData.distance} light years</p>
            <p>Host Star: ${exoplanet.userData.hostStar}</p>`;
    }
}

// Drawing constellations (lines between stars)
function drawConstellationLine(points) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, lineMaterial);
    scene.add(line);
}

// Toggle constellation drawing mode
document.getElementById('drawConstellationBtn').addEventListener('click', () => {
    drawingConstellation = !drawingConstellation;
    if (drawingConstellation) {
        constellationPoints = [];  // Reset points when starting a new constellation
    }
});

function updateLatLon() {
    const latitude = (camera.rotation.x * 180 / Math.PI).toFixed(2);
    const longitude = (camera.rotation.y * 180 / Math.PI).toFixed(2);
    document.getElementById('latitude').innerText = latitude;
    document.getElementById('longitude').innerText = longitude;
}
function addExoplanetSearch() {
    const exoplanetSelect = document.getElementById('exoplanetSelect');
    exoplanets.forEach(exoplanet => {
        const option = document.createElement('option');
        option.value = exoplanet.name;
        option.innerText = exoplanet.name;
        exoplanetSelect.appendChild(option);
    });

    // Add event listener for the search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        const selectedName = exoplanetSelect.value;
        if (selectedName) {
            const selectedExoplanet = exoplanets.find(exo => exo.name === selectedName);
            if (selectedExoplanet) {
                camera.position.set(...selectedExoplanet.position);
                controls.target.copy(selectedExoplanet.position); // Focus on the exoplanet

                // Display exoplanet information
                document.getElementById('constellationInfo').innerHTML = `
                    <p><strong>${selectedExoplanet.name}</strong></p>
                    <p>Distance: ${selectedExoplanet.userData.distance} light years</p>
                    <p>Host Star: ${selectedExoplanet.userData.hostStar}</p>`;
            }
        } else {
            alert('Please select an exoplanet to search for.');
        }
        
    });
}
