class UI {
  constructor() {
    this.posts = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.cardForm = document.querySelector(".card-form");
    this.formEnd = document.querySelector(".form-end");
    this.formState = "add";
  }

  showPosts(posts) {
    let output = "";

    for (let post of posts) {
      output += `
      <div class="card mb-3">
        <div class="card-body" id="post-${post.id}">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-edit"></i></a>
          <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
        </div>
      </div>
      `;
    }
    this.posts.innerHTML = output;
  }

  addPost(post) {
    const div = document.createElement("div");
    div.className = "card mb-3";

    div.innerHTML = `
    <div class="card-body" id="post-${post.id}">
      <h4 class="card-title">${post.title}</h4>
      <p class="card-text">${post.body}</p>
      <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-edit"></i></a>
      <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
    </div>`;

    this.posts.appendChild(div);
  }

  deletePost(element) {
    element.remove();
  }

  updatePostsList(post) {
    const cardBody = document.querySelector(`#post-${post.id}`);
    cardBody.innerHTML = `
      <h4 class="card-title">${post.title}</h4>
      <p class="card-text">${post.body}</p>
      <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-edit"></i></a>
      <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
    `;
    this.toggleEditMode();
  }

  showAlert(msg, className) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".postsContainer");
    container.insertBefore(div, this.posts);

    setTimeout(() => this.clearAlert(), 3000);
  }

  clearAlert() {
    if (document.querySelector(".alert")) {
      document.querySelector(".alert").remove();
    }
  }

  fillInputFields(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
    this.toggleEditMode();
  }

  clearInputFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  toggleEditMode() {
    if (this.formState === "add") {
      const button = document.createElement("button");
      button.className = "cancel-edit btn btn-light btn-block";
      button.textContent = "Cancel Edit";

      this.cardForm.insertBefore(button, this.cardEnd);

      this.postSubmit.className = "post-update btn btn-warning btn-block mb-2";
      this.postSubmit.textContent = "Update Post";

      this.formState = "edit";
    } else {
      this.cardForm.removeChild(this.cardForm.lastElementChild);

      const updatePost = document.querySelector(".post-update");
      updatePost.className = "post-submit btn btn-primary btn-block";
      updatePost.textContent = "Post It";
      this.formState = "add";
    }
  }
}

export const ui = new UI();
