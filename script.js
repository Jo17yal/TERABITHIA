// Pre-uploaded images (developer's responsibility)
const uploadedImages = [
    "kep452b.png",
    "Gliese 581g.png",
    "lhs.png",
    "51 Pegasi B.png",
    "trapp1d.png"
];

// Variables to handle preview and download
const imagePreview = document.getElementById('imagePreview');
const downloadAllBtn = document.getElementById('downloadAllBtn');

// Display pre-uploaded star map images
uploadedImages.forEach((imageSrc, index) => {
    const img = document.createElement('img');
    img.src = imageSrc;
    imagePreview.appendChild(img);
});

// Download all images as HD
downloadAllBtn.addEventListener('click', function() {
    uploadedImages.forEach((imgSrc, index) => {
        const link = document.createElement('a');
        link.href = imgSrc;

        // Set image filename and format
        link.download = `star_map_${index + 1}.png`;
        link.click();
    });
});
