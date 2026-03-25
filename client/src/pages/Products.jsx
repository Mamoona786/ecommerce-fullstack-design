import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import FooterSection from "../components/common/FooterSection";
import NewsletterSection from "../components/common/NewsletterSection";
import ProductsBreadcrumb from "../components/products/ProductsBreadcrumb";
import ProductsSidebar from "../components/products/ProductsSidebar";
import ProductsToolbar from "../components/products/ProductsToolbar";
import ProductListCard from "../components/products/ProductListCard";
import ProductGridCard from "../components/products/ProductGridCard";
import ProductsPagination from "../components/products/ProductsPagination";
import { getAllProducts } from "../services/productService";
import { parsePrice, matchesRating, includesIgnoreCase } from "../utils/productHelpers";
import "../styles/products.css";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const urlSort = searchParams.get("sort") || "featured";
  const urlPage = Number(searchParams.get("page")) || 1;
  const urlView = searchParams.get("view") || "list";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("Any");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [sortOption, setSortOption] = useState(urlSort);
  const [viewMode, setViewMode] = useState(urlView);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  useEffect(() => {
    setSortOption(urlSort);
  }, [urlSort]);

  useEffect(() => {
    setViewMode(urlView);
  }, [urlView]);

  useEffect(() => {
    setCurrentPage(urlPage);
  }, [urlPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const filters = {};
        if (search.trim()) filters.search = search.trim();
        if (category.trim()) filters.category = category.trim();

        const data = await getAllProducts(filters);
        setProducts(Array.isArray(data?.products) ? data.products : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  const handleUpdateParams = (updates = {}) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
    handleUpdateParams({
      category: value || "",
      page: 1,
    });
  };

  const handleBrandChange = (brand) => {
    setCurrentPage(1);
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]
    );
  };

  const handleFeatureChange = (feature) => {
    setCurrentPage(1);
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((item) => item !== feature)
        : [...prev, feature]
    );
  };

  const handleConditionChange = (value) => {
    setCurrentPage(1);
    setSelectedCondition(value);
  };

  const handleRatingChange = (rating) => {
    setCurrentPage(1);
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );
  };

  const handleApplyPrice = () => {
    setCurrentPage(1);
    setAppliedMinPrice(minPriceInput);
    setAppliedMaxPrice(maxPriceInput);
  };

  const handleVerifiedChange = (value) => {
    setVerifiedOnly(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1);
    handleUpdateParams({
      sort: value,
      page: 1,
    });
  };

  const handleViewChange = (value) => {
    setViewMode(value);
    handleUpdateParams({
      view: value,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleUpdateParams({
      page,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
    handleUpdateParams({
      page: 1,
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedBrands.length) {
      result = result.filter((product) =>
        selectedBrands.some((brand) => includesIgnoreCase(product.title, brand))
      );
    }

    if (selectedFeatures.length) {
      result = result.filter((product) =>
        selectedFeatures.some((feature) =>
          (product.features || []).some((item) => includesIgnoreCase(item, feature))
        )
      );
    }

    if (selectedCondition !== "Any") {
      result = result.filter((product) =>
        includesIgnoreCase(product.condition || "", selectedCondition)
      );
    }

    if (appliedMinPrice !== "") {
      result = result.filter(
        (product) => parsePrice(product.price) >= Number(appliedMinPrice || 0)
      );
    }

    if (appliedMaxPrice !== "") {
      result = result.filter(
        (product) => parsePrice(product.price) <= Number(appliedMaxPrice || Infinity)
      );
    }

    if (selectedRatings.length) {
      result = result.filter((product) =>
        matchesRating(product.rating, selectedRatings)
      );
    }

    if (verifiedOnly) {
      result = result.filter((product) => product?.seller?.verified);
    }

    return result;
  }, [
    products,
    selectedBrands,
    selectedFeatures,
    selectedCondition,
    appliedMinPrice,
    appliedMaxPrice,
    selectedRatings,
    verifiedOnly,
  ]);

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sortOption) {
      case "price-asc":
        return result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

      case "price-desc":
        return result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

      case "newest":
        return result.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );

      case "featured":
      default:
        return result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }, [filteredProducts, sortOption]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));

  const paginatedProducts = useMemo(() => {
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage, totalPages]);

  useEffect(() => {
    if (currentPage > totalPages) {
      handlePageChange(1);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="products-page">
      <Header />
      <Navbar />

      <main className="products-main">
        <div className="container">
          <ProductsBreadcrumb />

          <div className="products-layout">
            <ProductsSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              selectedFeatures={selectedFeatures}
              onFeatureChange={handleFeatureChange}
              minPrice={minPriceInput}
              maxPrice={maxPriceInput}
              onMinPriceChange={setMinPriceInput}
              onMaxPriceChange={setMaxPriceInput}
              onApplyPrice={handleApplyPrice}
              selectedCondition={selectedCondition}
              onConditionChange={handleConditionChange}
              selectedRatings={selectedRatings}
              onRatingChange={handleRatingChange}
            />

            <section className="products-content">
              <ProductsToolbar
                totalItems={sortedProducts.length}
                activeCategoryLabel={selectedCategory || "All products"}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={handleVerifiedChange}
                sortOption={sortOption}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewChange={handleViewChange}
              />

              {loading && <p>Loading products...</p>}
              {error && <p>{error}</p>}

              {!loading && !error && sortedProducts.length === 0 && (
                <p>No products found.</p>
              )}

              {!loading && !error && sortedProducts.length > 0 && (
                <>
                  {viewMode === "grid" ? (
                    <div className="products-grid">
                      {paginatedProducts.map((product) => (
                        <ProductGridCard key={product._id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="products-list">
                      {paginatedProducts.map((product) => (
                        <ProductListCard key={product._id} product={product} />
                      ))}
                    </div>
                  )}

                  <ProductsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </>
              )}
            </section>
          </div>
        </div>
      </main>

      <NewsletterSection />
      <FooterSection />
    </div>
  );
}

export default Products;
