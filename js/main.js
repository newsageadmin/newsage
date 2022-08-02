  //抓取日期

  let newdate = new Date();
  let year = newdate.getFullYear();
  let mouth = newdate.getMonth() + 1;
  let day = newdate.getDate().toString();
  const newDay = (day < 10) ? ('0' + day) : ('' + day);
  const yearinfo = document.querySelector('.year');
  const mdinfo = document.querySelector('.md');
  mdinfo.textContent = `${mouth}.${newDay}`;
  yearinfo.textContent = `${year}`;

  

//手機選單


$('#menuicon').click(function(){
    
    $(this).toggleClass('vis');

    if(  $(this).hasClass('vis')  ){

        $(this).find('i').removeClass('bi-list').addClass('bi-x');
        $('#header').addClass('vis');
        $('.menu-box').slideDown(350);
        $('.slider-bg').css('margin-top','100px');

    }else{
        $(this).find('i').removeClass('bi-x').addClass('bi-list');
        $('#header').removeClass('vis');
        $('.menu-box').slideUp(350);
        $('.slider-bg').css('margin-top','0px');
    }



})


//top


$(window).scroll(function(){
    if ($(window).scrollTop() < ($(window).height()-50)){
        $('.fixed-box').fadeOut(350);
    }else{
        $('.fixed-box').fadeIn(350);
    }
});


$('#gotop').click(function(){
    $('html,body').animate({
        'scrollTop': '0'
    }, 100)

});



//搜尋

$('.searchbox i').click(function () {

    // Search text
    var text = $('#searchinput').val().toLowerCase();

    console.log(text);

    // window.location.href = '../list.html';
    // Hide all content class element
    $('.post').hide();

    Swal.fire({
    
        icon: 'success',
        title: `搜尋中...`,
        showConfirmButton: false,
        timer: 1500
      });
  
    setTimeout(() => {
    // Search 
    $('.post').each(function () {

        if ($(this).text().toLowerCase().indexOf("" + text + "") != -1) {
            $(this).closest('.post').show();

        }

      

      });
      


      }, 1500);

  });


  
  $('#nav li').hover(function(){
    $(this).find('ul').stop().slideToggle(350);
  })







