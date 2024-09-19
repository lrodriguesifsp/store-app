import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>StoreApp</h1>

      <h2>Products</h2>
      <div class="products">
        {products.map((product) => (
          <div key={product.id} class="product">
            <img src={product.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJfnLgDiGKYaxVQApYVsxChexmtMbI42TYw&s"} alt={product.name} />
            <h2>{product.name}</h2>            
            {product.description && <p>{product.description}</p>}
            <p><b>Preço:</b> R$ {product.price}</p>
            <p>{product.stock}x unidade(s) em estoque</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
