$('#momo').load('./model.html');

const apitestlocal = "https://api.news-age.tw";
const newslist = document.querySelector('.news-box');
const radList = document.querySelector('.newad');
const ladList = document.querySelector('.b-ad-box');
const sliderBg = document.querySelector('.slider-bg');
const focusreList = document.querySelector('.newfocus');
const chlangeList = document.querySelector('.chlange');
const eduList = document.querySelector('.edulist');
const medList = document.querySelector('.medlist');
const talkList = document.querySelector('.talklist');
const sportList = document.querySelector('.sportlist');
const actList = document.querySelector('.focus-box');

let newsdata = [];
let addata = [];
let focusReportData = [];
let talkData = [];
let Lgbgary = [];
let allData = [];
let actData = [];


//初始化
function init() {
  adapi();
  Lgadapi();
  allListapi();
}

init();

//時間處理
function returntime(time) {

  let date = new Date(time);
  let Y = date.getFullYear().toString();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return `${Y}-${M}-${D}`;

}

//大廣告API

function Lgadapi() {

  // axios.get(`${apitestlocal}/getData/front/?homeStatus=1`)
  axios.get('./JSON/banner.json')
    .then((res) => {
      Lgbgary = res.data;
      Lgbgary.length = 5;
      getLgad();

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

}


function getLgad() {

  let str = "";
  Lgbgary.forEach((item) => {

    if (item.channel === "醫療") {
      item.channel = "medical"
    }

    if (item.channel === "台中腔") {
      item.channel = "life"
    }

    if (item.channel === "話題") {
      item.channel = "Topic"
    }

    if (item.channel === "新一代觀點") {
      item.channel = "View"
    }

    if (item.channel === "教育") {
      item.channel = "Educate"
    }


    str += `<div class="item img-item">
    <img alt="${item.title}"  class="img-fluid " src="${item.homeFront}" width="750" height="400">
    <a href="${item.channel}/inside.html?id=${item.id}" target="_blank" data-channel="${item.channel}">
      <p class="index-title">${item.title}</p>
      <p>${item.subtext}</p>
    
    </a>

  </div>`;

    sliderBg.innerHTML = str;

  });


  $('.slider-bg').owlCarousel({
    loop: true,
    nav: false,
    autoplay: true,
    items: 1,
    mouseDrag: true,
    autoplayTimeout: 10000,
    responsive: {
      0: {
        autoHeight: true
      },
      600: {
        autoHeight: false
      },
      1000: {
        autoHeight: false
      }
    }

  });


}



//廣告API

function adapi() {
  //https://api.news-age.tw/getData/ad/首頁
  //axios.get(`${apitestlocal}/getData/ad/首頁`)
  axios.get('./JSON/ad.json')
    .then((res) => {

      addata = res.data;
      rightAddata();
      bottomAddata();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}



//全列表

function allListapi() {

  // axios.get(`${apitestlocal}/articleData`)
  axios.get('./JSON/articleData.json')
    .then((res) => {

      allData = res.data.result;

      getfocusData();
      getchlangeData();
      geteduData();
      getmedicalData();
      gettalkData();

    })
    .catch(function (er) {
      console.log(er);
    })





}


//api區域//



//過濾新一代觀點文章

function getfocusData() {



  let newPointData = allData.filter((item) => {
    return item["channelName"] == "新一代觀點";
  });


  newPointData.length = 6;



  let str = "";

  newPointData.forEach((item) => {


    str += `	<div class="col-md-4 col-6 mb-2 ">
    <a href="#" title="${item.mainTitle}">
    <span></span>
      <img src="${item.imgSqu}" class="img-fluid" alt="${item.mainTitle}" width="361" height="222">
    </a>
    <p class="title mt-1 ">${item.mainTitle}</p>
    <p class="news-main">${item.subText}</p>
    <div class="row g-1">
      <div class="col-md-auto post-tag">
        <a href="javascript:;" class="save" title="收藏文章"  data-id="${item.articleId}" >
        <i class="bi bi-bookmark" data-id="${item.articleId}" data-title="${item.mainTitle}" data-channel="${item.channelName}"></i>
        </a>
        <span>${item.channelName}</span>
      </div>
      <div class="col-md post-date">${returntime(item.startDate)}</div>
    </div>
  </div>`;


    focusreList.innerHTML = str;



  })


  localStorageFn();

}


//過濾話題文章
function gettalkData() {

  let newtalkData = allData.filter((item) => {
    return item["channelName"] == "話題";
  });





  newtalkData.length = 4;


  let str = "";

  newtalkData.forEach((item) => {



    str += `	<div class="col-md-3 col-6 mb-2 ">
    <a href="#" title="${item.mainTitle}">
    <span></span>
      <img src="${item.imgSqu}" class="img-fluid" alt="${item.mainTitle}" width="361" height="222">
    </a>
    <p class="title mt-1 ">${item.mainTitle}</p>
    <p class="news-main">${item.subText}</p>
    <div class="row g-1">
    <div class="col-md-auto post-tag">
      <a href="javascript:;" class="save" title="收藏文章" data-id="${item.articleId}">
      <i class="bi bi-bookmark" data-id="${item.articleId}" data-title="${item.mainTitle}" data-channel="${item.channelName}"></i>
      </a>
      <span>${item.channelName}</span>
    </div>
    <div class="col-md post-date">${returntime(item.startDate)}</div>
  </div>
  </div>`;


    talkList.innerHTML = str;



  })

  localStorageFn();





}

//過濾台中腔調文章

function getchlangeData() {

  let chlangeData = allData.filter((item) => {
    return item["channelName"] == "台中腔";
  });



  chlangeData.length = 4;



  let str = "";

  chlangeData.forEach((item) => {



    str += `	<div class="col-md-3 col-6 mb-2 ">
    <a href="life/inside.html?id=${item.articleId}" title="${item.mainTitle}">
    <span></span>
      <img src="${item.imgSqu}" class="img-fluid" alt="${item.mainTitle}" width="361" height="222">
    </a>
    <p class="title mt-1 ">${item.mainTitle}</p>
    <p class="news-main">${item.subText}</p>
    <div class="row g-1">
    <div class="col-md-auto post-tag">
      <a href="javascript:;" class="save" title="收藏文章" data-id="${item.articleId}">
      <i class="bi bi-bookmark" data-id="${item.articleId}" data-title="${item.mainTitle}" data-channel="${item.channelName}"></i>
      </a>
      <span>${item.channelName}</span>
    </div>
    <div class="col-md post-date">${returntime(item.startDate)}</div>
  </div>
  </div>`;



    chlangeList.innerHTML = str;

  })

  localStorageFn();


}


//過濾教育文章

function geteduData() {

  let eduData = allData.filter((item) => {
    return item["channelName"] == "教育";
  });


  eduData.length = 4;



  let str = "";

  eduData.forEach((item) => {


    str += `	<div class="col-md-3 col-6 mb-2 ">
    <a href="#" title="${item.mainTitle}">
    <span></span>
      <img src="${item.imgSqu}" class="img-fluid" alt="${item.mainTitle}" width="361" height="222">
    </a>
    <p class="title mt-1 ">${item.mainTitle}</p>
    <p class="news-main">${item.subText}</p>
    <div class="row g-1">
    <div class="col-md-auto post-tag">
      <a href="javascript:;" class="save" title="收藏文章" data-id="${item.articleId}">
      <i class="bi bi-bookmark" data-id="${item.articleId}" data-title="${item.mainTitle}" data-channel="${item.channelName}"></i>
      </a>
      <span>${item.channelName}</span>
    </div>
    <div class="col-md post-date">${returntime(item.startDate)}</div>
  </div>
  </div>`;


    eduList.innerHTML = str;



  })


  localStorageFn();


}

//過濾醫療文章

function getmedicalData() {

  let medData = allData.filter((item) => {
    return item["channelName"] == "醫療";
  });

  // medData.reverse();
  medData.length = 4;

  let str = "";

  medData.forEach((item) => {


    str += `<div class="col-md-3 col-6 mb-2 ">
    <a href="medical/inside.html?id=${item.articleId}" title="${item.mainTitle}">
    <span></span>
      <img src="${item.imgSqu}" class="img-fluid" alt="${item.mainTitle}" width="361" height="222">
    </a>
    <p class="title mt-1 ">${item.mainTitle}</p>
    <p class="news-main">${item.subText}</p>
    <div class="row g-1">
    <div class="col-md-auto post-tag">
      <a href="javascript:;" class="save" title="收藏文章" data-id="${item.articleId}">
      <i class="bi bi-bookmark" data-id="${item.articleId}" data-title="${item.mainTitle}" data-channel="${item.channelName}"></i>
      </a>
      <span>${item.channelName}</span>
    </div>
    <div class="col-md post-date">${returntime(item.startDate)}</div>
  </div>
  </div>`;


    medList.innerHTML = str;



  })

  localStorageFn();


}



//下方廣告
function bottomAddata() {

  let str = "";

  addata.forEach((item) => {

    str += `<div class="item">
		<a href="${item.link}"><img class="img-fluid owl-lazy" data-src="${item.imgLong}" width="1140" height="132"></a>
	 </div>`

  })



  ladList.innerHTML = str;

  //廣告
  $('.b-ad-box').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    lazyLoad: true,
    autoplay: true,
    margin: 0,
    items: 1,
    mouseDrag: false,
    autoplayTimeout: 5000,


  });


}



//右方廣告


function rightAddata() {

  let str = "";

  //addata.reverse();
  addata.forEach((item) => {

    str += `<div class="item">
		<a href="#" target="_blank"><img class="img-fluid owl-lazy" data-src="${item.imgStr}" width="525" height="700" alt="${item.ImgTitle_Straight}"></a>
	</div>`

  });

  radList.innerHTML = str;


  //廣告
  $('.newad').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    lazyLoad: true,
    autoplay: true,
    margin: 0,
    items: 1,
    mouseDrag: false,
    autoplayTimeout: 5000,
  });

};


function getadData() {

  let str = "";

  actData.length = 0;

  if (actData.length == 0) {
    $('#activity-box').css('display', 'none')
  } else {

    actData.forEach((item) => {
      str += `	<div class="item">
  
    <img alt="${item.act_title}" class="img-fluid owl-lazy" data-src="${item.act_imgurl}" width="750" height="400">
  
    <div class="showdown-box">
      <a href="${item.act_link}">
  
        <p class="title">${item.act_title}</p>
        <p class="text-main">敘述文</p>
        <div class="date">${item.act_createtime}</div>
      </a>
  
    </div>
  </div>
  
  `
    });

    actList.innerHTML = str;


    $('.focus-box').owlCarousel({
      loop: true,
      nav: true,
      navText: ['<i class="bi bi-caret-left-fill"></i>', '<i class="bi bi-caret-right-fill"></i>'],
      lazyLoad: true,
      autoplay: false,
      items: 1,
      mouseDrag: false,
      autoplayTimeout: 10000,

    });
  }

}




//GTAG追蹤

const lgBanner = document.querySelector('.slider-box');

lgBanner.addEventListener('click', function () {

  gtag('event', '點擊', {
    'event_category': '首頁大廣告',
    'event_label': '首頁大廣告'
  });

});


function updateLocalStorage(favorite) {
  //store the list back to localStorage
  localStorage.setItem('favorite', JSON.stringify(favorite));
}


function localStorageFn() {

  let saveFavorite = document.querySelectorAll('.newlist .save');
  let favorite = JSON.parse(localStorage.getItem('favorite')) || [];

  saveFavorite.forEach((item) => {
    //取id
    item.addEventListener('click', (e) => {
      // console.log(e.target.dataset.id);
      const id = e.target.dataset.id;
      const title = e.target.dataset.title;
      const channel = e.target.dataset.channel;

      let obj = {
        id: id,
        title: title,
        channel: channel

      }

      const favoriteIndex = favorite.findIndex((item) => item.id === id);

      if (favoriteIndex === -1) {

        favorite.push(obj);
        e.target.classList.remove('bi-bookmark');
        e.target.classList.add('bi-bookmark-fill');

      } else {

        favorite.splice(favoriteIndex, 1);
        e.target.classList.remove('bi-bookmark-fill');
        e.target.classList.add('bi-bookmark');
      }

      updateLocalStorage(favorite);
      updataArticle();
    });       


    //比對陣列的id是否等於點擊收藏id
    favorite.forEach((fid) => {
      if (fid.id == item.dataset.id) {
        item.children[0].classList.remove('bi-bookmark');
        item.children[0].classList.add('bi-bookmark-fill');
      }
    });
    
  });

};



//收藏文章顯示

function updataArticle() {

  const saveArticle = document.querySelector('.saveArticle ul');
  let localAry = JSON.parse(localStorage.getItem('favorite')) || [];


  let str = "";
  let chalStr = "";

  localAry.forEach((item) => {
    if (item.channel == '醫療') {
      chalStr = 'medical'
    }
    if (item.channel == '新一代觀點') {
      chalStr = 'View'
    }
    if (item.channel == '話題') {
      chalStr = 'Topic'
    }
    if (item.channel == '台中腔') {
      chalStr = 'life'
    }
    if (item.channel == '教育') {
      chalStr = 'Educate'
    }

    str += `<li>
    <a href="${chalStr}/inside.html?id=${item.id}">${item.title}</a>
    <i class="bi bi-backspace ms-2" title="移除"data-id="${item.id}"></i>
    </li>`;
  })

  saveArticle.innerHTML = str;

  //移除收藏文章

  const saveArticleList = document.querySelectorAll('.saveArticle i');
  // let favorite = JSON.parse(localStorage.getItem('favorite')) || [];

  saveArticleList.forEach((item) => {

    item.addEventListener('click', (e) => {
      console.log(e.target);
      const id = e.target.dataset.id;
      const saveIndex = localAry.findIndex((item) => item.id === id);

      if (saveIndex !== -1) {



        let yes = confirm('確定移除嗎？');

        if (yes) {
          localAry.splice(saveIndex, 1);
          updateLocalStorage(localAry);
          updataArticle();

          window.location.reload();



        } else {
          return
        }



      }


    })

  })


}


updataArticle();









