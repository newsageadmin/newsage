 const apilocal = "https://api.news-age.tw";
 const elseList = document.querySelector('.else-news-list');
 const pushmain = document.querySelector('.inside-main');
 const bread = document.querySelector('.breadcrumb');
 const hotnewsList = document.querySelector('.hot-news-box ul');
 let randomAry =[];
 let mainAry =[];
 let hotnewsAry =[];
 




  


  //隨機顯示
  //http://api01.news-age.tw/api/All/Random
  randomapi();
  insideApi();
  hotnewsApi();
  //隨機顯示文章

function randomapi(){

	axios.get(`${apilocal}/All/Random`)
	.then( (res) => {
	  
		randomAry = res.data;

   
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
    <a href="${item.Link}">
      <img src="${item.ImgRectangle}" class="img-fluid">
      <p class="title">${item.MainTitle}${item.Id}</p>
      <p>${item.SubText}</p>
    </a>
  </div>`

  });

  elseList.innerHTML = str;

}



//內頁內容

function insideApi(){

  let url = window.location.hash;
  let newsId = url.replace('#','');


  
  
  
  
    axios.get(`${apilocal}/All/inside/新一代觀點/${newsId}`)
    .then((res)=> {
     
      mainAry = res.data;
      console.log(mainAry)
      printmain();
    })
    
  
  
  }
  


function printmain(){
 

let str = `	<div class="article-title">
${mainAry[0].MainTitle}
</div>
<div class="edit">
${mainAry[0].MainText}
</div>

<div class="author-box">作者：${mainAry[0].AuthorName}</div>
`


let breadstr = `<li class="breadcrumb-item"><a href="index.html">新一代媒體</a></li>
<li class="breadcrumb-item" aria-current="page"><a href="list.html">列表頁</a></li>
<li class="breadcrumb-item active" aria-current="page">${mainAry[0].MainTitle}</li>`

pushmain.innerHTML = str;
bread.innerHTML = breadstr;



var metaList = document.getElementsByTagName("meta");
let title = `${mainAry[0].MainTitle}`;
let des = `${mainAry[0].SubText}`
let url = window.location.href;

document.title = title;

for (var i = 0; i < metaList.length; i++) {

  if (metaList[i].getAttribute("property") == "og:url") {
    metaList[i].content = url;
  }
  if (metaList[i].getAttribute("property") == "og:title") {
    metaList[i].content = title;
  }
  if (metaList[i].getAttribute("property") == "og:description") {
    metaList[i].content = des;
  }
  if (metaList[i].getAttribute("property") == "og:keywords") {
    metaList[i].content = title;
  }
  if (metaList[i].getAttribute("name") == "description") {
    metaList[i].content = des;
  }
  if (metaList[i].getAttribute("name") == "keywords") {
    metaList[i].content = title;
  }


  
}


 	//抓當前網址

   const share = document.querySelector('.share-into');
   let src = location.href;
   let sharestr = `
<div class="col-auto">	<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${src}" class="fb-icon"><img src="images/fb_share.png" class="img-fluid"></a></div>
<div class="col-auto">	<a href="http://line.me/R/msg/text/?${src}" class="line-icon"><img src="images/line_share.png" class="img-fluid"></a></div>

`



share.innerHTML = sharestr;







}



//熱門頭條


function hotnewsApi(){

  axios.get(`${apilocal}/All/HOT`)
  .then((res)=> {
    console.log(res.data);
    hotnewsAry = res.data;
    gethotnewsData()
  })
}


function gethotnewsData() {


  let str="";
  hotnewsAry.length = 8;

  hotnewsAry.forEach( (item,i) => {

    str+=`<li>
    <a href="${item.hot_link}" class="d-flex">
      <div class="col-2 num">${i+1}</div>
      <div class="col-10 align-self-center">${item.hot_title}</div>
    </a>
  </li>`


  });

  hotnewsList.innerHTML = str;


}



