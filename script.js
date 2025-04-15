// Password strength meter
document.getElementById('password').addEventListener('input', function() {
  const strengthMeter = document.createElement('div');
  strengthMeter.id = 'strengthMeter';
  this.parentNode.appendChild(strengthMeter);
  
  const strength = calculateStrength(this.value);
  strengthMeter.textContent = `Strength: ${strength}/5`;
});

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}