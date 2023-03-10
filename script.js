function showmobnav() {
    document.getElementById('mobile-nav').style.top = "0"
}
function hidemobnav() {
    document.getElementById('mobile-nav').style.top = "-206px"
}
function Movies() {
    location.reload()
}
var movieCon = document.querySelector('#all-movies-con')

let cardid=0;
var cpage_tren_mov = 1
var cpage_pop_mov = 1
var cpage_upcom_mov = 1
var cpage_pop_tv = 1
var cpage_tday_tv = 1
var cpage_top_tv = 1

var url = 'https://api.themoviedb.org/3/trending/all/week?api_key=a167e0fe3323e20de0173ac084d9e919&page=1'

function fetchApiData(link) {

    fetch(link).then(response => {
        return response.json();
    }).then(data => {
        createMovie(data)
    })
}
fetchApiData(url)

var active_now = document.getElementById("tv-shows")
var active_then = document.getElementById("movies")
var load_more = document.getElementById('load-more')
function loadMore() {
    if (active_then.classList.contains('active-now')) {

        if (load_more.classList.contains('trending')) {
            url = `https://api.themoviedb.org/3/trending/all/week?api_key=a167e0fe3323e20de0173ac084d9e919&page=${++cpage_tren_mov}`
        }
        else if (load_more.classList.contains('popular')) {
            url = `
        https://api.themoviedb.org/3/movie/popular?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=${++cpage_pop_mov}`
        }
        else {
            url = `
        https://api.themoviedb.org/3/movie/upcoming?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=${++cpage_upcom_mov}`
        }
    }
    else {

        if (load_more.classList.contains('popular_tv')) {
            url = `https://api.themoviedb.org/3/tv/popular?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=${++cpage_pop_tv}`
        }
        else if (load_more.classList.contains('airing_today')) {
            url = `
            https://api.themoviedb.org/3/tv/airing_today?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=${++cpage_tday_tv}`
        }
        else {
            url = `
            https://api.themoviedb.org/3/tv/top_rated?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=${++cpage_top_tv}`
        }
    }
    fetchApiData(url)
}

function showoverview(id){
   var ac=document.getElementById(id)
  ac.nextElementSibling.style.display="block"
}

function hideoverview(id){
    var bc=document.getElementById(id)
    bc.nextElementSibling.style.display="none"
 }

function shoHidOv(id){
    var ec=document.getElementById(id)
    if (ec.previousElementSibling.style.display=="none") {
        ec.previousElementSibling.style.display="block"
        ec.innerHTML="Hide Overview"
    } else {
        ec.previousElementSibling.style.display="none"
        ec.innerHTML="Show Overview"
    }
}
function createMovie(data) {
    if (data.total_results == 0) {
        movieCon.innerHTML = 'Results not found'
    } else {
        data.results.forEach((val) => {
            var imgpath = "https://www.themoviedb.org/t/p/w220_and_h330_face" + val.poster_path
            var releaseDate
            var title
            var overv

            if(val.overview=="")
            overv="Not Available"
            else
            overv=val.overview

            if (val.title == undefined)
                title = val.name
            else
                title = val.title

            if (active_then.classList.contains('active-now')) {
                var movie_info_link = `https://www.themoviedb.org/${val.media_type}/${val.id}-${title.toLowerCase().replace(/[\s/]+/g, '-')}`
            }
            else {
                var movie_info_link = `https://www.themoviedb.org/tv/${val.id}-${title.toLowerCase().replace(/[\s/]+/g, '-')}`
            }

            if (val.first_air_date == undefined)
                releaseDate = val.release_date
            else
                releaseDate = val.first_air_date
           
            var movie = `<div class="movie">
                    <img class="movie-poster" id="card-${cardid}"  onmouseover="showoverview('card-${cardid}')" onmouseout="hideoverview('card-${cardid}')" src="${imgpath}" alt="Poster">
                    <p class="movie-overview">${overv.substring(0, 207)}</p>
                    <button class="overview-btn" id="btn-${cardid}" onclick="shoHidOv('btn-${cardid}')"   >Show Overview</button>
                    <p class="movie-name"><a href=${movie_info_link}>${title}</a></p>
                    <p class="dateofmovies">${releaseDate}</p>
                    
                    </div>`
            movieCon.innerHTML += movie
            cardid++

        })
    }
}






var nowmovieshow = document.getElementsByClassName('nav-movie')
var heading_now_showing = document.getElementById('now-showing')

function loadTrending(data) {
    for (i of nowmovieshow) {
        i.classList.remove('active-tab')
       
    }
    removeClass()
    load_more.classList.add('trending')
    event.currentTarget.classList.add("active-tab");
    heading_now_showing.innerHTML = 'Trending Movies'
    url = "https://api.themoviedb.org/3/trending/all/week?api_key=a167e0fe3323e20de0173ac084d9e919&page=1"
    movieCon.innerHTML = ''
    fetchApiData(url)
}

function loadPopular(data) {
    for (i of nowmovieshow) {
        i.classList.remove('active-tab')
        
    }
    removeClass()
    load_more.classList.add('popular')
    event.currentTarget.classList.add("active-tab");
    heading_now_showing.innerHTML = 'Popular Movies'
    url = "https://api.themoviedb.org/3/movie/popular?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=1"

    movieCon.innerHTML = ''
    fetchApiData(url)
}


function loadUpcoming(data) {
    for (i of nowmovieshow) {
        i.classList.remove('active-tab')
       
    }
    removeClass()
    load_more.classList.add('upcoming')
    event.currentTarget.classList.add("active-tab");
    heading_now_showing.innerHTML = 'Upcoming Movies'
    url = "https://api.themoviedb.org/3/movie/upcoming?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=2"
    movieCon.innerHTML = ''
    fetchApiData(url)
}



var nowtvshow = document.getElementsByClassName('nav-tv')
function removeClass() {
    load_more.classList.remove('popular')
    load_more.classList.remove('trending')
    load_more.classList.remove('upcoming')
    load_more.classList.remove('popular_tv')
    load_more.classList.remove('airing_today')
    load_more.classList.remove('top_rated')
}
function TvShows() {

    var toHide = document.getElementById("movie-nav")
    var toShow = document.getElementById("tv-nav")
    active_then.classList.remove("active-now")
    active_now.classList.add("active-now")
    toHide.classList.remove("active-list")
    toShow.classList.add("active-list")
    loadTv()
    nowtvshow[0].classList.add('active-tab')
}


function loadTv() {
    for (i of nowtvshow) {
        i.classList.remove('active-tab')
    }
    removeClass()
    load_more.classList.add('popular-tv')
    event.currentTarget.classList.add("active-tab");
    heading_now_showing.innerHTML = 'Popular TV Shows'
    url = "https://api.themoviedb.org/3/tv/popular?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=1"
    movieCon.innerHTML = ''
    fetchApiData(url)
}

function loadToday() {
    for (i of nowtvshow) {
        i.classList.remove('active-tab')
    }
    removeClass()
    load_more.classList.add('airing-today')
    event.currentTarget.classList.add("active-tab");
    heading_now_showing.innerHTML = 'Airing Today Shows'
    url = "https://api.themoviedb.org/3/tv/airing_today?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=1"
    movieCon.innerHTML = ''
    fetchApiData(url)
}

function loadTop() {
    for (i of nowtvshow) {
        i.classList.remove('active-tab')
    }
    removeClass()
    load_more.classList.add('top-rated')
    event.currentTarget.classList.add("active-tab");
    heading_now_showing.innerHTML = 'Top-Rated TV Shows'

    url = "https://api.themoviedb.org/3/tv/top_rated?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=1"
    movieCon.innerHTML = ''
    fetchApiData(url)
}

function removeLine() {
    var nvm = document.getElementsByClassName("nav-movie")
    for (let i = 0; i < nvm.length; i++) {
        nvm[i].classList.remove('active-tab')
    }
    var nvtv = document.getElementsByClassName("nav-tv")
    for (let i = 0; i < nvtv.length; i++) {
        nvtv[i].classList.remove('active-tab')
    }
}

//searching for a movie of tv show
function search() {
    var toSearch = document.getElementById('search-input')
    url = `https://api.themoviedb.org/3/search/multi?api_key=a167e0fe3323e20de0173ac084d9e919&language=en-US&page=1&include_adult=false&query=${toSearch.value}`
    movieCon.innerHTML = ''
    toSearch.value = ''
    heading_now_showing.innerHTML = 'Search Results'
    removeLine()
    event.preventDefault()
    fetchApiData(url)
}

//Showing and Hideing Navbar onscroll
let nav_bar =document.getElementById('nav-bar')
let lastScrollPos=window.pageYOffset

window.onscroll=function (){
   
       let currentScrollPos=window.pageYOffset
        if(currentScrollPos>lastScrollPos)
        {
            nav_bar.style.top="-82px" 
        }
        else{
            nav_bar.style.top="0" 
        }

        lastScrollPos=currentScrollPos
   

}