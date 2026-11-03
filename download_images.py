import urllib.request, ssl, json, os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

os.makedirs("assets/images", exist_ok=True)

with open("downloaded_data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

urls_to_download = [
    ("https://makemattress.com/img/logo.png", "assets/images/logo.png"),
    ("https://makemattress.com/img/about_image.jpg", "assets/images/about_image.jpg"),
    ("https://makemattress.com/img/about_image_2.jpg", "assets/images/about_image_2.jpg"),
    ("https://makemattress.com/img/24102020011631-quality-control.jpg", "assets/images/quality-control-hero.jpg"),
]

for p in products:
    main_img = p["img"].replace("img/", "")
    urls_to_download.append((f"https://makemattress.com/{p['img']}", f"assets/images/{p['slug']}-thumb.jpg"))
    for idx, g in enumerate(p["gallery"]):
        ext = g.split(".")[-1]
        urls_to_download.append((g, f"assets/images/{p['slug']}-g{idx+1}.{ext}"))

for url, local_path in urls_to_download:
    if os.path.exists(local_path):
        continue
    try:
        req = urllib.request.Request(url.replace(" ", "%20"), headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
            with open(local_path, "wb") as f:
                f.write(r.read())
            print(f"Downloaded: {local_path}")
    except Exception as e:
        print(f"Failed {url}: {e}")

print("Image download process completed.")
