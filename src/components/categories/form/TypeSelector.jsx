const TypeSelector = ({ selectedType, onTypeChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-primary">Type</label>
      <div className="grid grid-cols-2 gap-2">
        {['expense', 'income'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onTypeChange(type)}
            className={`p-3 rounded-lg border transition-finance capitalize ${
              selectedType === type
                ? 'bg-accent text-surface border-accent'
                : 'bg-background text-primary border-light hover:border-accent'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeSelector;