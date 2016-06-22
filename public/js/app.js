$(document).ready(function() {
  function resizeInput() {
    $(this).attr('size', $(this).val().length);
  }

  $('.textStyle').keyup(resizeInput);
});
