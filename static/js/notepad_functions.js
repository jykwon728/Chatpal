var wordLearn = [];
var wordCommentLearn = [];


$('#newWordButton').on('click', function(e){
  e.preventDefault();
  $("#noteContent").append("<input id=word-input class=input name=wordLearn placeholder=word></input>")
  $("#noteContent").append("<input id=comment-input class=input-comment name=wordCommentLearn placeholder=leave your comment></input>")
})

$('#newExpressionButton').on('click', function(e){
  e.preventDefault();
  $("#noteContent").append("<input id=expression-input class=input name=expressionLearn placeholder=expression></input>")
  $("#noteContent").append("<input id=comment-input class=input-comment name=expressionCommentLearn placeholder=leave your comment></input>")
})
