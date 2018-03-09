// import { currencyFormatter } from './utilities';

import { isNumeric } from '../utilities';

function getColourScheme() {
  return [
    '#944a9c',
    '#c5bdee',
    '#bd94b4',
    '#735a8b',
    '#d5a4de',
    '#392939',
    '#ff9494',
  ];
}

// data array should be in the form
/*
  [
    {item: 'string', percent: 23}
  ]
*/
export function drawOptionsResultChart(dataArray) {
  const percentages = [];
  const labels = [];

  dataArray.forEach((value) => {
    percentages.push(value.percent);
    labels.push(value.item);
  });

  percentages.reverse();
  labels.reverse();

  const max = Math.max.apply(null, percentages) / 0.85;

  // for the full labels
  const maxPercentages = [];

  dataArray.forEach(() => {
    maxPercentages.push(max);
  });

  const option = {
    color: ['#944a9c', '#392939'],
    xAxis: {
      type: 'value',
      max,
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      data: labels,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        margin: -10,
        align: 'left',
        verticalAlign: 'bottom',
        padding: [0, 0, 15, 0],
      },
    },
    series: [
      {
        type: 'bar',
        data: percentages,
        barWidth: 10,
        z: 30,
        label: {
          normal: {
            show: true,
            position: 'left',
            formatter: '{c}%',
          },
        },
        itemStyle: {
          normal: {
            barBorderRadius: 20,
          },
        },
      },
      {
        type: 'bar',
        data: maxPercentages,
        barWidth: 4,
        barGap: '-70%',
        label: {
          normal: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            barBorderRadius: 20,
          },
        },
      },
    ],
  };

  return option;
}

export function drawSemiCircleChart(
  size,
  bigText,
  smallText,
  lineColor,
  bigTextColor,
  smallTextColor,
  animationDelayOffset,
  fontSize = 35,
) {
  // this is non hidden stuff
  const dataStyle = {
    normal: {
      label: { show: false },
      labelLine: { show: false },
    },
  };

  // this is hidden stuff
  const invisibleSeriesStyle = {
    normal: {
      color: 'rgba(0,0,0,0)',
      label: { show: false },
      labelLine: { show: false },
    },
    emphasis: {
      color: 'rgba(0,0,0,0)',
    },
  };

  const options = {
    title: {
      text: bigText,
      subtext: smallText,
      x: 'center',
      y: 'center',
      itemGap: 0,
      textStyle: {
        color: bigTextColor,
        fontFamily: '"Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif',
        fontSize,
        fontWeight: 'bolder',
      },
      subtextStyle: {
        color: smallTextColor,
        fontFamily: '"Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif',
      },
    },
    color: [lineColor],
    tooltip: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    series: [
      {
        name: '1',
        type: 'pie',
        clockWise: false,
        radius: ['90%', '94%'],
        itemStyle: dataStyle,
        data: [
          {
            value: size,
            name: 'data',
          },
          {
            value: 100 - size,
            name: 'invisible',
            itemStyle: invisibleSeriesStyle,
          },
        ],
        animationDelay(idx) {
          return (idx * 50) + animationDelayOffset;
        },
      },
    ],
  };

  return options;
}

export function drawWordCloud(data) {
  require('echarts-wordcloud');

  const options = {
    tooltip: {},
    series: [
      {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: 'pentagon',
        width: '80%',
        height: '70%',
        textStyle: {
          normal: {
            color() {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') +
                ')'
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: data.data,
      },
    ],
  };

  return options;
}

export function drawSalaryNumber(data) {
  return drawSemiCircleChart(
    100,
    '£' + data.number.toLocaleString(),
    '',
    '#9979ad',
    '#9979ad',
    '#777',
    1000,
  );
}

export function drawGroupChart(data) {
  let formatter = new Intl.NumberFormat('en-GB', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (data.useCurrenctFormatter === true) {
    // specify chart configuration item and data
    formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  const seriesData = [];

  for (let a = 0; a < data.series.length; a++) {
    const item = {
      name: data.series[a].name,
      type: data.type,
      smooth: true,
      symbolSize: 10,
      data: data.series[a].data,
      animationDelay(idx) {
        // delay for later data is larger
        return (idx * 50) + (500 * (a + 1));
      },
      lineStyle: {
        normal: {
          width: 2.5,
        },
      },
    };

    seriesData.push(item);
  }

  const options = {
    toolbox: {
      show: true,
      top: 'top',
      left: 'right',
      feature: {
        magicType: {
          show: true,
          type: ['line', 'bar'],
          title: {
            line: 'Line Chart',
            bar: 'Bar Chart',
          },
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      align: 'left',
      formatter(params /* , ticket , callback */) {
        if (params.length > 0) {
          let string = '<strong>' + params[0].name + '</strong>';

          for (let i = 0; i < params.length + 1; i++) {
            if (i < params.length) {
              if (isNumeric(params[i].value)) {
                string +=
                  '</br>' +
                  params[i].seriesName +
                  ': ' +
                  formatter.format(params[i].value);
              } else {
                string += '</br>' + params[i].seriesName + ': Unknown';
              }
            } else {
              return string;
            }
          }
        } else {
          return 'No Data Selected';
        }

        return null;
      },
    },
    legend: {
      left: 'center',
      top: 'top',
      padding: [36, 5],
      data: data.labels,
      textStyle: {
        fontSize: 14,
        fontWeight: 'bolder',
      },
    },
    calculable: true,
    xAxis: {
      type: 'category',
      name: data.xAxis.name,
      position: 'bottom',
      nameLocation: 'middle',
      nameGap: 20,
      boundaryGap: true,
      data: data.ranges,
    },
    yAxis: {
      max: null,
      min: null,
      type: 'value',
      axisLabel: {
        formatter: data.yAxisFormatMask,
      },
    },
    color: getColourScheme(),
    series: seriesData,
  };

  return options;
}

/*
@param data
[
  { value: 20, name: 'Male' },
  { value: 80, name: 'Female' },
]
*/
export function drawPieChart(data, showLabels = true) {
  const drawData = data;

  if (showLabels === false) {
    drawData.forEach((item, index) => {
      drawData[index].label = { normal: { show: false } };
      drawData[index].labelLine = {
        normal: { show: false },
        emphasis: { show: false },
      };
    });
  }

  const options = {
    color: ['#735a8b', '#c5bdee'],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
    },
    legend: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    series: [
      {
        name: 'Gender',
        type: 'pie',
        radius: '75%',
        selectedMode: 'single',
        data: drawData,
      },
    ],
  };

  return options;
}

export function drawBarChart(data) {
  // specify chart configuration item and data
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const options = {
    color: getColourScheme(),
    tooltip: {
      trigger: 'axis',
      align: 'left',
      formatter(params /* , ticket, callback */) {
        if (params.length > 0) {
          let string = '<strong>' + params[0].name + '</strong>';
          for (let i = 0; i < params.length + 1; i++) {
            if (i < params.length) {
              string +=
                '</br>' +
                params[i].seriesName +
                ': ' +
                formatter.format(params[i].value);
            } else return string;
          }
        } else return 'No Data Selected';

        return null;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        interval: 0,
        type: 'category',
        data: data.labels,
        axisTick: {
          alignWithLabel: true,
          interval: 0,
        },
        axisLabel: {
          // rotate: 45,
          // interval: 0
          show: data.xAxis.show,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '£{value}',
        },
      },
    ],
    series: [
      {
        name: data.subject,
        type: 'bar',
        barWidth: '40%',
        data: data.items,
      },
    ],
  };

  return options;
}
