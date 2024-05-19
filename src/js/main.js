import $ from "jquery";

$(document).ready(function () {
  $(".accordian_main").click(function () {
    var answerId = $(this).attr("id");
    var $question = $(".que" + answerId);
    var $answer = $(".ans" + answerId);
    $answer.slideUp();
    if ($question.hasClass("open")) {
      // If already open, remove 'open' class and hide answer
      $question.removeClass("open").next($answer).slideUp();
      // If it is not open...
    } else {
      // Remove 'open' class from all other questions
      $question.removeClass("open");
      // Open this answer and add 'open' class
      $question.addClass("open").next($answer).slideDown();
    }
  });
});
