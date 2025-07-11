import { AxisBottom } from "@components/Blocks/AxisBottom";
import { AxisLeft } from "@components/Blocks/AxisLeft";
import { useConfigState } from "@context/Config";
import { scaleBand, scaleLinear } from "d3";
import { FC } from "react";

interface BarChartProps {
    data?: { label: string; value: number }[];
    width?: number;
    height?: number;
}

const BarChart: FC = ({ data, width = 500, height = 300 }: BarChartProps) => {
    const [config, setConfig] = useConfigState();
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
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

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const yScale = scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerHeight])
        .padding(0.2);

    const xScale = scaleLinear()
        .domain([0, Math.max(...data.map(d => d.value))])
        .range([0, innerWidth])
        .nice();

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom xScale={xScale} innerHeight={innerHeight} />
                <AxisLeft yScale={yScale} />
                {data.map((d, i) =>
                    <rect
                        key={i}
                        y={yScale(d.label) || 0}
                        width={xScale(d.value)}
                        height={yScale.bandwidth()}
                        fill="steelblue"
                    >
                        {/* TODO: change to custom tooltip */}
                        <title>{`${d.value}`}</title>
                    </rect>
                )}
            </g>
        </svg>
    );
}

export default BarChart;