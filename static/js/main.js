
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

// XXX move to global js file
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
  socket.emit('join', { "origin" : uuid });

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
    var select_answer = function (e) {
      var element = {};
      var id = '';
      var answer = '';
      if (e instanceof KeyboardEvent) {
        // keyboard press
        id = $(".card").last().attr("id");
        answer = String.fromCharCode(e.charCode).toUpperCase();
        element = $("#answer_"+id+"_"+answer);
      } else {
        // clicked
        tokens = $(this).attr('id').split('_');
        id = tokens[1];
        answer = tokens[2];
        element = this;
      }

      var index = questions.index.indexOf(id);
      $("#answers_"+id+" li").removeClass("perma_incorrect").removeClass("perma_correct");
      if (answer === questions[index].answer) {
        $(element).parent().addClass("perma");
        $(element).addClass("perma_correct");
        $("#"+id+" .result").addClass("correct").html("Correct").removeClass("incorrect");

      } else {
        $(element).parent().addClass("perma");
        $(element).addClass("perma_incorrect");
        $("#"+id+" .result").addClass("incorrect").html("Incorrect").removeClass("correct");
      }

      // notify the network
      socket.emit('answer', { "origin" : uuid, "id" : id, "answer" : answer });
    };

    // Bind event handlers
    $(document).on('click', '#answer_'+question.id+'_'+options.hash.slot, select_answer);
    if (/^[a-zA-Z0-9_]*$/.test(options.hash.slot)) {
      Mousetrap.bind(options.hash.slot.toUpperCase(), select_answer);
      Mousetrap.bind(options.hash.slot.toLowerCase(), select_answer);
    }

    return new Handlebars.SafeString(
      '<li id="answer_'+question.id+'_'+options.hash.slot+'" class="answer' + (options.hash.slot === question.answer ? ' correct' : '') +'">'+
          '<label>'+options.hash.slot+'.</label>'+
          '<div>'+question.answers[options.hash.slot]+'</div>'+
       '</li>'
    );
  });

//});

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
