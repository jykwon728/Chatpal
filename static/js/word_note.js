
for(i=0;i<learnWords.length;i++){
  $("#cardDeckHolder").append('<div class=card><div class=card-header>learn</div><div class=card-body><h4 class=card-text>'+learnWords[i]+'</h4></div> <div id=synonymCard'+i+' class=synonym-card>'+learnSyn[i]+'</div>')

}

for(i=0;i<wantWords.length;i++){
  $("#cardDeckHolder").append('<div class=card word-card data-value='+wantWords[i]+'><div class=card-header>want</div><div class=card-body><h4 class="card-text">'+wantWords[i]+'</h4></div>')

}
$(".card").on("click",function(){
  console.log('card is clicked');
  var value = $(this).data("value")
  console.log('this is the cards value ', value);
  $.get({
    type:'get',
    url: 'https://wordsapiv1.p.mashape.com/words/'+value,
    headers: {"X-Mashape-Key": "bxoznfiBCSmshLr3CezINnY0jFGLp15gEOJjsnYZGWISg5pAN7", "X-Mashape-Host": "wordsapiv1.p.mashape.com"}
  }).done(function(result){
      console.log(result)
  })
});
