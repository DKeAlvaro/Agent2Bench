document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    // Variables for smooth movement
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rotation = 0;
    let scale = 1;
    let lastSpeed = 0;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Smooth animation
    function animate() {
        // Smooth movement for glow with dynamic easing
        const ease = 0.08 + (Math.hypot(targetX - currentX, targetY - currentY) * 0.0001);
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        // Calculate speed and direction
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const speed = Math.hypot(dx, dy);
        
        // Smooth speed transition
        lastSpeed = lastSpeed * 0.8 + speed * 0.2;
        
        // Update rotation based on movement direction
        const targetRotation = Math.atan2(dy, dx) * (180 / Math.PI);
        const rotationDiff = targetRotation - rotation;
        rotation += rotationDiff * 0.1;

        // Calculate scale based on speed
        const targetScale = 1 + Math.min(lastSpeed * 0.002, 0.3);
        scale += (targetScale - scale) * 0.1;

        // Apply transforms
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
        cursorGlow.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
        
        // Subtle opacity variation based on speed
        cursorGlow.style.opacity = Math.max(0.4, Math.min(0.6, 0.4 + lastSpeed * 0.001));

        requestAnimationFrame(animate);
    }

    animate();

    // Handle cursor entering/leaving interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, .task-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '200px';
            cursorGlow.style.height = '200px';
        });

        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '300px';
            cursorGlow.style.height = '300px';
        });
    });
}); 