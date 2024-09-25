const formAdd = document.querySelector(".form-tasks");
const tasks = document.querySelector(".tasks");
const messageSpan = document.querySelector(".message span");
const clearAll = document.querySelector(".clear");
const searchForm = document.querySelector(".search");
// Cập nhập
function updateMessage() {
  const textLength = tasks.children.length;
  messageSpan.textContent = `You have ${textLength} pending tasks`;
}
updateMessage();
// Thêm task
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = formAdd.task.value.trim();
  if (value.length) {
    tasks.innerHTML += `<li><span>${value}</span><i class="bi bi-trash-fill delete"></i></li>`;
  }
  updateMessage();
  formAdd.reset();
});
// Xóa task
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
  updateMessage();
});
// Clear All
clearAll.addEventListener("click", (e) => {
  const taskItems = tasks.querySelectorAll("li");
  taskItems.forEach((item) => {
    item.remove();
    updateMessage();
  });
});
//Search
function filterTask(key) {
  Array.from(tasks.children)
    .filter((task) => {
      return !task.textContent.toLowerCase().includes(key);
    })
    .forEach((task) => {
      task.classList.add("hide");
    });
  Array.from(tasks.children)
    .filter((task) => {
      return task.textContent.toLowerCase().includes(key);
    })
    .forEach((task) => {
      task.classList.remove("hide");
    });
}
searchForm.addEventListener("click", (e) => {
  if (e.target.classList.contains("reset")) {
    searchForm.reset();
    const searchKey = searchForm.searchTask.value.trim().toLowerCase();
    filterTask(searchKey);
  }
});
searchForm.addEventListener("keyup", (e) => {
  const searchKey = searchForm.searchTask.value.trim().toLowerCase();
  filterTask(searchKey);
});
