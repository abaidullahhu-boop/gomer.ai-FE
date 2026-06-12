import { useState } from "react";
import { Info } from "lucide-react";
import { Dropdown } from "@/components/dashboard/Dropdown";
import { personalityOptions } from "@/data/models";

const MAX_INSTRUCTIONS = 4000;

export function PersonalizationSection() {
  const [personality, setPersonality] = useState("standard");
  const [instructions, setInstructions] = useState("");
  const [savedPersonality, setSavedPersonality] = useState("standard");
  const [savedInstructions, setSavedInstructions] = useState("");

  const hasChanges = personality !== savedPersonality || instructions !== savedInstructions;

  function handleSave() {
    setSavedPersonality(personality);
    setSavedInstructions(instructions);
  }

  return (
    <section>
      <h2 className="font-body m-0 text-base font-medium tracking-tight text-foreground">
        Personalization
      </h2>

      <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">Employee personality</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose a default tone for Viktor responses.
              </p>
            </div>

            <div className="w-full sm:ml-auto sm:w-[280px]">
              <Dropdown
                aria-label="Employee personality"
                value={personality}
                options={personalityOptions}
                onChange={setPersonality}
                className="relative w-full"
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-4 sm:px-5">
          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Workspace instructions</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Give Viktor extra instructions and context for your workspace.{" "}
                <button
                  type="button"
                  className="viktor-focus-ring inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                >
                  Examples
                  <Info className="size-4" strokeWidth={1.5} />
                </button>
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {instructions.length}/{MAX_INSTRUCTIONS}
            </span>
          </div>

          <div className="flex w-full flex-col gap-1.5 font-mono">
            <div
              className="viktor-focus-ring grid w-full overflow-hidden rounded-md border border-border bg-muted text-sm leading-5 transition-colors hover:border-border/80 focus-within:outline-2"
              style={{ maxHeight: 220 }}
            >
              <textarea
                aria-label="Workspace instructions"
                placeholder="Add custom instructions here"
                maxLength={MAX_INSTRUCTIONS}
                rows={8}
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                className="col-start-1 row-start-1 resize-none overflow-auto bg-transparent px-3 py-2 text-foreground outline-none placeholder:text-muted-foreground"
                style={{ maxHeight: 220 }}
              />
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              disabled={!hasChanges}
              onClick={handleSave}
              className="viktor-focus-ring inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-[7px] border-0 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-secondary/80 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
