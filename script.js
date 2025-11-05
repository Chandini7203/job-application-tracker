let applications = [];

document.getElementById("appForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const company = document.getElementById("company").value.trim();
  const position = document.getElementById("position").value.trim();
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const notes = document.getElementById("notes").value.trim();

  applications.unshift({ company, position, date, status, notes });
  showToast("Application added!");
  renderList();
  document.getElementById("appForm").reset();
});

function renderList() {
  const appList = document.getElementById("appList");
  appList.innerHTML = "";
  if (applications.length === 0) {
    appList.innerHTML = '<div style="color:#888;text-align:center;padding:32px 0;"><i class="fas fa-search"></i> No applications yet.</div>';
    return;
  }
  for (const app of applications) {
    const statusClass = {
      applied: "status-applied",
      interview: "status-interview",
      offer: "status-offer",
      rejected: "status-rejected"
    }[app.status] || "status-applied";
    const statusEmoji = {
      applied: "📝",
      interview: "🎤",
      offer: "🎉",
      rejected: "❌"
    };
    const statusText = {
      applied: "Applied",
      interview: "Interview Scheduled",
      offer: "Offer",
      rejected: "Rejected"
    }[app.status] || "Applied";
    appList.innerHTML += `
      <div class="app-card">
        <div>
          <span class="status ${statusClass}">${statusEmoji[app.status]} ${statusText}</span>
          <strong>${app.company}</strong> — ${app.position}
          <span style="float:right; font-size:14px;">${formatDate(app.date)}</span>
        </div>
        ${app.notes ? `<div class="note"><i class="fas fa-sticky-note"></i> ${app.notes}</div>` : ""}
      </div>
    `;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 1700);
}

renderList();
