# Web Diagrams

<div align="center">
  <h2>
    An open-source project for creating diagrams </br>
  </h2>
</div>

<br />

<div align="center">
  <figure>
    <a href="https://excalidraw.com" target="_blank" rel="noopener">
      <img src="./src/shared/img/image 8298.png" alt="Product showcase" />
    </a>
  </figure>
</div>

## Features

Web Diagrams supports:

- 💯&nbsp;Free & open-source.
- 🧩&nbsp;Visual creation and editing of diagrams.
- 📐&nbsp;Node alignment (horizontal and vertical).
- 💾&nbsp;Two working modes:
  - **Local** – saves diagrams as files,
  - **Server** – stores diagrams via your backend.
- 🖼️&nbsp;Export to SVG and PNG.
- 🌐&nbsp;Web-based application – no installation needed.

## Quick start

You can start using **Web Diagrams** right away in two different modes:

### 1. Local mode (no setup required)

Use our hosted version on GitHub Pages:  
👉 [web-diagrams.github.io/web-diagrams-front](https://web-diagrams.github.io/web-diagrams-front/)

- No installation needed.
- Diagrams are saved as local `.json` files on your machine.
- Export to SVG/PNG supported.

### 2. Server mode (optional backend)

To enable cloud storage and user accounts, you can run your own backend server using Docker:

```bash
docker run -d -p 8080:8080 -v $(pwd)/data:/data colourofmagic/webdiagrams-back:latest
```