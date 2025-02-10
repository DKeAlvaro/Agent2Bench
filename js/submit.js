// Form validation and submission handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-submission-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const formData = {
            name: document.getElementById('task-name').value,
            description: document.getElementById('task-description').value,
            difficulty: document.getElementById('task-difficulty').value,
            type: document.getElementById('task-type').value,
            verificationMethod: document.getElementById('verification-method').value,
            expectedOutput: document.getElementById('expected-output').value,
            timeLimit: document.getElementById('time-limit').value
        };
        
        try {
            // This would typically be an API call
            await submitTask(formData);
            
            // Show success message
            showNotification('Task submitted successfully! It will be reviewed by our team.', 'success');
            
            // Clear form
            form.reset();
            
        } catch (error) {
            showNotification('Error submitting task. Please try again.', 'error');
            console.error('Submission error:', error);
        }
    });
});

// Validate form fields
function validateForm() {
    const requiredFields = [
        'task-name',
        'task-description',
        'task-difficulty',
        'task-type',
        'verification-method',
        'expected-output',
        'time-limit'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        if (!value) {
            markFieldAsInvalid(field);
            isValid = false;
        } else {
            markFieldAsValid(field);
        }
    });
    
    // Additional validation rules
    const timeLimit = parseInt(document.getElementById('time-limit').value);
    if (isNaN(timeLimit) || timeLimit < 1 || timeLimit > 60) {
        markFieldAsInvalid(document.getElementById('time-limit'));
        showNotification('Time limit must be between 1 and 60 minutes.', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Visual feedback for form validation
function markFieldAsInvalid(field) {
    field.classList.add('invalid');
    const errorMessage = field.nextElementSibling?.classList.contains('error-message') 
        ? field.nextElementSibling 
        : document.createElement('div');
    
    if (!field.nextElementSibling?.classList.contains('error-message')) {
        errorMessage.classList.add('error-message');
        errorMessage.style.color = '#dc2626';
        errorMessage.style.fontSize = '0.875rem';
        errorMessage.style.marginTop = '0.25rem';
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    
    errorMessage.textContent = `${field.previousElementSibling.textContent} is required.`;
}

function markFieldAsValid(field) {
    field.classList.remove('invalid');
    const errorMessage = field.nextElementSibling;
    if (errorMessage?.classList.contains('error-message')) {
        errorMessage.remove();
    }
}

// Show notification message
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '1rem';
    notification.style.right = '1rem';
    notification.style.padding = '1rem';
    notification.style.borderRadius = '0.375rem';
    notification.style.backgroundColor = type === 'success' ? '#059669' : '#dc2626';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Mock API call for task submission
async function submitTask(formData) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random success/failure
    if (Math.random() > 0.1) { // 90% success rate
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Submission failed'));
    }
}

// Add input event listeners for real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-submission-form');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                if (input.value.trim()) {
                    markFieldAsValid(input);
                }
            }
        });
    });
}); 