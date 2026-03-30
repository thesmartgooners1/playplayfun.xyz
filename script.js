// loader.js

// Create loader element
const loader = document.createElement('div');
loader.id = 'loader';
loader.innerHTML = `
  <div class="spinner"></div>
  <p class="loader-text">Loading PlayPlayFun...</p>
`;
document.body.prepend(loader);

// Hide loader when page fully loads
window.addEventListener('load', () => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
});
