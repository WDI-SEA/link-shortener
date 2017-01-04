$(document).on('ready',function(){

  $('#shortUrl').select();

  $('#longUrl').select();

  $('#back-button').on('click',function(){
    window.location = '/';
  });

});
