let karaokereservationstate = {
  originalSet: [],
  querySet: [],
  page: 1,
  rows: 4,
  window: 5,
};

function karaokereservation_Pagination(querySet, page, rows) {
  let trimstart = (page - 1) * rows;
  let trimend = trimstart + rows;
  let trimmedData = querySet.slice(trimstart, trimend);
  let pages = Math.ceil(querySet.length / rows);
  return {
    querySet: trimmedData,
    pages: pages,
  };
}

function karaokereservation_pageBtn(pages) {
  let wrapper = document.querySelector("#page4 .pagefooter .pagination");
  wrapper.innerHTML = "";

  let maxLeft =
    karaokereservationstate.page -
    Math.floor(karaokereservationstate.window / 2);
  let maxRight =
    karaokereservationstate.page +
    Math.floor(karaokereservationstate.window / 2);
  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = karaokereservationstate.window;
  }
  if (maxRight > pages) {
    maxLeft = pages - (karaokereservationstate.window - 1);
    maxRight = pages;
    if (maxLeft < 1) {
      maxLeft = 1;
    }
  }
  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<button value='${page}' class = '${
      karaokereservationstate.page === page ? "active page" : "page"
    }'>${page}</button>`;
  }

  if (karaokereservationstate.page != 1) {
    wrapper.innerHTML =
      `<button value='1'><i class="fal fa-angle-left"></i></button>` +
      wrapper.innerHTML;
  }
  if (karaokereservationstate.page != pages) {
    wrapper.innerHTML += `<button value='${pages}'><i class="fal fa-angle-right"></i></button>`;
  }

  //eventhandeling
  for (let k = 0; k < wrapper.children.length; k++) {
    wrapper.children[k].addEventListener("click", (e) => {
      document.querySelector("#page4 .pagebody table tbody").innerHTML = "";
      karaokereservationstate.page = parseInt(e.target.value);
      //again build
      karaokereservation_buildData();
    });
  }
}

async function karaokereservation_buildData() {
  let element = document.querySelector("#page4 .pagebody table tbody");

  element.innerHTML = "";
  //pagination function
  let data = karaokereservation_Pagination(
    karaokereservationstate.querySet,
    karaokereservationstate.page,
    karaokereservationstate.rows
  );

  list = data.querySet;
  for (let b = 0; b < list.length; b++) {
    let row = `
        <tr>
          <td>${b + 1}</td>
          <td>${list[b].name}</td>
          <td><a href="tel:${list[b].phone}">${list[b].phone}</a></td>
          <td><a href="mailto:${list[b].email}">${list[b].email}</a></td>
          <td class="eye"><button data-toggle='modal' data-target='#reservationdescription${
            list[b].uid
          }'><i class="fal fa-eye mr-3"></i></button></td>
          <td>${list[b].date}</td>
          <td>${list[b].time}</td>
          <td>${list[b].guest}</td>
          <td>${list[b].inserted.split(" ")[0]}</td>
          <td class="action">
            <button data-toggle='modal' data-target='#deletereservation${
              list[b].uid
            }'><i class="fal fa-trash"></i></button>
          </td>

          <!-- Delete Modal -->
          <div class="modal fade deletereservation" id="deletereservation${
            list[b].uid
          }" tabindex="-1" role="dialog"
              aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                      <div class="heading">
                          <span>Confirm</span>
                          <div class="close" data-dismiss="modal">
                              <i class="fal fa-times"></i>
                          </div>
                      </div>
                      <div class="body p-3">
                          <div class="message">
                              Are you sure you want to delete this Karaoke Reservation?
                          </div>
                      </div>
                      <div class="footer">
                          <div class="buttons">
                              <button data-dismiss="modal" onclick="deleteKaraokeReservation('${
                                list[b].uid
                              }')"><i class="fal fa-trash"></i></button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="modal fade descriptionModal" id="reservationdescription${
            list[b].uid
          }" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="heading">
                      <span>Karaoke Reservation Description</span>
                      <div class="close" data-dismiss="modal">
                          <i class="fal fa-times"></i>
                      </div>
                  </div>
                  <div class="body p-3">
                    <p>${list[b].description}</p>
                  </div>
                </div>
            </div>
        </div>
        </tr>
      `;
    element.innerHTML += row;
  }

  //button
  karaokereservation_pageBtn(data.pages);
}

document
  .querySelector("#page4 .pageheading .actions .search input")
  .addEventListener("keyup", (e) => {
    let search = e.target.value.toLowerCase();
    let data = karaokereservationstate.originalSet;
    let filtered = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.phone.toLowerCase().includes(search) ||
        item.date.toLowerCase().includes(search) ||
        item.time.toLowerCase().includes(search) ||
        item.guest.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)
      );
    });
    karaokereservationstate.querySet = filtered;
    karaokereservation_buildData();
  });

async function fetchKaraokeReservation() {
  try {
    let response = await fetch("./api/viewdata.php", {
      method: "POST",
      body: JSON.stringify({ table: "karaokereservation" }),
    });
    let responsedata = await response.json();

    //getting todays data
    let date = new Date();
    date = `${date.getFullYear()}-${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;

    const total = responsedata
      .map((i) => i.date === date)
      .reduce((a, b) => a + b, 0);

    document.querySelector(
      "#page1 .pagebody #karaokereservationtotal span"
    ).innerText = total;

    karaokereservationstate.querySet = responsedata;
    karaokereservationstate.originalSet = responsedata;
    karaokereservation_buildData();
  } catch (error) {
    console.log(err);
  }
}
fetchKaraokeReservation();

async function deleteKaraokeReservation(id) {
  if (!id) return alert("Error occured!");

  console.log(id);
  try {
    let response = await fetch("./api/deletedata.php", {
      method: "POST",
      body: JSON.stringify({
        array: ["karaokereservation", id],
      }),
    }).then((res) => res.json());

    if (response === true) {
      alert("Karaoke Reservation Deleted Successfully");
      fetchKaraokeReservation();
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
