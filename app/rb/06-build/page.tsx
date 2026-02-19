import { StepLayout } from '@/components/StepLayout';

export const metadata = {
  title: 'Build | AI Resume Builder',
  description: 'Build the AI Resume Builder',
};

export default function BuildPage() {
  return (
    <StepLayout stepNumber={6}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Build Phase</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            In Step 6, you'll build the AI Resume Builder application based on your designs.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Need to Do:</h2>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Implement frontend components</li>
            <li>• Build backend services and APIs</li>
            <li>• Integrate with AI services</li>
            <li>• Set up database and data models</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Next Steps:</h2>
          <ol className="text-gray-700 space-y-2">
            <li>1. Start implementation using Lovable</li>
            <li>2. Build out core features</li>
            <li>3. Test functionality</li>
            <li>4. Upload artifact and move to Testing</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900 font-medium">💡 Tip:</p>
            <p className="text-sm text-blue-800 mt-1">
              Build incrementally and test as you go. Focus on core features first.
            </p>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
