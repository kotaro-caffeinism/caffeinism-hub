// set or get username & icon

let username = localStorage.getItem("username");
let icon = localStorage.getItem("icon");
if (!username) {
  username = window.prompt("What is your name?");
  const icons = [
    "./images/cat-01.jpg",
    "./images/cat-02.jpg",
    "./images/cat-03.jpg",
    "./images/cat-04.jpg",
    "./images/cat-05.jpg",
    "./images/cat-06.jpg",
    "./images/cat-07.jpg",
    "./images/cat-08.jpg",
    "./images/cat-09.jpg",
    "./images/cat-10.jpg",
    "./images/cat-11.jpg",
  ];
  icon = icons[Math.floor(Math.random() * 11)];
  localStorage.setItem("username", username);
  localStorage.setItem("icon", icon);
}

// tools

function isToday(someDate) {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}

function makePostEl(post) {
  const fragment = document.createDocumentFragment();

  const friendEl = document.createElement("div");
  friendEl.className = "friend";
  friendEl.innerText = post.friend;
  fragment.appendChild(friendEl);

  const timestampEl = document.createElement("div");
  timestampEl.className = "timeStamp";
  timestampEl.innerText = isToday(post.timestamp)
    ? moment(post.timestamp, "YYYYMMDD").fromNow()
    : moment(post.timestamp, "YYYYMMDD").calendar();
  fragment.appendChild(timestampEl);

  const imgDiv = document.createElement("div");
  if (post.image) {
    imgDiv.className = "post-img";
    const imgEl = document.createElement("img");
    imgEl.src = post.image;
    imgDiv.append(imgEl);
    fragment.appendChild(imgDiv);
  }

  const feelingsIconClasses = {
    happy: "fa-solid fa-face-grin-beam", // "happy"
    smug: "fa-solid fa-face-smile-wink", // "smug"
    lovestruck: "fa-solid fa-face-grin-hearts", // "lovestruck",
    gross: "fa-solid fa-face-frown", // "gross",
    scared: "fa-solid fa-face-sad-cry", // "scared",
    tired: "fa-solid fa-face-tired", // "tired",
    angry: "fa-solid fa-face-angry", // "angry",
    frustrated: "fa-solid fa-face-grimace", // "frustrated",
    excited: "fa-solid fa-face-grin-stars", // "excited",
    none: "",
  };

  if (post.feeling !== "none") {
    const feelingDiv = document.createElement("div");
    feelingDiv.className = "feeling-outer";
    for (const key in feelingsIconClasses) {
      const feelingSpan = document.createElement("span");
      feelingSpan.className = "feeling";

      const i = document.createElement("i");
      i.className = feelingsIconClasses[key];

      if (key === post.feeling) {
        i.style.fontSize = "1.5em";
      }

      feelingSpan.append(i);
      feelingDiv.append(feelingSpan);
    }
    fragment.appendChild(feelingDiv);
  }

  const postEl = document.createElement("div");
  postEl.innerText = post.text;
  postEl.appendChild(fragment);

  return postEl;
}

// after html loaded, this function create first 10 post s

window.addEventListener("load", () => {
  // This is a check to see if there's a username stored

  const userDiv = document.createElement("div");
  userDiv.id = "user";

  const usernameP = document.createElement("p");
  usernameP.innerText = username;

  const iconDiv = document.createElement("div");
  iconDiv.style.backgroundImage = `url(${icon})`;

  userDiv.append(iconDiv);
  userDiv.append(usernameP);

  const container = document.getElementById("container");
  container.prepend(userDiv);

  const newsFeedContainer = document.querySelector("#newsfeed");

  /* make first 10 posts*/

  for (let index = caffeinismHub.newsfeed.length - 1; index >= 0; index--) {
    const postEl = makePostEl(caffeinismHub.newsfeed[index]);
    newsFeedContainer.append(postEl);
  }

  let currentPostsCount = caffeinismHub.newsfeed.length - 1;

  function prependPost() {
    for (
      let index = currentPostsCount + 1;
      index <= caffeinismHub.newsfeed.length - 1;
      index++
    ) {
      const postEl = makePostEl(caffeinismHub.newsfeed[index]);
      newsFeedContainer.prepend(postEl);
    }

    currentPostsCount = caffeinismHub.newsfeed.length - 1;
  }

  const reloadButton = document.getElementById("reload");
  reloadButton.addEventListener("click", prependPost);

  /* get and post use's input */

  const usersPostButton = document.getElementById("post-button");

  // let inputImg;

  // const inputImgTag = document.getElementById("img-input");
  // inputImgTag.addEventListener("change", (input) => {
  //   console.log(input);
  //   inputImg = input.files[0];
  // });

  usersPostButton.addEventListener("click", () => {
    const feelingsElement = document.getElementById("feelings");
    const feelings = feelingsElement.children;

    let userFeeling;
    for (const option of feelings) {
      if (option.selected) {
        userFeeling = option.value;
        feelingsElement.selectedIndex = 0;
        break;
      }
    }

    const postEl = makePostEl(
      {
        friend: username,
        text: document.getElementById("text").value,
        feeling: userFeeling,
        // image: inputImg ? inputImg : null,
        image: null,
        timestamp: new Date(),
      },
      newsFeedContainer
    );
    newsFeedContainer.prepend(postEl);
    document.getElementById("text").value = null;
  });
});