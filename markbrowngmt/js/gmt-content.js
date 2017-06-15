
	function Article (title, section, youtube, favorite, tileDescription, tileImage, content, images, captions){
		this.title = title;
    this.section = section;
		this.youtube = youtube;
		this.favorite = favorite;
		this.tileDescription = tileDescription;
    this.tileImage = tileImage;
    this.content = content;
    this.images = images;
    this.captions = captions;
	}

	Article.prototype.getTitle = function (){
		return this.title
	};
  Article.prototype.getSection = function (){
		return this.section
	};
	Article.prototype.getYoutube = function (){
		return this.youtube
	};
	Article.prototype.getFavorite = function (){
		return this.favorite
	};
	Article.prototype.getTileDescription = function (){
		return this.tileDescription
	};
  Article.prototype.getTileImage = function (){
		return this.tileImage
	};
  Article.prototype.getContent = function (){
    return this.content
  };
  Article.prototype.getImages = function (){
    return this.images
  };
  Article.prototype.getCaptions = function (){
    return this.captions
  };
	Article.prototype.getInfo = function (){
		return [this.title, this.section, this.youtube, this.favorite, this.tileDescription, this.tileImage, this.content, this.images, this.captions];
	};

	var articleItems = [];

  //DESIGN CONCEPT///////////////////////////////////////////////////////////////////////
  articleItems.push(new Article(
    "Spatial Awareness",//title
    "Design Concept",//section
    "https://youtu.be/KEVJXqV7XMc?t=7m31s",//youtube
    "false",//favorite
    "The map in the mind",//tileDescription
    "assets/section/design-concept/spatial-awareness/img1.png",//tileImage
    ["Follow the path styles might sound pleasing: avoid trudging through old rooms, avoid getting lost, and be assisted through backtracking. If all rooms and keys are needed to progress, what good is choice anyway? However, find the path styles challenge the naught tested ability of spatial awareness. To succeed in finding the path, a player will need to cognitively make a map. Which can mean remembering layouts, item locations, locked doors, or currently unassailable barriers.",
    "As long as the mental map is the right amount of cognitive workload, the player can consult their brain as they progress or cause changes in the dungeon. This helps a player make intentional choices and feel the reward of that choice—that is a magical moment. Some modern designers only see dungeons as places to host the challenges, but the dungeon itself can be a challenge."],//content
    ["assets/section/design-concept/spatial-awareness/img1.png"],//images reverse ordered due to after append sequence
    ["A mental map of a dungeon and important details"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Simple Layout",//title
    "Design Concept",//section
    "https://youtu.be/BTsgWepH3GY?t=1m",//youtube
    "false",//favorite
    "Laying out the possible",//tileDescription
    "assets/section/design-concept/simple-layout/img1.png",//tileImage
    ["Simple layouts separate the dungeon into isolated chunks each with their own unique challenges. Once an area has been completed, they player can safely move on to the next part of the level. This type of level design helps lower the cognitive demand required, allowing seamless navigation and sense making in order to reach the end goal of the dungeon.",
    "The dungeons in Twilight Princess use a simple linear pattern. As you traverse the dungeon, you return to the central room as you progress through the level. Since there are other things to pay attention to—atmospheres, boss fights, and engaging moments—there is not a focus on the simple layout. This means that there is a flat structure to the dungeon complexity, and there is not a progression of understanding."],//content
    ["assets/section/design-concept/simple-layout/img4.png",
    "assets/section/design-concept/simple-layout/img3.png",
    "assets/section/design-concept/simple-layout/img2.png",
    "assets/section/design-concept/simple-layout/img1.png"],//images reverse ordered due to after append sequence
    ["Arbiter's Grounds",
    "Ruins & Palace",
    "Lakebed Temple",
    "Forest Temple"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Looping",//title
    "Design Concept",//section
    "https://youtu.be/KEVJXqV7XMc?t=11m31s",//youtube
    "false",//favorite
    "Walking in circles",//tileDescription
    "assets/section/design-concept/looping/img1.png",//tileImage
    ["Rather than use a pure backtrack mechanic, looping allows the emphasis to be on making choices in navigating a dungeon over the cognitive excitement to experience past content. Looping can be implemented as assisted backtracking—dropping the player exactly where they need to be. Or, it can use a familiar part of the dungeon to reorient a player in where they still need to explore or use a newly acquired item."],//content
    ["assets/section/design-concept/looping/img3.png",
    "assets/section/design-concept/looping/img2.png",
    "assets/section/design-concept/looping/img1.png"],//images reverse ordered due to after append sequence
    ["Partial backtracking: the player is given access back a central room for reorientation",
    "Assisted backtracking: after getting the item, the player uses it immediately to cross the lava pit",
    "Assisted backtracking: after getting the key, the player returns to the dungeon entrance quickly"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Illusion of Complexity",//title
    "Design Concept",//section
    "https://youtu.be/BTsgWepH3GY?t=3m9s",//youtube
    "false",//favorite
    "Hidding linear pathways",//tileDescription
    "assets/section/design-concept/illusions-of-complexity/img1.png",//tileImage
    ["Doubleing-back to a central part of a map helps reduce the feel on a straightforward level design. The knot-like structure gives a sense of solving a puzzle and “unpicking the knot” of the dungeon."],//content
    ["assets/section/design-concept/illusions-of-complexity/img2.png",
    "assets/section/design-concept/illusions-of-complexity/img1.png"],//images reverse ordered due to after append sequence
    ["Hidden linear pathway",
    "Knotted level"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Follow the Path",//title
    "Design Concept",//section
    "https://youtu.be/KEVJXqV7XMc?t=6m14s",//youtube
    "false",//favorite
    "Simon says",//tileDescription
    "assets/section/design-concept/follow-the-path/img1.png",//tileImage
    ["This style of dungeon has little branching, constrained choice, and assisted backtracking. Here, the route is obvious and little exploration is required."],//content
    ["assets/section/design-concept/follow-the-path/img1.png"],//images reverse ordered due to after append sequence
    ["Obvious routes to follow"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Find the Path",//title
    "Design Concept",//section
    "https://youtu.be/KEVJXqV7XMc?t=5m58s",//youtube
    "false",//favorite
    "Untying the knot",//tileDescription
    "assets/section/design-concept/find-the-path/img1.png",//tileImage
    ["This style of dungeon has lots of branching, choice in pathways, and unassisted backtracking. The player needs to hunt down the right route to reach the end goal."],//content
    ["assets/section/design-concept/find-the-path/img1.png"],//images reverse ordered due to after append sequence
    ["Journey into the unknown"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Choice in Sequence",//title
    "Design Concept",//section
    "https://youtu.be/KEVJXqV7XMc?t=4m4s",//youtube
    "false",//favorite
    "How free are you?",//tileDescription
    "assets/section/design-concept/choice-in-sequence/img1.png",//tileImage
    ["A player can choose from multiple and valid branching pathways. There may be any number of sequences a player can use to reach the end goal, and not following a particular path. However, the path forward may also be linear in that every chunk in a dungeon must be completed, but their ordering is flexible.",
    "For example, a room full of diggable mud requires the dungeon's key item. While the player can discover this mud room by exploration, they will need to find the key item in order to progress (i.e., the Mole Mitts). The lack of choice would have made it so that the player naturally obtained the mitts before entering this key item room."],//content
    ["assets/section/design-concept/choice-in-sequence/img3.png",
    "assets/section/design-concept/choice-in-sequence/img2.png",
    "assets/section/design-concept/choice-in-sequence/img1.png"],//images reverse ordered due to after append sequence
    ["Choices to make",
    "A room full of mud",
    "Obtaining a key item"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Branching Pathways",//title
    "Design Concept",//section
    "https://youtu.be/KEVJXqV7XMc?t=3m24s",//youtube
    "false",//favorite
    "High road and low road",//tileDescription
    "assets/section/design-concept/branching-pathways/img1.png",//tileImage
    ["Pathways fork where the player needs to choose which direction to go. This is not necessarily about giving a player a choice in the sequence of events, but enables exploration to find the correct path and means that backtracking will occur."],//content
    ["assets/section/design-concept/branching-pathways/img2.png",
    "assets/section/design-concept/branching-pathways/img1.png"],//images reverse ordered due to after append sequence
    ["Possible pathways",
    "After a correct path is found, the player returns to the main branch"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Backtracking",//title
    "Design Concept",//section
    "https://youtu.be/KEVJXqV7XMc?t=4m43s",//youtube
    "false",//favorite
    "Returning from whence you came",//tileDescription
    "assets/section/design-concept/backtracking/img1.png",//tileImage
    ["This concept relies on branching pathways, where the player needs an item at the end of one pathway in order to progress through the other branches. The extent of the backtracking can vary, as briefly illustrated by the Mole Mitts example in Choice of Sequence."],//content
    ["assets/section/design-concept/backtracking/img1.png"],//images reverse ordered due to after append sequence
    ["Going back"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Auto Backtracking",//title
    "Design Concept",//section
    "https://youtu.be/KEVJXqV7XMc?t=5m25s",//youtube
    "false",//favorite
    "The helping hand",//tileDescription
    "assets/section/design-concept/auto-backtracking/img1.png",//tileImage
    ["Once an item has been obtained from a path, does the player need to navigate to the necessary location? Or once obtained, is the player lead/directed to where they need to use the item? The latter is a design cheat, where backtracking exists but is largely reduced by the level design.",
    "For example, once the Mole Mitts have been obtained, the player needs to still figure out where to use them. However, once the Roc's Cape has been obtained, the entrance the player entered from is now blocked and a new pathway is revealed. This new path takes the player right to where they will use the cape."],//content
    ["assets/section/design-concept/auto-backtracking/img3.png",
    "assets/section/design-concept/auto-backtracking/img2.png",
    "assets/section/design-concept/auto-backtracking/img1.png"],//images reverse ordered due to after append sequence
    ["Convenient that the cape was right here, eh?",
    "The player will still need to navigate to the right room",
    "Backtracking assistance"]//captions reverse ordered due to after append sequence
  ));

  //GRAPHING///////////////////////////////////////////////////////////////////////
  articleItems.push(new Article(
    "Palace of Winds",//title
    "Graphing",//section
    "",//youtube
    "false",//favorite
    "",//tileDescription
    "assets/section/graphing/palace-of-winds/img1.png",//tileImage
    [""],//content
    ["assets/section/graphing/palace-of-winds/img1.png"],//images reverse ordered due to after append sequence
    ["Palace of Winds"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Fortress of Winds",//title
    "Graphing",//section
    "",//youtube
    "false",//favorite
    "",//tileDescription
    "assets/section/graphing/fortress-of-winds/img1.png",//tileImage
    [""],//content
    ["assets/section/graphing/fortress-of-winds/img1.png"],//images reverse ordered due to after append sequence
    ["Fortress of Winds"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Deepwood Shrine",//title
    "Graphing",//section
    "",//youtube
    "false",//favorite
    "",//tileDescription
    "assets/section/graphing/deepwood-shrine/img1.png",//tileImage
    [""],//content
    ["assets/section/graphing/deepwood-shrine/img1.png"],//images reverse ordered due to after append sequence
    ["Deepwood Shrine"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Dark Hyrule Castle",//title
    "Graphing",//section
    "",//youtube
    "false",//favorite
    "",//tileDescription
    "assets/section/graphing/dark-hyrule-castle/img1.png",//tileImage
    [""],//content
    ["assets/section/graphing/dark-hyrule-castle/img1.png"],//images reverse ordered due to after append sequence
    ["Dark Hyrule Castle"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Cave of Flames",//title
    "Graphing",//section
    "",//youtube
    "false",//favorite
    "",//tileDescription
    "assets/section/graphing/cave-of-flames/img1.png",//tileImage
    [""],//content
    ["assets/section/graphing/cave-of-flames/img1.png"],//images reverse ordered due to after append sequence
    ["Cave of Flames"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Legend",//title
    "Graphing",//section
    "https://youtu.be/KEVJXqV7XMc?t=9m30s",//youtube
    "false",//favorite
    "Symbols and meanings",//tileDescription
    "assets/section/graphing/legend/img1.png",//tileImage
    ["A square is a lock, and the key is a diamond with a matching color. The bow is a key item. The A block is some type of required interaction or puzzle.",
    "The keys, key items, and interactions unlock the branches and allow a player to untie the knot of the dungeon. Looking at the first graph below, the orange bow on the bottom left will be a dead end blocking the route to the boss level. Players will take the first branch on the top right to get a key and unlock a door to the next branching area. If symbols are lined up with each other, they can be done in any order (choice). [Assisted backtracking will be shown with a large hideous yellow arrow.]"],//content
    ["assets/section/graphing/legend/img3.png",
    "assets/section/graphing/legend/img2.png",
    "assets/section/graphing/legend/img1.png"],//images reverse ordered due to after append sequence
    ["Backtracking with final boss key to unlock boss room",
    "Backtracking with first key to unlock a door",
    "The legend"]//captions reverse ordered due to after append sequence
  ));

  //KEY ITEMS///////////////////////////////////////////////////////////////////////
  articleItems.push(new Article(
    "Gust Jar",//title
    "Key Items",//section
    "https://youtu.be/KEVJXqV7XMc?t=1m43s",//youtube
    "false",//favorite
    "It can really suck",//tileDescription
    "assets/section/key-items/gust-jar/img1.png",//tileImage
    ["The Gust Jar is used to pull all manner of items towards the player. In this dungeon, it is used to pull spring mushrooms towards the player to cross platforms."],//content
    ["assets/section/key-items/gust-jar/img2.png",
    "assets/section/key-items/gust-jar/img1.png"],//images reverse ordered due to after append sequence
    ["Gust jar 'a suckin'",
    "Spring mushroom mechanic"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Clawshot",//title
    "Key Items",//section
    "https://youtu.be/BTsgWepH3GY?t=7m10s",//youtube
    "false",//favorite
    "It's like an extra hand",//tileDescription
    "assets/section/key-items/clawshot/img1.png",//tileImage
    ["The Clawshot can be used to grab ahold of enemy armor and drag the player towards graspable objects",
    "Games can make use of a special item that helps defeat monsters or navigate a level. But such items can reduce the difficulty, making the experience feel trivial (especially for boss fights)."],//content
    ["assets/section/key-items/clawshot/img3.png",
    "assets/section/key-items/clawshot/img2.png",
    "assets/section/key-items/clawshot/img1.png"],//images reverse ordered due to after append sequence
    ["Jumping over barriers using the Clawshot",
    "Removing the shell",
    "Target an enemy with Clawshot"]//captions reverse ordered due to after append sequence
  ));


	//LEVEL TECHNIQUES///////////////////////////////////////////////////////////////////////
  articleItems.push(new Article(
    "Telling vs Figuring Out",//title
    "Level Techniques",//section
    "https://youtu.be/BTsgWepH3GY?t=6m20s",//youtube
    "false",//favorite
    "Too much helping",//tileDescription
    "assets/section/level-techniques/telling-vs-figuring-out/img1.png",//tileImage
    ["While a map itself can look complex, the interactions with the level are important. If you are told exactly how to navigate a level, then the lack of cognition can feel boringly linear. But, if the player needs to think on their own, the spatial reasoning and cognitive load can embody a feeling of complexity.",
    "The player experience of a dungeon can be impacted by being too “hand-holdy” and explaining precisely where to go. For example, the path forward can be an explicit drawn line to follow (i.e. map markers). This simplification can leave a muddy feeling for the player. An engaging dungeon requires you to explore and solve problems, rather than follow a series of instructions."],//content
    ["assets/section/level-techniques/telling-vs-figuring-out/img3.png",
    "assets/section/level-techniques/telling-vs-figuring-out/img2.png",
    "assets/section/level-techniques/telling-vs-figuring-out/img1.png"],//images reverse ordered due to after append sequence
    ["Designing for pathfinding",
    "Shooting cannons is fun, even though the path is straightforward ",
    "Getting told the way to go"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Swinging Platforms",//title
    "Level Techniques",//section
    "https://youtu.be/BTsgWepH3GY?t=8m35s",//youtube
    "false",//favorite
    "Engaging pathways",//tileDescription
    "assets/section/level-techniques/swinging-platforms/img1.png",//tileImage
    ["Using a key item the player bashes platforms in order to move to another side of the dungeon. Interactive platform puzzles like this are far superior to [any] sliding block puzzle."],//content
    ["assets/section/level-techniques/swinging-platforms/img2.png",
    "assets/section/level-techniques/swinging-platforms/img1.png"],//images reverse ordered due to after append sequence
    ["Bashing platforms about",
    "Another block sliding puzzle... ugh"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Linearity",//title
    "Level Techniques",//section
    "https://youtu.be/BTsgWepH3GY?t=7m34s",//youtube
    "false",//favorite
    "Making the design feel cohesive",//tileDescription
    "assets/section/level-techniques/linearity/img1.png",//tileImage
    ["A straightforward level design doesn't need to be boring. Simple designs can use novel experiences that redefine how the player interacts with the level and feels. For example, after completing an ordered number of puzzles, challenges, and rooms, the player needs to guide a statue in reverse through the level, solving the puzzles with a novel perspective."],//content
    ["assets/section/level-techniques/linearity/img3.png",
    "assets/section/level-techniques/linearity/img2.png",
    "assets/section/level-techniques/linearity/img1.png"],//images reverse ordered due to after append sequence
    ["Controlling a statue and solving a puzzle in reverse",
    "Overview of a puzzle room",
    "Shooting an arrow to trigger a gate"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Eurekitecture",//title
    "Level Techniques",//section
    "https://youtu.be/BTsgWepH3GY?t=5m3s",//youtube
    "false",//favorite
    "Grand schemes",//tileDescription
    "assets/section/level-techniques/eurekitecture/img1.png",//tileImage
    ["The design of a level can be thought of as connected pieces of architecture for the player to figure out. For example, a central staircase can be rotated to reach different chunks of a dungeon and double as a channel for flowing water. The interaction with this mega structure moves a water wheel that blocks the way forward."],//content
    ["assets/section/level-techniques/eurekitecture/img4.png",
    "assets/section/level-techniques/eurekitecture/img3.png",
    "assets/section/level-techniques/eurekitecture/img2.png",
    "assets/section/level-techniques/eurekitecture/img1.png"],//images reverse ordered due to after append sequence
    ["Water channeled by the staircase pushes a water wheel",
    "The stairs double as a channel for water",
    "Different rooms are accessible based on rotation of staircase",
    "Rotating central staircase"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Dropping Chandeliers",//title
    "Level Techniques",//section
    "https://youtu.be/BTsgWepH3GY?t=8m17s",//youtube
    "false",//favorite
    "Multi-purpose interactions",//tileDescription
    "assets/section/level-techniques/dropping-chandeliers/img1.png",//tileImage
    ["In the early stages of the dungeon, the player pulls a chain and then dashes under a large chandelier to progress. Later in the dungeon, you need to let one of the chandeliers fall on top of you in order to ride the chandelier up to a higher level (notice the sunken floor that helps players know where to stand)."],//content
    ["assets/section/level-techniques/dropping-chandeliers/img2.png",
    "assets/section/level-techniques/dropping-chandeliers/img1.png"],//images reverse ordered due to after append sequence
    ["Dropping the chandelier and riding it upwards",
    "Pulling the chain and dashing under the chandelier"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Challenge Chunks",//title
    "Level Techniques",//section
    "https://youtu.be/BTsgWepH3GY?t=2m30s",//youtube
    "false",//favorite
    "A sequence of things to do",//tileDescription
    "assets/section/level-techniques/challenge-chunks/img1.png",//tileImage
    ["A level can be split into chunks that can be completed in isolation. Once a player has finished with a chunk, they move on to the next challenge. Chunking helps  reduce the complexity of the dungeon, making navigation of the level run smoothly. With a chunked structure, players can more easily focus on reaching the end of the dungeon and hitting the goal state."],//content
    ["assets/section/level-techniques/challenge-chunks/img6.png",
    "assets/section/level-techniques/challenge-chunks/img5.png",
    "assets/section/level-techniques/challenge-chunks/img4.png",
    "assets/section/level-techniques/challenge-chunks/img3.png",
    "assets/section/level-techniques/challenge-chunks/img2.png",
    "assets/section/level-techniques/challenge-chunks/img1.png"],//images reverse ordered due to after append sequence
    ["Obtaining a key item",
    "Sequence of events to unlock a door",
    "Reaching a boss room",
    "Playing with fans",
    "Tracking a ghost",
    "Turning a water wheel"]//captions reverse ordered due to after append sequence
  ));
  articleItems.push(new Article(
    "Backtracking",//title
    "Level Techniques",//section
    "https://youtu.be/BTsgWepH3GY?t=4m10s",//youtube
    "false",//favorite
    "Been here before?",//tileDescription
    "assets/section/level-techniques/backtracking/img1.png",//tileImage
    ["Backtracking requires that a player return to some part of the dungeon once a certain criteria has been met. Early items can be placed in these backtracking areas so players are familiar with that particular location later. For example, here is a bridge that needs a special boomerang in order to turn it and progress in the dungeon. A player comes into this room very early and obtains a key. Later, a boomerang is obtained that allows the player to turn the bridge and advance (as long as they remember where it is)."],//content
    ["assets/section/level-techniques/backtracking/img3.png",
    "assets/section/level-techniques/backtracking/img2.png",
    "assets/section/level-techniques/backtracking/img1.png"],//images reverse ordered due to after append sequence
    ["Backtracking to the early level bridge",
    "Receiving the bridge-turning boomerang",
    "Early room with non-turnable bridge"]//captions reverse ordered due to after append sequence
  ));
