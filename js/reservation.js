async function addReservation() {
  let body = document.querySelector("#contactForm");

  const name = body.querySelector("#name");
  const phone = body.querySelector("#phone");
  const date = body.querySelector("#date");
  const time = body.querySelector("#time");
  const guest = body.querySelector("#guest");
  const email = body.querySelector("#email");
  const message = body.querySelector("#message");
  const agree = body.querySelector("#agree");

  if (!agree.checked) return alert("Please agree to the terms and conditions");

  if (
    !name.value ||
    !phone.value ||
    !date.value ||
    !time.value ||
    !guest.value ||
    !email.value ||
    !message.value
  )
    return alert("Please fill in all the fields");

  try {
    let response = await fetch("./admin/content/api/addreservation.php", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        phone: phone.value,
        date: date.value,
        time: time.value,
        guest: guest.value,
        email: email.value,
        message: message.value,
      }),
    });
    let responsedata = await response.json();

    if (!responsedata) return alert(responsedata);

    alert("Your reservation has been sent");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addReservation();
});
