window.onload = function () {
  let oglasi = document.querySelectorAll("#breedId");

  data = {}
  for(var i = 0; i < oglasi.length; i++) {
    breed = oglasi[i].getAttribute("breed");
    if(data[breed]) {
      data[breed]++
    } else {
      data[breed] = 1;
    }
  }

  dataPoints = [];
  for (const property in data) {
    dataPoints.push({name : property, y:data[property]})
  }
  console.log(dataPoints);

  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "dark2",
    exportFileName: "Doughnut Chart",
    exportEnabled: true,
    animationEnabled: true,
    title:{
      text: "Most common breeds"
    },
    legend:{
      cursor: "pointer",
      itemclick: explodePie
    },
    data: [{
      type: "doughnut",
      innerRadius: 90,
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: {y} (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: dataPoints
    }]
  });
  chart.render();

  function explodePie (e) {
    if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
  }
}
