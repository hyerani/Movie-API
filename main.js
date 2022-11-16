

;(async () => {

  // 초기화 코드
  const moviesEl = document.querySelector('.movie-img')
  const moreBtnEl = document.querySelector('.more')
  // const loadingEl = document.querySelector('loading')

  const searchInput = document.querySelector('.search-input')
  const apply = document.querySelector('.apply')

  const typeSelect = document.querySelector('.type-select')
  const countSelect = document.querySelector('.count-select')
  const yearSelect = document.querySelector('.year-select')
  

  let page = 1;
  let title = '';
  let year = '';
  let type = typeSelect.value;
  let maxPage = -1

  if(maxPage <= 0) moreBtnEl.style.display = 'none'



  // 영화 api 가져오기
  async function getMovies(title = '', page = 1, type = 'movie', year = '') {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}&y=${year}`)
    const { Search: movies, totalResults } = await res.json()

    // 최대 페이지
    maxPage = Math.ceil(Number(totalResults) / 10)
    if (page >= maxPage) moreBtnEl.style.display = 'none'
    else { moreBtnEl.style.display = 'block' }

    return movies
  }


  // 영화 리스트 정보 출력
  function renderMovies(movies) {
    for (const movie of movies) {
        const el = document.createElement('div')
        el.classList.add('movie-el')
    
        const titleEl = document.createElement('div')
        titleEl.textContent = movie.Title
    
        const yearEl = document.createElement('span')
        yearEl.textContent = movie.Year
    
        const imgEl = document.createElement('img')
        if(movie.Poster === "N/A") {
          imgEl.src = "./img/no-Image.svg.png"
        } else {
          imgEl.src = movie.Poster
        }
        
        const idEl = document.createElement('div')
        idEl.classList.add('id-el')
        idEl.textContent = movie.imdbID

        titleEl.append(yearEl)
        el.append(imgEl, titleEl, idEl)
        moviesEl.append(el)
      }
  }

  moviesEl.addEventListener('click', () => {
    
  })


  // 영화 상세 정보 출력
  // function renderMovieDetail (movieId) {
  //   let id;
  //   let detail = await.getMoviedetail(id)

  //   if(!movieId) {
  //     id = location.hash.slice(1);
  //     return;
  //   } else {
  //     id = movieId;
  //   }
    
    
    
  //   imdbID
  // }


  // 상세정보 가져오기

  // window.addEventListener('hashchange', router)


  // 검색 가져오기 기능
  async function searchMovie (e) {
    e.preventDefault();
    title = searchInput.value;
    moviesEl.innerHTML = "";
    page = 1;
    year = yearSelect.value;
    type = typeSelect.value;
    const count = countSelect.value;
    for(let i = 1; i <= count; i += 1) {
      page = i;
      const movie = await getMovies(title, page, type, year);
      renderMovies(movie);
    }
  }


  // 년도별 
  for (let i = 2022; i >= 1985; i--) {
    const yearOption = document.createElement('option');
    yearOption.value = i;
    yearOption.textContent = i;
    yearSelect.append(yearOption)
  }


  // apply 버튼 검색
  apply.addEventListener('click', async (e) => {
   searchMovie(e);
  });


  // 엔터키 검색
  searchInput.addEventListener('keydown', async (e) => {
    if(e.key === 'Enter') {
      searchMovie(e);
    }
  });


  // 더보기 버튼
  moreBtnEl.addEventListener('click', async () => {
    const year = yearSelect.value;
    const type = typeSelect.value;
    const count = countSelect.value;
    for(let i = 1; i <= count; i += 1) {
      page += i
      const movie = await getMovies(title, page, type, year);
      renderMovies(movie);
    }
  })

})()









