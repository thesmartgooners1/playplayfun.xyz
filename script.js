document.addEventListener("DOMContentLoaded", () => {
  // ===== Movie Data =====
  const movies = [
    { title:"Inception", genre:"Sci-Fi", poster:"https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", desc:"A thief enters dreams to steal secrets — but the stakes turn deadly." },
    { title:"The Dark Knight", genre:"Action", poster:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", desc:"Batman faces the Joker in a war for Gotham's soul." },
    { title:"Interstellar", genre:"Sci-Fi", poster:"https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", desc:"A team travels beyond the stars to save humanity." },
    { title:"Terminator 2", genre:"Action", poster:"https://image.tmdb.org/t/p/w500/weVXMD5QBGeQil4HEATZqAkXeEc.jpg", desc:"A killer machine returns — this time to protect." },
    { title:"The Matrix", genre:"Sci-Fi", poster:"https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", desc:"A hacker awakens to a simulated reality — and fights back." }
  ];

  // ===== DOM Elements =====
  const movieGrid = document.getElementById("movieGrid");
  const browseBtn = document.querySelector(".hero .btn-primary");
  const modal = document.getElementById("movieModal");
  const closeModal = document.getElementById("closeModal");
  const modalPoster = document.getElementById("modalPoster");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const rentBtn = document.getElementById("rentBtn");
  const watchBtn = document.getElementById("watchBtn");

  const cartPanel = document.getElementById("cartPanel");
  const cartButton = document.getElementById("cartButton");
  const cartCount = document.getElementById("cartCount");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const watchlistPanel = document.getElementById("watchlistPanel");
  const watchlistButton = document.getElementById("watchlistButton");
  const closeWatchlist = document.getElementById("closeWatchlist");
  const watchlistItems = document.getElementById("watchlistItems");
  const watchlistCount = document.getElementById("watchlistCount");
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutList = document.getElementById("checkoutList");
  const confirmCheckout = document.getElementById("confirmCheckout");
  const closeCheckout = document.getElementById("closeCheckout");
  const rentalDuration = document.getElementById("rentalDuration");
  const totalPriceEl = document.getElementById("totalPrice");

  const genreButtons = document.querySelectorAll(".btn-genre");
  const rentedMoviesEl = document.getElementById("rentedMovies");
  const clearRentalsBtn = document.getElementById("clearRentals");

  const priceMap = {1:2,3:5,7:10};
  let cart = [];
  let rentedMovies = JSON.parse(localStorage.getItem("rentedMovies")) || [];

  // ===== Functions =====
  function renderMovieGrid(filter="All") {
    movieGrid.innerHTML="";
    movies.filter(m => filter==="All"||m.genre===filter).forEach(m=>{
      const card=document.createElement("div");
      card.className="movie-card";
      card.innerHTML=`<img src="${m.poster}" alt="${m.title}"><div class="movie-title">${m.title}</div>`;
      card.addEventListener("click",()=>showMovie(m));
      movieGrid.appendChild(card);
    });
  }

  function showMovie(movie){
    modalPoster.src=movie.poster;
    modalTitle.textContent=movie.title;
    modalDesc.textContent=movie.desc;
    rentBtn.onclick=()=>addToCart(movie);
    watchBtn.onclick=()=>addToWatchlist(movie);
    modal.style.display="flex";
  }
  closeModal.onclick=()=>modal.style.display="none";
  modal.onclick=e=>e.target===modal&&(modal.style.display="none");

  function addToCart(movie){
    cart.push(movie); updateCartUI(); modal.style.display="none";
  }

  function updateCartUI(){
    cartItems.innerHTML="";
    cart.forEach((m,i)=>{
      const div=document.createElement("div");
      div.className="cart-item";
      div.innerHTML=`<img src="${m.poster}"><span>${m.title}</span><span class="remove-item" data-index="${i}">&times;</span>`;
      cartItems.appendChild(div);
    });
    cartCount.textContent=cart.length;

    cartItems.querySelectorAll(".remove-item").forEach(el=>{
      el.addEventListener("click",e=>{
        const idx=parseInt(e.target.getAttribute("data-index"));
        cart.splice(idx,1); updateCartUI();
      });
    });
  }

  cartButton.onclick=()=>cartPanel.classList.add("open");
  closeCart.onclick=()=>cartPanel.classList.remove("open");

  function addToWatchlist(movie){
    if(!watchlist.find(m=>m.title===movie.title)){
      watchlist.push(movie);
      localStorage.setItem("watchlist",JSON.stringify(watchlist));
      updateWatchlistUI(); alert(`⭐ Added "${movie.title}" to Watchlist!`);
    }else{ alert(`⭐ "${movie.title}" is already in Watchlist!`); }
  }

  function updateWatchlistUI(){
    watchlistItems.innerHTML="";
    watchlist.forEach((m,i)=>{
      const div=document.createElement("div");
      div.className="cart-item";
      div.innerHTML=`<img src="${m.poster}"><span>${m.title}</span><span class="remove-item" data-index="${i}">&times;</span>`;
      watchlistItems.appendChild(div);
    });
    watchlistCount.textContent=watchlist.length;
    watchlistItems.querySelectorAll(".remove-item").forEach(el=>{
      el.addEventListener("click",e=>{
        const idx=parseInt(e.target.getAttribute("data-index"));
        watchlist.splice(idx,1); localStorage.setItem("watchlist",JSON.stringify(watchlist));
        updateWatchlistUI();
      });
    });
  }
  watchlistButton.onclick=()=>watchlistPanel.classList.add("open");
  closeWatchlist.onclick=()=>watchlistPanel.classList.remove("open");
  updateWatchlistUI();

  // ===== Checkout =====
  function updateCheckoutList(){
    checkoutList.innerHTML="";
    cart.forEach((m,i)=>{
      const li=document.createElement("li");
      li.textContent=`${i+1}. ${m.title}`;
      checkoutList.appendChild(li);
    });
    updateTotalPrice();
  }

  function updateTotalPrice(){
    const days=parseInt(rentalDuration.value);
    const total=cart.length*priceMap[days];
    totalPriceEl.textContent=`Total: $${total}`;
  }

  rentalDuration.onchange=updateTotalPrice;

  checkoutBtn.onclick=()=>{
    if(cart.length===0){ alert("🛒 Your cart is empty!"); return; }
    updateCheckoutList(); checkoutModal.style.display="flex";
  };
  closeCheckout.onclick=()=>checkoutModal.style.display="none";
  checkoutModal.onclick=e=>e.target===checkoutModal&&(checkoutModal.style.display="none");

  confirmCheckout.onclick=()=>{
    const days=parseInt(rentalDuration.value);
    const total=cart.length*priceMap[days];
    cart.forEach(movie=>{
      rentedMovies.push({...movie,days,total:priceMap[days]});
    });
    localStorage.setItem("rentedMovies",JSON.stringify(rentedMovies));
    updateRentedMovies();

    const successMsg=document.createElement("div");
    successMsg.className="checkout-success";
    successMsg.textContent=`✅ You rented ${cart.length} movie(s) for ${days} day(s)! Total: $${total}`;
    document.body.appendChild(successMsg);
    setTimeout(()=>successMsg.remove(),4000);

    cart=[]; updateCartUI(); checkoutModal.style.display="none"; cartPanel.classList.remove("open");
  };

  function updateRentedMovies(){
    rentedMoviesEl.innerHTML="";
    if(rentedMovies.length===0){ rentedMoviesEl.textContent="Your rented movies will appear here."; return; }
    rentedMovies.forEach(r=>{
      const div=document.createElement("div");
      div.className="rented-item";
      div.innerHTML=`<img src="${r.poster}" alt="${r.title}"><div>${r.title}</div><div>Duration: ${r.days} day(s)</div><div>Total: $${r.total}</div>`;
      rentedMoviesEl.appendChild(div);
    });
  }

  clearRentalsBtn.onclick=()=>{
    rentedMovies=[]; localStorage.setItem("rentedMovies",JSON.stringify(rentedMovies)); updateRentedMovies();
  };

  // ===== Browse & Genres =====
  browseBtn.addEventListener("click",()=>{ document.getElementById("new-releases").scrollIntoView({behavior:"smooth"}); if(movies.length>0) showMovie(movies[0]); });
  genreButtons.forEach(btn=>btn.addEventListener("click",()=>renderMovieGrid(btn.dataset.genre)));

  // ===== Initial render =====
  renderMovieGrid(); updateRentedMovies();
});
