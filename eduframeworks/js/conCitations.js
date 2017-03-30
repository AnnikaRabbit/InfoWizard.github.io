$(document).ready(function() {

  var citations = [];
  citations.push(
"Khoo, E. G., & Bonk, C. J. (2014). Adding some TEC-VARIETY: 100+ activities for motivating and retaining learners online. Open World Books.",
"Papert, S., & Harel, I. (1991). Situating constructionism. Constructionism, 36(2), 1-11.",
"Resnick, M., & Ocko, S. (1990). LEGO/logo--learning through and about design. Cambridge, MA: Epistemology and Learning Group, MIT Media Laboratory."
);

  $(".citation").hover(function() {
    //console.log(this.dataset.article);
    $(this).find(".tooltipCite").html(citations[this.dataset.article - 1]);
  });

});
