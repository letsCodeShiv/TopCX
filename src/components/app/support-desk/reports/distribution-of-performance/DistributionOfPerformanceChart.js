import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { getColor, getPastDates, rgbaColor } from "helpers/utils";
import { useContext } from "react";
import AppContext from "context/Context";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import dayjs from "dayjs";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent,
]);

const getOptions = (isDark) => ({
  color: [getColor("primary"), isDark ? "#236EA1" : "#7DD7FE"],
  legend: {
    data: ["Agent Support", "Group Support"],
    icon: "circle",
    itemWidth: 10,
    itemHeight: 10,
    padding: [0, 0, 0, 0],
    textStyle: {
      color: getColor("gray-700"),
      fontWeight: "500",
      fontSize: "13px",
    },
    left: 0,
    itemGap: 16,
  },
  tooltip: {
    trigger: "item",
    padding: [7, 10],
    backgroundColor: getColor("gray-100"),
    borderColor: getColor("gray-300"),
    textStyle: { color: getColor("gray-900") },
    borderWidth: 1,
    transitionDuration: 0,
    axisPointer: {
      type: "none",
    },
  },
  xAxis: {
    data: getPastDates(12).map((date) => dayjs(date).format("MMM DD")),
    splitLine: { show: false },
    splitArea: { show: false },

    axisLabel: {
      color: getColor("gray-600"),
    },

    axisLine: {
      lineStyle: {
        color: getColor("gray-300"),
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        color: getColor("gray-300"),
        type: "dashed",
      },
    },
    axisLabel: {
      color: getColor("gray-600"),
    },
  },
  series: [
    {
      name: "Agent Support",
      type: "bar",
      stack: "one",
      emphasis: {
        itemStyle: {
          shadowColor: rgbaColor(getColor("dark"), 0.3),
        },
      },
      data: [50, 25, 35, 30, 45, 35, 38, 30, 35, 30, 35, 38],
    },
    {
      name: "Group Support",
      type: "bar",
      stack: "one",
      emphasis: {
        itemStyle: {
          shadowColor: rgbaColor(getColor("dark"), 0.3),
        },
      },
      data: [45, 50, 40, 35, 50, 40, 44, 35, 40, 45, 40, 44],
      itemStyle: {
        borderRadius: [3, 3, 0, 0],
      },
    },
  ],
  barWidth: "15px",
  grid: {
    top: "15%",
    bottom: 0,
    left: 0,
    right: 0,
    containLabel: true,
  },
});

const DistributionOfPerformanceChart = () => {
  const { config } = useContext(AppContext);
  const { isDark } = config;
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={getOptions(isDark)}
      style={{ height: "21.875rem" }}
    />
  );
};

export default DistributionOfPerformanceChart;
