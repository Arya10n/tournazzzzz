'use strict'

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
  elem.classList.toggle('active')
}

/**
 * navbar variables
 */

const navbar = document.querySelector('[data-nav]')
const navOpenBtn = document.querySelector('[data-nav-open-btn]')
const navCloseBtn = document.querySelector('[data-nav-close-btn]')
const overlay = document.querySelector('[data-overlay]')

const navElemArr = [navOpenBtn, navCloseBtn, overlay]

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener('click', function () {
    elemToggleFunc(navbar)
    elemToggleFunc(overlay)
    elemToggleFunc(document.body)
  })
}

/**
 * go top
 */

const goTopBtn = document.querySelector('[data-go-top]')

window.addEventListener('scroll', function () {
  if (window.scrollY >= 800) {
    goTopBtn.classList.add('active')
  } else {
    goTopBtn.classList.remove('active')
  }
})

// animation

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach(el => observer.observe(el))

// login

let loginStatus
setTimeout(async () => {
  const response = await fetch('http://localhost:3000/api/login')
  const data = await response.json()
  loginStatus = data.login
  console.log('Haa ho raha bsdk')

  let loginbtn = document.getElementById('login')
  // loginbtn.textContent = 'hello'
  console.log(loginStatus)
  if (loginStatus) {
    loginbtn.textContent = 'LO-GOUT'
    loginbtn.href = 'http://localhost:3000/auth/logout'
  } else {
    loginbtn.textContent = 'LOG-IN'
    loginbtn.href = 'http://localhost:3000/auth'
  }
}, 0)
