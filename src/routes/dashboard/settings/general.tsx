import { useCallback, useEffect, useState } from "react";
import { ModelCard } from "@/components/dashboard/settings/ModelCard";
import { PersonalizationSection } from "@/components/dashboard/settings/PersonalizationSection";
import { useSession } from "@/lib/session";
import {
  fetchCurrentWorkspace,
  fetchModels,
  updateWorkspaceSettings,
  type ApiModel,
  type Workspace,
} from "@/lib/api";

export default function SettingsGeneral() {
  const { user } = useSession();
  const isAdmin = user?.role === "admin";

  const [models, setModels] = useState<ApiModel[] | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchModels(), fetchCurrentWorkspace()])
      .then(([apiModels, currentWorkspace]) => {
        setModels(apiModels);
        setWorkspace(currentWorkspace);
        setSelectedModel(currentWorkspace.defaultModel);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  const selectModel = useCallback(
    (id: string) => {
      const previous = selectedModel;
      // Optimistic: the picker is a single click, so waiting on the round trip
      // to move the radio would feel broken. Reverted below if the save fails.
      setSelectedModel(id);
      setSaving(true);
      setError(null);
      updateWorkspaceSettings({ defaultModel: id })
        .then((updated) => setWorkspace(updated))
        .catch((err: Error) => {
          setSelectedModel(previous);
          setError(err.message);
        })
        .finally(() => setSaving(false));
    },
    [selectedModel],
  );

  return (
    <div className="flex flex-col gap-6">
      <PersonalizationSection workspace={workspace} readOnly={!isAdmin} onSaved={setWorkspace} />

      <div>
        <h2 className="font-body m-0 text-base font-medium tracking-tight text-foreground">
          Default model
        </h2>
        <p className="mt-1 mb-4 max-w-[640px] text-sm leading-normal text-muted-foreground">
          Used for conversations with Gomer and as a default for scheduled tasks.
          {isAdmin
            ? " Changing it applies to everyone in this workspace."
            : " Only admins can change it."}
        </p>

        {error && (
          <p role="alert" className="mb-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {models === null ? (
          <p className="text-sm text-muted-foreground">Loading models…</p>
        ) : (
          <div
            className={[
              "grid grid-cols-1 gap-3 transition-opacity sm:grid-cols-2",
              saving ? "opacity-60" : "",
            ].join(" ")}
          >
            {models.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                selected={selectedModel === model.id}
                readOnly={!isAdmin}
                onSelect={() => selectModel(model.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
