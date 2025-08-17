/**
 * This function looks for the "For you" tab on X.com and hides it.
 * It uses a MutationObserver to handle dynamically loaded content,
 * ensuring the tab is hidden even if it appears after the initial page load.
 */
function hideForYouTab() {
  // Find all links that act as tabs.
  const tabLinks = document.querySelectorAll('a[role="tab"]');

  for (const link of tabLinks) {
    // Find the link that contains the "For you" text.
    const span = link.querySelector('span');
    if (span && span.innerText.trim() === 'For you') {
      // Based on the new structure, the element to hide is the parent div with role="presentation".
      const tabElement = link.closest('div[role="presentation"]');
      if (tabElement) {
        console.log('Hiding "For you" tab.');
        tabElement.style.display = 'none';
        // Once we've found and hidden it, we can stop looking.
        return true;
      }
    }
  }
  return false; // Return false if not found yet.
}

/**
 * Since X.com is a single-page application, content is loaded dynamically.
 * A MutationObserver is the most reliable way to watch for the tab to appear.
 */
const observer = new MutationObserver((mutations, obs) => {
  // We run our function to find and hide the tab.
  const isHidden = hideForYouTab();
  // If the tab was successfully hidden, we can disconnect the observer
  // for this page view to save resources.
  if (isHidden) {
    obs.disconnect();
  }
});

// Start observing the entire document body for changes in the DOM tree.
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also run it once on initial load, just in case.
hideForYouTab();
