import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import Hero from '../components/Hero';

const ContactPage = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', subject: '', message: '' },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setStatus }) => {
      try {
        await axios.post('http://localhost:1337/api/contact-submissions', { data: values });
        resetForm();
        setStatus({ success: true });
      } catch (error) {
        setStatus({ error: 'Failed to send message. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourprofile', name: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourhandle', name: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/yourprofile', name: 'Instagram' },
    { icon: <FaEnvelope />, url: 'mailto:youremail@example.com', name: 'Email' },
  ];

  return (
    <div className="relative min-h-screen">
      <Hero title="Contact Me" />
      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600">Feel free to reach out for collaborations or just a friendly hello</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Connect With Me</h2>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200">
                  <span className="text-2xl mr-4 text-indigo-600">{social.icon}</span>
                  <span className="text-lg font-medium text-gray-700">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Me a Message</h2>
            {formik.status?.success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">Thank you! Your message has been sent successfully.</div>}
            {formik.status?.error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{formik.status.error}</div>}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input id="name" name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formik.touched.name && formik.errors.name && <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formik.touched.email && formik.errors.email && <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input id="subject" name="subject" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.subject} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formik.touched.subject && formik.errors.subject && <p className="mt-1 text-sm text-red-600">{formik.errors.subject}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea id="message" name="message" rows="5" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.message} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                {formik.touched.message && formik.errors.message && <p className="mt-1 text-sm text-red-600">{formik.errors.message}</p>}
              </div>
              <button type="submit" disabled={formik.isSubmitting} className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center">
                {formik.isSubmitting ? 'Sending...' : <><FaPaperPlane className="mr-2" /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
