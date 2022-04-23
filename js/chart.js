let tChart = document.getElementById('trafficChart');
let dChart = document.getElementById('dailyChart');
let mChart = document.getElementById('mobileChart');

// Global options =====================>
Chart.defaults.global.defaultFontFamily = 'Open Sans';
Chart.defaults.global.defaultFontSize = 8;
Chart.defaults.global.defaultFontColor = '#8a8a8a';


// Data Sets ==========================>
let monthlyTraffic = [
  1000, 1500,
  1250, 1750,
  2000, 1500,
  1500, 1000,
  1750, 2250];

let weeklyTraffic = [
  102, 245,
  425, 144,
  200, 150,
  150, 100,
  550, 750];

let dailyTraffic = [
  45, 53,
  45, 40,
  85, 74,
  68, 95,
  54, 55];

let hourlyTraffic = [
  20, 15,
  12, 17,
  26, 15,
  15, 19,
  17, 22];



// Traffic LINE Chart ==================>
let trafficChart = new Chart(tChart, {
    type: 'line',
    data: {
        labels: [
          '16-22', '23-29',
          '30-5', '6-12',
          '13-19', '20-26',
          '27-3', '4-10',
          '11-17', '18-24'],
        datasets: [{
            backgroundColor: 'rgba(67, 139, 129, 0.2)',
            lineTension: 0,
            borderColor: '#5dd2d6',
            pointRadius: 4.5,
            pointBackgroundColor: '#fff',
            borderJoinStyle: 'miter',
            borderWidth: 1,
            hoverBorderWidth: 2,
            hoverBorderColor: '#009d9d',
            data: hourlyTraffic,
        }]
    },
            options: {
              legend: {
                display: false
              },
              scales: {
                gridLines: {
                  color: '#fff'
                },
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
                },
            }
});

// Daily Traffic BAR Chart ==================>
let dailyChart = new Chart(dChart, {
    type: 'bar',
    data: {
      labels: [
        'S', 'M',
        'T', 'W',
        'T', 'F',
        'S'],
      datasets: [{
          backgroundColor: '#84dadd',
          lineTension: 0,
          pointRadius: 4.5,
          pointBackgroundColor: '#fff',
          borderJoinStyle: 'miter',
          borderWidth: 0,
          data: [
            50, 75,
            150, 100,
            190, 175,
            75],
      }]
    },
    options: {
      legend: {
        display: false
      }
    }
});

// Mobile DOUGHNUT Chart ==================>
var mobileChart = new Chart(mChart, {
    type: 'doughnut',
    data: {
      labels: [
        'Phones',
        'Tablets',
        'Desktop'],
      datasets: [{
        backgroundColor: [
        '#906cd4',
        '#3bd5b0',
        '#84dadd'],
        data: [
          10,
          10,
          80],
        }]
    },
    options: {
      legend: {
        position: 'right',
        labels : {
          boxWidth: 15,
          fontSize: 15,
        }
      }
    }
});
