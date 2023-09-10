/*
  Quick quiz bootstrap extension
*/


;(function($) {

// keep track of number of quizes added to page
var quiz_count = 0;

// add jQuery selection method to create
// quiz structure from question json file
// "filename" can be path to question json
// or javascript object
$.fn.quiz = function(filename) {
  if (typeof filename === "string") {
    $.getJSON(filename, render.bind(this));
  } else {
    render.call(this, filename);
  }
};

// create html structure for quiz
// using loaded questions json
function render(quiz_opts) {  


  // list of questions to insert into quiz
  var questions = quiz_opts.questions;
  questions = shuffle(questions);
  var siklar = [];
  var cevaplar = ["A - ", "B - ", "C - ", "D - ", "E - ", "F - ", "G - "];

  // keep track of the state of correct
  // answers to the quiz so far
  var state = {
    correct : 0,
    maxQ : 10,
    total : questions.length
  };

  var $quiz = $(this)
    .attr("class", "carousel slide")
    .attr("data-ride", "carousel");

  // unique ID for container to refer to in carousel
  var name = $quiz.attr("id") || "urban_quiz_" + (++quiz_count);

  $quiz.attr('id', name);

  var height = $quiz.height();


  /*
    Add carousel indicators
  */


  /*
    Slides container div
  */
  var $slides = $("<div>")
    .attr("class", "carousel-inner")
    .attr("role", "listbox")
    .appendTo($quiz);

  /*
    Create title slide
  */
  var  $indicators = $('<ol>')
  .attr('class', 'progress-circles');

  $indicators
  .appendTo($quiz);

  var $title_slide = $("<div>")
    .attr("class", "item active")
    .attr("height", height + "px")
    .appendTo($slides);

  $('<h1>')
    .text(quiz_opts.title)
    .attr('class', 'quiz-title')
    .appendTo($title_slide);

  $('<h3>')
    .text( "Toplam Soru Sayısı : " + quiz_opts.questions.length)
    .attr('class', 'text-center')
    .appendTo($title_slide);

  var $start_button = $("<div>")
    .attr("class", "quiz-results")
    .attr("style", "text-align: center;")
    .appendTo($title_slide);

  $("<button>")
    .attr('class', 'btn btn-primary')
    .attr('style', 'text-align: center;')
    .text("Sınavı Başlat")
    .click(function() {
      
      $quiz.carousel('next');
      $indicators.addClass('show');

    $(".active .quiz-button.btn").each(function(){
      console.log(this.getBoundingClientRect())
      $(this).css("margin-left", function(){
        return ((250 - this.getBoundingClientRect().width) *0.5) + "px"
      })
    })



    })
    .appendTo($start_button);



  $.each(questions, function(question_index, question) {
    if (question_index < state.maxQ) {
      $('<li>')
      .attr('class', question_index ? "" : "dark")
      .appendTo($indicators);
    }
  });

  /*
    Add all question slides
  */
  $.each(questions, function(question_index, question) {

    var last_question = (question_index + 1 === state.total);

    var $item = $("<div>")
      .attr("class", "item")
      .attr("height", height + "px")
      .appendTo($slides);
    var $img_div;
    if (question.image != "") {
      $img_div = $('<div>')
        .attr('class', 'question-image')
        .appendTo($item);
      $("<img>")
        .attr("class", "img-responsive")
        .attr("src", question.image)
        .appendTo($img_div);
      $('<p>')
        .text(question.image_credit)
        .attr("class", "image-credit")
        .appendTo($img_div);
    }
    $("<div>")
      .attr("class", "quiz-question text-justify")
      .html(question.questiontext)
      .appendTo($item);

    var $answers = $("<div>")
      .attr("class", "quiz-answers w-100")
      .appendTo($item);


    //question.answers = shuffle(question.answers);
    // 4 yanlış al 
    question.w_ans = shuffle(question.w_ans);
    
    siklar = [];
    $.each(question.w_ans.slice(0,4), function(i, ans){
      if (i < 4) {
        siklar.push(ans);
      }
    });

    question.c_ans = shuffle(question.c_ans);
    siklar.push(question.c_ans[0]);
    siklar = shuffle(siklar);

    


    // for each possible answer to the question
    // add a button with a click event
    $.each(siklar, function(answer_index, answer) {

      // create an answer button div
      // and add to the answer container
      var ans_btn = $("<div>")
        .attr('class', 'btn btn-light btn-block text-justify w-100 border-bottom')
        .attr('style', 'white-space:normal;display:inline-flex;margin-bottom: 20px')
        .html(answer)
        .appendTo($answers);

      // This question is correct if it's
      // index is the correct index
      var correct = (question.c_ans[0] === siklar[answer_index]);

      // default opts for both outcomes
      var opts = {
        allowOutsideClick : false,
        allowEscapeKey : false,
        confirmButtonText: "Sıradaki soru",
        html : true,
        confirmButtonColor: "#0096D2"
      };

      // set options for correct/incorrect
      // answer dialogue
      if (correct) {
        opts = $.extend(opts, {
          title: "Doğru",
          text: "Cevap doğru",
          type: "success"
        });
      } else {
        opts = $.extend(opts, {
          title: "Yanlış",
          text: (
            "Doğru cevap: \"" + "<br/><br/>" + question.c_ans[0] +
            (question.aciklama != "" ? + ("<div class=\"correct-text\">" +
            question.aciklama+
            "</div>") : "")             
            ),
          type: "error"
        });
      }

      if (last_question) {
        opts.confirmButtonText = "Sonuçlarını gör";
      }

      // bind click event to answer button,
      // using specified sweet alert options
      ans_btn.on('click', function() {

        function next() {
          // if correct answer is selected,
          // keep track in total
          if (correct) state.correct++;
          $quiz.carousel('next');

          // if we've reached the final question
          // set the results text
          if (last_question) {
            $results_title.html(resultsText(state));
            $results_ratio.text(
              "Soruların " +
              Math.round(100*(state.correct/state.total)) +
              "% kadarını doğru cevapladın"
            );          
            $indicators.removeClass('show');
            // indicate the question number
            $indicators.find('li')
              .removeClass('dark')
              .eq(0)
              .addClass('dark');
          } else {
            // indicate the question number
            $indicators.find('li')
              .removeClass('dark')
              .eq(question_index+1)
              .addClass('dark');
          }
          // unbind event handler
          $('.sweet-overlay').off('click', next);
        }

        // advance to next question on OK click or
        // click of overlay
        swal(opts, next);
        $('.sweet-overlay').on('click', next);

      });

    });


  });


  // final results slide
  var $results_slide = $("<div>")
    .attr("class", "item")
    .attr("height", height + "px")
    .appendTo($slides);

  var $results_title = $('<h1>')
    .attr('class', 'quiz-title')
    .appendTo($results_slide);

  var $results_ratio = $('<div>')
    .attr('class', 'results-ratio')
    .appendTo($results_slide);

  var $restart_button = $("<div>")
    .attr("class", "quiz-results")
    .attr("style", "text-align: center;")
    .appendTo($results_slide);
 

  $("<button>")
    .attr('class', 'btn btn-primary')
    .text("Tekrar Başlat")
    .click(function() {
      const myNode = document.getElementById("quiz");
      myNode.textContent = '';
    })
    .appendTo($restart_button);

  $quiz.carousel({
    "interval" : false
  });

  $(window).on('resize', function() {
    $quiz.find(".item")
      .attr('height', $quiz.height() + "px");
  });

}

function resultsText(state) {

  var ratio = state.correct / state.total;
  var text = "Sınav bitti";

  
  return text;

}

function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
  }
  return sourceArray;
}


})(jQuery);

