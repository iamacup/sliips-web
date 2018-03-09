import echarts from 'echarts';
import { dNc, logError } from '../utilities';

const echartsGraphClass = 'echarts-graph';

export function currencyFormatter() {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  });
}

function getNodes(domTarget) {
  let jQueryDomNode = null;
  let domNode = null;

  if (typeof domTarget === 'string') {
    jQueryDomNode = $('#' + domTarget);
    domNode = document.getElementById(domTarget);
  } else {
    jQueryDomNode = $(domTarget);
    domNode = domTarget;
  }

  return {
    jQueryDomNode,
    domNode,
  };
}

export function renderChartToTarget(domTarget, optionsObject) {
  if (!dNc(optionsObject)) {
    logError({ err: 'No Options Object!' });
    return null;
  }

  const { jQueryDomNode, domNode } = getNodes(domTarget);

  // we need to check that the 'echarts-graph' class is on the parent container
  if (!jQueryDomNode.hasClass(echartsGraphClass)) {
    jQueryDomNode.addClass(echartsGraphClass);
  }

  // now actually render the graph
  const myChart = echarts.init(domNode);
  myChart.setOption(optionsObject);
  return myChart;
}

export function redrawCharts() {
  $('.' + echartsGraphClass).each((index, vertex) => {
    const domTarget = $(vertex).get(0);

    const myChart = echarts.getInstanceByDom(domTarget);

    if (dNc(myChart) && dNc(myChart.resize)) {
      myChart.resize();
    }
  });
}

export function updateChartOptions(domTarget, optionsObject) {
  const { domNode } = getNodes(domTarget);

  // do the update
  const myChart = echarts.getInstanceByDom(domNode);
  myChart.setOption(optionsObject);
  return myChart;
}
