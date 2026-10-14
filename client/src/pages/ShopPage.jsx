// Page 1 of 6: the shop (start page)
// Lists products with category filters, search and sorting.
// The filters live in the address bar (?category=Plants&subcategory=Indoor&sort_by=...)
// so the browser back button and shared links work.

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJSON } from '../api';
import ProductCard from '../components/ProductCard.jsx';
import { BANNERS, CATEGORIES, SORT_OPTIONS } from '../utils';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort_by') || 'default';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState(search);

  // Load the products again every time a filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    if (search) params.set('search', search);
    if (sortBy !== 'default') params.set('sort_by', sortBy);

    setLoading(true);
    setError('');
    getJSON('/products?' + params.toString())
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category, subcategory, search, sortBy]);

  // Change one or more filters in the address bar. An empty value removes the filter.
  function updateFilters(changes) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    }
    setSearchParams(next);
  }

  function handleSearch(event) {
    event.preventDefault();
    updateFilters({ search: searchText.trim() });
  }

  function clearSearch() {
    setSearchText('');
    updateFilters({ search: '' });
  }

  const title = subcategory || category || 'All products';

  return (
    <div className="shop">
      <aside className="sidebar">
        <h2>Categories</h2>
        <button
          type="button"
          className={!category ? 'active' : ''}
          onClick={() => updateFilters({ category: '', subcategory: '' })}
        >
          All products
        </button>

        {Object.entries(CATEGORIES).map(([cat, subcategories]) => (
          <div key={cat} className="sidebar-group">
            <button
              type="button"
              className={'sidebar-category ' + (category === cat && !subcategory ? 'active' : '')}
              onClick={() => updateFilters({ category: cat, subcategory: '' })}
            >
              {cat}
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                type="button"
                className={'sidebar-sub ' + (subcategory === sub ? 'active' : '')}
                onClick={() => updateFilters({ category: cat, subcategory: sub })}
              >
                {sub}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <section className="shop-main">
        {BANNERS[subcategory] && <img className="banner" src={BANNERS[subcategory]} alt="" />}

        <div className="toolbar">
          <h1>{title}</h1>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search products"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <label className="sort">
            Sort by{' '}
            <select
              value={sortBy}
              onChange={(event) => updateFilters({ sort_by: event.target.value === 'default' ? '' : event.target.value })}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {search && (
          <p className="small">
            Showing results for "{search}".{' '}
            <button type="button" className="link-button" onClick={clearSearch}>
              Clear search
            </button>
          </p>
        )}

        {loading && <p>Loading products...</p>}
        {error && <p className="message error">{error}</p>}
        {!loading && !error && products.length === 0 && <p>No products found.</p>}

        {!loading && !error && (
          <>
            <p className="small">{products.length} products</p>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
