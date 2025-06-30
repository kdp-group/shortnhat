/**
 * Newsletter Popup Component
 * Shows a newsletter signup popup when users first visit the site
 */

const initNewsletterPopup = () => {
  // Check if user has already seen the popup
  const hasSeenPopup = localStorage.getItem('newsletter_popup_seen');
  
  // Only show popup if user hasn't seen it before
  if (!hasSeenPopup) {
    // Show popup after a short delay (1.5 seconds)
    setTimeout(() => {
      const newsletterModal = new bootstrap.Modal(document.getElementById('newsletterModal'));
      newsletterModal.show();
      
      // Mark that user has seen the popup
      localStorage.setItem('newsletter_popup_seen', 'true');
    }, 1500);
  }

  // Handle form submission
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const email = document.getElementById('newsletter-email').value;
      const consent = document.getElementById('newsletter-consent').checked;
      
      // Form validation
      if (!email) {
        newsletterForm.classList.add('was-validated');
        return;
      }
      
      // Here you would typically send the data to your backend
      console.log('Newsletter signup:', { email, consent });
      
      // Close the modal
      const newsletterModal = bootstrap.Modal.getInstance(document.getElementById('newsletterModal'));
      if (newsletterModal) {
        newsletterModal.hide();
      }
      
      // Show success message (you could replace this with a toast notification)
      alert('Thank you for subscribing to our newsletter!');
    });
  }
};

// Initialize the newsletter popup
document.addEventListener('DOMContentLoaded', initNewsletterPopup);

export default initNewsletterPopup;
