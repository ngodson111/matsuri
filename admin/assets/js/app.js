document
  .querySelector(".wrapper .buttons button")
  .addEventListener("click", (e) => {
    let username = document.querySelector(
      ".wrapper .login input[type='text']"
    ).value;
    let password = document.querySelector(
      ".wrapper .login input[type='password']"
    ).value;

    if (!username || !password) return alert("Username or password is empty");

    console.log(username, password);
  });

document
  .querySelector(".wrapper .buttons button")
  .addEventListener("click", async () => {
    const username = document.querySelector(
      ".wrapper .login input[type='text']"
    ).value;
    const password = document.querySelector(
      ".wrapper .login input[type='password']"
    ).value;

    if (!username || !password) return alert("Username or password is empty");

    console.log(username, password);

    try {
      const response = await fetch("./auth/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (data == "unauthorized") return alert("Unauthorized");

      location.href = "./content/index.php";
    } catch (error) {
      console.log(error);
    }
  });

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    document.querySelector(".wrapper .buttons button").click();
  }
});
