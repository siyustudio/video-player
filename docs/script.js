// Event: Klik video di halaman home
const homeVideos = document.querySelectorAll(".video-row-home");

homeVideos.forEach(item => {
  item.addEventListener("click", () => {
    const src = item.getAttribute("data-src");
    const title = item.getAttribute("data-title");
    const channel = item.getAttribute("data-channel");

    // Simpan data ke localStorage
    localStorage.setItem("selectedVideo", JSON.stringify({
      src,
      title,
      channel
    }));

    // Pindah ke halaman layout.html
    window.location.href = "layout.html";
  });
});

// Saat halaman index dibuka
window.addEventListener("DOMContentLoaded", () => {
  const selected = localStorage.getItem("selectedVideo");

  const mainPlayer = document.getElementById("mainPlayer");
  const mainTitle = document.getElementById("mainTitle");
  const mainChannel = document.getElementById("mainChannel");

  // Ambil dari localStorage (klik dari home)
  if (selected && mainPlayer && mainTitle && mainChannel) {
    const { src, title, channel } = JSON.parse(selected);

    mainPlayer.src = "assets/" + src.split("/").pop();
    mainTitle.textContent = title;
    mainChannel.textContent = channel;
    mainPlayer.currentTime = 0;

    // Bersihkan setelah dipakai
    localStorage.removeItem("selectedVideo");
  }

  // Aktifkan klik sidebar juga
  const videoRow = document.querySelectorAll(".video-row");

  videoRow.forEach(item => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      const title = item.getAttribute("data-title");
      const channel = item.getAttribute("data-channel");

      if (mainPlayer && mainTitle && mainChannel) {
        mainPlayer.src = "assets/" + src.split("/").pop();
        mainTitle.textContent = title;
        mainChannel.textContent = channel;
        mainPlayer.currentTime = 0;
      }
    });
  });
});

// Fitur pencarian (tetap aktif)
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const videoItems = document.querySelectorAll(".video-row");

function filterVideos() {
  const keyword = searchInput.value.toLowerCase();

  videoItems.forEach(item => {
    const title = item.getAttribute("data-title").toLowerCase();
    const channel = item.getAttribute("data-channel").toLowerCase();

    if (title.includes(keyword) || channel.includes(keyword)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

searchInput?.addEventListener("input", filterVideos);
searchButton?.addEventListener("click", filterVideos);
searchInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") filterVideos();
});

