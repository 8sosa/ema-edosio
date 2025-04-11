import './page.css'

export default function ContactPage() {
  return (
    <>
      <section className="container contactPage">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Details Section */}
          <div className="flex-1 body">
            <h2 className="contactH2 title">Contact</h2>
            <p className="mb-2 contactP">Email - contact@example.com</p>
            <p className="mb-2 contactP">Phone - +123 456 7890</p>
            <p className="mb-2 contactP">Address - 123 Main St, City, Country</p>
          </div>
          {/* Form Section */}
          <div className="flex-1">
            <form className="space-y-4 body">
              <div className='contactFormRow'>
                <div>
                  <label htmlFor="name" className="contactFormLabel mont">
                    First Name *
                  </label>
                  <input type="text" id="name" name="name" className="inputLine" required/>
                </div>
                <div>
                  <label htmlFor="name" className="contactFormLabel mont">
                    Last Name *
                  </label>
                  <input type="text" id="name" name="name" className="inputLine" required/>
                </div>
              </div>
              <div className='contactFormRow'>
                <div>
                  <label htmlFor="email" className="contactFormLabel mont">
                    Email *
                  </label>
                  <input type="email" id="email" name="email" className="inputLine" required/>
                </div>
                <div>
                  <label htmlFor="name" className="contactFormLabel mont">
                    Subject
                  </label>
                  <input type="text" id="name" name="name" className="inputLine"/>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="contactFormLabel mont">
                  Message *
                </label>
                <textarea id="message" name="message" rows={4} className="inputLine" required></textarea>
              </div>
              <div>
                <button type="submit" className="contactSendBtn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}