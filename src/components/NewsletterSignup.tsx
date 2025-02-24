import React from "react";

const NewsletterSignup: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("EMAIL") as HTMLInputElement;

    if (!emailInput.value || !emailInput.validity.valid) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  return (
    <div>
      <form
        action={import.meta.env.VITE_MAILCHIMP_SIGNUP}
        method="post"
        target="_self"
        className="relative font-medium leading-none"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="EMAIL"
          autoComplete="off"
          required
          className="block w-full text-ellipsis rounded-2xl border border-blackish/10 px-6 py-4 pr-36 shadow-lg transition-colors hover:border-blackish/30 focus:border-blackish/30 focus:outline-none"
          placeholder="Sign up for early access"
        />
        <div className="absolute left-[-5000px]" aria-hidden="true">
          <input
            type="text"
            name="b_f9f52f752b920bad5e8b46282_5f71947001"
            tabIndex={-1}
            value=""
          />
        </div>
        <button
          type="submit"
          className="absolute right-0 top-1/2 inline-block -translate-y-1/2 rounded-2xl p-4 text-mono-500 transition-colors hover:text-black dark:text-mono-600 dark:hover:text-mono-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
