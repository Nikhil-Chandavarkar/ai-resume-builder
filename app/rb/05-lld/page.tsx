import { StepLayout } from '@/components/StepLayout';

export const metadata = {
  title: 'LLD | AI Resume Builder',
  description: 'Create Low Level Design for AI Resume Builder',
};

export default function LLDPage() {
  return (
    <StepLayout stepNumber={5}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Low Level Design (LLD)</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            In Step 5, you'll create the Low Level Design (LLD) for the AI Resume Builder.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Need to Do:</h2>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Design detailed components and modules</li>
            <li>• Plan algorithms and logic flow</li>
            <li>• Design database tables and relationships</li>
            <li>• Plan API specifications in detail</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Next Steps:</h2>
          <ol className="text-gray-700 space-y-2">
            <li>1. Document detailed design specifications</li>
            <li>2. Include code structure planning</li>
            <li>3. Copy to Build Panel</li>
            <li>4. Upload artifact and move to Build</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900 font-medium">💡 Tip:</p>
            <p className="text-sm text-blue-800 mt-1">
              This is where you plan implementation details and make technical decisions.
            </p>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
