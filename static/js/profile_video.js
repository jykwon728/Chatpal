console.log('profile_video.js is loaded');
window.onload = function bringvideos(){
    console.log('page loaded')
    // var setOfVideoId =
    $.getJSON("/profile/loadVideo").then(function(video){
    //var setOfVideoId = $.get("videofeedtest.json",function(data){
    console.log('js got the videos here!: ', video)
    console.log(video[0]);
    var videoLength = Object.keys(video).length; // how to findout length of a JSON Object!

    for(var i=0; i<videoLength; i++){
      $("#videoSelector").append(
        "<div id=videoNo"+i+
          " class=video-thumbnail-holder data-ga-videoid="+video[i]+"></div>")

      var imgurl = "https://img.youtube.com/vi/"+video[i].vidId+"/sddefault.jpg"
      console.log(imgurl)

      $("#videoNo"+i+"").append(
        "<img id=thumbnail"+i+" src="+imgurl+" height=300 width=500>")
      document.getElementById("videoNo"+i+"").src = imgurl


    $("#videoNo"+i+"").on('click', function(){
        const id = $(this).attr("data-ga-videoid");
        console.log(id);
        var url = '../../templates/videoLesson.html?v='+id
        console.log(url)
        window.location=url
    })

    }

    })
};
