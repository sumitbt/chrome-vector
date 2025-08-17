/**
 * This function looks for the "For you" tab on X.com and hides it.
 * It uses a MutationObserver to handle dynamically loaded content,
 * ensuring the tab is hidden even if it appears after the initial page load.
 */
function hideForYouTab() {
  // The "For you" and "Following" tabs are links within a navigation role.
  const navLinks = document.querySelectorAll('nav[role="navigation"] a[role="tab"]');

  for (const link of navLinks) {
    // Find the link that contains the "For you" text.
    // We check for a span inside the link, as that's where the text is.
    const span = link.querySelector('span');
    if (span && span.innerText.trim() === 'For you') {
      // The link is inside a list item which represents the whole tab.
      const tabElement = link.closest('li');
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
  // If the tab was successfully hidden, we don't need to observe anymore.
  if (isHidden) {
    obs.disconnect(); // Stop observing to save resources.
  }
});

// Start observing the entire document body for changes in the DOM tree.
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also run it once on initial load, just in case.
hideForYouTab();
