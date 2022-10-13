//code for character counter, also turns text red if negative
$(document).ready(function() {
  const textbox = document.querySelector('.textbox');
  $(textbox).on('input', function() {
    $(this).parent().children('.below').children('.counter').text(140 - this.value.length);
    if (this.value.length > 140) {
      $(this).parent().children('.below').children('.counter').addClass('negative');
    } else {
      $(this).parent().children('.below').children('.counter').removeClass('negative');

    }
    
  });
});
