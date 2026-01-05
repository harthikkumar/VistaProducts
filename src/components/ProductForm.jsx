
import React, { useState, useEffect } from "react";

function ProductForm({ onAddEdit, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    if (editingProduct) setForm(editingProduct);
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setForm({ ...form, image: reader.result });
  };
  reader.readAsDataURL(file);
};


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category) {
      alert("Name, Price, and Category are required.");
      return;
    }

    onAddEdit(form);
    setForm({ name: "", price: "", category: "", stock: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input name="name" placeholder="Name*" value={form.name} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price*" value={form.price} onChange={handleChange} />
      <input name="category" placeholder="Category*" value={form.category} onChange={handleChange} />
      <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />


      <input type="file" accept="image/*" onChange={handleImageChange} />

      {form.image && (
    <img src={form.image} width="100" />
)}

      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <button type="submit">{editingProduct ? "Update" : "Add"} Product</button>
    </form>
  );
}

export default ProductForm;







































