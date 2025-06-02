document.addEventListener('DOMContentLoaded', () => {
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        card.classList.add('filtering-out');
        
        setTimeout(() => {
          if (filterValue === 'all') {
            card.style.display = 'block';
            card.classList.remove('filtering-out');
            card.classList.add('filtering-in');
          } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === filterValue) {
              card.style.display = 'block';
              card.classList.remove('filtering-out');
              card.classList.add('filtering-in');
            } else {
              card.style.display = 'none';
            }
          }
        }, 200);

        // Clean up animation classes
        setTimeout(() => {
          card.classList.remove('filtering-in', 'filtering-out');
        }, 600);
      });
    });
  });

  // Add entrance animation
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Add scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  projectCards.forEach(card => {
    observer.observe(card);
  });
});

// GitHub API integration
async function fetchGitHubProjects() {
  try {
    const response = await fetch('https://api.github.com/users/Lumi-ex/repos?sort=updated&per_page=10');
    const repos = await response.json();
    
    // You can use this data to dynamically populate projects
    console.log('GitHub repos:', repos);
    
    // Update project count in the home page if needed
    const projectCount = repos.length;
    // Update the count badge on your homepage
    
  } catch (error) {
    console.log('Could not fetch GitHub data:', error);
  }
}

// Call the function when page loads
fetchGitHubProjects();