let sliderstate = {
  originalSet: [],
  querySet: [],
  page: 1,
  rows: 4,
  window: 5,
};

function slider_Pagination(querySet, page, rows) {
  let trimstart = (page - 1) * rows;
  let trimend = trimstart + rows;
  let trimmedData = querySet.slice(trimstart, trimend);
  let pages = Math.ceil(querySet.length / rows);
  return {
    querySet: trimmedData,
    pages: pages,
  };
}

function slider_pageBtn(pages) {
  let wrapper = document.querySelector("#page3 .pagefooter .pagination");
  wrapper.innerHTML = "";

  let maxLeft = sliderstate.page - Math.floor(sliderstate.window / 2);
  let maxRight = sliderstate.page + Math.floor(sliderstate.window / 2);
  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = sliderstate.window;
  }
  if (maxRight > pages) {
    maxLeft = pages - (sliderstate.window - 1);
    maxRight = pages;
    if (maxLeft < 1) {
      maxLeft = 1;
    }
  }
  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<button value='${page}' class = '${
      sliderstate.page === page ? "active page" : "page"
    }'>${page}</button>`;
  }

  if (sliderstate.page != 1) {
    wrapper.innerHTML =
      `<button value='1'><i class="fal fa-angle-left"></i></button>` +
      wrapper.innerHTML;
  }
  if (sliderstate.page != pages) {
    wrapper.innerHTML += `<button value='${pages}'><i class="fal fa-angle-right"></i></button>`;
  }

  //eventhandeling
  for (let k = 0; k < wrapper.children.length; k++) {
    wrapper.children[k].addEventListener("click", (e) => {
      document.querySelector("#page3 .pagebody table tbody").innerHTML = "";
      sliderstate.page = parseInt(e.target.value);
      //again build
      slider_buildData();
    });
  }
}

async function slider_buildData() {
  let element = document.querySelector("#page3 .pagebody table tbody");

  element.innerHTML = "";
  //pagination function
  let data = slider_Pagination(
    sliderstate.querySet,
    sliderstate.page,
    sliderstate.rows
  );

  list = data.querySet;
  for (let b = 0; b < list.length; b++) {
    let row = `
        <tr>
          <td>${b + 1}</td>
          <td>${list[b].title}</td>
          <td class="eye"><button data-toggle='modal' data-target='#sliderdescription${
            list[b].uid
          }'><i class="fal fa-eye mr-3"></i></button></td>
          <td><img id="tableimage" src="./public/slider/${list[b].image}"></td>
          <td>${list[b].inserted.split(" ")[0]}</td>
          <td class="action">
            <button data-toggle='modal' data-target='#deleteslider${
              list[b].uid
            }'><i class="fal fa-trash"></i></button>
          </td>

          <!-- Delete Modal -->
          <div class="modal fade deleteslider" id="deleteslider${
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
                              Are you sure you want to delete this Slider?
                          </div>
                      </div>
                      <div class="footer">
                          <div class="buttons">
                              <button data-dismiss="modal" onclick="deleteSlider('${
                                list[b].uid
                              }','${
      list[b].image
    }')"><i class="fal fa-trash"></i></button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="modal fade descriptionModal" id="sliderdescription${
            list[b].uid
          }" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="heading">
                      <span>Slider Description</span>
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
  slider_pageBtn(data.pages);
}

document
  .querySelector("#page3 .pageheading .actions .search input")
  .addEventListener("keyup", (e) => {
    let search = e.target.value.toLowerCase();
    let data = sliderstate.originalSet;
    let filtered = data.filter((item) => {
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    });
    sliderstate.querySet = filtered;
    slider_buildData();
  });

//Insert Slider
const sliderModal = document.querySelector(
  "#page3 .pagemodal #addslider .modal-content"
);
sliderModal
  .querySelector(".footer button")
  .addEventListener("click", async () => {
    const title = sliderModal.querySelector(".body #title");
    const image = sliderModal.querySelector(".body #image");
    const description = sliderModal.querySelector(".body #description");

    if (title.value == "" || description.value == "")
      return alert("Please fill all the fields");

    if (image.files.length < 1) return alert("Image is required");

    let file = image.files[0];

    if (file === undefined) return alert("Please select an image");
    let scope = ["png", "jpeg", "jpg"];
    if (!scope.includes(file.name.split(".")[1].toLowerCase()))
      return alert("Unsupported Type!");

    let formData = new FormData();
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("image", file);

    try {
      let response = await fetch("./api/addslider.php", {
        method: "POST",
        body: formData,
      });
      let responsedata = await response.json();

      if (!responsedata) return alert(responsedata);

      fetchSlider();
      title.value = "";
      description.value = "";
      image.value = "";

      return alert("Slider Added Successfully");
    } catch (error) {
      console.log(error);
    }
  });

async function fetchSlider() {
  try {
    let response = await fetch("./api/viewdata.php", {
      method: "POST",
      body: JSON.stringify({ table: "slider" }),
    });
    let responsedata = await response.json();

    sliderstate.querySet = responsedata;
    sliderstate.originalSet = responsedata;
    console.log(responsedata);
    slider_buildData();
  } catch (error) {
    console.log(err);
  }
}
fetchSlider();

async function deleteSlider(id, image) {
  if (!id || !image) return alert("Error occured!");

  try {
    let response = await fetch("./api/deletedata.php", {
      method: "POST",
      body: JSON.stringify({
        array: ["slider", id],
      }),
    }).then((res) => res.json());

    if (response === true) {
      let files = "../public/slider/" + image;
      let path = new FormData();
      path.append("path", files);

      let response2 = await fetch("./api/delete.php", {
        method: "post",
        body: path,
      }).then((res) => res.json());

      if (response2 === true) {
        alert("Slider Deleted Successfully");
        fetchSlider();
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
