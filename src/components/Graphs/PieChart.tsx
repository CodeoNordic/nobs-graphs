import { useConfigState } from "@context/Config";
import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface PieChartProps {
    data?: { label: string; value: number }[];
    width?: number;
    height?: number;
    innerRadius?: number;
    outerRadius?: number;
}

const PieChart: FC = ({ data, width = 300, height = 300, innerRadius = 0, outerRadius }: PieChartProps) => {
    const [config, setConfig] = useConfigState();
    const ref = useRef<SVGSVGElement>(null);
    
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

    const radius = outerRadius || Math.min(width, height) / 2;

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();

        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width/2},${height/2})`);

        const pie = d3.pie<any>()
            .sort(null)
            .value(d => d.value);

        const arcs = pie(data);

        const arcGen = (d3.arc() as any)
            .innerRadius(innerRadius)
            .outerRadius(radius);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(d3.schemeCategory10);

        g.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
                .attr('d', arcGen)
                .attr('fill', d => color(d.data.label) as any)
                .attr('stroke', 'white')
                .attr('stroke-width', 1)
            .transition()
                .duration(750)
                .attrTween('d', function(d) {
                    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                    return t => arcGen(i(t));
                });

        g.selectAll('text')
            .data(arcs)
            .enter()
            .append('text')
                .attr('transform', d => `translate(${arcGen.centroid(d)})`)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('font-size', '12px')
                .text(d => d.data.label);


    }, [data, width, height, innerRadius, outerRadius]);

    return (
        <svg ref={ref} width={width} height={height}></svg>
    );
}

export default PieChart;