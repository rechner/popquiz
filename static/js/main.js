
Handlebars.registerHelper('questionID', function(id) {
    return new Handlebars.SafeString(
      id.substring(0,2) + "\n<em>" + id.substring(2, 5) + "</em>\n"
    );
});

Handlebars.registerHelper('if', function(conditional, options) {
  if (options.hash.desired === options.hash.type) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
  return v.toString(16);
});

var questions = {};
var data = {};
$.getJSON("static/questions.json", function(json) {
  // populate form
  questions = json;
  questions.index = questions.map(function (item) { return item.id });
  questions.history = [0,];

  data = { "question" : questions[0] }

  var source = $("#question-template").html();
  //var template = Handlebars.compile(source);
  var template = Handlebars.templates.questions;
  $("body").append(template(data));

  //element.scrollIntoView();
});


//$(document).ready(function () {
  namespace = '/events'
  var socket = io.connect(document.domain + ':' + location.port + namespace);

  socket.on('add_question', function(msg) {
    if (msg.index in questions.history) {
      return;
    }
    questions.history.push(msg.index);
    var data = { "question" : questions[msg.index] };
    var template = Handlebars.templates.questions;
    $("body").append(template(data));
    document.getElementById(questions.index[msg.index]).scrollIntoView();
  });

  Handlebars.registerHelper('answerMarkup', function(question, options) {
    $(document).on('click', '#answer_'+question.id+'_'+options.hash.slot, function () {
      var tokens = $(this).attr('id').split('_');
      var id = tokens[1];
      var answer = tokens[2];

      var index = questions.index.indexOf(id);
      $("#answers_"+id+" li").removeClass("perma_incorrect").removeClass("perma_correct");
      if (answer === questions[index].answer) {
        $(this).parent().addClass("perma");
        $(this).addClass("perma_correct");
        $("#"+id+" .result").addClass("correct").html("Correct").removeClass("incorrect");

      } else {
        $(this).parent().addClass("perma");
        $(this).addClass("perma_incorrect");
        $("#"+id+" .result").addClass("incorrect").html("Incorrect").removeClass("correct");
      }

      // notify the network
      socket.emit('answer', { "origin" : uuid, "id" : id, "answer" : answer });
    });

    return new Handlebars.SafeString(
      '<li id="answer_'+question.id+'_'+options.hash.slot+'" class="answer' + (options.hash.slot === question.answer ? ' correct' : '') +'">'+
          '<label>'+options.hash.slot+'.</label>'+
          '<div>'+question.answers[options.hash.slot]+'</div>'+
       '</li>'
    );
  });
//});
