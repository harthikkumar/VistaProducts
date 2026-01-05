import React, { useState } from "react";

function ProductList({ products, view, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      <div className={view === "list" ? "list-view" : "grid-view"}>
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
           
            <div className="product-content">
              <h2>{product.name}</h2>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock || "N/A"}</p>
              <p>{product.description}</p>

              <button onClick={() => onEdit(product)}>Edit</button>
              <button onClick={() => onDelete(product.id)} className="delete-btn">
                Delete
              </button>
            </div>

           
            <div className="product-image">
              {product.image && (
                <img src={product.image} alt={product.name} />
              )}
            </div>
          </div>
        ))}
      </div>

      
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <span>{currentPage} / {totalPages || 1}</span>
        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ProductList;






















