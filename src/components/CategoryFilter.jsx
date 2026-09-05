const FILTERS = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

export default function CategoryFilter({
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={
            activeFilter === f
              ? "btn btn-primary"
              : "btn btn-outline"
          }
        >
          {f}
        </button>
      ))}
    </div>
  );
}
