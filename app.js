// const store = require('store');

// const express = require("express");
// const app = express();
// const server = app.listen(3000, function () {
//   console.log("Node.js is listening to PORT: " + server / address().port);
// });

// import { icons } from "./dataStore";

// set or get username & icon

// const icons = [
//   "./images/cat-01.jpg",
//   "./images/cat-02.jpg",
//   "./images/cat-03.jpg",
//   "./images/cat-04.jpg",
//   "./images/cat-05.jpg",
//   "./images/cat-06.jpg",
//   "./images/cat-07.jpg",
//   "./images/cat-08.jpg",
//   "./images/cat-09.jpg",
//   "./images/cat-10.jpg",
//   "./images/cat-11.jpg",
// ];

const username = localStorage.getItem("username")
  ? localStorage.getItem("username")
  : (() => {
      localStorage.setItem("username", window.prompt("What is your name?"));
      return localStorage.getItem("username");
    })();
const icon = localStorage.getItem("icon")
  ? localStorage.getItem("icon")
  : (() => {
      const icon = dataStore.icons[Math.floor(Math.random() * 11)];
      localStorage.setItem("icon", icon);
      return localStorage.getItem("icon");
    })();

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
    happy: "fa-solid fa-face-grin-beam",
    smug: "fa-solid fa-face-smile-wink",
    lovestruck: "fa-solid fa-face-grin-hearts",
    gross: "fa-solid fa-face-frown",
    scared: "fa-solid fa-face-sad-cry",
    tired: "fa-solid fa-face-tired",
    angry: "fa-solid fa-face-angry",
    frustrated: "fa-solid fa-face-grimace",
    excited: "fa-solid fa-face-grin-stars",
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

// after html loaded, this function create first 10 posts

window.addEventListener("load", () => {
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

  const inputImgTag = document.getElementById("img-input");

  inputImgTag.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      inputImg = e.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
  });

  usersPostButton.addEventListener("click", () => {
    if ([...document.getElementById("text").value].length > 140) {
      window.alert("you can input 140 or fewer characters");
      return;
    }

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
        image: inputImg ? inputImg : null,
        timestamp: new Date(),
      },
      newsFeedContainer
    );
    newsFeedContainer.prepend(postEl);
    document.getElementById("text").value = null;
  });
});
