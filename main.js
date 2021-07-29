// ------------------------------------------------------------------
/* SLIDE UP */
const slideUp = (target, duration=500) => {

    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            //alert("!");
    }, duration);
}

/* SLIDE DOWN */
const slideDown = (target, duration=500) => {

    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}

// /* TOOGLE */
// const slideToggle = (target, duration = 500) => {
//     if (window.getComputedStyle(target).display === 'none') {
//       return slideDown(target, duration);
//     } else {
//       return slideUp(target, duration);
//     }
// }
// ----------------------------------------------------------------

// Created by Abdul Hakim Ghaniy. 2021
// ----------------------------------------------------------------
let timeToHide = 10; // In Minutes

const setTimeToStorage = () => {
  const timeNow = Date.now();
  localStorage.setItem('time', timeNow);
}

const getTimeFromStorage = () => {
  return localStorage.getItem('time');
}

// Pengecekan jika masih ada waktu di LocalStorage.
// Fungsi ini akan mereturn true / false sebagai trigger fungsi selanjutnya.
const isTimeActive = () => {
  if(getTimeFromStorage()) {
      return true;
  } else {
      return false;
  }
}

const timeChecker = () => {
    if(parseInt(Date.now()) >= (parseInt(getTimeFromStorage()) + (timeToHide * 60 * 1000))) {
        return true;
    } else {
        return false;
    }
}

// Fungsi digunakan untuk menampilkan Popup jika interval waktu setelah pengklikan tombol close berakhir
const showNewsLetterIfTimeout = () => {
    const looper = setInterval(() => {
        if(timeChecker() == true){
            slideDown(document.getElementById("newsletter-subscription"), 500);
            localStorage.removeItem('time');
            clearInterval(looper);
        }
    }, 1000);
}

document.getElementById("cookie-accept-btn").onclick = function() {
    slideUp(document.getElementById("cookie-notification"), 500);
}

document.getElementById("newsletter-subscription-close").onclick = function() {
    slideUp(document.getElementById("newsletter-subscription"), 500);
    setTimeToStorage();
}

window.addEventListener('scroll', function() {
    function removeHidden() {
        document.getElementById('newsletter-subscription').classList.remove('hidden');
        document.getElementById('newsletter-subscription').classList.add('newsletter-subscription');
    }

    if (window.scrollY > 300 && (isTimeActive() == false) ) {
        removeHidden();  
    }

    showNewsLetterIfTimeout();
});

// ----------------------------------------------------------------


// Debugging
setInterval(() => {
    console.log("Status waktu: " + isTimeActive() + ".");
}, 1000);