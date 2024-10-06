const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX - 220; // Adjust width based on toolbar
canvas.height = window.innerHeight - canvasOffsetY - 50; // Adjust height for toolbar

let isPainting = false;
let lineWidth = 5;
let startX, startY; // Variables to store the starting point of the line
ctx.strokeStyle = '#000000'; // Default stroke color

// Image variables
let backgroundImage = new Image();
let isImageLoaded = false;

// Dropdown change event
document.getElementById('exoplanet-select').addEventListener('change', function() {
    const selectedExoplanet = this.value;
    applyLayout(selectedExoplanet);
});

// Function to apply background based on selected exoplanet
function applyLayout(exoplanet) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before changing layout
    isImageLoaded = false; // Reset image load status

    switch (exoplanet) {
        case 'proximaCentauri':
            backgroundImage.src = 'proxima.png'; // Set the image for Proxima Centauri b
            break;
        case 'kepler186f':
            backgroundImage.src = 'keplerpic.png'; // Set the image for Kepler-186f
            break;
        case 'trappist1e':
            backgroundImage.src = 'images/trappist1e.jpg'; // Set the image for TRAPPIST-1e
            break;
        default:
            backgroundImage.src = ''; // Clear the background if no valid exoplanet selected
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Ensure canvas is cleared
            break;
    }
}

// Load and draw the background image, resizing to fit the canvas while maintaining aspect ratio
backgroundImage.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing new image

    // Get the image's original dimensions
    const imgWidth = backgroundImage.width;
    const imgHeight = backgroundImage.height;

    // Calculate the aspect ratio of the image
    const imgAspectRatio = imgWidth / imgHeight;

    // Calculate the canvas aspect ratio
    const canvasAspectRatio = canvas.width / canvas.height;

    let renderWidth, renderHeight;
    let renderX = 0, renderY = 0;

    // If the image's aspect ratio is wider than the canvas, adjust width to fit canvas
    if (imgAspectRatio > canvasAspectRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgAspectRatio;
        renderY = (canvas.height - renderHeight) / 2; // Center the image vertically
    } 
    // If the image's aspect ratio is taller than the canvas, adjust height to fit canvas
    else {
        renderHeight = canvas.height;
        renderWidth = canvas.height * imgAspectRatio;
        renderX = (canvas.width - renderWidth) / 2; // Center the image horizontally
    }

    // Draw the image with calculated dimensions and centering
    ctx.drawImage(backgroundImage, renderX, renderY, renderWidth, renderHeight);

    isImageLoaded = true; // Mark the image as loaded
};

// Clear button functionality
toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (isImageLoaded) {
            // Redraw the background image if cleared
            backgroundImage.onload();
        }
    }
});

// Stroke color and line width updates
toolbar.addEventListener('change', e => {
    if (e.target.id === 'stokr') {
        ctx.strokeStyle = e.target.value;
    }
    if (e.target.id === 'lineWidth') {
        lineWidth = parseInt(e.target.value, 10);
    }
});

// Drawing functionality
canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    const rect = canvas.getBoundingClientRect();
    // Store the starting point where the mouse is pressed down
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
});

canvas.addEventListener('mouseup', (e) => {
    if (isPainting) {
        const rect = canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        // Draw a straight line from the start point to the end point
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
        isPainting = false; // Reset painting state
    }
});

// Save button functionality
document.getElementById('save').addEventListener('click', function() {
    const nameInput = document.getElementById('constellation-name');
    const name = nameInput.value.trim();
    
    if (name) {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = name; // Set the text to the constellation name
        
        // Append the list item to the constellation list
        document.getElementById('constellation-list').appendChild(listItem); 
        
        nameInput.value = ''; // Clear the input field
        
        // Popup message after saving
        alert(`Constellation "${name}" saved successfully!`);

        // Clear the canvas for the next drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (isImageLoaded) {
            // Redraw the background image if necessary
            backgroundImage.onload();
        }
    } else {
        alert('Please enter a name for your constellation.');
    }
});

