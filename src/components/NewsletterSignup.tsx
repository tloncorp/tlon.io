import React, { useState, useRef } from "react";

// Properly formatted URL with actual & characters instead of HTML entities
const MAILCHIMP_SIGNUP =
  "https://tlon.us14.list-manage.com/subscribe/post?u=f9f52f752b920bad5e8b46282&id=6d15c14b9a&f_id=004bfde5f0";

const NewsletterSignup: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("EMAIL") as HTMLInputElement;

    if (!emailInput.value || !emailInput.validity.valid) {
      return false;
    }

    // Create a hidden form to submit to Mailchimp
    const tempForm = document.createElement("form");
    tempForm.action = MAILCHIMP_SIGNUP;
    tempForm.method = "post";
    tempForm.target = "_blank";
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
    document.body.removeChild(tempForm);

    // Show success message
    setIsSubmitted(true);
    return true;
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="rounded-2xl border border-green-500 bg-green-50 p-4 text-center text-green-700">
          Thank you for subscribing to our newsletter!
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
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 inline-block -translate-y-1/2 rounded-2xl bg-transparent p-4 text-mono-500 transition-colors hover:text-black dark:text-mono-600 dark:hover:text-mono-500"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
