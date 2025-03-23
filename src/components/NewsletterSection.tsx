import React from 'react';

const NewsletterSection: React.FC = () => {
  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterSection;
