function Article(title, image, link, content, featured) {
    this.title = title;
    this.image = image;
    this.link = link;
    this.content = content;
    this.featured = featured;
}

Article.prototype.getTitle = function() {
    return this.title
};
Article.prototype.getImage = function() {
    return this.image
};
Article.prototype.getLink = function() {
    return this.link
};
Article.prototype.getContent = function() {
    return this.content
};
Article.prototype.getFeatured = function() {
    return this.featured
};

Article.prototype.getInfo = function() {
    return [this.title, this.image, this.link, this.content, this.featured];
};

var projectItems = [];

projectItems.push(new Article("Hearthstone \“Geek out\” fansite",
    "images/geekout.png",
    "https://nicholaspersa.github.io/geekout/",
    "As a avid player of Hearthstone, I took on a design challenge related to the game. The site is a brief introduction to the game and acted as practice for vector-based assets. I made all of the artwork using Sketch (except the wood pattern).",
    true));

projectItems.push(new Article("Designing Curriculum Primer",
    "images/eduFrameworks.png",
    "https://nicholaspersa.github.io/eduframeworks/",
    "A small web project focused on displaying content about designing curriculum. The project functions as a primer and reference document for those who design educational experiences.",
    true));

projectItems.push(new Article("Photography & Poetry: \"The Beacon\"",
    "images/beacon.png",
    "https://nicholaspersa.github.io/archive/",
    "A photography project that documents the location of one building from a variety of perspectives in Minnesota. I have lived near this building a majority of my life, and I can't seem to escape its view. It felt proper to give it one more perspective to be seen from.",
    true));

projectItems.push(new Article("File Visualizer",
    "images/tldr.png",
    "http://nicholaspersa.github.io/tldrarchive",
    "",
    false));

projectItems.push(new Article("Bucket Run",
    "images/bucketRun.png",
    "http://nicholaspersa.github.io/bucketrun",
    "",
    false));
projectItems.push(new Article("Experimental Web II",
    "images/clickVenture.png",
    "http://nicholaspersa.github.io/singleServe",
    "",
    false));
projectItems.push(new Article("Experimental Web I",
    "images/classExp.png",
    "http://nicholaspersa.github.io/classExp",
    "",
    false));

projectItems.push(new Article("Pokemon Go Fansite",
    "images/gogreet.png",
    "http://nicholaspersa.github.io/gogreet",
    "",
    false));

projectItems.push(new Article("Lucca Website Rework",
    "images/lucca.png",
    "http://nicholaspersa.github.io/lucca",
    "",
    false));
projectItems.push(new Article("Theory and Theorist",
    "images/theoryAnd.png",
    "http://nicholaspersa.github.io/theory",
    "",
    false));
projectItems.push(new Article("Theory Stories",
    "images/story.png",
    "http://nicholaspersa.github.io/story",
    "",
    false));
