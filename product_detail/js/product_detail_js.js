// ===== Gallery + Radio sync (replace previous gallery/radio code) =====
const gallery = document.getElementById("productGallery");
const prevBtn = document.getElementById("galleryPrev");
const nextBtn = document.getElementById("galleryNext");
const mainImg = document.querySelector(".product_img > img");
const thumbs = Array.from(document.querySelectorAll(".thumb"));
const radios = Array.from(document.querySelectorAll("input[name='product_size']"));

// fallback map (nếu bạn muốn dùng đường dẫn khác thay vì src thumb)
const imageMap = {
  "200g": "../../Hình/Bưởi sấy dẻo 200g.png",
  "650g": "../../Hình/Bưởi sấy dẻo 650g.png",
  "225g": "../../Hình/Bưởi sấy dẻo 225g.png"
};

// --- helper: set main image with fade ---
function setMainImage(src) {
  if (!mainImg) return;
  // fade out -> change src -> fade in
  mainImg.style.transition = "opacity 200ms";
  mainImg.style.opacity = 0;
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = 1;
  }, 200);
}

// --- navigation buttons ---
if (prevBtn && nextBtn && gallery) {
  prevBtn.addEventListener("click", () => {
    gallery.scrollBy({ left: -120, behavior: "smooth" });
  });
  nextBtn.addEventListener("click", () => {
    gallery.scrollBy({ left: 120, behavior: "smooth" });
  });
}

// --- click thumb: change main image + select radio + highlight thumb ---
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    // If it's a video thumb, do whatever you want (popup, open modal...)
    if (thumb.classList.contains("video-thumb")) {
      // ở đây tạm hiện alert, bạn có thể mở modal video
      alert("Play video / mở modal video ở đây");
      return;
    }

    const thumbImg = thumb.querySelector("img");
    const src = thumbImg ? thumbImg.src : null;

    if (src) setMainImage(src);

    // highlight selected thumb
    thumbs.forEach(t => t.classList.remove("selected"));
    thumb.classList.add("selected");

    // select corresponding radio (if exists)
    if (index < radios.length) {
      radios[index].checked = true;
    }
  });
});

// --- radio change: try lấy thumbnail src tương ứng; nếu không có thì dùng imageMap ---
radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    if (!radio.checked) return; // chỉ xử lý khi được chọn

    // ưu tiên lấy src từ thumbnail cùng index (nếu có)
    let chosenSrc = null;
    if (thumbs[index]) {
      const imgEl = thumbs[index].querySelector("img");
      if (imgEl && imgEl.src) chosenSrc = imgEl.src;
    }

    // nếu không có thumbnail tương ứng, dùng fallback từ imageMap nếu có
    if (!chosenSrc && imageMap[radio.value]) {
      chosenSrc = imageMap[radio.value];
    }

    if (chosenSrc) setMainImage(chosenSrc);

    // cập nhật highlight thumb (nếu có)
    thumbs.forEach(t => t.classList.remove("selected"));
    if (thumbs[index]) thumbs[index].classList.add("selected");

    // nếu thumbnail nằm ngoài vùng nhìn thấy, cuộn tới nó
    if (thumbs[index]) {
      thumbs[index].scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  });
});

// --- khởi tạo mặc định: chọn thumb + main image từ thumb đầu (nếu có) ---
if (thumbs.length > 0) {
  // nếu radio nào đang checked, dùng radio đó làm ưu tiên chọn thumb tương ứng
  const checkedIndex = radios.findIndex(r => r.checked);
  const startIndex = checkedIndex >= 0 ? checkedIndex : 0;

  thumbs.forEach(t => t.classList.remove("selected"));
  if (thumbs[startIndex]) {
    thumbs[startIndex].classList.add("selected");
    const imgEl = thumbs[startIndex].querySelector("img");
    if (imgEl && imgEl.src) {
      mainImg.src = imgEl.src;
    } else {
      // fallback: nếu radio có value khớp imageMap
      if (radios[startIndex] && imageMap[radios[startIndex].value]) {
        mainImg.src = imageMap[radios[startIndex].value];
      }
    }
  }
}




const heart = document.getElementById('heart');
const likeCount = document.getElementById('like-count');
let liked = false;
let count_like = parseInt(likeCount.textContent);

heart.addEventListener('click', () => {
  liked = !liked;
  if (liked) {
    heart.textContent = '❤';
    heart.classList.add('filled');
    likeCount.textContent = count_like + 1;
  } else {
    heart.textContent = '♡';
    heart.classList.remove('filled');
    likeCount.textContent = count_like;
  }
});


const star = document.getElementById('star');
star.addEventListener('click', () => {
  if (star.textContent === '☆') {
    star.textContent = '★';
    star.classList.add('filled');
  } else {
    star.textContent = '☆';
    star.classList.remove('filled');
  }
});


let count = 1; 
const counter = document.getElementById('counter');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

increaseBtn.addEventListener('click', () => {
  count += 1;
  counter.textContent = count;
});

decreaseBtn.addEventListener('click', () => {
  if (count >= 1) { 
    count -= 1;
    counter.textContent = count;
  }
});
