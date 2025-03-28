const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')




function getLoginFormErrors(email, password){
  let errors = []

  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})



function validateSignupForm(){

  

  let uname = document.getElementById('user').value;
  if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(uname)){
   
    document.getElementById("uname_box").style.color="red";
    document.getElementById("err_msg").innerHTML="Email not valid!"
    return false;

  }
  let psswd = document.getElementById('password').value;
  if(!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(psswd) ){
    document.getElementById("password").style.color="red";
    document.getElementById("err_msg").innerHTML="Your password is too weak!"
    return false;

  }
  let cnfrm_psswd = document.getElementById('confirm_password').value;
  if(cnfrm_psswd != psswd){
    document.getElementById("cnfmpsswd_box").style.color="red";
    document.getElementById("err_msg").innerHTML="Your passwords does not match!"
    return false;

  }


}