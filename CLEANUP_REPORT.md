# Cleanup report

Audit of the original project (`Leaf Village.zip`, extracted to `Leaf Village/`) and what happened to each file.

## Summary

- Files audited: 358 entries (REQUIRED 284, UNUSED 24, UNSURE 50). `user_app/venv/` is counted as one entry.
- **Deleted from the original folder: nothing.** You asked to keep every file for now, so `Leaf Village/` and `Leaf Village.zip` are untouched.
- The new project in `leafy-village-v2/` only contains new code, the SQL files and the 80 images it actually uses (copied, not moved, so the originals are still there).
- Every other original file was **left out of the final project**. The table below gives the reason for each one. The UNUSED rows are the files that are safe to delete from the original folder whenever you want.

## What each class means

- **REQUIRED**: core code or assets of the original app (all images are in this class).
- **UNUSED**: provably unnecessary: build artifacts, empty files and folders, OS junk, byte-identical duplicates.
- **UNSURE**: not used by the running app, but could matter to you (report documents, backups, dead code).

## Files left out of the final project (the "deleted" list)

| File | Class | Reason it is not in leafy-village-v2 |
|---|---|---|
| `admin_app/instance/` | UNUSED | Empty folder |
| `admin_app/__init__.py` | UNSURE | Empty package marker only needed by test.py |
| `admin_app/admin_app.py` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/forms.py` | UNSURE | Not imported by admin_app.py; identical to user_app/forms.py |
| `admin_app/headadmin_app.py` | UNSURE | In-memory mock blueprint, never registered; replaced by headadmin_app/ |
| `admin_app/models.py` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/test.py` | UNSURE | Broken: uses @app.route on flask.app module; crashes on import |
| `admin_app/__pycache__/admin_app.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact) |
| `admin_app/__pycache__/forms.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact) |
| `admin_app/__pycache__/models.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact) |
| `admin_app/static/JS/` | UNUSED | Empty folder |
| `admin_app/static/1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/static/eco1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/static/image.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/static/style.css` | UNUSED | Byte-identical duplicate of admin_app/static/css/style.css (the one templates link to) |
| `admin_app/static/style1.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/static/styleloginsub.css` | UNUSED | Byte-identical duplicate of admin_app/static/css/styleloginsub.css |
| `admin_app/static/Images/1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/static/Images/eco1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/static/Images/image.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/static/css/Style2.css` | UNSURE | Stylesheet that no page links to |
| `admin_app/static/css/messages.css` | UNSURE | Stylesheet that no page links to |
| `admin_app/static/css/sam.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/static/css/style.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/static/css/styleloginsub.css` | UNSURE | Stylesheet that no page links to |
| `admin_app/templates/1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/templates/Style2.css` | UNUSED | Byte-identical duplicate of admin_app/static/css/Style2.css |
| `admin_app/templates/add_product.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/admin_home.html` | UNSURE | Template that admin_app.py never renders |
| `admin_app/templates/dashboard.html` | UNSURE | Template that admin_app.py never renders |
| `admin_app/templates/eco1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/templates/headadmin_dashboard.html` | UNSURE | Template that admin_app.py never renders |
| `admin_app/templates/headadmin_login.html` | UNSURE | Template that admin_app.py never renders |
| `admin_app/templates/headadmin_register.html` | UNSURE | Template that admin_app.py never renders |
| `admin_app/templates/image.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `admin_app/templates/login.html` | UNSURE | Template that admin_app.py never renders |
| `admin_app/templates/manage_products.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/manage_users.html` | UNSURE | Template that admin_app.py never renders |
| `admin_app/templates/products.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/reports.html` | UNUSED | Empty file (0 bytes) and no route renders it |
| `admin_app/templates/sub_admin_home.html` | UNSURE | Template that admin_app.py never renders |
| `admin_app/templates/subadmin_dashboard.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/subadmin_login.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/subadmin_orders.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/subadmin_register.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/update_product.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/view_messages.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `admin_app/templates/view_report.html` | UNSURE | Template that admin_app.py never renders |
| `headadmin_app/headadmin_app.py` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `headadmin_app/instance/headadmin.db` | UNUSED | SQLite file whose only table has 0 rows; the app is configured for MySQL |
| `headadmin_app/static/style1.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `headadmin_app/templates/headadmin_dashboard.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `headadmin_app/templates/headadmin_login.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `headadmin_app/templates/headadmin_register.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `headadmin_app/templates/manage_subadmins.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `headadmin_app/templates/manage_users.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/New folder/` | UNUSED | Empty folder |
| `user_app/venv/` | UNUSED | Python virtual environment (not in the zip; rebuildable with pip); 3,391 files |
| `user_app/app.py` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/forms.py` | UNSURE | Only imported by routes.py (dead code) |
| `user_app/models.py` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/plantly-free-version.zip` | UNSURE | Original 'Plantly' template archive; 66 of 68 files already in static/, only its index.html and style.css differ |
| `user_app/routes.py` | UNSURE | Separate SQLite login demo; renders signup.html which does not exist |
| `user_app/Docs/Abstarct word.docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/CHAPTER 6 369 (1).docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Chapter 1-5_merged (2).docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Chapter 1-5_merged (2).pdf` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Complete Doc pdf.pdf` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Documentation Chapter 1-5.docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Documentation Chapter 1-5.pdf` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Documentation Final.docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Index (2).docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Index (2).pdf` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Index and Certificate (1).docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Index and Certificate.docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Index and Certificate.pdf` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Index, Certi, Chapters.pdf` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Leaf Village Documentation.pdf` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs/Project All Chapters(4).docx` | UNSURE | Project report document (not code; probably your submission) |
| `user_app/Docs - Copy/Complete Doc pdf.pdf` | UNUSED | Byte-identical duplicate of user_app/Docs/Complete Doc pdf.pdf |
| `user_app/Docs - Copy/Documentation Chapter 1-5.docx` | UNSURE | Report document; differs from the copy in Docs/ (2,732,543 vs 2,726,943 bytes) |
| `user_app/Docs - Copy/Documentation Chapter 1-5.pdf` | UNUSED | Byte-identical duplicate of user_app/Docs/Documentation Chapter 1-5.pdf |
| `user_app/Docs - Copy/Documentation Final.docx` | UNUSED | Byte-identical duplicate of user_app/Docs/Documentation Final.docx |
| `user_app/Docs - Copy/Index and Certificate.docx` | UNUSED | Byte-identical duplicate of user_app/Docs/Index and Certificate.docx |
| `user_app/Docs - Copy/Index and Certificate.pdf` | UNUSED | Byte-identical duplicate of user_app/Docs/Index and Certificate.pdf |
| `user_app/__pycache__/app.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact, regenerated automatically) |
| `user_app/__pycache__/models.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact) |
| `user_app/__pycache__/models.cpython-313.pyc` | UNUSED | Compiled Python bytecode (build artifact) |
| `user_app/instance/contact_us.db` | UNUSED | SQLite file whose tables all have 0 rows; the app is configured for MySQL |
| `user_app/req/requirements.txt` | REQUIRED | Not needed by the new React/Express stack |
| `user_app/static/1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/10.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/11.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/12.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/13.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/14.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/15.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/16.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/17.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/18.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/19.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/2.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/20.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/21.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/22.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/23.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/24.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/25.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/26.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/27.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/28.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/29.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/3.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/30.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/4.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/40.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/41.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/5.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/6.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/7.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/8.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/9.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/Create a Plant website in 30s using Zarla AI for free.lnk` | UNUSED | Windows shortcut / advert that came with the template (OS junk) |
| `user_app/static/acs.css` | UNUSED | Byte-identical duplicate of user_app/static/css/acs.css |
| `user_app/static/eco.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/eco1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/flogo.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/g1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/homelander.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/login.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/logo.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/logo1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/p1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/pdbg.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/pk.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/plants.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/rd.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/readme.txt` | UNSURE | Template readme, not used by the app |
| `user_app/static/styles.css` | UNSURE | Stylesheet that no page links to |
| `user_app/static/tools.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/css/about.css` | UNSURE | Stylesheet that no page links to |
| `user_app/static/css/account.css` | UNSURE | Stylesheet that no page links to |
| `user_app/static/css/acs.css` | UNSURE | Stylesheet that no page links to |
| `user_app/static/css/ajax-loader.gif` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/css/blog.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/css/bootstrap.min.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/css/contact.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/css/login.css` | UNSURE | Stylesheet that no page links to |
| `user_app/static/css/style.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/css/styles.css` | UNSURE | Stylesheet that no page links to |
| `user_app/static/css/support.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/css/vendor.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/icomoon/Read Me.txt` | REQUIRED | Not needed by the new React/Express stack |
| `user_app/static/icomoon/icomoon.css` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/icomoon/selection.json` | REQUIRED | Not needed by the new React/Express stack |
| `user_app/static/icomoon/fonts/icomoon.eot` | REQUIRED | Not needed by the new React/Express stack |
| `user_app/static/icomoon/fonts/icomoon.svg` | REQUIRED | Not needed by the new React/Express stack |
| `user_app/static/icomoon/fonts/icomoon.ttf` | REQUIRED | Not needed by the new React/Express stack |
| `user_app/static/icomoon/fonts/icomoon.woff` | REQUIRED | Not needed by the new React/Express stack |
| `user_app/static/images/1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/10.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/11.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/12.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/13.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/14.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/15.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/16.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/17.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/18.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/2.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/3.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/30.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/4.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/5.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/6.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/7.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/8.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/9.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/association-logo1.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/association-logo2.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/association-logo3.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/association-logo4.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/association-logo5.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/blog-post.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/default.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/eco.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/eco1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/eliza.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/g1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/homelander.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/logo.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/logo.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/logo1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/main-banner.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/main-banner2.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/p1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/pdbg.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/pk.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/plant-item1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/plant-item10.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/plant-item15.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/plant-item3.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/plant-item6.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/plant-item8.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/plant-item9.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/plants.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/post-item15.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/post-item16.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/post-item17.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/review-image.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/review-item1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/review-item2.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/single-image.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/tools.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/video-item.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/chocolat/close.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/chocolat/fullscreen-black.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/chocolat/fullscreen.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/chocolat/left.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/chocolat/loader.gif` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/chocolat/right.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/colorbox/controls.png` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/images/colorbox/loading.gif` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/static/js/bootstrap.bundle.min.js` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/js/jquery-3.2.1.min.js` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/js/plugins.js` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/js/script.js` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/js/ui-easing.js` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/js/videopopup.js` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/static/uploads/profile_pictures/scott.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/10.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/11.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/17.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/2.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/3.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/4.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/5.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/6.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/7.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/8.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/9.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/about_us.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/acs.css` | UNUSED | Byte-identical duplicate of user_app/static/css/acs.css (and Flask never serves files from templates/) |
| `user_app/templates/base.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/blog1.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/blog2.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/blog3.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/cart.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/contact_us.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/customer_faqs.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/customer_faqs.zip` | UNSURE | Older copies of 23 templates (backup) |
| `user_app/templates/eco.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/eco1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/from_the_farmers.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/homelander.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/index.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/login-register.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/login.html` | UNSURE | Template that no route of app.py renders |
| `user_app/templates/logo.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/logo1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/my_account.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/order_confirmation.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/our_plantation.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/our_vision.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/p1.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/payment.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/payment_details.html` | UNSURE | Template that no route of app.py renders |
| `user_app/templates/payment_success.html` | UNSURE | Template that no route of app.py renders |
| `user_app/templates/pdbg.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/plants.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/privacy_policy.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/product_details.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/products.html` | REQUIRED | Replaced: Flask/Jinja/Bootstrap code was rewritten in Express and React with plain CSS |
| `user_app/templates/style.css` | UNSURE | Stylesheet that no page links to |
| `user_app/templates/styles.css` | UNSURE | Stylesheet that no page links to |
| `user_app/templates/tools.jpg` | REQUIRED | Image not used by the new site (still preserved in the original folder) |
| `user_app/templates/user.html` | UNSURE | Template that no route of app.py renders |

## Full inventory of the original project

| File / folder | Class | Why | In leafy-village-v2? |
|---|---|---|---|
| `admin_app/instance/` | UNUSED | Empty folder | Left out |
| `admin_app/__init__.py` | UNSURE | Empty package marker only needed by test.py | Left out (replaced by new code) |
| `admin_app/admin_app.py` | REQUIRED | Flask source code (reference for the conversion) | Left out (replaced by new code) |
| `admin_app/forms.py` | UNSURE | Not imported by admin_app.py; identical to user_app/forms.py | Left out (replaced by new code) |
| `admin_app/headadmin_app.py` | UNSURE | In-memory mock blueprint, never registered; replaced by headadmin_app/ | Left out (replaced by new code) |
| `admin_app/models.py` | REQUIRED | Flask source code (reference for the conversion) | Left out (replaced by new code) |
| `admin_app/test.py` | UNSURE | Broken: uses @app.route on flask.app module; crashes on import | Left out (replaced by new code) |
| `admin_app/__pycache__/admin_app.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact) | Left out |
| `admin_app/__pycache__/forms.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact) | Left out |
| `admin_app/__pycache__/models.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact) | Left out |
| `admin_app/static/JS/` | UNUSED | Empty folder | Left out |
| `admin_app/static/1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `admin_app/static/eco1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `admin_app/static/image.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `admin_app/static/style.css` | UNUSED | Byte-identical duplicate of admin_app/static/css/style.css (the one templates link to) | Left out |
| `admin_app/static/style1.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `admin_app/static/styleloginsub.css` | UNUSED | Byte-identical duplicate of admin_app/static/css/styleloginsub.css | Left out |
| `admin_app/static/Images/1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `admin_app/static/Images/eco1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `admin_app/static/Images/image.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `admin_app/static/css/Style2.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `admin_app/static/css/messages.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `admin_app/static/css/sam.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `admin_app/static/css/style.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `admin_app/static/css/styleloginsub.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `admin_app/templates/1.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `admin_app/templates/Style2.css` | UNUSED | Byte-identical duplicate of admin_app/static/css/Style2.css | Left out |
| `admin_app/templates/add_product.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/admin_home.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `admin_app/templates/dashboard.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `admin_app/templates/eco1.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `admin_app/templates/headadmin_dashboard.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `admin_app/templates/headadmin_login.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `admin_app/templates/headadmin_register.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `admin_app/templates/image.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `admin_app/templates/login.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `admin_app/templates/manage_products.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/manage_users.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `admin_app/templates/products.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/reports.html` | UNUSED | Empty file (0 bytes) and no route renders it | Left out |
| `admin_app/templates/sub_admin_home.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `admin_app/templates/subadmin_dashboard.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/subadmin_login.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/subadmin_orders.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/subadmin_register.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/update_product.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/view_messages.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `admin_app/templates/view_report.html` | UNSURE | Template that admin_app.py never renders | Left out (replaced by new code) |
| `headadmin_app/headadmin_app.py` | REQUIRED | Flask source code (reference for the conversion) | Left out (replaced by new code) |
| `headadmin_app/instance/headadmin.db` | UNUSED | SQLite file whose only table has 0 rows; the app is configured for MySQL | Left out |
| `headadmin_app/static/style1.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `headadmin_app/templates/headadmin_dashboard.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `headadmin_app/templates/headadmin_login.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `headadmin_app/templates/headadmin_register.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `headadmin_app/templates/manage_subadmins.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `headadmin_app/templates/manage_users.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/New folder/` | UNUSED | Empty folder | Left out |
| `user_app/venv/` | UNUSED | Python virtual environment (not in the zip; rebuildable with pip); 3,391 files | Left out |
| `user_app/app.py` | REQUIRED | Flask source code (reference for the conversion) | Left out (replaced by new code) |
| `user_app/forms.py` | UNSURE | Only imported by routes.py (dead code) | Left out (replaced by new code) |
| `user_app/models.py` | REQUIRED | Flask source code (reference for the conversion) | Left out (replaced by new code) |
| `user_app/plantly-free-version.zip` | UNSURE | Original 'Plantly' template archive; 66 of 68 files already in static/, only its index.html and style.css differ | Left out |
| `user_app/routes.py` | UNSURE | Separate SQLite login demo; renders signup.html which does not exist | Left out (replaced by new code) |
| `user_app/Docs/Abstarct word.docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/CHAPTER 6 369 (1).docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Chapter 1-5_merged (2).docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Chapter 1-5_merged (2).pdf` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Complete Doc pdf.pdf` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Documentation Chapter 1-5.docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Documentation Chapter 1-5.pdf` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Documentation Final.docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Index (2).docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Index (2).pdf` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Index and Certificate (1).docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Index and Certificate.docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Index and Certificate.pdf` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Index, Certi, Chapters.pdf` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Leaf Village Documentation.pdf` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs/Project All Chapters(4).docx` | UNSURE | Project report document (not code; probably your submission) | Left out |
| `user_app/Docs - Copy/Complete Doc pdf.pdf` | UNUSED | Byte-identical duplicate of user_app/Docs/Complete Doc pdf.pdf | Left out |
| `user_app/Docs - Copy/Documentation Chapter 1-5.docx` | UNSURE | Report document; differs from the copy in Docs/ (2,732,543 vs 2,726,943 bytes) | Left out |
| `user_app/Docs - Copy/Documentation Chapter 1-5.pdf` | UNUSED | Byte-identical duplicate of user_app/Docs/Documentation Chapter 1-5.pdf | Left out |
| `user_app/Docs - Copy/Documentation Final.docx` | UNUSED | Byte-identical duplicate of user_app/Docs/Documentation Final.docx | Left out |
| `user_app/Docs - Copy/Index and Certificate.docx` | UNUSED | Byte-identical duplicate of user_app/Docs/Index and Certificate.docx | Left out |
| `user_app/Docs - Copy/Index and Certificate.pdf` | UNUSED | Byte-identical duplicate of user_app/Docs/Index and Certificate.pdf | Left out |
| `user_app/__pycache__/app.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact, regenerated automatically) | Left out |
| `user_app/__pycache__/models.cpython-312.pyc` | UNUSED | Compiled Python bytecode (build artifact) | Left out |
| `user_app/__pycache__/models.cpython-313.pyc` | UNUSED | Compiled Python bytecode (build artifact) | Left out |
| `user_app/instance/contact_us.db` | UNUSED | SQLite file whose tables all have 0 rows; the app is configured for MySQL | Left out |
| `user_app/req/requirements.txt` | REQUIRED | Python dependency list | Left out |
| `user_app/static/1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/10.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/11.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/12.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/13.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/14.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/15.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/16.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/17.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/18.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/19.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/2.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/20.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/21.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/22.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/23.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/24.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/25.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/26.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/27.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/28.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/29.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/3.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/30.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/4.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/40.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/41.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/5.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/6.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/7.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/8.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/9.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/Create a Plant website in 30s using Zarla AI for free.lnk` | UNUSED | Windows shortcut / advert that came with the template (OS junk) | Left out |
| `user_app/static/acs.css` | UNUSED | Byte-identical duplicate of user_app/static/css/acs.css | Left out |
| `user_app/static/eco.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/eco1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/flogo.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/g1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/homelander.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/login.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/logo.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/logo1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/p1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/pdbg.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/pk.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/plants.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/rd.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/readme.txt` | UNSURE | Template readme, not used by the app | Left out |
| `user_app/static/styles.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `user_app/static/tools.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/css/about.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `user_app/static/css/account.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `user_app/static/css/acs.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `user_app/static/css/ajax-loader.gif` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/css/blog.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/css/bootstrap.min.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/css/contact.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/css/login.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `user_app/static/css/style.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/css/styles.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `user_app/static/css/support.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/css/vendor.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/icomoon/Read Me.txt` | REQUIRED | Icon-font package used by the templates | Left out |
| `user_app/static/icomoon/icomoon.css` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/icomoon/selection.json` | REQUIRED | Icon-font package used by the templates | Left out |
| `user_app/static/icomoon/fonts/icomoon.eot` | REQUIRED | Icon-font package used by the templates | Left out |
| `user_app/static/icomoon/fonts/icomoon.svg` | REQUIRED | Icon-font package used by the templates | Left out |
| `user_app/static/icomoon/fonts/icomoon.ttf` | REQUIRED | Icon-font package used by the templates | Left out |
| `user_app/static/icomoon/fonts/icomoon.woff` | REQUIRED | Icon-font package used by the templates | Left out |
| `user_app/static/images/1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/10.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/11.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/12.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/13.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/14.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/15.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/16.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/17.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/18.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/19.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/2.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/20.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/21.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/22.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/23.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/24.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/25.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/26.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/27.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/28.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/29.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/3.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/30.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/31.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/32.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/33.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/34.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/35.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/36.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/37.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/38.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/39.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/4.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/40.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/41.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/42.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/43.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/44.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/45.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/46.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/47.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/48.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/49.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/5.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/50.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/51.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/52.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/53.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/54.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/55.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/56.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/57.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/58.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/59.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/6.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/60.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/61.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/62.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/63.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/64.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/65.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/66.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/67.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/68.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/69.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/7.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/70.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/71.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/72.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/73.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/74.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/75.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/76.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/77.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/78.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/79.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/8.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/80.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/81.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/82.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/83.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/84.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/85.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/86.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/87.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/88.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/89.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/9.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/90.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/association-logo1.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/association-logo2.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/association-logo3.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/association-logo4.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/association-logo5.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/blog-post.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/default.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/eco.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/eco1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/eliza.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/flogo.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/g1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/homelander.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/logo.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/logo.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/logo1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/main-banner.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/main-banner2.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/p1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/pdbg.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/pk.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/plant-item1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/plant-item10.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/plant-item11.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/plant-item12.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/plant-item13.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/plant-item14.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/plant-item15.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/plant-item2.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/plant-item3.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/plant-item4.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/plant-item5.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/plant-item6.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/plant-item7.jpg` | REQUIRED | Image (kept: every image is preserved) | Copied to `server/public/images/` |
| `user_app/static/images/plant-item8.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/plant-item9.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/plants.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/post-item15.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/post-item16.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/post-item17.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/review-image.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/review-item1.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/review-item2.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/single-image.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/tools.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/video-item.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/chocolat/close.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/chocolat/fullscreen-black.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/chocolat/fullscreen.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/chocolat/left.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/chocolat/loader.gif` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/chocolat/right.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/colorbox/controls.png` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/images/colorbox/loading.gif` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/static/js/bootstrap.bundle.min.js` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/js/jquery-3.2.1.min.js` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/js/plugins.js` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/js/script.js` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/js/ui-easing.js` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/js/videopopup.js` | REQUIRED | Stylesheet/script linked by the templates | Left out (replaced by new code) |
| `user_app/static/uploads/profile_pictures/scott.jpg` | REQUIRED | Image (kept: every image is preserved) | Left out |
| `user_app/templates/1.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/10.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/11.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/17.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/2.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/3.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/4.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/5.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/6.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/7.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/8.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/9.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/about_us.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/acs.css` | UNUSED | Byte-identical duplicate of user_app/static/css/acs.css (and Flask never serves files from templates/) | Left out |
| `user_app/templates/base.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/blog1.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/blog2.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/blog3.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/cart.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/contact_us.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/customer_faqs.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/customer_faqs.zip` | UNSURE | Older copies of 23 templates (backup) | Left out |
| `user_app/templates/eco.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/eco1.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/from_the_farmers.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/homelander.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/index.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/login-register.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/login.html` | UNSURE | Template that no route of app.py renders | Left out (replaced by new code) |
| `user_app/templates/logo.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/logo1.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/my_account.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/order_confirmation.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/our_plantation.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/our_vision.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/p1.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/payment.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/payment_details.html` | UNSURE | Template that no route of app.py renders | Left out (replaced by new code) |
| `user_app/templates/payment_success.html` | UNSURE | Template that no route of app.py renders | Left out (replaced by new code) |
| `user_app/templates/pdbg.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/plants.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/privacy_policy.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/product_details.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/products.html` | REQUIRED | Jinja template rendered by a Flask route | Left out (replaced by new code) |
| `user_app/templates/style.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `user_app/templates/styles.css` | UNSURE | Stylesheet that no page links to | Left out (replaced by new code) |
| `user_app/templates/tools.jpg` | REQUIRED | Image (kept: every image is preserved; duplicate of the static/ copy) | Left out |
| `user_app/templates/user.html` | UNSURE | Template that no route of app.py renders | Left out (replaced by new code) |
