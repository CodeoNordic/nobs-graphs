import { AxisBottom } from "@components/Blocks/AxisBottom";
import { AxisLeft } from "@components/Blocks/AxisLeft";
import { useConfigState } from "@context/Config";
import { scaleBand, scaleLinear } from "d3";
import { FC, useEffect, useRef } from "react";

interface BarChartProps {
    data?: { label: string; value: number }[];
    width?: number;
    height?: number;
}

const BarChart: FC = ({ data, width = 500, height = 300 }: BarChartProps) => {
    const barsRef = useRef<SVGRectElement[]>([]);
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

    useEffect(() => {
        barsRef.current.forEach((rect, i) => {
            if (rect) {
                const finalWidth = xScale(data[i].value);
                
                rect.style.width = '0';
                
                setTimeout(() => {
                    rect.style.transition = `width ${0.5 + i * 0.1}s ease-out`;
                    rect.style.width = `${finalWidth}px`;
                }, 100 + i * 100);
            }
        });
    }, [data]);

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
                        ref={el => barsRef.current[i] = el!}
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