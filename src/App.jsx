import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList.jsx";
import ProductForm from "./components/ProductForm.jsx";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("list"); // list or grid
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

 
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );


  const addOrEditProduct = (product) => {
    if (editingProduct) {
      
      setProducts(products.map(p => p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p));
      setEditingProduct(null);
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
  };

  
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    if (editingProduct && editingProduct.id === id) setEditingProduct(null);
  };

  return (
    <div className="container">
      <h1>VistaProducts</h1>

      
      <div className="form-controls-wrapper">
        <ProductForm 
          onAddEdit={addOrEditProduct} 
          editingProduct={editingProduct} 
        />

        <div className="controls">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
          />
          <button 
            onClick={() => setView(view === "list" ? "grid" : "list")}
            className="toggle-view-btn"
          >
            Switch to {view === "list" ? "Grid View" : "List View"}
          </button>
        </div>
      </div>

      
      <ProductList 
        products={filteredProducts} 
        view={view} 
        onEdit={setEditingProduct}
        onDelete={deleteProduct} 
      />
    </div>
  );
}

export default App;
