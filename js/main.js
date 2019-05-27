/* ---- contact form ---- */
$("#contactForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        event.preventDefault();
        submitForm();
    }
});

function submitForm() {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    $.ajax({
        type: "POST",
        url: "php/contact.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject +
            "&message=" + message,
        success: function(text) {
            if (text == "success") {
                formSuccess();
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function() {
            $(this).removeClass();
        });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h4 text-success";
    } else {
        var msgClasses = "h4 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

/* ---- our work gallery ---- */
$('#work').magnificPopup({
    delegate: 'a.zoom',
    type: 'image',
    fixedContentPos: false,
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
        enabled: true,
        preload: [0,2]
    },
    callbacks: {
  beforeOpen: function() {
    console.log('Start of popup initialization');
  },
  elementParse: function(item) {
    // Function will fire for each target element
    // "item.el" is a target DOM element (if present)
    // "item.src" is a source that you may modify

    console.log('Parsing content. Item object that is being parsed:', item);
  },
  change: function() {
    console.log('Content changed');
    console.log(this.content); // Direct reference to your popup element
  },
  resize: function() {
    console.log('Popup resized');
    // resize event triggers only when height is changed or layout forced
  },
  open: function() {
    console.log('Popup is opened');
  },

  beforeClose: function() {
    // Callback available since v0.9.0
    console.log('Popup close has been initiated');
  },
  close: function() {
    console.log('Popup removal initiated (after removalDelay timer finished)');
  },
  afterClose: function() {
    console.log('Popup is completely closed');
  },

  markupParse: function(template, values, item) {
    // Triggers each time when content of popup changes
    // console.log('Parsing:', template, values, item);
  },
  updateStatus: function(data) {
    console.log('Status changed', data);
    // "data" is an object that has two properties:
    // "data.status" - current status type, can be "loading", "error", "ready"
    // "data.text" - text that will be displayed (e.g. "Loading...")
    // you may modify this properties to change current status or its text dynamically
  },
  imageLoadComplete: function() {
    // fires when image in current popup finished loading
    // avaiable since v0.9.0
    console.log('Image loaded');
  },


  // Only for ajax popup type
  parseAjax: function(mfpResponse) {
    // mfpResponse.data is a "data" object from ajax "success" callback
    // for simple HTML file, it will be just String
    // You may modify it to change contents of the popup
    // For example, to show just #some-element:
    // mfpResponse.data = $(mfpResponse.data).find('#some-element');

    // mfpResponse.data must be a String or a DOM (jQuery) element

    console.log('Ajax content loaded:', mfpResponse);
  },
  ajaxContentAdded: function() {
    // Ajax content is loaded and appended to DOM
    console.log(this.content);
  }
}
});

/* ---- popup image ---- */
$('.popup-img').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade'
});

/* ---- popup video ---- */
$(document).ready(function() {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});

/* ---- nav smooth scroll ---- */
$(document).ready(function() {
    $('.scroll-link').on('click', function(event) {
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1200);
    });
});

/* ---- navbar offset ---- */
function scrollToID(id, speed) {
    var offSet = 69;
    var targetOffset = $(id).offset().top - offSet;
    $('html,body').animate({
        scrollTop: targetOffset
    }, speed);
}

/* ---- navbar adjust on scroll ---- */
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 70) {
        $('.navbar').addClass('navbar-switch')
    } else {
        $('.navbar').removeClass('navbar-switch')
    }
});


/* ---- animations ---- */
if (typeof sr == 'undefined') {
    window.sr = ScrollReveal({
        duration: 1600,
        delay: 50
    });
}
Royal_Preloader.config({
    onComplete: function () {
        triggerReveals();
    }
});
function triggerReveals() {
    sr.reveal('.bottomReveal', {
        origin: 'bottom'
    }).reveal('.leftReveal', {
        origin: 'left'
    }).reveal('.rightReveal', {
        origin: 'right'
    }).reveal('.topReveal', {
        origin: 'top'
    });

    sr.reveal('.rotateBottomReveal', {
        origin: 'bottom',
        rotate: { x: 90 }
    }).reveal('.rotateLeftReveal', {
        origin: 'left',
        rotate: { x: 90 }
    }).reveal('.rotateRightReveal', {
        origin: 'right',
        rotate: { x: 90 }
    }).reveal('.rotateTopReveal', {
        origin: 'top',
        rotate: { x: 90 }
    })

    sr.reveal('.scaleReveal', {
        origin: 'top',
        scale: 0.6
    });
}

/* ---- close mobile nav on click ---- */
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});

/* ---- rotater text ---- */
var current = 1; 
var height = jQuery('.ticker').height(); 
var numberDivs = jQuery('.ticker').children().length; 
var first = jQuery('.ticker h2:nth-child(1)'); 
setInterval(function() {
    var number = current * -height;
    first.css('margin-top', number + 'px');
    if (current === numberDivs) {
        first.css('margin-top', '0px');
        current = 1;
    } else current++;
}, 2500);

/* ---- nav main link hover dropdown ---- */
if ( $(window).width() >= 767) {      
    $('.dropdown').hover(function(){ 
        $('.dropdown-toggle', this).trigger('click'); 
    });
} 

$(window).load(function(){
    alert("teste");
});