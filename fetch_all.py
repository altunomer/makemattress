import urllib.request
import ssl
import re
import json
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0'}

products = [
    {"slug": "pe-films-packaging-materials", "name": "PE Films Packaging Materials", "subtitle": "PE Film Rolls, Perforated Bags...", "img": "img/Pefilm.jpg"},
    {"slug": "hotmelts", "name": "Hotmelts", "subtitle": "Chemical Adhesives...", "img": "img/holtmelt.jpg"},
    {"slug": "handles-foot-mat", "name": "Handles & Foot Mat", "subtitle": "Mattress Accessories...", "img": "img/HANDLES & FOOT MAT copy.jpg"},
    {"slug": "labels", "name": "Labels", "subtitle": "Adhesive Labels, Sewing Labels...", "img": "img/Labels.jpg"},
    {"slug": "cardboard", "name": "Cardboard", "subtitle": "Roll Pack Packaging Solutions", "img": "img/rollpack.jpg"},
    {"slug": "pillows", "name": "Pillows", "subtitle": "Natural Wools, Visco Pillows...", "img": "img/pillow.jpg"},
    {"slug": "mattress-tape", "name": "Mattress Tape", "subtitle": "Wide Options, Customized Weaving...", "img": "img/tape.jpg"},
    {"slug": "felt", "name": "Felt", "subtitle": "Hard & Soft Options, Thermobonded...", "img": "img/FETS.jpg"},
    {"slug": "bed-baseheadboards", "name": "Bed Base & Headboards", "subtitle": "Ottoman and Demountables...", "img": "img/BED BASE+HEADBOARDS.jpg"},
    {"slug": "staples", "name": "Staples", "subtitle": "Industrial Mattress Staples with Different Sizes", "img": "img/STAPLES.jpg"},
    {"slug": "pu-chemicals", "name": "PU Chemicals", "subtitle": "Polyol, TDI, MDI and More...", "img": "img/polyol chemical.jpg"},
    {"slug": "other-components", "name": "Other Components", "subtitle": "Nonwoven, Thread, Springs & Hardware", "img": "img/nonvowen.jpg"},
    {"slug": "zippered-cover", "name": "Zippered Cover", "subtitle": "Special Custom Solutions & Quilted Covers...", "img": "img/ZIPPERED COVER.jpg"}
]

os.makedirs("downloaded_data/img", exist_ok=True)

def download_img(url, local_path):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            with open(local_path, "wb") as f:
                f.write(resp.read())
            print(f"Downloaded {local_path}")
    except Exception as e:
        print(f"Failed {url}: {e}")

all_product_data = []

for p in products:
    url = f"https://makemattress.com/Product/{p['slug']}/"
    req = urllib.request.Request(url, headers=headers)
    p_data = {**p, "description": "", "gallery": [], "video": ""}
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
            html = r.read().decode('utf-8', errors='ignore')
            
            # Extract video
            v_match = re.search(r'iframe.*?src=["\']([^"\']+)["\']', html)
            if v_match:
                p_data["video"] = v_match.group(1)
            
            # Extract gallery images
            gallery_matches = re.findall(r'<div class="det-img">\s*<img src=["\']([^"\']+)["\']', html)
            clean_gallery = []
            for g in gallery_matches:
                g_url = g.replace('../', '').strip('/')
                clean_gallery.append("https://makemattress.com/" + g_url)
            p_data["gallery"] = clean_gallery

            # Extract description
            desc_match = re.search(r'<h3>.*?</h3>\s*<p>(.*?)</p>', html, re.DOTALL)
            if desc_match:
                p_data["description"] = re.sub(r'<[^>]+>', ' ', desc_match.group(1)).strip()
            
            print(f"Parsed {p['name']}: {len(p_data['gallery'])} images, desc len {len(p_data['description'])}")
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    
    all_product_data.append(p_data)

with open("downloaded_data/products.json", "w", encoding="utf-8") as f:
    json.dump(all_product_data, f, ensure_ascii=False, indent=2)

print("Saved all product data.")
