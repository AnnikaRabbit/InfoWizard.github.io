$(document).ready(function() {

  var citations = [];
  citations.push(
"Beyer, H., &amp; Holtzblatt, K., (1998). Contextual design: defining customer-centered systems, Morgan Kaufmann Publishers Inc., San Francisco, CA.",
"Druin, A. (1999, May). Cooperative inquiry: developing new technologies for children with children. In Proceedings of the SIGCHI conference on Human Factors in Computing Systems (pp. 592-599). ACM.",
"Greenbaum, J., & Kyng, M. (Eds.), (1991). Design at work: Cooperative design of computer systems.",
"Lave, J. (1992).Cognition in practice. Cambridge:Cambridge University Press."
);

  $(".citation").hover(function() {
    //console.log(this.dataset.article);
    $(this).find(".tooltipCite").html(citations[this.dataset.article - 1]);
  });

});
