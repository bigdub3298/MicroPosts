class UI {
  constructor() {
    this.posts = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";

    for (let post of posts) {
      output += `
      <div class="card mb-3">
        <div class="card-body">
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
    <div class="card-body">
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
  clearInputs() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }
}

export const ui = new UI();
