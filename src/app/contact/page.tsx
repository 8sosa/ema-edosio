export default function ContactPage() {
  return (
    <section className="w-full min-h-screen bg-black text-white px-6 lg:px-12 py-24 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl lg:text-5xl font-bold uppercase mb-10">Contact Me</h2>
        <form className="space-y-6">
          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block mb-1 text-sm font-medium">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="inputLine"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm font-medium">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="inputLine"
              />
            </div>
          </div>

          {/* Email + Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="inputLine"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1 text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="inputLine"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="inputLine"
            ></textarea>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}