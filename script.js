/*-------------------------Arrows-----------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
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
  rightArrow.addEventListener('click', function () {
    let nextIndex = (currentIndex + 1) % sections.length;
    showSection(nextIndex);
  });

  // Left arrow click handler
  leftArrow.addEventListener('click', function () {
    let prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    showSection(prevIndex);
  });

  // Initialize - show first section and set arrow visibility
  showSection(0);

  // Hide left arrow initially (since we're starting at index 0)
  leftArrow.style.display = 'none';
});

/*-------------------------Typewriter Effect-----------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
  // Typewriter effect for the name
  const typewriterElement = document.getElementById('typewriter');
  
  // Check if the element exists
  if (typewriterElement) {
    const textToType = "Lumi-ex"; // Change this to your desired text
    typewriterElement.innerHTML = ''; // Clear any existing content
    let charIndex = 0;
    
    // Rainbow colors array
    const rainbowColors = [
      '#ff0000', // Red
      '#ff7f00', // Orange
      '#ffff00', // Yellow
      '#00ff00', // Green
      '#0000ff', // Blue
      '#4b0082', // Indigo
      '#9400d3'  // Violet
    ];
    
    function typeWriter() {
      if (charIndex < textToType.length) {
        const colorIndex = charIndex % rainbowColors.length;
        const char = textToType.charAt(charIndex);
        const coloredChar = `<span style="color: ${rainbowColors[colorIndex]}">${char}</span>`;
        typewriterElement.innerHTML += coloredChar;
        charIndex++;
        setTimeout(typeWriter, 150); // Adjust typing speed here (milliseconds)
      }
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 500); // Small delay before starting
  } else {
    console.error("Element with ID 'typewriter' not found");
  }
});