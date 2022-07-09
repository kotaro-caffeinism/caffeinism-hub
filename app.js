// set or get username & icon

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

const username = localStorage.getItem("username")
  ? localStorage.getItem("username")
  : (() => {
      localStorage.setItem("username", window.prompt("What is your name?"));
      return localStorage.getItem("username");
    })();
const icon = localStorage.getItem("icon")
  ? localStorage.getItem("icon")
  : (() => {
      const icon = icons[Math.floor(Math.random() * 11)];
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
  console.log({ "post.image": post.image });

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

  let inputImg;

  const inputImgTag = document.getElementById("img-input");

  // inputImgTag.addEventListener("change", () => {
  //   const file = inputImgTag.files[0];
  //   const reader = new FileReader();

  //   // reader.onload = function (file) {
  //   reader.onload = function () {
  //     let resultStr = "";
  //     const arrU8 = new Uint8Array(reader.result);
  //     let str;
  //     for (let i = 0; i < arrU8.length; i++) {
  //       if (arrU8[i] < 0x10) {
  //         str = "0" + arrU8[i].toString(16);
  //       } else {
  //         str = arrU8[i].toString(16);
  //       }
  //       if (i % 16 == 0) {
  //         resultStr += str;
  //       } else if (i % 16 == 15) {
  //         resultStr += " " + str + "\n";
  //       } else {
  //         resultStr += " " + str;
  //       }
  //     }
  //     console.log(resultStr);
  //     inputImg = document.createElement("div");
  //     const inputImgInner = document.createElement("img");
  //     inputImgInner.innerText = resultStr;
  //     inputImg.append(inputImgInner);
  //   };

  //   reader.readAsArrayBuffer(file);
  // });

  inputImgTag.addEventListener("change", (e) => {
    inputImg = document.createElement("div");
    console.log({ inputImg });
    const inputImgInner = document.createElement("img");
    // inputImgInner.innerText = resultStr;
    // inputImg.append(inputImgInner);

    const reader = new FileReader();
    reader.onload = (e) => {
      inputImgInner.src = e.target.result;
      console.log({ inputImgInner });
    };
    inputImg.append(inputImgInner);

    reader.readAsDataURL(e.target.files[0]);
  });

  // $("#input1").on("change", function (e) {
  // 2. 画像ファイルの読み込みクラス
  // var reader = new FileReader();

  // 3. 準備が終わったら、id=sample1のsrc属性に選択した画像ファイルの情報を設定
  // reader.onload = function (e) {
  //   $("#sample1").attr("src", e.target.result);
  // };

  // 4. 読み込んだ画像ファイルをURLに変換
  // reader.readAsDataURL(e.target.files[0]);

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
        // image: null,
        timestamp: new Date(),
      },
      newsFeedContainer
    );
    newsFeedContainer.prepend(postEl);
    document.getElementById("text").value = null;
  });
});
