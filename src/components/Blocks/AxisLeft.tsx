import { ScaleBand } from "d3";

export const AxisLeft = ({ yScale }: { yScale: ScaleBand<string> }) => (
    <g className="axis axis--y">
        {yScale.domain().map((tick, i) => (
            <text
                x={-5}
                key={i}
                dy=".32em"
                y={(yScale(tick) || 0) + yScale.bandwidth() / 2}
                style={{ 
                    textAnchor: 'end',
                    fill: '#635f5d'
                }}
            >
                {tick}
            </text>
        ))}
    </g>
);