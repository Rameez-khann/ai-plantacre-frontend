export function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

export function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

export function displayPlantInfo(plantName, plantInfo) {
  const card = document.getElementById('instructions-card');
  const content = document.getElementById('instructions-content');
  content.innerHTML = '';

  if (!plantInfo) {
    content.innerHTML = `<p>Sorry, no instructions found for <strong>${plantName}</strong>.</p>`;
  } else {
    content.innerHTML = `
      <h3>${plantName}</h3>
      <ul>
        <li><strong>Light:</strong> ${plantInfo.light}</li>
        <li><strong>Water:</strong> ${plantInfo.water}</li>
        <li><strong>Soil:</strong> ${plantInfo.soil}</li>
        <li><strong>Fertilizer:</strong> ${plantInfo.fertilizer}</li>
      </ul>
    `;
  }

  card.style.display = 'block';
}