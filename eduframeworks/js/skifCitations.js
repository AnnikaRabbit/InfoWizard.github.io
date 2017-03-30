$(document).ready(function() {

  var citations = [];
  citations.push(
"Brown, A. L. & Campione, J. C. (1990). Communities of learning and thinking, or A context by any other name. Contributions to Human Development, 21, 108-126.",
"Bjork, R. A. (1994). Memory and metamemory considerations in the training of human beings.",
"Burbules, N. C. & Linn, M. C. (1991). Science education and the philosophy of science: Congruence or contradiction? International Journal of Science Education, 13(3), 227-241.",
"Dewey, J. (1901). Psychology and social practice, (Contributions to education). Chicago, IL: University of Chicago Press.",
"Dewey, J. (1929). The sources of a science of education*. New York: Horace Liveright.",
"Duschl, R. A. (1990). Restructuring science education: The importance of theories and their **development*. New York: Teacher’s College Press.",
"Lave, J. & Wenger, E. (1991). *Situated learning: Legitimate peripheral participation*. Cambridge, MA: Cambridge University Press.",
"Linn, M. C. (1992). The computer as learning partner: Can computer tools teach science? In Sheingold, K., Roberts, L. G., & Malcolm, S. M. (Eds.), This year in school science 1991: Technology for teaching and learning. Washington, DC: American Association for the Advancement of Science.",
"Linn, M. C. (1995). Designing computer learning environments for engineering and computer science: The scaffolded knowledge integration framework. Journal of Science Education and technology, 4(2), 103-126.",
"Linn, M. C., Davis, E. A., & Eylon, B. S. (2004). The scaffolded knowledge integration framework for instruction. *Internet environments for science education, 47-72.",
"Linn, M. C., diSessa, A., Pea, R. D., & Songer, N. B. (1994). Can research on science learning and instruction inform standards for science education? Journal of Science Education and Technology, 3(1), 7-15.",
"Linn, M. C., & Hsi, S. (2000). Computers, teachers, peers: Science learning partners. Routledge.",
"Madhok, J. J. (1992 April 4 & 5). Group size and gender composition influences on discussion. In 1992 Berkeley Women and Language Conference: Locating Power. Berkeley, CA: University of California.",
"Newman, D., Griffin, P., & Cole, M. (1989). The construction zone: Working for cognitive change in school. London: Cambridge University Press.",
"Pea, R. D. (1992). Augmenting the discourse of learning with computer-based learning environments. In De Corte, E., Linn, M. C., Mandl, H., & Verschaffel, L. (Eds.), Computer-based learning environments and problem solving. Berlin: Springer-Verlag.",
"Quintana, C. (2006). Learner-centered design: Reflections on the past and directions for the future.",
"Raizen, S. A. (1991). The reform of science education in the U.S.A. déjá vu or de novo? Studies in Science Education, 19, 1-41.",
"Scardamalia, M. & Bereiter, C. (1993). Technologies for knowledge-building discourse. Communications of the ACM, 36(5), 37-41.",
"Vygotsky, L. S. (1978). *Mind in society: The development of higher psychological processes (Cole, M., et al., Series Eds.). Cambridge, MA: Harvard University Press."
);

  $(".citation").hover(function() {
    //console.log(this.dataset.article);
    $(this).find(".tooltipCite").html(citations[this.dataset.article - 1]);
  });

});
