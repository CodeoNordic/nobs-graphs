import { ScaleBand, ScaleLinear } from "d3";

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

export const AxisLeftLineTicks = ({ yScale, innerWidth }: { yScale: ScaleLinear<number, number, never>; innerWidth: number }) => (
    <g className="axis axis--x">
        {yScale.ticks().map((tick, i) => (
            <g
                key={i}
                transform={`translate(0, ${yScale(tick)})`}
            >
                <line x2={innerWidth} stroke="lightgray" />
                <text
                    x={-5}
                    dy=".32em"
                    style={{ 
                        textAnchor: 'end', 
                        fill: '#635f5d'
                    }}
                >
                    {tick}
                </text>
            </g>
        ))}
    </g>
);
