import { useConfigState } from "@context/Config";
import * as d3 from "d3";

const TestGraph: FC = () => {
    const [config, setConfig] = useConfigState();
    
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 20
    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    const line = d3.line((d: any, i: any) => x(i), y);
    
    if (!config) return null;
    
    return (
        <svg width={width} height={height}>
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
            <g fill="white" stroke="currentColor" strokeWidth="1.5">
                {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
            </g>
        </svg>
    );
}

export default TestGraph;