from pathlib import Path

root = Path(__file__).resolve().parents[1]
for name in ['MotionCard', 'ModernHero', 'ProjectCTA', 'ScrollProgress']:
    path = root / f'src/components/{name}.jsx'
    content = path.read_text(encoding='utf-8')
    content = content.replace(', useReducedMotion', '')
    content = "import { useSiteReducedMotion } from './MotionPreferences';\n" + content
    content = content.replace('useReducedMotion()', 'useSiteReducedMotion()')
    path.write_text(content, encoding='utf-8')
path = root / 'src/hooks/useMotionReveal.js'
content = path.read_text(encoding='utf-8').replace(', useReducedMotion', '')
content = "import { useSiteReducedMotion } from '../components/MotionPreferences';\n" + content
path.write_text(content.replace('useReducedMotion()', 'useSiteReducedMotion()'), encoding='utf-8')

# Scope existing accessibility overrides to the same preference used by React.
for name in ['enhancements', 'modern', 'motion']:
    path = root / f'src/styles/{name}.css'
    content = path.read_text(encoding='utf-8')
    marker = '@media (prefers-reduced-motion: reduce) {'
    if marker not in content: continue
    before, block = content.split(marker, 1)
    block = block.strip()
    assert block.endswith('}')
    block = block[:-1]
    import re
    def scope(match):
        selectors = match[1].strip().split(',')
        return '\n' + ', '.join('html[data-motion="reduced"]' + (s.strip()[4:] if s.strip().startswith('html') else ' ' + s.strip()) for s in selectors) + ' {'
    block = re.sub(r'([^{}]+)\{', scope, block)
    path.write_text(before + block + '\n', encoding='utf-8')
