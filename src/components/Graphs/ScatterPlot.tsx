import { AxisBottom } from "@components/Blocks/AxisBottom";
import { AxisLeft, AxisLeftLineTicks } from "@components/Blocks/AxisLeft";
import { useConfigState } from "@context/Config";
import { scaleBand, scaleLinear } from "d3";
import { FC } from "react";

interface ScatterPlotProps {
    data?: { x: number; y: number }[];
    width?: number;
    height?: number;
}

const ScatterPlot: FC = ({ data, width = 500, height = 300 }: ScatterPlotProps) => {
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
            { x: 30, y: 10 },
            { x: 70, y: 20 },
            { x: 50, y: 30 },
            { x: 90, y: 40 },
            { x: 60, y: 50 },
            { x: 80, y: 60 },
            { x: 30, y: 20 },
            { x: 70, y: 30 },
            { x: 50, y: 40 },
            { x: 90, y: 50 },
            { x: 60, y: 60 },
            { x: 80, y: 70 }
        ]
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = scaleLinear()
        .domain([0, Math.max(...data.map(d => d.x))])
        .range([0, innerWidth]);

    const yScale = scaleLinear()
        .domain([0, Math.max(...data.map(d => d.y))])
        .range([0, innerHeight]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom xScale={xScale} innerHeight={innerHeight} />
                <AxisLeftLineTicks yScale={yScale} innerWidth={innerWidth} />
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