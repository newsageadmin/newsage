 const apilocal = "https://api.news-age.tw";
 const elseList = document.querySelector('.else-news-list');
 const pushmain = document.querySelector('.inside-main');
 const bread = document.querySelector('.breadcrumb');
 const hotnewsList = document.querySelector('.hot-news-box ul');
 const listad = document.querySelector('.ad-box2');
 let articleId = "";
 let randomAry =[];
 let mainAry =[];
 let hotnewsAry =[];


 



 	//抓當前網址

   const share = document.querySelector('.share-into');
   let src = location.href;
   let sharestr = `
<div class="col-auto">	<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${src}&agent=fbshare" class="fb-icon"><img src="images/fb_share.png" class="img-fluid"></a></div>
<div class="col-auto">	<a href="http://line.me/R/msg/text/?${src}&agent=lineshare" class="line-icon"><img src="images/line_share.png" class="img-fluid"></a></div>

`
   share.innerHTML = sharestr;


  //隨機顯示
  http://api01.news-age.tw/api/All/Random
  randomapi();
  insideApi();
  hotnewsApi();
  adapi();
  //隨機顯示文章

function randomapi(){
  

  ///random/:channel
	// axios.get(`${apilocal}/random/醫療`)
  axios.get('./JSON/random.json')
	.then( (res) => {
	  
		randomAry = res.data;
    console.log(randomAry)
   
   
		getrandomData();
	
	})
	.catch(function (error) {
	  // handle error
	  console.log(error);
	});

}

function getrandomData(){

  let str ="";

  
  randomAry.forEach( (item)=> {

   

    str+=`<div class="col-md-3">
    <a href="inside.html?id=${item.id}" >
      <img src="${item.imgRec}" class="img-fluid">
      <p class="title">${item.mainTitle}</p>
      <p>${item.subText}</p>
    </a>
  </div>`

  });

  elseList.innerHTML = str;

}



//內頁內容



function insideApi() {

let url = window.location.href;
let  newsId =  url.split( '?id=')[1];

//var metaList = document.getElementsByTagName("meta");

  //articleData

  axios.get(`${apilocal}/articleData/醫療/${newsId}`)
  .then((res)=> {
   
    mainAry = res.data;

    console.log(mainAry)

  
  

    //GSC架構
     const script = document.createElement('script');
     script.setAttribute('type', 'application/ld+json');

     let obj =`{
       "@context": "https://schema.org",
       "@type": "NewsArticle",
       "headline": "${mainAry[0].mainTitle}",
       "image": [
       "${mainAry[0].homeFront}"
      
        ],
       "datePublished": "${mainAry[0].startDate}",
       "dateModified": "${mainAry[0].startDate}",
       "author": [{
         "@type": "Person",
         "name": "新一代媒體集團",
         "url": "https://www.news-age.tw/life/inside.html?id=${mainAry[0].articleId}"
       }]
     }`
     
     script.textContent = obj;
     document.head.appendChild(script);


    //TDK寫入
   
      
    printmain();
    lazyload();
  })
  

}

function printmain(){ 

let str = `<h1 class="article-title">${mainAry[0].mainTitle.replace('<br>','')}</h1>
<div class="edit">
${mainAry[0].mainText}
</div>

<div class="author-box">作者：${mainAry[0].authorName}</div>
`

let breadstr = `<li class="breadcrumb-item"><a href="../index.html">新一代媒體</a></li>
<li class="breadcrumb-item" aria-current="page"><a href="index.html">健康</a></li>
<li class="breadcrumb-item" aria-current="page"><a href="list.html">列表頁</a></li>
<li class="breadcrumb-item active" aria-current="page">${mainAry[0].mainTitle.replace('<br>','')}</li>`

pushmain.innerHTML = str;
bread.innerHTML = breadstr;



}


//熱門頭條


function hotnewsApi(){
 //  /hot/:channel
  axios.get(`${apilocal}/hot/醫療`)
  .then((res)=> {
    hotnewsAry = res.data;
   
    gethotnewsData();
  })
}


function gethotnewsData() {



  let str="";
  hotnewsAry.length = 8;

  hotnewsAry.forEach( (item,i) => {

    str+=`<li>
    <a href="inside.html?id=${item.hot_id}" class="d-flex"  >
      <div class="col-2 num">${i+1}</div>
      <div class="col-10 align-self-center">${item.hot_title}</div>
    </a>
  </li>`


  });

  hotnewsList.innerHTML = str;


}



 //廣告API

 function adapi(){

	
  axios.get(`${apilocal}/getData/ad/醫療`)
	.then( (res) => {
	  
		listadAry = res.data;
   // console.log(listadAry);
		LeftAddata();
   
	
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
  $('.ad-box2').owlCarousel({
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



		  //lazyload

      function lazyload(){

   const img = $(".edit img");


img.addClass('lazyload');

img.each(function() { 

$(this).attr("data-src", $(this).attr("src"));   
$(this).attr('src','images/list_loading.svg');
$(this).attr('data-sizes','auto');

});




      }


