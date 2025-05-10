// Style Gallery - Button Interaction
// This script handles the style button selection and active states


// Track which style button is currently active
let currentStyle = "Impressionism";

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded!");
  
  // Set up click handlers for all style buttons
  setupButtons();
});

function setupButtons() {
  // Get all the style buttons
  let styleButtons = document.querySelectorAll(".style-button");
  
  // Add click event to each button
  styleButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Get the art style from the button's data attribute
      let style = this.dataset.style;
      console.log("Clicked: " + style);
      
      // Only do something if this isn't already the active style
      if(style !== currentStyle) {
        // Update the active button visual
        makeButtonActive(this);
        
        // Store the current style
        currentStyle = style;
      }
    });
  });
  
  // Set the default active button on page load
  let defaultButton = document.querySelector(`[data-style="${currentStyle}"]`);
  if(defaultButton) {
    makeButtonActive(defaultButton);
  }
}

// Handle changing which button looks active
function makeButtonActive(activeButton) {
  // Remove active class from all buttons
  let allButtons = document.querySelectorAll(".style-button");
  allButtons.forEach(btn => {
    btn.classList.remove("active");
  });
  
  // Add active class to the clicked button
  activeButton.classList.add("active");
}