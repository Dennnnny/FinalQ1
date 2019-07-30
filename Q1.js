const movieType = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const data = []
const dataPanel = document.querySelector('#data-panel')
const menu = document.querySelector('#menu')
let isLabel = false

axios.get(INDEX_URL)
  .then((response) => {
    data.push(...response.data.results)
    // displayData()
    displayMenu(movieType)
    // displayMovieLabel()

  })
  .catch((err) => console.log(err))


menu.addEventListener('click', function () {


  let movieId = event.target.dataset.id
  data.forEach(function (movie) {
    if (movie.genres.includes(Number(movieId))) {
      isLabel = true
    }
  })

  if (isLabel) {
    displayMovieLabelList(movieId)
  } else {
    clearMovieData()
  }

  for (element of event.target.parentElement.children) {
    element.classList.remove('active')
  }
  // event.target.parentElement.children.forEach(element => element.classList.remove('active'))
  // console.log(event.target.parentElement.children[0])
  event.target.classList.add('active')
  isLabel = false
})




function displayData(data) {
  let htmlContent = ''
  data.forEach(function (item) {
    htmlContent += `
      <div class="col-sm-4">
        <div class="card mb-2">
          <img class="card-img" src="${POSTER_URL}${item.image}">
            <div class="card-body movie-item-body">
            <h5>${item.title}</h5>
            <div class="movie-label">${item.genres}</div>
            </div>
        </div>
      </div>
      `
    dataPanel.innerHTML = htmlContent
  })
}


function displayMenu(lists) {
  let htmlContent = `<div">`
  for (item in lists) {
    htmlContent += `
    <li class="list-group-item" data-id="${item}"> ${lists[item]} </li>
    ` //console.log(lists[item])
  }
  htmlContent += `</div>`
  menu.innerHTML = htmlContent
}

function displayMovieLabel() {
  const movieLabel = document.querySelectorAll('.movie-label')

  movieLabel.forEach(function (labelItem) {
    // console.log(labelItem)
    newLabel = (labelItem.textContent).split(',')
    labelItem.innerHTML = ''
    newLabel.forEach((label) => {
      labelItem.innerHTML += `<div class="d-inline btn-light mr-2"> ${movieType[label]} </div>`
    })

  })
}
function displayMovieLabelList(id) {
  let movieData = []

  data.forEach(function (item) {
    if (item.genres.some(itemId => itemId === Number(id))) {
      // console.log(item)
      movieData.push(item)
    }
  })
  displayData(movieData)
  displayMovieLabel()
}

function clearMovieData() {
  dataPanel.innerHTML = `<div class="h2 text-center p-3 m-3"> No Movie Found </div>`
}