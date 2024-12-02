import { Link } from "react-router-dom";

export default function BlogButton({text}) {
  return (
    <div style={{ margin: "1rem", display:'flex', alignItems:'center', justifyContent:'center' }}>
        
      <Link to="/create-blog">
        <button
          style={{
            padding: "0.5rem 1rem",

            fontSize: "1rem",
            fontFamily:'Arial, sans-serif',
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {text}
        </button>
      </Link>
    </div>
  );
}
