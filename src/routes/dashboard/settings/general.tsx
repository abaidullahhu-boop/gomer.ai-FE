import { useState } from "react";
import { ModelCard } from "@/components/dashboard/settings/ModelCard";
import { PersonalizationSection } from "@/components/dashboard/settings/PersonalizationSection";
import { models } from "@/data/models";

export default function SettingsGeneral() {
  const [selectedModel, setSelectedModel] = useState("smartest");

  return (
    <div className="flex flex-col gap-6">
      <PersonalizationSection />

      <div>
        <h2 className="font-body m-0 text-base font-medium tracking-tight text-foreground">
          Default model
        </h2>
        <p className="mt-1 mb-4 max-w-[640px] text-sm leading-normal text-muted-foreground">
          Used for conversations with Gomer and as a default for scheduled tasks.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              selected={selectedModel === model.id}
              onSelect={() => setSelectedModel(model.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
