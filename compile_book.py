#!/usr/bin/env python3
"""
Compile Ice Cream to Fight With from modular files.

Usage:
    python compile_book.py

Output:
    Ice_Cream_to_Fight_With_COMPLETE.md
"""

import os
from pathlib import Path

ILLUSTRATIONS_DIR = Path('illustrations')


def strip_frontmatter(content):
    """Drop a leading YAML frontmatter block (between `---` fences) if present.
    Recipe files carry structured metadata for the website renderer that
    has no place in the compiled book."""
    if not content.startswith('---\n'):
        return content
    end = content.find('\n---\n', 4)
    if end < 0:
        return content
    return content[end + len('\n---\n'):].lstrip('\n')


def get_markdown_files(directory):
    """Get all markdown files from a directory, sorted naturally."""
    dir_path = Path(directory)
    if not dir_path.exists():
        return []
    md_files = sorted(dir_path.glob('*.md'))
    return [str(f) for f in md_files]


def inject_illustration(content, filepath):
    """Insert a markdown image reference after the H1 if illustrations/<slug>.png
    exists. Front-matter/back-matter files have no matching illustration so
    they pass through unchanged."""
    slug = Path(filepath).stem
    image_path = ILLUSTRATIONS_DIR / f'{slug}.png'
    if not image_path.exists():
        return content

    lines = content.split('\n')
    for i, line in enumerate(lines):
        if line.startswith('# '):
            title = line[2:].strip()
            # Place the image block after the H1 and its trailing blank line.
            insert_at = i + 1
            if insert_at < len(lines) and lines[insert_at].strip() == '':
                insert_at += 1
            image_block = [f'![{title}]({image_path.as_posix()})', '']
            return '\n'.join(lines[:insert_at] + image_block + lines[insert_at:])
    return content


def compile_book():
    """Compile all sections into complete book."""

    front_matter_files = get_markdown_files('front_matter')
    recipe_files = get_markdown_files('recipes')
    back_matter_files = get_markdown_files('back_matter')

    all_files = front_matter_files + recipe_files + back_matter_files

    if not all_files:
        print("No markdown files found in front_matter/, recipes/, or back_matter/")
        print("   Make sure you've created the modular file structure.")
        return

    output = []
    for filepath in all_files:
        if not os.path.exists(filepath):
            print(f"Warning: {filepath} not found, skipping...")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            content = strip_frontmatter(content).strip()
            # Strip trailing separator to avoid doubles when joining
            while content.endswith('---'):
                content = content[:-3].rstrip()
            content = inject_illustration(content, filepath)
            output.append(content)
            print(f"  Added: {filepath}")

    complete_content = '\n\n---\n\n'.join(output)

    output_file = 'Ice_Cream_to_Fight_With_COMPLETE.md'

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(complete_content)

    print(f"\nCompiled -> {output_file}")
    print(f"   Total sections: {len(output)}")
    print(f"   Front matter: {len(front_matter_files)} files")
    print(f"   Recipes: {len(recipe_files)} files")
    print(f"   Back matter: {len(back_matter_files)} files")
    print(f"   Total size: {len(complete_content):,} characters")


if __name__ == '__main__':
    compile_book()
