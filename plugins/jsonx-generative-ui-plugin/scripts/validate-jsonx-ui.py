#!/usr/bin/env python3
"""Validate JSONX generative UI fixture files."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


MAX_BYTES = 65536
MAX_DEPTH = 8
MAX_ARRAY_ITEMS = 50
SCHEMA = "jsonx.generative-ui.v1"

ALLOWED_COMPONENTS = {
    "DemoShell": {"title", "summary"},
    "SectionHeader": {"title", "description"},
    "MetricRow": {"items"},
    "DataTable": {"columns", "rows"},
    "Checklist": {"items"},
    "ActionPanel": {"title", "primaryAction", "secondaryAction"},
    "Timeline": {"items"},
    "Alert": {"tone", "title"},
    "TextBlock": {"text"},
    "MultipleChoiceQuiz": {"questions"},
    "SliderPoll": {
        "question",
        "min",
        "max",
        "step",
        "value",
        "leftLabel",
        "rightLabel",
    },
    "ChoiceList": {"question", "items", "selectionMode"},
}

ALLOWED_ACTIONS = {
    "open_detail",
    "draft_response",
    "approve_item",
    "reject_item",
    "filter_table",
    "draft_refund_response",
    "open_customer_timeline",
    "submit_quiz",
    "submit_poll",
    "submit_choice",
}

ALLOWED_MOTION_PROFILES = {
    "none",
    "subtle-enter",
    "morph-list-to-detail",
    "state-change-highlight",
}

BLOCKED_KEYS = {
    "__dangerouslyEvalProps",
    "__dangerouslyBindEvalProps",
    "__dangerouslyEvalAllProps",
    "__dangerouslyInsertFunctionComponents",
    "__dangerouslyInsertClassComponents",
    "__dangerouslyInsertComponents",
    "__dangerouslyInsertReactComponents",
    "__dangerouslyInsertJSONXComponents",
    "__functionProps",
    "windowprops",
    "dangerouslySetInnerHTML",
    "style",
}
BLOCKED_KEYS_LOWER = {key.lower() for key in BLOCKED_KEYS}
ALLOWED_NODE_KEYS = {"component", "props", "children"}


def is_blocked_key(key: str) -> bool:
    lowered = key.lower()
    return lowered in BLOCKED_KEYS_LOWER or lowered.startswith("on") or "html" in lowered


def validate_any(value: Any, location: str, errors: list[str], depth: int) -> None:
    if depth > MAX_DEPTH:
        errors.append(f"{location} exceeds max depth {MAX_DEPTH}")
        return
    if isinstance(value, dict):
        for key, nested in value.items():
            if is_blocked_key(key):
                errors.append(f"{location}.{key} is blocked")
            validate_any(nested, f"{location}.{key}", errors, depth + 1)
    elif isinstance(value, list):
        if len(value) > MAX_ARRAY_ITEMS:
            errors.append(f"{location} has more than {MAX_ARRAY_ITEMS} items")
        for index, nested in enumerate(value):
            validate_any(nested, f"{location}[{index}]", errors, depth + 1)


def validate_node(node: Any, location: str, errors: list[str], depth: int = 0) -> None:
    if depth > MAX_DEPTH:
        errors.append(f"{location} exceeds max depth {MAX_DEPTH}")
        return
    if isinstance(node, str):
        return
    if not isinstance(node, dict) or isinstance(node, list):
        errors.append(f"{location} must be a string or component object")
        return

    for key in node:
        if is_blocked_key(key):
            errors.append(f"{location}.{key} is blocked")
        elif key not in ALLOWED_NODE_KEYS:
            errors.append(f"{location}.{key} is not allowed")

    component = node.get("component")
    if component not in ALLOWED_COMPONENTS:
        errors.append(f"{location}.component must be an allowed component")
        return

    props = node.get("props", {})
    if not isinstance(props, dict):
        errors.append(f"{location}.props must be an object")
        return

    allowed_props = ALLOWED_COMPONENTS[component]
    for key, value in props.items():
        if is_blocked_key(key) or key not in allowed_props:
            errors.append(f"{location}.props.{key} is not allowed")
        validate_any(value, f"{location}.props.{key}", errors, depth + 1)

    for action_key in ("primaryAction", "secondaryAction"):
        action = props.get(action_key)
        if action and action not in ALLOWED_ACTIONS:
            errors.append(f"{location}.props.{action_key} is not an allowed action")

    children = node.get("children")
    if isinstance(children, list):
        if len(children) > MAX_ARRAY_ITEMS:
            errors.append(f"{location}.children has more than {MAX_ARRAY_ITEMS} items")
        for index, child in enumerate(children):
            validate_node(child, f"{location}.children[{index}]", errors, depth + 1)
    elif children is not None:
        validate_node(children, f"{location}.children", errors, depth + 1)


def validate_document(path: Path) -> list[str]:
    data = path.read_bytes()
    errors: list[str] = []
    if len(data) > MAX_BYTES:
        errors.append(f"{path} exceeds max size {MAX_BYTES} bytes")
    try:
        document = json.loads(data.decode("utf-8"))
    except Exception as error:  # noqa: BLE001
        return [f"{path} is not valid JSON: {error}"]

    if not isinstance(document, dict):
        return [f"{path} must contain a JSON object"]

    allowed_top_level = {"schema", "source", "title", "purpose", "motionProfile", "payload"}
    for key in document:
        if key not in allowed_top_level:
            errors.append(f"{path}.{key} is not allowed at the top level")

    if document.get("schema") != SCHEMA:
        errors.append(f"{path}.schema must be {SCHEMA}")
    if "purpose" in document and not isinstance(document["purpose"], str):
        errors.append(f"{path}.purpose must be a string")
    motion_profile = document.get("motionProfile")
    if motion_profile and motion_profile not in ALLOWED_MOTION_PROFILES:
        errors.append(f"{path}.motionProfile is not allowed")
    if "payload" not in document:
        errors.append(f"{path}.payload is required")
    else:
        validate_node(document["payload"], f"{path}.payload", errors)

    return errors


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: validate-jsonx-ui.py <fixture.json> [...]", file=sys.stderr)
        return 2

    all_errors: list[str] = []
    for arg in argv[1:]:
        path = Path(arg)
        errors = validate_document(path)
        if errors:
            all_errors.extend(errors)
        else:
            print(f"ok {path}")

    if all_errors:
        for error in all_errors:
            print(f"error {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
