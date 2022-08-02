// https://www.googleapis.com/youtube/v3/videos?id=jeqH4eMGjhY&key=AIzaSyCD92v7ciy7-_IJeVebv4acfkl7axxOigA&part=snippet


let videodata = [];
const videobox = document.querySelector('.video-box');

function getvideoList() {

axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId=UUMUnInmOkrWN4gof9KlhNmQ&key=AIzaSyCD92v7ciy7-_IJeVebv4acfkl7axxOigA&maxResults=10')
.then( function(res){

    videodata =  res.data.items;
   // console.log(videodata)
    printVideoList();
})
.catch(function (error) {
    // handle error
    console.log(error);
  })

  }

  getvideoList();


  function printVideoList() {


    let str ="";
    
   
    
    videodata.forEach( (item)=> {

        str+= `
      
        <div class="item">
        <div class="ratio ratio-16x9">
            <iframe allowfullscreen src="https://www.youtube.com/embed/${item.contentDetails.videoId}"
                title="YouTube video"></iframe>
        </div>

        <div class="text-center">
            <p>${item.snippet.title}</p>
        </div>
    </div>
    
    `;

    

    } )

    let str2 = `<div class="videolist owl-carousel owl-theme">${str}</div>`;

   
    videobox.innerHTML += str2;

    
  //影音新聞
  $('.videolist').owlCarousel({
    loop: true,
    nav: false, 
    dots: true,
    margin:15,
 
    mouseDrag: false,

    responsive: {
        0: {
            items: 1,
            mouseDrag:true
        },
        600: {
            items: 1,
            mouseDrag:true
        },
        1000: {
            items: 2
        }
    }

    });

    

  }



  