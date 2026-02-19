import { StepLayout } from '@/components/StepLayout';

export const metadata = {
  title: 'Ship | AI Resume Builder',
  description: 'Deploy the AI Resume Builder',
};

export default function ShipPage() {
  return (
    <StepLayout stepNumber={8}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Ship & Deploy</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            In Step 8, you'll deploy the AI Resume Builder to production.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Need to Do:</h2>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Deploy backend to cloud (e.g., AWS, Google Cloud)</li>
            <li>• Deploy frontend to production</li>
            <li>• Configure CI/CD pipeline</li>
            <li>• Set up monitoring and error tracking</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Next Steps:</h2>
          <ol className="text-gray-700 space-y-2">
            <li>1. Push code to GitHub</li>
            <li>2. Deploy to production</li>
            <li>3. Verify deployment</li>
            <li>4. Upload artifact and complete project</li>
          </ol>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-green-900 font-medium">🚀 Final Step:</p>
            <p className="text-sm text-green-800 mt-1">
              Once you complete this step, you'll be able to view your final project submission and proof of completion!
            </p>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
