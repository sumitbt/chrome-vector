/**
 * This script hides sponsored posts and "Suggested for you" sections on Instagram.
 * It uses a MutationObserver to handle dynamically loaded content.
 */
function hideInstagramAnnoyances() {
  // --- Hide Sponsored Posts ---
  // Find all spans within an article, which is where the "Sponsored" label usually is.
  document.querySelectorAll('article span').forEach(span => {
    // Check for the specific "Sponsored" text content.
    if (span.textContent === 'Sponsored') {
      // Find the parent <article> element, which contains the entire post.
      const article = span.closest('article');
      // If we found it and it's not already hidden, hide it.
      if (article && article.style.display !== 'none') {
        console.log('Hiding Sponsored Post');
        article.style.display = 'none';
      }
    }
  });

  // --- Hide "Suggested for you" sections ---
  // Find all h2 elements, as "Suggested for you" is typically a heading.
  document.querySelectorAll('h2').forEach(h2 => {
    if (h2.textContent === 'Suggested for you') {
      // For suggestions inside the main feed, the container is often a list item.
      let container = h2.closest('li');
      
      // If it's not in a list item (e.g., in the right sidebar),
      // we'll try a different strategy by walking up the DOM tree.
      if (!container) {
          let parent = h2.parentElement;
          // Walk up 4 levels, which is a common structure for the sidebar container.
          for (let i = 0; i < 4 && parent; i++) {
              parent = parent.parentElement;
          }
          container = parent;
      }

      // If we found a container and it's not already hidden, hide it.
      if (container && container.style.display !== 'none') {
        console.log('Hiding "Suggested for you" section');
        container.style.display = 'none';
      }
    }
  });
}

// Set up a MutationObserver to watch for changes in the page content.
const observer = new MutationObserver(hideInstagramAnnoyances);

// Start observing the entire document for additions of new elements.
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Run the function once when the script is first injected,
// just in case some elements are already on the page.
hideInstagramAnnoyances();
