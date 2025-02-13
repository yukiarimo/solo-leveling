var firstNavSidebar = document.getElementsByClassName('nav-link')[0];
var secondNavSidebar = document.getElementsByClassName('nav-link')[1];
var thirdNavSidebar = document.getElementsByClassName('nav-link')[2];
var fourthNavSidebar = document.getElementsByClassName('nav-link')[3];
var fifthNavSidebar = document.getElementsByClassName('nav-link')[4];

// add "selected" class to which is clicked and remove from other tabs
firstNavSidebar.addEventListener('click', function () {
  firstNavSidebar.classList.add('active');
  secondNavSidebar.classList.remove('active');
  thirdNavSidebar.classList.remove('active');
  fourthNavSidebar.classList.remove('active');
  fifthNavSidebar.classList.remove('active');
});

secondNavSidebar.addEventListener('click', function () {
  firstNavSidebar.classList.remove('active');
  secondNavSidebar.classList.add('active');
  thirdNavSidebar.classList.remove('active');
  fourthNavSidebar.classList.remove('active');
  fifthNavSidebar.classList.remove('active');
});

thirdNavSidebar.addEventListener('click', function () {
  firstNavSidebar.classList.remove('active');
  secondNavSidebar.classList.remove('active');
  thirdNavSidebar.classList.add('active');
  fourthNavSidebar.classList.remove('active');
  fifthNavSidebar.classList.remove('active');
});

fourthNavSidebar.addEventListener('click', function () {
  firstNavSidebar.classList.remove('active');
  secondNavSidebar.classList.remove('active');
  thirdNavSidebar.classList.remove('active');
  fourthNavSidebar.classList.add('active');
  fifthNavSidebar.classList.remove('active');
});

fifthNavSidebar.addEventListener('click', function () {
  firstNavSidebar.classList.remove('active');
  secondNavSidebar.classList.remove('active');
  thirdNavSidebar.classList.remove('active');
  fourthNavSidebar.classList.remove('active');
  fifthNavSidebar.classList.add('active');
});

// check if the user on mobile or not
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// if the user is on mobile, add run toggleSidebar function
if (isMobile) {
  toggleSidebar();
  kawaiAutoScale();

  // find first four elements with class ".nav-link" and add event listener to each one running toggleSidebar and kawaiAutoScale functions when clicked
  var navLinks = document.querySelectorAll('.nav-link');
  for (var i = 0; i < 4; i++) {
    navLinks[i].addEventListener('click', function () {
      toggleSidebar();
      kawaiAutoScale();
    });
  }
}

// function to make a popup modal template
function showAlert(id, title, body) {
  const modalHTML = `
    <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content custom-modal-style">
          <div class="modal-header">
            <h5 class="modal-title custom-title-style" id="${id}Label">${title}</h5>
            <button type="button" class="btn-close custom-close-style" id="${id}-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body custom-body-style">
            ${body}
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  return new bootstrap.Modal(document.getElementById(id), {
    backdrop: 'static', // Make backdrop static so it doesn't close the modal on click
    keyboard: false // Disable closing modal with keyboard
  });
}

// Function to remove a modal from the DOM
function removeAlert(id) {
  const modalElement = document.getElementById(id);
  if (modalElement && modalElement.parentNode) {
    modalElement.parentNode.removeChild(modalElement);
  }
}

function systemInit(callback) {
  if (localStorage.getItem('status') === 'undefined' || localStorage.getItem('status') === null) {
    // Create the first modal
    const firstModal = showAlert('firstModal', 'ALARM', '[ WELCOME, PLAYER ]');

    // Show the first modal
    firstModal.show();

    // When the first modal is closed, remove it and create the second modal
    firstModal._element.addEventListener('hidden.bs.modal', function () {
      removeAlert('firstModal');

      // Create and show the second modal
      const secondModal = showAlert('secondModal', 'SYSTEM', `
        <form id="inputForm" class="form-inline justify-content-center">
          <div class="mb-3">
            <input type="text" class="form-control" id="initNameField" placeholder="Enter your name">
          </div>
          <button type="button" class="btn btn-primary" onclick="initializeSystem()">Submit</button>
        </form>
      `);
      secondModal.show();

      // Add an event listener to the input field for the Enter key
      document.getElementById('initNameField').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default form submission
          initializeSystem(); // Call the function to process the input and close the modal

          // Close the modal manually since initializeSystem() doesn't do it
          // Assuming you have a reference to the close button of the second modal
          document.getElementById('secondModal-close-btn').click();
        }
      });

      // When the second modal is closed, remove it
      secondModal._element.addEventListener('hidden.bs.modal', function () {
        // get the input value from the input field and store it in the local storage
        localStorage.setItem('nameInit', document.getElementById('initNameField').value);
        removeAlert('secondModal');

        // Create and show the third modal
        const thirdModal = showAlert('thirdModal', 'SYSTEM', `Ready ${localStorage.getItem('nameInit')}! You are ready to play!`);
        thirdModal.show();

        // When the third modal is closed, remove it and call the callback with the value
        thirdModal._element.addEventListener('hidden.bs.modal', function () {
          removeAlert('thirdModal');
          const nameInit = localStorage.getItem('nameInit');
          if (callback) {
            callback(nameInit);
          }
        });
      });
    });
  }
}

function initializeSystem() {
  secondModal = document.getElementById('secondModal-close-btn');
  const initNameField = document.getElementById('initNameField');
  console.log(initNameField.value);
  secondModal.click();
}