"""Apply the shared React MotionCard to existing card markup without changing content."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
targets = {
    'Products': 'product-card',
    'Founders': 'founder-card',
    'Clients': 'client-badge',
    'Services': 'service-item',
    'WhyChooseUs': 'why-feature',
}
for component, card_class in targets.items():
    path = root / f'src/components/{component}.jsx'
    content = path.read_text(encoding='utf-8')
    if "import MotionCard" in content:
        continue
    pattern = r'<div className="' + card_class + r'(?: [^"\n]*)?"(?: style=\{\{[^\n]*?\}\})?>'
    matches = list(re.finditer(pattern, content))
    for index, match in reversed(list(enumerate(matches))):
        depth = 1
        for token in re.finditer(r'<div\b[^>]*>|</div>', content[match.end():]):
            depth += -1 if token.group() == '</div>' else 1
            if depth == 0:
                start = match.end() + token.start()
                end = match.end() + token.end()
                content = content[:start] + '</MotionCard>' + content[end:]
                break
        content = content[:match.start()] + f'<MotionCard className="{card_class}" index={{{index}}}>' + content[match.end():]
    path.write_text("import MotionCard from './MotionCard';\n" + content, encoding='utf-8')
    print(f'{component}: {len(matches)} animated cards')
