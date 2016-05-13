(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['questions'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing;

  return "  <div class=\"card\" id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.id : stack1), depth0))
    + ">\n    <label>\n      "
    + alias2((helpers.questionID || (depth0 && depth0.questionID) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.id : stack1),{"name":"questionID","hash":{},"data":data}))
    + "\n    </label>\n    <div class=\"result\">Correct</div>\n\n    <div class=\"question\">\n      "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.text : stack1), depth0))
    + "\n    </div>\n    <ul id=\"answers_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" class=\"answers\">\n      "
    + alias2((helpers.answerMarkup || (depth0 && depth0.answerMarkup) || alias4).call(alias3,(depth0 != null ? depth0.question : depth0),{"name":"answerMarkup","hash":{"slot":"A"},"data":data}))
    + "\n      "
    + alias2((helpers.answerMarkup || (depth0 && depth0.answerMarkup) || alias4).call(alias3,(depth0 != null ? depth0.question : depth0),{"name":"answerMarkup","hash":{"slot":"B"},"data":data}))
    + "\n      "
    + alias2((helpers.answerMarkup || (depth0 && depth0.answerMarkup) || alias4).call(alias3,(depth0 != null ? depth0.question : depth0),{"name":"answerMarkup","hash":{"slot":"C"},"data":data}))
    + "\n      "
    + alias2((helpers.answerMarkup || (depth0 && depth0.answerMarkup) || alias4).call(alias3,(depth0 != null ? depth0.question : depth0),{"name":"answerMarkup","hash":{"slot":"D"},"data":data}))
    + "\n    </ul>\n  </div>\n";
},"useData":true});
templates['teacher'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <li id=\"list_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " <span id=\"score_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"container\">\n\n<div class=\"row\">\n    <div class=\"three columns\">\n        <ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.questions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n\n    <div class=\"nine columns\">\n        <button id=\"previous\" class=\"button-primary\">« Previous</button>\n        <button id=\"advance\" class=\"button-primary\">Next »</button>\n\n        <div id=\"teacher_question\">\n        </div>\n\n        <div>\n            <span id=\"score\">?/?</span> correct\n        </div>\n    </div>\n</div>\n\n</div>\n";
},"useData":true});
templates['teacher_question'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing;

  return "  <div class=\"teacher_question\">\n    <label>\n      "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.id : stack1), depth0))
    + "\n    </label>\n\n    <div class=\"question\">\n      "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.text : stack1), depth0))
    + "\n    </div>\n    <ul id=\"answers_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" class=\"answers\">\n      "
    + alias2((helpers.answerMarkup || (depth0 && depth0.answerMarkup) || alias4).call(alias3,(depth0 != null ? depth0.question : depth0),{"name":"answerMarkup","hash":{"slot":"A"},"data":data}))
    + "\n      "
    + alias2((helpers.answerMarkup || (depth0 && depth0.answerMarkup) || alias4).call(alias3,(depth0 != null ? depth0.question : depth0),{"name":"answerMarkup","hash":{"slot":"B"},"data":data}))
    + "\n      "
    + alias2((helpers.answerMarkup || (depth0 && depth0.answerMarkup) || alias4).call(alias3,(depth0 != null ? depth0.question : depth0),{"name":"answerMarkup","hash":{"slot":"C"},"data":data}))
    + "\n      "
    + alias2((helpers.answerMarkup || (depth0 && depth0.answerMarkup) || alias4).call(alias3,(depth0 != null ? depth0.question : depth0),{"name":"answerMarkup","hash":{"slot":"D"},"data":data}))
    + "\n    </ul>\n  </div>\n";
},"useData":true});
})();