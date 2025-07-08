import { ScaleLinear } from "d3";

export const AxisBottom = ({ xScale, innerHeight }: { xScale: ScaleLinear<number, number, never>; innerHeight: number }) => (
    <g className="axis axis--x">
        {xScale.ticks().map((tick, i) => (
            <g
                key={i}
                transform={`translate(${xScale(tick)}, 0)`}
            >
                <line y2={innerHeight} stroke="lightgray" />
                <text
                    y={innerHeight + 3}
                    dy=".71em"
                    style={{ 
                        textAnchor: 'middle', 
                        fill: '#635f5d'
                    }}
                >
                    {tick}
                </text>
            </g>
        ))}
    </g>
);
