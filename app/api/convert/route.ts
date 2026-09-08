import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";
import { PassThrough } from "stream";
import { convertImage } from "../../../lib/convert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clean = (s: string) =>
  s
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .slice(0, 90) || "image";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const files = formData
      .getAll("files")
      .filter((x): x is File => x instanceof File);

    if (!files.length) {
      return new NextResponse("No files", { status: 400 });
    }

    if (files.length > 50) {
      return new NextResponse("Maximum 50 files", { status: 413 });
    }

    const format = String(formData.get("format") || "webp");

    const quality = Math.min(
      100,
      Math.max(10, Number(formData.get("quality") || 85))
    );

    const width =
      Number(formData.get("width") || 0) || undefined;

    const output: { name: string; data: Buffer }[] = [];

    for (const file of files) {
      // Maximum 50 MB per input file.
      if (file.size > 50 * 1024 * 1024) {
        continue;
      }

      const data = await convertImage(
        Buffer.from(await file.arrayBuffer()),
        format,
        quality,
        width
      );

      output.push({
        name: `${clean(file.name)}.${format}`,
        data,
      });
    }

    if (!output.length) {
      return new NextResponse("No valid files", {
        status: 400,
      });
    }

    // One file: return the converted image directly.
    if (output.length === 1) {
      const file = output[0];

      const contentType =
        format === "jpg" || format === "jpeg"
          ? "image/jpeg"
          : `image/${format}`;

      return new NextResponse(new Uint8Array(file.data), {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${file.name}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    // Multiple files: create a ZIP archive.
    const archive = archiver("zip", {
      zlib: {
        level: 9,
      },
    });

    const stream = new PassThrough();

    archive.on("error", (error: Error) => {
      console.error("Archiver error:", error);
      stream.destroy(error);
    });

    archive.pipe(stream);

    for (const file of output) {
      archive.append(file.data, {
        name: file.name,
      });
    }

    await archive.finalize();

    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    const zipBuffer = Buffer.concat(chunks);

    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          'attachment; filename="convertly-images.zip"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Conversion failed:", error);

    return new NextResponse("Conversion failed", {
      status: 500,
    });
  }
}