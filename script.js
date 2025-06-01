document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('movableContainer');
  let draggingElem = null;
  let dropZone = null;

  // Create drop zone indicator
  function createDropZone() {
    const zone = document.createElement('div');
    zone.className = 'drop-zone';
    return zone;
  }

  // Get insertion point based on mouse position
  function getInsertionPoint(container, x, y) {
    const boxes = [...container.querySelectorAll('.movable-box:not(.dragging)')];
    
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      const rect = box.getBoundingClientRect();
      
      // Check if we're in the first half of this box
      if (x < rect.left + rect.width / 2 && y >= rect.top && y <= rect.bottom) {
        return { element: box, position: 'before' };
      }
      
      // Check if we're in the second half of this box
      if (x >= rect.left + rect.width / 2 && y >= rect.top && y <= rect.bottom) {
        return { element: box, position: 'after' };
      }
    }
    
    // If we're not over any box, determine if we should insert at the end
    return { element: null, position: 'end' };
  }

  container.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('movable-box')) {
      draggingElem = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', '');
      
      // Create drop zone
      dropZone = createDropZone();
      
      setTimeout(() => {
        if (draggingElem) {
          draggingElem.classList.add('dragging');
        }
      }, 0);
    }
  });

  container.addEventListener('dragend', (e) => {
    if (draggingElem) {
      draggingElem.classList.remove('dragging');
      draggingElem = null;
    }
    
    // Remove drop zone
    if (dropZone && dropZone.parentNode) {
      dropZone.remove();
      dropZone = null;
    }
    
    // Remove all drag-over classes
    container.querySelectorAll('.drag-over').forEach(box => {
      box.classList.remove('drag-over');
    });
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!draggingElem || !dropZone) return;
    
    const insertion = getInsertionPoint(container, e.clientX, e.clientY);
    
    // Remove previous drag-over classes
    container.querySelectorAll('.drag-over').forEach(box => {
      box.classList.remove('drag-over');
    });
    
    // Remove drop zone from DOM if it exists
    if (dropZone.parentNode) {
      dropZone.remove();
    }
    
    if (insertion.position === 'before' && insertion.element) {
      // Insert drop zone before the element
      container.insertBefore(dropZone, insertion.element);
      insertion.element.classList.add('drag-over');
    } else if (insertion.position === 'after' && insertion.element) {
      // Insert drop zone after the element
      const nextElement = insertion.element.nextElementSibling;
      if (nextElement) {
        container.insertBefore(dropZone, nextElement);
      } else {
        container.appendChild(dropZone);
      }
      insertion.element.classList.add('drag-over');
    } else {
      // Insert at the end
      container.appendChild(dropZone);
    }
    
    // Show the drop zone
    setTimeout(() => {
      if (dropZone) {
        dropZone.classList.add('show');
      }
    }, 10);
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    
    if (!draggingElem || !dropZone) return;
    
    // Place the dragged element where the drop zone is
    if (dropZone.parentNode) {
      dropZone.parentNode.insertBefore(draggingElem, dropZone);
    }
  });

  container.addEventListener('dragleave', (e) => {
    // Only hide drop zone if we're leaving the container entirely
    if (!container.contains(e.relatedTarget)) {
      if (dropZone) {
        dropZone.classList.remove('show');
      }
      
      // Remove drag-over classes
      container.querySelectorAll('.drag-over').forEach(box => {
        box.classList.remove('drag-over');
      });
    }
  });
});