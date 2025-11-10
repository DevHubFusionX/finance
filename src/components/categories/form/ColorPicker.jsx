import { Palette } from 'lucide-react';

const ColorPicker = ({ selectedColor, onColorChange }) => {
  const colors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', 
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-primary">Color</label>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onColorChange(color)}
            className={`w-10 h-10 rounded-full border-2 transition-finance ${
              selectedColor === color ? 'border-primary scale-110' : 'border-light'
            }`}
            style={{backgroundColor: color}}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <Palette className="w-4 h-4 text-secondary" />
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-8 h-8 rounded border border-light"
        />
        <span className="text-sm text-secondary">Custom color</span>
      </div>
    </div>
  );
};

export default ColorPicker;