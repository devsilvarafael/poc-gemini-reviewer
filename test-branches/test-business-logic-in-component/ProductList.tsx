import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

// ❌ VIOLAÇÃO: Toda a lógica de negócios está dentro do componente
// Deveria estar em hooks (useFetchProducts, useProductFilters) e services (productService)
export default function ProductList(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  // ❌ VIOLAÇÃO: Fetch de dados direto no componente — deveria ser um hook ou service
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const response = await fetch('/api/products');
      const data: Product[] = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // ❌ VIOLAÇÃO: Lógica de filtragem e ordenação no componente
  useEffect(() => {
    let result = [...products];

    // Filtragem por busca
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtragem por categoria
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Ordenação
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.price - b.price;
    });

    setFiltered(result);
  }, [products, search, category, sortBy]);

  // ❌ VIOLAÇÃO: Cálculo de negócios no componente
  const totalValue = filtered.reduce((sum, p) => sum + p.price * p.stock, 0);
  const outOfStock = filtered.filter((p) => p.stock === 0).length;

  // ❌ VIOLAÇÃO: Formatação de moeda no componente — deveria ser em utils
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // ❌ VIOLAÇÃO: handler sem prefixo "handle"
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <div className="product-list">
      <div className="filters">
        <input value={search} onChange={changeSearch} placeholder="Buscar..." />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Todas</option>
          <option value="electronics">Eletrônicos</option>
          <option value="clothing">Roupas</option>
        </select>
      </div>

      <div className="summary">
        <p>Valor total: {formatCurrency(totalValue)}</p>
        <p>Sem estoque: {outOfStock}</p>
      </div>

      <ul>
        {filtered.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{formatCurrency(product.price)}</span>
            <span>Estoque: {product.stock}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
