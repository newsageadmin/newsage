 const apilocal = "https://api.news-age.tw";
 const apitestlocal = "https://apilan.news-age.tw";
 let addata = [];
 let listadAry = [];
 const listad = document.querySelector('.list-ad-box');
 const toplistad = document.querySelector('.toplist-ad-box');
 const newslist = document.querySelector('.news-list');


let limit = 10;
let page = 1;
let ary =[];
let filterAry = [];
let sst ="";
let eet = "";


getListData( sst, eet );

function getListData(st,et){

  
  //http://api01.news-age.tw/api/all_List/all_list?page_size=10&page_num=1&date_start=&date_end=
  //let allpath = `http://${apilocal}/api/all_List/all_list?date_start=${st}&date_end=${et}`;

  
  let path = `${apilocal}/All/List?page_size=${limit}&page_num=${page}&date_start=${st}&date_end=${et}`;

  console.log(path);

  axios.get(path)
  .then( (res)=>{
    ary = res.data;
 
    printList(ary);





  })

}



function printList(ary){

    
  $.each(ary, function (index, item ) {

  let data2 = Date.parse(item.StartDate); 
  let newDate = new Date(data2);
  let finallDate = newDate.getFullYear() + '-'+ (newDate.getMonth()+1) + '-' + newDate.getDate();
     
   // let newdate = item.StartDate.split('T')[0];

   let channelName = ary.map( (item) => {

    if( item.Channel == "醫療"    ) {
      return "medical";
    }

    if( item.Channel == "台中腔"    ) {
      return "life";
    }

    if( item.Channel == "教育"    ) {
      return "Educate";
    }

    if( item.Channel == "話題"    ) {
      return "Topic";
    }

    if( item.Channel == "新一代觀點"    ) {
      return "View";
    }

   });



   
       const postEl = $('<li />').addClass('post row justify-content-center g-0').html(`
    
       <div class="col-md-3 align-self-center text-center pleft">
           <a href="${channelName[index]}/inside.html?id=${item.Id}" data-channel="${item.Channel}" >
               <span></span>
               <img src="${item.ImgSquare}" class="img-fluid d-none d-md-block" width="330" height="330" >
               <img src="${item.ImgRectangle}" class="img-fluid d-md-none" width="306" height="204" >
             
           </a>
       </div>
   
       <div class="col-md-9 ">
           <p class="news-date">${finallDate}</p>
         
           <ul class="news-tag">
              
               <li>${item.Channel}</li>
           </ul>
   
           <p class="news-title">${item.MainTitle}</p>
           <p class="news-main">
           ${item.SubText}
           </p>
       </div>

       
   
   
       </li>`);


     //console.log(postEl)
     postEl.appendTo('.news-list');
    
     });

     if(  newslist.childNodes.length == 0 ) {

      Swal.fire({
        icon: 'error',
      title: 'Oops...',
      text: '查無資料，請重新搜尋！'
      }).then((result) => {
        // Reload the Page
        location.reload();
      });
   
    $('.loader').removeClass('show');   
        }
}

 

   //判斷RWD
   function isMobile() {
    try {
      document.createEvent("TouchEvent");
      return true;
    }
    catch (e) {
      return false;
    }
  }


$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $('body').prop("scrollHeight");
    var clientHeight = document.documentElement.clientHeight;
   
  
    // console.log('scrollTop:', scrollTop);
    // console.log('scrollHeight:', scrollHeight);
    // console.log('clientHeight:', clientHeight); 

  if( scrollTop >=600 ) {

    $('.list-left').addClass('fixed');
    $('.list-right').addClass('offset-xl-3');
   
  }else{
    $('.list-left').removeClass('fixed');
    $('.list-right').removeClass('offset-xl-3');
   
  }
  
    
  
    if ( scrollTop + clientHeight >= scrollHeight  ) {
    //  console.log('show up 123');
     
     
      showLoading();
     

    }else if (  isMobile() ) { 

      if (( document.documentElement.scrollTop) + $(window).height() > $(document).height() - 600) {
        // console.log('show up 123');
        
         $('.loader').addClass('show');
         showLoading();
          
   
       }

    }

    
  })

  
  
  //顯示載入圖示，並取得更多串接資料

function showLoading() {

  $('.loader').addClass('show');
  
  //如果資料數量/10===0則出現隨機出現的廣告
  //   if(  ary.length % 10 === 0 ){
  // let rand = Math.floor(Math.random()*addata.length);
  // let rValue = addata[rand];
  // let reAry = [];
  //     reAry.push(rValue);
  //   //  console.log(reAry);

  //     let ad = `<li class="mb-4 mt-4 list-long-ad" data-id="${reAry[0].id}"><a  href="${reAry[0].link}"><img src="${reAry[0].imgurl_bottom}" class="img-fluid"></a></li>`;

  //     $('.news-list').append(ad);
      

  //   }else {
  //     $('.loader').removeClass('show');
  //   }

   

    setTimeout(function () {
  
      $('.loader').removeClass('show');

      setTimeout(function () {
        page++;
        let stime = document.querySelector('#dpd1').value;
        let etime = document.querySelector('#dpd2').value;

        getListData(stime , etime );

        //doAjax();
        //  console.log(page)
      
      }, 300);
  
    }, 1000);  //1秒之後消失
  
  }



  




const btn = document.querySelector('.searchBtn');
const searchbox = document.querySelector('.sreach-date-box');






searchbox.addEventListener('click',function(e){

   if(  e.target.nodeName == "BUTTON" ){

    let stime = document.querySelector('#dpd1').value;
    let etime = document.querySelector('#dpd2').value;
    let num = 0;

   

    Swal.fire({
     
      icon: 'success',
      title: `搜尋中...`,
      showConfirmButton: false,
      timer: 1500
    });

    

   // doAjax(stime,etime);


   //清空
   newslist.innerHTML = "";
   page=1; 


   $('.loader').addClass('show');
   getListData(stime , etime );
  

   

   }


 
})













  //廣告
  adapi();


  //廣告API

function adapi(){

	axios.get(`${apilocal}/Home/Ad`)
	.then( (res) => {
	  
		listadAry = res.data;
   // console.log(listadAry);
		LeftAddata();
    TopAddata();
	
	})
	.catch(function (error) {
	  // handle error
	  console.log(error);
	});

}



  //左邊廣告
  function LeftAddata(){

    let str ="";
  
    listadAry.forEach( (item)=> {
  
      str+= `<div class="item">
      <a href="${item.Link}" target="_blank">
      <img class="d-none d-md-block img-fluid owl-lazy"  alt="${item.ImgTitle_Straight}" data-src="${item.Img_Straight}"  width="600" height="800">
      <img class="d-md-none img-fluid owl-lazy"  alt="${item.ImgTitle_Straight}" data-src="${item.Img_M}"  width="390" height="170">
      
      </a>
    </div>`
  
    })
  
    listad.innerHTML = str;
  
  	//廣告
    $('.list-ad-box').owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      lazyLoad:true,
      autoplay: true,
      margin: 0,
      items: 1,
      mouseDrag: false,
      autoplayTimeout: 5000,
    
    
    });
  
  }

  //頂部廣告

  function TopAddata(){


    let str ="";
  
    listadAry.forEach( (item)=> {
  
      str+= `<div class="item">
      <a href="${item.Link}" target="_blank"><img class="img-fluid owl-lazy"  alt="${item.ImgTitle_Long}" data-src="${item.Img_Long}"  width="600" height="800"></a>
    </div>`
  
    })
  
    toplistad.innerHTML = str;
  
  	//廣告
    $('.toplist-ad-box').owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      lazyLoad:true,
      autoplay: true,
      margin: 0,
      items: 1,
      mouseDrag: false,
      autoplayTimeout: 5000,
    
    
    });



  }
  





