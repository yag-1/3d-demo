import { CONNECTOR_LINE_DEFAULT_COLOR } from "../../constants/constants";

interface ConnectorLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
}

const ConnectorLine = ({
  from,
  to,
  color = CONNECTOR_LINE_DEFAULT_COLOR,
}: ConnectorLineProps) => {
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      {/* Dashed line */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="6 4"
      />
      {/* Outer ring */}
      <circle
        cx={to.x}
        cy={to.y}
        r={12}
        fill="none"
        stroke={color}
        strokeWidth={2}
        opacity={0.4}
      />
      {/* Inner dot */}
      <circle cx={to.x} cy={to.y} r={5} fill={color} />
    </svg>
  );
};

export default ConnectorLine;
