export const FAQS = [
  {
    question: "How do I find a property?",
    answer:
      "Open the properties page to browse everything that is available. You can filter by category and use the advanced filters to narrow the list down.",
  },
  {
    question: "How do I rent a property?",
    answer:
      "Open the property details page and submit a rental request. The landlord then approves or rejects it, and you can follow the status from your dashboard.",
  },
  {
    question: "How do I pay?",
    answer:
      "Payments are handled securely through Stripe checkout. After a successful payment you see a confirmation page, and if you cancel you are returned to a cancellation page.",
  },
  {
    question: "What is the difference between a tenant and a landlord account?",
    answer:
      "Tenants browse properties, send rental requests and make payments. Landlords list properties, manage availability and decide on rental requests. Each role has its own dashboard.",
  },
  {
    question: "Can I list my own property?",
    answer:
      "Yes. With a landlord account you can add and update properties and mark them available or unavailable from your dashboard.",
  },
  {
    question: "How do I know if my request was approved?",
    answer:
      "Your rental requests and their current status are shown in your tenant dashboard, so you can check the result at any time.",
  },
  {
    question: "Is my account secure?",
    answer:
      "Yes. RentNest uses JWT-based authentication with a secure HTTP-only cookie, and protected pages are only available to the right role.",
  },
] as const;