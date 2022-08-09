const apilocal = "https://api.news-age.tw";
// const list = document.querySelector('.news-list');
 let addata = [];
 let listadAry = [];
 

 const listad = document.querySelector('.list-ad-box');
 const toplistad = document.querySelector('.toplist-ad-box');
 const newslist = document.querySelector('.news-list');


 let limit = 10;
 let page = 1;
 let ary =[];
 let sst ="";
 let eet = "";

getListData( sst, eet );
adapi();

function getListData(st,et){
   
  //let path = `${apilocal}/articleData/?pageSize=${limit}&pageNum=${page}&dateStart=${st}&dateEnd=${et}&channel=醫療`;
  let pointPath = `${apilocal}/articleData/?pageSize=${limit}&pageNum=${page}&dateStart=${st}&dateEnd=${et}&channel=醫療&chLocation=medicalC`;
  
  let kind = location.href.split('?')[1];
  console.log(kind);

  if( kind == 'kind=point' ){
   

    axios.get(pointPath)
    .then( (res)=>{
      ary = res.data.result;
      console.log(ary);
      printList(ary);
    })

  }else {
    axios.get('./JSON/list.json')
    .then( (res)=>{
      ary = res.data.result;
      printList(ary);
    })
  }



 
 


  // axios.get(allpath)
  // .then( (res)=>{
  //   ary2 = res.data;
  //   console.log(ary2.length);
   
  // })




}



function printList(ary){

  $.each(ary, function (index, item ) {

   
    let data2 = Date.parse(item.startDate); 
    let newDate = new Date(data2);
    let finallDate = newDate.getFullYear() + '-'+ (newDate.getMonth()+1) + '-' + newDate.getDate();

   
    const postEl = $('<li />').addClass('post row justify-content-center g-0').html(`
    
    <div class="col-md-3 align-self-center text-center">
        <a href="inside.html?id=${item.articleId}">
            <span></span>
            <img src="${item.imgSqu}" class="img-fluid d-none d-md-block" width="330" height="330" >
            <img src="${item.imgRec}" class="img-fluid d-md-none" width="306" height="204" >
          
        </a>
    </div>

    <div class="col-md-9 ">
    <a href="inside.html?id=${item.articleId}">
        <p class="news-date">${finallDate}</p>
        <p class="news-title">${item.mainTitle.replace('<br>','')}</p>
        <p class="news-main">
        ${item.subText}
        </p>
    </a>
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




// async function doAjax(s,e) {

//   let result;


//   // http://api01.news-age.tw/api/all_List/all_list?mychannel=新一代觀點
//   // http://api01.news-age.tw/api/all_List/all_list_random
  
//   try {  
//     result = await $.ajax({
           
//       url: `http://${apilocal}/api/all_List/all_list?page_size=${limit}&page_num=${page}&date_start=${s}&date_end=${e}`,
//       type: 'get', 
//       dataType: 'json',
//       success: function (data) {

       
//         console.log(`http://${apilocal}/api/all_List/all_list?page_size=${limit}&page_num=${page}&date_start=${s}&date_end=${e}`);

//         console.log(data);

      
     
//       $.each(data, function (index, item ) {
      
    
//        let newdate = item.all_createDate.split('T')[0];

//        ary = data;

//           const postEl = $('<li />').addClass('post row justify-content-center').html(`
//           <div class="col-md-3 align-self-center text-center">
//               <a href="${item.all_link}">
//                   <span></span>
//                   <img src="${item.all_img}" class="img-fluid" width="306" height="204">
                
//               </a>
//           </div>
      
//           <div class="col-md-9 ">
//               <p class="news-date">${newdate}</p>
            
//               <ul class="news-tag">
                 
//                   <li>${item.all_channel}</li>
//               </ul>
      
//               <p class="news-title">${item.all_title}</p>
//               <p class="news-main">
//               ${item.all_main}
//               </p>
//           </div>

//           <div class="">
            
          
//           </div>
      
      
//           </li>`);


//         //console.log(postEl)
//         postEl.appendTo('.news-list');
       
//         });

       
//       }
//     });

//     return result;
//   } catch (error) {
//     console.error(error);
//   }


// }


//初始化
//doAjax();


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
    var scrollTop = $(this).scrollTop()+0.75;
    var scrollHeight = $('body').prop("scrollHeight");
    //一樣 var scrollHeight2 = document.documentElement.scrollHeight;
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




  //廣告API

function adapi(){
  //https://apilan.news-age.tw/getData/ad/%E9%86%AB%E7%99%82
	axios.get(`${apilocal}/getData/ad/醫療`)
	.then( (res) => {
	  
		listadAry = res.data;
  
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
    <a href="${item.link}">
    <img class="d-none d-md-block img-fluid "  alt="${item.title}" src="${item.imgStr}"  width="600" height="800">
    <img class="d-md-none img-fluid "  alt="${item.title}" src="${item.imgMobi}"  width="390" height="170">
    
    </a>
  </div>`

  })

  listad.innerHTML = str;

  //廣告
  $('.list-ad-box').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    autoplay: true,
    margin: 0,
    items: 1,
    mouseDrag: false,
    autoplayTimeout: 15000,
  
  
  });

}

//頂部廣告

function TopAddata(){


  let str ="";

  listadAry.forEach( (item)=> {

    str+= `<div class="item">
    <a href="${item.link}"><img class="img-fluid"  alt="${item.title}" src="${item.imgLong}"  width="600" height="800"></a>
  </div>`

  })

  toplistad.innerHTML = str;

  //廣告
  $('.toplist-ad-box').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    autoplay: true,
    margin: 0,
    items: 1,
    mouseDrag: false,
    autoplayTimeout: 15000,
  
  
  });



}





