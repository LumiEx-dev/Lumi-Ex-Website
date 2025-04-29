document.addEventListener('DOMContentLoaded', function() {
  // Get all sections and arrow elements
  const sections = document.querySelectorAll('.section');
  const rightArrow = document.querySelector('.arrow-right');
  const leftArrow = document.querySelector('.arrow-left');

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

    // Update arrow visibility
    updateArrowVisibility();
  }

  // Function to update arrow visibility based on current index
  function updateArrowVisibility() {
    // Left arrow is only visible on indexes 1 and 2
    if (currentIndex === 1 || currentIndex === 2) {
      leftArrow.style.display = 'flex';
    } else {
      leftArrow.style.display = 'none';
    }

    // Right arrow is not visible on index 2
    if (currentIndex === 2) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = 'flex';
    }
  }

  // Right arrow click handler
  rightArrow.addEventListener('click', function() {
    let nextIndex = (currentIndex + 1) % sections.length;
    showSection(nextIndex);
  });

  // Left arrow click handler
  leftArrow.addEventListener('click', function() {
    let prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    showSection(prevIndex);
  });

  // Initialize - show first section and set arrow visibility
  showSection(0);

  // Hide left arrow initially (since we're starting at index 0)
  leftArrow.style.display = 'none';
});

window.addEventListener('load', function() {
  document.getElementById('loader').style.display = 'none';
});