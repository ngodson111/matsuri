async function fetchKaraoke() {
  try {
    let response = await fetch("./admin/content/api/viewdata.php", {
      method: "POST",
      body: JSON.stringify({ table: "gallery" }),
    });
    let responsedata = await response.json();

    let gallery = document.querySelector("#ourStory #karaokeGallery");

    let childGallery = ``;

    responsedata.forEach((element) => {
      if (element.state == "Karaoke") {
        childGallery += `
                <div class="col-sm-6 col-md-4">
                    <a
                    href="./admin/content/public/gallery/${element.image}"
                    class="html5lightbox"
                    data-group="karaoke"
                    data-thumbnail="./admin/content/public/gallery/${element.image}"
                    title="Karakoe theme1 (2)"
                    >
                    <div class="menu-card">
                        <img
                        class="menu-card-img"
                        src="./admin/content/public/gallery/${element.image}"
                        />
                    </div>
                    </a>
                </div>
                  `;
      }
    });

    gallery.innerHTML = childGallery;
  } catch (error) {
    console.log(error);
  }
}
fetchKaraoke();

async function addKaraokeReservation() {
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
    let response = await fetch(
      "./admin/content/api/addkaraokereservation.php",
      {
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
      }
    );
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
  addKaraokeReservation();
});
