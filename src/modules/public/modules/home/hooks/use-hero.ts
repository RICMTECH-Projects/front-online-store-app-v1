"use client";

import { useEffect, useState } from "react";
import { HERO_ITEMS } from "../constants/heroSlider.const";

export function useHero() {
	const [activeIndex, setActiveIndex] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((previous) => (previous + 1) % HERO_ITEMS.length);
		}, 9000);
		return () => clearInterval(interval);
	}, []);
	const selectSlide = (index: number) => setActiveIndex(index);
	return { activeIndex, selectSlide };
}
