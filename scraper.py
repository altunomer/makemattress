import urllib.request
import ssl
import re
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def fetch(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

homepage_html = fetch("https://makemattress.com")
print("Homepage fetched, length:", len(homepage_html))

with open("homepage.html", "w", encoding="utf-8") as f:
    f.write(homepage_html)

# Extract internal links
links = set(re.findall(r'href=["\'](https?://makemattress\.com/[^"\'#?]*|/[^"\'#?]*)["\']', homepage_html))
clean_links = set()
for l in links:
    if l.startswith('/'):
        clean_links.add("https://makemattress.com" + l)
    elif "makemattress.com" in l:
        clean_links.add(l)

print("Found links:", len(clean_links))
for l in sorted(clean_links):
    print(" -", l)
