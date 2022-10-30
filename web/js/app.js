const button = document.getElementById("submit");
const result = document.getElementById("response");

button.addEventListener("click", () => {
  result.textContent = "Loading...";
  const url = document.getElementById("url-input").value;

  if (url === '' || url === null || url === undefined) {
    result.textContent = "Please enter a URL!";
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
    let msg = `Start url ${response.start_url}\n`;

    msg += `Final url ${response.final_url}\n\n`;
    msg += `Found ${response.redirect_count} redirects:\n`;

    for (let i = 0; i < response.route_log.length; i++) {
      msg += `${i} — ${response.route_log[i]}\n`;
    }

    result.textContent = msg;
  })
  .catch((error) => {
    result.textContent = error;
  });
})