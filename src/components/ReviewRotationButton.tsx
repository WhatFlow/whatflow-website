export function ReviewRotationButton({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
	const label = paused ? "Resume review rotation" : "Pause review rotation";

	return (
		<button
			type="button"
			className="wf-btn wf-btn-ghost wf-review-toggle"
			aria-label={label}
			title={label}
			onClick={onToggle}
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
				{paused ? <path d="M5 2.5v11L13 8z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
			</svg>
		</button>
	);
}
