axios.get("http://localhost/ASS1/Backend/get_score.php").then((response) => {
  console.log(response.data);
  if (response.data.success) {
    const scores = response.data.scores;
    const leaderboardDiv = document.querySelector(".leaderboard");
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Rank", "Player", "Score", "Duration"].forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    scores.forEach((score, index) => {
      const row = document.createElement("tr");
      const cells = [index + 1, score.name, score.score, score.duration];
      cells.forEach((cellData) => {
        const td = document.createElement("td");
        td.textContent = cellData;
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    leaderboardDiv.appendChild(table);
    const btn = document.createElement("button");
    btn.className = "submit";
    btn.textContent = "Leaderboard";
    leaderboardDiv.appendChild(btn);
    btn.addEventListener("click", () => {
      window.location.href = "leaderboard.html";
    });
  } else {
    console.error("Failed to fetch scores:", response.data.error);
    document.querySelector(".leaderboard").innerHTML +=
      "<p>Failed to load leaderboard.</p>";
  }
});
const b = document.getElementById("d");
const s = document.querySelector(".download");
b.addEventListener("click", () => {
  s.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("adding").addEventListener("submit", function (event) {
  event.preventDefault();
  const v = document.getElementById("s1").value.trim();
  if (typeof v !== 'string' || v.length < 3 || !isNaN(v)) {
    alert("Name must be a string with at least 3 characters and not a number.");
    return;
  }
  const user = {
    name: v,
  };
  document.getElementById("s1").value = "";
  axios
    .post("http://localhost/ASS1/Backend/add_score.php", user)
    .then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert("Player added successfully!");
        window.location.href = "index.html";
      } else {
        alert("Failed to add player: " + response.data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while adding the player.");
    });
});
