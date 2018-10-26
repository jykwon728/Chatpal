var id = <%= vidId %>

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 800,
        height: 500,
        videoId: <%= vidId %>,
        playerVars: {
            autoplay: 1,
            color: 'white',
            controls:0,
            rel:0,
            iv_load_policy: 3,


        },
        events: {
            onReady: initialize,
            onStateChange: checkPause
        }
    });
}
