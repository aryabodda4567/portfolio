$(document).ready(function () {
  $(window).scroll(function () {
    //  sticky navbar on scroll script  //
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    //  scroll-up button show/hide script  //
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  //  slide-up script  //

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    //  removing smooth scroll on slide-up button click  //
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    //  Smooth scroll on Menu Items click  //

    $("html").css("scrollBehavior", "smooth");
  });

  //  Toggle Navbar  //

  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  //  Typing Text Animation  //

  var typed = new Typed(".typing", {
    strings: [
      "Web Developer",
      "Software Developer",
      "Java Developer",
      "Blockchian Developer",
      "Android Developer"
     ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Web Developer",
      "Software Developer",
      "Java Developer",
      "Blockchian Developer",
      "Android Developer"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  
  });

  //  Owl Carousel  //

  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        nav: false
      }
    }
  });
});



  function openProject(url) {
    window.open(url, '_blank');
  }

  document.getElementById('submit').addEventListener('click', function () {
    // Collecting form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
  
    // Validating that all fields are filled
    if (!name || !email || !subject || !message) {
      alert("Please fill in all the fields.");
      return;
    }
  const messageFormat = `Name: ${name}\n Email: ${email}\n Subject: ${subject}\n Message: ${message}`

  window.location.href="https://wa.me/919966509079/?text="+messageFormat;

    // Displaying the collected data (or you can send it to a server)
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
  
    // Optionally, clear the form after submission
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
  
    // alert("Message sent successfully!");
  });
  
