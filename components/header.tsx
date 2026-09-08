"use client";
import Link from "next/link";
import { useTheme } from "./theme-provider";
export function Header() {
  const { dark, toggle } = useTheme();
  return (
    <header className="header">
      <div className="container">
        <Link className="brand" href="/">
          <span className="mark">C</span>Convertly
        </Link>
        <nav className="nav">
          <Link href="/jpg-to-webp">JPG→WebP</Link>
          <Link href="/png-to-jpg">PNG→JPG</Link>
          <Link href="/heic-to-jpg">HEIC→JPG</Link>
          <Link href="/compress-image">Compress</Link>
        </nav>
        <div className="actions">
          <button className="icon" onClick={toggle}>
            {dark ? "☀" : "☾"}
          </button>
          <a className="pill" href="#converter">
            Convert
          </a>
        </div>
      </div>
    </header>
  );
}
