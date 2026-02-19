import { StepLayout } from '@/components/StepLayout';

export const metadata = {
  title: 'Architecture | AI Resume Builder',
  description: 'Design the architecture for AI Resume Builder',
};

export default function ArchitecturePage() {
  return (
    <StepLayout stepNumber={3}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">System Architecture</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            In Step 3, you'll design the overall system architecture for the AI Resume Builder.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Need to Do:</h2>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Define system components and modules</li>
            <li>• Plan the data flow</li>
            <li>• Design database schema overview</li>
            <li>• Plan API endpoints and services</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Next Steps:</h2>
          <ol className="text-gray-700 space-y-2">
            <li>1. Create architecture diagrams</li>
            <li>2. Document component interactions</li>
            <li>3. Copy architecture design to Build Panel</li>
            <li>4. Upload artifact and proceed to HLD</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900 font-medium">💡 Tip:</p>
            <p className="text-sm text-blue-800 mt-1">
              Think about scalability and how different parts of the system will interact.
            </p>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
