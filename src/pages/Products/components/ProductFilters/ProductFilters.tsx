import { Button, Input, Select } from "@/components/common";
import { useCategories } from "@/hooks/api/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { ViewMode } from "@/types/enums";
import type {
  ProductFilters as Filters,
  PriceFilterFields,
} from "@/types/product";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import styles from "./ProductFilters.module.scss";

interface ProductFiltersProps {
  filters: Filters;
  onChange: (updates: Partial<Filters>) => void;
}

const ProductFilters = ({ filters, onChange }: ProductFiltersProps) => {
  const { data: categories = [] } = useCategories();
  const [searchInput, setSearchInput] = useState(filters.search);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (debouncedSearch === searchInput && debouncedSearch !== filters.search) {
      onChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, searchInput, filters.search, onChange]);

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

  const setView = (view: ViewMode) => onChange({ view });

  const handlePriceChange = (field: PriceFilterFields, value: string) => {
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
      <Button
        unstyled
        type="button"
        className={styles.toggleBtn}
        aria-expanded={filtersExpanded}
        aria-controls="product-filters-inputs"
        onClick={() => setFiltersExpanded((expanded) => !expanded)}
      >
        <IoFilter />
        {filtersExpanded ? "Sakrij filtere" : "Prikaži filtere"}
        {hasActiveFilters && (
          <span className={styles.activeBadge} aria-hidden />
        )}
      </Button>

      <div
        id="product-filters-inputs"
        className={clsx(styles.rowWrapper, !filtersExpanded && styles.collapsed)}
      >
        <div className={styles.rowInner}>
          <div className={styles.row}>
            <Input
              id="search"
              label="Pretraga"
              type="search"
              placeholder="Pretraži po nazivu…"
              hint="Rezultati se ažuriraju nakon pauze u unosu"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <Select
              id="category"
              label="Kategorija"
              value={filters.category}
              onChange={(e) => onChange({ category: e.target.value })}
            >
              <option value="">Sve</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </Select>

            <Input
              id="minPrice"
              label="Min. cijena"
              type="number"
              min={0}
              step={0.01}
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange("minPrice", e.target.value)}
              onKeyDown={blockNegativeKey}
            />

            <Input
              id="maxPrice"
              label="Max. cijena"
              type="number"
              min={0}
              step={0.01}
              placeholder="9999"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
              onKeyDown={blockNegativeKey}
            />
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div
          className={styles.viewToggle}
          role="group"
          aria-label="Način prikaza"
        >
          <Button
            unstyled
            type="button"
            className={styles.viewBtn}
            aria-pressed={filters.view === ViewMode.GRID}
            onClick={() => setView(ViewMode.GRID)}
          >
            Kartice
          </Button>
          <Button
            unstyled
            type="button"
            className={styles.viewBtn}
            aria-pressed={filters.view === ViewMode.TABLE}
            onClick={() => setView(ViewMode.TABLE)}
          >
            Tablica
          </Button>
        </div>

        {hasActiveFilters && (
          <Button
            unstyled
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
          >
            Očisti filtere
          </Button>
        )}
      </div>
    </section>
  );
};

export default ProductFilters;
