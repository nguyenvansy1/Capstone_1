$(document).ready(function () {
  //active navbar
  $('.menu li').click(function () {
    $('li').removeClass("current");
    $(this).addClass("current");
  });

  //edit profile
  $(".edit-profile").click(function () {
    $('.full-name').prop('disabled', false);
    $('.full-name').focus();
    $('.phone').prop('disabled', false);
    $('.date').prop('disabled', false);
    $('.birthDay').prop('disabled', false);
    $('.address').prop('disabled', false);
    $('.class').prop('disabled', false);
    $('.about-me').prop('disabled', false);
    $('.gender').prop('disabled', false);



    $('#save-cancel').removeClass("active-none")
    $('.padding').addClass("active-none")
  });
  //cancel profile
  $(".cancel-btn").click(function () {
    $('.full-name').prop('disabled', true);
    $('.student-id').prop('disabled', true);
    $('.phone').prop('disabled', true);
    $('.email').prop('disabled', true);
    $('.date').prop('disabled', true);
    $('.birthDay').prop('disabled', true);
    $('.address').prop('disabled', true);
    $('.class').prop('disabled', true);
    $('.about-me').prop('disabled', true);
    $('.gender').prop('disabled', true);

    $('#save-cancel').addClass("active-none")
    $('.padding').removeClass("active-none")

    console.log(this);
  });

  //eye password
  let x = $('#password-field')
  $('.toggle-password').click(function () {
    if (x.attr('type') === "password") {
      x.attr('type', 'text')
    } else {
      x.attr('type', 'password')
    }
  })


  const newPassword = $('.new-password')
  const confirmPassword = $('.confirm-password')

// validate change password
  newPassword.keyup(function () {
    var upperCase = new RegExp('[A-Z]');
    var lowerCase = new RegExp('[a-z]');
    var numbers = new RegExp('[0-9]');
    var regex = new RegExp('[#?!@$%^&*]');
    let password = false;
    let upercase = false;
    let lowercase = false;
    let number = false;
    let special = false;


    // validate special character password
    if ($(this).val().match(regex)) {
      $('.least-special').removeClass('line-active')
      special = !special;
    } else {
      $('.least-special').addClass('line-active')
    }

    // validate length password
    if ($(this).val().length >= 8 && $(this).val().length <= 20) {
      $('.least-six').removeClass('line-active')
      password = !password;
    } else {
      $('.least-six').addClass('line-active')
    }

    // validate upeercase
    if ($(this).val().match(upperCase)) {
      $('.least-upper').removeClass('line-active')
      upercase = !upercase;
    } else {
      $('.least-upper').addClass('line-active')
    }

    // validate lowercase
    if ($(this).val().match(lowerCase)) {
      $('.least-lower').removeClass('line-active')
      lowercase = !lowercase;
    } else {
      $('.least-lower').addClass('line-active')
    }

    //validate only number
    if ($(this).val().match(numbers)) {
      $('.least-number').removeClass('line-active')
      number = !number;
    } else {
      $('.least-number').addClass('line-active')
    }

    // validate clear all
    if ($(this).val() === '') {
      $('.least-six').addClass('line-active')
      $('.least-upper').addClass('line-active')
      $('.least-lower').addClass('line-active')
      $('.least-number').addClass('line-active')
      $('.least-special').addClass('line-active')
    }

    // check success
    if (password && number && lowerCase && upercase && special) {
      $('.icon-check-new').removeClass('check-active')
    } else {
      $('.icon-check-new').addClass('check-active')
    }

    confirmPassword.val("");

  })

// validate confirm password
  confirmPassword.keyup(function () {
    if ($(this).val() === newPassword.val()) {
      $('.icon-check-confirm').removeClass('check-active')
    } else {
      $('.icon-check-confirm').addClass('check-active')
    }
  })


  // Show eye new pasword
  let xNew = $('.new-password')
  $('.toggle-password-new').click(function () {
    if (xNew.attr('type') === "password") {
      xNew.attr('type', 'text')
    } else {
      xNew.attr('type', 'password')
    }
  })

  let xx = $('.password-field')
  $('.toggle-password').click(function () {
    if (xx.attr('type') === "password") {
      xx.attr('type', 'text')
    } else {
      xx.attr('type', 'password')
    }
  })

});

