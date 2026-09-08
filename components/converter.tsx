"use client";
import { useRef, useState } from "react";
type I = { file: File; status: string; p: number };
export function Converter({
  defaultFormat = "webp",
}: {
  defaultFormat?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<I[]>([]);
  const [fmt, setFmt] = useState(defaultFormat);
  const [q, setQ] = useState(85);
  const [w, setW] = useState("");
  const [busy, setBusy] = useState(false);
  const add = (fs: FileList | File[]) =>
    setItems((v) => [
      ...v,
      ...Array.from(fs)
        .filter((f) => f.type.startsWith("image/"))
        .map((file) => ({ file, status: "Ready", p: 0 })),
    ]);
  async function go() {
    if (!items.length || busy) return;
    setBusy(true);
    setItems((v) => v.map((x) => ({ ...x, status: "Processing", p: 35 })));
    const fd = new FormData();
    items.forEach((x) => fd.append("files", x.file));
    fd.append("format", fmt);
    fd.append("quality", String(q));
    fd.append("width", w);
    try {
      const r = await fetch("/api/convert", { method: "POST", body: fd });
      if (!r.ok) throw Error(await r.text());
      setItems((v) => v.map((x) => ({ ...x, status: "Done", p: 100 })));
      const b = await r.blob(),
        u = URL.createObjectURL(b),
        a = document.createElement("a");
      a.href = u;
      a.download =
        items.length > 1 ? "convertly-images.zip" : `converted.${fmt}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(u), 5000);
    } catch (e) {
      setItems((v) => v.map((x) => ({ ...x, status: "Failed", p: 0 })));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div id="converter">
      <div className="card">
        {!items.length ? (
          <div
            className="drop"
            onClick={() => ref.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add("drag");
            }}
            onDragLeave={(e) => e.currentTarget.classList.remove("drag")}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("drag");
              add(e.dataTransfer.files);
            }}
          >
            <input
              ref={ref}
              hidden
              type="file"
              multiple
              accept="image/*,.heic,.heif,.cr2,.cr3,.nef,.arw,.dng,.orf,.rw2"
              onChange={(e) => e.target.files && add(e.target.files)}
            />
            <div className="upload">↥</div>
            <h2>Drop images here</h2>
            <p>Batch convert up to 50 images</p>
            <button
              className="primary"
              onClick={(e) => {
                e.stopPropagation();
                ref.current?.click();
              }}
            >
              Select images
            </button>
            <div className="formats">
              JPG · PNG · WEBP · AVIF · HEIC · HEIF · RAW
            </div>
          </div>
        ) : (
          <div className="workspace">
            <div className="barrow">
              <div>
                <b>{items.length} images</b>
                <div className="sub">Ready for conversion</div>
              </div>
              <button className="clear" onClick={() => ref.current?.click()}>
                + Add more
              </button>
              <input
                ref={ref}
                hidden
                type="file"
                multiple
                accept="image/*,.heic,.heif,.cr2,.cr3,.nef,.arw,.dng,.orf,.rw2"
                onChange={(e) => e.target.files && add(e.target.files)}
              />
            </div>
            <div className="settings">
              <label className="field">
                Format
                <select value={fmt} onChange={(e) => setFmt(e.target.value)}>
                  <option value="webp">WebP</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="avif">AVIF</option>
                  <option value="tiff">TIFF</option>
                  <option value="gif">GIF</option>
                </select>
              </label>
              <label className="field">
                Quality {q}%
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={q}
                  onChange={(e) => setQ(+e.target.value)}
                />
              </label>
              <label className="field">
                Max width
                <input
                  type="number"
                  min="1"
                  placeholder="Original"
                  value={w}
                  onChange={(e) => setW(e.target.value)}
                />
              </label>
              <label className="field">
                Mode
                <select>
                  <option>Preserve ratio</option>
                  <option>Fit inside</option>
                </select>
              </label>
            </div>
            <div className="filelist">
              {items.map((x, i) => (
                <div className="file" key={i}>
                  <img
                    className="thumb"
                    src={URL.createObjectURL(x.file)}
                    alt=""
                  />
                  <div>
                    <div className="name">{x.file.name}</div>
                    <div className="meta">
                      {(x.file.size / 1048576).toFixed(2)} MB
                    </div>
                    <div className="progress">
                      <i style={{ width: `${x.p}%` }} />
                    </div>
                  </div>
                  <div className="status">{x.status}</div>
                </div>
              ))}
            </div>
            <div className="bottom">
              <button className="clear" onClick={() => setItems([])}>
                Clear all
              </button>
              <button className="primary" disabled={busy} onClick={go}>
                {busy ? "Converting…" : "Convert & download →"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="note">
        Temporary processing only. Add rate limiting and lifecycle cleanup
        before public launch.
      </div>
    </div>
  );
}
