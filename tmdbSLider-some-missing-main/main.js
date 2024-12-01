const apiKey = "453dc3102e45811c5c9106dae33ffc9a";

fetchLatestReleases(
  "#slider1",
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
);

fetchLatestReleases(
  "#slider2",
  `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
);

fetchLatestReleases(
  "#slider3",
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
);

async function fetchAny(url, splideListSelector) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length === 0) {
      alert("Results not found.");
      return;
    }
    const splideList = document.querySelector(splideListSelector);
    splideList.innerHTML = "";
    data.results.forEach((movie) => {
      if (movie.poster_path) {
        const slide = hoverInfo(movie); 
        splideList.appendChild(slide);
      }
    });
  } catch (err) {
    console.error("Error:", err); 
  }
}

function initializeSlider(sliderId) {
  new Splide(sliderId, {
    type: "loop",
    perPage: 4,
    centeredSlides: false,
    pagination: false,
  }).mount();
}

document.getElementById("searchButton").addEventListener("click", async () => {
  const input = document.getElementById("search").value.trim();
  if (!input) return;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`;
  await fetchAny(url, "#slider1 .splide__list");
  document.querySelector(".result").innerText = `Results for "${input}"`;
  initializeSlider("#slider1");
});

fetchLatestReleases();

async function fetchLatestReleases(sliderSelector, apiEndpoint) {
  try {
    const splideListSelector = `${sliderSelector} .splide__list`; 
    await fetchAny(apiEndpoint, splideListSelector);
    initializeSlider(sliderSelector);
  } catch (err) {
    console.error(`Error fetching data for ${sliderSelector}:`, err);
  }
}

function hoverInfo(movie) {
  const imageSource = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const slide = document.createElement("div");
  slide.classList.add("card", "splide__slide");

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");
  infoContainer.innerHTML = `
    <img src="${imageSource}" alt="${movie.title}" class="image">
    <div class="info">
      <h1 class="title">${movie.title}</h1>
      <h2 class="date">${movie.release_date}</h2>
      <h3 class="genres"></h3>
      <img src="star.png" class="star">
      <h4 class="info-point">${movie.vote_average.toFixed(1)}</h4>
    </div>
  `;
  
  fetchGenres(movie.genre_ids, infoContainer.querySelector(".genres"));
  infoContainer.addEventListener("click", () => PopUpMovie(movie));
  
  slide.appendChild(infoContainer);
  return slide;
}

function PopUpMovie(movie) {
  const modal = document.getElementById("Modal2");
  const genresElement = modal.querySelector(".genres");
  const imageSource = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  modal.style.display = "block";
  modal.querySelector(".title").innerText = movie.title;
  modal.querySelector(".date").innerText = movie.release_date;
  modal.querySelector(".imageOfFilm").src = imageSource;
  modal.querySelector(".point").innerText = movie.vote_average.toFixed(1);
  modal.querySelector(".overview").innerText = movie.overview;
  modal.querySelector(".star").src = "star.png";
  fetchGenres(movie.genre_ids, genresElement);
  getMovieCredits(movie.id).then((cast) => {
    modal.querySelector(".Actors").innerText = cast;
  });
  const closeButton = modal.querySelector(".close2");
  closeButton.onclick = () => {
    modal.style.display = "none";
  };
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}

document.addEventListener("click", () => {
  const modal = document.querySelector(".modal2");
  const closeButton = modal.querySelector(".close2");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

function fetchGenres(genreIds, genresElement) {
  genresElement.innerText = "";
  genreIds.forEach((id, index) => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        const genre = data.genres.find((genre) => genre.id === id);
        if (genre) {
          genresElement.innerText +=
            genre.name + (index < genreIds.length - 1 ? "/" : " ");
        }
      })
      .catch((err) => console.error("Error fetching genre:", err));
  });
}
function getMovieCredits(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.cast) {
        return data.cast
          .slice(0, 7)
          .map((member) => member.name)
          .join(", ");
      } else {
        console.error("data is not found ");
        return " data is not available.";
      }
    })
    .catch((error) => {
      console.error("Error fetching cast:", error);
      return "Error fetching cast data.";
    });
}
const genreIds = {
  comedy: 35,
  drama: 18,
  action: 28,
  fantasy: 14,
  animation: 16,
};

document.querySelectorAll(".movieNav li").forEach((button) => {
  button.addEventListener("click", () => {
    const genre = button.textContent.trim().toLowerCase();
    const genreId = genreIds[genre];
    if (!genreId) {
      alert("Genre not recognized");
      return;
    }
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          alert("No results for this genre");
          return;
        }
        let splideList = document.querySelector("#slider3 .splide__list");
        splideList.innerHTML = "";
        data.results.forEach((movie) => {
          if (movie && movie.poster_path) {
            let slide = hoverInfo(movie);
            splideList.appendChild(slide);
          }
        });
        initializeSlider("#slider3");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  });
});
