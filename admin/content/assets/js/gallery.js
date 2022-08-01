let gallerystate = {
  originalSet: [],
  querySet: [],
  page: 1,
  rows: 4,
  window: 5,
};

function gallery_Pagination(querySet, page, rows) {
  let trimstart = (page - 1) * rows;
  let trimend = trimstart + rows;
  let trimmedData = querySet.slice(trimstart, trimend);
  let pages = Math.ceil(querySet.length / rows);
  return {
    querySet: trimmedData,
    pages: pages,
  };
}

function gallery_pageBtn(pages) {
  let wrapper = document.querySelector("#page5 .pagefooter .pagination");
  wrapper.innerHTML = "";

  let maxLeft = gallerystate.page - Math.floor(gallerystate.window / 2);
  let maxRight = gallerystate.page + Math.floor(gallerystate.window / 2);
  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = gallerystate.window;
  }
  if (maxRight > pages) {
    maxLeft = pages - (gallerystate.window - 1);
    maxRight = pages;
    if (maxLeft < 1) {
      maxLeft = 1;
    }
  }
  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<button value='${page}' class = '${
      gallerystate.page === page ? "active page" : "page"
    }'>${page}</button>`;
  }

  if (gallerystate.page != 1) {
    wrapper.innerHTML =
      `<button value='1'><i class="fal fa-angle-left"></i></button>` +
      wrapper.innerHTML;
  }
  if (gallerystate.page != pages) {
    wrapper.innerHTML += `<button value='${pages}'><i class="fal fa-angle-right"></i></button>`;
  }

  //eventhandeling
  for (let k = 0; k < wrapper.children.length; k++) {
    wrapper.children[k].addEventListener("click", (e) => {
      document.querySelector("#page5 .pagebody table tbody").innerHTML = "";
      gallerystate.page = parseInt(e.target.value);
      //again build
      gallery_buildData();
    });
  }
}

async function gallery_buildData() {
  let element = document.querySelector("#page5 .pagebody table tbody");

  element.innerHTML = "";
  //pagination function
  let data = gallery_Pagination(
    gallerystate.querySet,
    gallerystate.page,
    gallerystate.rows
  );

  list = data.querySet;
  for (let b = 0; b < list.length; b++) {
    let row = `
        <tr>
          <td>${b + 1}</td>
          <td>${list[b].state}</td>
          <td><img id="tableimage" src="./public/gallery/${list[b].image}"></td>
          <td>${list[b].inserted.split(" ")[0]}</td>
          <td class="action">
            <button data-toggle='modal' data-target='#deletegallery${
              list[b].uid
            }'><i class="fal fa-trash"></i></button>
          </td>

          <!-- Delete Modal -->
          <div class="modal fade deletegallery" id="deletegallery${
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
                              Are you sure you want to delete this Image?
                          </div>
                      </div>
                      <div class="footer">
                          <div class="buttons">
                              <button data-dismiss="modal" onclick="deleteGallery('${
                                list[b].uid
                              }','${
      list[b].image
    }')"><i class="fal fa-trash"></i></button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </tr>
      `;
    element.innerHTML += row;
  }

  //button
  gallery_pageBtn(data.pages);
}

document
  .querySelector("#page5 .pageheading .actions .search input")
  .addEventListener("keyup", (e) => {
    let search = e.target.value.toLowerCase();
    let data = gallerystate.originalSet;
    let filtered = data.filter((item) => {
      return item.state.toLowerCase().includes(search);
    });
    gallerystate.querySet = filtered;
    gallery_buildData();
  });

//Insert Slider
const galleryModal = document.querySelector(
  "#page5 .pagemodal #addgallery .modal-content"
);
galleryModal
  .querySelector(".footer button")
  .addEventListener("click", async () => {
    const type = galleryModal.querySelector(".body #imagetype");
    const image = galleryModal.querySelector(".body #image");

    if (type.value == "") return alert("Please fill all the fields");

    if (image.files.length < 1) return alert("Image is required");

    let file = image.files[0];

    if (file === undefined) return alert("Please select an image");
    let scope = ["png", "jpeg", "jpg"];
    if (!scope.includes(file.name.split(".")[1].toLowerCase()))
      return alert("Unsupported Type!");

    let formData = new FormData();
    formData.append("type", type.value);
    formData.append("image", file);

    try {
      let response = await fetch("./api/addgallery.php", {
        method: "POST",
        body: formData,
      });
      let responsedata = await response.json();

      if (!responsedata) return alert(responsedata);

      fetchGallery();
      type.value = "";
      image.value = "";

      return alert("Gallery Added Successfully");
    } catch (error) {
      console.log(error);
    }
  });

async function fetchGallery() {
  try {
    let response = await fetch("./api/viewdata.php", {
      method: "POST",
      body: JSON.stringify({ table: "gallery" }),
    });
    let responsedata = await response.json();

    document.querySelector("#page1 .pagebody #imagestotal span").innerText =
      responsedata.length;

    gallerystate.querySet = responsedata;
    gallerystate.originalSet = responsedata;
    console.log(responsedata);
    gallery_buildData();
  } catch (error) {
    console.log(err);
  }
}
fetchGallery();

async function deleteGallery(id, image) {
  if (!id || !image) return alert("Error occured!");

  try {
    let response = await fetch("./api/deletedata.php", {
      method: "POST",
      body: JSON.stringify({
        array: ["gallery", id],
      }),
    }).then((res) => res.json());

    if (response === true) {
      let files = "../public/gallery/" + image;
      let path = new FormData();
      path.append("path", files);

      let response2 = await fetch("./api/delete.php", {
        method: "post",
        body: path,
      }).then((res) => res.json());

      if (response2 === true) {
        alert("Gallery Deleted Successfully");
        fetchGallery();
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
