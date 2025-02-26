import React, { useState, useRef, useEffect } from "react";

const MAILCHIMP_SIGNUP = import.meta.env.PUBLIC_MAILCHIMP_SIGNUP;
if (!MAILCHIMP_SIGNUP) {
  console.warn(
    "Environment variable 'PUBLIC_MAILCHIMP_SIGNUP' is not defined."
  );
}

const NewsletterSignup: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // Create a unique ID for the iframe
  const iframeId = "mailchimp-iframe";
  const signupUrl = MAILCHIMP_SIGNUP;

  // Set up the iframe once on component mount
  useEffect(() => {
    // Create iframe if it doesn't exist
    if (!document.getElementById(iframeId)) {
      const iframe = document.createElement("iframe");
      iframe.id = iframeId;
      iframe.name = iframeId;
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }

    // Cleanup on unmount
    return () => {
      const iframe = document.getElementById(iframeId);
      if (iframe) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("EMAIL") as HTMLInputElement;

    if (!emailInput.value || !emailInput.validity.valid) {
      return false;
    }

    setIsSubmitting(true);

    // Create a hidden form to submit to Mailchimp
    const tempForm = document.createElement("form");
    tempForm.action = signupUrl;
    tempForm.method = "post";
    tempForm.target = iframeId; // Target the hidden iframe
    tempForm.style.display = "none";

    // Add the email input
    const emailField = document.createElement("input");
    emailField.name = "EMAIL";
    emailField.value = emailInput.value;
    tempForm.appendChild(emailField);

    // Add the anti-bot input
    const botField = document.createElement("input");
    botField.name = "b_f9f52f752b920bad5e8b46282_5f71947001";
    botField.value = "";
    tempForm.appendChild(botField);

    // Append to body, submit, and remove
    document.body.appendChild(tempForm);
    tempForm.submit();

    // Show success message after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      document.body.removeChild(tempForm);
    }, 1000);

    return true;
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="rounded-2xl border border-green-500 bg-green-50 p-4 text-center text-green-700">
          Thanks. We'll be in touch soon.
        </div>
      ) : (
        <form
          ref={formRef}
          className="relative font-medium leading-none"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="EMAIL"
            autoComplete="off"
            required
            className="block w-full text-ellipsis rounded-2xl border border-blackish/10 px-6 py-4 pr-24 shadow-lg transition-colors hover:border-blackish/30 focus:border-blackish/30 focus:outline-none"
            placeholder="Join the waitlist"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 inline-block -translate-y-1/2 rounded-2xl bg-transparent p-4 text-mono-500 transition-colors hover:text-black dark:text-mono-600 dark:hover:text-mono-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
