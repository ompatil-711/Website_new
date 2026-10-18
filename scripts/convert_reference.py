"""One-time conversion of the supplied design into editable JSX components."""
from pathlib import Path
from html.parser import HTMLParser
import re
import json

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / '01.html').read_text(encoding='utf-8')
for folder in ['src/components', 'src/hooks', 'src/styles', 'public']:
    (ROOT / folder).mkdir(parents=True, exist_ok=True)

class JSX(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out = []
    def handle_starttag(self, tag, attrs):
        names = {'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex', 'allowfullscreen': 'allowFullScreen', 'referrerpolicy': 'referrerPolicy', 'viewbox': 'viewBox'}
        values = dict(attrs)
        text = '<' + tag
        for key, value in attrs:
            if key.startswith('on'): continue
            key = names.get(key, key)
            if '-' in key and not key.startswith(('aria-', 'data-')):
                key = re.sub(r'-([a-z])', lambda m: m[1].upper(), key)
            if key == 'style':
                styles = {}
                for item in value.split(';'):
                    if ':' not in item: continue
                    k, v = item.split(':', 1)
                    k = re.sub(r'-([a-z])', lambda m: m[1].upper(), k.strip())
                    styles[k] = v.strip()
                text += ' style={' + json.dumps(styles) + '}'
            elif key == 'allowFullScreen': text += ' allowFullScreen'
            else: text += ' ' + key + '=' + json.dumps(value or '', ensure_ascii=False)
        if tag == 'a' and values.get('target') == '_blank': text += ' rel="noopener noreferrer"'
        if tag == 'svg': text += ' aria-hidden="true"'
        if tag == 'iframe': text += ' title="Paradise Enterprise location in Nagpur"'
        text += ' />' if tag in ['br', 'input', 'hr', 'img', 'meta', 'link'] else '>'
        self.out.append(text)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in ['br', 'input', 'hr', 'img', 'meta', 'link']: self.handle_endtag(tag)
    def handle_endtag(self, tag): self.out.append('</' + tag + '>')
    def handle_data(self, data): self.out.append(data.replace('{', '&#123;').replace('}', '&#125;'))
    def handle_entityref(self, name): self.out.append('&' + name + ';')
    def handle_charref(self, name): self.out.append('&#' + name + ';')

def convert(html):
    parser = JSX()
    parser.feed(html)
    return ''.join(parser.out)

css = re.search(r'<style>(.*?)</style>', source, re.S)[1]
(ROOT / 'src/styles/reference.css').write_text(css, encoding='utf-8')
sections = [('Hero', 'HERO'), ('ProductTicker', 'MARQUEE'), ('Story', 'STORY / TIMELINE'), ('Founders', 'FOUNDERS'), ('Products', 'PRODUCTS'), ('WhyChooseUs', 'WHY CHOOSE US'), ('Clients', 'CLIENTS'), ('Services', 'AFTER SALE SERVICE'), ('Contact', 'CONTACT'), ('LocationMap', 'MAP'), ('Footer', 'FOOTER')]
for name, marker in sections:
    html = source.split('<!-- ' + marker + ' -->', 1)[1]
    next_marker = re.search(r'<!-- (?:' + '|'.join(re.escape(m) for _, m in sections) + r') -->|<script>', html)
    if next_marker: html = html[:next_marker.start()]
    imports = ''
    props = ''
    if name == 'Contact':
        start = html.index('      <div class="contact-form')
        end = html.index('      </div>', html.index('onclick="handleSubmit', start)) + len('      </div>')
        html = html[:start] + '<ContactForm />' + html[end:]
        imports = "import ContactForm from './ContactForm';\n"
    jsx = convert(html).replace('<contactform></contactform>', '<ContactForm />')
    if name == 'Hero':
        jsx = re.sub(r'<span className="count" data-target="(\d+)">0</span>', lambda m: '<Counter target={' + ("new Date().getFullYear() - 2001" if m[1] == '23' else m[1]) + '} />', jsx)
        jsx = jsx.replace('<div className="hero-particles" id="heroParticles"></div>', '<Particles />')
        imports = "import Counter from './Counter';\nimport Particles from './Particles';\n"
    if name == 'Products':
        props = '{ onEnquire }'
        titles = re.findall(r'<h3 className="product-title">(.*?)</h3>', jsx)
        for title in titles:
            jsx = jsx.replace('<div className="product-arrow">Learn More ', '<button type="button" className="product-arrow" onClick={() => onEnquire(' + json.dumps(title) + ')}>Enquire Now ', 1)
            start = jsx.index('<button type="button" className="product-arrow"', jsx.index('<h3 className="product-title">' + title))
            end = jsx.index('</div>', start)
            jsx = jsx[:end] + '</button>' + jsx[end + 6:]
    if name == 'Contact':
        props = '{ interest }'
        jsx = jsx.replace('<ContactForm />', '<ContactForm interest={interest} />')
    if name == 'Footer':
        jsx = jsx.replace('© 2024', '© {new Date().getFullYear()}')
        jsx = jsx.replace('className="social-btn"', 'className="social-btn" aria-label="Instagram"')
    (ROOT / f'src/components/{name}.jsx').write_text(imports + f'\nexport default function {name}({props}) {{\n  return (<>\n' + jsx + '\n  </>);\n}\n', encoding='utf-8')

head = source.split('<head>')[1].split('<style>')[0]
(ROOT / 'index.html').write_text('<!doctype html>\n<html lang="en">\n<head>' + head + '<meta name="description" content="Paradise Enterprise, Nagpur: writing boards, school furniture, digital panels and complete institutional solutions since 2001." />\n<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n</head>\n<body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>\n</html>\n', encoding='utf-8')
