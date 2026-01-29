/**
 * Jedi Scroll - Hand Gesture Controlled Scrolling
 * Uses MediaPipe Hands for real-time hand tracking
 */

// ===========================================
// Configuration
// ===========================================
const CONFIG = {
    // Scroll zone thresholds (0-1 range, percentage of screen height)
    SCROLL_UP_THRESHOLD: 0.2,    // Top 20% triggers scroll up
    SCROLL_DOWN_THRESHOLD: 0.8,  // Bottom 20% triggers scroll down
    
    // Scroll speed (pixels per frame)
    SCROLL_SPEED: 15,
    
    // MediaPipe settings
    MAX_NUM_HANDS: 1,
    MODEL_COMPLEXITY: 1,
    MIN_DETECTION_CONFIDENCE: 0.5,
    MIN_TRACKING_CONFIDENCE: 0.5,
    
    // Camera settings
    CAMERA_WIDTH: 640,
    CAMERA_HEIGHT: 480
};

// ===========================================
// DOM Elements
// ===========================================
const elements = {
    video: document.getElementById('input_video'),
    cursor: document.getElementById('cursor'),
    status: document.getElementById('status'),
    zoneTop: document.getElementById('zone-top'),
    zoneBottom: document.getElementById('zone-bottom')
};

// ===========================================
// MediaPipe Hands Setup
// ===========================================
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: CONFIG.MAX_NUM_HANDS,
    modelComplexity: CONFIG.MODEL_COMPLEXITY,
    minDetectionConfidence: CONFIG.MIN_DETECTION_CONFIDENCE,
    minTrackingConfidence: CONFIG.MIN_TRACKING_CONFIDENCE
});

hands.onResults(onResults);

// ===========================================
// Hand Tracking Results Handler
// ===========================================
function onResults(results) {
    // Reset zone indicators
    elements.zoneTop.classList.remove('active');
    elements.zoneBottom.classList.remove('active');

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        handleHandDetected(results.multiHandLandmarks[0]);
    } else {
        handleNoHand();
    }
}

/**
 * Process detected hand landmarks
 * @param {Array} landmarks - Array of 21 hand landmarks
 */
function handleHandDetected(landmarks) {
    updateStatus('System Active: Tracking Hand', '#00ffcc');
    
    // Track Index Finger Tip (Landmark #8)
    const indexTip = landmarks[8];
    
    // Calculate screen position (flip X because webcam is mirrored)
    const x = (1 - indexTip.x) * window.innerWidth;
    const y = indexTip.y * window.innerHeight;
    
    // Update cursor position
    showCursor(x, y);
    
    // Handle scrolling based on hand position
    handleScrolling(indexTip.y);
}

/**
 * Handle when no hand is detected
 */
function handleNoHand() {
    updateStatus('Waiting for hand...', '#fff');
    hideCursor();
}

/**
 * Update status text and color
 * @param {string} text - Status message
 * @param {string} color - Text color
 */
function updateStatus(text, color) {
    elements.status.innerText = text;
    elements.status.style.color = color;
}

/**
 * Show cursor at specified position
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function showCursor(x, y) {
    elements.cursor.style.display = 'block';
    elements.cursor.style.left = `${x}px`;
    elements.cursor.style.top = `${y}px`;
}

/**
 * Hide the cursor
 */
function hideCursor() {
    elements.cursor.style.display = 'none';
}

/**
 * Handle scrolling based on hand Y position
 * @param {number} yPosition - Normalized Y position (0-1)
 */
function handleScrolling(yPosition) {
    if (yPosition < CONFIG.SCROLL_UP_THRESHOLD) {
        // Hand in top zone - scroll up
        window.scrollBy(0, -CONFIG.SCROLL_SPEED);
        updateStatus('⬆️ Scrolling UP', '#00ffcc');
        elements.zoneTop.classList.add('active');
    } else if (yPosition > CONFIG.SCROLL_DOWN_THRESHOLD) {
        // Hand in bottom zone - scroll down
        window.scrollBy(0, CONFIG.SCROLL_SPEED);
        updateStatus('⬇️ Scrolling DOWN', '#00ffcc');
        elements.zoneBottom.classList.add('active');
    } else {
        // Hand in center - no scrolling
        updateStatus('✋ Hand Detected (Center)', '#00ffcc');
    }
}

// ===========================================
// Camera Initialization
// ===========================================
const camera = new Camera(elements.video, {
    onFrame: async () => {
        await hands.send({ image: elements.video });
    },
    width: CONFIG.CAMERA_WIDTH,
    height: CONFIG.CAMERA_HEIGHT
});

// Start the camera
camera.start()
    .then(() => {
        console.log('🎥 Camera started successfully');
    })
    .catch((error) => {
        console.error('❌ Camera error:', error);
        updateStatus('Camera access denied', '#ff5555');
    });

console.log('✨ Jedi Scroll initialized');
