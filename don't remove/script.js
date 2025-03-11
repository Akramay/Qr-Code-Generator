const form = document.getElementById('form')
const email_input = document.getElementById('user') 
const password_input = document.getElementById('pass') 
const confirm_password_input = document.querySelector("input[name='confirm_password']") 
const error_message = document.getElementById('error-message') 

form.addEventListener('submit', (e) => {
  let errors = []

  if (confirm_password_input) {
    // If confirm password field exists, we are in signup
    errors = getSignupFormErrors(email_input.value, password_input.value, confirm_password_input.value)
  } else {
    // Otherwise, we are in login
    errors = getLoginFormErrors(email_input.value, password_input.value)
  }

  if (errors.length > 0) {
    e.preventDefault() 
    error_message.innerText = errors.join(". ")
  }
})

// **Signup Validation**
function getSignupFormErrors(email, password, confirmPassword) {
  let errors = []

  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password !== confirmPassword) {
    errors.push('Passwords do not match')
    password_input.parentElement.classList.add('incorrect')
    confirm_password_input.parentElement.classList.add('incorrect')
  }

  return errors
}

// **Login Validation**
function getLoginFormErrors(email, password) {
  let errors = []

  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors
}

// **Remove error styling when typing**
const allInputs = [email_input, password_input, confirm_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})
