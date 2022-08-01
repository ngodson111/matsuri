document
  .querySelector("#changepassword .modal-content .footer .buttons button")
  .addEventListener("click", async () => {
    const body = document.querySelector("#changepassword .modal-content .body");

    const oldPassword = body.querySelector("#oldpassword");
    const newPassword = body.querySelector("#newpassword");
    const confirmPassword = body.querySelector("#confirmpassword");

    if (!oldPassword.value || !newPassword.value || !confirmPassword.value)
      return alert("Please fill all fields");

    if (newPassword.value !== confirmPassword.value)
      return alert("Please confirm password");

    const formdata = {
      oldpassword: oldPassword.value,
      newpassword: newPassword.value,
    };

    try {
      const response = await fetch("./api/changepassword.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const responsedata = await response.json();

      if (responsedata !== true) return alert(responsedata);

      location.href = "../auth/signout.php";
    } catch (error) {
      console.log(error);
    }
  });
