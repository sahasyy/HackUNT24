// Toggle Spookify mode
document.addEventListener('DOMContentLoaded', () => {
    const trickButton = document.getElementById('trick-btn');
    const treatButton = document.getElementById('treat-btn');
    const messageImage = document.getElementById('message-image');
    const spookifyButton = document.getElementById('spookify-btn');

    // Array of sample images (replace with real images)
    const images = [
        { src: 'scam-example.png', isScam: true },
        { src: 'legit-example.png', isScam: false },
        // Add more images as needed
    ];

    let currentIndex = 0;

    // Function to update the image
    function updateImage() {
        messageImage.src = images[currentIndex].src;
    }

    // Event listeners for buttons
    trickButton.addEventListener('click', () => {
        checkAnswer(true);
    });

    treatButton.addEventListener('click', () => {
        checkAnswer(false);
    });

    spookifyButton.addEventListener('click', () => {
        document.body.classList.toggle('spooky-mode');
    });

    // Function to check the answer
    function checkAnswer(isScamSelected) {
        const isCorrect = images[currentIndex].isScam === isScamSelected;
        alert(isCorrect ? 'Correct!' : 'Incorrect!');
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    // Initialize the first image
    updateImage();
});

