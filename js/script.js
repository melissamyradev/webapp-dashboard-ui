// Traffic Section Buttons ----------------------------------->
const trafficTimeframes = document.querySelector('.timeframes');

// Alert --------------------------------------------->
const trafficHeading = document.querySelector('.dashboard__traffic h3');
const alert = document.createElement('P');

// Notifications --------------------------------------------->
const bell = document.querySelector('.header__icon-bell');
const pingDot = document.querySelector('.ping-dot');
const notifications = document.querySelector('.notifications');

const notificationItems = [
  'You have 12 new viewers today.<div class="close"></div>',
  'Victoria Chambers added you on facebook.<div class="close"></div>',
  'Google Plus will be discontinued. <a target="_blank" href="https://support.google.com/plus/answer/9217723?hl=en">Read more...</a><div class="close"></div>'
];

// Message Section ------------------------------------------->
const sendMsgButton = document.querySelector('button[type="submit"]');
const userSearch = document.querySelector('input[name="user_name"]');
const userMsg = document.querySelector('textarea[name="message"]');
const searchResults = document.querySelector('.dashboard__msg ul');

const userNames = [
  'Victoria Chambers',
  'Dale Byrd',
  'Dawn Wood',
  'Dan Oliver'
];

// Settings -------------------------------------------------->
const settingsSection = document.getElementById('dash-settings')
const switchButtons = document.querySelectorAll('.switch');
const switchCircles = document.querySelectorAll('.switch-circle');
const buttonSave = document.getElementById('save');
const buttonCancel = document.getElementById('cancel');
// local storage
const button_emailON = document.getElementById('email_on');
const button_emailOFF = document.getElementById('email_off');
const button_publicON = document.getElementById('public_on');
const button_publicOFF = document.getElementById('public_off');
const timezone = document.getElementById('timezone');

// Pop Ups --------------------------------------------------->
const body = document.querySelector('body');
const content = document.querySelector('.grid-outer');


// Functions =================================================>

// change chart data
const setChartData = (chart,data) => chart.data.datasets[0].data = data;

// alert pop up
const alertPopUp = () => trafficHeading.parentNode.insertBefore(alert, trafficHeading);

// add notification
const addThing = (element,text) => {
  let thing = document.createElement('LI');
  thing.innerHTML = text;
  element.appendChild(thing);
}

// hide thing
const hide = (element) => element.style.display = "none";

// show thing
const show = (element) => element.style.display = "block";

// add animation
const animate = (element, animation) => element.style.animation = animation;

// clear user input
const clearInput = (textfield) => textfield.value = '';

//set background colour
const setBGColor = (element, color) => element.style.background = color;

// =================================================================================
//                       * LISTENERS *
//==================================================================================

// Chart Data ================================================>
trafficTimeframes.addEventListener('click', (e) => {

  if (e.target.id === 'hourly') {
    setChartData(trafficChart,hourlyTraffic);
  } else if (e.target.id === 'daily') {
    setChartData(trafficChart,dailyTraffic);
  } else if (e.target.id === 'weekly') {
    setChartData(trafficChart,weeklyTraffic);
  } else if (e.target.id === 'monthly') {
    setChartData(trafficChart,monthlyTraffic);
  }
    trafficChart.update();

});

// Alert =====================================================>
alert.className = 'alert';
alert.innerHTML = '<strong>Alert</strong> You have several new notifications!<div class="close"></div>';

// on document load
document.addEventListener('DOMContentLoaded', () => {

  // add notifications
  for (let i = 0; i < notificationItems.length; i++) {
    addThing(notifications, notificationItems[i]);
  }

  // add member names search results
  for (let i = 0; i < userNames.length; i++) {
    addThing(searchResults,userNames[i]);
  }

  hide(searchResults);

  // hide notification menu
  hide(notifications);

  // show alert
  alertPopUp();

  // set saved settings
  let emailSetting = localStorage.getItem('email');
  let publicSetting = localStorage.getItem('set-public');

  if (emailSetting === 'true') {
    button_emailON.checked = true;
    setBGColor(button_emailON.parentNode, '#5dd2d6');
  } else {
    button_emailON.checked = false;
    setBGColor(button_emailON.parentNode, '');
  }
  if (publicSetting === 'true') {
    button_publicON.checked = true;
    setBGColor(button_publicON.parentNode, '#5dd2d6');
  } else {
    button_publicON.checked = false;
    setBGColor(button_publicON.parentNode, '');
  }
  timezone.selectedIndex = localStorage.getItem('timezone');

});

// close alert
alert.addEventListener('click', (e) => {

  if (e.target.className === 'close') {
    animate(alert, 'slideUp .5s forwards');
    setTimeout(() => {
      alert.parentNode.removeChild(alert);
    }, 500);
  }

});

// Notifications =============================================>

// listen to bell click
bell.addEventListener('click', () => {

  // toggle notifications menu view
  if (notifications.style.display === "none") {
    setTimeout(() => {
      animate(notifications, 'show .15s forwards');
      show(notifications);
    }, 150)
  } else {
    animate(notifications, 'hide .15s forwards');
    setTimeout(() => {
      hide(notifications);
    }, 150)
  }

  // if no notifications add message
  if (notifications.childNodes.length < 1) {
    addThing(notifications, 'You have no new notifications.');
  }
});

// listen to click on 'x' button
notifications.addEventListener('click', (e) => {

  // if 'x' pressed, remove notification
  if (e.target.className === 'close') {
    let noti = e.target.parentNode;
    animate(noti, 'disappear .2s forwards');
    setTimeout(() => {
      noti.parentNode.removeChild(noti);
      // if no notifications, hide menu
      if (notifications.childNodes.length < 1) {
        hide(notifications);
        hide(pingDot);
      }
    }, 200);
  }

});

// Message User Section ====================================>

// input
userSearch.addEventListener('input', () => {
  let input = userSearch.value.toUpperCase();
  let results = searchResults.querySelectorAll('li');

  if (userSearch.value.length === 0) {
    hide(searchResults);
  } else {
    show(searchResults);
  }

  for (let i = 0; i < results.length; i++) {
    let name = results[i].textContent.toUpperCase();
    if (name.indexOf(input) > -1) {
      show(results[i]);
    } else {
      hide(results[i]);
    }
  }

});

// results click
searchResults.addEventListener('click', (e) => {

  if (e.target.tagName === 'LI') {
    userSearch.value = e.target.textContent;
  }

  hide(searchResults);

});


// submit button
sendMsgButton.addEventListener('click', (e) => {
  const popUpError = '<div class="popup__msg"><p>Both user name and message text need to be filled!</p><button class="popup__close">Close</button></div>';
  const popUp = document.createElement('DIV');
  popUp.className = 'popup__overlay';

  if (userSearch.value.length > 0 && userMsg.value.length > 0) {
    e.preventDefault();
    let userName = userSearch.value;
    const popUpText = `<div class="popup__msg"><p>Awesome! The message has been sent to ${userName}. No turning back now!!</p><button class="popup__close">Close</button></div>`;
    popUp.innerHTML = popUpText;
    body.insertBefore(popUp, content);
    clearInput(userSearch);
    clearInput(userMsg);
  } else {
    popUp.innerHTML = popUpError;
    body.insertBefore(popUp, content);
    // window.alert('Both user name and message text need to be filled!');
  }
});

body.addEventListener('click', (e) => {
  if (e.target.className === 'popup__close') {
    const popUpMsg_close = document.querySelector('.popup__close');
        const popUp = body.firstElementChild;
        body.removeChild(popUp);
  }
});


// Settings ================================================>

// listen to settings section
settingsSection.addEventListener('click', (e) => {

  let button = e.target;
  let buttonSwitch = button.parentNode;
  let buttonON = buttonSwitch.firstElementChild;

  if (e.target.className === 'switch-circle') {
    let buttonOFF = button.previousElementSibling.previousElementSibling;

    if (buttonON.checked === false) {
      buttonON.checked = true;
      animate(buttonSwitch, 'bgON .3s forwards');
    } else {
      buttonOFF.checked = true;
      animate(buttonSwitch, 'bgOFF .3s forwards');
    }
  }

  if (e.target.tagName === 'LABEL') {

    if (buttonON.checked) {
      animate(buttonSwitch, 'bgOFF .3s forwards');
    } else {
      animate(buttonSwitch, 'bgON .3s forwards');
    }
  }

});

// local storage ----------------------------------------->

// listen to save button
buttonSave.addEventListener('click', () => {
  let checkEmail = button_emailON.checked;
  let checkPublic = button_publicON.checked;
  let timezoneSelected = timezone.selectedIndex;
  const popUpText = `<div class="popup__msg"><p>Your settings have been saved!</p><button class="popup__close">Close</button></div>`;
  const popUp = document.createElement('DIV');

  popUp.className = 'popup__overlay';
  popUp.innerHTML = popUpText;
  body.insertBefore(popUp, content);

  if (checkEmail) { // if email button is checked 'on'
    localStorage.setItem('email', true); // save email key as true
  } else { // else if checked 'off'
    localStorage.setItem('email', false); // save key as false
  }
  if (checkPublic) { // if set profile public button is checked 'on'
    localStorage.setItem('set-public', true); // save set profile public key as true
  } else { // else if checked 'off'
    localStorage.setItem('set-public', false); // save key as false
  }
  // save timezone key as selected option
  localStorage.setItem('timezone', timezoneSelected);

});

// listen to cancel button
buttonCancel.addEventListener('click', () => {
  //reset switches
  button_emailOFF.checked = true;
  animate(button_emailOFF.parentNode, 'bgOFF .3s forwards');
  button_publicOFF.checked = true;
  animate(button_publicOFF.parentNode, 'bgOFF .3s forwards');
  timezone.selectedIndex = 0;
  //remove local storage data
  localStorage.removeItem('email');
  localStorage.removeItem('set-public');
  localStorage.removeItem('timezone');
});
