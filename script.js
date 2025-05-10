document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hiddenContainer = document.querySelector(".hidden-container");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");

  // Data lengkap dengan ikon
  const games = [
    { name: "Mobile Legends", keywords: ["mobile legends", "ml"], icon: "../icon/mole-icon.png", link: "moba-payment.html" },
    { name: "Free Fire", keywords: ["free fire", "ff"], icon: "../icon/ff-icon.png", link: "ff-payment.html" },
    { name: "Free Fire Max", keywords: ["free fire max"], icon: "../icon/ffmax-icon.png", link: "ffmax-payment.html" },
    { name: "PUBG Mobile", keywords: ["pubg mobile", "pubg"], icon: "../icon/pubg-icon.png", link: "pubg-payment.html" },
    { name: "Honkai: Star Rail", keywords: ["honkai star rail", "hsr"], icon: "../icon/hsr-icon.png", link: "hsr-payment.html" },
    { name: "Wuthering Waves", keywords: ["wuthering waves", "wuwa"], icon: "../icon/wuwa-icon.png", link: "wuwa-payment.html" },
    { name: "Zenless Zone Zero", keywords: ["zenless zone zero", "zzz"], icon: "../icon/zzz-icon.png", link: "zzz-payment.html" },
    { name: "Valorant", keywords: ["valorant"], icon: "../icon/valo-icon.png", link: "valo-payment.html" },
    { name: "Call of Duty: Mobile", keywords: ["codm", "call of duty"], icon: "../icon/codm-icon.png", link: "codm-payment.html" },
    { name: "Genshin Impact", keywords: ["genshin impact", "genshin"], icon: "../icon/genshin-icon.png", link: "genshin-payment.html" },
    { name: "Honkai Impact 3rd", keywords: ["honkai impact 3rd", "hi3rd"], icon: "../icon/hi-icon.png", link: "hi-payment.html" },
    { name: "Roblox", keywords: ["Roblox", "rblx"], icon: "../icon/roblox-icon.png", link: "roblox-payment.html" },
    { name: "Honor of King", keywords: ["honor of king", "hok"], icon: "../icon/hok-icon.png", link: "hok-payment.html" }
  ];

  // Fungsi untuk menampilkan tombol show more dan konten tersembunyi
  if (showMoreBtn && hiddenContainer) {
    showMoreBtn.addEventListener("click", function () {
      hiddenContainer.style.display = "flex";
      setTimeout(function () {
        hiddenContainer.classList.add("show");
      }, 10);
      showMoreBtn.style.display = "none";
    });
  }

  // Event listener untuk pencarian dan menampilkan saran
  searchInput.addEventListener("input", function () {
    const input = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (input === "") {
      suggestionsBox.style.display = "none";
      return;
    }

    const matched = games.filter(game =>
      game.keywords.some(keyword => keyword.includes(input))
    );

    if (matched.length > 0) {
      matched.forEach(game => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerHTML = `
          <img src="${game.icon}" alt="${game.name}" class="suggestion-icon">
          <span>${game.name}</span>
        `;
        div.addEventListener("click", function () {
          window.location.href = game.link;
        });
        suggestionsBox.appendChild(div);
      });
      suggestionsBox.style.display = "block";
    } else {
      suggestionsBox.style.display = "none";
    }
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const query = searchInput.value.toLowerCase().trim();
      const found = games.find(game =>
        game.keywords.includes(query)
      );
      if (found) {
        window.location.href = found.link;
      } else {
        alert("Game tidak ditemukan.");
      }
    }
  });

  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
});
