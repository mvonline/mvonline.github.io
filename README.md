# Masoud Vafaye Valeh — portfolio redesign

A modern static developer portfolio for **https://vafa.one/**, designed for GitHub Pages.

## Highlights

- Responsive editorial/engineering aesthetic with dark and light themes
- Featured projects: **FalconPay**, **Locker**, and **Muninn**; additional projects include EventMesh SDK, OpenFGA RBAC and a Java fund-transfer service
- Experience timeline showing **Enklare — June 2026 to Present** and **Immense Group** with two nested roles
- Project filters, responsive navigation, scroll progress, tasteful motion (respects reduced-motion preferences), and copy-email control
- Accessibility: skip link, clear keyboard focus, semantic landmarks, accessible controls, responsive text, and no dependency on JavaScript for page content
- SEO/metadata: Open Graph, canonical URL, Person structured data, sitemap and favicon
- No runtime framework, bundler, API keys, paid services, or build step

## Deploy to GitHub Pages

1. Back up the current site. Open `https://github.com/mvonline/mvonline.github.io`.
2. Upload the contents of this directory **to the repository root** on a new branch or using Git locally (not the containing folder itself).
3. Ensure `CNAME` remains in the root and contains `vafa.one`; do **not** change domain DNS.
4. Merge the PR to `main`, or push to the GitHub Pages publishing branch specified in repository settings.
5. Verify `https://vafa.one/` and check that `Masoud_Vafaye_Valeh_CV.pdf` downloads correctly.

### Using Git locally

```bash
git clone https://github.com/mvonline/mvonline.github.io.git
cd mvonline.github.io
git checkout -b redesign-engineering-portfolio-2026
# Copy every file from this package into the repository root (overwrite index.html, style.css, script.js, and CNAME).
git add index.html style.css script.js favicon.svg social-preview.svg robots.txt sitemap.xml CNAME Masoud_Vafaye_Valeh_CV.pdf README.md
git commit -m "Redesign personal engineering portfolio around current CV"
git push -u origin redesign-engineering-portfolio-2026
# Then create and merge a pull request on GitHub.
```

## Source and content notes

The content is based on the latest CV shared in the conversation and the public README/source layouts of the corresponding repositories. It does not claim unverified usage, revenue impact, test coverage, or production-readiness for personal projects.

The **CV file included here** is the latest General CV from the conversation. The previous `MasoudVafayeValeh.pdf` in the repository is an outdated asset; this redesign intentionally references only the new filename. You may delete the old PDF after verifying no other links depend on it.

### Local preview

Open `index.html` directly or run `python3 -m http.server 8080` and visit `http://localhost:8080`.
