/**
 * This function finds and hides the "For you" tab on X.com,
 * and then selects the "Following" tab to ensure the correct feed is displayed.
 * It uses a MutationObserver to handle dynamically loaded content.
 */
function switchTabs() {
  // Find all links that act as tabs.
  const tabLinks = document.querySelectorAll('a[role="tab"]');

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
      // Only proceed if the element is not already hidden
      if (tabElementToHide && tabElementToHide.style.display !== 'none') {
        console.log('Hiding "For you" tab.');
        tabElementToHide.style.display = 'none';

        // If the "Following" tab exists and is not already selected, click it.
        if (followingTabLink && followingTabLink.getAttribute('aria-selected') === 'false') {
          console.log('Clicking "Following" tab.');
          followingTabLink.click();
        }
        return; // Work is done for this function call.
      }
    }
  }
}

/**
 * Creates and injects a custom logout button into the main navigation menu.
 */
function addLogoutButton() {
  const CUSTOM_BUTTON_ID = 'custom-logout-button';
  // Guard clause: If button already exists, do nothing.
  if (document.getElementById(CUSTOM_BUTTON_ID)) {
    return;
  }

  // Find the main navigation element where the menu items are.
  const navContainer = document.querySelector('nav[role="navigation"]');
  if (!navContainer) {
    return; // Nav container not ready yet.
  }

  // Create the button. We'll style it to look like the "Post" button.
  const logoutButtonContainer = document.createElement('div');
  logoutButtonContainer.id = CUSTOM_BUTTON_ID;
  logoutButtonContainer.style.padding = '8px 0'; // Add some vertical spacing.

  const logoutButton = document.createElement('div');
  logoutButton.innerText = 'Logout';
  logoutButton.setAttribute('role', 'button');
  logoutButton.setAttribute('tabindex', '0');
  
  // Styling to mimic the "Post" button for a native look and feel.
  Object.assign(logoutButton.style, {
    backgroundColor: 'rgb(29, 155, 240)',
    color: 'white',
    lineHeight: '20px',
    fontWeight: 'bold',
    fontSize: '17px',
    padding: '12px',
    borderRadius: '9999px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out'
  });

  // Add a hover effect for better user experience.
  logoutButton.onmouseover = () => { logoutButton.style.backgroundColor = 'rgb(26, 140, 216)'; };
  logoutButton.onmouseout = () => { logoutButton.style.backgroundColor = 'rgb(29, 155, 240)'; };

  // Add the click handler to navigate directly to the logout page.
  logoutButton.addEventListener('click', () => {
    console.log('Navigating to logout page.');
    window.location.href = 'https://x.com/logout';
  });
  
  logoutButtonContainer.appendChild(logoutButton);
  // Add our new button to the top of the navigation menu.
  navContainer.prepend(logoutButtonContainer);
  console.log('Custom logout button added.');
}


/**
 * Since X.com is a single-page application, content is loaded dynamically.
 * A MutationObserver is the most reliable way to watch for elements to appear.
 * We will NOT disconnect it, which makes it more robust for handling navigation
 * within the site without needing a page refresh.
 */
const observer = new MutationObserver((mutations) => {
  // Run all our customization functions on each DOM change.
  // The functions themselves are responsible for not re-doing work.
  switchTabs();
  addLogoutButton();
});

// Start observing the entire document body for changes in the DOM tree.
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also run them once on initial load, just in case the elements are already there.
switchTabs();
addLogoutButton();
