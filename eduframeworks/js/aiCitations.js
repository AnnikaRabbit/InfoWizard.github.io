$(document).ready(function() {

  var citations = [];
  citations.push(
"Cognition and Technology Group at Vanderbilt. (1992). The Jasper series as an example of anchored instruction: Theory, program description, and assessment data. Educational Psychologist, 27(3), 291-315.",
"Cognition and Technology Group at Vanderbilt (1993). Anchored instruction and situated cognition revisted. Educational Technology, 33 (3), 52- 70."

);

  $(".citation").hover(function() {
    //console.log(this.dataset.article);
    $(this).find(".tooltipCite").html(citations[this.dataset.article - 1]);
  });

});
