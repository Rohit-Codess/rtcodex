'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Section from '../ui/Section'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
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
    { name: 'GitHub', icon: faGithub, link: 'https://github.com/Rohit-Codess/' },
    { name: 'LinkedIn', icon: faLinkedin, link: 'https://linkedin.com/in/itsrohitdev' },
    { name: 'Twitter', icon: faTwitter, link: 'https://x.com/rohitmahto7479/' }
  ]

  return (
    <Section id="contact" background="gradient">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to build something amazing together? Let&apos;s discuss your next project.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-6" noAnimation={true}>
            <h3 className="text-xl font-semibold text-white mb-4">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20"
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
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 resize-none"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
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
                  className="block"
                >
                  <Card className="p-4" noAnimation={true}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center text-xl`}>
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
            <Card className="p-4" noAnimation={true}>
              <h4 className="text-lg font-semibold text-white mb-4">Follow me on social media</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-xl text-gray-300"
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