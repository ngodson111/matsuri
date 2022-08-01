async function addContact() {
  let body = document.querySelector("#contactForm");

  const name = body.querySelector("#name");
  const email = body.querySelector("#email");
  const message = body.querySelector("#message");
  const agree = body.querySelector("#agree");

  if (!agree.checked) return alert("Please agree to the terms and conditions");

  if (!name.value || !email.value || !message.value)
    return alert("Please fill in all the fields");

  try {
    let response = await fetch("./admin/content/api/addcontact.php", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });
    let responsedata = await response.json();

    if (!responsedata) return alert(responsedata);

    alert("Your message has been sent");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addContact();
});
