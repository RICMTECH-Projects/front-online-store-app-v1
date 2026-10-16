"use client";

import { useId, useState } from "react";

export function useAdminSidebarNavGroup(isOpen: boolean) {
	const [isExpanded, setIsExpanded] = useState(isOpen);
	const contentId = useId();
	const toggle = () => setIsExpanded((expanded) => !expanded);
	return { isExpanded, contentId, toggle };
}
