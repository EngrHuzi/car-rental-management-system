/**
 * Keyword-based fallback logic when AI is unavailable
 * Provides helpful responses based on keyword matching
 */

interface FallbackRule {
  keywords: string[];
  response: string;
}

const FALLBACK_RULES: FallbackRule[] = [
  // Vehicle-related queries
  {
    keywords: ['car', 'vehicle', 'available', 'rent', 'book'],
    response:
      'I can help you find available vehicles! Our system has a wide range of cars including sedans, SUVs, and luxury vehicles. You can browse our vehicle catalog to see all available options with pricing and availability status.',
  },
  {
    keywords: ['price', 'cost', 'daily', 'rate', 'cheap', 'expensive'],
    response:
      'Vehicle pricing varies by model and brand. Daily rates are displayed in the vehicle catalog. The total rental cost is calculated automatically based on the rental duration (end date - start date) multiplied by the daily price.',
  },
  {
    keywords: ['suv', 'sedan', 'luxury', 'economy', 'compact'],
    response:
      'We offer various vehicle categories including SUVs, sedans, luxury cars, and economy options. Check the vehicle catalog to filter by brand and model to find the perfect car for your needs.',
  },

  // Rental process queries
  {
    keywords: ['rental', 'booking', 'reserve', 'how to rent'],
    response:
      'To create a rental: 1) Select an available vehicle from the catalog, 2) Choose your rental dates, 3) Provide customer information, 4) The system will automatically calculate the total cost based on the daily rate and rental duration. Rentals can be managed, updated, or canceled from the Rentals page.',
  },
  {
    keywords: ['cancel', 'cancellation', 'refund'],
    response:
      'Rentals can be canceled from the Rentals management page. When a rental is canceled, the vehicle becomes available again for other customers. Please contact your administrator for refund policies.',
  },
  {
    keywords: ['dates', 'duration', 'period', 'how long'],
    response:
      'You can specify your rental start and end dates when creating a booking. The system automatically calculates the total cost based on the number of days. Make sure the end date is after the start date to avoid validation errors.',
  },

  // Customer queries
  {
    keywords: ['customer', 'client', 'user', 'contact'],
    response:
      'Customer information includes name, email, and phone number. You can manage customer profiles from the Customers page. Customers with rental history are soft-deleted (marked as deleted) to preserve rental records.',
  },

  // Feedback queries
  {
    keywords: ['feedback', 'rating', 'review', 'satisfaction'],
    response:
      'Customers can submit feedback and ratings (1-5 stars) for completed rentals. Each rental can only have one feedback entry. View aggregated satisfaction metrics and individual reviews on the Feedback page.',
  },

  // Analytics queries
  {
    keywords: ['analytics', 'report', 'revenue', 'statistics', 'metrics'],
    response:
      'The Analytics dashboard provides key performance indicators including total revenue, vehicle utilization rates, and customer satisfaction scores. Metrics are calculated from real rental and feedback data.',
  },

  // Authentication queries
  {
    keywords: ['login', 'logout', 'password', 'account', 'authentication'],
    response:
      'Staff members can log in using their registered email and password. Sessions are JWT-based and expire after 7 days. For security, passwords are hashed and sessions are stored in the database.',
  },

  // General help
  {
    keywords: ['help', 'how', 'what', 'guide', 'tutorial'],
    response:
      'This Car Rental Management System helps you manage vehicles, customers, rentals, and feedback. Navigate through the dashboard to access different features. Each section provides forms and lists for managing the respective entities.',
  },
];

/**
 * Get fallback response based on keyword matching
 * @param prompt - User query
 * @returns Fallback response or generic message
 */
export function getFallbackResponse(prompt: string): string {
  const normalizedPrompt = prompt.toLowerCase().trim();

  // Find matching rule
  for (const rule of FALLBACK_RULES) {
    const hasMatch = rule.keywords.some((keyword) =>
      normalizedPrompt.includes(keyword.toLowerCase())
    );

    if (hasMatch) {
      console.log(`✅ Fallback matched keywords: [${rule.keywords.join(', ')}]`);
      return rule.response;
    }
  }

  // Generic fallback if no keywords match
  console.log('⚠️  No keyword match - using generic fallback');
  return "I'm here to help with your car rental management needs! You can ask me about available vehicles, rental processes, customer management, feedback, or analytics. Please try rephrasing your question, or browse the navigation menu to explore the system features.";
}

/**
 * Check if prompt matches fallback keywords
 * @param prompt - User query
 * @returns True if keywords are recognized
 */
export function hasFallbackMatch(prompt: string): boolean {
  const normalizedPrompt = prompt.toLowerCase().trim();

  return FALLBACK_RULES.some((rule) =>
    rule.keywords.some((keyword) =>
      normalizedPrompt.includes(keyword.toLowerCase())
    )
  );
}
