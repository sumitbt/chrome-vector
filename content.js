/**
 * This function finds and hides the "For you" tab on X.com,
 * and then selects the "Following" tab to ensure the correct feed is displayed.
 * It uses a MutationObserver to handle dynamically loaded content.
 */
function switchTabs() {
  // Find all links that act as tabs.
  const tabLinks = document.querySelectorAll('a[role="tab"]');

  let forYouTabFound = false;
  let followingTabLink = null;

  // First, find the "Following" tab link so we can click it later.
  for (const link of tabLinks) {
    const span = link.querySelector('span');
    if (span && span.innerText.trim() === 'Following') {
      followingTabLink = link;
      break; // Found it, no need to continue this loop.
    }
  }

  // Now, find and hide the "For you" tab.
  for (const link of tabLinks) {
    const span = link.querySelector('span');
    if (span && span.innerText.trim() === 'For you') {
      const tabElementToHide = link.closest('div[role="presentation"]');
      if (tabElementToHide) {
        console.log('Hiding "For you" tab.');
        tabElementToHide.style.display = 'none';
        forYouTabFound = true;

        // If the "Following" tab exists and is not already selected, click it.
        // This ensures the content switches to the "Following" feed.
        if (followingTabLink && followingTabLink.getAttribute('aria-selected') === 'false') {
          console.log('Clicking "Following" tab.');
          followingTabLink.click();
        }
        // Once we've processed the "For you" tab, our work is done.
        return true;
      }
    }
  }

  return false; // Return false if the "For you" tab wasn't found yet.
}

/**
 * Since X.com is a single-page application, content is loaded dynamically.
 * A MutationObserver is the most reliable way to watch for the tabs to appear.
 */
const observer = new MutationObserver((mutations, obs) => {
  // We run our function to find, hide, and switch tabs.
  const isDone = switchTabs();
  // If the actions were successfully completed, we can disconnect the observer
  // for this page view to save resources.
  if (isDone) {
    obs.disconnect();
  }
});

// Start observing the entire document body for changes in the DOM tree.
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also run it once on initial load, just in case.
switchTabs();
