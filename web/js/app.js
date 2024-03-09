const button = document.getElementById("submit");
const result = document.getElementById("response");
const copyBtn = document.getElementById("copy-btn");

button.addEventListener("click", () => {
  result.textContent = "Loading...";
  result.parentElement.classList.remove("hidden");
  const url = document.getElementById("url-input").value;

  if (url === '' || url === null || url === undefined) {
    result.textContent = "Please enter a URL!";
    result.parentElement.classList.remove("hidden");
    return;
  }

  fetch("/api", {
    method: 'POST',
    body: new URLSearchParams({ 'link': url })
  }).then((response) => {
    if (response.ok) return response.json();
    else throw new Error(`${response.status}. Please double check the entered URL!`);
  })
  .then((response) => {
    let msg = `Start url: ${response.start_url}\n`;

    msg += `Final url: ${response.final_url}\n\n`;
    msg += `Found ${response.redirect_count} redirects:\n`;

    for (let i = 0; i < response.route_log.length; i++) {
      msg += `${i} — ${response.route_log[i]}\n`;
    }
    
    result.textContent = msg;

    navigator.clipboard.writeText(response.route_log[response.route_log.length - 1]);
    document.getElementById("success").style.display = "block";
    setTimeout(() => {
      document.getElementById("success").style.display = "none";
    }, 2000);
  })
  .catch((error) => {
    result.textContent = error;
    result.parentElement.classList.remove("hidden");
  });
});

result.parentElement.addEventListener("mouseenter", () => {
  copyBtn.classList.remove("hidden");
});

result.parentElement.addEventListener("mouseleave", () => {
  copyBtn.classList.add("hidden");
});


copyBtn.addEventListener("click", () => {
  copyBtn.textContent = "Copied!";

  navigator.clipboard.writeText(result.textContent);

  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1000);
});
