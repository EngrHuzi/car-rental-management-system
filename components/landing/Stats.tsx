'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Vehicles', value: '136+' },
  { label: 'Car Brands', value: '39' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Customer Satisfaction', value: '4.9/5' },
];

export function Stats() {
  return (
    <section id="stats" className="py-24 sm:py-32 bg-white dark:bg-gray-900 border-t border-black/5 dark:border-white/5">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black dark:text-white">
            Trusted by rental businesses
          </h2>
          <p className="mt-4 text-lg text-black/70 dark:text-white/70">
            Join companies managing their fleets with confidence
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center rounded-2xl bg-white dark:bg-gray-800/50 border border-black/10 dark:border-white/10 p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover-glow cursor-pointer backdrop-blur-sm"
              >
                <div className="text-4xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-black/70 dark:text-white/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
