"use client";

import { useMemo, useState } from "react";

type ConvertState = "idle" | "uploading" | "success" | "error";

export function WebpToPngForm() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<ConvertState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = useMemo(() => state !== "uploading" && !!file, [state, file]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setState("error");
      setErrorMessage("Please choose a .webp file first.");
      return;
    }

    setState("uploading");
    setErrorMessage("");

    const formData = new FormData();
    formData.set("file", file);

    try {
      const response = await fetch("/api/webp-to-png", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: { message?: string } }
          | null;
        const serverMessage = payload?.error?.message ?? "Failed to convert the image.";
        throw new Error(serverMessage);
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition") ?? "";
      const nameMatch = disposition.match(/filename=\"?([^\";]+)\"?/i);
      const outputName = nameMatch?.[1] ?? `${file.name.replace(/\.webp$/i, "")}.png`;

      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = outputName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);

      setState("success");
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Unexpected error.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">WebP to PNG Converter</h3>
        <p className="text-sm text-slate-600">Upload a single WebP image and download a PNG version.</p>
      </div>

      <div>
        <label htmlFor="webp-file" className="mb-2 block text-sm font-medium text-slate-700">
          Select file
        </label>
        <input
          id="webp-file"
          type="file"
          accept="image/webp,.webp"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setState("idle");
            setErrorMessage("");
          }}
          className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {state === "uploading" ? "Converting..." : "Convert and Download"}
      </button>

      {state === "success" ? <p className="text-sm text-emerald-700">Converted successfully.</p> : null}
      {state === "error" ? <p className="text-sm text-rose-700">{errorMessage}</p> : null}
    </form>
  );
}
