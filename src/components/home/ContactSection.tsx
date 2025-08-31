'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Section from '../ui/Section'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { sendEmail, type ContactFormData } from '../../hooks/contactController'

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    sendEmail(
      formData,
      () => {
        // Success callback
        setIsSubmitting(false)
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!' 
        })
        // Reset form
        setFormData({ name: '', email: '', message: '' })
      },
      (error: Error) => {
        // Error callback
        setIsSubmitting(false)
        setSubmitStatus({ 
          type: 'error', 
          message: error.message || 'Failed to send message. Please try again.' 
        })
      }
    )
  }

  const contactInfo = [
    { 
      name: 'Email', 
      icon: faEnvelope, 
      value: 'its.rohit.dev@gmail.com',
      link: 'mailto:its.rohit.dev@gmail.com',
      color: 'from-pink-500 to-red-500' 
    },
    { 
      name: 'Phone', 
      icon: faPhone, 
      value: '+91 74799 03041',
      link: 'tel:+917479903041',
      color: 'from-purple-500 to-indigo-500' 
    },
    { 
      name: 'Location', 
      icon: faMapMarkerAlt, 
      value: 'Ranchi, Jharkhand, India',
      link: '#',
      color: 'from-blue-500 to-cyan-500' 
    }
  ]

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: faGithub, 
      link: 'https://github.com/Rohit-Codess/',
      color: 'hover:bg-gray-700'
    },
    { 
      name: 'LinkedIn', 
      icon: faLinkedin, 
      link: 'https://linkedin.com/in/itsrohitdev',
      color: 'hover:bg-blue-600'
    },
    { 
      name: 'Twitter', 
      icon: faTwitter, 
      link: 'https://x.com/rohitmahto7479/',
      color: 'hover:bg-sky-500'
    }
  ]

  return (
    <Section id="contact" background="gradient">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-300 font-medium mb-6">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2 text-blue-400" />
            Let&apos;s Connect
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to start your next project? Let&apos;s discuss how I can help bring your ideas to life.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8" noAnimation={true}>
            <h3 className="text-2xl font-semibold text-white mb-6">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none transition-all duration-200"
                />
              </div>
              
              {/* Status Message */}
              {submitStatus.type && (
                <div className={`p-4 rounded-lg border ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-300' 
                    : 'bg-red-500/10 border-red-500/20 text-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="cursor-pointer w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-black font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2" 
                disabled={isSubmitting}
              >
                <FontAwesomeIcon 
                  icon={faPaperPlane} 
                  className={`${isSubmitting ? 'animate-pulse' : ''}`} 
                />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  className="block transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Card className="p-6" noAnimation={true}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${contact.color} flex items-center justify-center text-xl shadow-lg`}>
                        <FontAwesomeIcon icon={contact.icon} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{contact.name}</h4>
                        <p className="text-gray-300">{contact.value}</p>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            {/* Social Media */}
            <Card className="p-6" noAnimation={true}>
              <h4 className="text-lg font-semibold text-white mb-4">Follow me on social media</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-xl text-gray-300 ${social.color} transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}