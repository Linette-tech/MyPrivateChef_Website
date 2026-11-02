# Final POE: finish and submit

## 1. Open the updated project

Extract the ZIP, then open its folder in Visual Studio Code. The five HTML pages, css, js and images folders must stay together. Use the Live Server extension to open index.html (or run `python -m http.server 5500` in this folder and visit http://localhost:5500).

The original warm colour scheme is retained. `js/main.js` contains section comments explaining search, dialog/gallery, map, date rules and form processing. HTML defines the controls, CSS defines appearance and JavaScript defines behaviour. No C# or database is needed for this static version.

## 2. Complete the two missing inputs

1. The overall Part 2 feedback (86/100 and a positive understanding comment) is recorded in README.md. Obtain the detailed WEDE Part2 Rubric T Malatji.docx and add its specific feedback. Record each issue, the correction and where it can be tested. Do not claim feedback was addressed before seeing it.
2. Replace the fictional recipient with a verified address you control. To meet the AJAX/email requirements, create a form endpoint with a suitable service, verify the recipient, and put its public HTTPS endpoint URL in `js/config.js` in quotation marks instead of null. Update the contact form `action` to that URL and `enctype` to `multipart/form-data`; update the explanatory text/button for AJAX mode. Keep the recipient consistent in contact.html and the draft branch in main.js. Do not add secret keys to browser JavaScript. Test actual receipt before describing email delivery as complete.

The default implementation prepares a draft. It does not send mail automatically. An AJAX code path without an endpoint is not a completed live AJAX integration.

## 3. Update the existing GitHub repository

Use your existing local clone of https://github.com/Linette-tech/MyPrivateChef_Website. Copy the updated files into it, preserving its hidden .git folder and prior history. Do not replace the repository with a new empty repository. Use Source Control in VS Code to inspect diffs before committing.

Suggested real commits, grouped by work:

1. Stage index.html, about.html, meals.html, enquiry.html, contact.html, css/ and js/ together: `Add Part 3 search, gallery, map, SEO and validated forms`.
2. Stage README.md, SUBMISSION_GUIDE.md and TESTING.md: `Document Part 3 changes, references and verification`.
3. After your genuine feedback corrections and endpoint configuration: `Apply lecturer feedback and configure contact delivery`.
4. After testing and adding your own evidence: `Record final browser and deployment evidence`.

Commit these actual changes when performed; do not backdate or manufacture past activity. Push/Sync Changes. If you lack write access to the linked repository, ask its owner for access or follow your lecturer's instructions about an authorised fork.

## 4. Publish using GitHub Pages

In repository Settings → Pages, select deployment from a branch, main, and / (root), then save. Wait for GitHub's deployment result. Copy the exact live link GitHub provides; do not assume publication succeeded. Open all five pages from that link and run TESTING.md again. The site must be accessible to your lecturer without your ChatGPT sign-in. Your screenshot includes an earlier note that the GitHub repo is private. Ensure your lecturer has access; if your assignment requires a public repo, change visibility only after reviewing its contents.

Alternative: upload the static folder to a free host such as Netlify. The deployed folder must contain index.html at its root. Verify the form service allows the chosen origin.

## 5. Capture and submit evidence

Take your own current desktop/tablet/phone screenshots, plus search results, the open lightbox, map, invalid form errors, a valid estimate and successful received test email. Existing Screenshots/ files are inherited Part 2 evidence, not proof of Part 3 testing. Record test outcomes and the deployed link in README.md. Submit the repository link and any other items your LMS requires.

Before uploading, review the code until you can explain it. This guide does not promise a mark; incomplete endpoint configuration or missing feedback can still lose marks.
