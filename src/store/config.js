let config = {
  chartDefaultConfig: {
    chart: {
      zoomType: 'x',
      resetZoomButton: {
        position: {
          // align: 'right', // by default
          // verticalAlign: 'top', // by default
          x: 0,
          y: -30
        },
        relativeTo: 'chart'
      }
    },
    title: {
      text: ''
    },
    credits: {
      // enabled:true,    // 默认值，如果想去掉版权信息，设置为false即可
      text: 'NSRL@USTC', // 显示的文字
      href: 'http://www.nsrl.ustc.edu.cn'
    },
    tooltip: {
      split: false,
      shared: true
    },
    rangeSelector: false,
    legend: {
      enabled: true,
      verticalAlign: 'bottom',
      // layout: 'vertical',
      align: 'middle'
    }
  },
  referencePV: 'RNG:BEAM:CURR'
}

export default config
