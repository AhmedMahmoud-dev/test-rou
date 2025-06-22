var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var NameError = document.getElementById("NameError");
var URLError = document.getElementById("URLError");
var bookMarks = [];
var updateIndex = -1;

var bookmarkNameRegExp = /^[A-Za-z][A-Za-z0-9 ]{2,29}$/; 
var bookmarkURLRegExp = /^https:\/\/[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,}(\S*)$/;


if (localStorage.getItem("bookMarks") != null) {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  display();
}

function addBookmark() {
  var bookMark = {
    name: siteName.value.trim(),
    link: siteURL.value.trim()
  };
  
  if (isBookmarkValid(bookMark.name, bookMark.link)) {
    if(submitBtn.innerHTML == 'Add Bookmark') {
      bookMarks.push(bookMark);
    } else {
      bookMarks.splice(updateIndex, 1, bookMark);
      submitBtn.innerHTML = "Add Bookmark";
      updateIndex = -1;
    }
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    display();
    clearInputs();
  }
}

function isBookmarkValid(name, url) {
  let valid = true;

  if (!bookmarkNameRegExp.test(name)) {
    NameError.innerHTML = `Invalid name. Must be 3-30 chars, start with a letter.`;
    NameError.classList.remove("d-none");
    siteName.classList.add("is-invalid");
    valid = false;
  } else {
    NameError.innerHTML = "";
    NameError.classList.add("d-none");
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
  }

  if (!bookmarkURLRegExp.test(url)) {
    URLError.innerHTML = `Invalid URL. Must start with https:// and have a valid domain.`;
    URLError.classList.remove("d-none");
    siteURL.classList.add("is-invalid");
    valid = false;
  } else {
    URLError.innerHTML = "";
    URLError.classList.add("d-none");
    siteURL.classList.remove("is-invalid");
    siteURL.classList.add("is-valid");
  }
  return valid;
}

function display() {
  var cartona = "";
  for (var i = 0; i < bookMarks.length; ++i) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookMarks[i].name}</td>
        <td>
          <a class="btn btn-outline-info"
          href="${bookMarks[i].link}"
          target="_blank">
          <i class="fa-solid fa-eye"></i>
          Visit
          </a>
        </td>
        <td>
        <div class="input-group justify-content-center">
          <button class="btn btn-outline-warning"
          onclick="updateBookmark(${i})">
            <i class="fa-solid fa-wrench"></i>
            Update
          </button>
          <button class="btn btn-outline-danger"
          onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </div>
        </td>
      </tr>
    `;
  }
  document.getElementById("tBody").innerHTML = cartona;
}

function clearInputs() {
  siteName.value = '';
  siteURL.value = '';
  

  siteName.classList.remove("is-valid", "is-invalid");
  siteURL.classList.remove("is-valid", "is-invalid");
  

  NameError.innerHTML = '';
  NameError.classList.add("d-none");
  URLError.innerHTML = '';
  URLError.classList.add("d-none");
}

function deleteBookmark(i) {
  bookMarks.splice(i, 1);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  display();
}

function updateBookmark(i) {
  updateIndex = i;
  siteName.value = bookMarks[i].name;
  siteURL.value = bookMarks[i].link;
  submitBtn.innerHTML = "Update Bookmark";
}
