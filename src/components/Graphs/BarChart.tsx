import { useConfigState } from "@context/Config";
import { scaleBand, scaleLinear } from "d3";
import { FC } from "react";

interface BarChartProps {
    data?: { label: string; value: number }[];
    width?: number;
    height?: number;
}

const BarChart: FC = ({ data, width = 300, height = 300 }: BarChartProps) => {
    const [config, setConfig] = useConfigState();
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    }
    
    if (!config) return null;

    // test values
    if (!data) {
        data = [
            { label: 'A', value: 30 },
            { label: 'B', value: 70 },
            { label: 'C', value: 50 },
            { label: 'D', value: 90 }
        ];
    }

    const yScale = scaleBand()
        .domain(data.map(d => d.label))
        .range([0, height])
        .padding(0.1);

    const xScale = scaleLinear()
        .domain([0, Math.max(...data.map(d => d.value))])
        .range([0, width]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {xScale.ticks().map((tick, i) => (
                    <g
                        key={i}
                        transform={`translate(${xScale(tick)}, 0)`}
                    >
                        <line
                            x1={0}
                            x2={xScale(tick)}
                            y1={0}
                            y2={height}
                            stroke="lightgray"
                        />
                    </g>
                ))}
                {data.map((d, i) => {
                    const x = 0;
                    const y = yScale(d.label) || 0;
                    const barHeight = yScale.bandwidth();
                    const barWidth = xScale(d.value);

                    return (
                        <rect
                            key={i}
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill="steelblue"
                        />
                    );
                })}
            </g>
        </svg>
    );
}

export default BarChart;