// Script for handling style buttons in the gallery

// API URLs for Art Institute of Chicago
const API_BASE_URL = 'https://api.artic.edu/api/v1';
const IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2';

// Track which style button is currently active
let currentStyle = "Impressionism";

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded!");
  
  // Set up click handlers for all style buttons
  setupButtons();
  
  // Load default style artworks on page load
  fetchArtworks(currentStyle);
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
        
        // Fetch artworks for this style
        fetchArtworks(style);
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

// Fetch artworks from the API
function fetchArtworks(style) {
  // Get gallery element
  let gallery = document.getElementById('gallery');
  gallery.innerHTML = "Loading...";
  
  // Build the API URL with the style
  let encodedStyle = encodeURIComponent(style);
  let apiUrl = `${API_BASE_URL}/artworks/search?q=${encodedStyle}&limit=5&fields=id,title,artist_display,date_display,image_id`;
  
  console.log("Fetching from:", apiUrl);
  
  // Make the API request
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("API request failed");
      }
      return response.json();
    })
    .then(data => {
      console.log("API returned:", data);
      
      // Simple placeholder display
      if (data.data && data.data.length > 0) {
        gallery.innerHTML = `Found ${data.data.length} artworks for ${style}`;
      } else {
        gallery.innerHTML = `No artworks found for ${style}`;
      }
      
      // TODO: Create proper display function
    })
    .catch(error => {
      console.error("Error fetching artworks:", error);
      gallery.innerHTML = "Sorry, something went wrong. Please try again.";
    });
}