import { useConfigState } from "@context/Config";
import * as d3 from "d3";
import { useMemo, FC } from "react";

interface AxisProps {
    domain?: [number, number];
    range?: [number, number];
}

const Axis = ({
    domain=[0, 100],
    range=[10, 290],
}: AxisProps) => {
    console.log("Axis", { domain, range });

    const ticks = useMemo(() => {
        const xScale = d3.scaleLinear()
            .domain(domain)
            .range(range)

        const width = range[1] - range[0]
        const pixelsPerTick = 30
        const numberOfTicksTarget = Math.max(
            1,
            Math.floor(
                width / pixelsPerTick
            )
        )

        return xScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                xOffset: xScale(value)
            }))
    }, [
        domain.join("-"),
        range.join("-")
    ])

    return (
        <svg
            style={{
                overflow: "visible",
            }}
        >
            <path
                d={[
                    "M", range[0], 6,
                    "v", -6,
                    "H", range[1],
                    "v", 6,
                ].join(" ")}
                fill="none"
                stroke="currentColor"
            />
            {ticks.map(({ value, xOffset }) => (
                <g
                    key={value}
                    transform={`translate(${xOffset}, 0)`}
                >
                    <line
                        y2="6"
                        stroke="currentColor"
                    />
                    <text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)"
                        }}>
                        { value }
                    </text>
                </g>
            ))}
        </svg>
    )
}
const TestGraph: FC = () => {
    const [config, setConfig] = useConfigState();
    
    if (!config) return null;
    
    const data = config.data
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 20
    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    const y = d3.scaleLinear(d3.extent(data) as [number, number], [height - marginBottom, marginTop]);
    const line = d3.line((d: any, i: any) => x(i), y);
    
    return (
        <div className="test-graph">
            <svg width={width} height={height}>
                <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data) || undefined} />
                <g fill="white" stroke="currentColor" strokeWidth="1.5">
                    {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
                </g>
            </svg>
            <Axis 
                domain={[0, data.length - 1]}
                range={[marginLeft, width - marginRight]}
            />
        </div>
    );
}

export default TestGraph;