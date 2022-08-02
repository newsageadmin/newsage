

const apitestlink = "https://api.news-age.tw";


const WarmAbox = document.querySelector('.two-list-box');
const lgbnlist = document.querySelector('.slider-bg');


let sliderData = [];
let reportData = [];
let returnAData = [];
let returnBData = [];
let returnCData = [];
let returnDData = [];




let longad = [];
let warmAry = [];
let localAry = [];



//初始化
function init() {

    sliderapi();
    warmapi();
   

}

init();


//大輪播廣告api
function sliderapi() {

    // http://api01.news-age.tw/api/Medical/Front
    // https://apilan.news-age.tw/getData/front/醫療?chStatus=1

    axios.get(`${apitestlink}/getData/front/醫療?chStatus=1`)
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




//光點系列API


function warmapi() {

    //?chLocation=medicalB_1

    axios.get(`${apitestlink}/getData/position/醫療/medicalC`)
        .then((res) => {

            warmA = res.data;

            console.log(warmA)
          
            let str = '';

            warmA.forEach( (item)=> {
                str += `
                <div class="col-md-6 mb-3">
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






//時間處理
function returntime(time) {

    let date = new Date(time);
    let Y = date.getFullYear().toString();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
   
    return `${Y}-${M}-${D}`;
  
  }





