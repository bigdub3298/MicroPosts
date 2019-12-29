import "core-js/stable";
import "regenerator-runtime/runtime";
import "./assets/css/style.css";
import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);

ui.postSubmit.addEventListener("click", postAddSubmit);

ui.posts.addEventListener("click", postDeleteSubmit);

ui.posts.addEventListener("click", editModeSubmit);

ui.cardForm.addEventListener("click", editCancelSubmit);

ui.cardForm.addEventListener("click", updatePostSubmit);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function postAddSubmit(e) {
  if (e.target.classList.contains("post-submit")) {
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
          ui.clearInputFields();
          ui.showAlert("Post Added", "alert alert-success");
          ui.addPost(newPost);
        })
        .catch(err => console.log(err));
    } else {
      ui.showAlert("Please fill in both fields", "alert alert-danger");
    }
  }
}

function postDeleteSubmit(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert("Post Removed...", "alert alert-danger");
        ui.deletePost(e.target.parentElement.parentElement.parentElement);
      })
      .catch(err => console.log(err));
  }
}

function editModeSubmit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const id = e.target.parentElement.dataset.id;

    const data = {
      id,
      title,
      body
    };

    ui.fillInputFields(data);
  }
}

function editCancelSubmit(e) {
  if (e.target.classList.contains("cancel-edit")) {
    ui.toggleEditMode();
    ui.clearInputFields();
  }
}

function updatePostSubmit(e) {
  if (e.target.classList.contains("post-update")) {
    const title = ui.titleInput.value;
    const body = ui.bodyInput.value;
    const id = ui.idInput.value;

    if (title && body) {
      const data = {
        title,
        body,
        id
      };

      http
        .put(`http://localhost:3000/posts/${data.id}`, data)
        .then(data => {
          ui.clearInputFields();
          ui.updatePostsList(data);
          ui.showAlert("Post updated", "alert alert-success");
        })
        .catch(err => console.log(err));
    } else {
      ui.showAlert("Please fill in both fields", "alert alert-warning");
    }
  }
}
