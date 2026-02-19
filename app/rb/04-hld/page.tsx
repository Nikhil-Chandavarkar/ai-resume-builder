import { StepLayout } from '@/components/StepLayout';

export const metadata = {
  title: 'HLD | AI Resume Builder',
  description: 'Create High Level Design for AI Resume Builder',
};

export default function HLDPage() {
  return (
    <StepLayout stepNumber={4}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">High Level Design (HLD)</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            In Step 4, you'll create the High Level Design (HLD) for the AI Resume Builder.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Need to Do:</h2>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Design user workflows and flows</li>
            <li>• Create wireframes or mockups</li>
            <li>• Plan feature sets</li>
            <li>• Define user interface structure</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Next Steps:</h2>
          <ol className="text-gray-700 space-y-2">
            <li>1. Create HLD documentation</li>
            <li>2. Include user flow diagrams</li>
            <li>3. Document in Build Panel</li>
            <li>4. Upload and move to LLD</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900 font-medium">💡 Tip:</p>
            <p className="text-sm text-blue-800 mt-1">
              Focus on user experience and how users will interact with your application.
            </p>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
