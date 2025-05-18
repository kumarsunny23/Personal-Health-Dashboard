
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const tabContent = document.getElementById(`${btn.dataset.tab}-tab`);
        if (tabContent) tabContent.classList.add('active');
      });
    });

    const moodLog = document.getElementById('mood-log');
    const moodCalendar = document.getElementById('mood-calendar');

    function loadMoods() {
      const data = JSON.parse(localStorage.getItem('moodHistory')) || [];
      moodLog.innerHTML = '';
      moodCalendar.innerHTML = '';

      data.slice(-5).forEach(entry => {
        const div = document.createElement('div');
        div.className = 'mood-entry';
        div.style.backgroundColor = entry.color;
        div.textContent = `${entry.date} ${entry.emoji}`;
        moodLog.appendChild(div);
      });

      data.forEach(entry => {
        const day = document.createElement('div');
        day.className = 'mood-calendar-day';
        day.style.backgroundColor = entry.color;
        day.innerHTML = `<div>${entry.date}</div><div>${entry.emoji}</div>`;
        moodCalendar.appendChild(day);
      });
    }

    function logMood(emoji, color) {
      const date = new Date().toLocaleDateString();
      const moodData = JSON.parse(localStorage.getItem('moodHistory')) || [];
      moodData.push({ date, emoji, color });
      localStorage.setItem('moodHistory', JSON.stringify(moodData));
      loadMoods();
    }

    function logWater() {
      const goal = parseInt(document.getElementById('water-goal').value) || 0;
      const status = document.getElementById('water-status');
      if (!status.cups) status.cups = 0;
      status.cups++;
      status.textContent = `Cups: ${status.cups} / Goal: ${goal}`;
    }

    function logMeal() {
      const desc = document.getElementById('meal-desc').value;
      const cal = parseInt(document.getElementById('meal-calories').value) || 0;
      const summary = document.getElementById('meal-summary');
      if (!summary.total) summary.total = 0;
      summary.total += cal;
      const entry = document.createElement('div');
      entry.textContent = `${desc}: ${cal} cal`;
      summary.appendChild(entry);
      document.getElementById('meal-desc').value = '';
      document.getElementById('meal-calories').value = '';
      const totalDisplay = document.createElement('div');
      totalDisplay.textContent = `Total: ${summary.total} cal`;
      summary.appendChild(totalDisplay);
    }

    function logSleep() {
      const hours = parseInt(document.getElementById('sleep-hours').value) || 0;
      const summary = document.getElementById('sleep-summary');
      if (!summary.total) summary.total = 0;
      summary.total += hours;
      summary.textContent = `Total sleep: ${summary.total} hours`;
    }

    document.addEventListener('DOMContentLoaded', loadMoods);
  