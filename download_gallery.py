import urllib.request, ssl, json, os, re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

with open("downloaded_data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    fixed_gallery = []
    for idx, g in enumerate(p["gallery"]):
        filename = g.split('/')[-1]
        real_url = f"https://makemattress.com/img/{filename}"
        local_path = f"assets/images/{p['slug']}-g{idx+1}.png"
        try:
            req = urllib.request.Request(real_url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=8) as r:
                with open(local_path, "wb") as out:
                    out.write(r.read())
                print(f"Downloaded gallery: {local_path}")
                fixed_gallery.append(f"/images/{p['slug']}-g{idx+1}.png")
        except Exception as e:
            print(f"Skip {real_url}: {e}")
    p["local_thumb"] = f"/images/{p['slug']}-thumb.jpg"
    p["local_gallery"] = fixed_gallery

with open("downloaded_data/products_fixed.json", "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Gallery images downloaded & products_fixed.json created.")
