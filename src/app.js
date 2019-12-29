import "core-js/stable";
import "regenerator-runtime/runtime";
import "./assets/css/style.css";
import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);

ui.postSubmit.addEventListener("click", postAddSubmit);

ui.posts.addEventListener("click", postDeleteSubmit);

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
    http
      .post("http://localhost:3000/posts", data)
      .then(newPost => {
        ui.clearInputs();
        ui.showAlert("Post Added", "alert alert-success");
        ui.addPost(newPost);
      })
      .catch(err => console.log(err));
  }
}

function postDeleteSubmit(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert("Post Deleted...", "alert alert-danger");
        ui.deletePost(e.target.parentElement.parentElement.parentElement);
      })
      .catch(err => console.log(err));
  }
}
