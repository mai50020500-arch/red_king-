import { useState, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';

interface GraphNode {
    id: string;
    group: number;
    val?: number;
    label?: string;
}

interface GraphLink {
    source: string;
    target: string;
    is_shadow?: boolean;
    dashed?: boolean;
}

interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

const NeuralMesh = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [pulse] = useState(false);

    useEffect(() => {
        const fetchTopology = async () => {
            try {
                const res = await fetch('/api/graph');
                if (res.ok) {
                    const data = await res.json();
                    setGraphData(data);
                }
            } catch (e) {}
        };

        fetchTopology();
        const interval = setInterval(fetchTopology, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <ForceGraph3D
                graphData={graphData}
                nodeAutoColorBy="group"
                nodeColor={(node: GraphNode) => {
                    if (node.id === 'SHADOW_RELAY' && pulse) return '#ffffff';
                    switch (node.group) {
                        case 1: return '#ff003c';
                        case 2: return '#bd00ff';
                        case 3: return '#00ff41';
                        default: return '#00f3ff';
                    }
                }}
                nodeLabel="label"
                linkColor={(link: GraphLink) => (link.is_shadow ? '#444444' : link.dashed ? '#00f3ff' : '#ffffff')}
                linkWidth={(link: GraphLink) => (link.is_shadow ? 0.2 : link.dashed ? 0.3 : 0.5)}
                linkOpacity={0.3}
                linkDirectionalArrowLength={(link: GraphLink) => (link.is_shadow ? 0 : 3)}
                linkDirectionalArrowRelPos={1}
                linkDirectionalParticles={(link: GraphLink) => (link.is_shadow ? 2 : 0)}
                linkDirectionalParticleWidth={0.5}
                linkDirectionalParticleSpeed={0.005}
                backgroundColor="#00000000"
                enableNodeDrag={false}
                showNavInfo={false}
                width={width}
                height={height}
            />
        </div>
    );
};

export default NeuralMesh;
