document.addEventListener("DOMContentLoaded", function() {
//IZMENJAVA BESED NA ZAČETKU STRANI
const container = document.getElementById("dynamic_text");
function startWordAnimation() {
  const words = ["DAMIT d.o.o.", "ZANESLJIVI", "ODZIVNI", "PRILAGODLJIVI"];
  let currentIndex = 0;
  const wordElement = container.querySelector(".dynamic_text");
  // Funkcija za izmenjavo besed
  function changeWord() {
    // Animacija izginjanja besede
    wordElement.style.opacity = 0;
    setTimeout(() => {
      // Nastavitev nove besede in animacija pojavljanja
      wordElement.textContent = words[currentIndex];
      wordElement.style.opacity = 1;
      currentIndex = (currentIndex + 1) % words.length;
    }, 0); // Časovni zamik med izginjanjem in pojavljanjem besede, prilagodite glede na želene animacijske učinke
  }
  // Začetek izmenjave besed po 3 sekundah
  setTimeout(() => {
    changeWord(); // Prva beseda se nastavi brez animacije
    setInterval(changeWord, 5000); // Nadaljnje izmenjave besed vsake 4 sekunde
  }, 0); // Počakajte 3 sekunde, prilagodite glede na dejanski čas prikaza kontejnerjev
}
// Začetek animacije
startWordAnimation();
});


//NAVIGACIJSKI MENI
const menu_checkbox = document.getElementById("menu_checkbox");
const menu_text = document.querySelectorAll(".menu ul li a button");
const header = document.getElementById("header");

function close_menu() {
  menu_checkbox.checked = false;
}
menu_text.forEach(function(item) {
  item.addEventListener("click",close_menu);
});
document.addEventListener("click",function(event) {
  if (!header.contains(event.target)) {
    close_menu();
  }
});


//SCROLL SLIDE UP EFEKT
window.addEventListener("scroll",hidden_section);
function hidden_section() {
  var reveals = document.querySelectorAll(".hidden_section");
  for(var i =0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var webpage_font_size = document.documentElement;
    var computed_font_size = window.getComputedStyle(webpage_font_size).fontSize;
    var base_font_size = parseFloat(computed_font_size);
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = base_font_size * 4;
    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    }
    else {
      reveals[i].classList.remove("active");
    }
  }
}


//GALERIJA SLIK
function update_image_number(n) {
  var image_number_div = document.getElementById("image_number_div");
  image_number_div.innerText = n + "/14";
}

function open_lightbox() {
  update_image_number(slide_index);
  document.getElementById("my_lightbox").style.display = "flex";
  document.body.style.overflow = "hidden";
}
function close_lightbox() {
  document.getElementById("my_lightbox").style.display = "none";
  document.body.style.overflow = "auto";
}

var slide_index = 1;
show_slides(slide_index);

function plus_slides(n) {
  show_slides(slide_index += n);
}

function current_slide(n) {
  show_slides(slide_index = n);
}

function show_slides(n) {
  var i;
  var slides = document.getElementsByClassName("my_slides");
  if (n > slides.length) {slide_index = 1}
  if (n < 1) {slide_index = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slide_index - 1].style.display = "flex";
  update_image_number(slide_index);
}


//COUNTER ŠTEVIL
window.addEventListener('scroll', function() {
  let counters = document.querySelectorAll('.counter');
  counters.forEach(function(counter) {
      let rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0 && !counter.dataset.counted) {
          let end = parseInt(counter.dataset.value);
          let duration = 2000; // Čas trajanja animacije v milisekundah (npr. 2 sekundi)
          let start = null;

          function step(timestamp) {
              if (!start) start = timestamp;
              let progress = timestamp - start;
              counter.textContent = Math.min(Math.floor(progress / duration * end), end);
              if (progress < duration) {
                  window.requestAnimationFrame(step);
              }
          }

          window.requestAnimationFrame(step);
          counter.dataset.counted = true; // Označimo, da smo že šteli to številko
      }
  });
});


//PREVERJANJE IZPOLNJENIH POLJ KONTAKTNEGA OBRAZCA
document.getElementById('contact_form').addEventListener('submit', function(event) {
  var fields = ['contact_name', 'contact_surname', 'contact_email', 'contact_subject', 'contact_message'];
  var allFieldsFilled = true;

  fields.forEach(function(field) {
      var fieldValue = document.getElementById(field).value.trim();
      if (fieldValue === '') {
          allFieldsFilled = false;
          document.querySelector('#' + field + ' + .error_message').style.display = 'block';
          document.querySelector('#' + field).style.borderColor = 'red';
          document.querySelector('#' + field).style.borderWidth = '0.15rem 0.15rem 0.15rem 0.15rem';
      } else {
          document.querySelector('#' + field + ' + .error_message').style.display = 'none';
          document.querySelector('#' + field).style.borderColor = 'initial';
      }
  });

  if (!allFieldsFilled) {
      event.preventDefault();
  }
});


/*PREVERJANJE E-NASLOVA*/
function isValidEmail(email) {
  // Regularni izraz za preverjanje veljavnosti e-naslova
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.getElementById('contact_form').addEventListener('submit', function(event) {
  var emailField = document.getElementById('contact_email');
  var email = emailField.value.trim();

  // Preverimo, ali je e-poštni naslov prazen
  if (email === '') {
      // Če je e-poštni naslov prazen, ne naredimo ničesar
      return;
  }

  // Preverimo, ali je e-poštni naslov veljaven
  if (!isValidEmail(email)) {
      // Če e-naslov ni veljaven, prikažemo sporočilo pod poljem
      document.querySelector('#error_mail_message').style.display = 'block';
      // Spremenimo barvo obrobe na rdečo
      emailField.style.borderColor = 'red';
      event.preventDefault();
  } else {
      // Če je e-naslov veljaven, skrijemo sporočilo in obnovimo privzeto barvo obrobe
      document.querySelector('#error_mail_message').style.display = 'none';
      emailField.style.borderColor = ''; // Obnovimo privzeto barvo obrobe
  }
});

// Dodamo dogodek za skrivanje sporočila, ko uporabnik začne urejati e-poštni naslov
document.getElementById('contact_email').addEventListener('input', function(event) {
  document.querySelector('#error_mail_message').style.display = 'none';
  event.target.style.borderColor = ''; // Obnovimo privzeto barvo obrobe
});