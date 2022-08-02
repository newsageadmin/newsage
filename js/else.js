const apilocal = "api.news-age.tw";
// const list = document.querySelector('.news-list');
 let addata = [];


// getlistapi();


// function getlistapi(){

//     axios.get( `http://${apilocal}/api/allList` )
//     .then( (res)=> {
//         console.log(res.data);
//         alllist = res.data;
//         getalllist();
//     })
//        .catch(function (error) {
//         // handle error
//         console.log(error);
//       });
// }



// function getalllist() {

//     let str ="";

//     alllist.forEach( (item) => {

      
//         let newdate = item.all_createTime.split('T')[0];

    //     str+=`<li class="row justify-content-center">
    //     <div class="col-md-3 align-self-center">
    //         <a href="${item.all_link}">
    //             <span></span>
    //             <img src="${item.all_img}" class="img-fluid" width="306" height="204">
    //         </a>
    //     </div>
    
    //     <div class="col-md-9">
    //         <p class="news-date">${newdate}</p>
            

    //         <ul class="news-tag">
    //             <li><a href="#">標籤1</a></li>
    //             <li><a href="#">標籤1</a></li>
    //         </ul>
    
    //         <p class="news-title">${item.all_title}</p>
    //         <p class="news-main">
    //         ${item.all_main}
    //         </p>
    //     </div>
    
    
    // </li>
    // `


//     } )




// list.innerHTML = str;

// }




let limit = 10;
let page = 1;
let ary =[];
let filterAry = []

async function doAjax() {

  let result;


  try {  
    result = await $.ajax({
      url: `http://${apilocal}/api/allList?page_size=${limit}&page_num=${page}`,
      type: 'get', 
      dataType: 'json',
      success: function (data) {

        console.log(data)


        filterAry = data.filter( (item) => {
          return item["all_channel"] == "新一代觀點"
        } );

        console.log(filterAry);

      $.each(filterAry, function (index, item) {

       let newdate = item.all_createTime.split('T')[0];

     
      
      // ary = data;


      
          const postEl = $('<li />').addClass('post row justify-content-center').html(`
          <div class="col-md-3 align-self-center">
              <a href="${item.all_link}">
                  <span></span>
                  <img src="${item.all_img}" class="img-fluid" width="306" height="204">
              </a>
          </div>
      
          <div class="col-md-9">
              <p class="news-date">${newdate}</p>
              <ul class="news-tag">
                  <li>${item.allTag_title01}</li>
                  <li>${item.allTag_title02}</li>
              </ul>
      
              <p class="news-title">${item.all_title}</p>
              <p class="news-main">
              ${item.all_main}
              </p>
          </div>

          <div class="">
            
          
          </div>
      
      
          </li>`);


        //console.log(postEl)
          postEl.appendTo('.news-list');
          //$('#posts-container').append(postEl)

        });

       
      }
    });

    return result;
  } catch (error) {
    console.error(error);
  }

}

doAjax();



$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $('body').prop("scrollHeight");
    //一樣 var scrollHeight2 = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
   
    //https://stackoverflow.com/questions/10423759/plain-javascript-to-jquery-clientheight
  
    // console.log('scrollTop:', scrollTop);
    // console.log('scrollHeight:', scrollHeight);
    // console.log('clientHeight:', clientHeight);
  
  
    if ( scrollTop + clientHeight >= scrollHeight - 100 ) {
     // console.log('show up 123');
      showLoading();
      $('.loader').addClass('show');

        return false

    }
  })




  //抓長型廣告

  function redenAdapi(){

    axios.get(`http://${apilocal}/api/home_ad`)
    .then( (res) => {
     addata = res.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  }

  redenAdapi();

  
  //顯示載入圖示，並取得更多串接資料
  function showLoading() {

   console.log(`我是${filterAry}`)

    //如果資料/10==0則出現
    if(  filterAry.length  == 10 ){

  let rand = Math.floor(Math.random()*addata.length);
  let rValue = addata[rand];
  let reAry = [];
      reAry.push(rValue);
     // console.log(reAry);

      let ad = `<li class="mb-4 mt-4 list-long-ad"><a data="${reAry[0].id}" href="${reAry[0].link}"><img src="${reAry[0].imgurl_bottom}" class="img-fluid"></a></li>`;

      $('.news-list').append(ad);
    }else {
      $('.loader').removeClass('show');
    }

   

    setTimeout(function () {
  
      $('.loader').removeClass('show');

      setTimeout(function () {
        page++;
        doAjax();
      
       
      }, 100);
  
    }, 500);  //1秒之後消失
  
  }

