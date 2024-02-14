var firstNavSidebar = document.getElementsByClassName('nav-link')[0];
var secondNavSidebar = document.getElementsByClassName('nav-link')[1];
var thirdNavSidebar = document.getElementsByClassName('nav-link')[2];
var fourthNavSidebar = document.getElementsByClassName('nav-link')[3];

// add "selected" class to which is clicked and remove from other tabs
firstNavSidebar.addEventListener('click', function () {
  document.getElementsByClassName('scroll-to-top')[0].style.display = 'none';
  firstNavSidebar.classList.add('active');
  secondNavSidebar.classList.remove('active');
  thirdNavSidebar.classList.remove('active');
  fourthNavSidebar.classList.remove('active');
});

secondNavSidebar.addEventListener('click', function () {
  document.getElementsByClassName('scroll-to-top')[0].style.display = 'flex';
  firstNavSidebar.classList.remove('active');
  secondNavSidebar.classList.add('active');
  thirdNavSidebar.classList.remove('active');
  fourthNavSidebar.classList.remove('active');
});

thirdNavSidebar.addEventListener('click', function () {
  document.getElementsByClassName('scroll-to-top')[0].style.display = 'flex';
  firstNavSidebar.classList.remove('active');
  secondNavSidebar.classList.remove('active');
  thirdNavSidebar.classList.add('active');
  fourthNavSidebar.classList.remove('active');
});

fourthNavSidebar.addEventListener('click', function () {
  document.getElementsByClassName('scroll-to-top')[0].style.display = 'flex';
  firstNavSidebar.classList.remove('active');
  secondNavSidebar.classList.remove('active');
  thirdNavSidebar.classList.remove('active');
  fourthNavSidebar.classList.add('active');
});