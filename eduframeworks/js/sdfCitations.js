$(document).ready(function() {

  var citations = [];
  citations.push(
"Chi, M., & Bassok, M. (1989). Learning from examples via self-explanations. In L. B. Resnick (Ed.), Knowing, learning, and instruction: Essays in honor of Robert Glaser (pp. 251–282).",
"Cohen, E. G. (1994). Restructuring the classroom: Conditions for productive small groups. Review of Educational Research, 64, 1–35.",
"Collins, A., & Brown, J. S. (1988). The computer as a tool for learning through reflection. In H. Mandl & A. M. Lesgold (Eds.), Learning issues for intelligent tutoring systems (pp. 1–18). Chicago: Springer-Verlag.",
"Collins, A., Brown, J. S., & Newman, S. E. (1989a). Cognitive apprenticeship: Teaching the craft of reading, writing, and mathematics. In L. B. Resnick (Ed.), Cognition and instruction: Issues and agendas (pp. 453–494).",
"Davis, E. A., & Linn, M. C. (2000). Scaffolding students’ knowledge integration: Prompts for reflection in KIE. International Journal of Science Education, 22, 819–837.",
"Davis, M., Hawley, P., McMullan, B., & Spilka, G. (1997). Design as a catalyst for learning. Alexandria, VA: Association for Supervision and Curriculum Development.",
"Edelson, D. C., Gordin, D., & Pea, R. (1999). Addressing the challenges of inquiry-based learning through technology and curriculum design. The Journal of the Learning Sciences, 8, 391–450.",
"Krajcik, J., Blumenfeld, P., Marx, R., Bass, K. M., Fredericks, J., & Soloway, E. (1998). Middle school students’ initial attempts at inquiry in project-based science classrooms. The Journal of the Learning Sciences, 7, 313–350.",
"Lan, W. (1996). The effects of self-monitoring on students’ course performance, use of learning strategies, attitude, self-judgment ability, and knowledge representation. Journal of Experimental Education, 64, 101–115.",
"Linn, M. C., & Songer, N. B. (1991). Teaching thermodynamics to middle school students: What are appropriate cognitive demands? Journal of Research in Science Teaching, 28, 885–918.",
"Loh, B., Reiser, B. J., Radinsky, J., Edelson, D. C., Gomez, L. M., & Marshall, S. (2001). Developing reflective inquiry practices: A case study of software, the teacher, and students. In K. Crowley, C. D. Schunn, & T. Okada (Eds.), Designing for science: Implications from everyday, classroom, and professional settings (pp. 279–323).",
"Merrill, D. C., Reiser, B. J., Ranney, M., & Trafton, J. G. (1992). Effective tutoring techniques: A comparison of human tutors and intelligent tutoring systems. The Journal of the Learning Sciences, 2, 277–306.",
"National Research Council. (1996). National science education standards. Washington, DC: Author.",
"Palincsar, A. S., & Brown, A. L. (1984). Reciprocal teaching of comprehension-fostering and comprehension-monitoring activities. Cognition and Instruction, 1, 117–175.",
"Quintana, C., Eng, J., Carra, A., Wu, H., & Soloway, E. (1999). Symphony: A case study in extending learner-centered design through process-space analysis. Proceedings of CHI 99 Conference on Human Factors in Computing Systems (pp. 473–480).",
"Quintana, C., Reiser, B. J., Davis, E. A., Krajcik, J., Fretz, E., Duncan, R. G., & Soloway, E. (2004). A scaffolding design framework for software to support science inquiry. The journal of the learning sciences, 13(3), 337-386.",
"Reiser, B. J., Tabak, I., Sandoval, W. A., Smith, B. K., Steinmuller, F., & Leone, A. J. (2001). BGuILE: Strategic and conceptual scaffolds for scientific inquiry in biology classrooms.",
"Sandoval, W. A. (2003). Students’ understanding of causal explanation and natural selection in a technology-supported inquiry curriculum. The Journal of the Learning Sciences, 12, 5–51.",
"Scardamalia, M., & Bereiter, C. (1991). Higher levels of agency for children in knowledge building: A challenge for the design of new knowledge media. The Journal of the Learning Sciences, 1, 37–68.",
"Schauble, L., Glaser, R., Duschl, R., Schulze, S., & John, J. (1995). Students’ understanding of the objectives and procedures of experimentation in the science classroom. The Journal of the Learning Sciences, 4, 131–166.",
"Schauble, L., Glaser, R., Raghavan, K., & Reiner, M. (1991). Causal models and experimentation strategies in scientific reasoning. The Journal of the Learning Sciences, 1, 201–238.",
"Schauble, L., Klopfer, L., & Raghavan, K. (1991). Students’ transition from an engineering model to a science model of experimentation. Journal of Research in Science Teaching, 28, 859–882.",
"Tien, L., Rickey, D., & Stacy, A. (1999). The MORE cycle: Guiding students’ thinking in the laboratory. Journal of College Science Teaching, 18(5), 318–324.",
"Toulmin, S. E. (1964). The uses of argument. Cambridge, England: Cambridge University Press. (Original work published 1958)",
"van Zee, E., & Minstrell, J. (1997). Reflective discourse: Developing shared understandings in a physics classroom. International Journal of Science Education, 19, 209–228.",
"Webb, N. M. (1983). Predicting learning from student interaction: Defining the interaction variables. Educational Psychologist, 18, 33–41.",
"White, B., & Frederiksen, J. (1998). Inquiry, modeling, and metacognition: Making science accessible to all students. Cognition and Instruction, 16, 3–118."
);

  $(".citation").hover(function() {
    //console.log(this.dataset.article);
    $(this).find(".tooltipCite").html(citations[this.dataset.article - 1]);
  });

});
