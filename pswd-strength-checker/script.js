const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('strengthBar');
const strengthLevel = document.getElementById('strengthLevel');
const togglePassword = document.getElementById('togglePassword');

// Password strength logic
passwordInput.addEventListener('input', updateStrength);

// Toggle password visibility with better icon handling
togglePassword.addEventListener('click', function() {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.textContent = isPassword ? '👁️‍🗨️' : '👁️';
    passwordInput.focus();  // Maintain focus after toggle
});

// Rest of the strength calculation remains same
function updateStrength() {
    const password = passwordInput.value;
    const strength = calculateStrength(password);
    strengthBar.style.width = `${strength.score * 25}%`;
    strengthBar.style.backgroundColor = getColor(strength.score);
    strengthLevel.textContent = strength.level;
    strengthLevel.style.color = getColor(strength.score);
}

function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const level = levels[Math.min(score, levels.length - 1)];
    return { score, level };
}

function getColor(score) {
    const colors = ['#ff4d4d', '#ffa64d', '#ffcc00', '#66cc00', '#009900'];
    return colors[Math.min(score, colors.length - 1)];
}