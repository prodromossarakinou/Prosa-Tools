"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type BarcodeDetectorLike = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>;
};

type BarcodeDetectorClass = {
  new (options: { formats: string[] }): BarcodeDetectorLike;
};

declare global {
  interface Window {
    BarcodeDetector?: BarcodeDetectorClass;
  }
}

export function QrTool() {
  const [qrText, setQrText] = useState("");
  const [generatorState, setGeneratorState] = useState<"idle" | "loading" | "error">("idle");
  const [generatorError, setGeneratorError] = useState("");

  const [uploadResult, setUploadResult] = useState("");
  const [uploadState, setUploadState] = useState<"idle" | "loading" | "error">("idle");
  const [uploadError, setUploadError] = useState("");

  const [cameraResult, setCameraResult] = useState("");
  const [cameraState, setCameraState] = useState<"idle" | "scanning" | "error">("idle");
  const [cameraError, setCameraError] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);

  const cameraSupported = useMemo(() => {
    return typeof window !== "undefined" && !!window.BarcodeDetector && !!navigator.mediaDevices?.getUserMedia;
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  function stopCamera() {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraState("idle");
  }

  async function handleGenerateQr(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGeneratorError("");
    setGeneratorState("loading");

    try {
      const response = await fetch("/api/qr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: qrText }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: { message?: string } }
          | null;
        throw new Error(payload?.error?.message ?? "Failed to generate QR code.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "qr-code.png";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      setGeneratorState("idle");
    } catch (error) {
      setGeneratorState("error");
      setGeneratorError(error instanceof Error ? error.message : "Unexpected error.");
    }
  }

  async function handleReadUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fileInput = event.currentTarget.elements.namedItem("qr-image") as HTMLInputElement | null;
    const file = fileInput?.files?.[0] ?? null;

    if (!file) {
      setUploadState("error");
      setUploadError("Please select an image file first.");
      return;
    }

    setUploadState("loading");
    setUploadError("");
    setUploadResult("");

    const formData = new FormData();
    formData.set("file", file);

    try {
      const response = await fetch("/api/qr/read", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as
        | { success: true; data: { text: string } }
        | { success: false; error?: { message?: string } };

      if (!response.ok || !payload.success) {
        const message = "error" in payload ? payload.error?.message : undefined;
        throw new Error(message ?? "Unable to read QR code.");
      }

      setUploadResult(payload.data.text);
      setUploadState("idle");
    } catch (error) {
      setUploadState("error");
      setUploadError(error instanceof Error ? error.message : "Unexpected error.");
    }
  }

  async function startCamera() {
    if (!cameraSupported || !window.BarcodeDetector) {
      setCameraState("error");
      setCameraError("Live camera scanning is not supported in this browser.");
      return;
    }

    try {
      setCameraError("");
      setCameraResult("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraState("scanning");
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });

      const loop = async () => {
        if (!videoRef.current || !streamRef.current) {
          return;
        }

        try {
          const results = await detector.detect(videoRef.current);
          const value = results[0]?.rawValue?.trim();
          if (value) {
            setCameraResult(value);
            stopCamera();
            return;
          }
        } catch {
          // Keep scanning until a value is found or stopped.
        }

        frameRef.current = requestAnimationFrame(loop);
      };

      frameRef.current = requestAnimationFrame(loop);
    } catch {
      setCameraState("error");
      setCameraError("Camera access was blocked or unavailable.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Generate QR Code</h3>
        <form className="space-y-3" onSubmit={handleGenerateQr}>
          <textarea
            value={qrText}
            onChange={(event) => setQrText(event.target.value)}
            placeholder="Paste text or URL"
            className="min-h-28 w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-slate-500"
          />
          <button
            type="submit"
            disabled={!qrText.trim() || generatorState === "loading"}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {generatorState === "loading" ? "Generating..." : "Generate and Download"}
          </button>
          {generatorState === "error" ? <p className="text-sm text-rose-700">{generatorError}</p> : null}
        </form>
      </section>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Read QR from Image</h3>
        <form className="space-y-3" onSubmit={handleReadUpload}>
          <input
            name="qr-image"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          <button
            type="submit"
            disabled={uploadState === "loading"}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {uploadState === "loading" ? "Reading..." : "Read from Upload"}
          </button>
        </form>
        {uploadResult ? <p className="text-sm text-emerald-700">Decoded: {uploadResult}</p> : null}
        {uploadState === "error" ? <p className="text-sm text-rose-700">{uploadError}</p> : null}
      </section>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <h3 className="text-lg font-semibold text-slate-900">Read QR from Camera</h3>
        <video ref={videoRef} className="max-h-80 w-full rounded-lg border border-slate-200 bg-slate-100" muted playsInline />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={startCamera}
            disabled={cameraState === "scanning"}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {cameraState === "scanning" ? "Scanning..." : "Start Camera Scan"}
          </button>
          <button
            type="button"
            onClick={stopCamera}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Stop
          </button>
        </div>
        {!cameraSupported ? (
          <p className="text-sm text-amber-700">This browser does not support BarcodeDetector camera scanning.</p>
        ) : null}
        {cameraResult ? <p className="text-sm text-emerald-700">Decoded: {cameraResult}</p> : null}
        {cameraState === "error" ? <p className="text-sm text-rose-700">{cameraError}</p> : null}
      </section>
    </div>
  );
}
