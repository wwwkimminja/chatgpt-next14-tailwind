'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useModelStore } from '@/store/model';

const MODELS = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o'];

export function ModelSelect() {
  const { model: currentModel, updateModel } = useModelStore();

  const handleChange = (selectModel: string) => {
    updateModel(selectModel);
  };

  return (
    <Select value={currentModel} onValueChange={handleChange}>
      <SelectTrigger className="border-none md:text-xl focus:ring-transparent">
        <SelectValue placeholder="Model Select" />
      </SelectTrigger>
      <SelectContent>
        {MODELS.map((model) => (
          <SelectItem
            key={model}
            value={model}
            disabled={currentModel === model}
          >
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
