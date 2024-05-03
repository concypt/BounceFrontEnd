import $ from "jquery";

//Masab Js File
$(document).ready(function () {
  //   var preloader = document.getElementById("preloader");
  //   if (preloader) {
  //     preloader.style.display = "none";
  //   }

  // Get all checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Function to update selected count
  function updateSelectedCount() {
    const selectedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    document.getElementById("selectedCount").textContent =
      selectedCheckboxes.length;
  }

  // Attach change event listener to each checkbox
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateSelectedCount);
  });

  const fileInput = document.getElementById("file-input");
  console.log(fileInput);
  const imagePreview = document.getElementById("img-preview");
  const toast = document.getElementById("toast");

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      imagePreview.src = src;
      showToast();
    }
  });

  function showToast() {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }
});
