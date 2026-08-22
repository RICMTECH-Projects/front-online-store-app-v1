'use client';

import { useState, type FormEvent } from 'react';

export const useContactForm = () => {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitted(true);
	};

	const resetSubmission = () => {
		setSubmitted(false);
	};

	return {
		handleSubmit,
		resetSubmission,
		submitted,
	};
};
