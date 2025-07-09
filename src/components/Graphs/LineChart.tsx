import { AxisBottom } from "@components/Blocks/AxisBottom";
import { AxisLeft, AxisLeftLineTicks } from "@components/Blocks/AxisLeft";
import { useConfigState } from "@context/Config";
import { line, scaleBand, scaleLinear } from "d3";
import { FC } from "react";

interface LineChartProps {
    data?: { x: number; y: number }[];
    width?: number;
    height?: number;
    xLabel?: string;
    yLabel?: string;
}

const LineChart: FC = ({ data, width = 500, height = 300, xLabel, yLabel }: LineChartProps) => {
    const [config, setConfig] = useConfigState();
    const margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50
    }
    
    if (!config) return null;

    // test values
    if (!data) {
        data = [
            { x: 1, y: 110.66 },
            { x: 2, y: 127.71 },
            { x: 3, y: 144.21 },
            { x: 4, y: 191.78 },
            { x: 5, y: 145.22 },
            { x: 6, y: 131.05 },
            { x: 7, y: 137.56 },
            { x: 8, y: 76.12 },
            { x: 9, y: 88.36 },
            { x: 10, y: 99.82 },
            { x: 11, y: 129.0 },
            { x: 12, y: 183.6 },
            { x: 13, y: 213.19 },
            { x: 14, y: 229.47 },
            { x: 15, y: 203.3 },
            { x: 16, y: 242.10 },
            { x: 17, y: 239.78 },
            { x: 18, y: 263.84 },
            { x: 19, y: 316.12 },
            { x: 20, y: 284.55 },
            { x: 21, y: 309.42 },
            { x: 22, y: 330.17 },
            { x: 23, y: 357.80 },
            { x: 24, y: 338.29 },
            { x: 25, y: 300.10 },
            { x: 26, y: 292.45 },
            { x: 27, y: 328.03 },
            { x: 28, y: 354.20 },
            { x: 29, y: 383.65 },
            { x: 30, y: 358.12 },
            { x: 31, y: 371.55 },
            { x: 32, y: 360.29 },
            { x: 33, y: 395.86 },
            { x: 34, y: 410.67 },
            { x: 35, y: 407.12 },
            { x: 36, y: 389.44 },
            { x: 37, y: 302.48 },
            { x: 38, y: 348.04 },
            { x: 39, y: 347.66 },
            { x: 40, y: 346.83 },
            { x: 41, y: 338.75 },
            { x: 42, y: 312.31 },
            { x: 43, y: 313.83 },
            { x: 44, y: 298.83 },
            { x: 45, y: 272.09 },
            { x: 46, y: 270.25 },
            { x: 47, y: 297.19 },
            { x: 48, y: 335.58 },
            { x: 49, y: 387.08 },
            { x: 50, y: 400.13 }
        ];
    }
    if (!xLabel) {
        xLabel = "X Axis"; 
    }
    if (!yLabel) {
        yLabel = "Y Axis"; 
    }
    // End test values

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = scaleLinear()
        .domain([Math.min(...data.map(d => d.x)), Math.max(...data.map(d => d.x))])
        .range([0, innerWidth]);

    const yScale = scaleLinear()
        .domain([Math.min(...data.map(d => d.y)), Math.max(...data.map(d => d.y))])
        .range([innerHeight, 0]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom xScale={xScale} innerHeight={innerHeight} />
                <AxisLeftLineTicks yScale={yScale} innerWidth={innerWidth} />
                <text
                    x={innerWidth / 2}
                    y={innerHeight + 40}
                    textAnchor="middle"
                    style={{ fontSize: "20px", fill: "#635f5d" }}
                >
                    {xLabel}
                </text>
                <text
                    transform={`translate(-30, ${innerHeight / 2}) rotate(-90)`}
                    textAnchor="middle"
                    style={{ fontSize: "20px", fill: "#635f5d" }}
                >
                    {yLabel}
                </text>
                <path
                    d={line<{ x: number; y: number }>()
                        .x(d => xScale(d.x) || 0)
                        .y(d => yScale(d.y) || 0)(data) || ""}
                    fill="none"
                    stroke="steelblue"
                    strokeWidth={2}
                />
                {/* {data.map((d, i) =>
                    <circle
                        key={i}
                        cx={xScale(d.x) || 0}
                        cy={yScale(d.y) || 0}
                        r={5}
                        fill="steelblue"
                    > */}
                        {/* TODO: change to custom tooltip */}
                        {/* <title>{`${d.x}, ${d.y}`}</title>
                    </circle>
                )} */}
            </g>
        </svg>
    );
}

export default LineChart;