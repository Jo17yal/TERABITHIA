function showExoplanetInfo() {
    const exoplanetDropdown = document.getElementById('exoplanetDropdown');
    const selectedExoplanet = exoplanetDropdown.value;
    const exoplanetInfo = document.getElementById('exoplanetInfo');
    const view3DButton = document.getElementById('view3DButton');
    
    // Display information about the selected exoplanet
    switch (selectedExoplanet) {
        case 'Proxima Centauri b':
            exoplanetInfo.innerHTML = '<p>Proxima Centauri b is an exoplanet orbiting the closest star to our solar system.</p>';
            break;
        case 'LHS 1140 b':
            exoplanetInfo.innerHTML = '<p>LHS 1140 b is one of the most promising exoplanets for studying atmospheres.</p>';
            break;
        case 'Kepler-452b':
            exoplanetInfo.innerHTML = '<p>Kepler-452b is often referred to as Earth’s "older cousin".</p>';
            break;
        case 'TRAPPIST-1e':
            exoplanetInfo.innerHTML = '<p>TRAPPIST-1e is one of the seven planets orbiting the ultracool dwarf star TRAPPIST-1.</p>';
            break;
        case 'HD 209458 b (Osiris)':
            exoplanetInfo.innerHTML = '<p>HD 209458 b, also known as Osiris, was the first exoplanet detected transiting its star.</p>';
            break;
        case '55 Cancri e':
            exoplanetInfo.innerHTML = '<p>55 Cancri e is a super-Earth exoplanet orbiting a star 41 light-years away.</p>';
            break;
        case 'WASP-12b':
            exoplanetInfo.innerHTML = '<p>WASP-12b is a hot Jupiter with one of the shortest orbital periods ever discovered.</p>';
            break;
        case 'Gliese 581d':
            exoplanetInfo.innerHTML = '<p>Gliese 581d is an exoplanet that resides in the habitable zone of the Gliese 581 system.</p>';
            break;
        case 'Kepler-22b':
            exoplanetInfo.innerHTML = '<p>Kepler-22b is a super-Earth exoplanet, and the first planet confirmed by NASA to orbit in the habitable zone.</p>';
            break;
        case 'TOI 700 d':
            exoplanetInfo.innerHTML = '<p>TOI 700 d is a potentially habitable exoplanet orbiting the star TOI 700.</p>';
            break;
        default:
            exoplanetInfo.innerHTML = '';
            break;
    }
    
    // Enable the "View in 3D" button after a valid exoplanet is selected
    if (selectedExoplanet) {
        view3DButton.disabled = false;
    } else {
        view3DButton.disabled = true;  // Disable button if no valid selection
    }
}

function viewExoplanet3D() {
    const selectedExoplanet = document.getElementById('exoplanetDropdown').value;

    // Redirect user to the respective 3D page for the selected exoplanet
    if (selectedExoplanet) {
        switch (selectedExoplanet) {
            case 'Proxima Centauri b':
                window.location.href = 'pcb.html';
                break;
            case 'LHS 1140 b':
                window.location.href = 'lhs.html';
                break;
            case 'Kepler-452b':
                window.location.href = 'kepler.html';
                break;
            case 'HD 209458 b (Osiris)':
                window.location.href = 'hd209458b3d.html';
                break;
            case '55 Cancri e':
                window.location.href = '55CancriE3d.html';
                break;
            case 'WASP-12b':
                window.location.href = 'wasp12b3d.html';
                break;
            case 'Gliese 581d':
                window.location.href = 'gliese581d3d.html';
                break;
            case 'Kepler-22b':
                window.location.href = 'kepler22b3d.html';
                break;
            case 'TOI 700 d':
                window.location.href = 'toi700d3d.html';
                break;
            default:
                console.error('No matching 3D view for selected exoplanet.');
                break;
        }
    }
}
