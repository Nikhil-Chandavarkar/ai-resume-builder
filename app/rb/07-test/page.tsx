import { StepLayout } from '@/components/StepLayout';

export const metadata = {
  title: 'Test | AI Resume Builder',
  description: 'Test the AI Resume Builder',
};

export default function TestPage() {
  return (
    <StepLayout stepNumber={7}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Testing Phase</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            In Step 7, you'll thoroughly test the AI Resume Builder application.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Need to Do:</h2>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Run unit tests on components</li>
            <li>• Perform integration testing</li>
            <li>• Test workflows end-to-end</li>
            <li>• Check for edge cases and bugs</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Next Steps:</h2>
          <ol className="text-gray-700 space-y-2">
            <li>1. Create test suite</li>
            <li>2. Execute all tests</li>
            <li>3. Document test results</li>
            <li>4. Upload artifact and move to Deployment</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900 font-medium">💡 Tip:</p>
            <p className="text-sm text-blue-800 mt-1">
              Test all user workflows and edge cases. Quality assurance ensures a great product.
            </p>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
