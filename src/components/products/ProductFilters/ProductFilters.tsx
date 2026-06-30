import { useDebounce } from "@/hooks/useDebounce";
import { useCategories } from "@/hooks/useProducts";
import type {
  ProductFilters as Filters,
  ProductViewMode,
} from "@/types/product";
import { useEffect, useState } from "react";
import styles from "./ProductFilters.module.scss";

type ProductFiltersProps = {
  filters: Filters;
  onChange: (updates: Partial<Filters>) => void;
};

const ProductFilters = ({ filters, onChange }: ProductFiltersProps) => {
  const { data: categories = [] } = useCategories();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, onChange]);

  const hasActiveFilters =
    filters.search || filters.category || filters.minPrice || filters.maxPrice;

  const handleClear = () => {
    setSearchInput("");
    onChange({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      page: 1,
    });
  };

  const setView = (view: ProductViewMode) => onChange({ view });

  const handlePriceChange = (field: "minPrice" | "maxPrice", value: string) => {
    if (value === "") {
      onChange({ [field]: "" });
      return;
    }

    if (value.startsWith("-")) return;

    const num = Number(value);
    if (Number.isFinite(num) && num < 0) return;

    onChange({ [field]: value });
  };

  const blockNegativeKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "-" || event.key === "e" || event.key === "E") {
      event.preventDefault();
    }
  };

  return (
    <section className={styles.filters} aria-label="Filteri proizvoda">
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="search">
            Pretraga
          </label>
          <input
            id="search"
            type="search"
            className={styles.input}
            placeholder="Pretraži po nazivu…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-describedby="search-hint"
          />
          <span id="search-hint" className={styles.screenReaderOnly}>
            Rezultati se ažuriraju nakon pauze u unosu
          </span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="category">
            Kategorija
          </label>
          <select
            id="category"
            className={styles.select}
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
          >
            <option value="">Sve kategorije</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="minPrice">
            Min. cijena
          </label>
          <input
            id="minPrice"
            type="number"
            min={0}
            step={0.01}
            className={styles.input}
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
            onKeyDown={blockNegativeKey}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="maxPrice">
            Max. cijena
          </label>
          <input
            id="maxPrice"
            type="number"
            min={0}
            step={0.01}
            className={styles.input}
            placeholder="9999"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            onKeyDown={blockNegativeKey}
          />
        </div>
      </div>

      <div className={styles.toolbar}>
        <div
          className={styles.viewToggle}
          role="group"
          aria-label="Način prikaza"
        >
          <button
            type="button"
            className={styles.viewBtn}
            aria-pressed={filters.view === "grid"}
            onClick={() => setView("grid")}
          >
            Kartice
          </button>
          <button
            type="button"
            className={styles.viewBtn}
            aria-pressed={filters.view === "table"}
            onClick={() => setView("table")}
          >
            Tablica
          </button>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
          >
            Očisti filtere
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductFilters;
