import { AxisBottom } from "@components/Blocks/AxisBottom";
import { AxisLeft, AxisLeftLineTicks } from "@components/Blocks/AxisLeft";
import { useConfigState } from "@context/Config";
import { scaleBand, scaleLinear } from "d3";
import { FC } from "react";

interface ScatterPlotProps {
    data?: { x: number; y: number }[];
    width?: number;
    height?: number;
    xLabel?: string;
    yLabel?: string;
}

const ScatterPlot: FC = ({ data, width = 500, height = 300, xLabel, yLabel }: ScatterPlotProps) => {
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
            // Cluster around (20, 30)
            { x: 19.28, y: 29.14 },
            { x: 19.44, y: 33.51 },
            { x: 19.36, y: 22.51 },
            { x: 21.66, y: 28.66 },
            { x: 18.92, y: 30.58 },
            { x: 15.75, y: 27.21 },
            { x: 24.05, y: 29.37 },
            { x: 24.49, y: 27.10 },
            { x: 11.79, y: 32.58 },
            { x: 19.75, y: 32.11 },
            { x: 19.19, y: 29.16 },
            { x: 18.78, y: 29.76 },
            { x: 18.22, y: 31.49 },
            { x: 15.05, y: 33.53 },
            { x: 26.33, y: 24.17 },

            // Cluster around (60, 80)
            { x: 58.49, y: 90.09 },
            { x: 64.71, y: 78.40 },
            { x: 56.40, y: 74.66 },
            { x: 52.18, y: 88.20 },
            { x: 51.29, y: 78.16 },
            { x: 74.28, y: 85.11 },
            { x: 61.54, y: 65.25 },
            { x: 69.44, y: 76.38 },
            { x: 32.59, y: 71.15 },
            { x: 54.00, y: 96.15 },
            { x: 69.52, y: 86.50 },
            { x: 82.70, y: 84.49 },
            { x: 53.60, y: 83.67 },
            { x: 37.17, y: 79.56 },
            { x: 59.20, y: 82.76 },

            // Cluster around (90, 40)
            { x: 103.14, y: 46.27 },
            { x: 88.21, y: 36.12 },
            { x: 86.55, y: 30.63 },
            { x: 95.55, y: 33.80 },
            { x: 85.96, y: 43.35 },
            { x: 94.05, y: 35.15 },
            { x: 83.86, y: 37.05 },
            { x: 101.08, y: 29.08 },
            { x: 93.28, y: 43.98 },
            { x: 82.68, y: 47.22 },
            { x: 84.34, y: 37.41 },
            { x: 81.54, y: 46.63 },
            { x: 88.23, y: 33.62 },
            { x: 82.46, y: 46.10 },
            { x: 97.06, y: 31.44 },

            // Random outliers
            { x: 25.95, y: 13.22 },
            { x: 82.59, y: 83.67 },
            { x: 21.44, y: 26.27 },
            { x: 92.29, y: 31.13 },
            { x: 8.01,  y: 88.39 }
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
        .range([0, innerHeight]);

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
                {data.map((d, i) =>
                    <circle
                        key={i}
                        cx={xScale(d.x) || 0}
                        cy={yScale(d.y) || 0}
                        r={5}
                        fill="steelblue"
                    >
                        {/* TODO: change to custom tooltip */}
                        <title>{`${d.x}, ${d.y}`}</title>
                    </circle>
                )}
            </g>
        </svg>
    );
}

export default ScatterPlot;