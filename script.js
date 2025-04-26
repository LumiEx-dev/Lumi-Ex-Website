document.addEventListener('DOMContentLoaded', function() {
  // Get all sections and the arrow element
  const sections = document.querySelectorAll('.section');
  const arrowElement = document.querySelector('.arrows');
  const dots = document.querySelectorAll('.dot');

  // Track current section index
  let currentIndex = 0;

  // Function to show a specific section
  function showSection(index) {
    // Hide all sections
    sections.forEach(section => {
      section.style.display = 'none';
      section.classList.remove('active');
    });

    // Show the selected section
    sections[index].style.display = 'flex';
    sections[index].classList.add('active');

    // Update current index
    currentIndex = index;
  }

  // Click handler for the arrow
  arrowElement.addEventListener('click', function() {
    // Calculate next section index (loop back to 0 if at the end)
    let nextIndex = (currentIndex + 1) % sections.length;
    showSection(nextIndex);
  });

  // Make the arrow look clickable
  arrowElement.style.cursor = 'pointer';

  // Initialize first section (optional, if you want to ensure proper initial state)
  showSection(currentIndex);
});