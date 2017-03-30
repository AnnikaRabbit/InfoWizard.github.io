$(document).ready(function() {

  var citations = [];
  citations.push("Anderson, J.R. (1983). The architecture of cognition. Cambridge, MA: Harvard University Press.",
  "Berlyne, D.E. (1966). Curiosity and exploration Science 153, 25-33.",
  "Chi, M.T.H., Peltovich, P.J., & Glaser, R. (1981). Categorization and representation of physics problems by experts and novices. Cognitive Science, 5, 121-152.",
  "Edelson, D. C. (2001). Learning‐for‐use: A framework for the design of technology‐supported inquiry activities. Journal of Research in Science Teaching, 38(3), 355-385.",
  "Glaser, R. (1992). Expert knowledge and process of thinking. In D. F. Halpern (Ed.), Enhancing thinking skills in the sciences and mathematics. Hillsdale, NJ: Erlbaum",
  "Kolodner, J.L. (1993). Case-based reasonin. San Mateo, CA: Morgan Kaufmann.",
  "Schank, R.C. (1982). Dynamic memory. Cambridge: Cambridge University Press.",
  "Simon, H.A. (1980). Problem solving and educaton. In D.T. Tuma & R. Reif (Eds.), Problem, solving and education: Issues in teaching and research (pp. 81-96). Hillsdale, NJ: Erlbaum.",
  "Whitehead, A.H. (1929). The aims of education. Cambridge: Cambridge University Press."
);

  $(".citation").hover(function() {
    //console.log(this.dataset.article);
    $(this).find(".tooltipCite").html(citations[this.dataset.article - 1]);
  });

});
