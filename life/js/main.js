 




//手機選單


$('#menuicon').click(function(){


    $('.menu-box').toggleClass('vis');


    $('body').toggleClass('vis');
    $('html').toggleClass('vis');


    if(   $('body').hasClass('vis') ){

        $(this).find('i').removeClass('bi-list').addClass('bi-x');
        $('.menu-box').stop().slideDown(400);

    }else{
        $(this).find('i').removeClass('bi-x').addClass('bi-list');
        $('.menu-box').stop().slideUp(400);
    }
  



})


//top


$(window).scroll(function(){
    if ($(window).scrollTop() < ($(window).height()-50)){
        $('#gotop').fadeOut(350);
    }else{
        $('#gotop').fadeIn(350);
    }
});


$('#gotop').click(function(){
    $('html,body').animate({
        'scrollTop': '0'
    }, 100)

});



//登入




function login(){

    

    const menubox = document.querySelector('.menu-box ul');
    const loginbox = document.querySelector('#login-box');
    const back = document.querySelector('#return');
 

    menubox.classList.add('animate__animated','animate__fadeOut');
    loginbox.classList.add('animate__animated','animate__fadeIn');
    loginbox.style.display = "block";

    loginbox.addEventListener('click',(e)=>{
       
        if( e.target.nodeName == "BUTTON"  ){

         alert('之後為判斷登入機制');
          
          
        }
    });

    back.addEventListener('click',(e)=>{
        loginbox.classList.remove('animate__fadeIn');
        loginbox.style.display = "none";
      
        menubox.classList.remove('animate__fadeOut');
        menubox.classList.add('animate__animated','animate__fadeIn');
        menubox.style.display = "block";
      
    })


}

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


