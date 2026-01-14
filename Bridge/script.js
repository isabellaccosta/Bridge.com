// CONTADOR
document.querySelectorAll(".card").forEach(card=>{
  const minus = card.querySelector(".qty button:nth-child(1)");
  const plus = card.querySelector(".qty button:nth-child(3)");
  const value = card.querySelector(".qty span");

  let count = 1;

  plus.onclick = () => {
    count++;
    value.textContent = count;
  }

  minus.onclick = () => {
    if(count > 1){
      count--;
      value.textContent = count;
    }
  }
});

// SCROLL FADE
const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{threshold:0.2});

faders.forEach(el=>observer.observe(el));
