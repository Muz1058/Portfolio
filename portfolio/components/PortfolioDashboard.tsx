"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpFromLine, GitBranch, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import initialContent from "@/data/content.json";

type Entry = Record<string, unknown>;
type CollectionKey = "projects" | "experience" | "certifications" | "skills" | "services";
type PortfolioContent = {
  projects: Entry[];
  experience: Entry[];
  certifications: Entry[];
  skills: Entry[];
  services: Entry[];
  currentlyLearning: string[];
  settings: Record<string, unknown>;
};

const defaultContent = initialContent as unknown as PortfolioContent;
const tabs: { key: CollectionKey | "copy" | "learning"; label: string }[] = [
  { key: "projects", label: "Projects" },
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Skills" },
  { key: "certifications", label: "Certifications" },
  { key: "services", label: "Services" },
  { key: "copy", label: "Site Copy" },
  { key: "learning", label: "Currently Learning" },
];

const emptyEntries: Record<CollectionKey, Entry> = {
  projects: { id: 0, title: "", category: "Personal", tags: [], problem: "", solution: "", result: "", tech: [], liveUrl: null, githubUrl: null, impactMetric: "" },
  experience: { id: 0, type: "work", role: "", organization: "", duration: "", bullets: [] },
  certifications: { id: 0, title: "", issuer: "", status: "Completed", link: null },
  skills: { category: "", items: [] },
  services: { id: 0, title: "", icon: "Monitor", tag: null, description: "" },
};

const collectionNames: Record<CollectionKey, string> = {
  projects: "Projects",
  experience: "Experience",
  certifications: "Certifications",
  skills: "Skill groups",
  services: "Services",
};

function cloneDefault(): PortfolioContent {
  return JSON.parse(JSON.stringify(defaultContent)) as PortfolioContent;
}

function isPortfolioContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  const collections = ["projects", "experience", "certifications", "skills", "services"];
  return collections.every((key) => Array.isArray(data[key]) && (data[key] as unknown[]).every(
    (entry) => Boolean(entry && typeof entry === "object" && !Array.isArray(entry)),
  )) && Array.isArray(data.currentlyLearning) && data.currentlyLearning.every((item) => typeof item === "string") && isSettings(data.settings);
}

function isSettings(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const settings = value as Record<string, unknown>;
  return ["hero", "about", "sectionHeadings", "contact"].every((key) => {
    const section = settings[key];
    return Boolean(section && typeof section === "object" && !Array.isArray(section));
  });
}

function fieldLabel(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function inputClass() {
  return "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";
}

export default function PortfolioDashboard() {
  const [content, setContent] = useState<PortfolioContent>(cloneDefault);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["key"]>("projects");
  const [settingsText, setSettingsText] = useState(JSON.stringify(defaultContent.settings, null, 2));
  const [settingsError, setSettingsError] = useState("");
  const [notice, setNotice] = useState("Edits stay in this browser until you publish them to GitHub.");
  const [authStatus, setAuthStatus] = useState<"checking" | "unconfigured" | "signed-out" | "signed-in">("checking");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [commitUrl, setCommitUrl] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/dashboard/session", { cache: "no-store" })
      .then(async (response) => ({ ok: response.ok, data: await response.json() as { configured?: boolean; authenticated?: boolean } }))
      .then(({ data }) => {
        if (!active) return;
        setAuthStatus(!data.configured ? "unconfigured" : data.authenticated ? "signed-in" : "signed-out");
      })
      .catch(() => {
        if (active) {
          setAuthStatus("unconfigured");
          setAuthError("Could not check dashboard publishing settings.");
        }
      });
    return () => { active = false; };
  }, []);

  const updateCollection = (key: CollectionKey, value: Entry[]) => {
    setContent((current) => ({ ...current, [key]: value }));
  };

  const updateEntry = (key: CollectionKey, index: number, field: string, value: unknown) => {
    const entries = content[key].map((entry, entryIndex) => entryIndex === index ? { ...entry, [field]: value } : entry);
    updateCollection(key, entries);
  };

  const addEntry = (key: CollectionKey) => {
    const entries = content[key];
    const template = { ...emptyEntries[key] };
    if ("id" in template) template.id = Math.max(0, ...entries.map((entry) => Number(entry.id) || 0)) + 1;
    updateCollection(key, [template, ...entries]);
    setNotice(`New ${collectionNames[key].toLowerCase()} entry added at the top of the draft. Publish when it is ready.`);
  };

  const removeEntry = (key: CollectionKey, index: number) => {
    updateCollection(key, content[key].filter((_, entryIndex) => entryIndex !== index));
    setNotice("Entry removed from the draft. Publish to GitHub to deploy this change.");
  };

  const saveDraft = () => {
    if (settingsError) {
      setNotice("Fix the Site Copy JSON before saving the draft.");
      return;
    }
    localStorage.setItem("portfolio-content-draft", JSON.stringify(content));
    setNotice("Draft saved in this browser. Publish to GitHub when you are ready to deploy it.");
  };

  const loadDraft = () => {
    const saved = localStorage.getItem("portfolio-content-draft");
    if (!saved) {
      setNotice("No saved draft was found in this browser.");
      return;
    }
    try {
      const parsed: unknown = JSON.parse(saved);
      if (!isPortfolioContent(parsed)) throw new Error("The saved draft has an unsupported format.");
      setContent(parsed);
      setSettingsText(JSON.stringify(parsed.settings, null, 2));
      setSettingsError("");
      setNotice("Saved draft loaded.");
    } catch {
      setNotice("The saved draft could not be loaded. Import a valid content.json file instead.");
    }
  };

  const exportContent = () => {
    if (settingsError) {
      setNotice("Fix the Site Copy JSON before exporting.");
      return;
    }
    const blob = new Blob([`${JSON.stringify(content, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "content.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("content.json exported. You can replace the repository file manually, or use Publish to GitHub.");
  };

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");
    try {
      const response = await fetch("/api/dashboard/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Could not sign in.");
      setPassword("");
      setAuthStatus("signed-in");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Could not sign in.");
    }
  };

  const signOut = async () => {
    await fetch("/api/dashboard/session", { method: "DELETE" });
    setAuthStatus("signed-out");
    setNotice("Signed out of dashboard publishing.");
  };

  const publishToGitHub = async () => {
    if (settingsError) {
      setNotice("Fix the Site Copy JSON before publishing.");
      return;
    }
    setPublishing(true);
    setCommitUrl("");
    setNotice("Publishing portfolio content to GitHub…");
    try {
      const response = await fetch("/api/dashboard/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = await response.json() as { error?: string; message?: string; commitUrl?: string };
      if (!response.ok) throw new Error(result.error ?? "GitHub rejected the content update.");
      setCommitUrl(result.commitUrl ?? "");
      setNotice(result.message ?? "Content pushed. Deployment will start from GitHub.");
      localStorage.setItem("portfolio-content-draft", JSON.stringify(content));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not publish to GitHub.");
    } finally {
      setPublishing(false);
    }
  };

  const importContent = async (file?: File) => {
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!isPortfolioContent(parsed)) throw new Error("This file is missing one or more content collections.");
      setContent(parsed);
      setSettingsText(JSON.stringify(parsed.settings, null, 2));
      setSettingsError("");
      setNotice("Content imported into the draft. Review it, then export to save it.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not read this JSON file.");
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const resetDraft = () => {
    setContent(cloneDefault());
    setSettingsText(JSON.stringify(defaultContent.settings, null, 2));
    setSettingsError("");
    setNotice("Draft reset to the content currently committed in the portfolio.");
  };

  const updateSettings = (value: string) => {
    setSettingsText(value);
    try {
      const parsed: unknown = JSON.parse(value);
      if (!isSettings(parsed)) throw new Error("Site Copy needs hero, about, sectionHeadings, and contact objects.");
      setContent((current) => ({ ...current, settings: parsed }));
      setSettingsError("");
    } catch (error) {
      setSettingsError(error instanceof Error ? error.message : "Invalid JSON.");
    }
  };

  const updateLearning = (index: number, value: string) => {
    setContent((current) => ({
      ...current,
      currentlyLearning: current.currentlyLearning.map((item, itemIndex) => itemIndex === index ? value : item),
    }));
  };

  const activeCollection = ["projects", "experience", "skills", "certifications", "services"].includes(activeTab)
    ? activeTab as CollectionKey
    : null;

  if (authStatus === "checking") {
    return <main className="min-h-screen px-4 pb-12 pt-28 sm:px-6 lg:px-8"><p className="mx-auto max-w-xl text-center text-muted">Checking dashboard access…</p></main>;
  }

  if (authStatus === "unconfigured") {
    return (
      <main className="min-h-screen px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <section className="glass mx-auto max-w-xl rounded-2xl p-8">
          <h1 className="text-2xl font-bold">GitHub publishing needs setup</h1>
          <p className="mt-3 text-muted">Set <code>DASHBOARD_PASSWORD</code> and <code>GITHUB_TOKEN</code> in the app&apos;s server environment, then restart or redeploy the app.</p>
          {authError && <p role="alert" className="mt-4 text-sm text-red-400">{authError}</p>}
        </section>
      </main>
    );
  }

  if (authStatus === "signed-out") {
    return (
      <main className="min-h-screen px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <form onSubmit={signIn} className="glass mx-auto max-w-md rounded-2xl p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Portfolio Admin</p>
          <h1 className="text-2xl font-bold">Sign in to publish</h1>
          <label className="mt-6 block text-sm font-medium" htmlFor="dashboard-password">Dashboard password</label>
          <input id="dashboard-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className={`${inputClass()} mt-2`} />
          {authError && <p role="alert" className="mt-3 text-sm text-red-400">{authError}</p>}
          <button type="submit" className="mt-5 w-full rounded-xl bg-primary px-5 py-3 font-bold text-[#0a0f1e]">Sign in</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Portfolio Admin</p>
            <h1 className="text-3xl font-bold md:text-4xl">Manage your portfolio</h1>
            <p className="mt-3 max-w-2xl text-muted">Edit portfolio content, save a local draft, then export the JSON file to commit and publish your changes.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-semibold text-primary hover:underline">View portfolio →</Link>
            <button type="button" onClick={() => void signOut()} className="text-sm text-muted hover:text-foreground">Sign out</button>
          </div>
        </header>

        <div className="mb-6 flex flex-wrap gap-3">
          <button onClick={saveDraft} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary"><Save size={16} /> Save draft</button>
          <button onClick={loadDraft} className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary">Load saved draft</button>
          <button onClick={() => fileInput.current?.click()} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary"><ArrowUpFromLine size={16} /> Import JSON</button>
          <input ref={fileInput} type="file" accept="application/json,.json" className="hidden" onChange={(event) => void importContent(event.target.files?.[0])} />
          <button onClick={resetDraft} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary"><RotateCcw size={16} /> Reset</button>
          <button onClick={exportContent} disabled={Boolean(settingsError)} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"><ArrowDownToLine size={16} /> Export JSON</button>
          <button onClick={() => void publishToGitHub()} disabled={Boolean(settingsError) || publishing} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-[#0a0f1e] shadow-[0_0_18px_rgba(0,212,255,0.24)] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"><GitBranch size={17} /> {publishing ? "Publishing…" : "Push to GitHub"}</button>
        </div>

        <div role="status" className="mb-6 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-muted">{notice}{commitUrl && <> <a href={commitUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary underline">View commit</a></>}</div>

        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          <nav aria-label="Content sections" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`shrink-0 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${activeTab === tab.key ? "bg-primary text-[#0a0f1e]" : "border border-border bg-card hover:border-primary"}`}>
                {tab.label}
                {tab.key !== "copy" && tab.key !== "learning" && <span className="ml-2 opacity-70">{content[tab.key].length}</span>}
              </button>
            ))}
          </nav>

          <section className="min-w-0 rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
            {activeCollection && (
              <>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{collectionNames[activeCollection]}</h2>
                    <p className="mt-1 text-sm text-muted">Edit fields directly. Use one item per line for list fields.</p>
                  </div>
                  <button type="button" onClick={() => addEntry(activeCollection)} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"><Plus size={16} /> Add</button>
                </div>
                <div className="space-y-5">
                  {content[activeCollection].map((entry, index) => (
                    <article key={`${activeCollection}-${index}`} className="rounded-2xl border border-border bg-background/50 p-4 sm:p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">{String(entry.title || entry.role || entry.category || `${collectionNames[activeCollection].slice(0, -1)} ${index + 1}`)}</h3>
                        <button onClick={() => removeEntry(activeCollection, index)} aria-label={`Remove ${collectionNames[activeCollection]} entry ${index + 1}`} className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-400"><Trash2 size={17} /></button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {Object.entries(entry).map(([field, value]) => {
                          const isList = Array.isArray(value);
                          const displayValue = isList ? (value as unknown[]).join("\n") : value === null ? "" : String(value);
                          const longText = isList || displayValue.length > 100 || ["problem", "solution", "result", "description", "bullets", "items"].includes(field);
                          return (
                            <label key={field} className={`block text-sm font-medium text-foreground/90 ${longText ? "md:col-span-2" : ""}`}>
                              <span className="mb-1.5 block">{fieldLabel(field)}</span>
                              {longText ? (
                                <textarea rows={isList ? Math.max(3, Math.min(8, (value as unknown[]).length + 2)) : 4} className={inputClass()} value={displayValue} onChange={(event) => updateEntry(activeCollection, index, field, isList ? event.target.value.split("\n").filter((item) => item.trim()) : event.target.value)} />
                              ) : (
                                <input className={inputClass()} type={typeof value === "number" ? "number" : "text"} value={displayValue} placeholder={value === null ? "Optional — blank saves as null" : ""} onChange={(event) => {
                                  const nextValue = typeof value === "number" ? Number(event.target.value) : value === null && !event.target.value ? null : event.target.value;
                                  updateEntry(activeCollection, index, field, nextValue);
                                }} />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                  {content[activeCollection].length === 0 && <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted">No entries yet. Use Add to create one.</p>}
                </div>
              </>
            )}

            {activeTab === "copy" && (
              <div>
                <h2 className="text-xl font-bold">Site Copy</h2>
                <p className="mb-4 mt-1 text-sm text-muted">Edit the hero, About section, headings, and contact text as JSON. Keep the same keys and value types.</p>
                <textarea aria-label="Site copy JSON" spellCheck={false} className={`${inputClass()} min-h-[560px] font-mono text-xs leading-6`} value={settingsText} onChange={(event) => updateSettings(event.target.value)} />
                {settingsError && <p role="alert" className="mt-3 text-sm text-red-400">{settingsError}</p>}
              </div>
            )}

            {activeTab === "learning" && (
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div><h2 className="text-xl font-bold">Currently Learning</h2><p className="mt-1 text-sm text-muted">Leave this list empty to hide the section from the portfolio.</p></div>
                  <button type="button" onClick={() => setContent((current) => ({ ...current, currentlyLearning: ["", ...current.currentlyLearning] }))} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"><Plus size={16} /> Add</button>
                </div>
                <div className="space-y-3">
                  {content.currentlyLearning.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input className={inputClass()} aria-label={`Learning item ${index + 1}`} value={item} onChange={(event) => updateLearning(index, event.target.value)} />
                      <button onClick={() => setContent((current) => ({ ...current, currentlyLearning: current.currentlyLearning.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Remove learning item ${index + 1}`} className="rounded-lg p-3 text-muted hover:bg-red-500/10 hover:text-red-400"><Trash2 size={17} /></button>
                    </div>
                  ))}
                  {content.currentlyLearning.length === 0 && <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted">Currently Learning is hidden because this list is empty.</p>}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
