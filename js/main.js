(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "メニューを開く");
      });
    });
  }

  document.querySelectorAll(".faq-item").forEach(function (item) {
    var button = item.querySelector(".faq-q");
    if (!button) return;

    button.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  var form = document.getElementById("apply-form");
  if (!form) return;

  var fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    tel: form.querySelector("#tel"),
    privacy: form.querySelector('input[name="privacy"]')
  };

  function showError(key, message) {
    var error = form.querySelector('[data-error-for="' + key + '"]');
    var input = key === "course"
      ? form.querySelector('input[name="course"]')
      : fields[key];

    if (error) {
      error.hidden = !message;
      error.textContent = message || "";
    }
    if (input) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }

  function selectedCourse() {
    return form.querySelector('input[name="course"]:checked');
  }

  function validate() {
    var valid = true;
    var firstInvalid = null;

    var name = fields.name.value.trim();
    if (!name) {
      showError("name", "お名前を入力してください。");
      valid = false;
      firstInvalid = firstInvalid || fields.name;
    } else {
      showError("name", "");
    }

    var email = fields.email.value.trim();
    if (!email) {
      showError("email", "メールアドレスを入力してください。");
      valid = false;
      firstInvalid = firstInvalid || fields.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("email", "メールアドレスの形式で入力してください。");
      valid = false;
      firstInvalid = firstInvalid || fields.email;
    } else {
      showError("email", "");
    }

    var tel = fields.tel.value.trim();
    if (!tel) {
      showError("tel", "電話番号を入力してください。");
      valid = false;
      firstInvalid = firstInvalid || fields.tel;
    } else if (!/^[0-9+\-() ０-９＋−ー－]{8,}$/.test(tel)) {
      showError("tel", "電話番号を正しく入力してください。");
      valid = false;
      firstInvalid = firstInvalid || fields.tel;
    } else {
      showError("tel", "");
    }

    if (!selectedCourse()) {
      showError("course", "参加希望の講座を選択してください。");
      valid = false;
      firstInvalid = firstInvalid || form.querySelector('input[name="course"]');
    } else {
      showError("course", "");
    }

    if (!fields.privacy.checked) {
      showError("privacy", "プライバシーポリシーへの同意が必要です。");
      valid = false;
      firstInvalid = firstInvalid || fields.privacy;
    } else {
      showError("privacy", "");
    }

    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  ["name", "email", "tel"].forEach(function (key) {
    fields[key].addEventListener("input", function () {
      if (fields[key].getAttribute("aria-invalid") === "true") validate();
    });
  });

  form.querySelectorAll('input[name="course"], input[name="privacy"]').forEach(function (input) {
    input.addEventListener("change", function () {
      if (form.querySelector("[aria-invalid='true']")) validate();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validate()) {
      window.location.href = "thanks.html";
    }
  });
})();
