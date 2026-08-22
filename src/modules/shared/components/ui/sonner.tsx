"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => (
	<Sonner
		theme="light"
		className="toaster group"
		position="top-right"
		toastOptions={{
			classNames: {
				error:
					"[--normal-bg:#fff1f2] [--normal-border:#fecdd3] [--normal-text:#881337] shadow-sm [&_[data-icon]]:text-rose-600",
				success:
					"[--normal-bg:#ecfdf5] [--normal-border:#a7f3d0] [--normal-text:#065f46] shadow-sm [&_[data-icon]]:text-emerald-600",
			},
		}}
		icons={{
			success: <CircleCheckIcon className="size-4" />,
			info: <InfoIcon className="size-4" />,
			warning: <TriangleAlertIcon className="size-4" />,
			error: <OctagonXIcon className="size-4" />,
			loading: <Loader2Icon className="size-4 animate-spin" />,
		}}
		style={
			{
				"--normal-bg": "var(--popover)",
				"--normal-text": "var(--popover-foreground)",
				"--normal-border": "var(--border)",
				"--border-radius": "var(--radius)",
			} as React.CSSProperties
		}
		{...props}
	/>
)

export { Toaster }
