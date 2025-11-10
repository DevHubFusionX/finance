import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Globe, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Active Users', value: '50,000+', icon: Users },
    { label: 'Transactions Tracked', value: '2.5M+', icon: TrendingUp },
    { label: 'Countries Served', value: '25+', icon: Globe },
    { label: 'Years of Experience', value: '5+', icon: Award }
  ];

  const team = [
    { name: 'Sarah Chen', role: 'CEO & Founder', bio: 'Former Goldman Sachs analyst with a passion for democratizing financial intelligence.' },
    { name: 'Marcus Rodriguez', role: 'CTO', bio: 'AI researcher focused on making complex financial data accessible to everyone.' },
    { name: 'Dr. Emily Watson', role: 'Head of Product', bio: 'Behavioral economist dedicated to improving financial decision-making through design.' }
  ];

  const values = [
    { title: 'Financial Literacy', description: 'We believe everyone deserves access to intelligent financial tools and education.', icon: TrendingUp },
    { title: 'Privacy First', description: 'Your financial data is yours. We use bank-grade security to protect your information.', icon: Shield },
    { title: 'Human-Centered', description: 'Technology should serve people, not the other way around. We design with empathy.', icon: Heart }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7FAFC' }}>
      {/* Header */}
      <div className="px-6 py-16" style={{ backgroundColor: '#2D3748', color: '#F7FAFC' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="p-3 rounded-full" style={{ backgroundColor: '#4A5568' }}>
                <TrendingUp className="w-8 h-8" style={{ color: '#F7FAFC' }} />
              </div>
              <h1 className="text-4xl font-bold">FinanceAI</h1>
            </div>
            <h2 className="text-2xl mb-6">Transforming Financial Narratives Through Intelligence</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(247, 250, 252, 0.8)' }}>
              We're on a mission to help individuals master their financial stories through
              AI-powered insights, elegant design, and purposeful technology.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(74, 85, 104, 0.1)' }}>
                <stat.icon className="w-8 h-8" style={{ color: '#4A5568' }} />
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#2D3748' }}>{stat.value}</div>
              <div style={{ color: '#4A5568' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="text-4xl font-bold mb-8" style={{ color: '#2D3748' }}>Our Mission</h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl leading-relaxed mb-8" style={{ color: '#4A5568' }}>
              Financial wellness shouldn't be a privilege reserved for the wealthy. We believe that with the right tools,
              insights, and guidance, anyone can author a prosperous financial future.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#4A5568' }}>
              Our AI-powered platform transforms the complexity of personal finance into clear, actionable narratives
              that empower you to make informed decisions about your money.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-4xl font-bold text-center mb-12" style={{ color: '#2D3748' }}>Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl border"
                style={{ backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.1)' }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(166, 124, 0, 0.1)' }}>
                  <value.icon className="w-8 h-8" style={{ color: '#A67C00' }} />
                </div>
                <h4 className="text-xl font-bold mb-4" style={{ color: '#2D3748' }}>{value.title}</h4>
                <p className="leading-relaxed" style={{ color: '#4A5568' }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-4xl font-bold text-center mb-12" style={{ color: '#2D3748' }}>Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl border"
                style={{ backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.1)' }}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(74, 85, 104, 0.1)' }}>
                  <Users className="w-12 h-12" style={{ color: '#4A5568' }} />
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ color: '#2D3748' }}>{member.name}</h4>
                <p className="font-medium mb-4" style={{ color: '#A67C00' }}>{member.role}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center p-12 rounded-3xl"
          style={{ backgroundColor: 'rgba(45, 55, 72, 0.05)', border: '1px solid rgba(45, 55, 72, 0.1)' }}
        >
          <h3 className="text-3xl font-bold mb-6" style={{ color: '#2D3748' }}>
            Ready to Begin Your Financial Story?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#4A5568' }}>
            Join thousands of users who have transformed their relationship with money through intelligent insights and purposeful design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                style={{ backgroundColor: '#2D3748', color: '#F7FAFC' }}
              >
                Get Started Free
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl font-semibold text-lg border transition-colors"
                style={{ borderColor: 'rgba(74, 85, 104, 0.2)', color: '#4A5568' }}
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;