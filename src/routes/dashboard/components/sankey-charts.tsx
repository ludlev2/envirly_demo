import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { Card, Button } from "antd";
import { DollarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Text } from "@/components";

interface Node {
    id: string;
}

interface Link {
    source: string;
    target: string;
    value: number;
}

interface SankeyData {
    nodes: Node[];
    links: Link[];
}

interface SankeyDiagramProps {
    data: SankeyData;
    width: number;
    height: number;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ data, width, height }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const svg = d3.select(ref.current);

        const sankeyGenerator = sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 5]]);

        const { nodes, links } = sankeyGenerator(data);

        svg.append("g")
            .selectAll("rect")
            .data(nodes)
            .join("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("fill", "blue");

        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
            .selectAll("g")
            .data(links)
            .join("path")
            .attr("d", sankeyLinkHorizontal())
            .attr("stroke-width", d => Math.max(1, d.width));
    }, [data]);

    return (
        <Card
            style={{ height: "100%" }}
            headStyle={{ padding: "8px 16px" }}
            bodyStyle={{ padding: "24px 24px 0px 24px" }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <DollarOutlined />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Sankey Diagram
                    </Text>
                </div>
            }
            extra={
                <Button
                    onClick={() => { /* navigate to the appropriate page */ }}
                    icon={<RightCircleOutlined />}
                >
                    See details
                </Button>
            }
        >
            <svg ref={ref} style={{ width, height }} />
        </Card>
    );
};

export default SankeyDiagram;