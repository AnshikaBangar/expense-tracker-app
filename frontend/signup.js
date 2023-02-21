const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signup = document.getElementById("signup");
const error = document.getElementById("error");

signup.addEventListener("click", submitSignup);

async function submitSignup(e) {
  e.preventDefault();
  let signUpDetails = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };
  const data = await axios.post("http://localhost:3000/signup", signUpDetails);
  console.log(data);
  if (data.data.Error) {
    const text = document.createTextNode(
      `User already exist..please signup with new Email`
    );
    error.appendChild(text);
    error.style.color = "red";
    console.log(error);
    setTimeout(() => {
      error.removeChild(text);
    }, 3000);
  } else {
    console.log("No error found");
  }
}
