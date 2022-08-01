let contactstate = {
  originalSet: [],
  querySet: [],
  page: 1,
  rows: 4,
  window: 5,
};

function contact_Pagination(querySet, page, rows) {
  let trimstart = (page - 1) * rows;
  let trimend = trimstart + rows;
  let trimmedData = querySet.slice(trimstart, trimend);
  let pages = Math.ceil(querySet.length / rows);
  return {
    querySet: trimmedData,
    pages: pages,
  };
}

function contact_pageBtn(pages) {
  let wrapper = document.querySelector("#page6 .pagefooter .pagination");
  wrapper.innerHTML = "";

  let maxLeft = contactstate.page - Math.floor(contactstate.window / 2);
  let maxRight = contactstate.page + Math.floor(contactstate.window / 2);
  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = contactstate.window;
  }
  if (maxRight > pages) {
    maxLeft = pages - (contactstate.window - 1);
    maxRight = pages;
    if (maxLeft < 1) {
      maxLeft = 1;
    }
  }
  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<button value='${page}' class = '${
      contactstate.page === page ? "active page" : "page"
    }'>${page}</button>`;
  }

  if (contactstate.page != 1) {
    wrapper.innerHTML =
      `<button value='1'><i class="fal fa-angle-left"></i></button>` +
      wrapper.innerHTML;
  }
  if (contactstate.page != pages) {
    wrapper.innerHTML += `<button value='${pages}'><i class="fal fa-angle-right"></i></button>`;
  }

  //eventhandeling
  for (let k = 0; k < wrapper.children.length; k++) {
    wrapper.children[k].addEventListener("click", (e) => {
      document.querySelector("#page6 .pagebody table tbody").innerHTML = "";
      contactstate.page = parseInt(e.target.value);
      //again build
      contact_buildData();
    });
  }
}

async function contact_buildData() {
  let element = document.querySelector("#page6 .pagebody table tbody");

  element.innerHTML = "";
  //pagination function
  let data = contact_Pagination(
    contactstate.querySet,
    contactstate.page,
    contactstate.rows
  );

  list = data.querySet;
  for (let b = 0; b < list.length; b++) {
    let row = `
        <tr>
          <td>${b + 1}</td>
          <td>${list[b].name}</td>
          <td><a href="mailto:${list[b].email}">${list[b].email}</a></td>
          <td class="eye"><button data-toggle='modal' data-target='#contactdescription${
            list[b].uid
          }'><i class="fal fa-eye mr-3"></i></button></td>
          <td>${list[b].inserted.split(" ")[0]}</td>
          <td class="action">
            <button data-toggle='modal' data-target='#deletecontact${
              list[b].uid
            }'><i class="fal fa-trash"></i></button>
          </td>

          <!-- Delete Modal -->
          <div class="modal fade deletecontact" id="deletecontact${
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
                              Are you sure you want to delete this Contact?
                          </div>
                      </div>
                      <div class="footer">
                          <div class="buttons">
                              <button data-dismiss="modal" onclick="deleteContact('${
                                list[b].uid
                              }')"><i class="fal fa-trash"></i></button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="modal fade descriptionModal" id="contactdescription${
            list[b].uid
          }" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="heading">
                      <span>Contact Description</span>
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
  contact_pageBtn(data.pages);
}

document
  .querySelector("#page6 .pageheading .actions .search input")
  .addEventListener("keyup", (e) => {
    let search = e.target.value.toLowerCase();
    let data = contactstate.originalSet;
    let filtered = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)
      );
    });
    contactstate.querySet = filtered;
    contact_buildData();
  });

async function fetchContact() {
  try {
    let response = await fetch("./api/viewdata.php", {
      method: "POST",
      body: JSON.stringify({ table: "contact" }),
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
      .map((i) => i.inserted.split(" ")[0] === date)
      .reduce((a, b) => a + b, 0);

    document.querySelector("#page1 .pagebody #contacttotal span").innerText =
      total;

    contactstate.querySet = responsedata;
    contactstate.originalSet = responsedata;
    contact_buildData();
  } catch (error) {
    console.log(err);
  }
}
fetchContact();

async function deleteContact(id) {
  if (!id) return alert("Error occured!");

  try {
    let response = await fetch("./api/deletedata.php", {
      method: "POST",
      body: JSON.stringify({
        array: ["contact", id],
      }),
    }).then((res) => res.json());

    if (response === true) {
      alert("Contact Deleted Successfully");
      fetchContact();
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
