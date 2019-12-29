import "core-js/stable";
import "regenerator-runtime/runtime";
import "./assets/css/style.css";
import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);

ui.postSubmit.addEventListener("click", postAddSubmit);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function postAddSubmit() {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;

  if (title && body) {
    const data = {
      title,
      body
    };

    ui.clearInputs();

    http
      .post("http://localhost:3000/posts", data)
      .then(newPost => ui.addPost(newPost))
      .catch(err => console.log(err));
  }
}
