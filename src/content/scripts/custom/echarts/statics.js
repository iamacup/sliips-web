import { currencyFormatter } from './utilities';

export function worldChart() {
  require('echarts-maps/world.js');
  const options = {
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return params.seriesName + '<br/>' + params.name;
      },
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        restore: {},
      },
    },
    visualMap: {
      min: 0,
      max: 100,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#9979ad', '#2c1e31'],
      },
    },
    series: [
      {
        name: 'Boomtown Graduate Locations',
        type: 'map',
        mapType: 'world',
        roam: true,
        itemStyle: {
          emphasis: { label: { show: true } },
        },
        data: [
          {
            name: 'United Kingdom',
            value: 100,
          },
          {
            name: 'United Arab Emirates',
            value: 2,
          },
          {
            name: 'Australia',
            value: 1,
          },
          {
            name: 'Austria',
            value: 1,
          },
          {
            name: 'Belgium',
            value: 2,
          },
          {
            name: 'Bangladesh',
            value: 2,
          },
          {
            name: 'Bulgaria',
            value: 1,
          },
          {
            name: 'The Bahamas',
            value: 1,
          },
          {
            name: 'Belarus',
            value: 1,
          },
          {
            name: 'Brazil',
            value: 4,
          },
          {
            name: 'Canada',
            value: 5,
          },
          {
            name: 'Switzerland',
            value: 1,
          },
          {
            name: 'China',
            value: 6,
          },
          {
            name: 'Colombia',
            value: 1,
          },
          {
            name: 'Costa Rica',
            value: 1,
          },
          {
            name: 'Germany',
            value: 6,
          },
          {
            name: 'Denmark',
            value: 4,
          },
          {
            name: 'Egypt',
            value: 1,
          },
          {
            name: 'Spain',
            value: 1,
          },
          {
            name: 'Estonia',
            value: 1,
          },
          {
            name: 'Finland',
            value: 1,
          },
          {
            name: 'Fiji',
            value: 1,
          },
          {
            name: 'United Kingdom',
            value: 20,
          },
          {
            name: 'Greenland',
            value: 1,
          },
          {
            name: 'Haiti',
            value: 1,
          },
          {
            name: 'India',
            value: 7,
          },
          {
            name: 'Iceland',
            value: 1,
          },
          {
            name: 'Italy',
            value: 2,
          },
          {
            name: 'Japan',
            value: 7,
          },
          {
            name: 'South Korea',
            value: 3,
          },
          {
            name: 'Sri Lanka',
            value: 1,
          },
          {
            name: 'Nigeria',
            value: 1,
          },
          {
            name: 'Netherlands',
            value: 1,
          },
          {
            name: 'Norway',
            value: 1,
          },
          {
            name: 'New Zealand',
            value: 2,
          },
          {
            name: 'Philippines',
            value: 1,
          },
          {
            name: 'Poland',
            value: 1,
          },
          {
            name: 'Portugal',
            value: 1,
          },
          {
            name: 'Qatar',
            value: 2,
          },
          {
            name: 'Saudi Arabia',
            value: 1,
          },
          {
            name: 'Slovakia',
            value: 1,
          },
          {
            name: 'Slovenia',
            value: 1,
          },
          {
            name: 'Sweden',
            value: 2,
          },
          {
            name: 'Thailand',
            value: 1,
          },
          {
            name: 'Turkey',
            value: 1,
          },
          {
            name: 'Ukraine',
            value: 1,
          },
          {
            name: 'United States of America',
            value: 10,
          },
          {
            name: 'South Africa',
            value: 2,
          },
          {
            name: 'Zimbabwe',
            value: 1,
          },
        ],
      },
    ],
  };

  return options;
}

export function drawConsultingMarketSalariesByYears() {
  const formatter = currencyFormatter();

  const options = {
    title: {
      show: false,
      left: 'center',
      text: 'Company Levels and Base Salaries',
      textStyle: {
        fontSize: 22,
        fontWeight: 'bolder',
      },
    },
    toolbox: {
      show: true,
      top: 'bottom',
      left: 'center',
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
      // eslint-disable-next-line no-unused-vars
      formatter: (params, ticket, callback) => {
        if (params.length > 0) {
          let string =
            '<strong>' + params[0].name + ' Years Experience</strong>';

          for (let i = 0; i < params.length + 1; i++) {
            if (i < params.length) {
              string +=
                '</br>' +
                params[i].seriesName +
                ': ' +
                formatter.format(params[i].value);
            } else {
              return string;
            }
          }
        } else {
          return 'No Data Selected';
        }

        return undefined;
      },
    },
    legend: {
      left: 'center',
      top: 'top',
      padding: [36, 5],
      data: ['IBM', 'Accenture', 'EY', 'Deloitte', 'KPMG', 'PA Consulting'],
      selected: {
        IBM: true,
        EY: false,
        Deloitte: false,
        Accenture: true,
        KPMG: false,
        'PA Consulting': false,
      },
      textStyle: {
        fontSize: 14,
        fontWeight: 'bolder',
      },
    },
    calculable: true,
    xAxis: {
      type: 'category',
      name: 'Years Experience',
      position: 'bottom',
      nameLocation: 'middle',
      nameGap: 20,
      boundaryGap: true,
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '£{value}',
      },
      min: 0,
      max: 150000,
    },
    color: ['#735a8b', '#bd94b4', '#944a9c', '#d5a4de', '#392939', '#ff9494'],
    series: [
      {
        name: 'IBM',
        type: 'line',
        data: [
          31000,
          31000,
          37000,
          37000,
          46000,
          46000,
          61000,
          61000,
          61000,
          92000,
          92000,
          92000,
          92000,
        ],
        animationDelay: idx => (idx * 50) + 500,
        lineStyle: {
          normal: {
            width: 2.5,
          },
        },
      },
      {
        name: 'EY',
        type: 'line',
        data: [
          33000,
          33000,
          33000,
          50000,
          50000,
          50000,
          72000,
          72000,
          72000,
          92000,
          92000,
          92000,
          140000,
        ],
        animationDelay: idx => (idx * 50) + 1500,
        lineStyle: {
          normal: {
            width: 2.5,
          },
        },
      },
      {
        name: 'Deloitte',
        type: 'line',
        data: [
          35000,
          35000,
          42000,
          42000,
          54000,
          54000,
          54000,
          54000,
          77000,
          77000,
          77000,
          77000,
          108000,
        ],
        animationDelay: idx => (idx * 50) + 2500,
        lineStyle: {
          normal: {
            width: 2.5,
          },
        },
      },
      {
        name: 'KPMG',
        type: 'line',
        data: [
          33000,
          33000,
          31350,
          52000,
          52000,
          52000,
          74000,
          74000,
          74000,
          95000,
          95000,
          95000,
          95000,
        ],
        animationDelay: idx => (idx * 50) + 3500,
        lineStyle: {
          normal: {
            width: 2.5,
          },
        },
      },
      {
        name: 'Accenture',
        type: 'line',
        data: [
          36000,
          36000,
          50000,
          50000,
          50000,
          73000,
          73000,
          73000,
          73000,
          123000,
          123000,
          123000,
          123000,
        ],
        animationDelay: idx => (idx * 50) + 4500,
        lineStyle: {
          normal: {
            width: 2.5,
          },
        },
      },
      {
        name: 'PA Consulting',
        type: 'line',
        data: [
          34500,
          34500,
          42000,
          42000,
          52000,
          52000,
          52000,
          68000,
          68000,
          98500,
          98500,
          98500,
          98500,
        ],
        animationDelay: idx => (idx * 50) + 5500,
        lineStyle: {
          normal: {
            width: 2.5,
          },
        },
      },
    ],
  };

  return options;
}

export function drawConusltingLevelProgressionStacked() {
  const options = {
    title: {
      show: false,
      left: 'center',
      text: 'Career Progression',
      textStyle: {
        fontSize: 22,
        fontWeight: 'bolder',
      },
    },
    tooltip: {
      position: 'top',
      show: true,
      trigger: 'axis',
      showContent: false,
    },
    color: ['#735a8b'],
    xAxis: {
      type: 'category',
      name: 'Years Experience',
      position: 'bottom',
      nameLocation: 'middle',
      nameGap: 20,
      boundaryGap: true,
      splitLine: {
        show: true,
      },
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    yAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['IBM', 'Accenture', 'EY', 'KPMG', 'Deloitte', 'PA Consulting'],
    },
    series: [
      {
        type: 'line',
        name: 'Band 5 / TE',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [0, 0],
          },
          [2, 0],
        ],
      },
      {
        type: 'line',
        name: 'Band 6',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [2, 0],
          },
          [3, 0],
        ],
      },
      {
        type: 'line',
        name: 'Band 7',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [3, 0],
          },
          [6, 0],
        ],
      },
      {
        type: 'line',
        name: 'Band 8',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [6, 0],
          },
          [9, 0],
        ],
      },
      {
        type: 'line',
        name: 'Band 9',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [9, 0],
          },
          [12, 0],
        ],
      },
      {
        type: 'line',
        name: 'Analyst',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [0, 1],
          },
          [2, 1],
        ],
      },
      {
        type: 'line',
        name: 'Consultant',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [2, 1],
          },
          [5, 1],
        ],
      },
      {
        type: 'line',
        name: 'Manager',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [5, 1],
          },
          [10, 1],
        ],
      },
      {
        type: 'line',
        name: 'Senior Manager',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [10, 1],
          },
          [12, 1],
        ],
      },
      {
        type: 'line',
        name: 'Consultant',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [0, 2],
          },
          [3, 2],
        ],
      },
      {
        type: 'line',
        name: 'Senior Consultant',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [3, 2],
          },
          [6, 2],
        ],
      },
      {
        type: 'line',
        name: 'Manager',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [6, 2],
          },
          [9, 2],
        ],
      },
      {
        type: 'line',
        name: 'Senior Manager',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [9, 2],
          },
          [12, 2],
        ],
      },
      {
        type: 'line',
        name: 'Analyst',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [0, 3],
          },
          [3, 3],
        ],
      },
      {
        type: 'line',
        name: 'Assistant Manager',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [3, 3],
          },
          [6, 3],
        ],
      },
      {
        type: 'line',
        name: 'Manager',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [6, 3],
          },
          [9, 3],
        ],
      },
      {
        type: 'line',
        name: 'Senior Manager',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [9, 3],
          },
          [12, 3],
        ],
      },
      {
        type: 'line',
        name: 'Analyst',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [0, 4],
          },
          [2, 4],
        ],
      },
      {
        type: 'line',
        name: 'Consultant',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [2, 4],
          },
          [4, 4],
        ],
      },
      {
        type: 'line',
        name: 'Senior Consultant',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [4, 4],
          },
          [8, 4],
        ],
      },
      {
        type: 'line',
        name: 'Manager',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [8, 4],
          },
          [12, 4],
        ],
      },
      {
        type: 'line',
        name: 'Analyst',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [0, 5],
          },
          [2, 5],
        ],
      },
      {
        type: 'line',
        name: 'Consultant Analyst',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [2, 5],
          },
          [4, 5],
        ],
      },
      {
        type: 'line',
        name: 'Consultant',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [4, 5],
          },
          [7, 5],
        ],
      },
      {
        type: 'line',
        name: 'Principal Consultant',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [7, 5],
          },
          [9, 5],
        ],
      },
      {
        type: 'line',
        name: 'Managing Consultant',
        coordinateSystem: 'cartesian2d',
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        showSymbol: true,
        data: [
          {
            label: {
              normal: {
                show: true,
                formatter: '{a}',
              },
            },
            value: [9, 5],
          },
          [12, 5],
        ],
      },
    ],
  };

  return options;
}

export function drawConsultingJobSpecPercentage() {
  const options = {
    title: {
      show: false,
      left: 'center',
      text: 'How The Job Changes Over Time',
      textStyle: {
        fontSize: 22,
        fontWeight: 'bolder',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      // eslint-disable-next-line no-unused-vars
      formatter(params, ticket, callback) {
        let text = '<strong>' + params[0].name + '</strong></br>';
        for (let i = 0; i < params.length; i++) {
          if (params[i].value > 0) {
            text += params[i].seriesName + ': ' + params[i].value + '%</br>';
          }
        }
        return text;
      },
    },
    legend: {
      padding: [36, 5],
      data: ['Analysis', 'Management', 'Solutioning', 'Influencing & Selling'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: '% of Time Spent',
      position: 'bottom',
      nameLocation: 'middle',
      padding: [10, 30],
    },
    yAxis: {
      type: 'category',
      nameGap: 20,
      axisLabel: {
        margin: 20,
      },
      data: ['Analyst', 'Consultant', 'Manager', 'Senior Manager', 'Director'],
    },
    color: ['#735a8b', '#bd94b4', '#944a9c', '#d5a4de', '#392939', '#ff9494'],
    series: [
      {
        name: 'Analysis',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'inside',
            // eslint-disable-next-line no-unused-vars
            formatter(params, ticket, callback) {
              if (params.value > 0) {
                return params.value + '%';
              }
              return '';
            },
          },
        },
        data: [75, 50, 10, 0, 0],
      },
      {
        name: 'Management',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'inside',
            // eslint-disable-next-line no-unused-vars
            formatter(params, ticket, callback) {
              if (params.value > 0) {
                return params.value + '%';
              }
              return '';
            },
          },
        },
        data: [15, 25, 40, 20, 15],
      },
      {
        name: 'Solutioning',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'inside',
            // eslint-disable-next-line no-unused-vars
            formatter(params, ticket, callback) {
              if (params.value > 0) {
                return params.value + '%';
              }
              return '';
            },
          },
        },
        data: [10, 20, 30, 30, 20],
      },
      {
        name: 'Influencing & Selling',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'inside',
            // eslint-disable-next-line no-unused-vars
            formatter(params, ticket, callback) {
              if (params.value > 0) {
                return params.value + '%';
              }
              return '';
            },
          },
        },
        data: [0, 5, 20, 50, 65],
      },
    ],
  };

  return options;
}
