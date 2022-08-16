//document.location.href="../../index.html";


const apitestlink = "https://api.news-age.tw";
const lgbnlist = document.querySelector('.slider-bg');
const reportbox = document.querySelector('.report-put');
const newsbox = document.querySelector('.catalog-box');
const adbox = document.querySelector('.ad-box');

const Abox = document.querySelector('.Adata');
const Bbox = document.querySelector('.Bdata');
const Cbox = document.querySelector('.Cdata');
const Dbox = document.querySelector('.Ddata');

const WarmAbox = document.querySelector('.two-list-box');


const locallist = document.querySelector('.activity-list-box ul')

let sliderData = [];
let reportData = [];
let returnAData = [];
let returnBData = [];
let returnCData = [];
let returnDData = [];

let warmA = [];
let warmB = [];
let warmC = [];
let warmD = [];



let longad = [];
let warmAry = [];
let localAry = [];



//初始化
function init() {

    sliderapi();
    reportapi();
    returnAreapi();
    returnBreapi();
    returnCreapi();
    returnDreapi();
    warmapi();
    longadapi();
    // localapi();ㄚ

}




init();


//大輪播廣告api
function sliderapi() {

    // http://api01.news-age.tw/api/Medical/Front
    // https://api.news-age.tw/getData/front/醫療?chStatus=1
    // axios.get(`${apitestlink}/getData/front/醫療?chStatus=1`)
     axios.get('./JSON/medical.json')
        .then((res) => {
            sliderData = res.data;
            sliderData.length = 7;

            getsliderBn();

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

}

//當季健康api

function reportapi() {

    // axios.get(`${apitestlink}/getData/position/醫療/medicalA`)
    axios.get('./JSON/medicalA.json')
        .then((res) => {
            reportData = res.data;
            getreportlist();
           

        })
        .catch(function (error) {
            console.log(error)
        })
}


//Care主題精選api
function returnAreapi() {
    //https://apilan.news-age.tw/medical/medicalB/?chLocation=medicalB_1
    // axios.get(`${apitestlink}/getData/position/醫療/medicalB_1`)
    axios.get('./JSON/medicalB_1.json')
        .then((res) => {
            returnAData = res.data;
         
            let str = `
        <a href="inside.html?id=${returnAData[0].id}">
            <img src="${returnAData[0].imageRec}" class="img-fluid">
        </a>
        <div class="master-title">${returnAData[0].title}</div>
        <div class="master-main">${returnAData[0].subtext}</div>
        <div class="row mt-2 tag-box">
            <div class="col-6 "><span>主題精選</span></div>
            <div class="col-6 text-end align-self-end">${returntime(returnAData[0].startDate)}</div>
        </div>
    `    

            Abox.innerHTML = str;


        })
        .catch(function (error) {
            console.log(error)
        })
}

function returnBreapi() {
    //https://apilan.news-age.tw/medical/medicalB/?chLocation=medicalB_1
    // axios.get(`${apitestlink}/getData/position/醫療/medicalB_2`)
    axios.get('./JSON/medicalB_2.json')
        .then((res) => {
            returnBData = res.data;


            let str = `
            <a href="inside.html?id=${returnBData[0].id}">
                <img src="${returnBData[0].imageRec}" class="img-fluid">
            </a>
            <div class="master-title">${returnBData[0].title}</div>
            <div class="master-main">${returnBData[0].subtext}</div>
            <div class="row mt-2 tag-box">
                <div class="col-6 "><span>主題精選</span></div>
                <div class="col-6 text-end align-self-end">${returntime(returnBData[0].startDate)}</div>
            </div>   
        `

            Bbox.innerHTML = str;


        })
        .catch(function (error) {
            console.log(error)
        })
}


function returnCreapi() {
    //https://apilan.news-age.tw/medical/medicalB/?chLocation=medicalB_1
   // axios.get(`${apitestlink}/getData/position/醫療/medicalB_3`)
    axios.get('./JSON/medicalB_3.json')
        .then((res) => {
            returnCData = res.data;
           


            let str = `
                <a href="inside.html?id=${returnCData[0].id}">
                    <img src="${returnCData[0].imageRec}" class="img-fluid">
                </a>
                <div class="master-title">${returnCData[0].title}</div>
                <div class="master-main">${returnCData[0].subtext}</div>
                <div class="row mt-2 tag-box">
                    <div class="col-6 "><span>主題精選</span></div>
                    <div class="col-6 text-end align-self-end">${returntime(returnCData[0].startDate)}</div>
                </div>         
            `

            Cbox.innerHTML = str;


        })
        .catch(function (error) {
            console.log(error)
        })
}



function returnDreapi() {
    //https://apilan.news-age.tw/medical/medicalB/?chLocation=medicalB_1
   // axios.get(`${apitestlink}/getData/position/醫療/medicalB_4`)
    axios.get('./JSON/medicalB_4.json')
        .then((res) => {
            returnDData = res.data;


            let str = `
                    <a href="inside.html?id=${returnDData[0].id}">
                        <img src="${returnDData[0].imageRec}" class="img-fluid">
                    </a>
                    <div class="master-title">${returnDData[0].title}</div>
                    <div class="master-main">${returnDData[0].subtext}</div>
                    <div class="row mt-2 tag-box">
                        <div class="col-6 "><span>主題精選</span></div>
                        <div class="col-6 text-end align-self-end">${  returntime(returnDData[0].startDate) }</div>
                    </div>
                `

            Dbox.innerHTML = str;


        })
        .catch(function (error) {
            console.log(error)
        })
}






//長
function longadapi() {

    // axios.get(`${apitestlink}/getData/ad/醫療`)
    axios.get('./JSON/ad.json')
        .then((res) => {

            longad = res.data;
            getlongadlist();
        })
        .catch(function (er) {
            console.log(er)
        })
}



//光點系列API


function warmapi() {

    //?chLocation=medicalB_1

  //  axios.get(`${apitestlink}/getData/position/醫療/medicalC`)
    axios.get('./JSON/medicalC.json')
        .then((res) => {

            warmA = res.data;
            warmA.length = 4;

            let str = '';

            warmA.forEach( (item)=> {
                str += `
                <div class="col-md-3  mb-3">
                <a href="inside.html?id=${item.id}"><img src="${item.imageRec}" class="img-fluid"></a>
                <p class="two-list-title mb-1">${item.title}</p>
                <p class="two-list-main-text mb-1">${item.subtext}</p>
                <div class="row mt-2 tag-box">
                            <div class="col-6 "><span>光點系列</span></div>
                            <div class="col-6  text-end align-self-end">${returntime(item.startDate)}</div>
                        </div>   
                        </div>
            `
            } )

            WarmAbox.innerHTML = str;

       

        })
        .catch(function (er) {
            console.log(er)
        })
}




//API區域結束//


function getLocalData() {

    let str = "";

    localAry.length = 8;

    localAry.forEach((item) => {

        str += `<li class="col-md-6">
        <a href="${item.local_link}">${item.local_title}</a>
        </li>`

    });

    locallist.innerHTML = str;

}

//抓大廣告清單
function getsliderBn() {

    let str = "";

    sliderData.forEach((item) => {

        str += `<div class="item img-item">
    <a href="inside.html?id=${item.id}" title="${item.title}">
    <img alt="${item.title}" class="img-fluid owl-lazy" data-src="${item.chFront}">
    <span>${item.title}</span>
    </a>
</div>`

    });


    lgbnlist.innerHTML = str;

    $('.slider-bg').owlCarousel({
        loop: true,
        nav: true,
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        autoplay: true,
        lazyLoad: true,
        dots: false,
        items: 1,
        mouseDrag: false,
        autoplayTimeout: 5000,

    });



}

//抓talk當季健康導清單
function getreportlist() {



    let str = `
    
	<div class="col-md-4 talk-left">
    <a href="inside.html?id=${reportData[0].id}">
    <img src="${reportData[0].imageSqu}" class="img-fluid" alt="${reportData[0].title}">
    <span>
    <div class="main-title">${reportData[0].title}</div>
    <div class="main-text">${reportData[0].subtext}</div>
    <div class="main-data">${returntime(reportData[0].startDate)}</div>
    </span>  
   
    </a>
    </div>
    <div class="col-md-4 talk-list">
    <a href="inside.html?id=${reportData[1].id}">
    <img src="${reportData[1].imageRec}" class="img-fluid" alt="${reportData[1].title}">
    </a>
    <span> ${reportData[1].title}</span>
    <div class="main-text">${reportData[1].subtext}</div>
    <div class="row tag-box">
    <div class="col-6">
    <span>當季健康</span>
    </div>
    <div class="col-6 text-end align-self-end">${returntime(reportData[1].startDate)}</div>
    </div>
    
    </div>
    <div class="col-md-4 talk-list">
    <a href="inside.html?id=${reportData[2].id}">
    <img src="${reportData[2].imageRec}" class="img-fluid" alt="${reportData[2].title}">
    </a>
    <span> ${reportData[2].title}</span>
    <div class="main-text">${reportData[2].subtext}</div>
    <div class="row tag-box">
    <div class="col-6">
    <span>當季健康</span>
    </div>
    <div class="col-6 align-self-end text-end">${returntime(reportData[2].startDate)}</div>
    </div>
   
    </div>

`;


    reportbox.innerHTML = str;

}

//長型廣告清單

function getlongadlist() {



    let str = "";
    longad.forEach((item) => {
        str += `<div class="item">
        <a target="_blank" href="${item.link}"><img class="img-fluid owl-lazy d-none d-md-block"  alt="${item.title}" data-src="${item.imgLong}"  width="600" height="800"></a>
        <a target="_blank" href="${item.link}"><img class="img-fluid owl-lazy d-md-none"  alt="${item.title}" data-src="${item.imgMobi}"  width="600" height="800"></a>
      
        </div>`
    });

    adbox.innerHTML = str;

    //廣告
    $('.ad-box').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
        lazyLoad: true,
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





