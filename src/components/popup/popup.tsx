import { POPUP_X_GAP, POPUP_Y_GAP } from "../../constants/constants";
import type { ProductData } from "../product/product.types";

interface PopupProps {
  product: ProductData;
  position: { x: number; y: number };
}

const Popup = ({ product, position }: PopupProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: position.x + POPUP_X_GAP,
        top: position.y + POPUP_Y_GAP,
        backgroundColor: "#ffffff",
        borderRadius: 4,
        padding: 0,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        pointerEvents: "none",
        minWidth: 240,
        maxWidth: 280,
        zIndex: 1000,
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 4,
          backgroundColor: "#4b66ff",
        }}
      />

      <div style={{ padding: "20px 24px" }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: 18,
            fontWeight: 700,
            color: "#111111",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          {product.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: "0 0 16px 0",
            fontSize: 14,
            lineHeight: 1.5,
            color: "#484848",
            fontWeight: 400,
          }}
        >
          {product.description}
        </p>

        {/* Price section */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#111111",
              letterSpacing: "-0.02em",
            }}
          >
            ${Math.floor(product.price)}
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#111111",
              position: "relative",
              top: -8,
            }}
          >
            {(product.price % 1).toFixed(2).substring(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Popup;
