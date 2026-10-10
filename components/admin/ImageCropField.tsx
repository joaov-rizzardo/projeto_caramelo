"use client";

import Image from "next/image";
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { ImagePlus, RefreshCw, Undo2, ZoomIn } from "lucide-react";
import { cropImage } from "@/lib/admin/crop";
import { uploadImage } from "@/lib/admin/store";
import type { ImageSpec } from "@/lib/admin/models";
import { Button } from "./ui";

const MAX_BYTES = 15 * 1024 * 1024;

// Thrown by forms when `resolve()` comes back empty, so their save handler can
// tell "no photo yet" apart from a storage failure.
export class MissingPhoto extends Error {}

export interface ImageCropHandle {
  // Crops + uploads the photo being framed (if any) and returns the final URL:
  // the new upload, the untouched current value, or "" when there's no photo.
  resolve(): Promise<string>;
}

// Pick a photo → frame it in a cropper locked to the slot's aspect ratio.
// Nothing is cropped until the parent form saves and calls `resolve()`, which
// exports at the exact size the site uses and uploads it.
export function ImageCropField({
  ref,
  value,
  spec,
  label = "Foto",
}: {
  ref: Ref<ImageCropHandle>;
  value: string;
  spec: ImageSpec;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<string | null>(null); // object URL being framed
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Release the object URL when it's replaced or the field unmounts.
  useEffect(() => () => void (source && URL.revokeObjectURL(source)), [source]);

  useImperativeHandle(
    ref,
    () => ({
      async resolve() {
        if (!source || !area) return value;
        return uploadImage(await cropImage(source, area, spec));
      },
    }),
    [source, area, value, spec],
  );

  function pick(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Escolha um arquivo de imagem.");
    if (file.size > MAX_BYTES) return setError("Imagem muito grande (máx. 15 MB).");
    setError(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setArea(null);
    setSource(URL.createObjectURL(file));
  }

  const choose = () => inputRef.current?.click();

  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-wide text-navy/60">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = ""; // allow picking the same file again
        }}
      />

      {source ? (
        <div className="mt-1 overflow-hidden rounded-2xl bg-navy-900">
          <div className="relative" style={{ aspectRatio: spec.aspect }}>
            <Cropper
              image={source}
              crop={crop}
              zoom={zoom}
              maxZoom={4}
              aspect={spec.aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, pixels) => setArea(pixels)}
              objectFit="cover"
            />
          </div>
          <div className="space-y-3 bg-white p-3">
            <label className="flex items-center gap-3 text-navy/70">
              <ZoomIn className="h-4 w-4 shrink-0" aria-hidden />
              <span className="sr-only">Zoom</span>
              <input
                type="range"
                min={1}
                max={4}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-caramel"
              />
            </label>
            <p className="text-xs text-navy/60">
              Arraste e use o zoom para enquadrar. O recorte é aplicado ao salvar.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" className="px-3 py-1.5" onClick={choose}>
                <RefreshCw className="h-4 w-4" aria-hidden />
                Escolher outra
              </Button>
              {value && (
                <Button variant="ghost" className="px-3 py-1.5" onClick={() => setSource(null)}>
                  <Undo2 className="h-4 w-4" aria-hidden />
                  Manter a atual
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : value ? (
        <div className="mt-1">
          <div
            className="relative overflow-hidden rounded-2xl bg-cream-deep"
            style={{ aspectRatio: spec.aspect }}
          >
            <Image src={value} alt="" fill unoptimized sizes="480px" className="object-cover" />
          </div>
          <Button variant="ghost" className="mt-2" onClick={choose}>
            <RefreshCw className="h-4 w-4" aria-hidden />
            Trocar foto
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={choose}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            pick(e.dataTransfer.files[0]);
          }}
          className="mt-1 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-navy/20 bg-white text-navy/60 transition-colors hover:border-caramel hover:text-caramel"
          style={{ aspectRatio: spec.aspect }}
        >
          <ImagePlus className="h-8 w-8" aria-hidden />
          <span className="text-sm font-bold">Escolher ou arrastar foto</span>
          <span className="text-xs">Você poderá enquadrar em seguida</span>
        </button>
      )}

      {error && (
        <p role="alert" className="mt-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
