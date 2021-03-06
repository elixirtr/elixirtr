// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

(function() {
  function e(e) {
    for (r = 0; r < n.length; r++) n[r].classList.remove("popover-open");
  }
  function t(t) {
    t.preventDefault(),
      document
        .querySelector(this.getAttribute("href"))
        .classList.contains("popover-open")
        ? document
            .querySelector(this.getAttribute("href"))
            .classList.remove("popover-open")
        : (e(),
          document
            .querySelector(this.getAttribute("href"))
            .classList.add("popover-open")),
      t.stopImmediatePropagation();
  }
  var o = document.querySelectorAll("[data-popover]"),
    n = document.querySelectorAll(".popover"),
    r = void 0;
  for (r = 0; r < o.length; r++) o[r].addEventListener("click", t);
  document.addEventListener("click", e);
})();

document.addEventListener("DOMContentLoaded", () => {
  const addProfileEl = document.getElementById("add-profile");

  if (addProfileEl !== null) {
    const profileForm = document.getElementById("profile-form");

    let changeFragmentIndex = fragment => {
      var changed = fragment
        .replace(
          /_(\d+)_/,
          `_${profileForm.querySelectorAll(".profile-input-row").length}_`
        )
        .replace(
          /\[(\d+)\]/,
          `[${profileForm.querySelectorAll(".profile-input-row").length}]`
        );
      console.log(changed);
      return changed;
    };

    addProfileEl.addEventListener("click", e => {
      e.preventDefault();

      const fragment = document
        .createRange()
        .createContextualFragment(
          changeFragmentIndex(
            '<div class="row profile-input-row">' +
              '<div class="column"><input name="user[profiles][0][name]" type="text" value=""></div>' +
              '<div class="column"><input name="user[profiles][0][url]" type="text" value=""></div>' +
              "</div>"
          )
        );
      profileForm.appendChild(fragment);
    });

    profileForm.addEventListener("submit", e => {
      e.preventDefault();

      const inputRows = profileForm.querySelectorAll(".profile-input-row");
      var emptyRows = Array.prototype.filter.call(inputRows, row =>
        Array.prototype.some.call(
          row.querySelectorAll("input"),
          input => input.value === null || input.value === ""
        )
      );
      Array.prototype.forEach.call(emptyRows, row =>
        row.parentNode.removeChild(row)
      );

      profileForm.submit();
    });
  }
});
