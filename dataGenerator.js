/*
  This generates our fake newsfeed information.

  There is no need to touch the code in here until you get to basic requirement #4,
  but please check it out to familiarize yourself beforehand.
*/
(() => {
  window.caffeinismHub = {};
  caffeinismHub.newsfeed = [];
  caffeinismHub.friends = {};
  caffeinismHub.friendNames = ["kotaro", "taro", "jiro", "sansiro"];
  caffeinismHub.friendNames.forEach((name) => {
    caffeinismHub.friends[name] = [];
  });

  const getRandomElement = (array) => {
    // Given an array, returns a random element
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const starters = [
    "totally just",
    "just",
    "completely",
    "waaaaah! i",
    "i just",
    "a salaryman",
    "a salaryman",
    "yesterday I",
    "a ninja",
    "my boss",
  ];
  const verbs = [
    "ate",
    "drank",
    "threw up in",
    "refactored",
    "iterated on",
    "thought about",
    "threw up on",
    "saw",
    "walked to",
    "got lost in",
    "walked into",
    "googled",
    "drove",
    "ran to",
    "worked on",
    "slept on",
    "slept in",
  ];
  const fillers = [
    "my",
    "your",
    "his",
    "her",
    "my favorite",
    "a beautiful",
    "a delicious",
    "that",
    "this",
    "an interesting",
    "",
    "the best",
    "the greatest",
    "a delightful",
  ];
  const nouns = [
    "restaurant",
    "family mart",
    "whisky",
    "onigiri",
    "food",
    "house",
    "tokyo",
    "hukuoka",
    "city",
    "iphone",
    "google",
    "unicorn",
    "pirate ship",
    "ninja",
  ];
  const hashtags = [
    "#techlife",
    "#startups",
    "#tokyo",
    "#japan",
    "#interesting",
    "#til",
    "#lol",
    "#tgifriday",
    "#hashtags",
    "#japanlife",
    "#oops",
    "#caffeinism",
    "#100-days-of-code",
    "",
  ];

  const feelings = [
    "happy",
    "smug",
    "lovestruck",
    "gross",
    "scared",
    "tired",
    "angry",
    "frustrated",
    "excited",
    "none",
  ];

  const images = [
    "images/img-01.jpg",
    "images/img-02.jpg",
    "images/img-03.jpg",
    "images/img-04.jpg",
    "images/img-05.jpg",
    "images/img-06.jpg",
    "images/img-07.jpg",
    "images/img-08.jpg",
    "images/img-09.jpg",
    "images/img-10.jpg",
    "images/img-11.jpg",
    "images/img-12.jpg",
    "images/img-13.jpg",
    "images/img-14.jpg",
  ];

  // make random post
  const generateRandomText = () => {
    return [
      getRandomElement(starters),
      getRandomElement(verbs),
      getRandomElement(fillers),
      getRandomElement(nouns),
      getRandomElement(hashtags),
    ].join(" "); // string
  };

  const generatePostObj = (timeOffset) => {
    // if an offset is provided, make the timestamp that much older, otherwise just use the current time
    const timestamp = timeOffset
      ? new Date(new Date().getTime() - timeOffset)
      : new Date();

    return {
      friend: getRandomElement(caffeinismHub.friendNames),
      text: generateRandomText(),
      feeling: getRandomElement(feelings),
      image: getRandomElement(images),
      timestamp,
    };
  };

  const addPost = (obj) => {
    const friend = obj.friend;
    caffeinismHub.friends[friend].push(obj);
    caffeinismHub.newsfeed.push(obj);
  };

  const createPost = (timeOffset) => {
    const newPost = generatePostObj(timeOffset);
    addPost(newPost);
  };

  for (let i = 0; i < 10; i++) {
    // make the starting posts look like they were posted over the course of the past day
    const timeOffset = (2 * (10 - i) + Math.random()) * 60 * 60 * 1000;
    createPost(timeOffset);
  }

  const scheduler = () => {
    createPost(null);
    setTimeout(scheduler, (3 + Math.random() * 5) * 1000); // generate a new post every 3 to 8 seconds
  };

  scheduler();
})();
