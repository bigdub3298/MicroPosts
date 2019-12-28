import "core-js/stable";
import "regenerator-runtime/runtime";
import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}
