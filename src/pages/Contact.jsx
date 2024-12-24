import React from 'react'

function Contact() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="space-y-12">
        {/* Section 1: Introduction */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            We’d love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help. Reach out to us using any of the methods below.
          </p>
        </section>

        {/* Section 2: Contact Information */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-600">Get in Touch</h2>
            <p className="text-lg leading-relaxed">
              Email: <a href="mailto:support@shophere.com" className="text-red-600 underline">ibtisamwarraich101@gmail.com</a>
            </p>
            <p className="text-lg leading-relaxed">
              Phone: <a href="tel:+923167255383" className="text-red-600 underline">+92 3167255383</a>
            </p>
            <p className="text-lg leading-relaxed">
              Address: ATC Near Riaz Hotel Qila Didar Singh Gujranwala
            </p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d652.2145667266236!2d74.00399241596459!3d32.1298529612288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f33ea233c1f95%3A0xad59ecdd18a8fa35!2sAli%20Tech%20Center%20ATC!5e1!3m2!1sen!2s!4v1734682542873!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md"
          ></iframe>
        </section>

        {/* Section 3: Contact Form */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-red-600 text-center">Send Us a Message</h2>
          <form className="max-w-3xl mx-auto space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
            ></textarea>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-110 duration-300 ease-out"
              >
                Submit
              </button>
            </div>
          </form>
        </section>

        {/* Section 4: Social Media */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-blue-600">
            Connect with Us
          </h2>
          <p className="text-lg leading-relaxed">
            Follow us on social media for the latest updates and special offers.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-600 hover:text-red-600 text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-blue-400 hover:text-red-600 text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-pink-600 hover:text-red-600 text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-blue-800 hover:text-red-600 text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contact