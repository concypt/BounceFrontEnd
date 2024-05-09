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

});
