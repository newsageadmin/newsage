
const apitestlink = "https://api.news-age.tw";

const slider = document.querySelector('.slider-bg');

//熱門
const hotNews = document.querySelector('.report-put');
//藝術人文
const catalogbox = document.querySelector('.catalog-box');
//美食特搜
const fourbox = document.querySelector('.four-list-box');




const adbox = document.querySelector('.ad-box');






let sliderAd = [];
let hotNewsAry = [];
let newsaAry = [];

let adAry = [];
let adboxAry = [];





function init() {

    sliderAdapi();
    //  alignReportapi();
    justifyReportapi();
    newsAapi();
    newsBapi();
    adApi();
}

init();


//輪播廣告

function sliderAdapi() {

    //https://apilan.news-age.tw/getData/front/台中腔?chStatus=1
    // axios.get(`${apitestlink}/getData/front/台中腔?chStatus=1`)
    axios.get('./JSON/chlife.json')
        .then((res) => {
            // console.log(res.data);
            sliderAd = res.data;

            getsliderAd();
        })
        .catch(function (er) {
            console.log(er);
        })

}

function getsliderAd() {

    let str = "";
    sliderAd.length = 5;

    sliderAd.forEach((item) => {
        str += `<div class="item img-item">
        <a href="inside.html?id=${item.id}" target="_blank"><img alt="${item.title}" class="img-fluid owl-lazy" data-src="${item.chFront}"
                width="1300" height="500">
                <span>${item.title}</span> 
        </a>
    </div>`
    });



    slider.innerHTML = str;

    $('.slider-bg').owlCarousel({
        loop: true,
        nav: true,
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        autoplay: true,
        lazyLoad: true,
        autoHeight: true,
        dots: false,
        items: 1,
        mouseDrag: false,
        autoplayTimeout: 10000,
        responsive: {
            0: {
                items: 1,
                mouseDrag: true,
                nav: false
            },
            600: {
                items: 1,
                mouseDrag: true
            },
            1000: {
                items: 1
            }
        }

    });





}


//最新熱門

function justifyReportapi() {
    //https://apilan.news-age.tw/getData/position/台中腔/lifeA
    // axios.get(`${apitestlink}/articleData/?pageSize=3&pageNum=1&channel=台中腔`)
    axios.get('./JSON/lifeA.json')
        .then((res) => {


            hotNewsAry = res.data.result;
            console.log('new', hotNewsAry)


            getjustrReport();

        })
        .catch(function (er) {
            console.log(er);
        })


}

function getjustrReport() {




    let str = `
	<div class="col-md-4 talk-left">
    <a href="inside.html?id=${hotNewsAry[0].articleId}">
    <img src="${hotNewsAry[0].imgSqu}" class="img-fluid" alt="${hotNewsAry[0].mainTitle}">
    <span>
    <div class="main-title">${hotNewsAry[0].mainTitle}</div>
    <div class="main-text">${hotNewsAry[0].subText}</div>
    <div class="main-data">${returntime(hotNewsAry[0].startDate)}</div>
    </span>
    
    </a>
    </div>
    <div class="col-md-4 talk-list">
    <a href="inside.html?id=${hotNewsAry[1].articleId}">
    <img src="${hotNewsAry[1].imgRec}" class="img-fluid" alt="${hotNewsAry[1].mainTitle}">
    </a>
    <span> ${hotNewsAry[1].mainTitle}</span>
    <div class="main-text">${hotNewsAry[1].subText}</div>
    <div class="row tag-box">
    <div class="col-6">
    <span>最新熱門</span>
    </div>
    <div class="col-6 text-end align-self-end">${returntime(hotNewsAry[1].startDate)}</div>
    </div>
    
    </div>
    <div class="col-md-4 talk-list">
    <a href="inside.html?id=${hotNewsAry[2].articleId}">
    <img src="${hotNewsAry[2].imgRec}" class="img-fluid" alt="${hotNewsAry[2].mainTitle}">
    </a>
    <span> ${hotNewsAry[2].mainTitle}</span>
    <div class="main-text">${hotNewsAry[2].subText}</div>
    <div class="row tag-box">
    <div class="col-6">
    <span>最新熱門</span>
    </div>
    <div class="col-6 text-end align-self-end">${returntime(hotNewsAry[2].startDate)}</div>
    </div>
    
    </div>

`;


    hotNews.innerHTML = str;

}


//藝術人文



function newsAapi() {



    // axios.get(`${apitestlink}/getData/position/台中腔/lifeB`)
    axios.get('./JSON/lifeB.json')
        .then((res) => {

            newsaAry = res.data;
            getnewsaList();


        })
        .catch(function (er) {
            console.log(er);
        })

}

function getnewsaList() {

    let str = "";


    newsaAry.length = 4;
    console.log(newsaAry)

    newsaAry.forEach((item) => {
        str += `
        <div class="col-md-6 mb-3 mt-3">
        <a href="inside.html?id=${item.id}">
        <img src="${item.imageRec}" class="img-fluid">
    </a>
    <div class="master-title">${item.title}</div>
    <div class="master-main">${item.subtext}</div>
    <div class="row mt-2 tag-box">
        <div class="col-6 "><span>藝術人文</span></div>
        <div class="col-6 text-end align-self-end">${returntime(item.startDate)}</div>
    </div>
        </div>`
    });

    catalogbox.innerHTML = str;


}


//美食特區
function newsBapi() {

    // axios.get(`${apitestlink}/getData/position/台中腔/lifeC`)
    axios.get('./JSON/lifeC.json')
        .then((res) => {

            newsbAry = res.data;
            getnewsbList();

        })
        .catch(function (er) {
            console.log(er);
        })

}


function getnewsbList() {

    let str = "";
    newsbAry.length = 4;
    newsbAry.forEach((item) => {
        str += `<div class="col-md-3 mb-3">
        <a href="inside.html?id=${item.id}"><img src="${item.imageRec}" class="img-fluid"></a>
        <p class="two-list-title mb-1 mt-1">${item.title}</p>
        <p class="two-list-main-text mb-1">${item.subtext}</p>
        <div class="row mt-2 tag-box">
                    <div class="col-md-6 col-6"><span>美食特搜</span></div>
                    <div class="col-md-6 col-6 text-end align-self-end">${returntime(item.startDate)}</div>
                </div>  
                </div>`
    });

    fourbox.innerHTML = str;


}


//廣告


//https://apilan.news-age.tw/getData/ad/台中腔

function adApi() {
    // axios.get(`${apitestlink}/getData/ad/台中腔`)
    axios.get('./JSON/ad.json')
        .then((res) => {

            adboxAry = res.data;
            getAdlist();


        })
        .catch(function (er) {
            console.log(er);
        })

}

function getAdlist() {

    let str = "";

    adboxAry.forEach((item) => {

        str += `<div class="item">
        <a href="${item.link}">
        <img alt="${item.imgLong}" class="img-fluid owl-lazy d-none d-md-block"  data-src="${item.imgLong}" width="1140" height="132">
        <img alt="${item.imgMobi}" class="img-fluid owl-lazy d-md-none"  data-src="${item.imgMobi}" width="390" height="170">
        </a>
    </div>`
    });


    adbox.innerHTML = str;

    //廣告
    $('.ad-box').owlCarousel({
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



function getIndexAd() {



    let str = "";

    adboxAry.forEach((item, i) => {
        str += `<div class="item">
        <a href="${item.Link}">
        <img alt="${item.Img_Straight}" class="img-fluid owl-lazy d-none d-md-block"  data-src="${item.Img_Straight}" width="1140" height="132">
        <img alt="${item.ImgTitle_M}" class="img-fluid owl-lazy d-md-none"  data-src="${item.Img_M}" width="390" height="170">
        </a>
    </div>`
    })

    indexAdbox.innerHTML = str;

    //廣告
    $('.index-ad').owlCarousel({
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

//時間處理
function returntime(time) {

    let date = new Date(time);
    let Y = date.getFullYear().toString();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return `${Y}-${M}-${D}`;

}


