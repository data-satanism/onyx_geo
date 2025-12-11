#!/usr/bin/env python3
"""
Convert an SVG file into a JSX/TSX snippet suitable for insertion into
`web/src/components/icons/icons.tsx` or usage with the `OnyxIcon` object.

Usage examples:
  python3 scripts/convert_svg_to_onyx_icon.py input.svg --name MyIcon --wrap mapping
  python3 scripts/convert_svg_to_onyx_icon.py input.svg --name MyIcon --wrap export
  python3 scripts/convert_svg_to_onyx_icon.py input.svg

The script:
- Strips XML declaration and comments
- Keeps `viewBox` and core SVG structure
- Converts kebab-case attributes to camelCase (e.g. `stroke-width` -> `strokeWidth`)
- Converts `class` -> `className`
- Preserves data-* and aria-* attributes unchanged
"""
import argparse
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
import re


def to_camel_case(attr: str) -> str:
    # Preserve data-* and aria-* as-is
    if attr.startswith("data-") or attr.startswith("aria-"):
        return attr
    # handle namespaced attrs like xlink:href -> xlinkHref
    if ":" in attr:
        parts = attr.split(":")
        return parts[0] + parts[1].capitalize()
    # special-case viewBox (ElementTree may return viewbox lowercase)
    if attr.lower() == "viewbox":
        return "viewBox"
    # convert kebab-case -> camelCase
    if "-" in attr:
        parts = attr.split("-")
        return parts[0] + "".join(p.capitalize() for p in parts[1:])
    return attr


def strip_ns(tag: str) -> str:
    if tag.startswith("{"):
        return tag.split("}", 1)[1]
    return tag


def attr_key(k: str) -> str:
    k_local = strip_ns(k)
    if k_local == "class":
        return "className"
    return to_camel_case(k_local)


def escape_attr_value(v: str) -> str:
    # Replace double quotes inside values; prefer double-quoted attributes in output
    return v.replace('"', "'")


def serialize(elem: ET.Element, indent: int = 0, indent_str: str = "  ") -> str:
    tag = strip_ns(elem.tag)
    # collect attributes
    attrs = []
    for k, v in elem.attrib.items():
        key = attr_key(k)
        val = escape_attr_value(v)
        attrs.append(f'{key}="{val}"')
    attrs_str = (" " + " ".join(attrs)) if attrs else ""

    # If element has no children and no text (or only whitespace), self-close
    text = (elem.text or "").strip()
    children = list(elem)
    if not children and not text:
        return f"<{tag}{attrs_str} />"

    # opening
    out = f"<{tag}{attrs_str}>"
    # text
    if text:
        out += text
    # children
    for child in children:
        out += serialize(child)
        tail = (child.tail or "").strip()
        if tail:
            out += tail

    out += f"</{tag}>"
    return out


def remove_comments_and_parse(svg_text: str) -> ET.Element:
    # Remove XML comments
    svg_text = re.sub(r"<!--.*?-->", "", svg_text, flags=re.S)
    # Parse
    try:
        root = ET.fromstring(svg_text)
    except ET.ParseError:
        # Try to remove xml declaration and retry
        svg_text2 = re.sub(r"^<\?xml [^>]+>\s*", "", svg_text)
        root = ET.fromstring(svg_text2)
    return root


def build_jsx_string(root: ET.Element) -> str:
    # Ensure the root tag is svg
    tag = strip_ns(root.tag)
    if tag.lower() != "svg":
        raise ValueError("Root element is not <svg>")

    # Reconstruct a cleaned svg element using serializer
    jsx = serialize(root)
    return jsx


def kebab_to_name(s: str) -> str:
    # convert file-name or svg id to PascalCase
    s = Path(s).stem
    s = re.sub(r'[^0-9a-zA-Z]+', ' ', s).strip()
    parts = s.split()
    return ''.join(p.capitalize() for p in parts) or 'Icon'


def main():
    p = argparse.ArgumentParser(description="Convert SVG to JSX/TSX snippet for icons.tsx")
    p.add_argument("svg", help="Input SVG file")
    p.add_argument("--name", "-n", help="Icon name (PascalCase). If omitted, derived from filename.")
    p.add_argument("--wrap", "-w", choices=["raw", "mapping", "export"], default="raw",
                   help="Output wrapper: raw = just the <svg>...</svg>, mapping = 'key': (<svg/>), export = export const Name = (<svg/>);")
    args = p.parse_args()

    in_path = Path(args.svg)
    if not in_path.exists():
        print(f"Error: {in_path} not found", file=sys.stderr)
        sys.exit(2)

    svg_text = in_path.read_text(encoding='utf-8')
    root = remove_comments_and_parse(svg_text)
    jsx = build_jsx_string(root)

    name = args.name or kebab_to_name(args.svg)

    if args.wrap == 'raw':
        print(jsx)
        return

    if args.wrap == 'mapping':
        key = name[0].lower() + name[1:]
        print(f"'{key}': ({jsx}),")
        return

    # export
    print(f"export const {name} = ({jsx});")


if __name__ == '__main__':
    main()
