import { StepLayout } from '@/components/StepLayout';

export const metadata = {
  title: 'Market | AI Resume Builder',
  description: 'Analyze the market for AI Resume Builder',
};

export default function MarketPage() {
  return (
    <StepLayout stepNumber={2}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Market Analysis</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            In Step 2, you'll analyze the market for the AI Resume Builder to understand the landscape and opportunities.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Need to Do:</h2>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Research the competitive landscape</li>
            <li>• Identify target market size</li>
            <li>• Analyze existing solutions</li>
            <li>• Find market opportunities and gaps</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Next Steps:</h2>
          <ol className="text-gray-700 space-y-2">
            <li>1. Document market research findings</li>
            <li>2. Copy your analysis to the Build Panel</li>
            <li>3. Create a prototype in Lovable</li>
            <li>4. Mark as complete and move to Architecture</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900 font-medium">💡 Tip:</p>
            <p className="text-sm text-blue-800 mt-1">
              Look at existing resume tools and identify what makes AI Resume Builder unique.
            </p>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
