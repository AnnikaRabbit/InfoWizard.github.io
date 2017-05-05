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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    true));

projectItems.push(new Article("Hearthstone \“Geek out\” fansite",
    "images/geekout.png",
    "https://nicholaspersa.github.io/geekout/",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    true));

projectItems.push(new Article("Pokemon Go Fansite",
    "images/gogreet.png",
    "http://nicholaspersa.github.io/gogreet",
    "",
    false));

projectItems.push(new Article("File Visualizer",
    "images/tldr.png",
    "http://nicholaspersa.github.io/tldrarchive",
    "",
    false));

projectItems.push(new Article("Photography & Poetry",
    "images/beacon.png",
    "http://nicholaspersa.github.io/archive",
    "",
    false));
