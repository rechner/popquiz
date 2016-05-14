
Handlebars.registerHelper('questionID', function(id) {
    return new Handlebars.SafeString(
      id.substring(0,2) + "\n<em>" + id.substring(2, 5) + "</em>\n"
    );
});

Handlebars.registerHelper('answerMarkup', function(question, options) {
  return new Handlebars.SafeString(
    '<li id="answer_'+question.id+'_'+options.hash.slot+'" class="answer' + (options.hash.slot === question.answer ? ' correct perma_correct' : '') +'">'+
        '<label>'+options.hash.slot+'. <span id="score_'+question.id+'_'+options.hash.slot+'"></span></label>'+
        '<div>'+question.answers[options.hash.slot]+'</div>'+
     '</li>'
  );
});

var update_question = function () {
  var question_id = questions.index[current_question];
  var template = Handlebars.templates.teacher_question;
  $("#teacher_question").html(template({ "question" : questions[current_question] }));

  $("#list_"+question_id).parent().children().each(function () {
   $(this).removeClass("active");
  });

  $("#list_"+question_id).addClass("active");

  var scores = get_scores(question_id);
  var answer = questions[current_question].answer;
  var missed = 0;
  var total = 0;

  for (var key in scores) {
    if (scores.hasOwnProperty(key)) {
      $("#score_"+question_id+"_"+key).data('value', scores[key]).html(scores[key]);
      if ((scores[key] != 0) && (answer != key)) {
        $("#score_"+question_id+"_"+key).addClass("missed");
        missed += scores[key];
      } else {
        $("#score_"+question_id+"_"+key).removeClass("missed");
      }
      total += scores[key];
    }
  }

  var total_score = total - missed;
  $("#score").html(total_score + "/" + total);
  $("#score_"+question_id).html("("+total_score + "/" + total+")");
}

var get_scores = function (question_id) {
  var scores = {};
  for (var key in questions.answers[question_id]) {
    if (questions.answers[question_id].hasOwnProperty(key)) {
      scores[key] = questions.answers[question_id][key].length;
    }
  }

  return scores;
}

var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
  return v.toString(16);
});

namespace = '/events'
var socket = io.connect(document.domain + ':' + location.port + namespace);

// Keep up to date with other teacher instances
socket.on('add_question', function (msg) {
  if (msg.index === current_question) {
    return;
  } else {
    current_question = msg.index;
    update_question();
  }
});

socket.on('ping', function (msg) {
  console.log("Ping: " + msg.origin);
  if (msg.origin != uuid) {
    // only respond to pings from other clients to prevent a loop
    socket.emit('pong', {
      "index" : current_question,
      "origin" : uuid,
      "answers" : questions.answers
    });
  }
});

socket.on('pong', function(msg) {
  console.log(msg.answers);
  // update if needed
  console.log("Pong: " + msg.origin);
  if (msg.origin === uuid) {
    return;
  } else {
    current_question = msg.index;
    questions.answers = msg.answers;
    update_question();
  }
});

function removeNested(dictionary, item) {
  for (var key in dictionary) {
    if (dictionary.hasOwnProperty(key)) {
      index = dictionary[key].indexOf(item);
      if (index != -1) {
        dictionary[key].splice(index, 1);
      }
    }
  }
}

socket.on('answer', function(msg) {
  console.log(msg);
  if (msg.origin in questions.answers[msg.id][msg.answer]) {
    return;
  }

  // remove uuid from other answer keys
  removeNested(questions.answers[msg.id], msg.origin);

  questions.answers[msg.id][msg.answer].push(msg.origin);
  update_question();

});

// Ping to update question index if another teacher console is open somewhere:
socket.emit('ping', { "origin" : uuid });


var questions = {};
var data = {};
var current_question = 0;
$.getJSON("static/questions.json", function(json) {
  // populate form
  questions = json;
  questions.index = questions.map(function (item) { return item.id });
  questions.answers = {};
  questions.index.map(function (id) {
    questions.answers[id] = { "A" : [], "B" : [], "C" : [], "D" : [] };
  });

  data = { "questions" : questions }

  //var template = Handlebars.compile(source);
  var template = Handlebars.templates.teacher;
  $("body").append(template(data));
  update_question();

  var next_slide = function () {
    if (current_question + 1 == questions.index.length) {
      return;
    }

    current_question++;
    update_question();
    socket.emit('add_question', { "index" : current_question });
  };

  var previous_slide = function () {
    if (current_question == 0) {
      return;
    }
    current_question--;
    update_question();
    socket.emit('add_question', { "index" : current_question });

  };

  $("#advance").on("click", next_slide);
  $("#previous").on("click", previous_slide);

  Mousetrap.bind('right', next_slide);
  Mousetrap.bind('left', previous_slide);

});
