async function fetchSlider() {
  try {
    let response = await fetch("./admin/content/api/viewdata.php", {
      method: "POST",
      body: JSON.stringify({ table: "slider" }),
    });
    let responsedata = await response.json();

    let silderBody = document.querySelector("#homeSliderSection #homeSlider");

    let child = ``;
    responsedata.forEach((element) => {
      child += `
        <div class="item">
        <div class="row">
          <div class="col-md-1 my-auto">
            <img class="jap-txt" src="img/japmain.png" />
          </div>
          <div class="col-md-4 my-auto">
            <div class="home-slider-text">
              <div class="slider-title">
                ${element.title.split(" ")[0]}<br />
                ${
                  element.title.split(" ")[1] ? element.title.split(" ")[1] : ""
                }
              </div>
              <div class="slider-tagline">
                ${element.description}
              </div>
              <a href="reservation.html" class="slider-btn"
                >Book a Table</a
              >
            </div>
          </div>
          <div class="col-md-7">
            <img class="slider-img" src="./admin/content/public/slider/${
              element.image
            }" />
          </div>
        </div>
      </div>
        `;
    });
    silderBody && (silderBody.innerHTML = child);
    $("#homeSlider").owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      autoplay: true,
      autoplayTimeout: 4500,
      smartSpeed: 500,
      autoplayHoverPause: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
fetchSlider();

async function fetchGallery() {
  try {
    let response = await fetch("./admin/content/api/viewdata.php", {
      method: "POST",
      body: JSON.stringify({ table: "gallery" }),
    });
    let responsedata = await response.json();

    let galleryBodyHome = document.querySelector(
      "#homeGallery #galleryItemsHome"
    );

    let childGallery = ``;
    let childKaraoke = ``;

    responsedata.forEach((element) => {
      if (element.state == "Resturant") {
        childGallery += `
              <div class="col-sm-6 col-md-4">
                  <a
                      href="./admin/content/public/gallery/${element.image}"
                      class="html5lightbox"
                      data-group="gallery"
                      data-thumbnail="./admin/content/public/gallery/${element.image}"
                  >
                      <img class="homegallery-img" src="./admin/content/public/gallery/${element.image}" />
                  </a>
              </div> 
              `;
      }
    });

    galleryBodyHome.innerHTML = childGallery;
  } catch (error) {
    console.log(error);
  }
}
fetchGallery();

async function addReservation() {
  let body = document.querySelector("#reservationForm");

  const name = body.querySelector("#name");
  const phone = body.querySelector("#phone");
  const date = body.querySelector("#date");
  const time = body.querySelector("#time");
  const guest = body.querySelector("#guest");
  const email = body.querySelector("#email");
  const message = body.querySelector("#message");

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
document.querySelector("#reservationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addReservation();
});
